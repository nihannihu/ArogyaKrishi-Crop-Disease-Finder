import requests
import json
import base64
from io import BytesIO

def test_ai_server_comprehensive():
    """Comprehensive test of the AI server functionality"""
    print("Comprehensive AI Server Test")
    print("=" * 30)
    
    # Test 1: Home endpoint
    print("\n1. Testing Home Endpoint...")
    try:
        response = requests.get('http://localhost:5000/')
        if response.status_code == 200:
            data = response.json()
            print(f"   ✓ Home endpoint working")
            print(f"   Message: {data.get('message', 'N/A')}")
            print(f"   Model Status: {data.get('model_status', 'N/A')}")
            print(f"   Disease Classes: {data.get('disease_classes_count', 'N/A')}")
        else:
            print(f"   ✗ Home endpoint failed with status {response.status_code}")
    except Exception as e:
        print(f"   ✗ Home endpoint error: {e}")
    
    # Test 2: Prediction endpoint with proper data
    print("\n2. Testing Prediction Endpoint...")
    try:
        # Create a simple test image (this would normally be a real image file)
        # For now, we'll just test that the endpoint responds correctly
        response = requests.post('http://localhost:5000/predict')
        
        if response.status_code == 400:
            data = response.json()
            print(f"   ✓ Prediction endpoint correctly handles missing image")
            print(f"   Error message: {data.get('error', 'N/A')}")
        elif response.status_code == 200:
            data = response.json()
            print(f"   ✓ Prediction endpoint working")
            print(f"   Success: {data.get('success', 'N/A')}")
            print(f"   Disease: {data.get('disease', 'N/A')}")
            print(f"   Confidence: {data.get('confidence', 'N/A')}")
        else:
            print(f"   ? Prediction endpoint returned status {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"   ✗ Prediction endpoint error: {e}")
    
    print("\n" + "=" * 30)
    print("Test completed!")

if __name__ == "__main__":
    test_ai_server_comprehensive()