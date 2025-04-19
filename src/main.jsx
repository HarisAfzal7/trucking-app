import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';
import './i18n'; // This will now work because index.js exists
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Import the service worker

// The entry point for the React app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register the service worker to enable PWA features
serviceWorkerRegistration.register();
