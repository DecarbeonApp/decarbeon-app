'use client';

import styles from './EmissionsBillSummary.module.css';

interface EmissionsBillSummaryProps {
  originalBill: number;
  reducedBill: number;
  originalEmissions: number;
  reducedEmissions: number;
}

export default function EmissionsBillSummary({
  originalBill,
  reducedBill,
  originalEmissions,
  reducedEmissions,
}: EmissionsBillSummaryProps) {
  const billSavings = originalBill - reducedBill;
  const emissionsSavings = originalEmissions - reducedEmissions;

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-AE', {
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Electricity Bill and CO₂ Emissions Summary</h2>
      
      <div className={styles.summaryGrid}>
        <div className={styles.section}>
          <h3>Electricity Bill</h3>
          <div className={styles.row}>
            <span>Original Electricity Bill:</span>
            <span className={styles.value}>
              {formatNumber(originalBill)} AED/year
            </span>
          </div>
          <div className={styles.row}>
            <span>Reduced Electricity Bill:</span>
            <span className={styles.value}>
              {formatNumber(reducedBill)} AED/year
            </span>
          </div>
          <div className={styles.row}>
            <span>Electricity Bill Savings:</span>
            <span className={styles.greenValue}>
              {formatNumber(billSavings)} AED/year
            </span>
          </div>
        </div>

        <div className={styles.section}>
          <h3>CO₂ Emissions</h3>
          <div className={styles.row}>
            <span>Original CO₂ Emissions:</span>
            <span className={styles.value}>
              {formatNumber(originalEmissions)} tonnes/year
            </span>
          </div>
          <div className={styles.row}>
            <span>Reduced CO₂ Emissions:</span>
            <span className={styles.value}>
              {formatNumber(reducedEmissions)} tonnes/year
            </span>
          </div>
          <div className={styles.row}>
            <span>CO₂ Savings:</span>
            <span className={styles.greenValue}>
              {formatNumber(emissionsSavings)} tonnes/year
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}