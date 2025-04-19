import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  // Load the saved language from localStorage, default to 'en' if not found
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    // Change the language in i18next and save the selected language in localStorage
    i18n.changeLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
  }, [selectedLanguage, i18n]);

  const changeLanguage = (lng) => {
    setSelectedLanguage(lng); // Set the selected language in state
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'nl', name: 'Dutch' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ro', name: 'Romanian' },
  ];

  return (
    <div className="language-switcher">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`language-button ${selectedLanguage === lang.code ? 'selected' : ''}`}
        >
          {lang.name}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
