import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import sv from './locales/sv.json';
import ja from './locales/ja.json';

const resources = {
  en: { translation: en },
  sv: { translation: sv },
  ja: { translation: ja },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    // Remove automatic language detection since we'll handle it via URL
    lng: 'en', // Default language
  });

export default i18n;