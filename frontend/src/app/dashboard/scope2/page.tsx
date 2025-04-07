'use client';

import { useEmissionsData } from '@/hooks/useEmissionsData';
import { Card, Grid, Typography, Container } from '@mui/material';
import { AreaChart, Area, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush, ComposedChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const COLORS = ['#2D6A4F', '#52796F', '#84A098', '#B6C4C1'];

export default function Scope2Dashboard() {
  const { data, loading, error } = useEmissionsData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available</div>;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Scope 2 Emissions Dashboard
      </Typography>

      {/* Metric Cards Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Total Electricity Emissions
            </Typography>
            <Typography variant="h5">
              {data.monthlyData.reduce((sum, month) => sum + month.emissions, 0)} tCO2e
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Grid Energy Usage
            </Typography>
            <Typography variant="h5">
              {data.monthlyData.reduce((sum, month) => sum + month.intensity, 0)} kWh
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Renewable Energy %
            </Typography>
            <Typography variant="h5">
              35%
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ p: 2 }}>
            <Typography color="textSecondary" gutterBottom>
              Energy Efficiency Score
            </Typography>
            <Typography variant="h5">
              78/100
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3}>
        {/* Energy Consumption Trend */}
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Grid Energy Consumption & Efficiency
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="intensity" stackId="1" stroke={COLORS[0]} fill={COLORS[0]} yAxisId="left" name="Grid Energy Usage" />
                <Line type="monotone" dataKey="emissions" stroke={COLORS[2]} yAxisId="right" name="Carbon Intensity" />
                <Bar dataKey="reduction" fill={COLORS[1]} yAxisId="left" name="Energy Savings" />
                <Line type="monotone" dataKey="target" stroke={COLORS[3]} yAxisId="left" name="Efficiency Target" strokeDasharray="5 5" />
                <Brush dataKey="month" height={30} stroke={COLORS[0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Energy Source Performance */}
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Grid Energy Performance Metrics
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                { name: 'Grid Efficiency', value: data.monthlyData[0].intensity },
                { name: 'Peak Load', value: Math.max(...data.monthlyData.map(m => m.intensity)) },
                { name: 'Renewable Mix', value: 35 },
                { name: 'Cost Efficiency', value: 85 },
                { name: 'Reliability', value: 95 }
              ]}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Current Performance" dataKey="value" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.6} />
                <Tooltip />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Energy Mix and Emissions */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Energy Mix Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Renewable Grid', value: 35 },
                    { name: 'Non-Renewable Grid', value: 45 },
                    { name: 'On-site Generation', value: 20 }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {[0, 1, 2].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Peak Load Analysis */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Peak Load Analysis
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="intensity" name="Load Profile" stroke={COLORS[0]} fill={COLORS[0]} fillOpacity={0.3} />
                <Area type="monotone" dataKey="reduction" name="Demand Response" stroke={COLORS[1]} fill={COLORS[1]} fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* Emission Reduction Waterfall */}
        <Grid item xs={12}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Grid Emissions & Reduction Progress
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={data.monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar dataKey="emissions" fill={COLORS[0]} yAxisId="left" name="Grid Emissions" />
                <Bar dataKey="reduction" fill={COLORS[1]} yAxisId="left" name="Emission Reductions" />
                <Line type="monotone" dataKey="target" stroke={COLORS[2]} yAxisId="right" name="Reduction Target" strokeDasharray="5 5" />
                <Area type="monotone" dataKey="intensity" fill={COLORS[3]} stroke={COLORS[3]} fillOpacity={0.1} yAxisId="right" name="Energy Intensity" />
                <Brush dataKey="month" height={30} stroke={COLORS[0]} />
              </ComposedChart>
            </ResponsiveContainer>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}