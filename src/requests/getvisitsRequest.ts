import axios from "axios";

export const getvisitRequest = async(username: string) => {
    try{
        const response = await axios.get(`http://192.168.1.66:8080/api/get-schedules/${username}/`);
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}