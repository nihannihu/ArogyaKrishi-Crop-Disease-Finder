"""
Demo client to test the AI server
This script demonstrates how to communicate with the AI server
"""

import requests
import json

# AI Server URL
AI_SERVER_URL = "http://localhost:5000"

def test_ai_server():
    """Test the AI server endpoints"""
    print("Testing AI Server...")
    
    # Test home endpoint
    try:
        response = requests.get(f"{AI_SERVER_URL}/")
        print(f"Home endpoint response: {response.json()}")
    except requests.exceptions.RequestException as e:
        print(f"Error connecting to AI server: {e}")
        return
    
    # Test predict endpoint with mock data
    print("\nTesting predict endpoint...")
    try:
        # In a real scenario, you would send an actual image file
        # For demo purposes, we're sending mock data
        payload = {
            "image": "mock_image_data"
        }
        
        response = requests.post(
            f"{AI_SERVER_URL}/predict",
            json=payload
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"Prediction result: {result}")
        else:
            print(f"Error from AI server: {response.status_code} - {response.text}")
            
    except requests.exceptions.RequestException as e:
        print(f"Error sending request to AI server: {e}")

if __name__ == "__main__":
    test_ai_server()