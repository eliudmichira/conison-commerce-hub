import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import { useDarkMode } from '../../context/DarkModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useDarkMode();
  const emailInputRef = useRef(null);
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Password validation states
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  // Check for redirect path from location state
  const redirectPath = location.state?.from?.pathname || '/client';
  
  // Auto-focus the email input on page load
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  // Clear errors when inputs change
  useEffect(() => {
    if (email || password) {
      setLoginError('');
      auth?.clearError?.();
    }
  }, [email, password, auth]);

  // Handle auth errors
  useEffect(() => {
    if (auth?.error) {
      setLoginError(auth.error);
    }
  }, [auth?.error]);
  
  // Validate email
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (value) {
      setEmailValid(validateEmail(value));
    } else {
      setEmailValid(true); // Don't show error when field is empty
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email before submission
    if (!validateEmail(email)) {
      setEmailValid(false);
      return;
    }
    
    setIsSubmitting(true);
    setLoginError('');
    
    // Disable the button for at least 800ms to prevent double-clicking
    const startTime = Date.now();
    
    try {
      if (auth?.login) {
        // Login with Firebase Auth
        await auth.login(email, password, rememberMe);
        setShowSuccessMessage(true);
        
        // Delayed redirect for better UX
        setTimeout(() => {
          navigate(redirectPath);
        }, 1000);
      } else {
        // Fallback for when auth context is not available
        console.warn('Auth context not available, using localStorage fallback');
        if (email === 'admin@conison.com' && password === 'admin123') {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', 'admin');
          setShowSuccessMessage(true);
          setTimeout(() => {
            navigate('/admin');
          }, 1000);
        } else if (email === 'client@conison.com' && password === 'client123') {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', 'client');
          setShowSuccessMessage(true);
          setTimeout(() => {
            navigate('/client');
          }, 1000);
        } else {
          setLoginError('Invalid email or password');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError(err.message || 'An error occurred during login');
      
      // Provide more user-friendly error messages
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setLoginError('Invalid email or password. Please try again.');
      } else if (err.code === 'auth/too-many-requests') {
        setLoginError('Too many failed login attempts. Please try again later or reset your password.');
      } else if (err.code === 'auth/network-request-failed') {
        setLoginError('Network error. Please check your internet connection and try again.');
      }
    } finally {
      // Ensure the button is disabled for at least 800ms for better UX
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 800) {
        setTimeout(() => {
          setIsSubmitting(false);
        }, 800 - elapsedTime);
      } else {
        setIsSubmitting(false);
      }
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.12 
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
  
  const errorVariants = {
    hidden: { opacity: 0, y: -10, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: [0, 0.55, 0.45, 1] }
    }
  };

  // Theme-based colors
  const themeColors = {
    background: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
    card: isDarkMode ? 'bg-gray-800' : 'bg-white',
    cardBorder: isDarkMode ? 'border-gray-700' : 'border-gray-200',
    inputBg: isDarkMode ? 'bg-gray-700' : 'bg-gray-50',
    inputBorder: isDarkMode ? 'border-gray-600' : 'border-gray-300',
    inputBorderFocus: isDarkMode ? 'focus:border-accent' : 'focus:border-primary',
    inputRing: isDarkMode ? 'focus:ring-accent/20' : 'focus:ring-primary/20',
    primaryText: isDarkMode ? 'text-white' : 'text-gray-900',
    secondaryText: isDarkMode ? 'text-gray-300' : 'text-gray-600',
    tertiaryText: isDarkMode ? 'text-gray-400' : 'text-gray-500',
    primaryButton: isDarkMode 
      ? 'bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 hover:from-indigo-600 hover:via-purple-600 hover:to-purple-700 active:from-indigo-700 active:via-purple-700 active:to-purple-800' 
      : 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:via-blue-700 hover:to-indigo-700 active:from-blue-700 active:via-blue-800 active:to-indigo-800',
    primaryButtonText: 'text-white font-semibold drop-shadow-sm',
    secondaryButton: isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300',
    secondaryButtonText: isDarkMode ? 'text-white' : 'text-gray-800',
    focusRing: isDarkMode ? 'focus:ring-purple-400' : 'focus:ring-blue-400',
    link: isDarkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-blue-600 hover:text-blue-700',
    error: isDarkMode ? 'bg-red-900/30 text-red-300 border-red-800' : 'bg-red-50 text-red-600 border-red-100',
    success: isDarkMode ? 'bg-green-900/30 text-green-300 border-green-800' : 'bg-green-50 text-green-600 border-green-100',
    checkbox: isDarkMode ? 'text-purple-500 bg-gray-700 border-gray-600' : 'text-blue-600 bg-gray-100 border-gray-300',
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 ${themeColors.background}`}>
      {/* Company logo or branding */}
      <div className="mb-8">
        <img 
          src="/logo.svg" 
          alt="Conison Technologies" 
          className="h-12 w-auto mx-auto" 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/120x40?text=Conison+Tech';
          }}
        />
      </div>
      
      <motion.div 
        className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-xl border ${themeColors.card} ${themeColors.cardBorder}`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {showSuccessMessage ? (
          <motion.div 
            variants={successVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center py-6"
          >
            <div className={`w-16 h-16 rounded-full ${themeColors.success} flex items-center justify-center mb-4`}>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className={`text-2xl font-bold mb-2 ${themeColors.primaryText}`}>Login Successful!</h2>
            <p className={`${themeColors.secondaryText} text-center`}>
              Redirecting you to your dashboard...
            </p>
            <LoadingSpinner size="md" className="mt-4" />
          </motion.div>
        ) : (
          <>
            <motion.div variants={itemVariants} className="text-center">
              <h1 className={`text-3xl font-bold mb-2 ${themeColors.primaryText}`}>
                Welcome Back
              </h1>
              <p className={`mt-1 text-base ${themeColors.secondaryText}`}>
                Log in to access your dashboard
              </p>
            </motion.div>
            
            {/* Display error message */}
            <AnimatePresence>
              {loginError && (
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={errorVariants}
                  className={`p-4 rounded-lg flex items-center text-sm font-medium border ${themeColors.error}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {loginError}
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.form onSubmit={handleSubmit} className="space-y-6 mt-8" variants={itemVariants}>
              {/* Email input */}
              <div className="space-y-1">
                <label 
                  htmlFor="email" 
                  className={`block text-sm font-medium ${themeColors.secondaryText}`}
                >
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className={`h-5 w-5 ${themeColors.tertiaryText}`} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    ref={emailInputRef}
                    required
                    value={email}
                    onChange={handleEmailChange}
                    className={`appearance-none rounded-lg w-full px-3 py-3 pl-12 border ${
                      themeColors.inputBg} ${themeColors.inputBorder} ${!emailValid ? 'border-red-500 focus:ring-red-500/20' : themeColors.inputBorderFocus + ' ' + themeColors.inputRing
                    } ${themeColors.primaryText} placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors duration-200 text-base`}
                    placeholder="name@example.com"
                    aria-invalid={!emailValid}
                    aria-describedby={!emailValid ? "email-error" : undefined}
                  />
                  {!emailValid && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {!emailValid && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400" id="email-error">
                    Please enter a valid email address
                  </p>
                )}
              </div>
              
              {/* Password input */}
              <div className="space-y-1">
                <label 
                  htmlFor="password" 
                  className={`block text-sm font-medium ${themeColors.secondaryText}`}
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className={`h-5 w-5 ${themeColors.tertiaryText}`} />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    className={`appearance-none rounded-lg w-full px-3 py-3 pl-12 pr-10 border ${
                      themeColors.inputBg} ${themeColors.inputBorder} ${themeColors.inputBorderFocus} ${themeColors.inputRing
                    } ${themeColors.primaryText} placeholder-gray-400 focus:outline-none focus:ring-2 transition-colors duration-200 text-base`}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className={`h-5 w-5 ${themeColors.tertiaryText} hover:${themeColors.secondaryText}`} />
                    ) : (
                      <FaEye className={`h-5 w-5 ${themeColors.tertiaryText} hover:${themeColors.secondaryText}`} />
                    )}
                  </button>
                </div>
                
                {/* Password requirements hint */}
                <AnimatePresence>
                  {passwordFocused && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className={`mt-1 text-xs ${themeColors.tertiaryText}`}>
                        Use 8+ characters with a mix of letters, numbers & symbols
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Remember me checkbox */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className={`h-4 w-4 rounded border ${themeColors.checkbox} focus:ring-2 ${themeColors.focusRing} focus:ring-offset-2`}
                  />
                  <label 
                    htmlFor="remember-me" 
                    className={`ml-2 block text-sm ${themeColors.secondaryText}`}
                  >
                    Remember me
                  </label>
                </div>
                <Link 
                  to="/forgot-password" 
                  className={`text-sm font-medium ${themeColors.link} focus:outline-none focus:underline transition-colors`}
                >
                  Forgot password?
                </Link>
              </div>
              
              {/* Submit button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group relative w-full flex justify-center py-3.5 px-4 text-base font-semibold rounded-lg ${themeColors.primaryButton} ${themeColors.primaryButtonText}
                    focus:outline-none focus:ring-2 focus:ring-offset-2 ${themeColors.focusRing} 
                    transition-all duration-200 shadow-md hover:shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <LoadingSpinner size="sm" className="mr-2" />
                      Signing in...
                    </span>
                  ) : 'Sign in'}
                </button>
              </div>
            </motion.form>
            
            {/* Sign up link */}
            <motion.div variants={itemVariants} className="text-center mt-6">
              <p className={`text-sm ${themeColors.secondaryText}`}>
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className={`font-medium ${themeColors.link} focus:outline-none focus:underline transition-colors`}
                >
                  Sign up for free
                </Link>
              </p>
            </motion.div>
          </>
        )}
      </motion.div>
      
      {/* Footer links */}
      <div className="mt-8 text-center">
        <div className={`text-xs ${themeColors.tertiaryText} space-x-4`}>
          <Link to="/terms" className={`hover:underline ${themeColors.link}`}>Terms of Service</Link>
          <Link to="/privacy" className={`hover:underline ${themeColors.link}`}>Privacy Policy</Link>
          <Link to="/help" className={`hover:underline ${themeColors.link}`}>Help Center</Link>
        </div>
        <div className={`mt-2 text-xs ${themeColors.tertiaryText}`}>
          © {new Date().getFullYear()} Conison Technologies. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default LoginPage;