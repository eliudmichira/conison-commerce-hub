import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FaSave, FaUserCircle, FaLock, FaBell, FaMoon, FaSun } from 'react-icons/fa';
import { useDarkMode } from '../../context/DarkModeContext';

const SettingsPage = () => {
  const { currentUser, updateProfile, updatePassword, loading } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  // Profile state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [projectUpdates, setProjectUpdates] = useState(true);
  const [quoteNotifications, setQuoteNotifications] = useState(true);
  const [paymentNotifications, setPaymentNotifications] = useState(true);
  
  // Feedback state
  const [message, setMessage] = useState({ text: '', type: '' });
  const [activeTab, setActiveTab] = useState('profile');

  // Initialize form with user data
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
      setPhone(currentUser.phoneNumber || '');
      setCompany(currentUser.company || '');
    }
  }, [currentUser]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    
    try {
      await updateProfile({ 
        displayName: name,
        email,
        phoneNumber: phone,
        company
      });
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
    } catch (error) {
      setMessage({ text: error.message || 'Failed to update profile', type: 'error' });
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      return setMessage({ text: 'New passwords do not match', type: 'error' });
    }
    
    if (newPassword.length < 6) {
      return setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
    }
    
    try {
      await updatePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setMessage({ text: 'Password updated successfully!', type: 'success' });
    } catch (error) {
      setMessage({ text: error.message || 'Failed to update password', type: 'error' });
    }
  };

  const handleNotificationUpdate = (e) => {
    e.preventDefault();
    // In a real app, this would save to a database
    setMessage({ text: 'Notification preferences saved!', type: 'success' });
  };

  return (
    <div className="pb-12">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Account Settings</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your account information and preferences
        </p>
      </motion.div>

      {message.text && (
        <div className={`mb-6 p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
            : 'bg-red-50 text-red-800 border border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-6 font-medium text-sm focus:outline-none flex items-center ${
                activeTab === 'profile'
                  ? 'border-b-2 border-conison-magenta text-conison-magenta'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FaUserCircle className="mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`py-4 px-6 font-medium text-sm focus:outline-none flex items-center ${
                activeTab === 'password'
                  ? 'border-b-2 border-conison-magenta text-conison-magenta'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FaLock className="mr-2" />
              Password
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-6 font-medium text-sm focus:outline-none flex items-center ${
                activeTab === 'notifications'
                  ? 'border-b-2 border-conison-magenta text-conison-magenta'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <FaBell className="mr-2" />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`py-4 px-6 font-medium text-sm focus:outline-none flex items-center ${
                activeTab === 'appearance'
                  ? 'border-b-2 border-conison-magenta text-conison-magenta'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              {isDarkMode ? <FaMoon className="mr-2" /> : <FaSun className="mr-2" />}
              Appearance
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'profile' && (
            <motion.form 
              onSubmit={handleProfileUpdate}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-conison-magenta focus:ring-conison-magenta sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-conison-magenta focus:ring-conison-magenta sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-conison-magenta focus:ring-conison-magenta sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="company"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-conison-magenta focus:ring-conison-magenta sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-conison-magenta hover:bg-conison-cyan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-conison-yellow disabled:opacity-50"
                  >
                    <FaSave className="mr-2 -ml-1" />
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.form>
          )}

          {activeTab === 'password' && (
            <motion.form 
              onSubmit={handlePasswordUpdate}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current_password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-conison-magenta focus:ring-conison-magenta sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new_password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-conison-magenta focus:ring-conison-magenta sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm_password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-conison-magenta focus:ring-conison-magenta sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-conison-magenta hover:bg-conison-cyan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-conison-yellow disabled:opacity-50"
                  >
                    <FaSave className="mr-2 -ml-1" />
                    Update Password
                  </button>
                </div>
              </div>
            </motion.form>
          )}

          {activeTab === 'notifications' && (
            <motion.form 
              onSubmit={handleNotificationUpdate}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="email_notifications"
                      type="checkbox"
                      className="focus:ring-conison-magenta h-4 w-4 text-conison-magenta border-gray-300 rounded"
                      checked={emailNotifications}
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="email_notifications" className="font-medium text-gray-700 dark:text-gray-300">
                      Email Notifications
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Receive email notifications about your account
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="project_updates"
                      type="checkbox"
                      className="focus:ring-conison-magenta h-4 w-4 text-conison-magenta border-gray-300 rounded"
                      checked={projectUpdates}
                      onChange={(e) => setProjectUpdates(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="project_updates" className="font-medium text-gray-700 dark:text-gray-300">
                      Project Updates
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Receive notifications when there are updates to your projects
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="quote_notifications"
                      type="checkbox"
                      className="focus:ring-conison-magenta h-4 w-4 text-conison-magenta border-gray-300 rounded"
                      checked={quoteNotifications}
                      onChange={(e) => setQuoteNotifications(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="quote_notifications" className="font-medium text-gray-700 dark:text-gray-300">
                      Quote Notifications
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Receive notifications about quote status changes
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="payment_notifications"
                      type="checkbox"
                      className="focus:ring-conison-magenta h-4 w-4 text-conison-magenta border-gray-300 rounded"
                      checked={paymentNotifications}
                      onChange={(e) => setPaymentNotifications(e.target.checked)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="payment_notifications" className="font-medium text-gray-700 dark:text-gray-300">
                      Payment Notifications
                    </label>
                    <p className="text-gray-500 dark:text-gray-400">
                      Receive notifications about payment status changes
                    </p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-conison-magenta hover:bg-conison-cyan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-conison-yellow"
                  >
                    <FaSave className="mr-2 -ml-1" />
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.form>
          )}

          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Display Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => toggleDarkMode()}
                    className={`cursor-pointer rounded-lg border p-4 flex items-center justify-between ${
                      !isDarkMode 
                        ? 'bg-gray-100 border-conison-magenta dark:bg-gray-800 dark:border-conison-magenta' 
                        : 'bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 mr-3 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <FaSun />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">Light Mode</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Use light theme</p>
                      </div>
                    </div>
                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center 
                      ${!isDarkMode ? 'border-conison-magenta' : 'border-gray-300 dark:border-gray-500'}`}>
                      {!isDarkMode && (
                        <div className="h-3 w-3 rounded-full bg-conison-magenta"></div>
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => toggleDarkMode()}
                    className={`cursor-pointer rounded-lg border p-4 flex items-center justify-between ${
                      isDarkMode 
                        ? 'bg-gray-100 border-conison-magenta dark:bg-gray-800 dark:border-conison-magenta' 
                        : 'bg-white border-gray-200 dark:bg-gray-700 dark:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 mr-3 dark:bg-indigo-900/30 dark:text-indigo-400">
                        <FaMoon />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-white">Dark Mode</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Use dark theme</p>
                      </div>
                    </div>
                    <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center 
                      ${isDarkMode ? 'border-conison-magenta' : 'border-gray-300 dark:border-gray-500'}`}>
                      {isDarkMode && (
                        <div className="h-3 w-3 rounded-full bg-conison-magenta"></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 