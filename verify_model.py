import requests
import json

def verify_model():
    """Verify that the system is using the trained model"""
    print("Verifying Model Usage")
    print("=" * 25)
    
    # Check AI server status
    print("\n1. Checking AI Server Status...")
    try:
        response = requests.get('http://localhost:5000/')
        if response.status_code == 200:
            data = response.json()
            print(f"   ✓ AI Server is running")
            print(f"   ✓ Model Status: {data.get('model_status', 'N/A')}")
            print(f"   ✓ Using Mock Model: {data.get('using_mock_model', 'N/A')}")
            print(f"   ✓ Disease Classes: {data.get('disease_classes_count', 'N/A')}")
            
            if not data.get('using_mock_model', True):
                print("   ✓ CONFIRMED: Using trained model!")
            else:
                print("   ✗ WARNING: Still using mock model!")
        else:
            print(f"   ✗ AI Server returned status {response.status_code}")
    except Exception as e:
        print(f"   ✗ Error connecting to AI Server: {e}")
    
    print("\n" + "=" * 25)
    print("Verification Complete!")

if __name__ == "__main__":
    verify_model()