import axios from "axios";
import { ReferralStatsType } from "@/hooks/use-referralstats";
export const getreferralstatsRequest = async (username: string, referral_code: string) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/referrals/get-b2c-referral-stats/`, {
            params: { username, referral_code }
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