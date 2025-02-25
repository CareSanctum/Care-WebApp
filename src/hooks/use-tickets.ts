// useTickets.ts
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getticketRequest } from '@/requests/getticketRequest';
import { setTickets } from '@/store/slices/ticketSlice';

const useTickets = () => {
  const tickets = useAppSelector((state) => state.tickets.tickets);
  const {username} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getTickets = async () => {
      const ticketsFromApi = await getticketRequest(username);
      dispatch(setTickets(ticketsFromApi));
    };

    getTickets();
  }, [dispatch]); // Runs only once when the component mounts
  return { tickets };
};

export default useTickets;