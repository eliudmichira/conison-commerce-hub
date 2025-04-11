/**
 * This utility function checks if the Firebase configuration is valid
 * Use it to diagnose Firebase configuration issues
 */

const checkFirebaseConfig = () => {
  // Get all Firebase environment variables
  const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

  // Check for missing variables
  const missingVars = Object.entries(config)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  // Log the results
  if (missingVars.length > 0) {
    console.warn('📛 Firebase Configuration Warning: Missing environment variables:');
    console.warn(missingVars.join(', '));
    console.warn('Create or update your .env file with the missing values');
    return false;
  } else {
    console.log('✅ Firebase configuration environment variables are present');
    return true;
  }
};

export default checkFirebaseConfig; 