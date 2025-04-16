import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';
import { motion } from 'framer-motion';
import { saveUser } from '../../utils/userStorage';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { currentUser } = useAuth();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  if (currentUser) {
    return <Navigate to="/client" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setError('');
    setSuccess('');
    
    // Basic validation
    if (!email || !password || !confirmPassword || !name) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    setLoading(true);
    
    try {
      // Prepare user data
      const userData = {
        name,
        email,
        password, // In a real app, this would be hashed
        company: company || '',
        phone: phone || '',
      };
      
      // Save user to storage
      await saveUser(userData);
      
      setSuccess('Account created successfully! You can now login.');
      
      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
      
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15 
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center pt-24 pb-12 sm:px-6 lg:px-8 ${
      isDarkMode ? 'bg-dark-primary' : 'bg-light'
    }`}>
          <motion.div 
        className="sm:mx-auto sm:w-full sm:max-w-md"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
        <Link to="/">
          <div className="flex items-center justify-center">
            <span className={`text-3xl font-bold text-center ${
              isDarkMode ? 'text-indigo-400' : 'text-blue-600'
            }`}>Conison</span>
            <span className={`ml-2 text-3xl font-bold text-center ${
              isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'
            }`}>Technologies</span>
          </div>
        </Link>

        <h2 className={`mt-6 text-center text-3xl font-bold ${
          isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'
        }`}>
          Create your account
        </h2>
        <p className={`mt-2 text-center text-sm ${
          isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
        }`}>
          Already have an account?{' '}
          <Link to="/login" className={`font-medium ${
            isDarkMode 
              ? 'text-indigo-400 hover:text-indigo-300' 
              : 'text-blue-600 hover:text-blue-700'
          }`}>
            Sign in
          </Link>
        </p>
      </motion.div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div 
          className={`py-8 px-4 shadow sm:rounded-lg sm:px-10 ${
            isDarkMode 
              ? 'bg-dark-secondary border border-dark-border' 
              : 'bg-white border border-light-border'
          }`}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 p-4 rounded-lg flex items-center text-sm font-medium ${
                isDarkMode 
                  ? 'bg-error/10 text-error border border-error/20' 
                  : 'bg-error/10 text-error border border-error/20'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </motion.div>
          )}
          
          {success && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-4 p-4 rounded-lg flex items-center text-sm font-medium ${
                isDarkMode 
                  ? 'bg-success/10 text-success border border-success/20' 
                  : 'bg-success/10 text-success border border-success/20'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              {success}
            </motion.div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className={`block text-sm font-medium ${
                isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
              }`}>
                Full Name <span className="text-error">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-text-tertiary focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-dark-secondary border-dark-border text-dark-text-primary focus:border-indigo-500 focus:ring-indigo-500/20' 
                      : 'bg-white border-light-border text-text-primary focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="John Doe"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="email" className={`block text-sm font-medium ${
                isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
              }`}>
                Email address <span className="text-error">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-text-tertiary focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-dark-secondary border-dark-border text-dark-text-primary focus:border-indigo-500 focus:ring-indigo-500/20' 
                      : 'bg-white border-light-border text-text-primary focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label htmlFor="company" className={`block text-sm font-medium ${
                isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
              }`}>
                Company Name
              </label>
              <div className="mt-1">
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-text-tertiary focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-dark-secondary border-dark-border text-dark-text-primary focus:border-indigo-500 focus:ring-indigo-500/20' 
                      : 'bg-white border-light-border text-text-primary focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="Your Company Ltd."
                />
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label htmlFor="phone" className={`block text-sm font-medium ${
                isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
              }`}>
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-text-tertiary focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-dark-secondary border-dark-border text-dark-text-primary focus:border-indigo-500 focus:ring-indigo-500/20' 
                      : 'bg-white border-light-border text-text-primary focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className={`block text-sm font-medium ${
                  isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
                }`}>
                  Password <span className="text-error">*</span>
              </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`text-xs ${
                    isDarkMode 
                      ? 'text-indigo-400 hover:text-indigo-300' 
                      : 'text-blue-600 hover:text-blue-700'
                  } flex items-center gap-1`}
                >
                  {showPassword ? (
                    <>
                      <FaEyeSlash className="h-4 w-4" />
                      Hide
                    </>
                  ) : (
                    <>
                      <FaEye className="h-4 w-4" />
                      Show
                    </>
                  )}
                </button>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-text-tertiary focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-dark-secondary border-dark-border text-dark-text-primary focus:border-indigo-500 focus:ring-indigo-500/20' 
                      : 'bg-white border-light-border text-text-primary focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="confirm-password" className={`block text-sm font-medium ${
                isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
              }`}>
                Confirm Password <span className="text-error">*</span>
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-text-tertiary focus:outline-none focus:ring-2 ${
                    isDarkMode 
                      ? 'bg-dark-secondary border-dark-border text-dark-text-primary focus:border-indigo-500 focus:ring-indigo-500/20' 
                      : 'bg-white border-light-border text-text-primary focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                  placeholder="••••••••"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-lg shadow-md text-base font-semibold text-white ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 hover:from-indigo-600 hover:via-purple-600 hover:to-purple-700 active:from-indigo-700 active:via-purple-700 active:to-purple-800' 
                    : 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 active:from-blue-700 active:via-blue-800 active:to-indigo-800'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDarkMode ? 'focus:ring-purple-400' : 'focus:ring-blue-400'
                } transition-all duration-200 hover:shadow-lg drop-shadow-sm ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </motion.div>
          </form>

          <motion.div 
            variants={itemVariants}
            className="mt-6 pt-5 border-t border-gray-200 dark:border-gray-700"
          >
            <div className={`text-center text-xs ${
              isDarkMode ? 'text-dark-text-tertiary' : 'text-text-tertiary'
            }`}>
              By creating an account, you agree to our{' '}
              <Link to="/terms-of-service" className={`underline ${
                isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-blue-600 hover:text-blue-700'
              }`}>
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className={`underline ${
                isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-blue-600 hover:text-blue-700'
              }`}>
                Privacy Policy
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage; 