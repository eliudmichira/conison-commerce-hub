import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAuth } from '../../context/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import InputField from '../../components/auth/InputField';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Log in to access your dashboard
            </p>
          </div>
          
          {/* Display error message */}
          {loginError && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-md text-sm">
              {loginError}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <InputField
              label="Email Address"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required={true}
            />
            
            {/* Password input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-conison-magenta flex items-center gap-1"
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
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-conison-magenta focus:border-conison-magenta bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
            
            {/* Remember me checkbox */}
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Remember me
              </label>
              <Link 
                to="/forgot-password" 
                className="ml-auto text-sm font-medium text-conison-magenta hover:text-conison-magenta-dark"
              >
                Forgot password?
              </Link>
            </div>
            
            {/* Submit button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-conison-magenta hover:bg-conison-magenta-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-conison-magenta disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <LoadingSpinner size="sm" className="mr-2" />
                    Signing in...
                  </span>
                ) : 'Sign in'}
              </button>
            </div>
          </form>
          
          {/* Sign up link */}
          <div className="mt-6 text-center">
            <span className="text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 