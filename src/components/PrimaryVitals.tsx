import React from 'react';
import { Heart, Activity, Wind, Thermometer } from 'lucide-react';
import { HealthMetricCard } from './HealthMetricCard';
import { HourlyData } from '@/hooks/Google-Fit/use-HourlyData';
import { WeeklyData } from '@/hooks/Google-Fit/use-WeeklyData';
import { ResponseData } from '@/hooks/use-MetricsData';
import useHomeConfig from '@/hooks/use-HomeConfig';
import { Loader2 } from 'lucide-react';

type PrimaryVitalsProps = {
  response: ResponseData;  // Expecting the response object only
};

export const PrimaryVitals = ({ response }: PrimaryVitalsProps) => {
  const getGridClass = (count: number) => {
    return `grid-cols-1 md:grid-cols-2 ${
      count === 1 ? "lg:grid-cols-1" :
      count === 2 ? "lg:grid-cols-2" :
      count === 3 ? "lg:grid-cols-3" :
      count === 4 ? "lg:grid-cols-2" : 
      "lg:grid-cols-3" // 6+ items → 3 columns (2 per row)
    }`;
  };
  const { config, configloading, error } = useHomeConfig();
  if (configloading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-16 h-16 text-gray-500" />
      </div>
    );
  }
  if (error) return <div>Error: {error}</div>;
  const needsBlur = (Servicename: string) => {
    const feature = config?.features.find((feature) => feature.name === Servicename);
    return feature ? feature.enabled : true;
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-primary">Primary Vitals</h2>
      <div className={`grid gap-6 ${getGridClass(response?.PrimaryVitals?.length || 6)}`}>
      {
        response?.PrimaryVitals?.map((metric, index) => {
          const { Code, Title, Latestvalue, ValueUnit, icon, visible, lastChecked, trendData, tooltipDescription, tooltipUnit, tooltipNormalRange} = metric;
          return (
            <HealthMetricCard
              Code={Code}
              key={index}  // Ensure each item has a unique key for list rendering
              Title={Title}
              Latestvalue={Latestvalue}
              ValueUnit={ValueUnit}
              icon={icon}
              visible={needsBlur(Code)}
              lastChecked={lastChecked}
              trendData={trendData}
              tooltipDescription={tooltipDescription}
              tooltipUnit={tooltipUnit}
              tooltipNormalRange={tooltipNormalRange}
            />
          );
        })
      }
      </div>
    </div>
  );
};