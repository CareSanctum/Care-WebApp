import React from 'react';
import { Heart, Activity, Wind, Thermometer } from 'lucide-react';
import { HealthMetricCard } from './HealthMetricCard';

const generateTrendData = (baseValue: number, variance: number) => {
  return Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    value: baseValue + Math.random() * variance * 2 - variance,
  }));
};

interface PrimaryVitalsProps {
  HeartRate: number;
  BloodPressure: string;
  RespiratoryRate: number;
  Temperature:number;
  checked_at:string;
}
export const PrimaryVitals = ({HeartRate, BloodPressure, RespiratoryRate, Temperature, checked_at}: PrimaryVitalsProps) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-primary">Primary Vitals</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <HealthMetricCard
          title="Heart Rate"
          value={`${HeartRate} BPM`}
          icon={<Heart className="h-4 w-4" />}
          lastChecked={checked_at}
          trendData={generateTrendData(72, 5)}
          description="Heart rate is the number of times your heart beats per minute. It varies based on activity level, emotions, and overall health."
          unit="Beats Per Minute (BPM)"
          normalRange="60-100 BPM"
        />
        <HealthMetricCard
          title="Blood Pressure"
          value={`${BloodPressure} mmHg`}
          icon={<Activity className="h-4 w-4" />}
          lastChecked={checked_at}
          trendData={generateTrendData(120, 10)}
          description="Blood pressure is the force of blood pushing against artery walls. It's shown as two numbers: systolic (top) and diastolic (bottom) pressure."
          unit="Millimeters of Mercury (mmHg)"
          normalRange="Systolic: 90-120 mmHg, Diastolic: 60-80 mmHg"
        />
        <HealthMetricCard
          title="Respiratory Rate"
          value={`${RespiratoryRate} BPM`}
          icon={<Wind className="h-4 w-4" />}
          lastChecked={checked_at}
          trendData={generateTrendData(16, 2)}
          description="Respiratory rate is the number of breaths taken per minute. It's measured by counting chest rises and falls."
          unit="Breaths Per Minute (BPM)"
          normalRange="12-20 BPM"
        />
        <HealthMetricCard
          title="Temperature"
          value={`${Temperature}°C`}
          icon={<Thermometer className="h-4 w-4" />}
          lastChecked={checked_at}
          trendData={generateTrendData(36.6, 0.3)}
          description="Body temperature is a measure of the body's ability to generate and get rid of heat. Normal temperature varies throughout the day."
          unit="Celsius (°C)"
          normalRange="36.1-37.2°C"
        />
      </div>
    </div>
  );
};