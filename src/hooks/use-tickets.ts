// useTickets.ts
import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getticketRequest } from '@/requests/getticketRequest';
import { setTickets } from '@/store/slices/ticketSlice';
export type Ticket = {
  id: string;
  title: string;
  status: string;
  opened_at: string;
  closed_at: string|null;
}
const useTickets = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const {username} = useAppSelector((state) => state.auth);
  

  useEffect(() => {
    const getTickets = async () => {
      try{
        const ticketsFromApi = await getticketRequest(username);
        setTickets(ticketsFromApi);
      }
      catch(error){
        console.log(error);
      }
    };

    getTickets();
  }, [username]); // Runs only once when the component mounts
  return { tickets };
};

export default useTickets;