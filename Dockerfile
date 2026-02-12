# Multi-stage build for Hugging Face Space
FROM python:3.9-slim as ai-builder

WORKDIR /app/ai-server

# Install Python dependencies
COPY ai-server/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy AI server files
COPY ai-server/ .

# Node.js stage
FROM node:18-slim

WORKDIR /app

# Install Python runtime for AI server
RUN apt-get update && apt-get install -y \
    python3.9 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Copy Python dependencies from builder
COPY --from=ai-builder /usr/local/lib/python3.9/site-packages /usr/local/lib/python3.9/site-packages
COPY --from=ai-builder /usr/local/bin/gunicorn /usr/local/bin/gunicorn

# Copy AI server
COPY ai-server/ /app/ai-server/

# Install Node.js dependencies
COPY plant-disease-scanner/package*.json /app/
RUN npm ci --only=production

# Copy Node.js app
COPY plant-disease-scanner/ /app/

# Create startup script
RUN echo '#!/bin/bash\n\
    cd /app/ai-server && gunicorn --bind 0.0.0.0:5000 ai_server:app --timeout 120 &\n\
    cd /app && node server.js' > /app/start.sh && chmod +x /app/start.sh

# Expose port 3000 (HF Spaces expects single port)
EXPOSE 3000

# Set environment variables
ENV AI_SERVER_URL=http://localhost:5000
ENV PORT=3000
ENV NODE_ENV=production

CMD ["/app/start.sh"]
