// store/ticketSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Ticket = {
  id: string;
  title: string;
  status: string;
  date: string;
};

type TicketState = {
  tickets: Ticket[];
};

const initialState: TicketState = {
  tickets: [],
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
  },
});

export const { setTickets } = ticketSlice.actions;
export default ticketSlice.reducer;
