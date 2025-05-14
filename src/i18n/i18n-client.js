import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { languages } from './settings';



const ns = ['common'];
const supportedLngs = languages.map(l => l.code);

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    supportedLngs,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    ns,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
