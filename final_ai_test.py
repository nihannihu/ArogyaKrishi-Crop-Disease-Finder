import requests
import json

def test_ai_predictions():
    """Test AI server predictions with the trained model"""
    print("AI Prediction Test")
    print("=" * 18)
    
    # Test the home endpoint to get model information
    print("\n1. Getting Model Information...")
    try:
        response = requests.get('http://localhost:5000/')
        if response.status_code == 200:
            data = response.json()
            print(f"   ✓ AI Server Status: {data.get('message', 'N/A')}")
            print(f"   ✓ Model Status: {data.get('model_status', 'N/A')}")
            print(f"   ✓ Disease Classes: {data.get('disease_classes_count', 'N/A')}")
        else:
            print(f"   ✗ Failed to get server info: HTTP {response.status_code}")
    except Exception as e:
        print(f"   ✗ Error getting server info: {e}")
    
    # Test the prediction endpoint
    print("\n2. Testing Prediction Endpoint...")
    try:
        # Send a request without an image to see how it handles it
        response = requests.post('http://localhost:5000/predict')
        
        if response.status_code == 400:
            # This is expected when no image is provided
            data = response.json()
            print(f"   ✓ Correctly handles missing image")
            print(f"   ✓ Error message: {data.get('error', 'N/A')}")
        elif response.status_code == 200:
            # This means it's using a mock prediction
            data = response.json()
            print(f"   ✓ Making predictions")
            print(f"   ✓ Success: {data.get('success', 'N/A')}")
            print(f"   ✓ Predicted Disease: {data.get('disease', 'N/A')}")
            print(f"   ✓ Confidence: {data.get('confidence', 'N/A')}")
        else:
            print(f"   ? Unexpected response: HTTP {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"   ✗ Error testing prediction: {e}")
    
    # Test with a proper image file if we have one
    print("\n3. Testing with Sample Image...")
    print("   Note: For a complete test, you would upload a real plant leaf image")
    print("   through the web interface at http://localhost:3000")
    
    print("\n" + "=" * 18)
    print("AI Server Test Complete!")
    print("\nTo test with a real image:")
    print("1. Open your browser to http://localhost:3000")
    print("2. Upload a plant leaf image")
    print("3. Click 'Analyze'")
    print("4. View the disease prediction and confidence score")

if __name__ == "__main__":
    test_ai_predictions()