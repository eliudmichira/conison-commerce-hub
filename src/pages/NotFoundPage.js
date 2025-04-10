import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen flex items-center justify-center py-24 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
    >
      <div className="text-center max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold text-conison-magenta mb-4">404</h1>
          <h2 className={`text-3xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Page Not Found
          </h2>
          <p className={`text-lg mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={() => navigate(-1)}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          
          <Link 
            to="/" 
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              isDarkMode 
                ? 'bg-conison-magenta text-white hover:bg-conison-magenta-dark' 
                : 'bg-conison-magenta text-white hover:bg-conison-magenta-dark'
            }`}
          >
            <Home className="w-5 h-5" />
            Return to Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFoundPage; 