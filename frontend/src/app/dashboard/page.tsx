'use client';

import { useState, useMemo } from 'react';
import styles from './page.module.css';
import { useEmissionsData } from '@/hooks/useEmissionsData';

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
  Brush,
  ComposedChart
} from 'recharts';

const COLORS = ['#2D6A4F', '#52796F', '#84A098', '#B6C4C1'];

const bubbleData = [
  { name: 'Facility A', emissions: 2400, efficiency: 75, size: 800 },
  { name: 'Facility B', emissions: 1398, efficiency: 82, size: 600 },
  { name: 'Facility C', emissions: 9800, efficiency: 65, size: 1200 },
  { name: 'Facility D', emissions: 3908, efficiency: 78, size: 900 },
  { name: 'Facility E', emissions: 4800, efficiency: 70, size: 1000 },
];

const histogramData = Array.from({ length: 20 }, (_, i) => ({
  range: `${i * 50}-${(i + 1) * 50}`,
  count: Math.floor(Math.random() * 100),
}));

const stackedData = [
  { month: 'Jan', direct: 4000, indirect: 2400, other: 1800 },
  { month: 'Feb', direct: 3000, indirect: 1398, other: 2000 },
  { month: 'Mar', direct: 2000, indirect: 9800, other: 2200 },
  { month: 'Apr', direct: 2780, indirect: 3908, other: 1900 },
  { month: 'May', direct: 1890, indirect: 4800, other: 2100 },
  { month: 'Jun', direct: 2390, indirect: 3800, other: 2400 },
];

