import axios from "axios";

export const contactCMRequest = async (username: string) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/contact-CM/`,{
            username: username
        })
        return response.data.message;
    }
    catch(error){
        console.log(error);
    }
}