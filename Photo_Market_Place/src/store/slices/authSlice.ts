import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User } from '../../types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// For demo purposes, we'll use these mock users
const mockUsers: User[] = [
  {
    id: '1',
    email: 'customer@example.com',
    name: 'Sample Customer',
    role: 'customer',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'photographer@example.com',
    name: 'Sample Photographer',
    role: 'photographer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date().toISOString(),
  },
];

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

// Mock login function (in a real app, this would call an API)
export const loginUser = (email: string, password: string) => (dispatch: any) => {
  dispatch(loginStart());
  
  // Simulate API call
  setTimeout(() => {
    const user = mockUsers.find(u => u.email === email);
    
    if (user && password === 'password') {
      dispatch(loginSuccess(user));
    } else {
      dispatch(loginFailure('Invalid email or password'));
    }
  }, 1000);
};

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;