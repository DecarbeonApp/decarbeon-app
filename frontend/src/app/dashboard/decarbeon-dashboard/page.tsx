"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import BuildingParameters from "./components/BuildingParameters";
import DecarbonizationFields from "./components/DecarbonizationFields";
import EnergyGoals from "./components/EnergyGoals";
import EmissionsSummary from "./components/EmissionsSummary";
import EmissionsBillSummary from "./components/EmissionsBillSummary";

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

interface BuildingParameterValues {
  buildingType: string;
  totalArea: number;
  location: string;
  occupancy: number;
  operatingHours: number;
  constructionYear: number;
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

interface DecarbonizationValues {
  solarPVElectrification: number;
  windowInsulation: number;
  vfdMotors: number;
  smartHVAC: number;
  smartThermostats: number;
  ledLighting: number;
  scheduleOptimization: number;
  buildingEnvelope: number;
  batteryStorage: number;
  highEfficiencyAppliances: number;
}

export default function DecarbeonDashboard() {
  const [energyReductionGoal, setEnergyReductionGoal] = useState<number>(0);
  const [buildingParams, setBuildingParams] =
    useState<BuildingParameterValues | null>(null);
  const [energyGoals, setEnergyGoals] = useState<EnergyGoalValues | null>(null);
  const [metrics, setMetrics] = useState<MetricCard[]>([
    {
      title: "Total Carbon Emissions",
      value: "1,234 tCO2e",
      change: "-12%",
      trend: "down",
    },
    {
      title: "Energy Consumption",
      value: "45,678 kWh",
      change: "-8%",
      trend: "down",
    },
    {
      title: "Water Usage",
      value: "23,456 gal",
      change: "-5%",
      trend: "down",
    },
    {
      title: "Waste Generated",
      value: "789 tons",
      change: "-15%",
      trend: "down",
    },
  ]);

  const calculateOriginalBill = () => {
    if (!buildingParams?.totalArea) return 0;
    const avgCostPerSqFt = 2.5; // Average cost per square foot per year
    return buildingParams.totalArea * avgCostPerSqFt;
  };

  const calculateReducedBill = () => {
    if (!buildingParams?.totalArea || !energyGoals?.reductionTarget) return 0;
    const originalBill = calculateOriginalBill();
    return originalBill * (1 - energyGoals.reductionTarget / 100);
  };

  const calculateOriginalEmissions = () => {
    if (!buildingParams?.totalArea) return 0;
    const emissionsPerSqFt = 0.0085; // Metric tons CO2e per square foot per year
    return buildingParams.totalArea * emissionsPerSqFt;
  };

  const calculateReducedEmissions = () => {
    if (!buildingParams?.totalArea || !energyGoals?.reductionTarget) return 0;
    const originalEmissions = calculateOriginalEmissions();
    return originalEmissions * (1 - energyGoals.reductionTarget / 100);
  };

  const generateMonthlyData = () => {
    if (!buildingParams?.totalArea || !energyGoals?.reductionTarget) return [];

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const baseConsumption = (buildingParams.totalArea * 15) / 12; // Average monthly consumption
    const baseCost = calculateOriginalBill() / 12; // Average monthly cost
    const baseEmissions = calculateOriginalEmissions() / 12; // Average monthly emissions

    // Apply seasonal variations
    const seasonalFactors = {
      winter: 1.2, // Higher usage in winter
      spring: 0.9,
      summer: 1.1, // Higher usage in summer
      fall: 0.8,
    };

    return months.map((month, index) => {
      let seasonalFactor;
      if (index <= 1 || index === 11) seasonalFactor = seasonalFactors.winter;
      else if (index <= 4) seasonalFactor = seasonalFactors.spring;
      else if (index <= 7) seasonalFactor = seasonalFactors.summer;
      else seasonalFactor = seasonalFactors.fall;

      const reductionFactor = 1 - energyGoals.reductionTarget / 100;
      const consumption = baseConsumption * seasonalFactor * reductionFactor;
      const cost = baseCost * seasonalFactor * reductionFactor;
      const emissions = baseEmissions * seasonalFactor * reductionFactor;

      return {
        month,
        consumption: Math.round(consumption),
        cost: Math.round(cost),
        emissions: Number(emissions.toFixed(1)),
      };
    });
  };

  const updateCalculations = (
    params: BuildingParameterValues | null,
    goals: EnergyGoalValues | null
  ) => {
    if (!params || !goals) return;

    const newMetrics = [
      {
        title: "Total Carbon Emissions",
        value: `${calculateReducedEmissions().toFixed(1)} tCO2e`,
        change: `${goals.reductionTarget}%`,
        trend: "down",
      },
      {
        title: "Energy Consumption",
        value: `${(
          params.totalArea *
          15 *
          (1 - goals.reductionTarget / 100)
        ).toFixed(0)} kWh`,
        change: `${goals.reductionTarget}%`,
        trend: "down",
      },
      {
        title: "Water Usage",
        value: `${(
          params.totalArea *
          0.05 *
          (1 - goals.reductionTarget / 100)
        ).toFixed(0)} gal`,
        change: `${(goals.reductionTarget * 0.8).toFixed(1)}%`,
        trend: "down",
      },
      {
        title: "Waste Generated",
        value: `${(
          params.totalArea *
          0.001 *
          (1 - goals.reductionTarget / 100)
        ).toFixed(1)} tons`,
        change: `${(goals.reductionTarget * 0.9).toFixed(1)}%`,
        trend: "down",
      },
    ];
    setMetrics(newMetrics);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Decarbeon Dashboard</h1>

      <div className={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <div key={index} className={styles.metricCard}>
            <h3 className={styles.metricTitle}>{metric.title}</h3>
            <div className={styles.metricValue}>{metric.value}</div>
            <div className={`${styles.metricChange} ${styles[metric.trend]}`}>
              {metric.change}
              {metric.trend === "up" ? (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M12 19V5M5 12l7-7 7 7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M12 5v14M5 12l7 7 7-7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>
          </div>
        ))}
      </div>

      <BuildingParameters
        onUpdate={(parameters: BuildingParameterValues) => {
          setBuildingParams(parameters);
          updateCalculations(parameters, energyGoals);
        }}
      />

      <EnergyGoals
        onUpdate={(goals: EnergyGoalValues) => {
          setEnergyGoals(goals);
          setEnergyReductionGoal(goals.reductionTarget);
          updateCalculations(buildingParams, goals);
        }}
      />

      <DecarbonizationFields
        energyReductionGoal={energyReductionGoal}
        onUpdate={(fields: DecarbonizationValues) => {
          console.log("Decarbonization fields updated:", fields);
        }}
      />

      <EmissionsBillSummary
        originalBill={calculateOriginalBill()}
        reducedBill={calculateReducedBill()}
        originalEmissions={calculateOriginalEmissions()}
        reducedEmissions={calculateReducedEmissions()}
      />

      <EmissionsSummary electricityData={generateMonthlyData()} />

      <div className={styles.recommendations}>
        <h2 className={styles.sectionTitle}>Sustainability Recommendations</h2>
        <ul className={styles.recommendationList}>
          <li>Implement energy-efficient lighting systems</li>
          <li>Optimize HVAC operations during off-peak hours</li>
          <li>Increase renewable energy usage</li>
          <li>Improve waste recycling programs</li>
          <li>Install smart meters for real-time monitoring</li>
          <li>Conduct regular energy audits</li>
        </ul>
      </div>
    </div>
  );
}
