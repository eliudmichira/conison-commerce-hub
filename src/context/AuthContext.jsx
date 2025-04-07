import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateCredentials, saveUser, findUserByEmail, initializeDefaultUsers } from '../utils/userStorage';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Initialize default users when the app loads
    initializeDefaultUsers();
    
    // Check for stored user data
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
          console.log('User restored from localStorage:', parsedUser);
        }
      } catch (err) {
        console.error('Error checking auth:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Attempting login for:', email);
      
      // Validate credentials - this now returns a proper user object or throws an error
      const validatedUser = validateCredentials(email, password);
      
      // Store user in localStorage and state
      localStorage.setItem('currentUser', JSON.stringify(validatedUser));
      setUser(validatedUser);
      setIsAuthenticated(true);
      
      console.log('Login successful:', validatedUser);
      return validatedUser;
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Invalid credentials');
      throw new Error('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, userData) => {
    try {
      setLoading(true);
      setError(null);

      // Check if password meets requirements
      if (password.length < 6) {
        throw new Error('Password should be at least 6 characters');
      }
      
      // Prepare user data for storage
      const userToSave = {
        email,
        password,
        ...userData,
        role: userData.role || 'client'
      };
      
      // Use saveUser from userStorage
      const newUser = saveUser(userToSave);
      console.log('User registered:', newUser);
      
      // Don't automatically log in, require explicit login
      // This is the typical flow for most apps
      return newUser;
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    console.log('Logged out');
  };

  const value = {
    user,
    loading,
    error,
    isAuthenticated,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};

export default AuthContext; 