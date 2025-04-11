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
    appearance-none relative block w-full pl-12 pr-3 py-3.5 border
    ${errors[fieldName] 
      ? 'border-error focus:border-error focus:ring-error/30' 
      : isDarkMode 
        ? 'border-dark-border focus:border-primary-purple' 
        : 'border-light-border focus:border-primary-blue'
    }
    ${isDarkMode 
      ? 'bg-dark-secondary text-dark-text-primary' 
      : 'bg-white text-text-primary'
    }
    placeholder-text-tertiary dark:placeholder-dark-text-tertiary
    rounded-lg
    focus:outline-none focus:ring-2 focus:ring-opacity-50
    transition-all duration-200
    text-base
  `;

  // Enhanced animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-center py-12 px-6 sm:px-6 lg:px-8 ${
      isDarkMode ? 'bg-dark-primary' : 'bg-light'
    }`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`max-w-md w-full mx-auto space-y-8 ${
          isDarkMode 
            ? 'bg-dark-secondary border border-dark-border' 
            : 'bg-white border border-light-border'
        } p-8 rounded-xl shadow-lg`}
      >
        <motion.div variants={itemVariants} className="text-center">
          <h1 className={`text-3xl font-bold ${
            isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'
          }`}>
            Welcome Back
          </h1>
          <p className={`mt-3 text-base ${
            isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
          }`}>
            Sign in to access your account
          </p>
        </motion.div>

        {generalError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg text-sm font-medium ${
              isDarkMode 
                ? 'bg-error/10 text-error border border-error/20' 
                : 'bg-error/10 text-error border border-error/20'
            }`}
          >
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {generalError}
            </div>
          </motion.div>
        )}

        <motion.form 
          variants={itemVariants}
          className="mt-8 space-y-6" 
          onSubmit={handleSubmit} 
          noValidate
        >
          <div className="space-y-5">
            <div className="space-y-1">
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
                }`}
              >
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className={`h-5 w-5 ${
                    isDarkMode ? 'text-dark-text-tertiary' : 'text-text-tertiary'
                  }`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClassName('email')}
                  placeholder="name@example.com"
                  aria-label="Email address"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  id="email-error" 
                  className="text-error text-sm mt-1 ml-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>
            
            <div className="space-y-1">
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
                }`}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className={`h-5 w-5 ${
                    isDarkMode ? 'text-dark-text-tertiary' : 'text-text-tertiary'
                  }`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClassName('password')} pr-12`}
                  placeholder="••••••••"
                  aria-label="Password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center rounded-r-lg transition-colors ${
                    isDarkMode 
                      ? 'hover:text-primary-purple text-dark-text-tertiary' 
                      : 'hover:text-primary-blue text-text-tertiary'
                  }`}
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <div className="p-1 hover:bg-opacity-10 hover:bg-black rounded-full">
                    {showPassword ? (
                      <FaEyeSlash className="h-5 w-5" />
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )}
                  </div>
                </button>
              </div>
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  id="password-error" 
                  className="text-error text-sm mt-1 ml-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className={`h-4 w-4 rounded border-gray-300 text-primary-blue focus:ring-primary-blue ${
                  isDarkMode ? 'bg-dark-tertiary border-dark-border' : ''
                }`}
              />
              <label 
                htmlFor="remember-me" 
                className={`ml-2 block text-sm ${
                  isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
                }`}
              >
                Remember me
              </label>
            </div>
            <Link 
              to="/forgot-password"
              className={`text-sm font-medium ${
                isDarkMode 
                  ? 'text-primary-purple hover:text-primary-teal' 
                  : 'text-primary-blue hover:text-primary-purple'
              } focus:outline-none focus:underline transition-colors`}
            >
              Forgot password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`group relative w-full flex justify-center py-3 px-4 text-base font-medium rounded-lg text-white 
                ${isDarkMode 
                  ? 'bg-primary-purple hover:bg-primary-purple/90' 
                  : 'bg-primary-blue hover:bg-primary-blue/90'
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDarkMode ? 'focus:ring-primary-purple' : 'focus:ring-primary-blue'
                }
                transition-colors duration-200 ${
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
          
          <div className={`text-center mt-6 text-sm ${
            isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
          }`}>
            Don't have an account?{' '}
            <Link
              to="/register"
              className={`font-medium ${
                isDarkMode 
                  ? 'text-primary-purple hover:text-primary-teal' 
                  : 'text-primary-blue hover:text-primary-purple'
              } focus:outline-none focus:underline transition-colors`}
            >
              Sign up
            </Link>
          </div>
        </motion.form>

        <motion.div 
          variants={itemVariants}
          className="pt-5 mt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <div className={`text-center text-xs ${
            isDarkMode ? 'text-dark-text-tertiary' : 'text-text-tertiary'
          }`}>
            By signing in, you agree to our{' '}
            <Link to="/terms" className="underline hover:text-primary-blue dark:hover:text-primary-purple">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="underline hover:text-primary-blue dark:hover:text-primary-purple">
              Privacy Policy
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage; 