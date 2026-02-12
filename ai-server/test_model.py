import pickle

# Load class names to see what diseases the model can detect
try:
    with open('class_names.pkl', 'rb') as f:
        class_names = pickle.load(f)
    print(f"Model can classify {len(class_names)} different plant diseases:")
    for i, disease in enumerate(class_names):
        print(f"{i+1}. {disease}")
except Exception as e:
    print(f"Error loading class names: {e}")