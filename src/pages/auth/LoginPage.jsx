import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { isDarkMode } = useDarkMode();
  
  // Get the redirect path from location state or default to '/client'
  const from = location.state?.from?.pathname || '/client';

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear general error when user makes any changes
    if (generalError) {
      setGeneralError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      
      // Handle specific Firebase Auth error codes
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setGeneralError('Invalid email or password');
          break;
        case 'auth/too-many-requests':
          setGeneralError('Too many failed login attempts. Please try again later or reset your password.');
          break;
        case 'auth/network-request-failed':
          setGeneralError('Network error. Please check your connection and try again.');
          break;
        case 'auth/invalid-email':
          setGeneralError('Invalid email format.');
          break;
        case 'auth/user-disabled':
          setGeneralError('This account has been disabled. Please contact support.');
          break;
        default:
          setGeneralError('Failed to sign in. Please check your credentials and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputClassName = (fieldName) => `
    appearance-none relative block w-full pl-10 pr-3 py-3 border rounded-lg
    ${errors[fieldName] ? 'border-red-500' : isDarkMode ? 'border-gray-700 focus:border-conison-magenta' : 'border-gray-300 focus:border-conison-magenta'}
    ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}
    placeholder-gray-500 
    focus:outline-none focus:ring-2 focus:ring-conison-magenta focus:z-10
    transition-all duration-200
    text-base
  `;

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-conison.gray-900 text-white' : 'bg-conison.gray-50 text-gray-900'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-conison-magenta ${
          isDarkMode ? 'bg-conison.gray-800' : 'bg-white'
        }`}
      >
        <div className="text-center">
          <h1 className={`text-3xl font-extrabold ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
            Welcome Back
          </h1>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}>
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-medium text-conison-magenta hover:text-conison-magenta-dark focus:outline-none focus:underline transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>

        {generalError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-200 p-4 rounded-lg text-sm font-medium"
          >
            {generalError}
          </motion.div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md space-y-4">
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClassName('email')}
                  placeholder="Email address"
                  aria-label="Email address"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-500 text-xs mt-1 ml-1">
                  {errors.email}
                </p>
              )}
            </div>
            
            <div className="space-y-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClassName('password')} pr-10`}
                  placeholder="Password"
                  aria-label="Password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} hover:text-gray-700 dark:hover:text-gray-300`} />
                  ) : (
                    <FaEye className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} hover:text-gray-700 dark:hover:text-gray-300`} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-500 text-xs mt-1 ml-1">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link 
              to="/forgot-password"
              className="text-sm text-conison-magenta hover:text-conison-magenta-dark focus:outline-none focus:underline transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-lg text-white bg-conison-magenta hover:bg-conison-magenta-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-conison-magenta transition-colors duration-200 ${
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
              Sign in
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage; 