import { useState, useEffect } from "react";
import { getprescriptionRequest } from "@/requests/getprescriptionsRequest";
import { useAppSelector } from "@/store/hooks";

interface Prescription {
  url: string;
  doctorName: string;
  prescribedDate: string | null;
}



import axios, { AxiosResponse } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

async function getPrescriptionRequest(username: string): Promise<Prescription[]>{
    try {
        const response: AxiosResponse<Prescription[]> = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/prescriptions/${username}/`);
        const transformedPresc: Prescription[] = response.data.map((item: any) => ({
          url: item?.Presc_file_url,
          doctorName: item?.doctor_name,
          prescribedDate: item?.prescribed_date

        }))
        console.log(transformedPresc);
        return transformedPresc;
      
    } catch (error) {
      throw new Error(`Error: ${error.response}`)
    }
}


const usePrescriptions = (username: string) => {
  return useQuery({
    queryKey: ['Prescriptions', username],
    queryFn: () => getPrescriptionRequest(username)
  })
};


async function uploadPrescriptionRequest(formData: FormData) {
  try{
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload-file/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data' 
      },
    });
    console.log('File uploaded successfully:', response.data);
    return response;
  }
  catch(error){
    console.error('Error uploading file:', error);
    throw error;
  }
}


export function uploadPresciption () {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadPrescriptionRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['Prescriptions']})
    }
  })
}
export default usePrescriptions;
