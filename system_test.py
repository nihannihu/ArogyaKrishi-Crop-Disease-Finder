import requests
import time

def test_system():
    """Test the complete plant disease detection system"""
    print("Testing Plant Disease Detection System")
    print("=" * 40)
    
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
    
    print("\n" + "=" * 40)
    print("System Status:")
    if ai_server_running and web_server_running:
        print("   ✓ Both servers are running and ready!")
        print("\nTo test with a real plant disease image:")
        print("   1. Open your browser to http://localhost:3000")
        print("   2. Upload a plant leaf image")
        print("   3. Click 'Analyze'")
        print("   4. View the disease prediction and confidence score")
    else:
        print("   ⚠ Some components need attention")
        if not ai_server_running:
            print("   ✗ AI Server is not running")
        if not web_server_running:
            print("   ✗ Web Server is not running")

if __name__ == "__main__":
    test_system()