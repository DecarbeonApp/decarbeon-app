const mongoose = require('mongoose');

const waterMetricsSchema = new mongoose.Schema({
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
  efficiency: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const monthlyWaterSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  consumption: {
    type: Number,
    required: true
  },
  recycled: {
    type: Number,
    required: true
  },
  process: {
    type: Number,
    required: true
  },
  cooling: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const waterSourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

const waterEfficiencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  efficiency: {
    type: Number,
    required: true
  },
  fill: {
    type: String,
    required: true
  }
});

const WaterMetrics = mongoose.model('WaterMetrics', waterMetricsSchema);
const MonthlyWater = mongoose.model('MonthlyWater', monthlyWaterSchema);
const WaterSource = mongoose.model('WaterSource', waterSourceSchema);
const WaterEfficiency = mongoose.model('WaterEfficiency', waterEfficiencySchema);

module.exports = {
  WaterMetrics,
  MonthlyWater,
  WaterSource,
  WaterEfficiency
};