import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booking, BookingFormData } from '../../types';

interface BookingsState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: BookingsState = {
  bookings: [],
  isLoading: false,
  error: null,
  success: false,
};

// Mock bookings for the demo
const mockBookings: Booking[] = [
  {
    id: '1',
    customerId: '1',
    photographerId: '2',
    date: '2025-07-15',
    startTime: '10:00',
    endTime: '12:00',
    location: 'Central Park, New York',
    sessionType: 'Family Portrait',
    notes: 'Looking for natural, candid shots of our family of four.',
    status: 'confirmed',
    totalAmount: 240,
    createdAt: '2025-06-01T09:30:00Z',
  },
  {
    id: '2',
    customerId: '1',
    photographerId: '3',
    date: '2025-08-20',
    startTime: '14:00',
    endTime: '16:00',
    location: 'Studio Address, Los Angeles',
    sessionType: 'Professional Headshots',
    status: 'pending',
    totalAmount: 400,
    createdAt: '2025-07-05T11:45:00Z',
  },
];

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    fetchBookingsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchBookingsSuccess: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
      state.isLoading = false;
    },
    fetchBookingsFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createBookingStart: (state) => {
      state.isLoading = true;
      state.error = null;
      state.success = false;
    },
    createBookingSuccess: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
      state.isLoading = false;
      state.success = true;
    },
    createBookingFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    },
    clearBookingStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
});

// Mock API functions
export const fetchUserBookings = (userId: string) => (dispatch: any) => {
  dispatch(fetchBookingsStart());
  
  // Simulate API call
  setTimeout(() => {
    const userBookings = mockBookings.filter(b => 
      b.customerId === userId || b.photographerId === userId
    );
    dispatch(fetchBookingsSuccess(userBookings));
  }, 500);
};

export const createBooking = (
  customerId: string, 
  photographerId: string, 
  bookingData: BookingFormData
) => (dispatch: any) => {
  dispatch(createBookingStart());
  
  // Simulate API call
  setTimeout(() => {
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      customerId,
      photographerId,
      date: bookingData.date,
      startTime: bookingData.startTime,
      endTime: bookingData.endTime,
      location: bookingData.location,
      sessionType: bookingData.sessionType,
      notes: bookingData.notes,
      status: 'pending',
      totalAmount: 0, // This would be calculated on the server
      createdAt: new Date().toISOString(),
    };
    
    dispatch(createBookingSuccess(newBooking));
  }, 1000);
};

export const {
  fetchBookingsStart, fetchBookingsSuccess, fetchBookingsFailed,
  createBookingStart, createBookingSuccess, createBookingFailed,
  clearBookingStatus
} = bookingsSlice.actions;

export default bookingsSlice.reducer;