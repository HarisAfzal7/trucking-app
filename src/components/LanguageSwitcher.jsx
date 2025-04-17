import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState(i18n.language);

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    setSelected(lng); // ✅ trigger re-render
  };

  return (
    <div className="language-switcher">
      <button onClick={() => handleLanguageChange('en')}>English</button>
      <button onClick={() => handleLanguageChange('nl')}>Dutch</button>
      <button onClick={() => handleLanguageChange('ro')}>Romanian</button>
      <button onClick={() => handleLanguageChange('pt')}>Portuguese</button>
      <button onClick={() => handleLanguageChange('pl')}>Polish</button>
    </div>
  );
};

export default LanguageSwitcher;
