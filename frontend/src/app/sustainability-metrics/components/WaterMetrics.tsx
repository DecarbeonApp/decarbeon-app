"use client";

import { useState } from "react";
import MetricsActionButtons from "@/components/MetricsActionButtons";
import {
  Box,
  Grid,
  Typography,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
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

const waterUsageData = [
  {
    month: "Jan",
    consumption: 2400,
    recycled: 800,
    process: 1200,
    cooling: 400,
  },
  {
    month: "Feb",
    consumption: 2200,
    recycled: 850,
    process: 1100,
    cooling: 380,
  },
  {
    month: "Mar",
    consumption: 2300,
    recycled: 900,
    process: 1150,
    cooling: 390,
  },
  {
    month: "Apr",
    consumption: 2100,
    recycled: 950,
    process: 1050,
    cooling: 370,
  },
  {
    month: "May",
    consumption: 1900,
    recycled: 1000,
    process: 950,
    cooling: 350,
  },
  {
    month: "Jun",
    consumption: 1800,
    recycled: 1050,
    process: 900,
    cooling: 330,
  },
];

const sourceData = [
  { name: "Municipal Supply", value: 45 },
  { name: "Rainwater Harvesting", value: 25 },
  { name: "Recycled Water", value: 20 },
  { name: "Groundwater", value: 10 },
];

const conservationTrends = [
  { year: "2020", reduction: 5, conservation: 15 },
  { year: "2021", reduction: 12, conservation: 25 },
  { year: "2022", reduction: 18, conservation: 35 },
  { year: "2023", reduction: 25, conservation: 45 },
];

export default function WaterMetrics() {
  const [waterMetrics, setWaterMetrics] = useState({
    month: new Date().toISOString().slice(0, 7),
    totalConsumption: "",
    recycledWater: "",
    processWater: "",
    coolingWater: "",
    waterIntensity: "",
    sourceType: "municipal",
    waterQualityPh: "",
    dissolvedSolids: "",
    treatmentMethod: "filtration",
    treatmentEfficiency: "",
    waterHardness: "",
    conductivity: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWaterMetrics((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setWaterMetrics((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setWaterMetrics({
      month: new Date().toISOString().slice(0, 7),
      totalConsumption: "",
      recycledWater: "",
      processWater: "",
      coolingWater: "",
      waterIntensity: "",
      sourceType: "municipal",
      waterQualityPh: "",
      dissolvedSolids: "",
      treatmentMethod: "filtration",
      treatmentEfficiency: "",
      waterHardness: "",
      conductivity: "",
    });
  };

  const commonStyles = {
    chartContainer: {
      minWidth: "33%",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
    },
    chartTitle: {
      color: "#2D6A4F",
      fontWeight: 600,
      marginBottom: 1,
    },
    inputContainer: {
      marginTop: "2rem",
    },
    inputHeader: {
      padding: "12px 24px",
      backgroundColor: "#e8f5e9",
      borderRadius: "8px 8px 0 0",
    },
    inputContent: {
      padding: "32px",
      backgroundColor: "#f8f9fa",
      borderRadius: "0 0 8px 8px",
      marginBottom: "2rem"
    },
    textFieldStyle: {
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "#2D6A4F",
        },
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#2D6A4F",
      },
    },
    selectStyle: {
      "& .MuiOutlinedInput-root": {
        "&.Mui-focused fieldset": {
          borderColor: "#2D6A4F",
        },
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: "#2D6A4F",
      },
    },
  };

  return (
    <div className="w-full">
      <div
        className="previewSection"
        style={{
          padding: "32px",
          marginBottom: "2rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px"
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
              Water Usage by Category
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={waterUsageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="consumption"
                  fill={COLORS[0]}
                  name="Total Consumption"
                />
                <Bar
                  dataKey="recycled"
                  fill={COLORS[1]}
                  name="Recycled Water"
                />
                <Bar dataKey="process" fill={COLORS[2]} name="Process Water" />
                <Bar dataKey="cooling" fill={COLORS[3]} name="Cooling Water" />
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
              Water Sources Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {sourceData.map((entry, index) => (
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
              Water Conservation Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={conservationTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="reduction"
                  stroke={COLORS[0]}
                  name="Reduction %"
                />
                <Line
                  type="monotone"
                  dataKey="conservation"
                  stroke={COLORS[1]}
                  name="Conservation %"
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </div>

      <div style={commonStyles.inputContainer}>
        <div style={commonStyles.inputHeader}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" color="#2D6A4F">
              Input Data
            </Typography>
            <Typography variant="caption" color="#2D6A4F">
              * Required fields
            </Typography>
          </Box>
        </div>
        <div style={commonStyles.inputContent}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="month"
                name="month"
                label="Reporting Month"
                value={waterMetrics.month}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                helperText="Select the month for which you are reporting data"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                required
                sx={commonStyles.selectStyle}
              >
                <InputLabel>Water Source</InputLabel>
                <Select
                  value={waterMetrics.sourceType}
                  label="Water Source"
                  onChange={handleSelectChange}
                  name="sourceType"
                >
                  <MenuItem value="municipal">Municipal Supply</MenuItem>
                  <MenuItem value="rainwater">Rainwater Harvesting</MenuItem>
                  <MenuItem value="recycled">Recycled Water</MenuItem>
                  <MenuItem value="groundwater">Groundwater</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="totalConsumption"
                label="Total Water Consumption (m³)"
                value={waterMetrics.totalConsumption}
                onChange={handleInputChange}
                onWheel={(e) =>
                  e.target instanceof HTMLElement && e.target.blur()
                }
                helperText="Total water consumption from all sources"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="recycledWater"
                label="Recycled Water Usage (m³)"
                value={waterMetrics.recycledWater}
                onChange={handleInputChange}
                onWheel={(e) =>
                  e.target instanceof HTMLElement && e.target.blur()
                }
                helperText="Amount of water recycled and reused"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#2D6A4F",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#2D6A4F",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="processWater"
                label="Process Water Usage (m³)"
                value={waterMetrics.processWater}
                onChange={handleInputChange}
                onWheel={(e) =>
                  e.target instanceof HTMLElement && e.target.blur()
                }
                helperText="Water used in industrial processes"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#2D6A4F",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#2D6A4F",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="coolingWater"
                label="Cooling Water Usage (m³)"
                value={waterMetrics.coolingWater}
                onChange={handleInputChange}
                onWheel={(e) =>
                  e.target instanceof HTMLElement && e.target.blur()
                }
                helperText="Water used for cooling systems"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#2D6A4F",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#2D6A4F",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="waterQualityPh"
                label="Water pH Level"
                value={waterMetrics.waterQualityPh}
                onChange={handleInputChange}
                onWheel={(e) =>
                  e.target instanceof HTMLElement && e.target.blur()
                }
                helperText="pH level of water (0-14)"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#2D6A4F",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#2D6A4F",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="dissolvedSolids"
                label="Total Dissolved Solids (mg/L)"
                value={waterMetrics.dissolvedSolids}
                onChange={handleInputChange}
                onWheel={(e) =>
                  e.target instanceof HTMLElement && e.target.blur()
                }
                helperText="Concentration of dissolved solids in water"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#2D6A4F",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#2D6A4F",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                required
                sx={commonStyles.selectStyle}
              >
                <InputLabel>Treatment Method</InputLabel>
                <Select
                  value={waterMetrics.treatmentMethod}
                  label="Treatment Method"
                  onChange={handleSelectChange}
                  name="treatmentMethod"
                >
                  <MenuItem value="filtration">Filtration</MenuItem>
                  <MenuItem value="reverse_osmosis">Reverse Osmosis</MenuItem>
                  <MenuItem value="chemical">Chemical Treatment</MenuItem>
                  <MenuItem value="biological">Biological Treatment</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="treatmentEfficiency"
                label="Treatment Efficiency (%)"
                value={waterMetrics.treatmentEfficiency}
                onChange={handleInputChange}
                helperText="Efficiency of water treatment process"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#2D6A4F",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#2D6A4F",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="waterHardness"
                label="Water Hardness (mg/L CaCO₃)"
                value={waterMetrics.waterHardness}
                onChange={handleInputChange}
                helperText="Measure of calcium and magnesium concentration"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#2D6A4F",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#2D6A4F",
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="conductivity"
                label="Conductivity (µS/cm)"
                value={waterMetrics.conductivity}
                onChange={handleInputChange}
                helperText="Electrical conductivity of water"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "#2D6A4F",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "#2D6A4F",
                  },
                }}
              />
            </Grid>
          </Grid>
        </div>
      </div>

      <MetricsActionButtons onReset={handleReset} />
    </div>
  );
}
