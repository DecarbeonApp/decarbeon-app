const mongoose = require('mongoose');

const wasteMetricsSchema = new mongoose.Schema({
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

const monthlyWasteSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true
  },
  recyclable: {
    type: Number,
    required: true
  },
  organic: {
    type: Number,
    required: true
  },
  hazardous: {
    type: Number,
    required: true
  },
  landfill: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const wasteCompositionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  children: [{
    name: {
      type: String,
      required: true
    },
    size: {
      type: Number,
      required: true
    }
  }]
});

const disposalMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

const recyclingEffectivenessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  efficiency: {
    type: Number,
    required: true
  },
  volume: {
    type: Number,
    required: true
  },
  recovery: {
    type: Number,
    required: true
  }
});

const WasteMetrics = mongoose.model('WasteMetrics', wasteMetricsSchema);
const MonthlyWaste = mongoose.model('MonthlyWaste', monthlyWasteSchema);
const WasteComposition = mongoose.model('WasteComposition', wasteCompositionSchema);
const DisposalMethod = mongoose.model('DisposalMethod', disposalMethodSchema);
const RecyclingEffectiveness = mongoose.model('RecyclingEffectiveness', recyclingEffectivenessSchema);

module.exports = {
  WasteMetrics,
  MonthlyWaste,
  WasteComposition,
  DisposalMethod,
  RecyclingEffectiveness
};