# ArogyaKrishi - Crop Disease Finder

AI-powered plant disease detection system using deep learning.

## Features
- Real-time disease detection from plant images
- 38+ disease classifications
- Weather-based risk alerts
- Prediction history tracking

## Tech Stack
- **Frontend**: Node.js, Express
- **AI Backend**: Python, TensorFlow, Flask
- **Database**: MongoDB Atlas
- **Model**: MobileNetV2 transfer learning

## Deployment

### Hugging Face Spaces
This app is configured for Hugging Face Docker Spaces with 16GB RAM.

1. Create a new Space on Hugging Face
2. Select "Docker" as the SDK
3. Push this repository to your Space
4. Add your `MONGODB_URI` as a Space secret

### Local Development
```bash
# Install dependencies
cd plant-disease-scanner && npm install
cd ../ai-server && pip install -r requirements.txt

# Run services
# Terminal 1: AI Server
cd ai-server && python ai_server.py

# Terminal 2: Node Server
cd plant-disease-scanner && node server.js
```

## Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `AI_SERVER_URL`: URL of AI server (auto-configured in Docker)
- `PORT`: Server port (default: 3000)

## License
MIT
