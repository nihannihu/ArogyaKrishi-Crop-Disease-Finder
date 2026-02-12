import os
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import numpy as np
from PIL import Image
import random

# Path to the dataset
dataset_path = "New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)/train"

def extract_simple_features(image_path):
    """Extract simple features from an image (faster method)"""
    try:
        # Open and resize image to a very small size for quick processing
        img = Image.open(image_path)
        img = img.resize((32, 32))  # Very small size for speed
        img_array = np.array(img)
        
        # Calculate simple statistics instead of flattening all pixels
        # Mean and std for each channel
        features = []
        for channel in range(img_array.shape[2]):  # For each color channel
            channel_data = img_array[:, :, channel]
            features.extend([np.mean(channel_data), np.std(channel_data)])
        
        return np.array(features)
    except Exception as e:
        print(f"Error processing image {image_path}: {e}")
        # Return zeros if there's an error
        return np.zeros(6)

def load_sample_dataset():
    """Load a small sample of the dataset for quick training"""
    print("Loading sample dataset...")
    
    # Get all class directories
    class_dirs = [d for d in os.listdir(dataset_path) if os.path.isdir(os.path.join(dataset_path, d))]
    
    # Take only first 5 classes for quick training
    selected_classes = class_dirs[:5]
    print(f"Selected {len(selected_classes)} classes for training: {selected_classes}")
    
    # Create a mapping from class names to indices
    class_to_idx = {class_name: idx for idx, class_name in enumerate(selected_classes)}
    
    # Lists to store features and labels
    all_features = []
    all_labels = []
    
    # Process each selected class
    for class_name in selected_classes:
        class_path = os.path.join(dataset_path, class_name)
        class_idx = class_to_idx[class_name]
        
        # Get all images in this class
        images = [f for f in os.listdir(class_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        
        # Take only a small sample of images per class (e.g., 20 images)
        sample_images = random.sample(images, min(20, len(images)))
        print(f"Processing class: {class_name} ({len(sample_images)} images)")
        
        # Process sampled images
        for img_name in sample_images:
            img_path = os.path.join(class_path, img_name)
            features = extract_simple_features(img_path)
            all_features.append(features)
            all_labels.append(class_idx)
    
    return np.array(all_features), np.array(all_labels), selected_classes

def train_simple_model():
    """Train a very simple model quickly"""
    print("Starting quick training process...")
    
    # Load sample dataset
    X, y, class_names = load_sample_dataset()
    print(f"Dataset shape: {X.shape}")
    
    # Split into train and test sets
    split_idx = int(0.8 * len(X))
    X_train, X_test = X[:split_idx], X[split_idx:]
    y_train, y_test = y[:split_idx], y[split_idx:]
    
    # Train a simple Random Forest classifier
    print("Training simple Random Forest model...")
    model = RandomForestClassifier(n_estimators=50, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate on test set
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"Test Accuracy: {accuracy:.4f}")
    
    # Save the model and class names
    model_filename = 'quick_leaf_disease_model.pkl'
    with open(model_filename, 'wb') as f:
        pickle.dump(model, f)
    print(f"Model saved to {model_filename}")
    
    class_names_filename = 'quick_class_names.pkl'
    with open(class_names_filename, 'wb') as f:
        pickle.dump(class_names, f)
    print(f"Class names saved to {class_names_filename}")
    
    return model, class_names

if __name__ == "__main__":
    # Train the quick model
    model, class_names = train_simple_model()
    print("\nQuick training complete!")
    print(f"Model can classify {len(class_names)} different plant diseases")
    print("This is a simplified model for demonstration purposes.")