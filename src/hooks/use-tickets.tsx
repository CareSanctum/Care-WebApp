import { create } from 'zustand';
export type Ticket = {
  id: string;
  title: string;
  status: string;
  date: string;
  category: string;
};
type TicketStore = {
  tickets: Ticket[];
  addTicket: (ticket: Ticket) => void;
};
const useTicketStore = create<TicketStore>((set) => ({
  tickets: [
    { id: '1', title: 'Medicine Delivery Request', status: 'closed', date: '2024-03-15', category: 'Concierge' },
    { id: '2', title: 'Cab Booking Assistance', status: 'open', date: '2024-03-18', category: 'Transport' },
    { id: '3', title: 'Weekly Health Check-up', status: 'open', date: '2024-03-20', category: 'Healthcare' },
  ],
  addTicket: (newTicket) =>
    set((state) => ({
      tickets: [newTicket, ...state.tickets],
    })),
}));
export const useTickets = () => useTicketStore();