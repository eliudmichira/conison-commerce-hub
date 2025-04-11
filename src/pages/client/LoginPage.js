import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa';
import InputField from '../../components/auth/InputField';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const { isDarkMode } = useDarkMode();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check for redirect path from location state
  const redirectPath = location.state?.from?.pathname || '/client';

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError('');
    
    // Disable the button for at least 500ms to prevent double-clicking
    const startTime = Date.now();
    
    try {
      if (auth?.login) {
        // Login with Firebase Auth
        await auth.login(email, password, rememberMe);
        navigate(redirectPath);
      } else {
        // Fallback for when auth context is not available
        console.warn('Auth context not available, using localStorage fallback');
        if (email === 'admin@conison.com' && password === 'admin123') {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', 'admin');
          navigate('/admin');
        } else if (email === 'client@conison.com' && password === 'client123') {
          localStorage.setItem('isAuthenticated', 'true');
          localStorage.setItem('userRole', 'client');
          navigate('/client');
        } else {
          setLoginError('Invalid email or password');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      setLoginError(err.message || 'An error occurred during login');
    } finally {
      // Ensure the button is disabled for at least 500ms for better UX
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < 500) {
        setTimeout(() => {
          setIsSubmitting(false);
        }, 500 - elapsedTime);
      } else {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-gray-50 to-white'
    } px-4 py-16 sm:py-24`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-md w-full ${
          isDarkMode 
            ? 'bg-gray-900 border border-gray-800' 
            : 'bg-white border border-gray-100'
        } rounded-2xl shadow-lg overflow-hidden`}
      >
        <div className="px-8 py-10">
          <div className="text-center mb-8">
            <img 
              src="/conison_transparent_upscaled.png" 
              alt="Conison" 
              className="h-12 mx-auto mb-6" 
            />
            <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-2`}>
              Welcome Back
            </h1>
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mt-2 text-sm`}>
              Log in to access your dashboard
            </p>
          </div>
          
          {/* Display error message */}
          {loginError && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`mb-6 p-4 rounded-lg text-sm font-medium flex items-center ${
                isDarkMode 
                  ? 'bg-red-900/20 text-red-300 border border-red-800/50' 
                  : 'bg-red-50 text-red-700 border border-red-100'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {loginError}
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <div className="space-y-1">
              <label htmlFor="email" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <FaEnvelope className={`h-3.5 w-3.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  </div>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-12 pr-4 py-3.5 rounded-xl border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-conison-magenta' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-conison-magenta'
                  } focus:outline-none focus:ring-2 focus:ring-conison-magenta focus:ring-opacity-50 transition-colors duration-200 shadow-sm`}
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            
            {/* Password input */}
            <div className="space-y-1">
              <label htmlFor="password" className={`block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} mb-1`}>
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <div className={`flex items-center justify-center w-6 h-6 rounded-full ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}>
                    <FaLock className={`h-3.5 w-3.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  </div>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-12 pr-12 py-3.5 rounded-xl border ${
                    isDarkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-conison-magenta' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-conison-magenta'
                  } focus:outline-none focus:ring-2 focus:ring-conison-magenta focus:ring-opacity-50 transition-colors duration-200 shadow-sm`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute inset-y-0 right-0 pr-4 flex items-center ${
                    isDarkMode ? 'text-conison-magenta hover:text-conison-magenta-hover' : 'text-conison-magenta hover:text-conison-magenta-hover'
                  } transition-colors duration-200`}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 576 512" 
                      className="h-4 w-4 fill-current"
                    >
                      <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                      <path d="M288 256a48 48 0 1 1 48-48 48 48 0 0 1-48 48zm0-64a16 16 0 1 0 16 16 16 16 0 0 0-16-16z" opacity="0.4"/>
                    </svg>
                  ) : (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 576 512" 
                      className="h-4 w-4 fill-current"
                    >
                      <path d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            {/* Remember me checkbox and forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={`h-4 w-4 ${
                    isDarkMode 
                      ? 'bg-gray-700 border-gray-600 text-conison-magenta focus:ring-conison-magenta/50' 
                      : 'bg-white border-gray-300 text-conison-magenta focus:ring-conison-magenta/50'
                  } rounded transition-colors duration-200`}
                />
                <label htmlFor="remember-me" className={`ml-2 block text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Remember me
                </label>
              </div>
              
              <Link 
                to="/forgot-password" 
                className={`text-sm font-medium text-conison-magenta hover:text-conison-magenta-dark transition-colors duration-200`}
              >
                Forgot password?
              </Link>
            </div>
            
            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-white text-base font-medium bg-gradient-to-r from-conison-cyan to-conison-magenta hover:from-conison-cyan-hover hover:to-conison-magenta-hover shadow-md hover:shadow-lg transition-all duration-200 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <LoadingSpinner size="sm" className="mr-2" />
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Sign in
                    <FaArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                )}
              </button>
            </div>
          </form>
          
          {/* Sign up link */}
          <div className="mt-8 text-center">
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Don't have an account?{" "}
              <Link
                to="/register"
                className={`font-medium text-conison-magenta hover:text-conison-magenta-dark transition-colors duration-200`}
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage; 