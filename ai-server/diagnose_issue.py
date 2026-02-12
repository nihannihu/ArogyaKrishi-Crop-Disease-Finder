import requests
import os
import sys

def test_ai_server_connection():
    """Test if AI server is responding correctly"""
    try:
        response = requests.get('http://localhost:5000')
        if response.status_code == 200:
            data = response.json()
            print("AI Server Status:")
            print(f"  Message: {data.get('message', 'N/A')}")
            print(f"  Model Status: {data.get('model_status', 'N/A')}")
            print(f"  Using Mock Model: {data.get('using_mock_model', 'N/A')}")
            print(f"  Disease Classes Count: {data.get('disease_classes_count', 'N/A')}")
            return True
        else:
            print(f"Error: AI server returned status code {response.status_code}")
            return False
    except Exception as e:
        print(f"Error connecting to AI server: {e}")
        return False

def test_image_prediction(image_path):
    """Test prediction with a specific image file"""
    if not os.path.exists(image_path):
        print(f"Error: Image file '{image_path}' not found!")
        return
    
    try:
        with open(image_path, 'rb') as img_file:
            files = {'image': img_file}
            response = requests.post('http://localhost:5000/predict', files=files)
            
        if response.status_code == 200:
            result = response.json()
            print(f"Prediction Result:")
            print(f"  Disease: {result.get('disease', 'N/A')}")
            print(f"  Confidence: {result.get('confidence', 'N/A')}")
            if 'confidence' in result:
                print(f"  Confidence Percentage: {result['confidence']*100:.2f}%")
        else:
            print(f"Error: AI server returned status code {response.status_code}")
            print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error during prediction: {e}")

if __name__ == "__main__":
    print("Diagnosing AI Model Issues")
    print("=" * 40)
    
    # Test server connection
    print("1. Testing AI Server Connection:")
    if test_ai_server_connection():
        print("✓ AI Server is running correctly\n")
    else:
        print("✗ AI Server connection failed\n")
        sys.exit(1)
    
    # If image path provided, test with that image
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        print(f"2. Testing Prediction with Image: {image_path}")
        test_image_prediction(image_path)
    else:
        print("2. No image provided for testing")
        print("Usage: python diagnose_issue.py <path_to_image_file>")
        print("Example: python diagnose_issue.py apple_scab_test.jpg")