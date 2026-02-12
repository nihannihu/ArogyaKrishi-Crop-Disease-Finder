const mongoose = require('mongoose');

const DiseaseInfoSchema = new mongoose.Schema({
  diseaseName: {
    type: String,
    required: true,
    unique: true
  },
  plantType: {
    type: String,
    required: true
  },
  scientificName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  symptoms: {
    type: [String],
    required: true
  },
  causes: {
    type: [String],
    required: true
  },
  prevention: {
    type: [String],
    required: true
  },
  treatment: {
    type: [String],
    required: true
  },
  fertilizers: {
    type: [String],
    required: true
  },
  pesticides: {
    type: [String],
    required: true
  },
  naturalRemedies: {
    type: [String],
    required: true
  },
  bestPractices: {
    type: [String],
    required: true
  }
});

// Index for faster queries
DiseaseInfoSchema.index({ diseaseName: 1 });

module.exports = mongoose.model('DiseaseInfo', DiseaseInfoSchema);