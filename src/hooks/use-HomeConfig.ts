import { useEffect, useState } from "react";
import axios from "axios";
import { useAppSelector } from "@/store/hooks";

export interface Feature {
  name: string;
  enabled: boolean;
  restrictedMessage: string;
}
export type HomepageConfig = {
  features: Feature[];
};


const  useHomeConfig = () => {
    const [config, setConfig] = useState<HomepageConfig | null>(null);
    const [configloading, setConfigLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const {username} = useAppSelector((state) => state.auth);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/plans/get-configuration/?username=${username}`);
                const parsedData = typeof response.data === 'string' ? JSON.parse(response.data) : response.data;
                console.log(parsedData);
                setConfig(parsedData);
          
            } catch (err:any) {
                if (err.response) {
                    setError(err.response.data.message || 'Server error');
                  } else if (err.request) {
                    // No response received
                    setError('No response from server');
                  } else {
                    // Other errors
                    setError(err.message || 'Unexpected error');
                  }
            } finally {
                setConfigLoading(false);
            }
        };
        fetchConfig();
    }, []);
    return { config, configloading, error };
}

export default useHomeConfig;