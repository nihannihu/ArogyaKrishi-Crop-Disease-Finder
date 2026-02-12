from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pickle
import numpy as np
from PIL import Image
import io

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Try to load the trained model and class names
try:
    with open('../quick_leaf_disease_model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('../quick_class_names.pkl', 'rb') as f:
        DISEASE_CLASSES = pickle.load(f)
    print("Trained model loaded successfully!")
except FileNotFoundError:
    # Fallback to mock model and classes
    model = None
    DISEASE_CLASSES = [
        'Apple___Apple_scab',
        'Apple___Black_rot',
        'Apple___Cedar_apple_rust',
        'Apple___healthy',
        'Blueberry___healthy'
    ]
    print("Using mock model - run quick_train.py to train a real model")

@app.route('/')
def home():
    return jsonify({
        "message": "AI Server is running",
        "model_status": "Trained model loaded" if model is not None else "Using mock predictions"
    })

def extract_simple_features(image_bytes):
    """Extract simple features from image bytes"""
    try:
        # Open and resize image to a very small size
        img = Image.open(io.BytesIO(image_bytes))
        img = img.resize((32, 32))
        img_array = np.array(img)
        
        # Calculate simple statistics instead of flattening all pixels
        features = []
        for channel in range(img_array.shape[2]):  # For each color channel
            channel_data = img_array[:, :, channel]
            features.extend([np.mean(channel_data), np.std(channel_data)])
        
        return np.array(features)
    except Exception as e:
        print(f"Error processing image: {e}")
        return np.zeros(6)

@app.route('/predict', methods=['POST'])
def predict_disease():
    try:
        if 'image' not in request.files:
            return jsonify({
                "success": False,
                "error": "No image provided"
            }), 400
        
        # Get the image from the request
        image_file = request.files['image']
        image_bytes = image_file.read()
        
        # Process the image and make prediction
        if model is not None:
            # Use the trained model
            features = extract_simple_features(image_bytes)
            prediction = model.predict([features])
            predicted_class_idx = prediction[0]
            predicted_class = DISEASE_CLASSES[predicted_class_idx]
            
            # Get confidence (probability)
            probabilities = model.predict_proba([features])[0]
            confidence = float(probabilities[predicted_class_idx])
        else:
            # Fallback to mock prediction
            predicted_class = "Apple___Apple_scab"
            confidence = 0.85
        
        return jsonify({
            "success": True,
            "disease": predicted_class,
            "confidence": confidence
        })
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)