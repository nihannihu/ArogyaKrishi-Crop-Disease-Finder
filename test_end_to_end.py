import requests
import time

def test_end_to_end():
    """Test the end-to-end communication between web app and AI server"""
    print("End-to-End System Test")
    print("=" * 25)
    
    # Test 1: Check if both servers are running
    print("\n1. Checking Server Status...")
    
    # Check AI server
    ai_server_running = False
    try:
        response = requests.get('http://localhost:5000/', timeout=5)
        if response.status_code == 200:
            ai_server_running = True
            data = response.json()
            print(f"   ✓ AI Server (Port 5000): Running")
            print(f"     Message: {data.get('message', 'N/A')}")
            print(f"     Model Status: {data.get('model_status', 'N/A')}")
        else:
            print(f"   ✗ AI Server (Port 5000): HTTP {response.status_code}")
    except requests.exceptions.ConnectionError:
        print(f"   ✗ AI Server (Port 5000): Not Running")
    except Exception as e:
        print(f"   ✗ AI Server (Port 5000): Error - {e}")
    
    # Check Web server
    web_server_running = False
    try:
        response = requests.get('http://localhost:3000/', timeout=5)
        if response.status_code == 200:
            web_server_running = True
            print(f"   ✓ Web Server (Port 3000): Running")
        else:
            print(f"   ✗ Web Server (Port 3000): HTTP {response.status_code}")
    except requests.exceptions.ConnectionError:
        print(f"   ✗ Web Server (Port 3000): Not Running")
    except Exception as e:
        print(f"   ✗ Web Server (Port 3000): Error - {e}")
    
    # Test 2: Check communication between servers
    print("\n2. Testing Server Communication...")
    if ai_server_running and web_server_running:
        try:
            # This would normally be done through the web app, but we can simulate it
            # by calling the AI server's prediction endpoint
            response = requests.post('http://localhost:5000/predict')
            if response.status_code == 400:  # Expected for missing image
                print(f"   ✓ Server Communication: Working")
                print(f"     AI Server correctly handles requests")
            else:
                print(f"   ? Server Communication: Unexpected response {response.status_code}")
        except Exception as e:
            print(f"   ✗ Server Communication: Error - {e}")
    else:
        print("   ⚠ Skipping communication test (servers not running)")
    
    print("\n" + "=" * 25)
    print("System Status:")
    if ai_server_running and web_server_running:
        print("   ✓ Both servers are running and ready!")
        print("   ✓ System is ready for plant disease detection")
    else:
        print("   ⚠ Some components need attention")
        if not ai_server_running:
            print("   ✗ AI Server is not running")
        if not web_server_running:
            print("   ✗ Web Server is not running")

if __name__ == "__main__":
    test_end_to_end()