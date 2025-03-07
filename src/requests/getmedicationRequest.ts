import axios from "axios";
import {Medication} from "@/hooks/use-medications";
export const getmedicationRequest = async (username: string) =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/medications/get-medications/`, {
            params: {"username": username}
        });
        const transformedLRs:Medication[] = response.data.map((item: any) => ({
            medicineName: item?.medicine_name? item.medicine_name : "",
            dosage: item?.dosage? item.dosage : "",
            timing: item?.timing? item.timing : "",
            prescribedBy: item?.prescribed_by? item.prescribed_by : "",
            expiry: item?.expiry_date? item.expiry_date : "",
            stock: item?.stock_remaining? item.stock_remaining : "",
          }));
          return transformedLRs;
    } catch (error) {
        console.log(error);
    }
}
