import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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

const AdminSidebar = () => {
  const { isDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: <FaHome /> },
    { path: '/admin/clients', label: 'Clients', icon: <FaUsers /> },
    { path: '/admin/quotes', label: 'Quotes', icon: <FaFileAlt /> },
    { path: '/admin/projects', label: 'Projects', icon: <FaChartBar /> },
    { path: '/admin/payments', label: 'Payments', icon: <FaMoneyBillWave /> },
    { path: '/admin/messages', label: 'Messages', icon: <FaEnvelope /> },
    { path: '/admin/settings', label: 'Settings', icon: <FaCog /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <aside className={`w-64 h-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-lg`}>
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
      <div className="absolute bottom-0 w-64 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-6 py-3 text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-200"
        >
          <FaSignOutAlt className="mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar; 