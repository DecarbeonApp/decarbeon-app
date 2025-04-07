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

const carbonData = [
  { month: "Jan", scope1: 120, scope2: 80, scope3: 200 },
  { month: "Feb", scope1: 140, scope2: 90, scope3: 180 },
  { month: "Mar", scope1: 160, scope2: 100, scope3: 190 },
  { month: "Apr", scope1: 180, scope2: 110, scope3: 170 },
  { month: "May", scope1: 200, scope2: 120, scope3: 160 },
  { month: "Jun", scope1: 220, scope2: 130, scope3: 150 },
];

const emissionSourceData = [
  { name: "Direct Emissions", value: 35 },
  { name: "Indirect Emissions", value: 40 },
  { name: "Value Chain", value: 25 },
];

const reductionTrends = [
  { year: "2020", reduction: 5 },
  { year: "2021", reduction: 12 },
  { year: "2022", reduction: 18 },
  { year: "2023", reduction: 25 },
];

function CarbonMetrics() {
  const [carbonMetrics, setCarbonMetrics] = useState({
    month: new Date().toISOString().slice(0, 7),
    scope1Emissions: "",
    scope2Emissions: "",
    scope3Emissions: "",
    emissionIntensity: "",
    reductionTarget: "",
    sourceType: "direct",
    offsetProject: "",
    offsetAmount: "",
    reductionInitiative: "renewable",
    initiativeImpact: "",
    verificationMethod: "",
    projectTimeline: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCarbonMetrics((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    setCarbonMetrics((prev) => ({ ...prev, sourceType: e.target.value }));
  };

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
              Carbon Emissions by Scope
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={carbonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="scope1" fill={COLORS[0]} name="Scope 1" />
                <Bar dataKey="scope2" fill={COLORS[1]} name="Scope 2" />
                <Bar dataKey="scope3" fill={COLORS[2]} name="Scope 3" />
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
              Emission Sources Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={emissionSourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {emissionSourceData.map((entry, index) => (
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
              Emission Reduction Trends
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reductionTrends}>
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
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <div style={{ padding: '12px 24px', backgroundColor: '#e8f5e9', borderRadius: '8px 8px 0 0' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#2c6e49">Input Data</Typography>
            <Typography variant="caption" color="#2c6e49">* Required fields</Typography>
          </Box>
        </div>
        <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '0 0 8px 8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>

            <Typography variant="caption" color="#2c6e49">
              * Required fields
            </Typography>
        </div>
        <div className="form-content bg-white p-6">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="month"
                name="month"
                label="Reporting Month"
                value={carbonMetrics.month}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                helperText="Select the month for which you are reporting data"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={commonStyles.selectStyle}>
                <InputLabel>Emission Source</InputLabel>
                <Select
                  value={carbonMetrics.sourceType}
                  label="Emission Source"
                  onChange={handleSelectChange}
                  name="sourceType"
                >
                  <MenuItem value="direct">Direct Emissions</MenuItem>
                  <MenuItem value="indirect">Indirect Emissions</MenuItem>
                  <MenuItem value="valuechain">Value Chain Emissions</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="scope1Emissions"
                label="Scope 1 Emissions (tCO2e)"
                value={carbonMetrics.scope1Emissions}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Direct emissions from owned sources"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="scope2Emissions"
                label="Scope 2 Emissions (tCO2e)"
                value={carbonMetrics.scope2Emissions}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Indirect emissions from purchased energy"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="scope3Emissions"
                label="Scope 3 Emissions (tCO2e)"
                value={carbonMetrics.scope3Emissions}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Other indirect emissions"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                name="emissionIntensity"
                label="Emission Intensity (tCO2e/unit)"
                value={carbonMetrics.emissionIntensity}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Carbon emissions per unit of production"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="offsetProject"
                label="Carbon Offset Project Name"
                value={carbonMetrics.offsetProject}
                onChange={handleInputChange}
                helperText="Name of the carbon offset project"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="offsetAmount"
                label="Offset Amount (tCO2e)"
                value={carbonMetrics.offsetAmount}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Amount of carbon emissions offset"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required sx={commonStyles.selectStyle}>
                <InputLabel>Reduction Initiative</InputLabel>
                <Select
                  value={carbonMetrics.reductionInitiative}
                  label="Reduction Initiative"
                  onChange={handleSelectChange}
                  name="reductionInitiative"
                >
                  <MenuItem value="renewable">
                    Renewable Energy Adoption
                  </MenuItem>
                  <MenuItem value="efficiency">
                    Energy Efficiency Improvements
                  </MenuItem>
                  <MenuItem value="transport">
                    Sustainable Transportation
                  </MenuItem>
                  <MenuItem value="waste">Waste Reduction Programs</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="number"
                name="initiativeImpact"
                label="Initiative Impact (tCO2e)"
                value={carbonMetrics.initiativeImpact}
                onChange={handleInputChange}
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
                helperText="Expected emissions reduction from initiative"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name="verificationMethod"
                label="Verification Method"
                value={carbonMetrics.verificationMethod}
                onChange={handleInputChange}
                helperText="Method used to verify emission reductions"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                type="month"
                name="projectTimeline"
                label="Project Completion Timeline"
                value={carbonMetrics.projectTimeline}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                helperText="Expected completion date of reduction initiative"
                sx={commonStyles.textFieldStyle}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      <MetricsActionButtons onReset={() => {
        setCarbonMetrics({
          month: new Date().toISOString().slice(0, 7),
          scope1Emissions: "",
          scope2Emissions: "",
          scope3Emissions: "",
          emissionIntensity: "",
          reductionTarget: "",
          sourceType: "direct",
          offsetProject: "",
          offsetAmount: "",
          reductionInitiative: "renewable",
          initiativeImpact: "",
          verificationMethod: "",
          projectTimeline: "",
        });
      }} />
    </div>
  );
}

export default CarbonMetrics;
