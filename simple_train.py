import os
import pickle
import shutil
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import numpy as np
from PIL import Image

# Path to the dataset
dataset_path = "New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)"

# Define the paths to your training and validation data
train_dir = os.path.join(dataset_path, 'train')
valid_dir = os.path.join(dataset_path, 'valid')

# Create validation directory if it doesn't exist
if not os.path.exists(valid_dir):
    os.makedirs(valid_dir)
    print("Created validation directory")

def split_data():
    """Split training data into train/validation sets"""
    print("Splitting training data into train/validation...")
    
    # Get all class directories
    class_dirs = [d for d in os.listdir(train_dir) if os.path.isdir(os.path.join(train_dir, d))]
    
    for class_dir in class_dirs:
        class_train_path = os.path.join(train_dir, class_dir)
        class_valid_path = os.path.join(valid_dir, class_dir)
        
        # Create validation class directory
        os.makedirs(class_valid_path, exist_ok=True)
        
        # Get all images in this class
        images = [f for f in os.listdir(class_train_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        
        # Split into train/validation (80/20)
        train_images, valid_images = train_test_split(images, test_size=0.2, random_state=42)
        
        # Move validation images
        for img in valid_images:
            src = os.path.join(class_train_path, img)
            dst = os.path.join(class_valid_path, img)
            shutil.move(src, dst)
    
    print("Data split complete!")

def extract_features(image_path):
    """Extract simple features from an image"""
    try:
        # Open and resize image
        img = Image.open(image_path)
        img = img.resize((64, 64))  # Resize to smaller size for faster processing
        img_array = np.array(img)
        
        # Flatten the image array
        features = img_array.flatten()
        
        # Normalize features
        features = features / 255.0
        
        return features
    except Exception as e:
        print(f"Error processing image {image_path}: {e}")
        # Return zeros if there's an error
        return np.zeros(64 * 64 * 3)

def load_dataset(data_dir):
    """Load dataset and extract features"""
    print(f"Loading dataset from {data_dir}...")
    
    # Get all class directories
    class_dirs = [d for d in os.listdir(data_dir) if os.path.isdir(os.path.join(data_dir, d))]
    
    # Create a mapping from class names to indices
    class_to_idx = {class_name: idx for idx, class_name in enumerate(class_dirs)}
    
    # Lists to store features and labels
    all_features = []
    all_labels = []
    
    # Process each class
    for class_name in class_dirs:
        class_path = os.path.join(data_dir, class_name)
        class_idx = class_to_idx[class_name]
        
        # Get all images in this class
        images = [f for f in os.listdir(class_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        
        print(f"Processing class: {class_name} ({len(images)} images)")
        
        # Process a subset of images for faster training (you can increase this for better accuracy)
        sample_size = min(100, len(images))  # Process up to 100 images per class
        for img_name in images[:sample_size]:
            img_path = os.path.join(class_path, img_name)
            features = extract_features(img_path)
            all_features.append(features)
            all_labels.append(class_idx)
    
    return np.array(all_features), np.array(all_labels), class_dirs

def train_model():
    """Train a simple model using Random Forest"""
    print("Starting training process...")
    
    # Split data if validation directory is empty
    if not os.listdir(valid_dir):
        split_data()
    
    # Load training data
    X_train, y_train, class_names = load_dataset(train_dir)
    print(f"Training data shape: {X_train.shape}")
    
    # Load validation data
    X_val, y_val, _ = load_dataset(valid_dir)
    print(f"Validation data shape: {X_val.shape}")
    
    # Train a Random Forest classifier
    print("Training Random Forest model...")
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate on validation set
    y_pred = model.predict(X_val)
    accuracy = accuracy_score(y_val, y_pred)
    
    print(f"Validation Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    # We'll create a simple report since we have many classes
    print(f"Accuracy: {accuracy:.4f}")
    
    # Save the model and class names
    model_filename = 'simple_leaf_disease_model.pkl'
    with open(model_filename, 'wb') as f:
        pickle.dump(model, f)
    print(f"Model saved to {model_filename}")
    
    class_names_filename = 'class_names.pkl'
    with open(class_names_filename, 'wb') as f:
        pickle.dump(class_names, f)
    print(f"Class names saved to {class_names_filename}")
    
    return model, class_names

if __name__ == "__main__":
    # Train the model
    model, class_names = train_model()
    print("\nTraining complete!")
    print(f"Model can classify {len(class_names)} different plant diseases")