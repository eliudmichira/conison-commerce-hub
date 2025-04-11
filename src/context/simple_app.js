import React, { useState } from 'react';
import { useDarkMode } from './DarkModeContext';

const SimpleApp = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [count, setCount] = useState(0);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <h1 className="text-3xl font-bold mb-4">Simple Test App</h1>
      
      <div className="mb-8">
        <p className="text-center mb-4">Current count: <span className="font-bold">{count}</span></p>
        
        <div className="flex space-x-4">
          <button 
            onClick={() => setCount(count - 1)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Decrease
          </button>
          
          <button 
            onClick={() => setCount(0)}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Reset
          </button>
          
          <button 
            onClick={() => setCount(count + 1)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Increase
          </button>
        </div>
      </div>
      
      <div className="mt-4">
        <button 
          onClick={toggleDarkMode}
          className={`px-4 py-2 rounded transition ${
            isDarkMode 
              ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-300' 
              : 'bg-gray-800 text-white hover:bg-gray-700'
          }`}
        >
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </div>
      
      <div className="mt-12 p-6 max-w-md rounded-lg shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">About This Component</h2>
        <p className="text-gray-700 dark:text-gray-300">
          This is a simple test component to verify that React, TailwindCSS, and the dark mode context are all working correctly.
          It demonstrates state management with useState and context usage with the DarkModeContext.
        </p>
      </div>
    </div>
  );
};

export default SimpleApp; 