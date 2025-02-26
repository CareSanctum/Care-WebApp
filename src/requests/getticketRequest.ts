import axios from "axios";
import { Ticket } from "@/store/slices/ticketSlice";

export const getticketRequest = async(username: string):Promise<Ticket[]> =>{
    try{
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tickets/`, {
            params: {"username": username}
        })
        const transformedTickets: Ticket[] = response.data.map((ticket: any) => ({
            id: ticket.ticket_number,
            title: ticket.service_name,
            status: ticket.status,
            date: ticket.date_initiated, 
          }));
      
          return transformedTickets;
    }
    catch(error){
        console.log(error);
    }
}