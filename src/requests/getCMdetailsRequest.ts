import axios from "axios";

export const getCMdetailsRequest = async (username: string) => {
    try{
        const response = await axios.get(`http://192.168.1.66:8080/api/patient/${username}`);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}