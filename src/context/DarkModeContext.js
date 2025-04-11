import React, { createContext, useState, useEffect, useContext } from 'react';

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  // Check if OS prefers dark mode
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Initialize state based on localStorage or OS preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    // Use stored preference if available, otherwise use OS preference
    return savedMode === 'enabled' || (savedMode === null && prefersDarkMode);
  });

  // Apply dark mode effect on initial load and when changed
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      // Also set a data attribute for potential CSS variable switching
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  // Listen for OS theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Only change the mode if the user hasn't explicitly chosen a preference
      if (localStorage.getItem('darkMode') === null) {
        setIsDarkMode(e.matches);
      }
    };
    
    // Add the listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }
    
    return () => {
      // Clean up
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      localStorage.setItem('darkMode', 'enabled');
      // Dispatch a custom event for components that need to react to dark mode changes
      const event = new CustomEvent('darkModeToggle', { detail: { enabled: true }});
      window.dispatchEvent(event);
    } else {
      localStorage.setItem('darkMode', 'disabled');
      // Dispatch a custom event for components that need to react to dark mode changes
      const event = new CustomEvent('darkModeToggle', { detail: { enabled: false }});
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