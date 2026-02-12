import tensorflow as tf
import pickle
import numpy as np
from PIL import Image
import os

def load_model_and_classes():
    """Load the trained model and class names"""
    try:
        model = tf.keras.models.load_model('leaf_disease_model.keras')
        with open('class_names.pkl', 'rb') as f:
            class_names = pickle.load(f)
        return model, class_names
    except FileNotFoundError:
        print("Model files not found. Please train the model first.")
        return None, None

def preprocess_image(image_path):
    """Preprocess an image for prediction"""
    # Load and preprocess the image
    image = Image.open(image_path)
    image = image.resize((224, 224))  # Resize to match training size
    image_array = np.array(image) / 255.0  # Normalize
    image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
    return image_array

def predict_disease(image_path, model, class_names):
    """Predict the disease for a given image"""
    if not os.path.exists(image_path):
        print(f"Image file {image_path} not found.")
        return
    
    # Preprocess the image
    processed_image = preprocess_image(image_path)
    
    # Make prediction
    predictions = model.predict(processed_image)
    predicted_class_idx = np.argmax(predictions[0])
    confidence = predictions[0][predicted_class_idx]
    predicted_class = class_names[predicted_class_idx]
    
    print(f"Predicted disease: {predicted_class}")
    print(f"Confidence: {confidence:.2%}")
    
    return predicted_class, confidence

if __name__ == "__main__":
    # Load model and classes
    model, class_names = load_model_and_classes()
    
    if model is not None and class_names is not None:
        print("Model loaded successfully!")
        print(f"Number of classes: {len(class_names)}")
        print("First 5 classes:", class_names[:5])
        
        # Example usage (you would replace this with an actual image path)
        # predict_disease("path/to/your/test/image.jpg", model, class_names)
        print("\nModel is ready for predictions!")
    else:
        print("Failed to load model. Please train the model first.")