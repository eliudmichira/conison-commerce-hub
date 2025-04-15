import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaEnvelope, FaBuilding, FaPhone, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    company: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { isDarkMode } = useDarkMode();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) 
      newErrors.confirmPassword = 'Passwords do not match';
    
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.company) newErrors.company = 'Company name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
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
    if (!validateForm()) return;
    
    setIsLoading(true);
    setGeneralError('');
    
    try {
      await signup(
        formData.email, 
        formData.password, 
        formData.name, 
        formData.company, 
        formData.phone
      );
      navigate('/login', { state: { message: 'Account created successfully! You can now log in.' } });
    } catch (err) {
      console.error('Registration error:', err);
      
      // Handle specific Firebase Auth error codes
      switch (err.code) {
        case 'auth/email-already-in-use':
          setGeneralError('This email is already registered. Please use a different email or log in.');
          break;
        case 'auth/invalid-email':
          setGeneralError('Invalid email format.');
          break;
        case 'auth/weak-password':
          setGeneralError('Password is too weak. Please use a stronger password.');
          break;
        case 'auth/network-request-failed':
          setGeneralError('Network error. Please check your connection and try again.');
          break;
        default:
          setGeneralError(err.message || 'Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={`max-w-md w-full mx-auto space-y-8 ${
          isDarkMode 
            ? 'bg-gray-800 border border-gray-700' 
            : 'bg-white border border-gray-200'
        } p-8 rounded-xl shadow-lg`}
      >
        <motion.div variants={itemVariants} className="text-center">
          <h1 className={`text-3xl font-bold ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Create Account
          </h1>
          <p className={`mt-3 text-base ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Join our platform to access exclusive features
          </p>
        </motion.div>

        {generalError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg text-sm font-medium ${
              isDarkMode 
                ? 'bg-red-900/30 text-red-300 border border-red-800' 
                : 'bg-red-50 text-red-600 border border-red-100'
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
            {/* Full Name Field */}
            <div className="space-y-1">
              <label 
                htmlFor="name" 
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className={`h-5 w-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`appearance-none rounded-lg w-full px-3 py-3 pl-12 border ${
                    errors.name 
                      ? isDarkMode ? 'border-red-500 focus:border-red-500' : 'border-red-500 focus:border-red-500' 
                      : isDarkMode 
                        ? 'border-gray-600 focus:border-indigo-500' 
                        : 'border-gray-300 focus:border-blue-500'
                  } ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-50 text-gray-900'
                  } placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.name
                      ? 'focus:ring-red-500/20'
                      : isDarkMode ? 'focus:ring-indigo-500/20' : 'focus:ring-blue-500/20'
                  } transition-colors duration-200 text-base`}
                  placeholder="John Doe"
                  aria-label="Full Name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </div>
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  id="name-error" 
                  className="text-red-600 dark:text-red-400 text-sm mt-1 ml-1"
                >
                  {errors.name}
                </motion.p>
              )}
            </div>

            {/* Company Name Field */}
            <div className="space-y-1">
              <label 
                htmlFor="company" 
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Company Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaBuilding className={`h-5 w-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleChange}
                  className={`appearance-none rounded-lg w-full px-3 py-3 pl-12 border ${
                    errors.company 
                      ? isDarkMode ? 'border-red-500 focus:border-red-500' : 'border-red-500 focus:border-red-500' 
                      : isDarkMode 
                        ? 'border-gray-600 focus:border-indigo-500' 
                        : 'border-gray-300 focus:border-blue-500'
                  } ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-50 text-gray-900'
                  } placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.company
                      ? 'focus:ring-red-500/20'
                      : isDarkMode ? 'focus:ring-indigo-500/20' : 'focus:ring-blue-500/20'
                  } transition-colors duration-200 text-base`}
                  placeholder="Company Inc."
                  aria-label="Company Name"
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? "company-error" : undefined}
                />
              </div>
              {errors.company && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  id="company-error" 
                  className="text-red-600 dark:text-red-400 text-sm mt-1 ml-1"
                >
                  {errors.company}
                </motion.p>
              )}
            </div>

            {/* Phone Number Field */}
            <div className="space-y-1">
              <label 
                htmlFor="phone" 
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className={`h-5 w-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`appearance-none rounded-lg w-full px-3 py-3 pl-12 border ${
                    errors.phone 
                      ? isDarkMode ? 'border-red-500 focus:border-red-500' : 'border-red-500 focus:border-red-500' 
                      : isDarkMode 
                        ? 'border-gray-600 focus:border-indigo-500' 
                        : 'border-gray-300 focus:border-blue-500'
                  } ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-50 text-gray-900'
                  } placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.phone
                      ? 'focus:ring-red-500/20'
                      : isDarkMode ? 'focus:ring-indigo-500/20' : 'focus:ring-blue-500/20'
                  } transition-colors duration-200 text-base`}
                  placeholder="+1 (555) 123-4567"
                  aria-label="Phone Number"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
              </div>
              {errors.phone && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  id="phone-error" 
                  className="text-red-600 dark:text-red-400 text-sm mt-1 ml-1"
                >
                  {errors.phone}
                </motion.p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1">
              <label 
                htmlFor="email" 
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Email Address
              </label>
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
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none rounded-lg w-full px-3 py-3 pl-12 border ${
                    errors.email 
                      ? isDarkMode ? 'border-red-500 focus:border-red-500' : 'border-red-500 focus:border-red-500' 
                      : isDarkMode 
                        ? 'border-gray-600 focus:border-indigo-500' 
                        : 'border-gray-300 focus:border-blue-500'
                  } ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-50 text-gray-900'
                  } placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.email
                      ? 'focus:ring-red-500/20'
                      : isDarkMode ? 'focus:ring-indigo-500/20' : 'focus:ring-blue-500/20'
                  } transition-colors duration-200 text-base`}
                  placeholder="name@example.com"
                  aria-label="Email Address"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
              </div>
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  id="email-error" 
                  className="text-red-600 dark:text-red-400 text-sm mt-1 ml-1"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label 
                htmlFor="password" 
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className={`h-5 w-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none rounded-lg w-full px-3 py-3 pl-12 pr-10 border ${
                    errors.password 
                      ? isDarkMode ? 'border-red-500 focus:border-red-500' : 'border-red-500 focus:border-red-500' 
                      : isDarkMode 
                        ? 'border-gray-600 focus:border-indigo-500' 
                        : 'border-gray-300 focus:border-blue-500'
                  } ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-50 text-gray-900'
                  } placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.password
                      ? 'focus:ring-red-500/20'
                      : isDarkMode ? 'focus:ring-indigo-500/20' : 'focus:ring-blue-500/20'
                  } transition-colors duration-200 text-base`}
                  placeholder="••••••••"
                  aria-label="Password"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className={`h-5 w-5 ${
                      isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
                    } transition-colors`} />
                  ) : (
                    <FaEye className={`h-5 w-5 ${
                      isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-600'
                    } transition-colors`} />
                  )}
                </button>
              </div>
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  id="password-error" 
                  className="text-red-600 dark:text-red-400 text-sm mt-1 ml-1"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1">
              <label 
                htmlFor="confirmPassword" 
                className={`block text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className={`h-5 w-5 ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`appearance-none rounded-lg w-full px-3 py-3 pl-12 border ${
                    errors.confirmPassword 
                      ? isDarkMode ? 'border-red-500 focus:border-red-500' : 'border-red-500 focus:border-red-500' 
                      : isDarkMode 
                        ? 'border-gray-600 focus:border-indigo-500' 
                        : 'border-gray-300 focus:border-blue-500'
                  } ${
                    isDarkMode 
                      ? 'bg-gray-700 text-white' 
                      : 'bg-gray-50 text-gray-900'
                  } placeholder-gray-400 focus:outline-none focus:ring-2 ${
                    errors.confirmPassword
                      ? 'focus:ring-red-500/20'
                      : isDarkMode ? 'focus:ring-indigo-500/20' : 'focus:ring-blue-500/20'
                  } transition-colors duration-200 text-base`}
                  placeholder="••••••••"
                  aria-label="Confirm Password"
                  aria-invalid={!!errors.confirmPassword}
                  aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                />
              </div>
              {errors.confirmPassword && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  id="confirm-password-error" 
                  className="text-red-600 dark:text-red-400 text-sm mt-1 ml-1"
                >
                  {errors.confirmPassword}
                </motion.p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 flex justify-center items-center rounded-lg text-white font-semibold text-sm transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-indigo-500 hover:bg-indigo-600 focus:ring-indigo-500/30'
                  : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500/30'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : 'Create Account'}
            </button>
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <p className={`text-sm ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                className={`font-medium ${
                  isDarkMode 
                    ? 'text-indigo-400 hover:text-indigo-300' 
                    : 'text-blue-600 hover:text-blue-700'
                } focus:outline-none focus:underline transition-colors`}
              >
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;