import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidebar, SidebarBody } from './Sidebar';
import { ClientDataProvider } from '../../context/ClientDataContext';
import { SidebarProvider } from '../../context/SidebarContext';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

const ClientLayout = () => {
  const [loading, setLoading] = useState(true);
  const { isDarkMode } = useDarkMode();
  const { currentUser, userData } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Check authentication using Firebase auth
  useEffect(() => {
    console.log('ClientLayout - Checking authentication:', { currentUser, userData });
    
    if (!currentUser) {
      console.log('ClientLayout - Not authenticated, redirecting to login');
      navigate('/login');
    } else if (userData?.role !== 'client') {
      console.log('ClientLayout - Not a client, redirecting to appropriate dashboard');
      navigate(`/${userData?.role || 'client'}`);
    }
    
    // Set loading to false once we've checked authentication
    setLoading(false);
  }, [currentUser, userData, navigate]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-conison-magenta">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <ClientDataProvider>
      <SidebarProvider>
        <div className={`h-screen flex flex-col md:flex-row ${isDarkMode ? 'dark' : ''}`}>
          <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} animate={true}>
            <SidebarBody />
          </Sidebar>
          
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white">
            <div className="container mx-auto px-4 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </ClientDataProvider>
  );
};

export default ClientLayout; 