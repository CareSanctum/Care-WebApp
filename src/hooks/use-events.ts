import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { geteventsRequest } from '@/requests/geteventsRequest';
import { setEvents } from '@/store/slices/eventSlice';

const useEvents = () => {
  const events = useAppSelector((state) => state.events.events);
  const username = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getEvents = async () => {
      const eventsFromApi = await geteventsRequest();
      dispatch(setEvents(eventsFromApi));
    };

    getEvents();
  }, [dispatch]); // Runs only once when the component mounts
  console.log(events);
  return { events };
};

export default useEvents;