import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface LanguageState {
  language: string;
}

const initialState: LanguageState = {
  language: 'en', // default language
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export const isLanguageSelector = (state: RootState) => state.language.language;
export default languageSlice.reducer;
