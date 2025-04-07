'use client';

import { useEmissionsData } from '@/hooks/useEmissionsData';
import { Card, Grid, Typography, Container } from '@mui/material';
import { LineChart, Line, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar, Area, ComposedChart } from 'recharts';

const COLORS = ['#2D6A4F', '#52796F', '#84A098', '#B6C4C1'];

export default function Scope1Dashboard() {
  const { data, loading, error } = useEmissionsData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Scope 1 Emissions Dashboard
      </Typography>

      {/* Metric Cards Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Total Carbon Emissions
            </Typography>
            <Typography variant="h5">
              {data.monthlyData.reduce((sum, month) => sum + month.emissions, 0)} tCO2e
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Energy Consumption
            </Typography>
            <Typography variant="h5">
              {data.monthlyData.reduce((sum, month) => sum + month.intensity, 0)} MWh
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Reduction Progress
            </Typography>
            <Typography variant="h5">
              {data.monthlyData.reduce((sum, month) => sum + month.reduction, 0)} tCO2e
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Sustainability Score
            </Typography>
            <Typography variant="h5">
              85/100
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3}>
        {/* Emissions and Energy Trend */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Carbon Emissions & Energy Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="emissions" fill={COLORS[0]} stroke={COLORS[0]} yAxisId="left" name="Carbon Emissions" />
                <Line type="monotone" dataKey="target" stroke={COLORS[1]} strokeDasharray="5 5" yAxisId="left" name="Target" />
                <Bar dataKey="intensity" fill={COLORS[2]} yAxisId="right" name="Energy Usage" />
                <Line type="monotone" dataKey="reduction" stroke={COLORS[3]} yAxisId="right" name="Energy Savings" />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Emission Intensity */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Emission Intensity Trend
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="intensity" stroke={COLORS[0]} />
                <Line type="monotone" dataKey="target" stroke={COLORS[1]} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Energy Usage by Source */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Energy Usage by Source
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar dataKey="emissions" stackId="a" fill={COLORS[0]} yAxisId="left" name="Natural Gas" />
                <Bar dataKey="intensity" stackId="a" fill={COLORS[1]} yAxisId="left" name="Diesel" />
                <Bar dataKey="reduction" stackId="a" fill={COLORS[2]} yAxisId="left" name="Petrol" />
                <Line type="monotone" dataKey="target" stroke={COLORS[3]} yAxisId="right" name="Efficiency Target" strokeDasharray="5 5" />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Energy Distribution */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Energy Distribution & Efficiency
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="10%"
                outerRadius="80%"
                data={data.sourceData}
                startAngle={180}
                endAngle={0}
              >
                <RadialBar
                  label={{ position: 'insideStart' }}
                  background
                  dataKey="value"
                >
                  {data.sourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </RadialBar>
                <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}