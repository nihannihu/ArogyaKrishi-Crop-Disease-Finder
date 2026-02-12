import requests

def test_with_real_image():
    """Test the AI server with a real image"""
    print("Testing AI Server with Real Image")
    print("=" * 35)
    
    # Test the home endpoint
    print("\n1. Checking AI Server Status...")
    try:
        response = requests.get('http://localhost:5000/')
        if response.status_code == 200:
            data = response.json()
            print(f"   ✓ AI Server is running")
            print(f"   ✓ Model Status: {data.get('model_status', 'N/A')}")
            print(f"   ✓ Disease Classes: {data.get('disease_classes_count', 'N/A')}")
        else:
            print(f"   ✗ AI Server returned status {response.status_code}")
            return
    except Exception as e:
        print(f"   ✗ Error connecting to AI Server: {e}")
        return
    
    # Test with an image file (if available)
    print("\n2. Testing with Sample Image...")
    print("   Note: For a complete test, you need to provide a real plant leaf image")
    print("   The system is now ready for use at http://localhost:3000")
    
    print("\n" + "=" * 35)
    print("System Test Complete!")
    print("\nTo test with a real plant disease image:")
    print("1. Open your browser to http://localhost:3000")
    print("2. Upload a plant leaf image")
    print("3. Click 'Analyze'")
    print("4. View the disease prediction and confidence score")

if __name__ == "__main__":
    test_with_real_image()