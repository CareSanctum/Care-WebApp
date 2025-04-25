import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/store/hooks";

export interface MetricType {
    Code: string;
    Title: string;
    icon: string;
    visible: boolean;
    tooltipDescription: string;
    tooltipUnit: string;
    tooltipNormalRange: string;
    Latestvalue: number | [number, number] | null;
    ValueUnit: string ;
    lastChecked: string | null;
    trendData?: Array<{
        name: string;
        color: string;
        data: Array<{ date: string; value: number }>|Array<{time: string, value: number}>;
    }>
    }
    
    export interface ResponseData {
        PrimaryVitals: MetricType[];
        AdditionalMetrics: MetricType[];
    }

export const useMetricsData = (start_time: string, end_time: string) => {
    const [metricsData, setmetricsData] = useState<ResponseData | null>(null);
    const [metricsloading, setmetricsLoading] = useState(true);
    const [metricserror, setmetricsError] = useState<string | null>(null);
    const {username} = useAppSelector((state) => state.auth);
    // const username = "nit.arvindkarna"
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user-metrics/${username}/`, {
                    params:{
                        start_time: start_time,
                        end_time: end_time,
                    }
                });
                // const response = await axios.get("https://5c1fced9-e3b6-4603-a87e-92d1e86fb266.mock.pstmn.io/metrics/");
                const parsedData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                setmetricsData(parsedData);
          
            } catch (err:any) {
                if (err.response) {
                    setmetricsError(err.response.data.message || 'Server error');
                  } else if (err.request) {
                    // No response received
                    setmetricsError('No response from server');
                  } else {
                    // Other errors
                    setmetricsError(err.message || 'Unexpected error');
                  }
            } finally {
                setmetricsLoading(false);
            }
        };
        fetchConfig();
    }, []);
    return { metricsData, metricsloading, metricserror };
}