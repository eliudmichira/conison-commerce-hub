import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaFileAlt, FaTag, FaCogs, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

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
    { name: 'Home', path: '/', icon: FaHome },
    { name: 'Services', path: '/services', icon: FaCogs },
    { name: 'Portfolio', path: '/portfolio', icon: FaBriefcase },
    { name: 'Rate Card', path: '/rate-card', icon: FaTag },
    { name: 'Quote Request', path: '/quote-request', icon: FaFileAlt },
    { name: 'About', path: '/about', icon: FaUser },
    { name: 'Contact', path: '/contact', icon: FaFileAlt }
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
          ? 'bg-white dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-lg' 
          : 'bg-white/90 dark:bg-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center">
              <img 
                src="/conison_transparent_upscaled.png" 
                alt="Conison" 
                className="h-16 md:h-20 transition-transform hover:scale-105" 
              />
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group"
                  onClick={() => setActiveIndex(index)}
                >
                  <span className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                    isScrolled 
                      ? 'text-gray-800 dark:text-gray-200 group-hover:text-conison-magenta' 
                      : 'text-gray-800 dark:text-white group-hover:text-conison-magenta'
                  }`}
                  >
                    {React.createElement(item.icon, { className: 'w-4 h-4' })}
                    {item.name}
                  </span>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-conison-magenta transition-all duration-300 group-hover:w-full ${
                    activeIndex === index ? 'w-full' : ''
                  }`} />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  isScrolled
                    ? 'bg-conison-magenta text-white hover:bg-conison-magenta-dark'
                    : 'bg-conison-magenta text-white hover:bg-conison-magenta-dark'
                }`}
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login">
                <button
                  className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                    isScrolled
                      ? 'bg-conison-magenta text-white hover:bg-conison-magenta-dark'
                      : 'bg-conison-magenta text-white hover:bg-conison-magenta-dark'
                  }`}
                >
                  Sign In
                </button>
              </Link>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  : 'bg-gray-100 dark:bg-white/10 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
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
              className="md:hidden fixed inset-0 bg-white dark:bg-gray-900 backdrop-blur-md"
              style={{ top: '5rem' }}
            >
              <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col gap-6">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-2 text-lg font-medium transition-colors duration-200 ${
                        activeIndex === index
                          ? 'text-conison-magenta'
                          : 'text-gray-800 dark:text-gray-200 hover:text-conison-magenta'
                      }`}
                      onClick={() => {
                        setActiveIndex(index);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {React.createElement(item.icon, { className: 'w-5 h-5' })}
                      {item.name}
                    </Link>
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