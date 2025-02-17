import React from 'react';
import { Droplets, Activity, Scale, Moon, Brain, Gauge } from 'lucide-react';
import { HealthMetricCard } from './HealthMetricCard';

const generateTrendData = (baseValue: number, variance: number) => {
  return Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: baseValue + Math.random() * variance * 2 - variance,
  }));
};

interface HealthMetricsProps {
  BloodSugar: number;
  Ecg: string;
  Bmi: number;
  SleepLevel:number;
  StressLevel:string;
  BloodOxygen:number;
  checked_at: string;
}

export const AdditionalHealthMetrics = ({BloodSugar, Ecg,Bmi, SleepLevel, StressLevel, BloodOxygen, checked_at}: HealthMetricsProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-primary">Additional Health Metrics</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <HealthMetricCard
          title="Blood Sugar"
          value={`${BloodSugar} mg/dL`}
          icon={<Droplets className="h-4 w-4" />}
          lastChecked={checked_at}
          trendData={generateTrendData(95, 8)}
          description="Blood sugar (glucose) level indicates the amount of sugar in your bloodstream. It's important for monitoring diabetes and overall health."
          unit="Milligrams per Deciliter (mg/dL)"
          normalRange="70-99 mg/dL (fasting)"
        />
        <HealthMetricCard
          title="ECG"
          value={`${Ecg}`}
          icon={<Activity className="h-4 w-4" />}
          lastChecked={checked_at}
          trendData={generateTrendData(72, 5)}
          description="Electrocardiogram (ECG) measures the electrical activity of your heart. It helps detect irregular heartbeats and other heart conditions."
          normalRange="Normal sinus rhythm"
        />
        <HealthMetricCard
          title="BMI"
          value={`${Bmi}`}
          icon={<Scale className="h-4 w-4" />}
          lastChecked={checked_at}
          trendData={generateTrendData(22.4, 0.2)}
          description="Body Mass Index (BMI) is a measure of body fat based on height and weight. It helps assess if someone is at a healthy weight."
          unit="kg/m²"
          normalRange="18.5-24.9"
        />
        <HealthMetricCard
          title="Sleep Level"
          value={`${SleepLevel} hrs`}
          icon={<Moon className="h-4 w-4" />}
          lastChecked={checked_at}
          trendData={generateTrendData(7.5, 1)}
          description="Sleep duration and quality are important for overall health. Good sleep helps with recovery, memory, and immune function."
          unit="Hours"
          normalRange="7-9 hours per night"
        />
        <HealthMetricCard
          title="Stress Level"
          value={`${StressLevel}`}
          icon={<Brain className="h-4 w-4" />}
          lastChecked={checked_at}
          trendData={generateTrendData(2, 1)}
          description="Stress level indicates your current mental and emotional state. It's measured through various physiological indicators."
          normalRange="Low to Moderate"
        />
        <HealthMetricCard
          title="Blood Oxygen"
          value={`${BloodOxygen}%`}
          icon={<Gauge className="h-4 w-4" />}
          lastChecked={checked_at}
          trendData={generateTrendData(98, 1)}
          description="Blood oxygen saturation (SpO2) measures how much oxygen your red blood cells are carrying. It's crucial for vital organ function."
          unit="Percentage (%)"
          normalRange="95-100%"
        />
      </div>
    </div>
  );
};