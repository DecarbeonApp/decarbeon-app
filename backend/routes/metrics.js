const express = require('express');
const router = express.Router();
const { CarbonMetrics, MonthlyEmissions, EmissionsByCategory } = require('../models/carbonMetrics');
const { WaterMetrics, MonthlyWater, WaterSource, WaterEfficiency } = require('../models/waterMetrics');
const { WasteMetrics, MonthlyWaste, WasteComposition, DisposalMethod, RecyclingEffectiveness } = require('../models/wasteMetrics');

// Carbon Metrics Routes
router.get('/carbon', async (req, res) => {
  try {
    const scope = req.query.scope || 'scope1';
    const metrics = await CarbonMetrics.find({ scope });
    const monthlyData = await MonthlyEmissions.find().sort({ date: 1 });
    const categoryData = await EmissionsByCategory.find();

    res.json({
      metrics,
      monthlyData,
      categoryData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/carbon', async (req, res) => {
  try {
    const carbonMetric = new CarbonMetrics(req.body);
    const newMetric = await carbonMetric.save();
    res.status(201).json(newMetric);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Water Metrics Routes
router.get('/water', async (req, res) => {
  try {
    const metrics = await WaterMetrics.find();
    const monthlyData = await MonthlyWater.find().sort({ date: 1 });
    const sourceData = await WaterSource.find();
    const efficiencyData = await WaterEfficiency.find();

    res.json({
      metrics,
      monthlyData,
      sourceData,
      efficiencyData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/water', async (req, res) => {
  try {
    const waterMetric = new WaterMetrics(req.body);
    const newMetric = await waterMetric.save();
    res.status(201).json(newMetric);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Waste Metrics Routes
router.get('/waste', async (req, res) => {
  try {
    const metrics = await WasteMetrics.find();
    const monthlyData = await MonthlyWaste.find().sort({ date: 1 });
    const compositionData = await WasteComposition.find();
    const disposalData = await DisposalMethod.find();
    const recyclingData = await RecyclingEffectiveness.find();

    res.json({
      metrics,
      monthlyData,
      compositionData,
      disposalData,
      recyclingData
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/waste', async (req, res) => {
  try {
    const wasteMetric = new WasteMetrics(req.body);
    const newMetric = await wasteMetric.save();
    res.status(201).json(newMetric);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

const EnergyMetrics = require('../models/energyMetrics');

// GET Energy Metrics
router.get('/energy', async (req, res) => {
  try {
    const energyData = await EnergyMetrics.find().sort({ year: 1, month: 1 });
    res.json(energyData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new Energy Metric
router.post('/energy', async (req, res) => {
  try {
    const newEntry = new EnergyMetrics(req.body);
const saved = await newEntry.save();

// WebSocket broadcast here
const { broadcastData } = require('../ws'); // move function to its own file if needed

broadcastData({
  type: 'data_update',
  data: {
    energyMetrics: saved
  }
});

res.status(201).json(saved);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
