import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DarkModeProvider } from './context/DarkModeContext';
import { AuthProvider } from './context/AuthContext';
import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
console.log('Initializing EmailJS with public key:', publicKey ? 'Public key exists' : 'Public key missing');

// Make sure we're using the correct initialization method
emailjs.init({
  publicKey: publicKey,
  // Uncomment the following line if site is in development
  limitRate: false,
});

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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
