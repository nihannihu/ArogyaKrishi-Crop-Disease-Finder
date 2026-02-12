import requests

def test_full_workflow():
    print("Testing full workflow...")
    
    # Test the analyze endpoint on the Node.js server
    try:
        # This will test the communication between Node.js server and AI server
        response = requests.post('http://localhost:3000/api/analyze', 
                               files={'image': ('test.jpg', b'test image data')})
        print(f"Full Workflow Status: {response.status_code}")
        print(f"Full Workflow Response: {response.json()}")
    except Exception as e:
        print(f"Error testing full workflow: {e}")

if __name__ == "__main__":
    test_full_workflow()