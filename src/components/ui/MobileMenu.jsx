import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Menu } from 'lucide-react';
import { FaChevronDown } from 'react-icons/fa';

const MobileMenu = ({ 
  navItems, 
  activeIndex, 
  setActiveIndex, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  isScrolled,
  isAuthenticated,
  handleLogout,
  isDarkMode,
  isHomePage,
  activeDropdown,
  handleDropdownToggle
}) => {
  const location = useLocation();
  
  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        className={`md:hidden rounded-lg p-1.5 shadow-sm border ${
          isDarkMode 
            ? 'bg-gray-800 text-gray-100 border-gray-700 hover:bg-gray-700' 
            : isScrolled || !isHomePage
              ? 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300'
              : 'bg-white/30 text-white border-white/30 hover:bg-white/40 backdrop-blur-sm'
        }`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
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
                      className="w-full py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-sm transition-colors"
                    >
                      Sign Out
                    </button>
                  ) : (
                    <Link 
                      to="/login" 
                      className="block w-full text-center py-2.5 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-sm transition-colors"
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
    </>
  );
};

export default MobileMenu; 