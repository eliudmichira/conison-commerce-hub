import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV-mb5qsq8RPyLE4cIAz979RRMRM7vAg4",
  authDomain: "conison-25ccd.firebaseapp.com",
  projectId: "conison-25ccd",
  storageBucket: "conison-25ccd.appspot.com",
  messagingSenderId: "265194682359",
  appId: "1:265194682359:web:a1d1ffd0500c1be873e0f2",
  measurementId: "G-NH5M5QXRX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize analytics only if supported in the current environment
let analytics = null;

// Check if analytics is supported before initializing
const initAnalytics = async () => {
  try {
    const analyticsSupported = await isSupported();
    if (analyticsSupported) {
      analytics = getAnalytics(app);
    }
  } catch (error) {
    console.error("Analytics not supported:", error);
  }
};

// Only run in browser environment
if (typeof window !== 'undefined') {
  initAnalytics();
}

export { auth, db, analytics };
export default app; 