import axios from "axios";
import { LabReport } from "@/hooks/use-labreports";
export const getlabreportsRequest = async (username: string) =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/lab-reports/${username}/`);
        const transformedLRs:LabReport[] = response.data.map((item: any) => ({
            url: item?.LR_file_url ? item.LR_file_url : "",
            testName: item?.test_name ? item.test_name : "",
            testDate: item?.test_date ? item.test_date : "",
          }));
          return transformedLRs;
    } catch (error) {
        console.log(error);
    }
}
