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

# Create startup script
WORKDIR /app
RUN echo '#!/bin/bash\n\
    cd /app/ai-server && gunicorn --bind 0.0.0.0:5000 ai_server:app --timeout 120 --workers 1 &\n\
    cd /app/plant-disease-scanner && PORT=7860 node server.js' > /app/start.sh && chmod +x /app/start.sh

# Expose port 7860 (HF Spaces default)
EXPOSE 7860

# Set environment variables
ENV AI_SERVER_URL=http://localhost:5000
ENV PORT=7860
ENV NODE_ENV=production

CMD ["/app/start.sh"]
