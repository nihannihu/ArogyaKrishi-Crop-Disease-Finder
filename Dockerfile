# Hugging Face Space - Docker Configuration
FROM python:3.9-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    build-essential \
    netcat-openbsd \
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

# Create startup script with health check
WORKDIR /app
RUN echo '#!/bin/bash\n\
    echo "Starting AI Server..."\n\
    cd /app/ai-server && gunicorn --bind 0.0.0.0:5000 ai_server:app --timeout 120 --workers 1 &\n\
    \n\
    echo "Waiting for AI Server to be ready..."\n\
    for i in {1..60}; do\n\
    if curl -s http://localhost:5000/ > /dev/null 2>&1; then\n\
    echo "AI Server is ready!"\n\
    break\n\
    fi\n\
    echo "Waiting... ($i/60)"\n\
    sleep 2\n\
    done\n\
    \n\
    echo "Starting Node.js Server..."\n\
    cd /app/plant-disease-scanner && PORT=7860 node server.js' > /app/start.sh && chmod +x /app/start.sh

# Expose port 7860 (HF Spaces default)
EXPOSE 7860

# Set environment variables
ENV AI_SERVER_URL=http://localhost:5000
ENV PORT=7860
ENV NODE_ENV=production

CMD ["/app/start.sh"]
