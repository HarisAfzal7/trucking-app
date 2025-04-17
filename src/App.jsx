import React from 'react';
import LanguageSwitcher from './components/LanguageSwitcher';
import Form from './components/Form';
import './styles.css';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <LanguageSwitcher />
      <Form />
    </div>
  );
};

export default App;
