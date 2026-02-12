import requests

# Test the prediction API with a sample image
# Replace 'path_to_your_apple_scab_image.jpg' with the actual path to your image
image_path = input("Enter the path to your test image: ")

try:
    with open(image_path, 'rb') as img_file:
        files = {'image': img_file}
        response = requests.post('http://localhost:5000/predict', files=files)
        
    if response.status_code == 200:
        result = response.json()
        print(f"Predicted disease: {result['disease']}")
        print(f"Confidence: {result['confidence']:.2%}")
    else:
        print(f"Error: {response.status_code} - {response.text}")
        
except FileNotFoundError:
    print("File not found. Please check the image path.")
except Exception as e:
    print(f"Error: {e}")