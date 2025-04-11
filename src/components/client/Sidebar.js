import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';
import { 
  FaHome, 
  FaClipboardList, 
  FaChartLine, 
  FaCreditCard, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaFileInvoiceDollar,
  FaUserCog,
  FaChevronDown,
  FaChevronUp,
  FaBell,
  FaUserCircle,
  FaCheck,
  FaTrash,
  FaEllipsisH
} from 'react-icons/fa';

// Utility function to conditionally join classNames
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate = false,
}) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <>
      {/* Mobile sidebar backdrop */}
      <div 
        className={`fixed inset-0 z-20 bg-gray-900 bg-opacity-50 transition-opacity duration-200 md:hidden
        ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setOpen(false)}
      ></div>
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-30 h-screen w-64 transform bg-white dark:bg-gray-800 shadow-xl 
        transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${animate ? 'transition-transform' : ''}
        ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        {children}
      </aside>
    </>
  );
};

export const SidebarHeader = ({ setOpen }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4">
      <div className="flex items-center">
        <div className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-conison-cyan to-conison-magenta">
          Conison
        </div>
      </div>
      <button 
        onClick={() => setOpen(false)}
        className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
      >
        <FaTimes />
      </button>
    </div>
  );
};

export const SidebarBody = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { sidebarExpanded, toggleSidebar } = useSidebar();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationMenuOpen, setNotificationMenuOpen] = useState(null);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New quote has been approved', read: false, date: '2 hours ago', link: '/client/quotes' },
    { id: 2, message: 'Payment confirmation received', read: true, date: 'Yesterday', link: '/client/payments' },
    { id: 3, message: 'Project update available', read: false, date: '3 days ago', link: '/client/projects' },
    { id: 4, message: 'Your profile has been verified', read: false, date: '1 week ago', link: '/client/settings' }
  ]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };
  
  const markAsRead = (id) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setNotificationMenuOpen(null);
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    );
    setNotificationMenuOpen(null);
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const navigateToNotification = (link, id) => {
    markAsRead(id);
    setShowNotifications(false);
    navigate(link);
  };
  
  const menuItems = [
    {
      title: 'Dashboard',
      icon: <FaHome className="text-conison-cyan" />,
      path: '/client/dashboard'
    },
    {
      title: 'Projects',
      icon: <FaClipboardList className="text-conison-magenta" />,
      path: '/client/projects'
    },
    {
      title: 'Quotes',
      icon: <FaFileInvoiceDollar className="text-conison-yellow" />,
      path: '/client/quotes'
    },
    {
      title: 'Payments',
      icon: <FaCreditCard className="text-green-500" />,
      path: '/client/payments'
    },
    {
      title: 'Settings',
      icon: <FaUserCog className="text-gray-500 dark:text-gray-400" />,
      path: '/client/settings'
    }
  ];
  
  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setNotificationMenuOpen(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* User profile section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-conison-cyan to-conison-magenta flex items-center justify-center text-white font-bold text-lg">
            {currentUser?.name ? currentUser.name.charAt(0) : 'C'}
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-800 dark:text-white">{currentUser?.name || 'Client User'}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser?.email || 'client@example.com'}</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-150 ${
                  location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className="mr-3">{item.icon}</div>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Notifications dropdown */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="mb-4">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`w-full flex items-center justify-between px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
              showNotifications ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <div className="flex items-center">
              <FaBell className={`mr-3 ${
                notifications.some(n => !n.read) 
                  ? 'text-conison-magenta animate-pulse' 
                  : 'text-conison-cyan'
              }`} />
              <span>Notifications</span>
            </div>
            <div className="relative">
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
              {showNotifications ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-2 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
              >
                {/* Notification Controls */}
                {notifications.length > 0 && (
                  <div className="p-2 flex justify-between items-center bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs px-2 py-1 rounded text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center"
                      disabled={!notifications.some(n => !n.read)}
                    >
                      <FaCheck className="mr-1" /> Mark all read
                    </button>
                    <button 
                      onClick={clearAllNotifications}
                      className="text-xs px-2 py-1 rounded text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center"
                    >
                      <FaTrash className="mr-1" /> Clear all
                    </button>
                  </div>
                )}
                
                {/* Notifications List */}
                <div className="max-h-60 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div 
                        key={notification.id}
                        className={`relative p-3 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${
                          notification.read 
                            ? 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                            : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-200'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="cursor-pointer flex-1" onClick={() => navigateToNotification(notification.link, notification.id)}>
                            <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>{notification.message}</p>
                            <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">{notification.date}</p>
                          </div>
                          
                          <div className="relative">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                setNotificationMenuOpen(notificationMenuOpen === notification.id ? null : notification.id);
                              }}
                              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
                            >
                              <FaEllipsisH className="h-3 w-3" />
                            </button>
                            
                            {/* Notification Action Menu */}
                            {notificationMenuOpen === notification.id && (
                              <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                                <div className="py-1" onClick={(e) => e.stopPropagation()}>
                                  {!notification.read && (
                                    <button 
                                      onClick={() => markAsRead(notification.id)}
                                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                      Mark as read
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => deleteNotification(notification.id)}
                                    className="w-full text-left block px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-3">
                        <FaBell className="h-6 w-6 text-gray-400 dark:text-gray-500" />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">No notifications</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">We'll notify you when something arrives</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Theme toggle & Logout */}
        <div className="flex flex-col space-y-2">
          <button 
            onClick={toggleDarkMode}
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <span className="mr-3">🌓</span>
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export const SidebarLink = ({ link, open, animate }) => {
  return (
    <Link
      to={link.href}
      className="flex items-center px-4 py-3 text-gray-600 transition duration-150 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="ml-3 text-sm font-medium"
      >
        {link.label}
      </motion.span>
    </Link>
  );
}; 