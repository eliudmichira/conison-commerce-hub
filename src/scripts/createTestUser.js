const { auth, db } = require('../utils/firebase-cjs-config');
const { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence
} = require('firebase/auth');
const { doc, setDoc } = require('firebase/firestore');

const testEmail = 'test@conison.com';
const testPassword = 'Conison123!';

const createTestUser = async () => {
  try {
    console.log('Creating test user...');
    
    // First, try to sign in to check if user exists
    try {
      const userCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
      console.log('Test user already exists, updating data...');
      
      // Update user data in Firestore
      const userData = {
        uid: userCredential.user.uid,
        email: testEmail,
        name: 'Test User',
        role: 'client',
        company: 'Test Company',
        createdAt: new Date().toISOString()
      };
      
      await setDoc(doc(db, 'users', userCredential.user.uid), userData);
      console.log('Test user data updated successfully');
      return true;
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log('Test user does not exist, creating new user...');
        
        // Create the user
        const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
        const user = userCredential.user;
        
        // Set persistence
        await setPersistence(auth, browserLocalPersistence);
        
        // Create user document in Firestore
        const userData = {
          uid: user.uid,
          email: testEmail,
          name: 'Test User',
          role: 'client',
          company: 'Test Company',
          createdAt: new Date().toISOString()
        };
        
        await setDoc(doc(db, 'users', user.uid), userData);
        
        console.log('Test user created successfully:', user.uid);
        return true;
      } else {
        console.error('Error checking test user:', error);
        return false;
      }
    }
  } catch (error) {
    console.error('Error in createTestUser:', error);
    return false;
  } finally {
    // Sign out
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
};

module.exports = createTestUser; 