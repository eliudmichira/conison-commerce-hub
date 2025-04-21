// Import only what we need - the modular approach
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Only import storage if you need it
// import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV-mb5qsq8RPyLE4cIAz979RRMRM7vAg4",
  authDomain: "conison-25ccd.firebaseapp.com",
  projectId: "conison-25ccd",
  storageBucket: "conison-25ccd.appspot.com",
  messagingSenderId: "265194682359",
  appId: "1:265194682359:web:a1d1ffd0500c1be873e0f2",
  measurementId: "G-NH5M5QXRX8"
};

// Avoid duplicate initializations (which cause errors)
let app;
try {
  // If no Firebase apps initialized yet
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    console.log("Firebase initialized successfully.");
  } else {
    app = getApp(); // Use the already initialized app
    console.log("Using existing Firebase app.");
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Use a basic fallback to avoid breaking the app
  app = { name: "fallback" };
}

const db = getFirestore(app);
const auth = getAuth(app);
// Only initialize storage if you need it
// const storage = getStorage(app);

export { app, db, auth }; 