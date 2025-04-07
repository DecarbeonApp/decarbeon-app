'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { useStaticEmissionsData } from '@/hooks/useStaticEmissionsData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ComposedChart, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Scatter } from 'recharts';

const COLORS = ['#2D6A4F', '#52796F', '#84A098', '#B7C4C1'];

const scope1Data = [
  { name: 'Direct Emissions', value: 250, target: 200, intensity: 0.45, reduction: 15 },
  { name: 'Company Vehicles', value: 150, target: 120, intensity: 0.35, reduction: 12 },
  { name: 'Fuel Consumption', value: 300, target: 250, intensity: 0.55, reduction: 18 },
];

const scope2Data = [
  { name: 'Electricity', value: 400, target: 350, intensity: 0.65, reduction: 20 },
  { name: 'Steam', value: 120, target: 100, intensity: 0.42, reduction: 15 },
  { name: 'Heating', value: 280, target: 250, intensity: 0.58, reduction: 18 },
];

const scope3Data = [
  { name: 'Business Travel', value: 180, target: 150, intensity: 0.48, reduction: 16 },
  { name: 'Employee Commuting', value: 220, target: 180, intensity: 0.52, reduction: 18 },
  { name: 'Waste Disposal', value: 150, target: 120, intensity: 0.38, reduction: 14 },
  { name: 'Supply Chain', value: 450, target: 400, intensity: 0.75, reduction: 25 },
];

const monthlyEmissions = [
  { month: 'Jan', scope1: 150, scope2: 280, scope3: 420 },
  { month: 'Feb', scope1: 140, scope2: 260, scope3: 400 },
  { month: 'Mar', scope1: 160, scope2: 240, scope3: 380 },
  { month: 'Apr', scope1: 130, scope2: 250, scope3: 360 },
  { month: 'May', scope1: 120, scope2: 230, scope3: 340 },
  { month: 'Jun', scope1: 110, scope2: 220, scope3: 320 },
];

const intensityData = [
  { year: '2020', value: 0.85 },
  { year: '2021', value: 0.75 },
  { year: '2022', value: 0.65 },
  { year: '2023', value: 0.55 },
];

const renderMetricCards = (data: any[]) => {
  const totalEmissions = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className={styles.metricCards}>
      <div className={styles.metricCard}>
        <h3>Total Emissions</h3>
        <p>{totalEmissions} tCO2e</p>
      </div>
      <div className={styles.metricCard}>
        <h3>YoY Change</h3>
        <p className={styles.decrease}>-12.5%</p>
      </div>
      <div className={styles.metricCard}>
        <h3>Target Progress</h3>
        <p>68%</p>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: '68%' }} />
        </div>
      </div>
    </div>
  );
};

const emissionsByCategory = [
  { category: 'Manufacturing', value: 85, fullMark: 100 },
  { category: 'Transportation', value: 65, fullMark: 100 },
  { category: 'Buildings', value: 45, fullMark: 100 },
  { category: 'Energy', value: 75, fullMark: 100 },
  { category: 'Waste', value: 35, fullMark: 100 },
];

const emissionIntensityData = [
  { intensity: 0.45, reduction: 15, name: 'Process A' },
  { intensity: 0.65, reduction: 20, name: 'Process B' },
  { intensity: 0.35, reduction: 12, name: 'Process C' },
  { intensity: 0.55, reduction: 18, name: 'Process D' },
  { intensity: 0.75, reduction: 25, name: 'Process E' },
];

const renderCharts = (data: any[]) => (
  <div className={styles.charts}>
    <div className={styles.chartContainer}>
      <h3>Emissions vs Targets</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" yAxisId="left" fill="#2D6A4F" name="Current" />
          <Bar dataKey="target" yAxisId="left" fill="#84A098" name="Target" />
          <Line type="monotone" dataKey="intensity" yAxisId="right" stroke="#B7C4C1" name="Intensity" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Monthly Emissions by Scope</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyEmissions}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="scope1" stackId="a" fill="#2D6A4F" name="Scope 1" />
          <Bar dataKey="scope2" stackId="a" fill="#52796F" name="Scope 2" />
          <Bar dataKey="scope3" stackId="a" fill="#84A098" name="Scope 3" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Emissions Intensity Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={intensityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#2D6A4F" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Emissions by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={emissionsByCategory}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar name="Emissions" dataKey="value" stroke="#2D6A4F" fill="#2D6A4F" fillOpacity={0.6} />
          <Tooltip />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Emission Intensity vs Reduction Potential</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={emissionIntensityData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="intensity" name="Emission Intensity" />
          <YAxis dataKey="reduction" name="Reduction Potential (%)" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Legend />
          <Scatter name="Processes" data={emissionIntensityData} fill="#2D6A4F" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default function CarbonMetricsPage() {
  const [activeScope, setActiveScope] = useState('scope1');
  const [timeRange, setTimeRange] = useState('monthly');
  const { data } = useStaticEmissionsData();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Carbon Metrics</h1>
      
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeScope === 'scope1' ? styles.active : ''}`}
          onClick={() => setActiveScope('scope1')}
        >
          Scope 1
        </button>
        <button
          className={`${styles.tab} ${activeScope === 'scope2' ? styles.active : ''}`}
          onClick={() => setActiveScope('scope2')}
        >
          Scope 2
        </button>
        <button
          className={`${styles.tab} ${activeScope === 'scope3' ? styles.active : ''}`}
          onClick={() => setActiveScope('scope3')}
        >
          Scope 3
        </button>
      </div>

      <div className={styles.content}>
        {activeScope === 'scope1' && (
          <div className={styles.scopeSection}>
            <h2>Direct Emissions</h2>
            <p>Monitor and analyze direct greenhouse gas emissions from owned or controlled sources.</p>
            {renderMetricCards(scope1Data)}
            {renderCharts(scope1Data)}
          </div>
        )}

        {activeScope === 'scope2' && (
          <div className={styles.scopeSection}>
            <h2>Indirect Emissions</h2>
            <p>Track indirect greenhouse gas emissions from the generation of purchased energy.</p>
            {renderMetricCards(scope2Data)}
            {renderCharts(scope2Data)}
          </div>
        )}

        {activeScope === 'scope3' && (
          <div className={styles.scopeSection}>
            <h2>Value Chain Emissions</h2>
            <p>Analyze all other indirect emissions that occur in your company's value chain.</p>
            {renderMetricCards(scope3Data)}
            {renderCharts(scope3Data)}
          </div>
        )}
      </div>
    </div>
  );
}