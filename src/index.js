import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DarkModeProvider } from './context/DarkModeContext';
import App from './App';
import './index.css';

// Use requestIdleCallback or setTimeout to defer non-critical initialization
// and avoid blocking the main thread during page load
const startApp = () => {
  // Remove the root-loading element now that React is ready to render
  const loadingElement = document.getElementById('root-loading');
  if (loadingElement) {
    loadingElement.style.display = 'none';
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <DarkModeProvider>
            <App />
          </DarkModeProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

// Use requestIdleCallback for better performance if available
if (typeof window !== 'undefined') {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(startApp);
  } else {
    // Fallback for browsers that don't support requestIdleCallback
    setTimeout(startApp, 1);
  }
} else {
  // For SSR environments
  startApp();
}
