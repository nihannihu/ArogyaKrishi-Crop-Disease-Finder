import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import pickle
import os
import sys

def preprocess_image(img_path):
    """Preprocess image the same way the AI server does"""
    # Convert bytes to PIL Image
    img = Image.open(img_path)
    
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

def test_image_prediction(img_path):
    """Test prediction on a specific image"""
    print(f"Testing image: {img_path}")
    
    # Check if file exists
    if not os.path.exists(img_path):
        print(f"Error: File {img_path} not found!")
        return
    
    try:
        # Load model and class names
        model = load_model('leaf_disease_model.keras')
        with open('class_names.pkl', 'rb') as f:
            class_names = pickle.load(f)
        
        print(f"Model loaded with {len(class_names)} classes")
        
        # Preprocess image
        print("Preprocessing image...")
        processed_img = preprocess_image(img_path)
        print(f"Image shape: {processed_img.shape}")
        
        # Make prediction
        print("Making prediction...")
        predictions = model.predict(processed_img)
        predicted_class = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class])
        disease_name = class_names[predicted_class]
        
        print(f"Predicted disease: {disease_name}")
        print(f"Confidence: {confidence:.4f} ({confidence*100:.2f}%)")
        print(f"Predicted class index: {predicted_class}")
        
        # Show top 5 predictions
        print("\nTop 5 predictions:")
        top_5_indices = np.argsort(predictions[0])[::-1][:5]
        for i, idx in enumerate(top_5_indices):
            print(f"  {i+1}. {class_names[idx]}: {predictions[0][idx]:.4f} ({predictions[0][idx]*100:.2f}%)")
        
    except Exception as e:
        print(f"Error during prediction: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_image.py <path_to_image_file>")
        print("Example: python test_image.py test_image.jpg")
    else:
        test_image_prediction(sys.argv[1])