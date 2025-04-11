'use client';

import { useState, useEffect } from 'react';
import styles from './DecarbonizationFields.module.css';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

interface DecarbonizationFieldsProps {
  energyReductionGoal: number;
  onUpdate: (fields: DecarbonizationValues) => void;
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

export default function DecarbonizationFields({ energyReductionGoal, onUpdate }: DecarbonizationFieldsProps) {
  const [fields, setFields] = useState<DecarbonizationValues>({
    solarPVElectrification: 4.80,
    windowInsulation: 2.40,
    vfdMotors: 3.60,
    smartHVAC: 2.40,
    smartThermostats: 1.20,
    ledLighting: 2.40,
    scheduleOptimization: 2.40,
    buildingEnvelope: 2.40,
    batteryStorage: 1.20,
    highEfficiencyAppliances: 1.20
  });

  useEffect(() => {
    if (energyReductionGoal) {
      const scaleFactor = energyReductionGoal / 24; // 24 is the sum of all default percentages
      const updatedFields = Object.keys(fields).reduce((acc, key) => ({
        ...acc,
        [key]: Number((fields[key as keyof DecarbonizationValues] * scaleFactor).toFixed(2))
      }), {} as DecarbonizationValues);
      
      setFields(updatedFields);
      onUpdate(updatedFields);
    }
  }, [energyReductionGoal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFields = {
      ...fields,
      [name]: Number(value)
    };
    setFields(updatedFields);
    onUpdate(updatedFields);
  };

  const CustomSlider = styled(Slider)(({ theme }) => ({
    color: '#2196F3',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#2196F3',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  }));

  const handleSliderChange = (name: string) => (event: Event, newValue: number | number[]) => {
    const updatedFields = {
      ...fields,
      [name]: Number(newValue)
    };
    setFields(updatedFields);
    onUpdate(updatedFields);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Decarbonization Fields</h2>
      
      <div className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="solarPVElectrification">Solar PV Electrification (%)</label>
          <CustomSlider
            value={fields.solarPVElectrification}
            onChange={handleSliderChange('solarPVElectrification')}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={100}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="windowInsulation">Window Insulation (R-value) (%)</label>
          <CustomSlider
            value={fields.windowInsulation}
            onChange={handleSliderChange('windowInsulation')}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={100}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="vfdMotors">VFD Motors (%)</label>
          <CustomSlider
            value={fields.vfdMotors}
            onChange={handleSliderChange('vfdMotors')}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={100}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="smartHVAC">Smart HVAC Efficiency (%)</label>
          <CustomSlider
            value={fields.smartHVAC}
            onChange={handleSliderChange('smartHVAC')}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={100}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="smartThermostats">Smart Thermostats (%)</label>
          <CustomSlider
            value={fields.smartThermostats}
            onChange={handleSliderChange('smartThermostats')}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={100}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="ledLighting">LED Lighting Upgrade (%)</label>
          <CustomSlider
            value={fields.ledLighting}
            onChange={handleSliderChange('ledLighting')}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={100}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="scheduleOptimization">Schedule Optimization (%)</label>
          <CustomSlider
            value={fields.scheduleOptimization}
            onChange={handleSliderChange('scheduleOptimization')}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={100}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="buildingEnvelope">Building Envelope Improvements (%)</label>
          <CustomSlider
            value={fields.buildingEnvelope}
            onChange={handleSliderChange('buildingEnvelope')}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={100}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="batteryStorage">Battery Energy Storage (%)</label>
          <CustomSlider
            value={fields.batteryStorage}
            onChange={handleSliderChange('batteryStorage')}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={100}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="highEfficiencyAppliances">High-Efficiency Appliances (%)</label>
          <CustomSlider
            value={fields.highEfficiencyAppliances}
            onChange={handleSliderChange('highEfficiencyAppliances')}
            valueLabelDisplay="auto"
            step={0.1}
            min={0}
            max={100}
          />
        </div>
      </div>
    </div>
  );
}