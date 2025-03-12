import axios from "axios";
import { ReferralUserType } from "@/hooks/use-refdata";

export const  getreferralsdata = async (username: string, referral_code: string) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/referrals/get-leads/`, {
            params: { username, referral_code }
        });
        const ReferralData: ReferralUserType[] = response.data.map(({lead, commission}: any ) => ({
            username: lead?.user?.username,
            status: commission ? commission.status : "pending",
            date: lead?.date_referred,
            reward : commission?.amount 
        }))
        console.log(ReferralData);
        return ReferralData;
    }  
    catch(error){
        console.log(error);
        throw error;
    }
}