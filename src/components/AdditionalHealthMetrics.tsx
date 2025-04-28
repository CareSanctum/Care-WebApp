import React from 'react';
  import { Droplets, Activity, Scale, Moon, Brain, Gauge } from 'lucide-react';
import { HealthMetricCard } from './HealthMetricCard';
import { HourlyData } from '@/hooks/Google-Fit/use-HourlyData';
import { WeeklyData } from '@/hooks/Google-Fit/use-WeeklyData';
import { ResponseData } from '@/hooks/use-MetricsData';
import useHomeConfig from '@/hooks/use-HomeConfig';
import { Loader2 } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { use_RQHomeConfig } from '@/requests/RQ_requests/rq_getconf';



type AdditionalMetricsProps = {
  response: ResponseData;  // Expecting the response object only
};

export const AdditionalHealthMetrics = ({ response }: AdditionalMetricsProps) => {
  const {username} = useAppSelector((state) => state.auth);
  const {data, status, error} = use_RQHomeConfig(username);
  if (status === 'pending') {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin w-16 h-16 text-gray-500" />
      </div>
    );
  }
  if (status === "error") return <div>Error: {error.message}</div>;
  const needsBlur = (Servicename: string) => {
    const feature = data?.features.find((feature) => feature.name === Servicename);
    return feature ? true : false;
  }
  const getRestrictedMessage = (name: string) => {
    return data?.features.find(f => f.name === name)?.restrictedMessage ?? "Restricted";
  };
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-primary">Additional Health Metrics</h2>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-4`}>
      {
        response.AdditionalMetrics.map((metric, index) => {
          const {  Code, Title, Latestvalue, ValueUnit, icon, visible, lastChecked, trendData, tooltipDescription, tooltipUnit, tooltipNormalRange} = metric;
          const isLast = index === response.AdditionalMetrics.length - 1;
          const isOdd = response.AdditionalMetrics.length % 2 !== 0;
          const spanFullWidth = isLast && isOdd;
          return (
            <div key={index} className={spanFullWidth ? 'md:col-span-2' : ''}>
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
            </div>
          );
        })
      }
      </div>
    </div>
  );
};