// src/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
  isLogin: boolean;
}

const initialState: AuthState = {
  isLogin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
    logout(state) {
      state.isLogin = false;
    },
  },
});

export const { setLogin, logout } = authSlice.actions;
export const isLoginSelector = (state: RootState) => state.auth.isLogin;
export default authSlice.reducer;
