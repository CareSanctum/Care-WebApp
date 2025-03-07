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
      localStorage.setItem("admin_accessToken", state.adminaccessToken);
      localStorage.setItem("admin_username", state.adminusername);
    },
    logout: (state) => {
      state.adminaccessToken = "";
      state.adminusername = "";
      state.adminisAuthenticated = false;
      localStorage.removeItem('admin_accessToken');
      localStorage.removeItem('admin_username');
    },
  },
});
  
export const { setadminCredentials, logout } = adminauthSlice.actions;
export default adminauthSlice.reducer;