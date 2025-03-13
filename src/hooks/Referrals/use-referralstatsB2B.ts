import { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hooks";
import { getreferralstatsB2BRequest } from "@/requests/Referrals/getreferralstatsB2BRequest ";
export interface ReferralStatsType {
    total_leads_count: number,
    converted_leads_count: number,
    total_commission: number,
}

const useReferralStatsB2B = (referral_code: string) => {
    const [stats, setStats] = useState<ReferralStatsType | null>(null);
    
    const { username } = useAppSelector((state) => state.auth);
  
    useEffect(() => {
      const fetchReferralStats = async () => {
        try {
          const referralStatsData = await getreferralstatsB2BRequest(username);
          setStats(referralStatsData);
        } catch (err) {
          console.error("Failed to fetch referral stats", err);
        }
      };
  
      fetchReferralStats();
    }, [username, referral_code]); // Re-run when username or referral_code changes
  
    return stats;
  };
  
  export default useReferralStatsB2B;