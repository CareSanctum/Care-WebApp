import axios from "axios";

export const schedulevisitRequest = async (username: string, visit_type: string, scheduled_datetime:string) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/schedule-visit/`,{
            username:username,
            visit_type: visit_type,
            scheduled_datetime:scheduled_datetime
        })
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}