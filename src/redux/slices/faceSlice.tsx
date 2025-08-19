// src/redux/slices/faceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface FaceState {
  biometricsKey?: string;
  isAuthenticated: boolean;
}

const initialState: FaceState = {
  biometricsKey: undefined,
  isAuthenticated: false,
};

const faceSlice = createSlice({
  name: 'face',
  initialState,
  reducers: {
    // store generated biometric key
    setBiometricsKey(state, action: PayloadAction<string | undefined>) {
      state.biometricsKey = action.payload;
    },
    // update biometric authentication status
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    // optional: clear everything (like a manual logout)
    logout(state) {
      state.isAuthenticated = false;
      state.biometricsKey = undefined;
    },
  },
});

export const { setBiometricsKey, setAuthenticated, logout } = faceSlice.actions;
export const faceSelector = (state: RootState) => state.face;
export default faceSlice.reducer;
