import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// Import getStorage conditionally
let getStorage;
try {
  getStorage = require('firebase/storage').getStorage;
} catch (error) {
  console.warn("Firebase Storage module not available:", error.message);
}

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV-mb5qsq8RPyLE4cIAz979RRMRM7vAg4",
  authDomain: "conison-25ccd.firebaseapp.com",
  projectId: "conison-25ccd",
  storageBucket: "conison-25ccd.appspot.com", // Fixed storage bucket URL
  messagingSenderId: "265194682359",
  appId: "1:265194682359:web:a1d1ffd0500c1be873e0f2",
  measurementId: "G-NH5M5QXRX8"
};

// Initialize Firebase - check if already initialized to prevent duplicate app error
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

// Initialize analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(firebaseApp);
  } catch (error) {
    console.warn("Firebase Analytics not initialized:", error.message);
  }
}

// Try to initialize storage, but handle gracefully if not available
let storage = null;
try {
  if (getStorage) {
    storage = getStorage(firebaseApp);
  }
} catch (error) {
  console.warn("Firebase Storage not initialized:", error.message);
}

// Helper function to safely access storage
const safeGetStorage = () => {
  if (!storage) {
    console.warn("Firebase Storage is not available. Make sure it's enabled in Firebase Console.");
  }
  return storage;
};

export { 
  firebaseApp, 
  firebaseAuth, 
  firestore, 
  analytics,
  safeGetStorage as getStorage 
}; 