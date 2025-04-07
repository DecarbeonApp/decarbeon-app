'use client';

import { useState } from 'react';
import styles from '../energy/page.module.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, ComposedChart, Treemap, Scatter } from 'recharts';

const COLORS = ['#2D6A4F', '#52796F', '#84A098', '#B7C4C1'];

const wasteData = [
  { name: 'Recyclable', value: 450, target: 500, efficiency: 82 },
  { name: 'Organic', value: 280, target: 300, efficiency: 78 },
  { name: 'Hazardous', value: 170, target: 150, efficiency: 85 },
  { name: 'Landfill', value: 320, target: 250, efficiency: 75 },
];

const wasteCompositionData = [
  {
    name: 'Recyclable',
    children: [
      { name: 'Paper', size: 180 },
      { name: 'Plastic', size: 120 },
      { name: 'Metal', size: 90 },
      { name: 'Glass', size: 60 },
    ],
  },
  {
    name: 'Organic',
    children: [
      { name: 'Food Waste', size: 150 },
      { name: 'Garden Waste', size: 130 },
    ],
  },
  {
    name: 'Hazardous',
    children: [
      { name: 'Chemical', size: 100 },
      { name: 'Electronic', size: 70 },
    ],
  },
];

const recyclingEffectivenessData = [
  { name: 'Paper', efficiency: 85, volume: 180, recovery: 75 },
  { name: 'Plastic', efficiency: 65, volume: 120, recovery: 60 },
  { name: 'Metal', efficiency: 90, volume: 90, recovery: 85 },
  { name: 'Glass', efficiency: 80, volume: 60, recovery: 70 },
  { name: 'Electronics', efficiency: 70, volume: 40, recovery: 65 },
];

const monthlyData = [
  { month: 'Jan', recyclable: 120, organic: 80, hazardous: 40, landfill: 90 },
  { month: 'Feb', recyclable: 140, organic: 85, hazardous: 35, landfill: 85 },
  { month: 'Mar', recyclable: 160, organic: 90, hazardous: 30, landfill: 80 },
  { month: 'Apr', recyclable: 180, organic: 95, hazardous: 25, landfill: 75 },
  { month: 'May', recyclable: 200, organic: 100, hazardous: 20, landfill: 70 },
  { month: 'Jun', recyclable: 220, organic: 105, hazardous: 15, landfill: 65 },
];

const disposalMethodData = [
  { name: 'Recycling', value: 45 },
  { name: 'Composting', value: 25 },
  { name: 'Incineration', value: 15 },
  { name: 'Landfill', value: 15 },
];

const wasteReductionTrend = [
  { year: '2020', reduction: 10 },
  { year: '2021', reduction: 15 },
  { year: '2022', reduction: 25 },
  { year: '2023', reduction: 35 },
];

const renderMetricCards = (data: any[]) => {
  const totalWaste = data.reduce((sum, item) => sum + item.value, 0);
  const recyclingRate = (data[0].value / totalWaste * 100).toFixed(1);
  
  return (
    <div className={styles.metricCards}>
      <div className={styles.metricCard}>
        <h3>Total Waste Generated</h3>
        <p>{totalWaste} tons</p>
      </div>
      <div className={styles.metricCard}>
        <h3>Recycling Rate</h3>
        <p>{recyclingRate}%</p>
      </div>
      <div className={styles.metricCard}>
        <h3>Waste Reduction</h3>
        <p className={styles.decrease}>-15%</p>
      </div>
      <div className={styles.metricCard}>
        <h3>Diversion Rate</h3>
        <p>75%</p>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: '75%' }} />
        </div>
      </div>
    </div>
  );
};

const renderCharts = () => (
  <div className={styles.charts}>
    <div className={styles.chartContainer}>
      <h3>Monthly Waste Composition</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="recyclable" stackId="a" fill={COLORS[0]} name="Recyclable" />
          <Bar dataKey="organic" stackId="a" fill={COLORS[1]} name="Organic" />
          <Bar dataKey="hazardous" stackId="a" fill={COLORS[2]} name="Hazardous" />
          <Bar dataKey="landfill" stackId="a" fill={COLORS[3]} name="Landfill" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Waste Disposal Methods</h3>
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
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Waste Reduction Progress</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={wasteReductionTrend}>
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
      <h3>Waste Composition Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <Treemap
          data={wasteCompositionData}
          dataKey="size"
          aspectRatio={4/3}
          stroke="#fff"
          fill="#2D6A4F"
        >
          <Tooltip />
        </Treemap>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Recycling Effectiveness</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={recyclingEffectivenessData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Scatter name="Materials" data={recyclingEffectivenessData} fill="#2D6A4F" yAxisId="left" />
          <Line type="monotone" dataKey="recovery" stroke="#84A098" yAxisId="right" name="Recovery Rate (%)" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default function WasteDashboard() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Waste Management</h1>
      
      <div className={styles.content}>
        <div className={styles.scopeSection}>
          <h2>Waste Analytics</h2>
          <p>Monitor and analyze waste generation, recycling rates, and disposal methods.</p>
          {renderMetricCards(wasteData)}
          {renderCharts()}
        </div>
      </div>
    </div>
  );
}