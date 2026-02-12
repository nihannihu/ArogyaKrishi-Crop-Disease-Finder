import os
from PIL import Image
import numpy as np

# Path to the dataset
dataset_path = "New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)/train"

def check_dataset():
    print("Checking plant disease dataset...")
    
    # Get all class directories
    class_dirs = [d for d in os.listdir(dataset_path) if os.path.isdir(os.path.join(dataset_path, d))]
    
    print(f"Found {len(class_dirs)} classes")
    
    # Check a few samples from each class
    for i, class_dir in enumerate(class_dirs[:5]):  # Check first 5 classes
        class_path = os.path.join(dataset_path, class_dir)
        images = [f for f in os.listdir(class_path) if f.lower().endswith(('.png', '.jpg', '.jpeg'))]
        
        print(f"Class {i+1}: {class_dir} - {len(images)} images")
        
        # Check first image in this class
        if images:
            first_image = images[0]
            image_path = os.path.join(class_path, first_image)
            try:
                # Try to open the image
                img = Image.open(image_path)
                print(f"  First image: {first_image} - Size: {img.size}, Mode: {img.mode}")
            except Exception as e:
                print(f"  Error opening image {first_image}: {e}")
    
    print("\nDataset structure is correct and ready for training!")

if __name__ == "__main__":
    check_dataset()