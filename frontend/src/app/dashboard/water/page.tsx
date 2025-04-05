'use client';

import { useState } from 'react';
import styles from '../energy/page.module.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, ComposedChart, RadialBarChart, RadialBar, AreaChart, Area } from 'recharts';

const COLORS = ['#2D6A4F', '#52796F', '#84A098', '#B7C4C1'];

const waterData = [
  { name: 'Total Consumption', value: 2400, target: 2000, efficiency: 82 },
  { name: 'Recycled Water', value: 800, target: 1000, efficiency: 78 },
  { name: 'Process Water', value: 1200, target: 1000, efficiency: 85 },
  { name: 'Cooling Water', value: 400, target: 300, efficiency: 75 },
];

const monthlyData = [
  { month: 'Jan', consumption: 2400, recycled: 800, process: 1200, cooling: 400 },
  { month: 'Feb', consumption: 2200, recycled: 850, process: 1100, cooling: 380 },
  { month: 'Mar', consumption: 2300, recycled: 900, process: 1150, cooling: 390 },
  { month: 'Apr', consumption: 2100, recycled: 950, process: 1050, cooling: 370 },
  { month: 'May', consumption: 1900, recycled: 1000, process: 950, cooling: 350 },
  { month: 'Jun', consumption: 1800, recycled: 1050, process: 900, cooling: 330 },
];

const sourceData = [
  { name: 'Municipal Supply', value: 45 },
  { name: 'Rainwater Harvesting', value: 25 },
  { name: 'Recycled Water', value: 20 },
  { name: 'Groundwater', value: 10 },
];

const waterConservationTrend = [
  { year: '2020', reduction: 5, conservation: 15 },
  { year: '2021', reduction: 12, conservation: 25 },
  { year: '2022', reduction: 18, conservation: 35 },
  { year: '2023', reduction: 25, conservation: 45 },
];

const waterEfficiencyMetrics = [
  { name: 'Process Water', efficiency: 75, fill: '#2D6A4F' },
  { name: 'Cooling Systems', efficiency: 85, fill: '#52796F' },
  { name: 'Irrigation', efficiency: 65, fill: '#84A098' },
  { name: 'Domestic Use', efficiency: 90, fill: '#B7C4C1' },
];

const conservationData = [
  { month: 'Jan', saved: 100, target: 120 },
  { month: 'Feb', saved: 150, target: 140 },
  { month: 'Mar', saved: 200, target: 180 },
  { month: 'Apr', saved: 250, target: 220 },
  { month: 'May', saved: 300, target: 260 },
  { month: 'Jun', saved: 350, target: 300 },
];

const renderMetricCards = (data: any[]) => {
  const totalConsumption = data[0].value;
  const recyclingRate = (data[1].value / totalConsumption * 100).toFixed(1);
  
  return (
    <div className={styles.metricCards}>
      <div className={styles.metricCard}>
        <h3>Total Water Usage</h3>
        <p>{totalConsumption} m³</p>
      </div>
      <div className={styles.metricCard}>
        <h3>Water Recycled</h3>
        <p>{recyclingRate}%</p>
      </div>
      <div className={styles.metricCard}>
        <h3>Water Savings</h3>
        <p className={styles.decrease}>-15%</p>
      </div>
      <div className={styles.metricCard}>
        <h3>Efficiency Rate</h3>
        <p>82%</p>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: '82%' }} />
        </div>
      </div>
    </div>
  );
};

const renderCharts = () => (
  <div className={styles.charts}>
    <div className={styles.chartContainer}>
      <h3>Monthly Water Usage</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="consumption" stackId="a" fill={COLORS[0]} name="Total Consumption" />
          <Bar dataKey="recycled" stackId="a" fill={COLORS[1]} name="Recycled Water" />
          <Bar dataKey="process" stackId="a" fill={COLORS[2]} name="Process Water" />
          <Bar dataKey="cooling" stackId="a" fill={COLORS[3]} name="Cooling Water" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Water Sources Distribution</h3>
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Water Conservation Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={waterConservationTrend}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="reduction" stroke={COLORS[0]} name="Reduction %" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Water Efficiency by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={waterEfficiencyMetrics}>
          <RadialBar
            minAngle={15}
            background
            clockWise
            dataKey="efficiency"
            label={{ fill: '#666', position: 'insideStart' }}
          />
          <Legend iconSize={10} width={120} height={140} layout="vertical" verticalAlign="middle" align="right" />
          <Tooltip />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Water Conservation Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={conservationData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="saved" stackId="1" stroke="#2D6A4F" fill="#2D6A4F" name="Water Saved" />
          <Area type="monotone" dataKey="target" stackId="2" stroke="#84A098" fill="#84A098" name="Target Savings" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default function WaterDashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Water Management</h1>
      
      <div className={styles.content}>
        <div className={styles.scopeSection}>
          <h2>Water Analytics</h2>
          <p>Monitor and analyze water consumption, recycling rates, and conservation efforts.</p>
          {renderMetricCards(waterData)}
          {renderCharts()}
        </div>
      </div>
    </div>
  );
}