import axios from "axios";

export const createTicketRequest = async (username:string, ticket_type:string, description:string) => {
    try{
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/create-device-ticket/`, {
            username,
            ticket_type,
            description,
          });
        console.log("Service request created successfully:", response.data);
        return response.data;
    }catch(error){
        console.error("Error creating service request:", error);
        throw error;
    }
};