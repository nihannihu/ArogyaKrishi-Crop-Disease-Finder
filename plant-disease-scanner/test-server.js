/**
 * Test script for the Plant Disease Scanner server
 * This script demonstrates how to interact with the Node.js server
 */

const axios = require('axios');
const fs = require('fs');

// Server URL
const SERVER_URL = "http://localhost:3000";

async function testServer() {
    console.log("Testing Plant Disease Scanner Server...");
    
    // Test home endpoint
    try {
        const response = await axios.get(SERVER_URL);
        console.log("Home endpoint test:", response.status === 200 ? "PASSED" : "FAILED");
    } catch (error) {
        console.log("Home endpoint test: FAILED -", error.message);
    }
    
    // Test API endpoint (without actual file upload)
    try {
        const response = await axios.post(`${SERVER_URL}/api/analyze`, {
            // Mock data - in reality you would send a file
            image: "mock_image_data"
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        console.log("API endpoint test:", response.status === 200 ? "PASSED" : "FAILED");
        console.log("Response:", response.data);
    } catch (error) {
        console.log("API endpoint test: FAILED -", error.message);
    }
}

// Run the tests
testServer();