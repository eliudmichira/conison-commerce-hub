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
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.company) newErrors.company = 'Company name is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  return (
    <div className={`min-h-screen flex items-center justify-center pt-16 pb-8 ${isDarkMode ? 'bg-conison.gray-900' : 'bg-conison.gray-50'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-md p-8 space-y-8 rounded-xl shadow-conison-magenta ${isDarkMode ? 'bg-conison.gray-800' : 'bg-white'}`}
      >
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
            Create your account
          </h2>
          <p className={`mt-2 ${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}>
            Join our platform today
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

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-conison.gray-300' : 'text-conison.gray-700'}`}>
                Full Name
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-conison.gray-800 text-white border-conison.gray-700' : 'bg-white text-conison.gray-900 border-conison.gray-300'}`}
                />
                {errors.name && <p className="text-conison.red-500 text-sm mt-1">{errors.name}</p>}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-conison.gray-300' : 'text-conison.gray-700'}`}>
                Company Name
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-conison.gray-800 text-white border-conison.gray-700' : 'bg-white text-conison.gray-900 border-conison.gray-300'}`}
                />
                {errors.company && <p className="text-conison.red-500 text-sm mt-1">{errors.company}</p>}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-conison.gray-300' : 'text-conison.gray-700'}`}>
                Phone Number
              </label>
              <div className="mt-1 relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-conison.gray-800 text-white border-conison.gray-700' : 'bg-white text-conison.gray-900 border-conison.gray-300'}`}
                />
                {errors.phone && <p className="text-conison.red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-conison.gray-300' : 'text-conison.gray-700'}`}>
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-conison.gray-800 text-white border-conison.gray-700' : 'bg-white text-conison.gray-900 border-conison.gray-300'}`}
                />
                {errors.email && <p className="text-conison.red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-conison.gray-300' : 'text-conison.gray-700'}`}>
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-conison.gray-800 text-white border-conison.gray-700' : 'bg-white text-conison.gray-900 border-conison.gray-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-conison.gray-500 hover:text-conison.gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && <p className="text-conison.red-500 text-sm mt-1">{errors.password}</p>}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium ${isDarkMode ? 'text-conison.gray-300' : 'text-conison.gray-700'}`}>
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-md ${isDarkMode ? 'bg-conison.gray-800 text-white border-conison.gray-700' : 'bg-white text-conison.gray-900 border-conison.gray-300'}`}
                />
                {errors.confirmPassword && <p className="text-conison.red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-conison-magenta hover:bg-conison-magenta-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-conison-magenta transition-all ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>

          <div className="text-center">
            <p className={`text-sm ${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}>
              Already have an account?{' '}
              <Link to="/login" className="text-conison-magenta hover:text-conison-magenta-600 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage; 