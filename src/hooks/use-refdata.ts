import { useState, useEffect, useRef } from "react";
import { getreferralsdata } from "@/requests/Referrals/getreferralsdataRequest";
import { useAppSelector } from "@/store/hooks";


export interface ReferralUserType {
    username: string;
    status: string;
    date: string;
    reward?: number;
  };

const useReferralsData = (referral_code: string) => {
    const [referrals, setReferrals] = useState<ReferralUserType[]>([]);
    const { username } = useAppSelector((state) => state.auth);
    
    useEffect(() => {
      const fetchReferrals = async () => {
        try {
          if (!username || !referral_code) return; // Prevent unnecessary API calls
          const referralData = await getreferralsdata(username, referral_code);
          setReferrals(referralData);
        } catch (err) {
          console.error("Failed to fetch referral data", err);
        }
      };
  
      fetchReferrals();
    }, [username, referral_code]); // Re-run when username or referral_code changes
    console.log(referrals);
    return referrals;
  };

export default useReferralsData;