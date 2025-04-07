import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';
import { 
  FaHome, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaSignOutAlt,
  FaFileAlt,
  FaMoneyBillWave,
  FaEnvelope
} from 'react-icons/fa';

const AdminLayout = ({ children }) => {
  const { isDarkMode } = useDarkMode();
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: <FaHome /> },
    { path: '/admin/users', label: 'Users', icon: <FaUsers /> },
    { path: '/admin/quotes', label: 'Quotes', icon: <FaFileAlt /> },
    { path: '/admin/projects', label: 'Projects', icon: <FaChartBar /> },
    { path: '/admin/payments', label: 'Payments', icon: <FaMoneyBillWave /> },
    { path: '/admin/messages', label: 'Messages', icon: <FaEnvelope /> },
    { path: '/admin/settings', label: 'Settings', icon: <FaCog /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-conison-magenta">Admin Panel</h1>
        </div>
        <nav className="mt-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'bg-conison-magenta text-white'
                  : isDarkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-6 py-3 text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-200"
          >
            <FaSignOutAlt className="mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className={`max-w-7xl mx-auto ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg p-6`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout; 