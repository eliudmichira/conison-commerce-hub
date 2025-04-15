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
      { name: 'Mobile Development', path: '/services/mobile-development' },
      { name: 'AI & ML Solutions', path: '/services/ai-ml' },
      { name: 'Cloud Solutions', path: '/services/cloud-solutions' },
      { name: 'Business Consulting', path: '/services/business-consulting' },
      { name: 'Motion Graphics', path: '/services/motion-graphics' },
      { name: 'Cybersecurity', path: '/services/cybersecurity' },
      { name: 'Digital Marketing', path: '/services/digital-marketing' },
      { name: 'Graphic Design', path: '/services/graphic-design' },
      { name: 'Branding', path: '/services/branding' }
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
    { icon: Facebook, url: 'https://web.facebook.com/Conisontech213?_rdc=1&_rdr#', label: 'Facebook' },
    { icon: Twitter, url: 'https://twitter.com/conison', label: 'Twitter' },
    { icon: Instagram, url: 'https://instagram.com/conison', label: 'Instagram' },
    { icon: Linkedin, url: 'https://linkedin.com/company/conison', label: 'LinkedIn' }
  ];

  const contactInfo = [
    { icon: Mail, text: 'info@conisontechnologies.com', type: 'email', label: 'Email us' },
    { icon: Phone, text: '+211 920 504 110', type: 'tel', label: 'Call us' },
    { icon: MapPin, text: 'Juba, South Sudan', type: 'address', label: 'Our location' },
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
              <Link to="/" className="flex items-center">
                <img 
                  src="/conison_transparent_upscaled.png" 
                  alt="Conison" 
                  className="h-40" 
                />
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
                  className={`