import axios from "axios";

export const createleadRequest = async (username: string, referral_code: string) => {
    try{
        const response = axios.post(`${import.meta.env.VITE_BACKEND_URL}/referrals/create-lead/?username=${username}&referral_code=${referral_code}`);

    }catch(error){
        console.log(error);
        throw error;
    }
}