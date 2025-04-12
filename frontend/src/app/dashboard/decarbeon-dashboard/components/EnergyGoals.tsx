'use client';

import { useState } from 'react';
import styles from './EnergyGoals.module.css';

interface EnergyGoalsProps {
  onUpdate: (goals: EnergyGoalValues) => void;
}

interface EnergyGoalValues {
  reductionTarget: number;
  targetYear: number;
  baselineYear: number;
  baselineConsumption: number;
  scope1Target: number;
  scope2Target: number;
  scope3Target: number;
}

export default function EnergyGoals({ onUpdate }: EnergyGoalsProps) {
  const currentYear = new Date().getFullYear();

  const handleWheel = (e: React.WheelEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.currentTarget.blur();
  };
  
  const [goals, setGoals] = useState<EnergyGoalValues>({
    reductionTarget: '' as unknown as number,
    targetYear: currentYear + 5,
    baselineYear: currentYear - 1,
    baselineConsumption: '' as unknown as number,
    scope1Target: '' as unknown as number,
    scope2Target: '' as unknown as number,
    scope3Target: '' as unknown as number
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: number): string => {
    if (name.includes('Target') && (value < 0 || value > 100)) {
      return 'Target must be between 0 and 100';
    }
    if (name === 'baselineConsumption' && value < 0) {
      return 'Consumption must be positive';
    }
    if (name === 'targetYear' && value < currentYear) {
      return 'Target year must be in the future';
    }
    if (name === 'baselineYear' && (value > currentYear || value < 1900)) {
      return 'Invalid baseline year';
    }
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : Number(value);
    
    const error = validateField(name, numValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    if (!error) {
      const updatedGoals = {
        ...goals,
        [name]: numValue
      };
      setGoals(updatedGoals);
      onUpdate({
        ...updatedGoals,
        [name]: value === '' ? 0 : Number(value)
      });
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Set Energy Consumption Reduction Goals</h2>
      
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="reductionTarget">Overall Reduction Target (%)</label>
          <input
            type="number"
            id="reductionTarget"
            name="reductionTarget"
            value={goals.reductionTarget}
            onChange={handleChange}
            onWheel={handleWheel}
            min="0"
            max="100"
            className={`${styles.input} ${errors.reductionTarget ? styles.error : ''}`}
            aria-invalid={!!errors.reductionTarget}
            aria-describedby={errors.reductionTarget ? 'reductionTarget-error' : undefined}
          />
          {errors.reductionTarget && (
            <span id="reductionTarget-error" className={styles.errorMessage}>
              {errors.reductionTarget}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="targetYear">Target Year</label>
          <input
            type="number"
            id="targetYear"
            name="targetYear"
            value={goals.targetYear}
            onChange={handleChange}
            onWheel={handleWheel}
            min={currentYear}
            className={`${styles.input} ${errors.targetYear ? styles.error : ''}`}
            aria-invalid={!!errors.targetYear}
            aria-describedby={errors.targetYear ? 'targetYear-error' : undefined}
          />
          {errors.targetYear && (
            <span id="targetYear-error" className={styles.errorMessage}>
              {errors.targetYear}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="baselineYear">Baseline Year</label>
          <input
            type="number"
            id="baselineYear"
            name="baselineYear"
            value={goals.baselineYear}
            onChange={handleChange}
            onWheel={handleWheel}
            max={currentYear}
            min="1900"
            className={`${styles.input} ${errors.baselineYear ? styles.error : ''}`}
            aria-invalid={!!errors.baselineYear}
            aria-describedby={errors.baselineYear ? 'baselineYear-error' : undefined}
          />
          {errors.baselineYear && (
            <span id="baselineYear-error" className={styles.errorMessage}>
              {errors.baselineYear}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="baselineConsumption">Baseline Consumption (kWh)</label>
          <input
            type="number"
            id="baselineConsumption"
            name="baselineConsumption"
            value={goals.baselineConsumption}
            onChange={handleChange}
            onWheel={handleWheel}
            min="0"
            className={`${styles.input} ${errors.baselineConsumption ? styles.error : ''}`}
            aria-invalid={!!errors.baselineConsumption}
            aria-describedby={errors.baselineConsumption ? 'baselineConsumption-error' : undefined}
          />
          {errors.baselineConsumption && (
            <span id="baselineConsumption-error" className={styles.errorMessage}>
              {errors.baselineConsumption}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="scope1Target">Scope 1 Reduction Target (%)</label>
          <input
            type="number"
            id="scope1Target"
            name="scope1Target"
            value={goals.scope1Target}
            onChange={handleChange}
            onWheel={handleWheel}
            min="0"
            max="100"
            className={`${styles.input} ${errors.scope1Target ? styles.error : ''}`}
            aria-invalid={!!errors.scope1Target}
            aria-describedby={errors.scope1Target ? 'scope1Target-error' : undefined}
          />
          {errors.scope1Target && (
            <span id="scope1Target-error" className={styles.errorMessage}>
              {errors.scope1Target}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="scope2Target">Scope 2 Reduction Target (%)</label>
          <input
            type="number"
            id="scope2Target"
            name="scope2Target"
            value={goals.scope2Target}
            onChange={handleChange}
            onWheel={handleWheel}
            min="0"
            max="100"
            className={`${styles.input} ${errors.scope2Target ? styles.error : ''}`}
            aria-invalid={!!errors.scope2Target}
            aria-describedby={errors.scope2Target ? 'scope2Target-error' : undefined}
          />
          {errors.scope2Target && (
            <span id="scope2Target-error" className={styles.errorMessage}>
              {errors.scope2Target}
            </span>
          )}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="scope3Target">Scope 3 Reduction Target (%)</label>
          <input
            type="number"
            id="scope3Target"
            name="scope3Target"
            value={goals.scope3Target}
            onChange={handleChange}
            onWheel={handleWheel}
            min="0"
            max="100"
            className={`${styles.input} ${errors.scope3Target ? styles.error : ''}`}
            aria-invalid={!!errors.scope3Target}
            aria-describedby={errors.scope3Target ? 'scope3Target-error' : undefined}
          />
          {errors.scope3Target && (
            <span id="scope3Target-error" className={styles.errorMessage}>
              {errors.scope3Target}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}