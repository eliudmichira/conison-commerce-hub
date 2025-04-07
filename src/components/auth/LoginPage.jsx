import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from './AuthLayout';
import InputField from './InputField';
import { Mail, Lock } from 'lucide-react';
import { getAllUsers } from '../../utils/userStorage';

const LoginPage = () => {
  const { login, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/client');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const user = await login(formData.email, formData.password);
      console.log('Login successful', user);
      
      // Redirect based on user role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/client');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add a clearStorage function for debugging
  const clearStorage = () => {
    localStorage.clear();
    console.log('localStorage cleared');
    window.location.reload();
  };

  // Add a function to show current users
  const showCurrentUsers = () => {
    const users = getAllUsers();
    console.log('Current users in storage:', users);
    alert(`Current users in storage: ${users.length}\n\n${JSON.stringify(users, null, 2)}`);
  };

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitleLink={
        <span>
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-conison-magenta hover:text-conison-magenta/80">
            Sign up
          </Link>
        </span>
      }
    >
      {/* Add debug section at the top */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg">
          <p className="text-sm">Debug accounts:</p>
          <p className="text-sm">Admin: admin@conison.com / admin123</p>
          <p className="text-sm">Client: client@conison.com / client123</p>
          <div className="flex space-x-2 mt-2">
            <button 
              onClick={clearStorage}
              className="text-xs px-2 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
            >
              Clear localStorage
            </button>
            <button 
              onClick={showCurrentUsers}
              className="text-xs px-2 py-1 bg-yellow-200 rounded hover:bg-yellow-300"
            >
              Show Users
            </button>
          </div>
        </div>
      )}

      {/* Display any error messages */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email address"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            error={error && !formData.email ? 'Email is required' : ''}
            required
          />
          <InputField
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            value={formData.password}
            onChange={handleChange}
            icon={Lock}
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            error={error && !formData.password ? 'Password is required' : ''}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link to="/forgot-password" className="font-medium text-conison-magenta hover:text-conison-magenta/80">
              Forgot your password?
            </Link>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className={`
            w-full 
            flex 
            justify-center 
            py-3 
            px-4 
            border 
            border-transparent 
            rounded-lg 
            shadow-sm 
            text-sm 
            font-medium 
            text-white 
            bg-conison-magenta 
            hover:bg-conison-magenta/90 
            focus:outline-none 
            focus:ring-2 
            focus:ring-offset-2 
            focus:ring-conison-magenta
            disabled:opacity-50 
            disabled:cursor-not-allowed
          `}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </motion.button>
      </form>
    </AuthLayout>
  );
};

export default LoginPage; 