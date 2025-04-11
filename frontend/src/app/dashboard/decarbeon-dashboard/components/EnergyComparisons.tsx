'use client';

import { useEffect, useState } from 'react';
import styles from './EnergyComparisons.module.css';

interface EnergyComparisonsProps {
  electricityConsumption: number;
  naturalGasConsumption: number;
  fuelOilConsumption: number;
  renewableEnergy: number;
  monthlyElectricityBill: number;
  monthlyGasBill: number;
  peakDemand: number;
  offPeakDemand: number;
}

interface ComparisonData {
  totalEnergyConsumption: number;
  totalUtilityBill: number;
  energyMixPercentages: {
    electricity: number;
    naturalGas: number;
    fuelOil: number;
    renewable: number;
  };
  demandProfile: {
    peak: number;
    offPeak: number;
  };
}

export default function EnergyComparisons({
  electricityConsumption,
  naturalGasConsumption,
  fuelOilConsumption,
  renewableEnergy,
  monthlyElectricityBill,
  monthlyGasBill,
  peakDemand,
  offPeakDemand
}: EnergyComparisonsProps) {
  const [comparisons, setComparisons] = useState<ComparisonData>({
    totalEnergyConsumption: 0,
    totalUtilityBill: 0,
    energyMixPercentages: {
      electricity: 0,
      naturalGas: 0,
      fuelOil: 0,
      renewable: 0
    },
    demandProfile: {
      peak: 0,
      offPeak: 0
    }
  });

  useEffect(() => {
    // Calculate total energy consumption (converting all to kWh equivalent)
    const gasToKWh = naturalGasConsumption * 29.3; // 1 therm = 29.3 kWh
    const fuelOilToKWh = fuelOilConsumption * 43.2; // 1 gallon = 43.2 kWh
    const totalEnergyConsumption = electricityConsumption + gasToKWh + fuelOilToKWh + renewableEnergy;

    // Calculate total utility bill
    const totalUtilityBill = monthlyElectricityBill + monthlyGasBill;

    // Calculate energy mix percentages
    const energyMixPercentages = {
      electricity: (electricityConsumption / totalEnergyConsumption) * 100 || 0,
      naturalGas: (gasToKWh / totalEnergyConsumption) * 100 || 0,
      fuelOil: (fuelOilToKWh / totalEnergyConsumption) * 100 || 0,
      renewable: (renewableEnergy / totalEnergyConsumption) * 100 || 0
    };

    // Update demand profile
    const demandProfile = {
      peak: peakDemand,
      offPeak: offPeakDemand
    };

    setComparisons({
      totalEnergyConsumption,
      totalUtilityBill,
      energyMixPercentages,
      demandProfile
    });
  }, [
    electricityConsumption,
    naturalGasConsumption,
    fuelOilConsumption,
    renewableEnergy,
    monthlyElectricityBill,
    monthlyGasBill,
    peakDemand,
    offPeakDemand
  ]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Energy, Bill, and CO₂ Comparisons</h2>

      <div className={styles.comparisonsGrid}>
        <div className={styles.comparisonCard}>
          <h3>Total Energy Consumption</h3>
          <p className={styles.value}>{comparisons.totalEnergyConsumption.toFixed(2)} kWh</p>
        </div>

        <div className={styles.comparisonCard}>
          <h3>Total Monthly Utility Bill</h3>
          <p className={styles.value}>${comparisons.totalUtilityBill.toFixed(2)}</p>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.subtitle}>Energy Mix Distribution</h3>
        <div className={styles.energyMixBars}>
          <div className={styles.barContainer}>
            <div
              className={`${styles.bar} ${styles.electricityBar}`}
              style={{ width: `${comparisons.energyMixPercentages.electricity}%` }}
            />
            <span>Electricity ({comparisons.energyMixPercentages.electricity.toFixed(1)}%)</span>
          </div>

          <div className={styles.barContainer}>
            <div
              className={`${styles.bar} ${styles.gasBar}`}
              style={{ width: `${comparisons.energyMixPercentages.naturalGas}%` }}
            />
            <span>Natural Gas ({comparisons.energyMixPercentages.naturalGas.toFixed(1)}%)</span>
          </div>

          <div className={styles.barContainer}>
            <div
              className={`${styles.bar} ${styles.fuelOilBar}`}
              style={{ width: `${comparisons.energyMixPercentages.fuelOil}%` }}
            />
            <span>Fuel Oil ({comparisons.energyMixPercentages.fuelOil.toFixed(1)}%)</span>
          </div>

          <div className={styles.barContainer}>
            <div
              className={`${styles.bar} ${styles.renewableBar}`}
              style={{ width: `${comparisons.energyMixPercentages.renewable}%` }}
            />
            <span>Renewable ({comparisons.energyMixPercentages.renewable.toFixed(1)}%)</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.subtitle}>Demand Profile</h3>
        <div className={styles.demandProfile}>
          <div className={styles.demandBar}>
            <div className={styles.barLabel}>Peak Demand</div>
            <div className={styles.barValue}>{comparisons.demandProfile.peak} kW</div>
          </div>

          <div className={styles.demandBar}>
            <div className={styles.barLabel}>Off-Peak Demand</div>
            <div className={styles.barValue}>{comparisons.demandProfile.offPeak} kW</div>
          </div>
        </div>
      </div>
    </div>
  );
}