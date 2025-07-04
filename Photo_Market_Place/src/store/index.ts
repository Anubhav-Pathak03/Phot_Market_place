import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import photographersReducer from './slices/photographersSlice';
import bookingsReducer from './slices/bookingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    photographers: photographersReducer,
    bookings: bookingsReducer,
  },
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;