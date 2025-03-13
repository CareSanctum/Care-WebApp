import axios from "axios";

export const getreferrerdetailsRequest = async (username: string) => {
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/referrals/get-lead/`, {
            params: {username}
        });
        console.log(response.data);
        return response.data;
    }
    catch(error){
        console.log(error);
        throw error;
    }
}