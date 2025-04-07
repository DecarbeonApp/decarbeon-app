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


const COLORS = ["#2D6A4F", "#52796F", "#84A098", "#B7C4C1"];

const wasteGenerationData = [
  { month: "Jan", recyclable: 120, organic: 80, hazardous: 40, landfill: 90 },
  { month: "Feb", recyclable: 140, organic: 85, hazardous: 35, landfill: 85 },
  { month: "Mar", recyclable: 160, organic: 90, hazardous: 30, landfill: 80 },
  { month: "Apr", recyclable: 180, organic: 95, hazardous: 25, landfill: 75 },
  { month: "May", recyclable: 200, organic: 100, hazardous: 20, landfill: 70 },
  { month: "Jun", recyclable: 220, organic: 105, hazardous: 15, landfill: 65 },
];

const disposalMethodData = [
  { name: "Recycling", value: 45 },
  { name: "Composting", value: 25 },
  { name: "Incineration", value: 15 },
  { name: "Landfill", value: 15 },
];

const reductionTrends = [
  { year: "2020", reduction: 10 },
  { year: "2021", reduction: 15 },
  { year: "2022", reduction: 25 },
  { year: "2023", reduction: 35 },
];

export default function WasteMetrics() {
  const [wasteMetrics, setWasteMetrics] = useState({
    month: new Date().toISOString().slice(0, 7),
    recyclableWaste: "",
    organicWaste: "",
    hazardousWaste: "",
    landfillWaste: "",
    wasteIntensity: "",
    disposalMethod: "recycling",
    segregationEfficiency: "",
    recyclingPartner: "",
    reductionInitiative: "",
    disposalCost: "",
    wasteAuditDate: "",
    complianceStatus: "",
    treatmentMethod: "",
    containerCapacity: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWasteMetrics((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e: any) => {
    setWasteMetrics((prev) => ({ ...prev, disposalMethod: e.target.value }));
  };

  const handleReset = () => {
    setWasteMetrics({
      month: new Date().toISOString().slice(0, 7),
      recyclableWaste: "",
      organicWaste: "",
      hazardousWaste: "",
      landfillWaste: "",
      wasteIntensity: "",
      disposalMethod: "recycling",
      segregationEfficiency: "",
      recyclingPartner: "",
      reductionInitiative: "",
      disposalCost: "",
      wasteAuditDate: "",
      complianceStatus: "",
      treatmentMethod: "",
      containerCapacity: "",
    });
  };

  return (
    <div>
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
            style={commonStyles.chartContainer}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={commonStyles.chartTitle}
            >
              Waste Generation by Category
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={wasteGenerationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="recyclable" fill={COLORS[0]} name="Recyclable" />
                <Bar dataKey="organic" fill={COLORS[1]} name="Organic" />
                <Bar dataKey="hazardous" fill={COLORS[2]} name="Hazardous" />
                <Bar dataKey="landfill" fill={COLORS[3]} name="Landfill" />
              </BarChart>
            </ResponsiveContainer>
          </Grid>
          <Grid
            item
            style={commonStyles.chartContainer}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={commonStyles.chartTitle}
            >
              Disposal Methods Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={disposalMethodData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {disposalMethodData.map((entry, index) => (
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
            style={commonStyles.chartContainer}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={commonStyles.chartTitle}
            >
              Waste Reduction Progress
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
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </div>

      <div style={commonStyles.inputContainer}>
        <div style={commonStyles.inputHeader}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" fontWeight="bold" color="#2c6e49">Input Data</Typography>
            <Typography variant="caption" color="#2c6e49">* Required fields</Typography>
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
              value={wasteMetrics.month}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              helperText="Select the month for which you are reporting data"
              sx={commonStyles.textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required sx={commonStyles.selectStyle}>
              <InputLabel>Disposal Method</InputLabel>
              <Select
                value={wasteMetrics.disposalMethod}
                label="Disposal Method"
                onChange={handleSelectChange}
                name="disposalMethod"
              >
                <MenuItem value="recycling">Recycling</MenuItem>
                <MenuItem value="composting">Composting</MenuItem>
                <MenuItem value="incineration">Incineration</MenuItem>
                <MenuItem value="landfill">Landfill</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              name="recyclableWaste"
              label="Recyclable Waste (tons)"
              value={wasteMetrics.recyclableWaste}
              onChange={handleInputChange}
              onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
              helperText="Amount of recyclable materials"
              sx={commonStyles.textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              name="organicWaste"
              label="Organic Waste (tons)"
              value={wasteMetrics.organicWaste}
              onChange={handleInputChange}
              onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
              helperText="Amount of organic/biodegradable waste"
              sx={commonStyles.textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              name="hazardousWaste"
              label="Hazardous Waste (tons)"
              value={wasteMetrics.hazardousWaste}
              onChange={handleInputChange}
              onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
              helperText="Amount of hazardous materials"
              sx={commonStyles.textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              name="landfillWaste"
              label="Landfill Waste (tons)"
              value={wasteMetrics.landfillWaste}
              onChange={handleInputChange}
              onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
              helperText="Amount of waste sent to landfill"
              sx={commonStyles.textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              name="segregationEfficiency"
              label="Segregation Efficiency (%)"
              value={wasteMetrics.segregationEfficiency}
              onChange={handleInputChange}
              onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
              helperText="Waste segregation efficiency rate"
              sx={commonStyles.textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="recyclingPartner"
              label="Recycling Partner"
              value={wasteMetrics.recyclingPartner}
              onChange={handleInputChange}
              helperText="Name of recycling partner organization"
              sx={commonStyles.textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="reductionInitiative"
              label="Waste Reduction Initiative"
              value={wasteMetrics.reductionInitiative}
              onChange={handleInputChange}
              helperText="Current waste reduction program"
              sx={commonStyles.textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              name="disposalCost"
              label="Disposal Cost (USD)"
              value={wasteMetrics.disposalCost}
              onChange={handleInputChange}
              onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
              helperText="Total waste disposal cost"
              sx={commonStyles.textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="date"
              name="wasteAuditDate"
              label="Last Waste Audit Date"
              value={wasteMetrics.wasteAuditDate}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              helperText="Date of last waste audit"
              sx={commonStyles.textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="complianceStatus"
              label="Compliance Status"
              value={wasteMetrics.complianceStatus}
              onChange={handleInputChange}
              helperText="Waste management compliance status"
              sx={commonStyles.textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              name="treatmentMethod"
              label="Treatment Method"
              value={wasteMetrics.treatmentMethod}
              onChange={handleInputChange}
              helperText="Waste treatment method used"
              sx={commonStyles.textFieldStyle}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              type="number"
              name="containerCapacity"
              label="Container Capacity (m³)"
              value={wasteMetrics.containerCapacity}
              onChange={handleInputChange}
              onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
              helperText="Total waste container capacity"
              sx={commonStyles.textFieldStyle}
            />
          </Grid>
          </Grid>
        </div>
      </div>
      <MetricsActionButtons onReset={handleReset} />
    </div>
  );
}
