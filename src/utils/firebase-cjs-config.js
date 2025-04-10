const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');
const { getFirestore } = require('firebase/firestore');

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

module.exports = { auth, db, app }; 