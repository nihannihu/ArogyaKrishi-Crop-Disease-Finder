"""
Script to fine-tune the existing plant disease detection model
This script assumes you have a directory structure like:
- dataset/
  - Apple___Apple_scab/
    - image1.jpg
    - image2.jpg
    - ...
  - Tomato___Late_blight/
    - image1.jpg
    - image2.jpg
    - ...
  - ...
"""

import os
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.optimizers import Adam
import pickle

# Load the existing model
print("Loading existing model...")
model = load_model('leaf_disease_model.keras')

# Load class names
with open('class_names.pkl', 'rb') as f:
    class_names = pickle.load(f)

print(f"Model loaded. Can classify {len(class_names)} diseases.")

# Set up data generators for fine-tuning
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    horizontal_flip=True,
    validation_split=0.2
)

# Path to your dataset directory
dataset_path = input("Enter path to your dataset directory (or press Enter to skip): ")

if dataset_path and os.path.exists(dataset_path):
    print("Setting up data generators...")
    
    train_generator = train_datagen.flow_from_directory(
        dataset_path,
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        subset='training'
    )
    
    validation_generator = train_datagen.flow_from_directory(
        dataset_path,
        target_size=(224, 224),
        batch_size=32,
        class_mode='categorical',
        subset='validation'
    )
    
    # Compile model with a lower learning rate for fine-tuning
    model.compile(
        optimizer=Adam(learning_rate=0.0001),  # Lower learning rate
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    print("Starting fine-tuning...")
    # Fine-tune the model
    history = model.fit(
        train_generator,
        epochs=10,
        validation_data=validation_generator
    )
    
    # Save the fine-tuned model
    model.save('leaf_disease_model_finetuned.keras')
    print("Fine-tuned model saved as 'leaf_disease_model_finetuned.keras'")
    
    # Update class names if needed
    new_class_names = list(train_generator.class_indices.keys())
    with open('class_names_finetuned.pkl', 'wb') as f:
        pickle.dump(new_class_names, f)
    print("Updated class names saved as 'class_names_finetuned.pkl'")
else:
    print("Skipping fine-tuning. To fine-tune, organize your dataset in folders by disease type.")
    
print("\nTo use the fine-tuned model, replace the existing model files:")
print("1. Rename 'leaf_disease_model_finetuned.keras' to 'leaf_disease_model.keras'")
print("2. Rename 'class_names_finetuned.pkl' to 'class_names.pkl'")
print("3. Restart your AI server")