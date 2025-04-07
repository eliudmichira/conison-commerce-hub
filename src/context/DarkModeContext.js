import React, { createContext, useState, useEffect, useContext } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved user preference
    const darkMode = localStorage.getItem('darkMode');
    if (darkMode === 'enabled') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'disabled');
      setIsDarkMode(false);
      
      // Dispatch a custom event for components that need to react to dark mode changes
      const event = new CustomEvent('darkModeToggle', { detail: { enabled: false }});
      window.dispatchEvent(event);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'enabled');
      setIsDarkMode(true);
      
      // Dispatch a custom event for components that need to react to dark mode changes
      const event = new CustomEvent('darkModeToggle', { detail: { enabled: true }});
      window.dispatchEvent(event);
    }
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);

export default DarkModeContext; 