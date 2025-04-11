import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode } from '../../context/DarkModeContext';

const AuthLayout = ({ children, title, subtitleLink }) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-conison-magenta/10 to-conison-magenta/5 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
      >
        <div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
          >
            {title}
          </motion.h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            {subtitleLink}
          </p>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export default AuthLayout; 