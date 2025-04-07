import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar, SidebarBody } from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import { ClientDataProvider } from '../../context/ClientDataContext';
import { SidebarProvider } from '../../context/SidebarContext';
import { useDarkMode } from '../../context/DarkModeContext';

const ClientLayout = () => {
  const { currentUser } = useAuth();
  const { isDarkMode } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" />;
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