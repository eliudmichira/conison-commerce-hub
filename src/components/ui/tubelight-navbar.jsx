import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useDarkMode } from '../../context/DarkModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaBriefcase, FaCogs, FaSun, FaMoon, FaChevronDown, FaPhoneAlt, FaInfoCircle } from 'react-icons/fa';
import { X, Menu } from 'lucide-react';

const NavBar = ({ items = [] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Improved navigation items structure
  const defaultItems = [
    { name: 'Home', path: '/', icon: FaHome },
    { 
      name: 'Services', 
      path: '/services', 
      icon: FaCogs, 
      subItems: [
        { name: 'Web Development', path: '/services/web-development' },
        { name: 'Mobile Development', path: '/services/mobile-development' },
        { name: 'AI/ML Solutions', path: '/services/ai-ml' },
        { name: 'Cloud Solutions', path: '/services/cloud-solutions' },
        { name: 'Business Consulting', path: '/services/consulting' }
      ]
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 transition-shadow duration-300 ${
        isScrolled
          ? 'shadow-md backdrop-blur-xl bg-white/90 dark:bg-gray-900/90'
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
            <div className="flex items-center rounded-xl bg-gray-100 dark:bg-gray-800/50 p-1">
              {navItems.map((item, index) => (
                <div key={index} className="relative">
                  <div className="flex items-center">
                    <Link
                      to={item.path || '#'}
                      className={`flex items-center px-2.5 lg:px-3 py-1.5 lg:py-2 text-sm lg:text-base font-medium rounded-lg transition-colors duration-200 ${
                        activeIndex === index
                          ? 'text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-800'
                          : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
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
          
          {/* Desktop ThemeToggle & Auth */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <ThemeToggle className="mr-0.5 lg:mr-1" />
            
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm lg:text-base font-medium shadow-sm transition-colors duration-200"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                to="/login" 
                className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-sm lg:text-base font-medium shadow-sm transition-colors duration-200"
              >
                Sign In
              </Link>
            )}
          </div>
          
          {/* Mobile Navigation Controls - Improved for touch */}
          <div className="flex items-center md:hidden space-x-1">
            <ThemeToggle size="sm" />
            
            <button
              onClick={toggleMobileMenu}
              className="p-1.5 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu - Enhanced for better touch and readability */}
      <div className="md:hidden">
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden bg-white dark:bg-gray-900 shadow-lg"
            >
              <div className="container mx-auto px-4 pb-4">
                <div className="py-3 space-y-1.5">
                  {navItems.map((item, index) => (
                    <div key={index} className="rounded-lg overflow-hidden">
                      <div className={`flex items-center justify-between ${
                        item.subItems ? 'pr-1' : 'rounded-lg'
                      } ${
                        activeIndex === index && !item.subItems 
                          ? 'bg-indigo-50 dark:bg-indigo-900/20' 
                          : ''
                      }`}>
                        <Link
                          to={item.path || '#'}
                          className={`flex items-center space-x-3 py-2.5 px-3 flex-1 font-medium text-sm ${
                            activeIndex === index
                              ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                              : 'text-gray-800 dark:text-gray-200'
                          } ${item.subItems ? '' : 'rounded-lg'}`}
                          onClick={() => {
                            if (!item.subItems) {
                              setActiveIndex(index);
                              setIsMobileMenuOpen(false);
                            }
                          }}
                        >
                          {React.createElement(item.icon, { className: 'w-4 h-4 opacity-80' })}
                          <span>{item.name}</span>
                        </Link>
                        
                        {item.subItems && (
                          <button
                            onClick={() => handleDropdownToggle(index)}
                            className="p-2.5 text-gray-600 dark:text-gray-300"
                          >
                            <FaChevronDown 
                              className={`w-3 h-3 transition-transform duration-200 ${
                                activeDropdown === index ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                        )}
                      </div>
                      
                      {item.subItems && (
                        <AnimatePresence>
                          {activeDropdown === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="bg-gray-50 dark:bg-gray-800/50 rounded-b-lg overflow-hidden"
                            >
                              <div className="pt-1 pb-1.5 px-2">
                                {item.subItems.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className={`flex items-center rounded-md px-3 py-2 my-0.5 text-sm ${
                                      location.pathname === subItem.path
                                        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 mr-2.5"></span>
                                    {subItem.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  ))}

                  {/* Login/Logout button for mobile - Improved touch target */}
                  <div className="mt-3 px-2">
                    {isAuthenticated ? (
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full py-2.5 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm shadow-sm"
                      >
                        Sign Out
                      </button>
                    ) : (
                      <Link 
                        to="/login" 
                        className="block w-full text-center py-2.5 px-4 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-sm shadow-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

// ThemeToggle component
const ThemeToggle = ({ className = '', size = 'md' }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <button
      onClick={toggleDarkMode}
      className={`p-${size === 'sm' ? '1' : '2'} rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${className}`}
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <FaSun className={`w-${size === 'sm' ? '4' : '5'} h-${size === 'sm' ? '4' : '5'}`} />
      ) : (
        <FaMoon className={`w-${size === 'sm' ? '4' : '5'} h-${size === 'sm' ? '4' : '5'}`} />
      )}
    </button>
  );
};

export default NavBar; 