'use client';

import { useState } from 'react';
import styles from './BuildingParameters.module.css';

interface BuildingParametersProps {
  onUpdate: (parameters: BuildingParameterValues) => void;
}

interface BuildingParameterValues {
  buildingType: string;
  totalArea: number;
  location: string;
  occupancy: number;
  operatingHours: number;
  constructionYear: number;
}

export default function BuildingParameters({ onUpdate }: BuildingParametersProps) {
  const [parameters, setParameters] = useState<BuildingParameterValues>({ 
    buildingType: 'office',
    totalArea: '' as unknown as number,
    location: '',
    occupancy: '' as unknown as number,
    operatingHours: '' as unknown as number,
    constructionYear: new Date().getFullYear(),
  });

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedParameters = {
      ...parameters,
      [name]: name === 'totalArea' || name === 'occupancy' || name === 'operatingHours' || name === 'constructionYear'
        ? value === '' ? ('' as unknown as number) : Number(value)
        : value,
    };
    setParameters(updatedParameters);
    onUpdate({
      ...updatedParameters,
      [name]: name === 'totalArea' || name === 'occupancy' || name === 'operatingHours' || name === 'constructionYear'
        ? value === '' ? 0 : Number(value)
        : value,
    });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Building Parameters</h2>
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="buildingType">Building Type</label>
          <select
            id="buildingType"
            name="buildingType"
            value={parameters.buildingType}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="office">Office Building</option>
            <option value="retail">Retail Space</option>
            <option value="warehouse">Warehouse</option>
            <option value="residential">Residential</option>
            <option value="industrial">Industrial</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="totalArea">Total Area (sq ft)</label>
          <input
            type="number"
            id="totalArea"
            name="totalArea"
            value={parameters.totalArea}
            onChange={handleChange}
            onWheel={handleWheel}
            min="0"
            step="1"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={parameters.location}
            onChange={handleChange}
            className={styles.input}
            placeholder="City, State"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="occupancy">Average Daily Occupancy</label>
          <input
            type="number"
            id="occupancy"
            name="occupancy"
            value={parameters.occupancy}
            onChange={handleChange}
            onWheel={handleWheel}
            min="0"
            step="1"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="operatingHours">Operating Hours per Day</label>
          <input
            type="number"
            id="operatingHours"
            name="operatingHours"
            value={parameters.operatingHours}
            onChange={handleChange}
            onWheel={handleWheel}
            min="0"
            max="24"
            step="1"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="constructionYear">Construction Year</label>
          <input
            type="number"
            id="constructionYear"
            name="constructionYear"
            value={parameters.constructionYear}
            onChange={handleChange}
            onWheel={handleWheel}
            min="1900"
            max={new Date().getFullYear()}
            step="1"
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
}