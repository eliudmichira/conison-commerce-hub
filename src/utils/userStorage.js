/**
 * userStorage.js
 * 
 * Utility functions for storing and retrieving user data from localStorage
 * This simulates a JSON file storage in the browser
 */

// The key used to store the users array in localStorage
const USERS_STORAGE_KEY = 'conison_users';

/**
 * Get all users from storage
 * @returns {Array} Array of user objects
 */
export const getAllUsers = () => {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error('Error getting users from storage:', error);
    return [];
  }
};

/**
 * Save a new user to storage
 * @param {Object} userData - User data object
 * @returns {Object} The saved user with ID
 */
export const saveUser = (userData) => {
  try {
    // Get existing users
    const existingUsers = getAllUsers();
    
    // Check if email already exists
    const emailExists = existingUsers.some(user => 
      user.email.toLowerCase() === userData.email.toLowerCase()
    );
    
    if (emailExists) {
      throw new Error('Email already registered');
    }
    
    // Create user with ID and timestamp
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    // Add to array and save back to storage
    existingUsers.push(newUser);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(existingUsers));
    
    // Write to "users.json" in localStorage (for display purposes)
    localStorage.setItem('users.json', JSON.stringify(existingUsers, null, 2));
    
    return newUser;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

/**
 * Find a user by email
 * @param {string} email - User email
 * @returns {Object|null} User object or null if not found
 */
export const findUserByEmail = (email) => {
  try {
    const users = getAllUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
  } catch (error) {
    console.error('Error finding user:', error);
    return null;
  }
};

/**
 * Validate user credentials for login
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Object|null} User object if valid, null if invalid
 */
export const validateCredentials = (email, password) => {
  try {
    console.log('Validating credentials for:', email);
    
    // Check for admin test account
    if (email === 'admin@conison.com' && password === 'admin123') {
      console.log('Admin credentials validated');
      return {
        id: 'admin-1',
        name: 'Admin User',
        email: 'admin@conison.com',
        role: 'admin'
      };
    }
    
    // Check for client test account
    if (email === 'client@conison.com' && password === 'client123') {
      console.log('Client credentials validated');
      return {
        id: 'client-1',
        name: 'Test Client',
        email: 'client@conison.com',
        company: 'Client Company',
        role: 'client'
      };
    }
    
    // For other users, check localStorage
    const users = getAllUsers();
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      console.log('User not found for email:', email);
      throw new Error('Invalid credentials');
    }
    
    if (user.password === password) {
      console.log('Password validated for user:', email);
      // Return user without password for security
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      console.log('Invalid password for user:', email);
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Error in validateCredentials:', error);
    throw new Error('Invalid credentials');
  }
};

/**
 * Clear all users from storage (for testing/development)
 */
export const clearAllUsers = () => {
  localStorage.removeItem(USERS_STORAGE_KEY);
  localStorage.removeItem('users.json');
};

/**
 * Get the "users.json" formatted data
 * @returns {string} JSON string representation of users
 */
export const getUsersJson = () => {
  return localStorage.getItem('users.json') || JSON.stringify([], null, 2);
};

/**
 * Initialize the database with default users if empty
 * This ensures there is at least one admin user for testing
 */
export const initializeDefaultUsers = () => {
  try {
    // Check if localStorage is available
    if (typeof localStorage === 'undefined') {
      console.error('localStorage is not available');
      return;
    }
    
    // Ensure the users key exists
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
    }
    
    const users = getAllUsers();
    console.log('Current users in storage:', users);
    
    // Only add default users if the database is empty
    if (users.length === 0) {
      console.log('Initializing default users...');
      
      try {
        // Add admin user
        saveUser({
          email: 'admin@conison.com',
          password: 'admin123',
          name: 'Admin User',
          role: 'admin'
        });
        
        // Add a test client user
        saveUser({
          email: 'client@conison.com',
          password: 'client123',
          name: 'Test Client',
          company: 'Client Company',
          role: 'client'
        });
        
        console.log('Default users initialized successfully');
        console.log('Updated users:', getAllUsers());
      } catch (error) {
        console.error('Error creating default users:', error.message);
      }
    } else {
      console.log(`Found ${users.length} existing users, skipping initialization`);
    }
  } catch (error) {
    console.error('Error in initializeDefaultUsers:', error);
  }
}; 