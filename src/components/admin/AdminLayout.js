import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { useDarkMode } from '../../context/DarkModeContext';

const AdminLayout = () => {
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  // Check authentication from localStorage
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const userRole = localStorage.getItem('userRole');
    
    console.log('AdminLayout - Checking authentication:', { isAuthenticated, userRole });
    
    if (!isAuthenticated) {
      console.log('AdminLayout - Not authenticated, redirecting to login');
      navigate('/login');
    } else if (userRole !== 'admin') {
      console.log('AdminLayout - Not an admin, redirecting to appropriate dashboard');
      navigate(`/${userRole}`);
    }
    
    // Simulate loading delay to show spinner
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-conison-magenta"></div>
          <p className="mt-4 text-conison-magenta">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen bg-gray-50 ${isDarkMode ? 'dark bg-gray-900' : ''}`}>
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 