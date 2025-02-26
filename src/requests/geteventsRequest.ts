import axios from "axios";
import { Event } from "@/store/slices/eventSlice";

export const geteventsRequest = async():Promise<Event[]> =>{
    try{
        const response = await axios.get(`${process.env.BACKEND_URL}/api/latest-events/`)
        const transformedEvents: Event[] = response.data.map((event: any) => ({
            id: event.id,
            title: event.name,
            description: event.description,
            date: event.date,
            location: event.location,
          }));
      
          return transformedEvents;
    }
    catch(error){
        console.log(error);
    }
}