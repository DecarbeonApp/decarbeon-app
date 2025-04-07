import { useState } from 'react';

interface EmissionsData {
  monthlyData: Array<{
    month: string;
    emissions: number;
    reduction: number;
    target: number;
    intensity: number;
  }>;
  sourceData: Array<{
    name: string;
    value: number;
  }>;
}

const STATIC_DATA: EmissionsData = {
  monthlyData: [
    { month: 'Jan', emissions: 150, reduction: 15, target: 120, intensity: 0.45 },
    { month: 'Feb', emissions: 140, reduction: 12, target: 115, intensity: 0.42 },
    { month: 'Mar', emissions: 160, reduction: 18, target: 130, intensity: 0.48 },
    { month: 'Apr', emissions: 130, reduction: 10, target: 110, intensity: 0.39 },
    { month: 'May', emissions: 120, reduction: 8, target: 105, intensity: 0.36 },
    { month: 'Jun', emissions: 110, reduction: 5, target: 100, intensity: 0.33 },
  ],
  sourceData: [
    { name: 'Manufacturing', value: 250 },
    { name: 'Transportation', value: 150 },
    { name: 'Buildings', value: 300 },
    { name: 'Energy', value: 200 },
    { name: 'Waste', value: 100 },
  ]
};

interface UseStaticEmissionsDataReturn {
  data: EmissionsData;
  loading: boolean;
  error: string | null;
  updateData: (updates: Partial<EmissionsData>) => void;
}

export function useStaticEmissionsData(): UseStaticEmissionsDataReturn {
  const [data, setData] = useState<EmissionsData>(STATIC_DATA);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const updateData = (updates: Partial<EmissionsData>) => {
    setData(prevData => ({
      ...prevData,
      ...updates
    }));
  };

  return { data, loading, error, updateData };
}