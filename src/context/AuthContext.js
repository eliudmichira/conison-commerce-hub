import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateCredentials, saveUser, findUserByEmail } from '../utils/userStorage';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Login function using userStorage
  const login = (email, password) => {
    try {
      const user = validateCredentials(email, password);
      
      if (user) {
        // Save to localStorage for persistence
        localStorage.setItem('currentUser', JSON.stringify(user));
        setCurrentUser(user);
        return Promise.resolve(user);
      }
      
      return Promise.reject(new Error('Invalid credentials'));
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  const logout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    return Promise.resolve();
  };
  
  const signup = (email, password, name) => {
    try {
      if (password.length < 6) {
        return Promise.reject(new Error('Password should be at least 6 characters'));
      }
      
      const userData = {
        email,
        password,
        name: name || email.split('@')[0],
        role: 'client'
      };
      
      const newUser = saveUser(userData);
      
      // Don't log in the user automatically - they need to log in separately
      return Promise.resolve(newUser);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  // Update user profile
  const updateProfile = (updates) => {
    try {
      if (!currentUser) {
        return Promise.reject(new Error('No user is currently logged in'));
      }
      
      // In a real app, this would update the user in the database
      // For this demo, we'll just update localStorage
      const updatedUser = {
        ...currentUser,
        ...updates
      };
      
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);
      
      return Promise.resolve(updatedUser);
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  // Update password
  const updatePassword = (currentPassword, newPassword) => {
    try {
      if (!currentUser) {
        return Promise.reject(new Error('No user is currently logged in'));
      }
      
      // Verify current password - in a real app this would be more secure
      const user = validateCredentials(currentUser.email, currentPassword);
      
      if (!user) {
        return Promise.reject(new Error('Current password is incorrect'));
      }
      
      // In a real app, this would update the user in the database
      // For this demo, we just update the user object
      
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  
  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);
  
  const value = {
    currentUser,
    login,
    logout,
    signup,
    updateProfile,
    updatePassword
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 