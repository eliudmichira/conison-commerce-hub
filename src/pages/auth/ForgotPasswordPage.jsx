import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const { resetPassword } = useAuth();
  const { isDarkMode } = useDarkMode();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage({ type: 'error', text: 'Please enter a valid email address' });
      return;
    }
    
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      await resetPassword(email);
      setMessage({ 
        type: 'success', 
        text: 'Password reset email sent! Check your inbox for further instructions.' 
      });
      setEmail('');
    } catch (error) {
      console.error('Password reset error:', error);
      
      // Handle specific Firebase Auth error codes
      switch (error.code) {
        case 'auth/user-not-found':
          setMessage({ 
            type: 'error', 
            text: 'No account found with this email. Please check your email or create a new account.' 
          });
          break;
        case 'auth/invalid-email':
          setMessage({ type: 'error', text: 'Invalid email format.' });
          break;
        case 'auth/too-many-requests':
          setMessage({ 
            type: 'error', 
            text: 'Too many requests. Please try again later.' 
          });
          break;
        default:
          setMessage({ 
            type: 'error', 
            text: 'Failed to send password reset email. Please try again.' 
          });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
      isDarkMode ? 'bg-conison.gray-900 text-white' : 'bg-conison.gray-50 text-gray-900'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-conison.gray-800' : 'bg-white'
        }`}
      >
        <div className="text-center">
          <h1 className={`text-3xl font-extrabold ${
            isDarkMode ? 'text-white' : 'text-conison.gray-900'
          }`}>
            Reset Password
          </h1>
          <p className={`mt-2 text-sm ${
            isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'
          }`}>
            Enter your email and we'll send you instructions to reset your password
          </p>
        </div>
        
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg text-sm font-medium ${
              message.type === 'error' 
                ? 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200' 
                : 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-200'
            }`}
          >
            {message.text}
          </motion.div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md space-y-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className={`h-5 w-5 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`} />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`appearance-none relative block w-full pl-10 pr-3 py-3 border rounded-lg
                  ${isDarkMode 
                    ? 'bg-gray-700 text-white border-gray-700 focus:border-conison-magenta' 
                    : 'bg-white text-gray-900 border-gray-300 focus:border-conison-magenta'
                  }
                  placeholder-gray-500 
                  focus:outline-none focus:ring-2 focus:ring-conison-magenta focus:z-10
                  transition-all duration-200
                  text-base
                `}
                placeholder="Email address"
                aria-label="Email address"
                required
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent 
                text-base font-medium rounded-lg text-white bg-conison-magenta 
                hover:bg-conison-magenta-dark focus:outline-none focus:ring-2 
                focus:ring-offset-2 focus:ring-conison-magenta transition-colors duration-200 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              aria-busy={isLoading}
            >
              {isLoading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : null}
              Send Reset Link
            </button>
          </div>
          
          <div className="flex items-center justify-center">
            <Link
              to="/login"
              className="flex items-center text-sm text-conison-magenta hover:text-conison-magenta-dark focus:outline-none focus:underline transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Login
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage; 