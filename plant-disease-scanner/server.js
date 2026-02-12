const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const axios = require('axios');
const path = require('path');
const Result = require('./models/Result');
const DiseaseInfo = require('./models/DiseaseInfo');
const Prediction = require('./models/Prediction');

const app = express();
const PORT = process.env.PORT || 3000;

// Get AI server URL from environment variable or use default
const AI_SERVER_URL = process.env.AI_SERVER_URL || 'http://localhost:5000';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(express.static('public'));

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/plantDiseaseScanner';
mongoose.connect(MONGODB_URI);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route for history page
app.get('/history', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'history.html'));
});

// API endpoint for analyzing plant images
app.post('/api/analyze', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image uploaded' });
    }

    const imageFile = req.files.image;
    
    // Forward the image to the Python AI server
    try {
      // Send the image file directly as multipart form data
      const FormData = require('form-data');
      const form = new FormData();
      form.append('image', imageFile.data, {
        filename: imageFile.name,
        contentType: imageFile.mimetype
      });
      
      const aiResponse = await axios.post(`${AI_SERVER_URL}/predict`, form, {
        headers: {
          ...form.getHeaders()
        }
      });
      
      const result = new Result({
        disease: aiResponse.data.disease,
        confidence: aiResponse.data.confidence || 95, // Default confidence if not provided
        imageUrl: `/uploads/${imageFile.name}`
      });
      
      await result.save();
      
      // Save to prediction history
      const prediction = new Prediction({
        diseaseName: aiResponse.data.disease,
        confidence: aiResponse.data.confidence || 95,
        imageUrl: `/uploads/${imageFile.name}`
      });
      
      await prediction.save();
      
      // Send response back to frontend
      res.json({
        success: true,
        disease: aiResponse.data.disease,
        confidence: aiResponse.data.confidence || 95
      });
    } catch (aiError) {
      console.error('AI Server Error:', aiError.message);
      if (aiError.response) {
        console.error('AI Server Response:', aiError.response.data);
      }
      res.status(500).json({ error: 'Failed to get prediction from AI server' });
    }
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get disease documentation
app.get('/api/disease-info/:diseaseName', async (req, res) => {
  try {
    const diseaseInfo = await DiseaseInfo.findOne({ diseaseName: req.params.diseaseName });
    if (!diseaseInfo) {
      return res.status(404).json({ error: 'Disease information not found' });
    }
    res.json(diseaseInfo);
  } catch (error) {
    console.error('Error fetching disease info:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get prediction history
app.get('/api/history', async (req, res) => {
  try {
    const predictions = await Prediction.find({}).sort({ timestamp: -1 });
    res.json(predictions);
  } catch (error) {
    console.error('Error fetching prediction history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to clear prediction history
app.delete('/api/history', async (req, res) => {
  try {
    await Prediction.deleteMany({});
    res.json({ success: true, message: 'Prediction history cleared successfully' });
  } catch (error) {
    console.error('Error clearing prediction history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get weather-based risk alerts
app.get('/api/weather-alerts', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    
    // Get weather forecast from OpenWeatherMap
    const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY || '465c63cc77ee43d692f4e8c7a0dc430a';
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`;
    
    const weatherResponse = await axios.get(weatherUrl);
    const forecast = weatherResponse.data.list;
    
    // Disease risk conditions
    const diseaseConditions = {
      'Tomato___Late_blight': {
        name: 'Late Blight',
        conditions: [
          { humidity: '>90', temperature: '<25', rain: true }
        ]
      },
      'Tomato___Early_blight': {
        name: 'Early Blight',
        conditions: [
          { humidity: '>85', temperature: '15-25' }
        ]
      },
      'Tomato___Septoria_leaf_spot': {
        name: 'Septoria Leaf Spot',
        conditions: [
          { humidity: '>80', temperature: '18-25' }
        ]
      },
      'Potato___Late_blight': {
        name: 'Potato Late Blight',
        conditions: [
          { humidity: '>90', temperature: '<25', rain: true }
        ]
      },
      'Potato___Early_blight': {
        name: 'Potato Early Blight',
        conditions: [
          { humidity: '>85', temperature: '15-25' }
        ]
      },
      'Corn_(maize)___Common_rust': {
        name: 'Common Rust',
        conditions: [
          { humidity: '>80', temperature: '15-30' }
        ]
      },
      'Corn_(maize)___Northern_Leaf_Blight': {
        name: 'Northern Leaf Blight',
        conditions: [
          { humidity: '>85', temperature: '18-27' }
        ]
      },
      'Apple___Apple_scab': {
        name: 'Apple Scab',
        conditions: [
          { humidity: '>90', temperature: '15-23', rain: true }
        ]
      },
      'Grape___Black_rot': {
        name: 'Black Rot',
        conditions: [
          { humidity: '>85', temperature: '20-30' }
        ]
      },
      'Pepper,_bell___Bacterial_spot': {
        name: 'Bacterial Spot',
        conditions: [
          { humidity: '>85', temperature: '25-30', rain: true }
        ]
      }
      // Additional diseases can be added here
    };
    
    // Check for risk conditions in the next 3 days
    const riskAlerts = [];
    const today = new Date();
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    
    // Group forecast by day
    const dailyForecasts = {};
    forecast.forEach(item => {
      const date = new Date(item.dt * 1000).toISOString().split('T')[0];
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push(item);
    });
    
    // Check each disease condition
    Object.keys(diseaseConditions).forEach(diseaseKey => {
      const disease = diseaseConditions[diseaseKey];
      let riskCount = 0;
      
      Object.keys(dailyForecasts).slice(0, 3).forEach(date => {
        const dayForecasts = dailyForecasts[date];
        let conditionMet = false;
        
        // Check if any forecast for the day meets the conditions
        for (const forecastItem of dayForecasts) {
          const humidity = forecastItem.main.humidity;
          const temperature = forecastItem.main.temp;
          const rain = forecastItem.rain ? true : false;
          
          // Check all conditions for this disease
          let allConditionsMet = true;
          for (const condition of disease.conditions) {
            // Check humidity condition
            if (condition.humidity) {
              if (condition.humidity.startsWith('>')) {
                const minHumidity = parseFloat(condition.humidity.substring(1));
                if (humidity <= minHumidity) allConditionsMet = false;
              } else if (condition.humidity.startsWith('<')) {
                const maxHumidity = parseFloat(condition.humidity.substring(1));
                if (humidity >= maxHumidity) allConditionsMet = false;
              }
            }
            
            // Check temperature condition
            if (condition.temperature) {
              if (condition.temperature.includes('-')) {
                const [minTemp, maxTemp] = condition.temperature.split('-').map(parseFloat);
                if (temperature < minTemp || temperature > maxTemp) allConditionsMet = false;
              } else if (condition.temperature.startsWith('>')) {
                const minTemp = parseFloat(condition.temperature.substring(1));
                if (temperature <= minTemp) allConditionsMet = false;
              } else if (condition.temperature.startsWith('<')) {
                const maxTemp = parseFloat(condition.temperature.substring(1));
                if (temperature >= maxTemp) allConditionsMet = false;
              }
            }
            
            // Check rain condition
            if (condition.rain !== undefined && condition.rain !== rain) {
              allConditionsMet = false;
            }
          }
          
          if (allConditionsMet) {
            conditionMet = true;
            break;
          }
        }
        
        if (conditionMet) {
          riskCount++;
        }
      });
      
      if (riskCount > 0) {
        riskAlerts.push({
          disease: disease.name,
          diseaseKey: diseaseKey,
          riskLevel: riskCount >= 2 ? 'High' : 'Moderate',
          daysAtRisk: riskCount,
          message: `High risk of ${disease.name} in your area for the next 3 days. Consider preventative spraying.`
        });
      }
    });
    
    res.json({
      success: true,
      alerts: riskAlerts,
      location: { lat, lon }
    });
  } catch (error) {
    console.error('Error fetching weather alerts:', error);
    res.status(500).json({ error: 'Failed to fetch weather alerts' });
  }
});

// Handle GET requests to /api/analyze by redirecting to the main page
app.get('/api/analyze', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});