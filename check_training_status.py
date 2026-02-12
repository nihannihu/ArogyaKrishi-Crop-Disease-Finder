import os
import time
from datetime import datetime

def check_training_status():
    """Check the status of the training process and model files"""
    print("Plant Disease Detection Training Status Checker")
    print("=" * 50)
    
    # Check if the training process is running
    print("\n1. Checking Training Process...")
    try:
        # Get list of Python processes
        result = os.popen('tasklist /FI "IMAGENAME eq python.exe" /FO CSV').read()
        if 'train_plant_disease_model.py' in result:
            print("   ✓ Training process is running")
        else:
            print("   ⚠ Training process may not be running")
    except Exception as e:
        print(f"   ✗ Error checking processes: {e}")
    
    # Check for model files
    print("\n2. Checking Model Files...")
    model_files = [
        'ai-server/leaf_disease_model.keras',
        'ai-server/class_names.pkl'
    ]
    
    for file_path in model_files:
        if os.path.exists(file_path):
            file_size = os.path.getsize(file_path)
            modified_time = os.path.getmtime(file_path)
            modified_str = datetime.fromtimestamp(modified_time).strftime('%Y-%m-%d %H:%M:%S')
            print(f"   ✓ {file_path}")
            print(f"     Size: {file_size} bytes")
            print(f"     Last modified: {modified_str}")
        else:
            print(f"   ✗ {file_path} (Not found)")
    
    # Check for quick model files (indicates training may have completed)
    print("\n3. Checking Quick Model Files...")
    quick_files = [
        'ai-server/quick_leaf_disease_model.pkl',
        'ai-server/quick_class_names.pkl'
    ]
    
    for file_path in quick_files:
        if os.path.exists(file_path):
            file_size = os.path.getsize(file_path)
            modified_time = os.path.getmtime(file_path)
            modified_str = datetime.fromtimestamp(modified_time).strftime('%Y-%m-%d %H:%M:%S')
            print(f"   ✓ {file_path}")
            print(f"     Size: {file_size} bytes")
            print(f"     Last modified: {modified_str}")
        else:
            print(f"   ✗ {file_path} (Not found)")
    
    print("\n" + "=" * 50)
    print("Status Check Complete")

if __name__ == "__main__":
    check_training_status()