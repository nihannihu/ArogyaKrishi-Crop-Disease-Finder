import requests
import json

def test_api():
    """Test the API endpoints"""
    print("Testing API Endpoints")
    print("=" * 20)
    
    # Test GET request to /api/analyze
    print("\n1. Testing GET /api/analyze...")
    try:
        response = requests.get('http://localhost:3000/api/analyze')
        print(f"   Status Code: {response.status_code}")
        if response.status_code == 200:
            print("   ✓ GET request successful")
        else:
            print(f"   ✗ GET request failed with status {response.status_code}")
    except Exception as e:
        print(f"   ✗ Error: {e}")
    
    print("\n" + "=" * 20)
    print("API Test Complete!")

if __name__ == "__main__":
    test_api()