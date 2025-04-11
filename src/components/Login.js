import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { motion } from 'framer-motion';

const Login = () => {
  const { isDarkMode } = useDarkMode();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check credentials
      if (email === 'admin@conison.com' && password === 'admin123') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'admin');
        navigate('/admin');
      } else if (email === 'client@conison.com' && password === 'client123') {
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', 'client');
        navigate('/client');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 ${
      isDarkMode ? 'bg-dark-primary' : 'bg-light'
    }`}>
      <motion.div 
        className={`max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-dark-secondary border border-dark-border' : 'bg-white border border-light-border'
        }`}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <h2 className={`mt-2 text-center text-3xl font-bold ${
            isDarkMode ? 'text-dark-text-primary' : 'text-text-primary'
          }`}>
            Sign in to your account
          </h2>
          <p className={`mt-3 text-center text-base ${
            isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'
          }`}>
            Access your Conison dashboard
          </p>
        </motion.div>

        <motion.form className="mt-8 space-y-6" onSubmit={handleSubmit} variants={itemVariants}>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg flex items-center text-sm font-medium ${
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
                  required
                  className={`appearance-none rounded-lg w-full px-3 py-3 pl-12 border ${
                    isDarkMode 
                      ? 'bg-dark-secondary border-dark-border text-dark-text-primary focus:border-primary-purple focus:ring-primary-purple/20' 
                      : 'bg-white border-light-border text-text-primary focus:border-primary-blue focus:ring-primary-blue/20'
                  } placeholder-text-tertiary dark:placeholder-dark-text-tertiary focus:outline-none focus:ring-2 transition-colors duration-200 text-base`}
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
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
                  required
                  className={`appearance-none rounded-lg w-full px-3 py-3 pl-12 pr-12 border ${
                    isDarkMode 
                      ? 'bg-dark-secondary border-dark-border text-dark-text-primary focus:border-primary-purple focus:ring-primary-purple/20' 
                      : 'bg-white border-light-border text-text-primary focus:border-primary-blue focus:ring-primary-blue/20'
                  } placeholder-text-tertiary dark:placeholder-dark-text-tertiary focus:outline-none focus:ring-2 transition-colors duration-200 text-base`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={`absolute inset-y-0 right-0 pr-3 flex items-center transition-colors ${
                    isDarkMode 
                      ? 'hover:text-primary-purple text-dark-text-tertiary' 
                      : 'hover:text-primary-blue text-text-tertiary'
                  }`}
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
            <div>
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
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-3 px-4 text-base font-medium rounded-lg text-white
                ${isDarkMode 
                  ? 'bg-primary-purple hover:bg-primary-purple/90' 
                  : 'bg-primary-blue hover:bg-primary-blue/90'
                }
                focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isDarkMode ? 'focus:ring-primary-purple' : 'focus:ring-primary-blue'
                } transition-all duration-200 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
            >
              {loading ? (
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              ) : null}
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </motion.form>
        
        <motion.div variants={itemVariants} className="text-center">
          <p className={`text-sm ${isDarkMode ? 'text-dark-text-secondary' : 'text-text-secondary'}`}>
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className={`font-medium ${
                isDarkMode 
                  ? 'text-primary-purple hover:text-primary-teal' 
                  : 'text-primary-blue hover:text-primary-purple'
              } focus:outline-none focus:underline transition-colors`}
            >
              Register
            </Link>
          </p>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="pt-5 mt-6 border-t border-gray-200 dark:border-gray-700"
        >
          <div className={`text-center text-xs ${
            isDarkMode ? 'text-dark-text-tertiary' : 'text-text-tertiary'
          }`}>
            Demo accounts: admin@conison.com / client@conison.com
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login; 