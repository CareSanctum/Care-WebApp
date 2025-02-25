import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Event =  {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
};

type Eventstate = {
    events: Event[];
}

const initialState: Eventstate = {
  events: [],
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
  },
});

export const { setEvents } = eventSlice.actions;
export default eventSlice.reducer;