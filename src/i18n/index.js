import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import nl from './nl.json';
import pl from './pl.json';
import pt from './pt.json';
import ro from './ro.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    nl: { translation: nl },
    pl: { translation: pl },
    pt: { translation: pt },
    ro: { translation: ro },
  },
  lng: 'en', // default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
