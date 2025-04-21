import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';

/**
 * This is a temporary component for creating an admin user during development
 * You should remove this component before going to production
 */
const TestAdminCreation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      toast.error('Please fill all fields');
      return;
    }
    
    try {
      setLoading(true);
      
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile
      await updateProfile(user, {
        displayName: name
      });
      
      // Store admin data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        email,
        role: 'admin',
        createdAt: new Date().toISOString()
      });
      
      toast.success('Admin user created successfully!');
      
      // Clear form
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      console.error('Error creating admin:', error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white text-center">
        Create Admin User (Development Only)
      </h2>
      <p className="text-red-600 dark:text-red-400 mb-4 text-sm text-center">
        This is for development purposes only. Remove this component before deploying to production.
      </p>
      
      <form onSubmit={handleCreateAdmin}>
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Admin Name"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="admin@example.com"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="********"
            required
            minLength="6"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Must be at least 6 characters</p>
        </div>
        
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-conison-magenta hover:bg-conison-magenta-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          >
            {loading ? 'Creating...' : 'Create Admin User'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestAdminCreation; 