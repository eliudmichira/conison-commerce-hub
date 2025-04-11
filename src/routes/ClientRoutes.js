import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDarkMode } from '../context/DarkModeContext';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!user) {
    return null;
  }
  
  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h1 className="text-2xl font-bold mb-6">Client Dashboard</h1>
        
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user.name}!</h2>
          <p className="mb-2">You are logged in as: <span className="font-medium">{user.email}</span></p>
          {user.company && <p className="mb-2">Company: <span className="font-medium">{user.company}</span></p>}
          <p className="mb-2">Role: <span className="font-medium capitalize">{user.role}</span></p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="text-lg font-semibold mb-2">Your Projects</h3>
            <p className="text-sm">View and manage your projects</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="text-lg font-semibold mb-2">Invoices</h3>
            <p className="text-sm">View your invoices and payment history</p>
          </div>
          <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <p className="text-sm">Contact our support team</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      {/* Add more client routes as needed */}
    </Routes>
  );
};

export default ClientRoutes; 