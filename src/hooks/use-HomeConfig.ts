import axios, { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
interface Feature {
    name: string;
    enabled: boolean;
    restrictedMessage: string;
  }

type HomepageConfig = {
  features: Feature[];
};

//possible responses 400 404 200 500
async function getConfigRequest(username: string): Promise<HomepageConfig>{
    try{
        const response: AxiosResponse<HomepageConfig>= await axios.get(`${import.meta.env.VITE_BACKEND_URL}/plans/get-configuration/?username=${username}`);
        const data = response.data;
        return data;
    }catch(error: any){
        throw new Error(`Error: ${error.response}`)
    }
}

export function useHomeConfig(username: string) {
    return useQuery({
        queryKey: ['AppConfig', {username}],
        queryFn: () => getConfigRequest(username), 
    })
}  