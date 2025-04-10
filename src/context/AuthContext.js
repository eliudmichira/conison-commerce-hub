import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Clear error state
  const clearError = () => setError(null);
  
  // Login function using Firebase Auth
  const login = async (email, password, rememberMe = true) => {
    try {
      // Set persistence based on rememberMe
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      
      // Update state
      setCurrentUser(user);
      setUserData(userData);
      setError(null);
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
      throw error;
    }
  };
  
  // Logout function using Firebase Auth
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setUserData(null);
      setError(null);
    } catch (error) {
      console.error('Logout error:', error);
      setError(error.message);
      throw error;
    }
  };
  
  // Signup function using Firebase Auth
  const signup = async (email, password, name, company, phone) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update the user profile with name
      await updateProfile(user, {
        displayName: name
      });
      
      // Store additional user data in Firestore
      const userData = {
        uid: user.uid,
        name,
        email,
        company,
        phone,
        role: 'client',
        createdAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', user.uid), userData);
      
      // Update state
      setCurrentUser(user);
      setUserData(userData);
      setError(null);
      
      return user;
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message);
      throw error;
    }
  };
  
  // Password reset function
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      setError(null);
    } catch (error) {
      console.error('Password reset error:', error);
      setError(error.message);
      throw error;
    }
  };
  
  // Initialize auth state listener
  useEffect(() => {
    console.log('AuthContext - Setting up auth listener');
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          console.log('AuthContext - User authenticated:', {
            uid: user.uid,
            email: user.email
          });
          
          // Get additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          const userData = userDoc.exists() ? userDoc.data() : null;
          
          // Update state
          setCurrentUser(user);
          setUserData(userData);
        } else {
          setCurrentUser(null);
          setUserData(null);
        }
      } catch (error) {
        console.error('Auth state change error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    });
    
    return () => unsubscribe();
  }, []);
  
  const value = {
    currentUser,
    userData,
    loading,
    error,
    login,
    logout,
    signup,
    resetPassword,
    clearError
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 