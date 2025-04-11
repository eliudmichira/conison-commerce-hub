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
    // For users, check localStorage
    const users = getAllUsers();
    const user = users.find(user => user.email.toLowerCase() === email.toLowerCase());
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    if (user.password === password) {
      // Return user without password for security
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    throw new Error('Invalid credentials');
  }
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
 */
export const initializeDefaultUsers = () => {
  try {
    // Check if localStorage is available
    if (typeof localStorage === 'undefined') {
      return;
    }
    
    // Ensure the users key exists
    if (!localStorage.getItem(USERS_STORAGE_KEY)) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify([]));
    }
  } catch (error) {
    // Silent fail for production
  }
};

// Auto-initialize on load
initializeDefaultUsers(); 