import { useState, useEffect } from "react";
import { getprescriptionRequest } from "@/requests/getprescriptionsRequest";
import { useAppSelector } from "@/store/hooks";

export interface Prescription {
  url: string;
  doctorName: string;
  prescribedDate: string | null;
}

const usePrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const {username} = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const transformedPrescs = await getprescriptionRequest(username);
        setPrescriptions(transformedPrescs);
      } catch (err) {
        console.error("Failed to fetch prescriptions", err);
      }
    };

    fetchPrescriptions();
  }, [username]);
  console.log(prescriptions);
  return prescriptions;
};

export default usePrescriptions;
