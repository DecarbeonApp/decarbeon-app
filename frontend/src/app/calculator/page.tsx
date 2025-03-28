'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

interface CalculatorResult {
  total: string;
  electricity: string;
  water: string;
  car: string;
}

interface FormData {
  electricityUsage: string;
  waterUsage: string;
  hasCar: boolean;
  carMileage: string;
  category: string;
}

export default function Calculator() {
  const [formData, setFormData] = useState<FormData>({
    electricityUsage: '',
    waterUsage: '',
    hasCar: false,
    carMileage: '',
    category: 'household'
  });

  const [result, setResult] = useState<CalculatorResult | null>(null);

  const categories = [
    { value: 'household', label: 'Household' },
    { value: 'transport', label: 'Transport' },
    { value: 'diet', label: 'Diet' },
    { value: 'travel', label: 'Travel' }
  ];

  const calculateEmissions = () => {
    let totalEmissions = 0;

    // Updated emission factors based on industry standards
    const ELECTRICITY_FACTOR = 0.5; // kgCO2/kWh
    const WATER_FACTOR = 0.1; // kgCO2/m³
    const CAR_FACTOR = 0.2; // kgCO2/km

    if (formData.electricityUsage) {
      totalEmissions += parseFloat(formData.electricityUsage) * ELECTRICITY_FACTOR;
    }

    if (formData.waterUsage) {
      totalEmissions += parseFloat(formData.waterUsage) * WATER_FACTOR;
    }

    if (formData.hasCar && formData.carMileage) {
      totalEmissions += parseFloat(formData.carMileage) * CAR_FACTOR;
    }

    const electricityEmissions = formData.electricityUsage 
      ? (parseFloat(formData.electricityUsage) * ELECTRICITY_FACTOR).toFixed(2) 
      : '0';

    const waterEmissions = formData.waterUsage 
      ? (parseFloat(formData.waterUsage) * WATER_FACTOR).toFixed(2) 
      : '0';

    const carEmissions = formData.hasCar && formData.carMileage 
      ? (parseFloat(formData.carMileage) * CAR_FACTOR).toFixed(2) 
      : '0';

    setResult({
      total: totalEmissions.toFixed(2),
      electricity: electricityEmissions,
      water: waterEmissions,
      car: carEmissions
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Carbon Emission Calculator</h1>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label>Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label>Electricity Usage (kWh/month)</label>
              <input
                type="number"
                name="electricityUsage"
                value={formData.electricityUsage}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter monthly electricity usage"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Water Usage (m³/month)</label>
              <input
                type="number"
                name="waterUsage"
                value={formData.waterUsage}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter monthly water usage"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Do you have a car?</label>
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  name="hasCar"
                  checked={formData.hasCar}
                  onChange={handleChange}
                />
                <span>Yes</span>
              </div>
            </div>

            {formData.hasCar && (
              <div className={styles.formGroup}>
                <label>Monthly Mileage (km)</label>
                <input
                  type="number"
                  name="carMileage"
                  value={formData.carMileage}
                  onChange={handleChange}
                  className={styles.input}
                  placeholder="Enter monthly mileage"
                />
              </div>
            )}

            <button
              type="button"
              onClick={calculateEmissions}
              className={styles.calculateButton}
            >
              Calculate Emissions
            </button>
          </form>

          {result && (
            <div className={styles.results}>
              <h2>Carbon Emissions Results</h2>
              <div className={styles.resultItem}>
                <span>Total Emissions:</span>
                <span>{result.total} kg CO₂/month</span>
              </div>
              <div className={styles.resultItem}>
                <span>Electricity:</span>
                <span>{result.electricity} kg CO₂/month</span>
              </div>
              <div className={styles.resultItem}>
                <span>Water:</span>
                <span>{result.water} kg CO₂/month</span>
              </div>
              <div className={styles.resultItem}>
                <span>Car:</span>
                <span>{result.car} kg CO₂/month</span>
              </div>
              <Link href="/dashboard" className={styles.dashboardLink}>
                View Dashboard →
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
