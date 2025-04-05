const mongoose = require('mongoose');

const carbonMetricsSchema = new mongoose.Schema({
  scope: {
    type: String,
    enum: ['scope1', 'scope2', 'scope3'],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  target: {
    type: Number,
    required: true
  },
  intensity: {
    type: Number,
    required: true
  },
  reduction: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const monthlyEmissionsSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  scope1: {
    type: Number,
    required: true
  },
  scope2: {
    type: Number,
    required: true
  },
  scope3: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const emissionsByCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  fullMark: {
    type: Number,
    default: 100
  }
});

const CarbonMetrics = mongoose.model('CarbonMetrics', carbonMetricsSchema);
const MonthlyEmissions = mongoose.model('MonthlyEmissions', monthlyEmissionsSchema);
const EmissionsByCategory = mongoose.model('EmissionsByCategory', emissionsByCategorySchema);

module.exports = {
  CarbonMetrics,
  MonthlyEmissions,
  EmissionsByCategory
};