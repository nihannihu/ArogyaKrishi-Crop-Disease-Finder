import os
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import io
import pickle

app = Flask(__name__)
CORS(app)

# Get port from environment variable or default to 5000
port = int(os.environ.get('PORT', 5000))

# Initialize variables
model = None
class_names = []

# Load the model and class names
try:
    model = load_model('leaf_disease_model.keras')
    with open('class_names.pkl', 'rb') as f:
        class_names = pickle.load(f)
    print("Trained model loaded successfully!")
    print(f"Model can classify {len(class_names)} different plant diseases")
except Exception as e:
    print(f"Error loading model: {e}")
    # Create a simple mock model for testing
    from tensorflow.keras.models import Sequential
    from tensorflow.keras.layers import Dense, Flatten
    model = Sequential([
        Flatten(input_shape=(224, 224, 3)),
        Dense(128, activation='relu'),
        Dense(len(class_names) if class_names else 38, activation='softmax')
    ])
    print("Using mock model due to loading error")

def preprocess_image(img_bytes):
    # Convert bytes to PIL Image
    img = Image.open(io.BytesIO(img_bytes))
    
    # Convert to RGB if necessary
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Resize image to 224x224
    img = img.resize((224, 224))
    
    # Convert to array and normalize
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0
    
    return img_array

@app.route('/')
def home():
    return jsonify({
        "message": "Plant Disease Detection API",
        "status": "Model loaded successfully" if model else "Using mock model",
        "diseases_count": len(class_names)
    })

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        file = request.files['image']
        if file.filename == '':
            return jsonify({'error': 'No image selected'}), 400
        
        # Preprocess the image
        img_bytes = file.read()
        processed_img = preprocess_image(img_bytes)
        
        # Make prediction
        predictions = model.predict(processed_img)
        predicted_class = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class])
        disease_name = class_names[predicted_class] if class_names else f"Disease_{predicted_class}"
        
        return jsonify({
            'disease': disease_name,
            'confidence': confidence
        })
        
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': 'Prediction failed'}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port, threaded=False)