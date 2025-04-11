'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import styles from './EmissionsSummary.module.css';

Chart.register(...registerables);

interface EmissionsSummaryProps {
  electricityData: {
    month: string;
    consumption: number;
    cost: number;
    emissions: number;
  }[];
}

export default function EmissionsSummary({ electricityData }: EmissionsSummaryProps) {
  const consumptionChartRef = useRef<HTMLCanvasElement | null>(null);
  const emissionsChartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!consumptionChartRef.current || !emissionsChartRef.current) return;

    // Consumption and Cost Chart
    const consumptionChart = new Chart(consumptionChartRef.current, {
      type: 'bar',
      data: {
        labels: electricityData.map(d => d.month),
        datasets: [
          {
            label: 'Consumption (kWh)',
            data: electricityData.map(d => d.consumption),
            backgroundColor: '#2D6A4F',
            yAxisID: 'consumption',
          },
          {
            label: 'Cost ($)',
            data: electricityData.map(d => d.cost),
            backgroundColor: '#95D5B2',
            yAxisID: 'cost',
          },
        ],
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        },
        scales: {
          consumption: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Consumption (kWh)',
            },
          },
          cost: {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: 'Cost ($)',
            },
            grid: {
              drawOnChartArea: false,
            },
          },
        },
      },
    });

    // Emissions Chart
    const emissionsChart = new Chart(emissionsChartRef.current, {
      type: 'line',
      data: {
        labels: electricityData.map(d => d.month),
        datasets: [{
          label: 'CO₂ Emissions (tCO₂e)',
          data: electricityData.map(d => d.emissions),
          borderColor: '#2D6A4F',
          backgroundColor: 'rgba(45, 106, 79, 0.1)',
          fill: true,
          tension: 0.4,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Monthly CO₂ Emissions Trend',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Emissions (tCO₂e)',
            },
          },
        },
      },
    });

    return () => {
      consumptionChart.destroy();
      emissionsChart.destroy();
    };
  }, [electricityData]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Energy, Bill, and CO₂ Comparisons</h2>
      
      <div className={styles.chartGrid}>
        <div className={styles.chartContainer}>
          <h3 className={styles.subtitle}>Energy Consumption & Cost</h3>
          <canvas ref={consumptionChartRef} />
        </div>

        <div className={styles.chartContainer}>
          <h3 className={styles.subtitle}>CO₂ Emissions Trend</h3>
          <canvas ref={emissionsChartRef} />
        </div>
      </div>

      <div className={styles.summaryStats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total Consumption</span>
          <span className={styles.statValue}>
            {electricityData.reduce((sum, d) => sum + d.consumption, 0).toLocaleString()} kWh
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total Cost</span>
          <span className={styles.statValue}>
            ${electricityData.reduce((sum, d) => sum + d.cost, 0).toLocaleString()}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Total Emissions</span>
          <span className={styles.statValue}>
            {electricityData.reduce((sum, d) => sum + d.emissions, 0).toLocaleString()} tCO₂e
          </span>
        </div>
      </div>
    </div>
  );
}