export default function DashboardPage() {
  const { data, loading, error } = useEmissionsData();
  const [timeRange, setTimeRange] = useState('1y'); // 1y, 6m, 3m, 1m
  const [selectedSource, setSelectedSource] = useState('all');

  const filteredData = useMemo(() => {
    if (!data?.monthlyData) return [];

    const months =
      timeRange === '1y'
        ? 12
        : timeRange === '6m'
        ? 6
        : timeRange === '3m'
        ? 3
        : 1;

    return data.monthlyData.slice(-months);
  }, [data, timeRange]);

  if (loading) return <div className={styles.loading}>Loading dashboard data...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!data?.monthlyData) return <div className={styles.error}>No data available</div>;

  return (
    <div className={styles.dashboard}>
      <h1>Sustainability Overview Dashboard</h1>

      <div className={styles.filters}>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className={styles.select}
        >
          <option value="1y">Last 12 months</option>
          <option value="6m">Last 6 months</option>
          <option value="3m">Last 3 months</option>
          <option value="1m">Last month</option>
        </select>

        <select
          value={selectedSource}
          onChange={(e) => setSelectedSource(e.target.value)}
          className={styles.select}
        >
          <option value="all">All Sources</option>
          <option value="transportation">Transportation</option>
          <option value="energy">Energy</option>
          <option value="manufacturing">Manufacturing</option>
          <option value="buildings">Buildings</option>
          <option value="waste">Waste</option>
        </select>
      </div>

      <section className={styles.section}>
        <h2>Energy Consumption Overview</h2>
        <div className={styles.metrics}>
          <div className={styles.metricCard}>
            <h3>Total Energy Usage</h3>
            <p>{data.monthlyData?.reduce((sum, month) => sum + (month?.intensity || 0), 0).toFixed(2)} kWh</p>
            <div className={`${styles.metricChange} ${styles.down}`}>
              -8.5%
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12l7 7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className={styles.metricCard}>
            <h3>Renewable Energy</h3>
            <p>35%</p>
            <div className={`${styles.metricChange} ${styles.up}`}>
              +12%
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 19V5M5 12l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className={styles.metricCard}>
            <h3>Energy Efficiency</h3>
            <p>78/100</p>
            <div className={`${styles.metricChange} ${styles.up}`}>
              +5%
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 19V5M5 12l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className={styles.metricCard}>
            <h3>Peak Demand</h3>
            <p>{Math.max(...(data.monthlyData?.map(month => month?.intensity || 0) || [0])).toFixed(2)} kW</p>
            <div className={`${styles.metricChange} ${styles.down}`}>
              -10%
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12l7 7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className={styles.metricCard}>
            <h3>Energy Cost</h3>
            <p>${(data.monthlyData?.reduce((sum, month) => sum + (month?.intensity || 0) * 0.12, 0) || 0).toFixed(2)}</p>
            <div className={`${styles.metricChange} ${styles.down}`}>
              -15%
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12l7 7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Energy Usage Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="intensity" name="Energy Usage" fill="#2D6A4F" stroke="#2D6A4F" yAxisId="left" fillOpacity={0.3} />
                <Line type="monotone" dataKey="target" name="Target Usage" stroke="#84A098" strokeDasharray="5 5" yAxisId="left" />
                <Bar dataKey="reduction" name="Energy Savings" fill="#40916C" yAxisId="right" />
                <Brush dataKey="month" height={30} stroke="#2D6A4F" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.card}>
            <h2>Energy Source Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Solar', value: 20 },
                    { name: 'Wind', value: 15 },
                    { name: 'Grid Power', value: 45 },
                    { name: 'Natural Gas', value: 20 }
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={true}
                >
                  {[0, 1, 2, 3].map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.card}>
            <h2>Energy Efficiency by Facility</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="emissions" name="Emissions" unit=" tCO2e" />
                <YAxis type="number" dataKey="efficiency" name="Efficiency" unit="%" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter name="Facilities" data={bubbleData} fill="#2D6A4F">
                  {bubbleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.card}>
            <h2>Energy Consumption Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={histogramData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#2D6A4F" name="Frequency" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Carbon Emissions Overview</h2>
        <div className={styles.metrics}>
          <div className={styles.metricCard}>
            <h3>Total Emissions</h3>
            <p>{data.monthlyData.reduce((sum, month) => sum + month.emissions, 0).toFixed(2)} tCO2e</p>
            <div className={`${styles.metricChange} ${styles.down}`}>
              -12.5%
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14M5 12l7 7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className={styles.metricCard}>
            <h3>Emission Reduction</h3>
            <p>{data.monthlyData.reduce((sum, month) => sum + month.reduction, 0).toFixed(2)} tCO2e</p>
            <div className={`${styles.metricChange} ${styles.up}`}>
              +15%
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 19V5M5 12l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <div className={styles.metricCard}>
            <h3>Carbon Score</h3>
            <p>82/100</p>
            <div className={`${styles.metricChange} ${styles.up}`}>
              +8%
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 19V5M5 12l7-7 7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Emissions by Scope</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Scope 1', value: 400 },
                    { name: 'Scope 2', value: 300 },
                    { name: 'Scope 3', value: 300 },
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

          <div className={styles.card}>
            <h2>Emissions Breakdown</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={stackedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="direct"
                  stackId="1"
                  stroke={COLORS[0]}
                  fill={COLORS[0]}
                  name="Direct Emissions"
                />
                <Area
                  type="monotone"
                  dataKey="indirect"
                  stackId="1"
                  stroke={COLORS[1]}
                  fill={COLORS[1]}
                  name="Indirect Emissions"
                />
                <Area
                  type="monotone"
                  dataKey="other"
                  stackId="1"
                  stroke={COLORS[2]}
                  fill={COLORS[2]}
                  name="Other Emissions"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.card}>
            <h2>Facility Emissions Analysis</h2>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart>
                <CartesianGrid />
                <XAxis type="number" dataKey="emissions" name="Emissions" unit=" tCO2e" />
                <YAxis type="number" dataKey="efficiency" name="Efficiency" unit="%" />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                <Legend />
                <Scatter
                  name="Facilities"
                  data={bubbleData}
                  fill="#2D6A4F"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </div>

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
                      fill={`rgba(45, 106, 79, ${0.3 + (0.7 * index) / histogramData.length})`}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.card}>
            <h2>Emissions Over Time</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="emissions" stroke="#2D6A4F" />
                <Line
                  type="monotone"
                  dataKey="target"
                  stroke="#84A098"
                  strokeDasharray="5 5"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.card}>
            <h2>Reduction Progress</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="reduction"
                  stroke="#2D6A4F"
                  fill="#84A098"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.card}>
            <h2>Emissions Sources</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="emissions" fill="#2D6A4F" />
              </BarChart>
            </ResponsiveContainer>
          </div>

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

          <div className={styles.card}>
            <h2>Monthly Intensity</h2>
            <div className={styles.heatmap}>
              {filteredData.map((item) => (
                <div
                  key={item.month}
                  className={styles.heatmapCell}
                  style={{
                    backgroundColor: `rgba(45, 106, 79, ${item.intensity / 100})`,
                  }}
                >
                  <span className={styles.month}>{item.month}</span>
                  <span className={styles.value}>{item.intensity}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
