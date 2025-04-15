import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DarkModeProvider } from './context/DarkModeContext';
import { AuthProvider } from './context/AuthContext';
import emailjs from '@emailjs/browser';

// Initialize EmailJS
emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY); // Initialize with your EmailJS public key

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <DarkModeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </DarkModeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
