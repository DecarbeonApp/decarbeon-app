const mongoose = require('mongoose');

const energyMetricsSchema = new mongoose.Schema({
  source: {
    type: String, // e.g., 'Electricity', 'Natural Gas', 'Renewable'
    required: true
  },
  value: {
    type: Number, // monthly value or total kWh
    required: true
  },
  month: {
    type: String, // e.g., 'January', 'Feb', etc.
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const EnergyMetrics = mongoose.model('EnergyMetrics', energyMetricsSchema);
module.exports = EnergyMetrics;
