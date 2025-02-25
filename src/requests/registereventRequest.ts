import axios from "axios";

export const registereventRequest = async(username: string, event_id: string) =>{
    try {
        const response = await axios.post("http://192.168.1.66:8080/api/register-event/", {
            "username": username,
            "event_id": event_id
        },{
            headers:{
                "Content-Type": "application/json"
            }
        });
        return response.data;
    }
    catch(error){
        console.log(error);
    }
}