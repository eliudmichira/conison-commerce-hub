import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaFileAlt, FaTag, FaCogs, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const NavBar = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isAuthenticated, logout } = useAuth();

  // Map of icon names to actual components
  const iconMap = {
    FaHome: <FaHome />,
    FaUser: <FaUser />,
    FaBriefcase: <FaBriefcase />,
    FaFileAlt: <FaFileAlt />,
    FaTag: <FaTag />,
    FaCogs: <FaCogs />
  };

  useEffect(() => {
    const currentPath = location.pathname;
    const index = items.findIndex(item => item.path === currentPath);
    if (index !== -1) {
      setActiveIndex(index);
    }
  }, [location, items]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      console.log('Logging out...');
      logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Get the proper icon component
  const getIcon = (iconName) => {
    return iconMap[iconName] || null;
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-conison-magenta">
            Conison
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {items.map((item, index) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'text-conison-magenta'
                    : isDarkMode
                      ? 'text-gray-300 hover:text-conison-magenta'
                      : 'text-gray-600 hover:text-conison-magenta'
                }`}
                onClick={() => setActiveIndex(index)}
              >
                <span className="w-5 h-5">{getIcon(item.icon)}</span>
                <span>{item.name}</span>
                {activeIndex === index && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-conison-magenta"
                    layoutId="underline"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/client"
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-conison-magenta transition-colors"
                >
                  <FaUser className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-conison-magenta text-white hover:bg-conison-magenta-dark transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-white bg-conison-magenta hover:bg-conison-magenta-dark px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-medium text-conison-magenta border border-conison-magenta hover:bg-conison-magenta hover:text-white px-4 py-2 rounded-md transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4 space-y-4"
            >
              {items.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? 'bg-conison-magenta/10 text-conison-magenta'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <span className="w-5 h-5">{getIcon(item.icon)}</span>
                  <span>{item.name}</span>
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="space-y-4 px-4">
                  <Link
                    to="/client"
                    className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUser className="w-5 h-5" />
                    <span>Dashboard</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full mt-4 px-4 py-2 rounded-lg bg-conison-magenta text-white hover:bg-conison-magenta-dark transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-4 px-4">
                  <Link
                    to="/login"
                    className="block text-center w-full bg-conison-magenta text-white px-4 py-2 rounded-lg hover:bg-conison-magenta-dark transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block text-center w-full text-conison-magenta border border-conison-magenta px-4 py-2 rounded-lg hover:bg-conison-magenta hover:text-white transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default NavBar; 