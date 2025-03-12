import axios from "axios";
import { ReferralStatsType } from "@/hooks/use-referralstats";
export const getreferralstatsB2BRequest = async (username: string) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/referrals/get-b2b-referral-stats/`, {
            params: { username }
        });
        const ReferralStatsData: ReferralStatsType = {
            total_leads_count: response.data?.total_leads_count || 0,
            total_commission: response.data?.total_commission || 0,
            converted_leads_count: response.data?.converted_leads_count || 0
        }
        console.log(ReferralStatsData);
        return ReferralStatsData;
    }  
    catch(error){
        console.log(error);
        throw error;
    }
}