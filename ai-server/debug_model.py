import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import pickle
import os

print("Debugging AI Model...")
print("=" * 50)

# Check if model files exist
model_file = 'leaf_disease_model.keras'
class_names_file = 'class_names.pkl'

print(f"Checking for model file: {model_file}")
print(f"File exists: {os.path.exists(model_file)}")

print(f"Checking for class names file: {class_names_file}")
print(f"File exists: {os.path.exists(class_names_file)}")

if os.path.exists(model_file) and os.path.exists(class_names_file):
    try:
        # Load the model
        print("\nLoading model...")
        model = load_model(model_file)
        print("Model loaded successfully!")
        
        # Load class names
        print("Loading class names...")
        with open(class_names_file, 'rb') as f:
            class_names = pickle.load(f)
        print(f"Class names loaded successfully! Total classes: {len(class_names)}")
        
        # Print first 10 class names
        print("First 10 class names:")
        for i, name in enumerate(class_names[:10]):
            print(f"  {i+1}. {name}")
            
        # Print model summary
        print("\nModel summary:")
        print(f"Model input shape: {model.input_shape}")
        print(f"Model output shape: {model.output_shape}")
        
        # Check if model can make predictions
        print("\nTesting model with dummy input...")
        dummy_input = np.random.random((1, 224, 224, 3))
        predictions = model.predict(dummy_input)
        print(f"Prediction shape: {predictions.shape}")
        print(f"Prediction sum: {np.sum(predictions)}")
        print(f"Max prediction value: {np.max(predictions)}")
        print(f"Predicted class index: {np.argmax(predictions)}")
        
        print("\nDebug completed successfully!")
        
    except Exception as e:
        print(f"Error during model loading or testing: {e}")
else:
    print("Required model files not found!")
    print("Make sure leaf_disease_model.keras and class_names.pkl are in the ai-server directory.")