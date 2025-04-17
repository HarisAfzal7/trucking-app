import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      fallbackLng: 'en',
      debug: true,  // Enable debug mode to log details
      interpolation: {
        escapeValue: false, // Not needed for React as it escapes by default
      },
      react: {
        useSuspense: false,
      },
      backend: {
        // Adjust path to point directly to the 'src/i18n' folder
        loadPath: './i18n/{{lng}}.json',  // Relative path based on your project structure
      },
    },
    (err, t) => {
      if (err) {
        console.error("i18next initialization failed", err);
      } else {
        console.log("i18next initialization successful!");
        console.log("Current language:", i18n.language);
      }
    }
  );

export default i18n;
