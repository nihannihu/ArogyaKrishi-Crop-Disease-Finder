import requests
import json

def test_ai_server():
    """Test if the AI server is running and responding correctly"""
    print("Testing AI Server...")
    
    # Test home endpoint
    try:
        response = requests.get('http://localhost:5000/')
        if response.status_code == 200:
            data = response.json()
            print(f"✓ Home endpoint working: {data}")
            # Check if it's using the trained model or mock model
            if 'model_status' in data:
                print(f"  Model Status: {data['model_status']}")
        else:
            print(f"✗ Home endpoint failed with status {response.status_code}")
    except Exception as e:
        print(f"✗ Home endpoint error: {e}")
    
    # Test prediction endpoint with mock data
    try:
        # We'll send a simple POST request to test the endpoint
        response = requests.post('http://localhost:5000/predict', 
                               data={'test': 'data'})
        print(f"✓ Prediction endpoint responding (status: {response.status_code})")
        if response.status_code == 200:
            data = response.json()
            print(f"  Response: {data}")
    except Exception as e:
        print(f"✗ Prediction endpoint error: {e}")

if __name__ == "__main__":
    test_ai_server()