import axios from "axios";

export const getb2creferralcodeRequest = async (username: string) =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/referrals/b2c-code/`, {
            params: { username }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching referral code:", error);
        throw error;  // Throw the error so it can be handled in the hook
    }
}

export const getb2breferralcodeRequest = async (username: string) =>{
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/referrals/b2b-code/`, {
            params: { username }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching referral code:", error);
        throw error;  // Throw the error so it can be handled in the hook
    }
}