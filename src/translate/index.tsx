// src/translate/index.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en/en';
import hi from './hi/hi';

const LANGUAGES = {
  en: { translation: en },
  hi: { translation: hi },
};

i18n.use(initReactI18next).init({
  resources: LANGUAGES,
  fallbackLng: 'en', // default language
  compatibilityJSON: 'v3',
  react: {
    useSuspense: false,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
