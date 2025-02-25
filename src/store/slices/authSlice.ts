import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface AuthState {
  accessToken: string;
  username: string;
  isAuthenticated: boolean;
}

interface LoginPayload {
  accessToken: string;
  username: string;
}

const initialState: AuthState = {
  accessToken: "",
  username: "",
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<LoginPayload>) => {
      state.accessToken = action.payload.accessToken;
      state.username = action.payload.username;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('username', action.payload.username);
    },
    logout: (state) => {
      state.accessToken = "";
      state.username = "";
      state.isAuthenticated = false;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('username');
    },
  },
});
  
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;