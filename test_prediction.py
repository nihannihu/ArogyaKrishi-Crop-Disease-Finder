import pickle
import numpy as np
from PIL import Image
import os

def extract_simple_features(image_path):
    """Extract simple features from an image (same as in training)"""
    try:
        # Open and resize image to a very small size
        img = Image.open(image_path)
        img = img.resize((32, 32))
        img_array = np.array(img)
        
        # Calculate simple statistics instead of flattening all pixels
        features = []
        for channel in range(img_array.shape[2]):  # For each color channel
            channel_data = img_array[:, :, channel]
            features.extend([np.mean(channel_data), np.std(channel_data)])
        
        return np.array(features)
    except Exception as e:
        print(f"Error processing image {image_path}: {e}")
        return np.zeros(6)

def load_model_and_classes():
    """Load the trained model and class names"""
    try:
        with open('quick_leaf_disease_model.pkl', 'rb') as f:
            model = pickle.load(f)
        with open('quick_class_names.pkl', 'rb') as f:
            class_names = pickle.load(f)
        return model, class_names
    except FileNotFoundError:
        print("Model files not found. Please run quick_train.py first.")
        return None, None

def predict_disease(image_path):
    """Predict the disease for a given image"""
    # Load model and classes
    model, class_names = load_model_and_classes()
    
    if model is None or class_names is None:
        return
    
    # Extract features from the image
    features = extract_simple_features(image_path)
    
    # Make prediction
    prediction = model.predict([features])
    predicted_class_idx = prediction[0]
    predicted_class = class_names[predicted_class_idx]
    
    # Get prediction probabilities
    probabilities = model.predict_proba([features])[0]
    confidence = probabilities[predicted_class_idx]
    
    print(f"Predicted disease: {predicted_class}")
    print(f"Confidence: {confidence:.2%}")
    
    return predicted_class, confidence

if __name__ == "__main__":
    # Example usage - you would replace this with an actual image path
    # For demonstration, we'll just show that the model loads correctly
    model, class_names = load_model_and_classes()
    
    if model is not None and class_names is not None:
        print("Model loaded successfully!")
        print(f"Can classify {len(class_names)} diseases: {class_names}")
        print("\nReady to make predictions on plant leaf images!")
    else:
        print("Failed to load model.")