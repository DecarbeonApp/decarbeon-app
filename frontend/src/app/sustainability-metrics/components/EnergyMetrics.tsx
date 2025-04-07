"use client";

import { useState } from "react";
import MetricsActionButtons from '@/components/MetricsActionButtons';
import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2D6A4F", "#52796F", "#84A098", "#B7C4C1"];

const energyData = [
  { month: "Jan", electricity: 1200, natural_gas: 800, renewable: 400 },
  { month: "Feb", electricity: 1300, natural_gas: 750, renewable: 450 },
  { month: "Mar", electricity: 1100, natural_gas: 900, renewable: 500 },
  { month: "Apr", electricity: 1400, natural_gas: 850, renewable: 550 },
  { month: "May", electricity: 1500, natural_gas: 700, renewable: 600 },
  { month: "Jun", electricity: 1600, natural_gas: 650, renewable: 650 },
];

const energySourceData = [
  { name: "Electricity", value: 45 },
  { name: "Natural Gas", value: 35 },
  { name: "Renewable Energy", value: 20 },
];

const efficiencyTrends = [
  { year: "2020", efficiency: 70 },
  { year: "2021", efficiency: 75 },
  { year: "2022", efficiency: 82 },
  { year: "2023", efficiency: 88 },
];

const commonStyles = {
  textFieldStyle: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#2D6A4F',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#2D6A4F',
    },
  },
  selectStyle: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#2D6A4F',
      },
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: '#2D6A4F',
    },
  },
};

export default function EnergyMetrics() {
  const [energyMetrics, setEnergyMetrics] = useState({
    month: new Date().toISOString().slice(0, 7),
    electricityConsumption: "",
    naturalGasConsumption: "",
    renewableEnergy: "",
    energyIntensity: "",
    sourceType: "electricity",
    peakDemand: "",
    demandResponse: "",
    solarCapacity: "",
    windCapacity: "",
    batteryStorage: "",
    gridReliability: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEnergyMetrics((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    setEnergyMetrics((prev) => ({ ...prev, sourceType: e.target.value }));
  };

  return (
    <div className="w-full">
      <div
        className="previewSection"
        style={{
          padding: "32px",
          marginBottom: "2rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px"
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{ flexWrap: "nowrap", overflowX: "auto", pb: 2 }}
        >
          <Grid
            item
            style={{
              minWidth: "33%",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#2D6A4F", fontWeight: 600, mb: 1 }}
            >
              Energy Consumption by Source
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={energyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="electricity"
                  fill={COLORS[0]}
                  name="Electricity"
                />
                <Bar
                  dataKey="natural_gas"
                  fill={COLORS[1]}
                  name="Natural Gas"
                />
                <Bar dataKey="renewable" fill={COLORS[2]} name="Renewable" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid
            item
            style={{
              minWidth: "33%",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#2D6A4F", fontWeight: 600, mb: 1 }}
            >
              Energy Source Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={energySourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {energySourceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
          <Grid
            item
            style={{
              minWidth: "33%",
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "#2D6A4F", fontWeight: 600, mb: 1 }}
            >
              Energy Efficiency Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={efficiencyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="efficiency"
                  stroke={COLORS[0]}
                  name="Efficiency %"
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <div
          style={{
            padding: "12px 24px",
            backgroundColor: "#e8f5e9",
            borderRadius: "8px 8px 0 0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" color="#2c6e49">
              Input Data
            </Typography>
            <Typography variant="caption" color="#2c6e49">
              * Required fields
            </Typography>
          </Box>
        </div>
        <div
          style={{
            padding: "24px",
            backgroundColor: "#fff",
            borderRadius: "0 0 8px 8px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="month"
                name="month"
                label="Reporting Month"
                value={energyMetrics.month}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                helperText="Select the month for which you are reporting data"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={commonStyles.selectStyle}>
                <InputLabel>Energy Source</InputLabel>
                <Select
                  value={energyMetrics.sourceType}
                  label="Energy Source"
                  onChange={handleSelectChange}
                  name="sourceType"
                >
                  <MenuItem value="electricity">Electricity</MenuItem>
                  <MenuItem value="natural_gas">Natural Gas</MenuItem>
                  <MenuItem value="renewable">Renewable Energy</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="electricityConsumption"
                label="Electricity Consumption (kWh)"
                value={energyMetrics.electricityConsumption}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Monthly electricity consumption"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="naturalGasConsumption"
                label="Natural Gas Consumption (m³)"
                value={energyMetrics.naturalGasConsumption}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Monthly natural gas consumption"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="renewableEnergy"
                label="Renewable Energy (kWh)"
                value={energyMetrics.renewableEnergy}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Monthly renewable energy generation"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="energyIntensity"
                label="Energy Intensity (kWh/unit)"
                value={energyMetrics.energyIntensity}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Energy consumption per unit of production"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="peakDemand"
                label="Peak Demand (kW)"
                value={energyMetrics.peakDemand}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Maximum power demand"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="demandResponse"
                label="Demand Response Savings (kW)"
                value={energyMetrics.demandResponse}
                onChange={handleInputChange}
                helperText="Power saved through demand response programs"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="solarCapacity"
                label="Solar Capacity (kW)"
                value={energyMetrics.solarCapacity}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Installed solar power capacity"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="windCapacity"
                label="Wind Capacity (kW)"
                value={energyMetrics.windCapacity}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Installed wind power capacity"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="batteryStorage"
                label="Battery Storage (kWh)"
                value={energyMetrics.batteryStorage}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Energy storage capacity"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="gridReliability"
                label="Grid Reliability (%)"
                value={energyMetrics.gridReliability}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Power grid reliability percentage"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <MetricsActionButtons onReset={() => {
        setEnergyMetrics({
          month: new Date().toISOString().slice(0, 7),
          electricityConsumption: "",
          naturalGasConsumption: "",
          renewableEnergy: "",
          energyIntensity: "",
          sourceType: "electricity",
          peakDemand: "",
          demandResponse: "",
          solarCapacity: "",
          windCapacity: "",
          batteryStorage: "",
          gridReliability: "",
        });
      }} />
    </div>
  );
}
