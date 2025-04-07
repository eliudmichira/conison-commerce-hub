import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDarkMode } from '../context/DarkModeContext';

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);
  
  if (!user) {
    return null;
  }
  
  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className="text-2xl font-bold mb-6 text-conison-magenta">Admin Dashboard</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
          <p className="mb-2">You are logged in as: <span className="font-medium">{user.email}</span></p>
          <p className="mb-2">Role: <span className="font-medium text-conison-magenta uppercase">{user.role}</span></p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="text-lg font-semibold mb-2">User Management</h3>
            <p className="text-sm">Manage users and permissions</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="text-lg font-semibold mb-2">Content Management</h3>
            <p className="text-sm">Update website content</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="text-lg font-semibold mb-2">Analytics</h3>
            <p className="text-sm">View website analytics and reports</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      {/* Add more admin routes as needed */}
    </Routes>
  );
};

export default AdminRoutes; 