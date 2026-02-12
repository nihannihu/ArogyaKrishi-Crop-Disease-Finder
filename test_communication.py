import requests
import json

def test_servers():
    print("Testing communication between servers...")
    
    # Test AI server
    try:
        ai_response = requests.get('http://localhost:5000/')
        print(f"AI Server Status: {ai_response.status_code}")
        print(f"AI Server Response: {ai_response.json()}")
    except Exception as e:
        print(f"Error connecting to AI server: {e}")
        return
    
    # Test web server
    try:
        web_response = requests.get('http://localhost:3000/')
        print(f"Web Server Status: {web_response.status_code}")
        # Print first 100 characters of response
        print(f"Web Server Response (first 100 chars): {web_response.text[:100]}...")
    except Exception as e:
        print(f"Error connecting to web server: {e}")
        return
    
    # Test AI prediction endpoint
    try:
        predict_response = requests.post('http://localhost:5000/predict', 
                                       json={'image': 'test'})
        print(f"AI Prediction Status: {predict_response.status_code}")
        print(f"AI Prediction Response: {predict_response.json()}")
    except Exception as e:
        print(f"Error testing AI prediction: {e}")
        return

if __name__ == "__main__":
    test_servers()