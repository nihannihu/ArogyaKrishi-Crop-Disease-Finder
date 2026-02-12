import tensorflow as tf
import os
import pickle
import shutil
from sklearn.model_selection import train_test_split

print(f"Using TensorFlow version: {tf.__version__}")

# --- 1. DEFINE YOUR SETTINGS ---

# Point this to the folder you extracted
# IMPORTANT: Make sure the path is correct!
data_dir = '../New Plant Diseases Dataset(Augmented)/New Plant Diseases Dataset(Augmented)'

# Define the paths to your training and validation data
train_dir = os.path.join(data_dir, 'train')
# We'll create a validation directory by splitting the training data
valid_dir = os.path.join(data_dir, 'valid')

# Create validation directory if it doesn't exist
if not os.path.exists(valid_dir):
    os.makedirs(valid_dir)
    print("Created validation directory")

# Model parameters
IMAGE_SIZE = (224, 224)  # The size to resize all images to
BATCH_SIZE = 32          # How many images to process at a time
EPOCHS = 10              # How many times to loop over the entire dataset

# --- 2. SPLIT DATA INTO TRAIN/VALIDATION ---

# If validation directory is empty, split the training data
if not os.listdir(valid_dir):
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

# --- 3. LOAD THE DATASET ---

# This is the magic function that reads the sub-folders
# It automatically labels the images based on their folder's name.
print("Loading training data...")
train_dataset = tf.keras.utils.image_dataset_from_directory(
    train_dir,
    label_mode='categorical', # Labels are categories (e.g., "Apple_scab")
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=True
)

print("Loading validation data...")
validation_dataset = tf.keras.utils.image_dataset_from_directory(
    valid_dir,
    label_mode='categorical',
    image_size=IMAGE_SIZE,
    batch_size=BATCH_SIZE,
    shuffle=False # No need to shuffle validation data
)

# Get the class names (the 38 disease names)
# This is a list like ['Apple___Apple_scab', 'Apple___Black_rot', ...]
class_names = train_dataset.class_names
num_classes = len(class_names)
print(f"\nFound {num_classes} classes: {class_names[:5]}...") # Print first 5

# --- 4. DEFINE THE MODEL (TRANSFER LEARNING) ---

print("\nBuilding model with 'MobileNetV2'...")
# Load a powerful, pre-trained base model (trained on millions of images)
# We won't train this part, just use its knowledge.
base_model = tf.keras.applications.MobileNetV2(
    input_shape=(*IMAGE_SIZE, 3), # (224, 224, 3)
    include_top=False,  # Don't include its final classification layer
    weights='imagenet'  # Use the standard weights
)

# Freeze the base model
base_model.trainable = False

# Build your new model on top of the base model
model = tf.keras.Sequential([
    base_model,
    tf.keras.layers.GlobalAveragePooling2D(), # Flattens the output
    tf.keras.layers.Dense(num_classes, activation='softmax') # Your final layer
])

# --- 5. COMPILE THE MODEL ---

# Tell the model how to learn
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy', # Good for multi-class classification
    metrics=['accuracy']
)

print("Model compiled. Summary:")
model.summary()

# --- 6. TRAIN THE MODEL ---

print(f"\nStarting training for {EPOCHS} epochs...")

# This is the "study session"
# It will take time, and you'll see the accuracy go up.
history = model.fit(
    train_dataset,
    validation_data=validation_dataset,
    epochs=EPOCHS
)

print("\nTraining complete!")

# --- 7. SAVE YOUR "BRAIN" ---

# 7a. Save the final trained model file
model_filename = 'leaf_disease_model.keras'
model.save(model_filename)
print(f"Model saved to {model_filename}")

# 7b. Save the class names (so you know what the predictions mean)
# We need this for our Python API
class_names_filename = 'class_names.pkl'
with open(class_names_filename, 'wb') as f:
    pickle.dump(class_names, f)
print(f"Class names saved to {class_names_filename}")