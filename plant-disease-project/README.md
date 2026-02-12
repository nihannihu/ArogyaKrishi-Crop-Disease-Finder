# Plant Disease Model Training

This directory contains scripts for training the plant disease detection model using the provided dataset.

## Prerequisites

Before running the training script, ensure you have the following Python packages installed:

```bash
pip install tensorflow scikit-learn pillow numpy
```

## Training Script

The [train.py](file://c:\Users\nihan\OneDrive\Desktop\hackathon\plant%20desiase%20scanner\plant-disease-project\train.py) script performs the following steps:

1. **Data Preparation**: 
   - Automatically splits the training data into train/validation sets (80/20 split)
   - Creates a validation directory if it doesn't exist

2. **Model Architecture**:
   - Uses MobileNetV2 as the base model (pre-trained on ImageNet)
   - Adds custom classification layers on top
   - Freezes the base model weights (transfer learning)

3. **Training Process**:
   - Trains for 10 epochs by default
   - Uses categorical crossentropy loss
   - Adam optimizer
   - Batch size of 32

4. **Output**:
   - Saves the trained model as `leaf_disease_model.keras`
   - Saves class names as `class_names.pkl`

## How to Run Training

1. Ensure you're in the `plant-disease-project` directory
2. Run the training script:
   ```bash
   python train.py
   ```

3. The script will:
   - Load and preprocess the dataset
   - Build the model
   - Train the model
   - Save the trained model and class names

## Validation Script

The [validate_model.py](file://c:\Users\nihan\OneDrive\Desktop\hackathon\plant%20desiase%20scanner\plant-disease-project\validate_model.py) script can be used to test the trained model:

```bash
python validate_model.py
```

## Model Integration

Once training is complete, update the AI server to use the trained model by:

1. Moving the generated `leaf_disease_model.keras` and `class_names.pkl` files to the `ai-server` directory
2. Updating the AI server code to load these files instead of using mock predictions

## Customization

You can modify the training parameters in [train.py](file://c:\Users\nihan\OneDrive\Desktop\hackathon\plant%20desiase%20scanner\plant-disease-project\train.py):

- `EPOCHS`: Number of training epochs
- `BATCH_SIZE`: Batch size for training
- `IMAGE_SIZE`: Image size for preprocessing