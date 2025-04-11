// components/DarkModeToggle.js
import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const DarkModeToggle = ({ isScrolled }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`p-2 rounded-full transition-colors focus:outline-none focus-outline ${
        isScrolled 
          ? 'text-conison-gray hover:text-conison-cyan dark:text-conison-white dark:hover:text-conison-yellow' 
          : 'text-conison-white hover:text-conison-yellow dark:text-conison-yellow dark:hover:text-conison-white'
      }`}
    >
      {isDarkMode ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343
            6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4
            4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill={isScrolled ? "#4a5568" : "#fff"}
          stroke={isScrolled ? "#2d3748" : "#fff"}
          style={{ filter: isScrolled ? "drop-shadow(0 0 1px rgba(0,0,0,0.5))" : "none" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003
            9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

export default DarkModeToggle;