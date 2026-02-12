import tensorflow as tf
import pickle
import os

def test_model_loading():
    """Test if the trained model and class names can be loaded successfully"""
    print("Testing model loading...")
    
    try:
        # Try to load the trained model
        if os.path.exists('leaf_disease_model.keras'):
            model = tf.keras.models.load_model('leaf_disease_model.keras')
            print(f"✓ Model loaded successfully!")
            print(f"  Model input shape: {model.input_shape}")
            print(f"  Model output shape: {model.output_shape}")
        else:
            print("✗ Model file not found. Run training first.")
            return False
            
        # Try to load class names
        if os.path.exists('class_names.pkl'):
            with open('class_names.pkl', 'rb') as f:
                class_names = pickle.load(f)
            print(f"✓ Class names loaded successfully!")
            print(f"  Number of classes: {len(class_names)}")
            print(f"  First 5 classes: {class_names[:5]}")
        else:
            print("✗ Class names file not found. Run training first.")
            return False
            
        print("\n✓ All files loaded successfully! The AI server is ready to use the trained model.")
        return True
        
    except Exception as e:
        print(f"✗ Error loading model: {e}")
        return False

if __name__ == "__main__":
    test_model_loading()