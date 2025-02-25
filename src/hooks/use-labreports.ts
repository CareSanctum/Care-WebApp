import { useState, useEffect } from "react";
import { getlabreportsRequest } from "@/requests/getlabreportsRequest";
import { useAppSelector } from "@/store/hooks";

export interface LabReport {
  url: string;
  testName: string;
  testDate: string ;
}

const useLabReports = () => {
  const [labReports, setlabReports] = useState<LabReport[]>([]);
  const {username} = useAppSelector((state) => state.auth);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const transformedLRs = await getlabreportsRequest(username);
        setlabReports(transformedLRs);
      } catch (err) {
        console.error("Failed to fetch lab Reports", err);
      }
    };

    fetchPrescriptions();
  }, [username]);
  console.log(labReports);
  return labReports;
};

export default useLabReports;