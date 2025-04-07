'use client';

import { useEmissionsData } from '@/hooks/useEmissionsData';
import { Card, Grid, Typography, Container } from '@mui/material';
import { Treemap as TreeMap, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Area, ComposedChart, Bar } from 'recharts';

// Color palette for charts
const COLORS = ['#2D6A4F', '#84A098', '#8884d8', '#40916C', '#52B788'];

export default function Scope3Dashboard() {
  const { data, loading, error } = useEmissionsData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  // Transform data for treemap
  const treeMapData = {
    name: 'Scope 3 Emissions',
    children: data.sourceData.map(item => ({
      name: item.name,
      size: item.value,
    }))
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Scope 3 Emissions Dashboard
      </Typography>

      {/* Metric Cards Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid component="div" item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Total Value Chain Emissions
            </Typography>
            <Typography variant="h5">
              {data.monthlyData.reduce((sum, month) => sum + month.emissions, 0)} tCO2e
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Supplier Emissions
            </Typography>
            <Typography variant="h5">
              {data.monthlyData.reduce((sum, month) => sum + month.intensity, 0)} tCO2e
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Reduction Target
            </Typography>
            <Typography variant="h5">
              {data.monthlyData.reduce((sum, month) => sum + month.reduction, 0)} tCO2e
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Value Chain Score
            </Typography>
            <Typography variant="h5">
              72/100
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Supply Chain Energy Usage
            </Typography>
            <Typography variant="h5">
              {(data.monthlyData.reduce((sum, month) => sum + month.intensity, 0) * 1.5).toFixed(2)} MWh
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Energy Efficiency Index
            </Typography>
            <Typography variant="h5">
              68/100
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3}>
        {/* Supply Chain Emissions & Energy Analysis */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Supply Chain Emissions & Energy Analysis
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar dataKey="emissions" fill={COLORS[0]} yAxisId="left" name="Direct Emissions" />
                <Area type="monotone" dataKey="intensity" fill={COLORS[1]} stroke={COLORS[1]} yAxisId="right" name="Energy Intensity" fillOpacity={0.6} />
                <Line type="monotone" dataKey="target" stroke={COLORS[2]} yAxisId="left" name="Emission Target" strokeDasharray="5 5" />
                <Line type="monotone" dataKey="reduction" stroke={COLORS[3]} yAxisId="right" name="Energy Efficiency" />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Emissions Reduction Progress */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Reduction Progress
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reduction" stroke="#2D6A4F" />
                <Line type="monotone" dataKey="target" stroke="#84A098" strokeDasharray="5 5" />
                <Brush dataKey="month" height={30} stroke="#2D6A4F" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Value Chain Performance */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Value Chain Energy Performance
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                { name: 'Energy Efficiency', value: 68 },
                { name: 'Renewable Usage', value: 45 },
                { name: 'Process Optimization', value: 72 },
                { name: 'Resource Management', value: 65 },
                { name: 'Technology Adoption', value: 58 }
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Performance Score" dataKey="value" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.6} />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Emissions Sources Treemap */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Emissions Sources Breakdown
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <TreeMap
                data={[treeMapData]}
                dataKey="size"
                aspectRatio={4/3}
                stroke="#fff"
                fill={COLORS[0]}
              >
                <Tooltip />
              </TreeMap>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}