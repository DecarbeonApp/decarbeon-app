'use client';

import { useState } from 'react';
import styles from './page.module.css';

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  Brush
} from 'recharts';

const monthlyData = [
  { month: 'Jan', emissions: 4000, reduction: 2400, target: 3000, intensity: 65 },
  { month: 'Feb', emissions: 3000, reduction: 1398, target: 2800, intensity: 59 },
  { month: 'Mar', emissions: 2000, reduction: 9800, target: 2600, intensity: 80 },
  { month: 'Apr', emissions: 2780, reduction: 3908, target: 2400, intensity: 81 },
  { month: 'May', emissions: 1890, reduction: 4800, target: 2200, intensity: 56 },
  { month: 'Jun', emissions: 2390, reduction: 3800, target: 2000, intensity: 55 },
  { month: 'Jul', emissions: 3490, reduction: 4300, target: 2100, intensity: 70 },
  { month: 'Aug', emissions: 2490, reduction: 4300, target: 2300, intensity: 68 },
  { month: 'Sep', emissions: 2790, reduction: 4300, target: 2400, intensity: 62 },
  { month: 'Oct', emissions: 3490, reduction: 4300, target: 2600, intensity: 71 },
  { month: 'Nov', emissions: 2490, reduction: 4300, target: 2500, intensity: 63 },
  { month: 'Dec', emissions: 2890, reduction: 4300, target: 2400, intensity: 64 },
];

const pieData = [
  { name: 'Transportation', value: 400 },
  { name: 'Energy', value: 300 },
  { name: 'Manufacturing', value: 300 },
  { name: 'Buildings', value: 200 },
  { name: 'Waste', value: 100 }
];

const bubbleData = [
  { name: 'Facility A', emissions: 2400, efficiency: 75, size: 800 },
  { name: 'Facility B', emissions: 1398, efficiency: 82, size: 600 },
  { name: 'Facility C', emissions: 9800, efficiency: 65, size: 1200 },
  { name: 'Facility D', emissions: 3908, efficiency: 78, size: 900 },
  { name: 'Facility E', emissions: 4800, efficiency: 70, size: 1000 },
];

const histogramData = Array.from({ length: 20 }, (_, i) => ({
  range: `${i * 50}-${(i + 1) * 50}`,
  count: Math.floor(Math.random() * 100)
}));

const stackedData = [
  { month: 'Jan', direct: 4000, indirect: 2400, other: 1800 },
  { month: 'Feb', direct: 3000, indirect: 1398, other: 2000 },
  { month: 'Mar', direct: 2000, indirect: 9800, other: 2200 },
  { month: 'Apr', direct: 2780, indirect: 3908, other: 1900 },
  { month: 'May', direct: 1890, indirect: 4800, other: 2100 },
  { month: 'Jun', direct: 2390, indirect: 3800, other: 2400 },
];

const data = [
  { month: 'Jan', emissions: 4000, reduction: 2400, target: 3000 },
  { month: 'Feb', emissions: 3000, reduction: 1398, target: 2800 },
  { month: 'Mar', emissions: 2000, reduction: 9800, target: 2600 },
  { month: 'Apr', emissions: 2780, reduction: 3908, target: 2400 },
  { month: 'May', emissions: 1890, reduction: 4800, target: 2200 },
  { month: 'Jun', emissions: 2390, reduction: 3800, target: 2000 },
];

const COLORS = ['#2D6A4F', '#52796F', '#84A098', '#B6C4C1'];

export default function DashboardPage() {
  const [selectedMetric, setSelectedMetric] = useState('emissions');

  return (
    <div className={styles.dashboard}>
      <h1>Carbon Emissions Dashboard</h1>
      
      <div className={styles.grid}>
        {/* Line Graph with Brush */}
        <div className={styles.card}>
          <h2>Emissions Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="emissions" stroke="#2D6A4F" />
              <Line type="monotone" dataKey="target" stroke="#84A098" strokeDasharray="5 5" />
              <Brush dataKey="month" height={30} stroke="#2D6A4F" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Full Circle Pie Chart */}
        <div className={styles.card}>
          <h2>Carbon Sources</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Transportation', value: 400 },
                  { name: 'Energy', value: 300 },
                  { name: 'Manufacturing', value: 300 },
                  { name: 'Buildings', value: 200 },
                  { name: 'Waste', value: 100 }
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={true}
              >
                {pieData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={`hsl(145, ${70 - index * 10}%, ${45 + index * 5}%)`}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend 
                layout="vertical" 
                align="right"
                verticalAlign="middle"
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className={styles.card}>
          <h2>Emissions by Scope</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Scope 1', value: 400 },
                  { name: 'Scope 2', value: 300 },
                  { name: 'Scope 3', value: 300 }
                ]}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {[0, 1, 2].map((index) => (
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
        </div>

        {/* Bubble Chart */}
        <div className={styles.card}>
          <h2>Facility Analysis</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="emissions" name="Emissions" />
              <YAxis dataKey="efficiency" name="Efficiency" />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter
                name="Facilities"
                data={bubbleData}
                fill="#2D6A4F"
              >
                {bubbleData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Histogram */}
        <div className={styles.card}>
          <h2>Emissions Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={histogramData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#2D6A4F">
                {histogramData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`}
                    fill={`rgba(45, 106, 79, ${0.3 + (0.7 * index / histogramData.length)})`}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Emissions Over Time */}
        <div className={styles.card}>
          <h2>Emissions Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="emissions" stroke="#2D6A4F" />
              <Line type="monotone" dataKey="target" stroke="#84A098" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Reduction Progress */}
        <div className={styles.card}>
          <h2>Reduction Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="reduction" stroke="#2D6A4F" fill="#84A098" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Emissions Sources */}
        <div className={styles.card}>
          <h2>Emissions Sources</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="emissions" fill="#2D6A4F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Stacked Emissions */}
        <div className={styles.card}>
          <h2>Emissions Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stackedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="direct" stackId="a" fill="#2D6A4F" />
              <Bar dataKey="indirect" stackId="a" fill="#52796F" />
              <Bar dataKey="other" stackId="a" fill="#84A098" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Heat Map-like Visualization */}
        <div className={styles.card}>
          <h2>Monthly Intensity</h2>
          <div className={styles.heatmap}>
            {data.map((item, index) => (
              <div 
                key={item.month} 
                className={styles.heatmapCell}
                style={{
                  backgroundColor: `rgba(45, 106, 79, ${item.emissions / 4000})`,
                }}
              >
                <span className={styles.month}>{item.month}</span>
                <span className={styles.value}>{item.emissions}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
