# Plant Disease Scanner - Project Summary

## Overview
This project implements a web application designed to help farmers by leveraging AI for crop disease detection. The application allows farmers to upload photos of crop leaves, which are then analyzed by AI models to identify diseases and provide recommendations.

## Architecture
The system is built with a microservices architecture consisting of two separate servers:

### 1. Main Web Application (Node.js/Express)
- **Technology Stack**: Node.js, Express.js, MongoDB
- **Responsibilities**:
  - Serve the frontend user interface
  - Handle image uploads from users
  - Store analysis results in MongoDB
  - Act as a proxy between the frontend and AI server
  - Manage user interactions and data flow

### 2. AI Server (Python/Flask)
- **Technology Stack**: Python, Flask, TensorFlow, Scikit-learn
- **Responsibilities**:
  - Run machine learning models for disease detection
  - Process image data using computer vision
  - Return AI predictions to the main web app
  - Handle model loading and inference

## Key Features Implemented

### Frontend (HTML/CSS/JS)
- Clean, modern user interface with glass morphism design
- Single-page application with focused functionality
- Image upload form with validation
- Loading indicators during analysis
- Responsive design for mobile and desktop
- Real-time result display with confidence scores

### Backend (Node.js/Express)
- RESTful API endpoints for frontend communication
- MongoDB integration for data persistence
- File upload handling with express-fileupload
- Proxy communication with AI server using Axios
- Error handling and validation

### AI Server (Python/Flask)
- Flask-based API for AI model serving
- TensorFlow integration for image classification
- Scikit-learn integration for tabular data analysis
- CORS support for cross-origin requests
- Model loading and inference pipeline

## File Structure
```
plant-disease-scanner/
├── public/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── models/
│   └── Result.js
├── server.js
├── package.json
└── test-server.js

ai-server/
├── ai_server.py
├── train_disease_model.py
├── train_soil_model.py
├── demo_client.py
├── requirements.txt
└── PROJECT_SUMMARY.md
```

## How It Works

1. **User Interaction**:
   - Farmer opens the web application
   - Uploads a photo of a crop leaf
   - Clicks the "Analyze" button

2. **Frontend Processing**:
   - JavaScript captures the image file
   - Displays loading spinner
   - Sends image to Node.js backend via AJAX

3. **Backend Processing**:
   - Node.js server receives the image
   - Forwards image data to Python AI server
   - Waits for AI prediction response
   - Saves results to MongoDB
   - Returns results to frontend

4. **AI Analysis**:
   - Python server receives image data
   - Processes image with TensorFlow model
   - Runs inference to detect disease
   - Returns prediction with confidence score

5. **Result Display**:
   - Frontend receives prediction results
   - Hides loading spinner
   - Displays disease name and confidence

## Technologies Used

### Frontend
- **HTML5**: Structure and content
- **CSS3**: Styling with modern features (Flexbox, gradients)
- **JavaScript (ES6)**: Client-side logic and API interaction

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for API creation
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: ODM for MongoDB interaction
- **Axios**: HTTP client for API requests

### AI/ML
- **Python**: Programming language for AI
- **Flask**: Web framework for AI API
- **TensorFlow/Keras**: Deep learning for image classification
- **Scikit-learn**: Machine learning for tabular data
- **Pillow**: Image processing library
- **NumPy**: Numerical computing

## Future Enhancements

1. **Soil Analysis Module**:
   - Implement soil type prediction based on sensor data
   - Add fertilizer recommendation system
   - Integrate weather data for better predictions

2. **User Management**:
   - Add user authentication and profiles
   - Implement prediction history dashboard
   - Add export functionality for results

3. **Mobile Application**:
   - Develop native mobile apps for iOS and Android
   - Implement offline capabilities
   - Add camera integration for direct photo capture

4. **Model Improvements**:
   - Train models on larger, more diverse datasets
   - Implement model versioning and A/B testing
   - Add support for more crop types and diseases

5. **Advanced Features**:
   - Multi-language support
   - Integration with agricultural databases
   - Real-time monitoring with IoT sensors
   - Predictive analytics for crop yield

## Setup Instructions

1. **Install Dependencies**:
   - Node.js and npm
   - Python 3.x
   - MongoDB

2. **Configure Environment**:
   - Set up MongoDB connection
   - Install Node.js packages
   - Install Python dependencies

3. **Run Applications**:
   - Start AI server: `python ai_server.py`
   - Start web server: `npm start`
   - Access application at http://localhost:3000

## Conclusion

This project demonstrates a complete solution for agricultural AI applications, combining modern web technologies with machine learning to solve real-world problems. The modular architecture allows for easy expansion and maintenance, making it a solid foundation for further development.