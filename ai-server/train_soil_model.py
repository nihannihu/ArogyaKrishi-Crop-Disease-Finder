"""
Script to train the soil type and fertilizer recommendation model
This is an example script - in a real scenario, you would need to adapt it to your dataset
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report
import pickle
import os

# Configuration
DATASET_PATH = "fertilizer_recommendation.csv"  # Update with your dataset path
MODEL_SAVE_PATH = "soil_model.pkl"

def load_data():
    """Load and prepare the dataset"""
    if not os.path.exists(DATASET_PATH):
        print(f"Dataset not found at {DATASET_PATH}")
        print("Please ensure you have the fertilizer recommendation dataset in CSV format")
        exit(1)
    
    # Load the dataset
    df = pd.read_csv(DATASET_PATH)
    return df

def prepare_features_labels(df):
    """Prepare features and labels for training"""
    # Assuming the dataset has columns: N, P, K, temperature, humidity, ph, rainfall, soil_type/fertilizer
    # Adjust column names based on your actual dataset
    
    feature_columns = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    label_column = 'soil_type'  # or 'fertilizer' depending on your dataset
    
    X = df[feature_columns]
    y = df[label_column]
    
    return X, y

def train_model(X, y):
    """Train the Random Forest model"""
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Create and train the model
    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate the model
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"Model Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))
    
    return model

def save_model(model, filepath):
    """Save the trained model to a file"""
    with open(filepath, 'wb') as f:
        pickle.dump(model, f)
    print(f"Model saved as {filepath}")

def main():
    """Main function to train the soil prediction model"""
    print("Loading data...")
    df = load_data()
    
    print("Preparing features and labels...")
    X, y = prepare_features_labels(df)
    
    print("Training model...")
    model = train_model(X, y)
    
    print("Saving model...")
    save_model(model, MODEL_SAVE_PATH)
    
    print("Training completed!")

if __name__ == "__main__":
    main()