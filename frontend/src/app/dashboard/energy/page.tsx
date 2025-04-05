'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer, ComposedChart } from 'recharts';

const COLORS = ['#2D6A4F', '#52796F', '#84A098', '#B6C4C1'];

const energyCostData = [
  { month: 'Jan', cost: 12500, projected: 13000 },
  { month: 'Feb', cost: 11800, projected: 12500 },
  { month: 'Mar', cost: 12200, projected: 12800 },
  { month: 'Apr', cost: 11500, projected: 12300 },
  { month: 'May', cost: 10800, projected: 11500 },
  { month: 'Jun', cost: 10200, projected: 11000 },
];

const peakLoadData = [
  { hour: '00:00', load: 65 },
  { hour: '04:00', load: 55 },
  { hour: '08:00', load: 85 },
  { hour: '12:00', load: 95 },
  { hour: '16:00', load: 90 },
  { hour: '20:00', load: 75 },
];

const savingsTargetData = [
  { category: 'HVAC', current: 25, target: 35 },
  { category: 'Lighting', current: 20, target: 30 },
  { category: 'Equipment', current: 15, target: 25 },
  { category: 'Process', current: 30, target: 40 },
];

const scope1Data = [
  { name: 'Natural Gas', value: 450, intensity: 25.5, efficiency: 82 },
  { name: 'Diesel', value: 280, intensity: 18.2, efficiency: 78 },
  { name: 'Propane', value: 170, intensity: 12.8, efficiency: 85 },
];

const scope2Data = [
  { name: 'Grid Electricity', value: 620, intensity: 35.8, efficiency: 88 },
  { name: 'District Heating', value: 180, intensity: 15.2, efficiency: 82 },
  { name: 'District Cooling', value: 140, intensity: 12.5, efficiency: 85 },
];

const scope3Data = [
  { name: 'Upstream Transport', value: 340, intensity: 28.5, efficiency: 75 },
  { name: 'Business Travel', value: 220, intensity: 18.8, efficiency: 80 },
  { name: 'Waste Management', value: 180, intensity: 15.2, efficiency: 82 },
  { name: 'Employee Commute', value: 260, intensity: 22.4, efficiency: 78 },
];

const monthlyData = [
  { name: 'Jan', solar: 120, wind: 80, hydro: 200, fossil: 150 },
  { name: 'Feb', solar: 140, wind: 90, hydro: 180, fossil: 140 },
  { name: 'Mar', solar: 160, wind: 100, hydro: 190, fossil: 130 },
  { name: 'Apr', solar: 180, wind: 110, hydro: 170, fossil: 120 },
  { name: 'May', solar: 200, wind: 120, hydro: 160, fossil: 110 },
  { name: 'Jun', solar: 220, wind: 130, hydro: 150, fossil: 100 },
];

const efficiencyData = [
  { name: 'Peak Hours', value: 85 },
  { name: 'Off-Peak', value: 92 },
  { name: 'Weekend', value: 78 },
];

const sourceTrends = [
  { name: '2020', renewable: 30, nonRenewable: 70 },
  { name: '2021', renewable: 40, nonRenewable: 60 },
  { name: '2022', renewable: 45, nonRenewable: 55 },
  { name: '2023', renewable: 55, nonRenewable: 45 },
];

const renderMetricCards = (data: any[]) => {
  const totalEnergy = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className={styles.metricCards}>
      <div className={styles.metricCard}>
        <h3>Total Energy Usage</h3>
        <p>{totalEnergy} MWh</p>
      </div>
      <div className={styles.metricCard}>
        <h3>Efficiency Rating</h3>
        <p>A+</p>
      </div>
      <div className={styles.metricCard}>
        <h3>Cost Savings</h3>
        <p className={styles.decrease}>$12,500</p>
      </div>
      <div className={styles.metricCard}>
        <h3>Renewable Share</h3>
        <p>35%</p>
        <div className={styles.progressBar}>
          <div className={styles.progress} style={{ width: '35%' }} />
        </div>
      </div>
    </div>
  );
};

const renderCharts = (data: any[]) => (
  <div className={styles.charts}>
    <div className={styles.chartContainer}>
      <h3>Energy Source Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name} ${value} MWh`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Energy Efficiency Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={efficiencyData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name} ${value}%`}
          >
            {efficiencyData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Energy Cost Analysis</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={energyCostData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="cost" fill={COLORS[0]} name="Actual Cost" />
          <Line type="monotone" dataKey="projected" stroke={COLORS[1]} name="Projected Cost" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Peak Load Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={peakLoadData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hour" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="load" stroke={COLORS[0]} name="Load %" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Energy Savings Targets</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={savingsTargetData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="current" fill={COLORS[0]} name="Current Savings" />
          <Bar dataKey="target" fill={COLORS[1]} name="Target Savings" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Monthly Energy Mix</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="solar" stackId="a" fill="#2D6A4F" name="Solar" />
          <Bar dataKey="wind" stackId="a" fill="#52796F" name="Wind" />
          <Bar dataKey="hydro" stackId="a" fill="#84A098" name="Hydro" />
          <Bar dataKey="fossil" stackId="a" fill="#B6C4C1" name="Fossil Fuels" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Energy Intensity & Efficiency</h3>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="intensity" yAxisId="left" fill="#52796F" name="Energy Intensity" />
          <Line type="monotone" dataKey="efficiency" yAxisId="right" stroke="#2D6A4F" name="Efficiency %" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
    <div className={styles.chartContainer}>
      <h3>Energy Source Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={sourceTrends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="renewable" stackId="a" fill="#2D6A4F" name="Renewable" />
          <Bar dataKey="nonRenewable" stackId="a" fill="#84A098" name="Non-Renewable" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default function EnergyUsagePage() {
  const [activeScope, setActiveScope] = useState('scope1');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Energy Usage</h1>
      
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
            <h2>Direct Energy Consumption</h2>
            <p>Track and analyze your direct energy consumption from owned or controlled sources.</p>
            {renderMetricCards(scope1Data)}
            {renderCharts(scope1Data)}
          </div>
        )}

        {activeScope === 'scope2' && (
          <div className={styles.scopeSection}>
            <h2>Indirect Energy Consumption</h2>
            <p>Monitor your indirect energy consumption from purchased electricity, steam, heating, and cooling.</p>
            {renderMetricCards(scope2Data)}
            {renderCharts(scope2Data)}
          </div>
        )}

        {activeScope === 'scope3' && (
          <div className={styles.scopeSection}>
            <h2>Value Chain Energy Usage</h2>
            <p>Analyze energy consumption across your entire value chain, including upstream and downstream activities.</p>
            {renderMetricCards(scope3Data)}
            {renderCharts(scope3Data)}
          </div>
        )}
      </div>
    </div>
  );
}