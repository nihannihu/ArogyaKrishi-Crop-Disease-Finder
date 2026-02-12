# Hugging Face Space - Docker Configuration
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    build-essential \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Copy and install Python dependencies
COPY ai-server/requirements.txt /app/ai-server/
RUN pip install --no-cache-dir -r /app/ai-server/requirements.txt

# Copy AI server
COPY ai-server/ /app/ai-server/

# Copy and install Node.js dependencies
COPY plant-disease-scanner/package*.json /app/plant-disease-scanner/
WORKDIR /app/plant-disease-scanner
RUN npm ci --only=production

# Copy Node.js app
COPY plant-disease-scanner/ /app/plant-disease-scanner/

# Create startup script with proper wait
WORKDIR /app
RUN echo '#!/bin/bash\n\
    set -e\n\
    echo "=== Starting AI Server ==="\n\
    cd /app/ai-server\n\
    gunicorn --bind 0.0.0.0:5000 ai_server:app --timeout 120 --workers 1 --daemon\n\
    \n\
    echo "=== Waiting 30 seconds for AI server to load model ==="\n\
    sleep 30\n\
    \n\
    echo "=== Testing AI Server ==="\n\
    curl -f http://localhost:5000/ || echo "Warning: AI server health check failed"\n\
    \n\
    echo "=== Starting Node.js Server on port 7860 ==="\n\
    cd /app/plant-disease-scanner\n\
    exec node server.js' > /app/start.sh && chmod +x /app/start.sh

# Expose port 7860 (HF Spaces default)
EXPOSE 7860

# Set environment variables
ENV AI_SERVER_URL=http://localhost:5000
ENV PORT=7860
ENV NODE_ENV=production

CMD ["/app/start.sh"]
