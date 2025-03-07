import { useState, useEffect } from "react";
import { getmedicationRequest } from "@/requests/getmedicationRequest";
import { useAppSelector } from "@/store/hooks";

export interface Medication {
  medicineName: string;
  dosage: string ;
  timing: string ;
  prescribedBy: string ;
  expiry: string ;
  stock: string;
}

const useMedications = () => {
  const [Medications, setMedications] = useState<Medication[]>([]);
  const {username} = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const transformedMeds = await getmedicationRequest(username);
        setMedications(transformedMeds);
      } catch (err) {
        console.error("Failed to fetch lab Reports", err);
      }
    };

    fetchMedications();
  }, [username]);
  console.log(Medications);
  return Medications;
};

export default useMedications;