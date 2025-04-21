import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';

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
const db = getFirestore(app);
const auth = getAuth(app);

// Export for debugging
export { app, db, auth };

// Diagnostic function
export const diagnoseFirebase = async () => {
  console.log("Firebase Diagnostics Running...");
  
  try {
    console.log("Firebase Initialized:", app.name);
    console.log("Firebase Config:", firebaseConfig);
    
    // Try authentication
    console.log("Testing authentication...");
    await signInAnonymously(auth);
    console.log("Authentication successful");
    
    // Try database access
    console.log("Testing Firestore access...");
    const testRef = collection(db, "test-collection");
    await getDocs(testRef);
    console.log("Firestore access successful");
    
    return {
      success: true,
      message: "Firebase is properly initialized and working"
    };
  } catch (error) {
    console.error("Firebase Diagnostic Error:", error);
    return {
      success: false,
      error: error.message
    };
  }
}; 