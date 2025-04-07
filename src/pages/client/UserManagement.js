import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getAllUsers, clearAllUsers } from '../../utils/userStorage';
import { useAuth } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaCalendarAlt, FaTrash } from 'react-icons/fa';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [jsonView, setJsonView] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    // Only admin should access this page
    if (!currentUser || currentUser.role !== 'admin') {
      navigate('/login');
      return;
    }

    loadUsers();
  }, [currentUser, navigate]);

  const loadUsers = () => {
    setLoading(true);
    const allUsers = getAllUsers();
    setUsers(allUsers);
    setLoading(false);
  };

  const handleClearUsers = () => {
    if (window.confirm('Are you sure you want to delete all users? This cannot be undone.')) {
      clearAllUsers();
      loadUsers();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-conison-magenta"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            View and manage users stored in the JSON file
          </p>
        </motion.div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded-md ${!jsonView 
                  ? 'bg-conison-magenta text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setJsonView(false)}
              >
                Table View
              </button>
              <button
                className={`px-4 py-2 rounded-md ${jsonView 
                  ? 'bg-conison-magenta text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
                }`}
                onClick={() => setJsonView(true)}
              >
                JSON View
              </button>
            </div>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md flex items-center hover:bg-red-700"
              onClick={handleClearUsers}
            >
              <FaTrash className="mr-2" />
              Clear All Users
            </button>
          </div>

          <div className="p-6">
            {jsonView ? (
              <div className="bg-gray-800 rounded-lg p-4 text-white overflow-auto">
                <pre className="text-xs md:text-sm">{JSON.stringify(users, null, 2)}</pre>
              </div>
            ) : (
              <div className="overflow-auto">
                {users.length === 0 ? (
                  <div className="text-center py-8">
                    <FaUser className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No users found</h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                      There are no users registered in the system
                    </p>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Company
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Phone
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Created
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {users.map((user) => (
                        <motion.tr 
                          key={user.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaUser className="h-4 w-4 text-gray-400 dark:text-gray-300 mr-3" />
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {user.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaEnvelope className="h-4 w-4 text-gray-400 dark:text-gray-300 mr-3" />
                              <div className="text-sm text-gray-500 dark:text-gray-300">
                                {user.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaBuilding className="h-4 w-4 text-gray-400 dark:text-gray-300 mr-3" />
                              <div className="text-sm text-gray-500 dark:text-gray-300">
                                {user.company || '-'}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaPhone className="h-4 w-4 text-gray-400 dark:text-gray-300 mr-3" />
                              <div className="text-sm text-gray-500 dark:text-gray-300">
                                {user.phone || '-'}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaCalendarAlt className="h-4 w-4 text-gray-400 dark:text-gray-300 mr-3" />
                              <div className="text-sm text-gray-500 dark:text-gray-300">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </div>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement; 