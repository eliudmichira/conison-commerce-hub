import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaFileAlt, FaTag, FaCogs, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';

const NavBar = ({ items = [] }) => {
  const [, setActiveIndex] = useState(0);
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

  // Use provided items or default items
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

  // Use isAuthenticated in the component
  const isAuthenticated = !!user;

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? isDarkMode 
            ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800'
            : 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md'
          : isDarkMode 
            ? 'bg-transparent' 
            : 'bg-gradient-to-b from-gray-900/50 to-transparent backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center text-2xl font-bold text-conison-magenta">
              <img 
                src={`${process.env.PUBLIC_URL}/conison_transparent_upscaled.png`}
                alt="Conison" 
                className="h-16 md:h-20" 
              />
            </Link>
            
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path ? 'text-conison-magenta' : ''
                  } ${
                    isScrolled 
                      ? isDarkMode 
                        ? 'text-white hover:text-conison-magenta' 
                        : 'text-gray-800 hover:text-conison-magenta'
                      : isDarkMode
                        ? 'text-white hover:text-conison-magenta' 
                        : 'text-gray-800 hover:text-conison-magenta'
                  }`}
                >
                  {React.createElement(item.icon, { className: 'w-4 h-4' })}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isScrolled
                  ? isDarkMode
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  : isDarkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-800/20 text-gray-800 hover:bg-gray-800/30'
              }`}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isScrolled
                    ? isDarkMode
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-conison-magenta hover:bg-conison-magenta-hover text-white'
                    : isDarkMode
                      ? 'bg-white text-gray-900 hover:bg-white/90'
                      : 'bg-conison-magenta text-white hover:bg-conison-magenta-hover'
                }`}
              >
                Sign Out
              </button>
            ) : (
              <Link to="/login">
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isScrolled
                      ? isDarkMode
                        ? 'bg-conison-magenta text-white hover:bg-conison-magenta-hover'
                        : 'bg-conison-magenta text-white hover:bg-conison-magenta-hover'
                      : isDarkMode
                        ? 'bg-white text-gray-900 hover:bg-white/90'
                        : 'bg-conison-magenta text-white hover:bg-conison-magenta-hover'
                  }`}
                >
                  Sign In
                </button>
              </Link>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors duration-200 ${
                isScrolled
                  ? isDarkMode
                    ? 'bg-gray-800 text-gray-200 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  : isDarkMode
                    ? 'bg-white/10 text-white hover:bg-white/20'
                    : 'bg-gray-800/20 text-gray-800 hover:bg-gray-800/30'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 transition-all duration-300 ${
            isMobileMenuOpen 
              ? 'opacity-100 visible' 
              : 'opacity-0 invisible'
          } ${
            isDarkMode 
              ? 'bg-gray-900/95 backdrop-blur-md' 
              : 'bg-white/95 backdrop-blur-md'
          }`}
          style={{ top: '5rem' }}
        >
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 text-lg font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-conison-magenta'
                      : isDarkMode 
                        ? 'text-white hover:text-conison-magenta'
                        : 'text-gray-800 hover:text-conison-magenta'
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
        </div>
      </div>
    </motion.nav>
  );
};

export default NavBar; 