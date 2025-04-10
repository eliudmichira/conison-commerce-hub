import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  ChevronRight,
  ArrowUp,
  Send
} from 'lucide-react';

const Footer = () => {
  const { isDarkMode } = useDarkMode();
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerLinks = {
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Services', path: '/services' },
      { name: 'Portfolio', path: '/portfolio' },
      { name: 'Case Studies', path: '/case-studies' },
      { name: 'Contact', path: '/contact' }
    ],
    services: [
      { name: 'Web Development', path: '/services/web-development' },
      { name: 'Mobile Apps', path: '/services/mobile-apps' },
      { name: 'UI/UX Design', path: '/services/ui-ux-design' },
      { name: 'Digital Marketing', path: '/services/digital-marketing' },
      { name: 'E-commerce Solutions', path: '/services/ecommerce' }
    ],
    support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Careers', path: '/careers' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com/conison', label: 'Facebook' },
    { icon: Twitter, url: 'https://twitter.com/conison', label: 'Twitter' },
    { icon: Instagram, url: 'https://instagram.com/conison', label: 'Instagram' },
    { icon: Linkedin, url: 'https://linkedin.com/company/conison', label: 'LinkedIn' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'info@conisontechnologies.com', type: 'email', label: 'Email us' },
    { icon: Phone, text: '+211 92 668 5125', type: 'tel', label: 'Call us' },
    { icon: MapPin, text: 'Juba Town, Near Baping Insurance Company, South Sudan', type: 'address', label: 'Our location' },
    { icon: Clock, text: 'Mon-Fri: 9:00 AM - 6:00 PM', type: 'hours', label: 'Working hours' }
  ];

  // Animation variants
  const socialIconVariants = {
    hover: { 
      y: -5, 
      scale: 1.1,
      transition: { type: 'spring', stiffness: 400 }
    }
  };

  const linkVariants = {
    hover: { 
      x: 5,
      color: '#d946ef', // conison-magenta color
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  return (
    <footer className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} relative`}>
      {/* Top gradient accent */}
      <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-conison-magenta w-full"></div>
      
      {/* Newsletter Section */}
      <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-10`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-conison-magenta">
                Stay Updated
              </h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
                Subscribe to our newsletter for the latest news and tech insights.
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className={`flex-grow px-4 py-3 rounded-lg outline-none ${
                    isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
                  } focus:ring-2 focus:ring-conison-magenta transition-all duration-200`}
                  aria-label="Email for newsletter"
                />
                <button 
                  type="submit" 
                  className="px-6 py-3 rounded-lg bg-conison-magenta text-white font-medium flex items-center gap-2 hover:bg-purple-600 transition-colors duration-200"
                  aria-label="Subscribe to newsletter"
                >
                  Subscribe <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <Link to="/">
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-conison-magenta">
                  Conison
                </h3>
              </Link>
            </div>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Transforming businesses through innovative technology solutions and cutting-edge digital experiences.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  className={`p-2 rounded-full ${
                    isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
                  } shadow-sm transition-colors duration-200`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-conison-magenta" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-5 flex items-center">
              <span className="h-5 w-1 bg-conison-magenta rounded-full mr-2"></span>
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <motion.li key={index} whileHover="hover">
                  <Link
                    to={link.path}
                    className={`hover:text-conison-magenta transition-colors flex items-center ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <motion.span variants={linkVariants}>
                      <ChevronRight className="w-4 h-4 inline mr-1 text-conison-magenta opacity-0 group-hover:opacity-100" />
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-5 flex items-center">
              <span className="h-5 w-1 bg-conison-magenta rounded-full mr-2"></span>
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <motion.li key={index} whileHover="hover">
                  <Link
                    to={link.path}
                    className={`hover:text-conison-magenta transition-colors flex items-center group ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <motion.span variants={linkVariants}>
                      <ChevronRight className="w-4 h-4 inline mr-1 text-conison-magenta opacity-0 group-hover:opacity-100" />
                      {link.name}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-5 flex items-center">
              <span className="h-5 w-1 bg-conison-magenta rounded-full mr-2"></span>
              Contact Us
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className={`p-2 rounded-full ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  } shadow-sm`}>
                    <item.icon className="w-5 h-5 text-conison-magenta" />
                  </div>
                  <div>
                    <span className="text-xs text-conison-magenta font-medium block">
                      {item.label}
                    </span>
                    {item.type === 'email' ? (
                      <a
                        href={`mailto:${item.text}`}
                        className={`hover:text-conison-magenta transition-colors ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {item.text}
                      </a>
                    ) : item.type === 'tel' ? (
                      <a
                        href={`tel:${item.text.replace(/\D/g, '')}`}
                        className={`hover:text-conison-magenta transition-colors ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className={`${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {item.text}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Area with Copyright and Legal */}
        <div className={`mt-12 pt-8 border-t ${
          isDarkMode ? 'border-gray-800' : 'border-gray-200'
        } flex flex-col md:flex-row justify-between items-center`}>
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              © {currentYear} Conison. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-6">
            {footerLinks.support.slice(0, 3).map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className={`text-sm hover:text-conison-magenta transition-colors ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-conison-magenta text-white shadow-lg z-50"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </footer>
  );
};

export default Footer;