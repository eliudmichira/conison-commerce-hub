import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaFileAlt, FaTag, FaCogs, FaSun, FaMoon, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';

const NavBar = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { user, logout } = useAuth();

  // Default navigation items if none are provided
  const defaultItems = [
    { name: 'Services', path: '/services', icon: FaCogs, subItems: [
    { name: 'Rate Card', path: '/rate-card', icon: FaTag },
      { name: 'Quote Request', path: '/quote-request', icon: FaFileAlt }
    ]},
    { name: 'Portfolio', path: '/portfolio', icon: FaBriefcase, subItems: [
    { name: 'About', path: '/about', icon: FaUser },
    { name: 'Contact', path: '/contact', icon: FaFileAlt }
    ]}
  ];

  const navItems = items.length > 0 ? items : defaultItems;

  useEffect(() => {
    const currentPath = location.pathname;
    const index = navItems.findIndex(item => item.path === currentPath);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location, navItems]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isAuthenticated = !!user;

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg' 
          : 'bg-white/95 dark:bg-gray-900/80 backdrop-blur-md'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center">
              <img 
                src="/conison_transparent_upscaled.png" 
                alt="Conison" 
                className="h-20 md:h-24 transition-transform hover:scale-105" 
              />
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                    className="relative"
                  onClick={() => setActiveIndex(index)}
                >
                  <span className={`flex items-center gap-2 text-base font-medium transition-colors duration-200 ${
                    isScrolled 
                      ? 'text-gray-800 dark:text-gray-200 group-hover:text-indigo-500 dark:group-hover:text-indigo-400' 
                      : 'text-gray-800 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400'
                  }`}
                  >
                    {React.createElement(item.icon, { className: 'w-5 h-5' })}
                    {item.name}
                      {item.subItems && <FaChevronDown className="w-3 h-3 ml-1" />}
                  </span>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-500 dark:bg-indigo-400 transition-all duration-300 group-hover:w-full ${
                    activeIndex === index ? 'w-full' : ''
                  }`} />
                </Link>
                  
                  {/* Dropdown menu */}
                  {item.subItems && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="py-1">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {React.createElement(subItem.icon, { className: 'w-4 h-4 mr-2' })}
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className={`px-5 py-2.5 rounded-lg text-base font-semibold transition-all duration-300 ${
                  isScrolled
                    ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-md hover:shadow-lg'
                    : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-md hover:shadow-lg'
                }`}
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login">
                <button
                  className={`px-5 py-2.5 rounded-lg text-base font-semibold transition-all duration-300 ${
                    isScrolled
                      ? 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-md hover:shadow-lg'
                      : 'bg-indigo-500 hover:bg-indigo-600 text-white shadow-md hover:shadow-lg'
                  }`}
                >
                  Sign In
                </button>
              </Link>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2.5 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 backdrop-blur-md z-40"
              style={{ top: '6rem' }}
            >
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-6">
                  {navItems.map((item, index) => (
                    <div key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 text-lg font-medium transition-colors duration-200 ${
                        activeIndex === index
                          ? 'text-indigo-500 dark:text-indigo-400'
                          : 'text-gray-800 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400'
                      }`}
                      onClick={() => {
                        setActiveIndex(index);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {React.createElement(item.icon, { className: 'w-6 h-6' })}
                      {item.name}
                    </Link>
                      {item.subItems && (
                        <div className="ml-9 mt-2 space-y-2">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className="flex items-center gap-3 text-base font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {React.createElement(subItem.icon, { className: 'w-5 h-5' })}
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default NavBar; 