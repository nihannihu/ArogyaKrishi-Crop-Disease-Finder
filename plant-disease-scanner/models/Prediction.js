const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  diseaseName: {
    type: String,
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Index for faster queries
PredictionSchema.index({ timestamp: -1 });

module.exports = mongoose.model('Prediction', PredictionSchema);