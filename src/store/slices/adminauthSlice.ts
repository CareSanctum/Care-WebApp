import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface AdminAuthState {
  adminaccessToken: string;
  adminusername: string;
  adminisAuthenticated: boolean;
}

interface LoginPayload {
  adminaccessToken: string;
  adminusername: string;
}

const initialState: AdminAuthState = {
  adminaccessToken: "",
  adminusername: "",
  adminisAuthenticated: false,
};

const adminauthSlice = createSlice({
  name: 'adminauth',
  initialState,
  reducers: {
    setadminCredentials: (state, action: PayloadAction<LoginPayload>) => {
      state.adminaccessToken = action.payload.adminaccessToken;
      state.adminusername = action.payload.adminusername;
      state.adminisAuthenticated = true;
    },
    logout: (state) => {
      state.adminaccessToken = "";
      state.adminusername = "";
      state.adminisAuthenticated = false;
    },
  },
});
  
export const { setadminCredentials, logout } = adminauthSlice.actions;
export default adminauthSlice.reducer;