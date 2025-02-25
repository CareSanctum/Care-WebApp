import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import formReducer from './slices/formSlice';
import adminauthReducer from './slices/adminauthSlice'
import ticketReducer from './slices/ticketSlice';
import eventReducer from './slices/eventSlice'

export const store = configureStore({
    reducer: {
      auth: authReducer,
      form: formReducer,
      adminauth: adminauthReducer,
      tickets: ticketReducer,
      events: eventReducer, 
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;