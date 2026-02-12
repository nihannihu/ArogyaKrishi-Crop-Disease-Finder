const mongoose = require('mongoose');

// Enhanced schema for storing analysis results
const ResultSchema = new mongoose.Schema({
  // Disease detection results
  disease: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100
  },
  
  // Soil analysis results (for future implementation)
  soilType: {
    type: String
  },
  nutrientLevels: {
    nitrogen: Number,
    phosphorus: Number,
    potassium: Number
  },
  fertilizerRecommendation: {
    type: String
  },
  
  // Metadata
  imageUrl: {
    type: String
  },
  location: {
    latitude: Number,
    longitude: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Index for faster queries
ResultSchema.index({ timestamp: -1 });
ResultSchema.index({ disease: 1 });

module.exports = mongoose.model('Result', ResultSchema);