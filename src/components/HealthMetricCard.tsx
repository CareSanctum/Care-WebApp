import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { BlurredGraph } from './BlurredComponents/Blurred_Graph';
import { Info } from 'lucide-react';
import * as LucideIcons from "lucide-react";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { MetricType } from '@/hooks/use-MetricsData';


function formatNumberOrPair(value: number | [number | null, number | null] | null): string {
  if (value === null) return "--";
  
  if (typeof value === "number") {
    return value.toString();
  }

  const [first, second] = value;
  if (first === null || second === null) {
    return "--";
  }

  return `${first}/${second}`;
}
const DynamicIcon = ({ iconName }: { iconName: string }) => {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.Info; // Default to Info
  return <IconComponent className="h-4 w-4 text-muted-foreground" />;
}

function mergeTrendData(trendData: MetricType['trendData'], xKey: string) {
  console.log(trendData);
  const merged = {};

  trendData.forEach((line) => {
    line.data.forEach((point) => {
      const xValue = point[xKey];
      if (!merged[xValue]) merged[xValue] = { [xKey]: xValue };
      merged[xValue][line.name] = point.value;
    });
  });
  console.log(merged);
  return Object.values(merged);
}

function formatIsoToReadableTime(isoString: string): string {
  const date = new Date(isoString);

  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export const HealthMetricCard = ({ 
  Title, 
  Latestvalue, 
  ValueUnit,
  icon, 
  visible,
  lastChecked, 
  trendData,
  tooltipDescription,
  tooltipUnit,
  tooltipNormalRange
}:MetricType ) => {

  const isTimeBased = trendData && trendData[0].data[0] && 'time' in trendData[0].data[0];
  const formattedValue = formatNumberOrPair(Latestvalue);

  const xKey = isTimeBased ? "time" : "date";
  const mergedData = trendData && mergeTrendData(trendData, xKey);


  return (
    <Card className="hover:shadow-lg transition-shadow bg-gradient-to-br from-white to-gray-50 border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-sm font-medium">{Title}</CardTitle>
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <div className="space-y-2">
                  <p>{tooltipDescription}</p>
                  {<p>Unit: {tooltipUnit}</p>}
                  {<p>Normal Range: {tooltipNormalRange}</p>}
                </div>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        </div>
        <div className="text-primary"><DynamicIcon iconName={icon} /></div>
      </CardHeader>
      {visible ? (
      <CardContent>
      <div className="text-2xl font-bold mb-2">{formattedValue} {ValueUnit}</div>
      <div className="text-xs text-gray-500 mb-2">{lastChecked  ? <div>Last checked: {formatIsoToReadableTime(lastChecked)}</div> : <></>}</div>
      <div className="h-32">
            {trendData ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mergedData} margin={{ top: 20, right: 20, bottom: 5, left: 5 }} >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey={xKey} 
                    fontSize={10}
                    tickFormatter={(value) => {
                      if (isTimeBased) {
                        const date = new Date(value);
                        return date.toLocaleTimeString(undefined, {
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: false,
                        });
                      } else {
                        return new Date(value).toLocaleDateString(undefined, { weekday: 'short' });
                      }
                    }}
                    interval={0}
                  />
                  <YAxis fontSize={10} />
                  <Tooltip />
                  <Legend iconType="plainline" />
                  {trendData.map((dataSet) => (
                    <Line
                      key={dataSet.name}
                      type="linear" 
                      dataKey={dataSet.name}
                      name={dataSet.name}
                      stroke={dataSet.color}
                      strokeWidth={2}
                      dot={true}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                No data available
              </div>
            )}
          </div>
    </CardContent>
      ): <BlurredGraph RestrictedText="Upgrade to premium to access this feature"/> }
    </Card>
  );
};