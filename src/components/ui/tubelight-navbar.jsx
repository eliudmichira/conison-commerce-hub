import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaFileAlt, FaTag, FaCogs, FaSun, FaMoon, FaBars, FaTimes, FaUserCircle, FaCode, FaMobile, FaPalette, FaGlobe, FaRobot, FaCloud, FaShieldAlt, FaPaintBrush, FaVideo, FaHandshake, FaEnvelope } from 'react-icons/fa';

const NavBar = ({ items = [] }) => {
  const [, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { isAuthenticated, logout } = useAuth();

  // Default navigation items if none are provided
  const defaultItems = [
    { name: 'Home', path: '/', icon: 'FaHome' },
    { 
      name: 'Services', 
      path: '/services', 
      icon: 'FaCogs',
      dropdown: [
        { name: 'Web Development', path: '/services/web-development', icon: 'FaCode' },
        { name: 'Mobile Development', path: '/services/mobile-development', icon: 'FaMobile' },
        { name: 'UI/UX Design', path: '/services/ui-ux-design', icon: 'FaPalette' },
        { name: 'Digital Marketing', path: '/services/digital-marketing', icon: 'FaGlobe' },
        { name: 'AI & ML', path: '/services/ai-ml', icon: 'FaRobot' },
        { name: 'Cloud Solutions', path: '/services/cloud-solutions', icon: 'FaCloud' },
        { name: 'Animation & Video', path: '/services/animation-video-production', icon: 'FaVideo' },
        { name: 'Cybersecurity', path: '/services/cybersecurity', icon: 'FaShieldAlt' },
        { name: 'Consulting', path: '/services/consulting', icon: 'FaHandshake' }
      ]
    },
    { name: 'Portfolio', path: '/portfolio', icon: 'FaBriefcase' },
    { name: 'Rate Card', path: '/rate-card', icon: 'FaTag' },
    { name: 'Quote Request', path: '/quote-request', icon: 'FaFileAlt' },
    { name: 'About', path: '/about', icon: 'FaUser' },
    { name: 'Contact', path: '/contact', icon: 'FaFileAlt' }
  ];

  // Use provided items or default items
  const navItems = items.length > 0 ? items : defaultItems;

  // Map of icon names to actual components
  const iconMap = {
    FaHome: <FaHome />,
    FaUser: <FaUser />,
    FaBriefcase: <FaBriefcase />,
    FaFileAlt: <FaFileAlt />,
    FaTag: <FaTag />,
    FaCogs: <FaCogs />,
    FaUserCircle: <FaUserCircle />,
    FaCode: <FaCode />,
    FaMobile: <FaMobile />,
    FaPalette: <FaPalette />,
    FaGlobe: <FaGlobe />,
    FaRobot: <FaRobot />,
    FaCloud: <FaCloud />,
    FaShieldAlt: <FaShieldAlt />,
    FaPaintBrush: <FaPaintBrush />,
    FaVideo: <FaVideo />,
    FaHandshake: <FaHandshake />,
    FaEnvelope: <FaEnvelope />
  };

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
    // Logging out logic
    try {
      logout();
      navigate('/');
    } catch (error) {
      // Logout failed logic
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
            {navItems.map((item, index) => (
              <div key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className={`relative flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
                    location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
                      ? 'text-conison-magenta'
                      : isDarkMode
                        ? 'text-gray-300 hover:text-conison-magenta'
                        : 'text-gray-600 hover:text-conison-magenta'
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <span className="w-5 h-5">{getIcon(item.icon)}</span>
                  <span>{item.name}</span>
                </Link>
                
                {item.dropdown && (
                  <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-md shadow-lg overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className={`py-1 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`flex items-center space-x-2 px-4 py-2 text-sm ${
                            isDarkMode
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-conison-magenta'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.icon && <span className="text-conison-magenta">{getIcon(subItem.icon)}</span>}
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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

            {/* Profile/Auth Button */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/client"
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-conison-magenta transition-colors"
                >
                  <FaUserCircle className="w-5 h-5" />
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
              <Link
                to="/login"
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-conison-magenta transition-colors"
              >
                <FaUserCircle className="w-5 h-5" />
                <span>Login</span>
              </Link>
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
              {navItems.map((item, index) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                      location.pathname === item.path || location.pathname.startsWith(`${item.path}/`)
                        ? 'bg-conison-magenta/10 text-conison-magenta'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => {
                      if (!item.dropdown) {
                        setActiveIndex(index);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-5 h-5">{getIcon(item.icon)}</span>
                      <span>{item.name}</span>
                    </div>
                  </Link>
                  
                  {/* Mobile dropdown items */}
                  {item.dropdown && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.dropdown.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm ${
                            isDarkMode
                              ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-conison-magenta'
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {subItem.icon && <span className="text-conison-magenta">{getIcon(subItem.icon)}</span>}
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isAuthenticated ? (
                <div className="space-y-4 px-4">
                  <Link
                    to="/client"
                    className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUserCircle className="w-5 h-5" />
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
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <FaUserCircle className="w-5 h-5" />
                  <span>Login</span>
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default NavBar; 