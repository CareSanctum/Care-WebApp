import axios from "axios";
import { Ticket } from "@/hooks/use-tickets";

export const getticketRequest = async(username: string):Promise<Ticket[]> =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tickets/`, {
            params: {"username": username}
        })
        const transformedTickets: Ticket[] = response.data.map((ticket: any) => ({
            id: ticket.id,
            title: ticket.type,
            status: ticket.status,
            opened_at: ticket.created_at, 
            closed_at: ticket.closed_at,
          }));
      
          return transformedTickets;
    }
    catch(error){
        console.log(error);
    }
}