import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaBriefcase, FaCogs, FaSun, FaMoon, FaChevronDown, FaPhoneAlt, FaInfoCircle } from 'react-icons/fa';
import { X, Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';

const NavBar = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // Improved navigation items structure
  const defaultItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { 
      name: 'Services', 
      path: '/services', 
      icon: FaCogs, 
    },
    { 
      name: 'Portfolio', 
      path: '/portfolio', 
      icon: FaBriefcase 
    },
    { 
      name: 'Company', 
      path: '/about', 
      icon: FaInfoCircle, 
      subItems: [
        { name: 'About Us', path: '/about' },
        { name: 'Rate Card', path: '/rate-card' }
      ]
    },
    { name: 'Contact', path: '/contact', icon: FaPhoneAlt }
  ];

  const navItems = items.length > 0 ? items : defaultItems;

  useEffect(() => {
    const currentPath = location.pathname;
    
    // Find the main nav item that matches the current path
    let index = navItems.findIndex(item => item.path === currentPath);
    
    // If not found, check if it's a sub-item
    if (index === -1) {
      index = navItems.findIndex(item => 
        item.subItems?.some(subItem => subItem.path === currentPath)
      );
    }
    
    if (index !== -1) {
      setActiveIndex(index);
    }
    
    // Close mobile menu on navigation
    setIsMobileMenuOpen(false);
  }, [location, navItems]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isAuthenticated = !!user;

  const handleDropdownToggle = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Determine if we're on the homepage for special styling
  const isHomePage = location.pathname === '/';

  return (
    <motion.nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? isDarkMode 
            ? 'bg-gray-900/85 backdrop-blur-md shadow-lg shadow-black/10'
            : 'bg-white/85 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center" onClick={() => setActiveIndex(0)}>
              <img 
                src="/images/conison_logo_large.png" 
                alt="Conison Technologies" 
                className="h-8 sm:h-9 md:h-10"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <div className={`flex items-center rounded-xl ${
              isScrolled || !isHomePage 
                ? 'bg-gray-100/80 dark:bg-gray-800/70' 
                : 'bg-gray-900/30 dark:bg-gray-900/40 backdrop-blur-sm'
            } p-1`}>
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center">
                    <Link
                      to={item.path || '#'}
                      className={`flex items-center px-2.5 lg:px-3 py-1.5 lg:py-2 text-sm lg:text-base font-medium rounded-lg transition-colors duration-200 ${
                        activeIndex === index
                          ? isScrolled || !isHomePage
                            ? 'text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800'
                            : 'text-white bg-white/20 backdrop-blur-sm'
                          : isScrolled || !isHomePage
                            ? 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                            : 'text-gray-100 hover:text-white hover:bg-white/10'
                      }`}
                      onClick={(e) => {
                        if (item.subItems) {
                          e.preventDefault();
                          handleDropdownToggle(index);
                        } else {
                          setActiveIndex(index);
                        }
                      }}
                    >
                      {React.createElement(item.icon, { className: 'mr-1.5 w-4 h-4 opacity-80' })}
                      {item.name}
                      {item.subItems && (
                        <FaChevronDown 
                          className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                            activeDropdown === index ? 'rotate-180' : ''
                          }`} 
                        />
                      )}
                    </Link>
                  </div>
                  
                  {/* Dropdown menu with better responsiveness */}
                  {item.subItems && (
                    <AnimatePresence>
                      {activeDropdown === index && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-1 z-10 w-48 lg:w-56 bg-white dark:bg-gray-800 rounded-xl shadow-lg py-1 border border-gray-100 dark:border-gray-700"
                          style={{ width: 'max-content', minWidth: '180px' }}
                        >
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.path}
                              to={subItem.path}
                              className={`flex items-center px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                                location.pathname === subItem.path
                                  ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                                  : 'text-gray-700 dark:text-gray-300'
                              }`}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 mr-2.5"></span>
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Dark Mode Toggle - Always visible */}
            <ThemeToggle />
            
            {/* Login/Account Button - Simple version optimized for mobile */}
            <div className="hidden md:block">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 rounded-lg px-3 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-colors"
                >
                  <span className="hidden xs:inline">Logout</span>
                </button>
              ) : (
                <Link to="/login" className={`flex items-center space-x-1 rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition-colors ${
                  isScrolled || !isHomePage
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-indigo-600/90 hover:bg-indigo-600 text-white backdrop-blur-sm'
                }`}>
                  <span className="xs:inline">Login</span>
                </Link>
              )}
            </div>

            {/* Use our MobileMenu component with the styling of the example */}
            <MobileMenu 
              navItems={navItems}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              isScrolled={isScrolled}
              isAuthenticated={isAuthenticated}
              handleLogout={handleLogout}
              isDarkMode={isDarkMode}
              isHomePage={isHomePage}
              activeDropdown={activeDropdown}
              handleDropdownToggle={handleDropdownToggle}
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

// Theme toggle component
const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <button
      onClick={toggleDarkMode}
      className={`rounded-lg p-1.5 shadow-sm border ${
        isDarkMode 
          ? 'bg-gray-800 text-yellow-300 border-gray-700 hover:bg-gray-700' 
          : 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200'
      }`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <FaSun className="w-4 h-4" />
      ) : (
        <FaMoon className="w-4 h-4" />
      )}
    </button>
  );
};

export default NavBar; 