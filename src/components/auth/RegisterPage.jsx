import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import AuthLayout from './AuthLayout';
import InputField from './InputField';
import { Mail, Lock, User, Building } from 'lucide-react';

const RegisterPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: '',
    role: 'client'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, {
        name: formData.name,
        company: formData.company,
        role: formData.role
      });
      setSuccess('Account created successfully! Redirecting to login...');
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitleLink={
        <span>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-conison-magenta hover:text-conison-magenta/80">
            Sign in
          </Link>
        </span>
      }
    >
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
          {success}
        </div>
      )}
      
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <InputField
            id="name"
            name="name"
            type="text"
            label="Full name"
            value={formData.name}
            onChange={handleChange}
            icon={User}
            error={error}
          />
          <InputField
            id="email"
            name="email"
            type="email"
            label="Email address"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
          />
          <InputField
            id="company"
            name="company"
            type="text"
            label="Company name"
            value={formData.company}
            onChange={handleChange}
            icon={Building}
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
          />
          <InputField
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            icon={Lock}
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />
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
          {loading ? 'Creating account...' : 'Create account'}
        </motion.button>
      </form>
    </AuthLayout>
  );
};

export default RegisterPage; 