import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

// Create context
const AuthContext = createContext();

// Custom hook for using auth context
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
  const [authReady, setAuthReady] = useState(false);

  // Clear error state
  const clearError = () => setError(null);

  // Initialize auth state listener
  useEffect(() => {
    // Example: replace console.log with silent operations or proper error handling
    
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Get additional user data from Firestore
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            // Combine Firebase Auth user with Firestore data
            const userData = userDoc.data();
            
            const fullUserData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName || userData.name,
              role: userData.role || 'client',
              ...userData
            };
            
            setUser(fullUserData);
          } else {
            // Create basic user doc if it doesn't exist
            
            const newUserData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
              role: 'client',
              createdAt: serverTimestamp()
            };
            
            // Save to Firestore
            await setDoc(userDocRef, newUserData);
            
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: newUserData.name,
              role: 'client',
              ...newUserData
            });
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
        setError('Failed to load user data. Please refresh or try again later.');
      } finally {
        setLoading(false);
        setAuthReady(true);
      }
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  // Login function
  const login = async (email, password, rememberMe = true) => {
    try {
      setLoading(true);
      setError(null);
      
      // Set auth persistence based on rememberMe option
      const persistenceType = rememberMe ? browserLocalPersistence : browserSessionPersistence;
      await setPersistence(auth, persistenceType);
      
      // Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      return userCredential.user;
    } catch (err) {
      let errorMessage;
      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password.';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many unsuccessful attempts. Please try again later.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
        default:
          errorMessage = 'Failed to log in. Please try again.';
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (email, password, name, company = '', phone = '') => {
    try {
      setLoading(true);
      setError(null);
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update display name
      await updateProfile(userCredential.user, { displayName: name });
      
      // Create user document in Firestore
      const userData = {
        uid: userCredential.user.uid,
        email,
        name,
        role: 'client',
        company: company || '',
        phone: phone || '',
        createdAt: serverTimestamp()
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      
      return userCredential.user;
    } catch (err) {
      let errorMessage;
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already in use.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection.';
          break;
        default:
          errorMessage = 'Failed to create account. Please try again.';
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (err) {
      setError('Failed to log out. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    authReady,
    login,
    signup,
    logout,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; 