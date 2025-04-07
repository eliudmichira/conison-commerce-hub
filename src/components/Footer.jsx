import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <footer className={`py-12 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Conison</h3>
            <p className="mb-4">
              Empowering businesses with innovative digital solutions and creative services.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-conison-magenta transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-conison-magenta transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-conison-magenta transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-conison-magenta transition-colors">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-conison-magenta transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-conison-magenta transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-conison-magenta transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/portfolio" className="hover:text-conison-magenta transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link to="/rate-card" className="hover:text-conison-magenta transition-colors">Rate Card</Link>
              </li>
              <li>
                <Link to="/quote-request" className="hover:text-conison-magenta transition-colors">Quote Request</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services/mobile-development" className="hover:text-conison-magenta transition-colors">Mobile Development</Link>
              </li>
              <li>
                <Link to="/services/web-development" className="hover:text-conison-magenta transition-colors">Web Development</Link>
              </li>
              <li>
                <Link to="/services/software-development" className="hover:text-conison-magenta transition-colors">Software Development</Link>
              </li>
              <li>
                <Link to="/services/ui-ux-design" className="hover:text-conison-magenta transition-colors">UI/UX Design</Link>
              </li>
              <li>
                <Link to="/services/digital-marketing" className="hover:text-conison-magenta transition-colors">Digital Marketing</Link>
              </li>
              <li>
                <Link to="/services/cloud-solutions" className="hover:text-conison-magenta transition-colors">Cloud Solutions</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaPhone className="mr-2 text-conison-magenta" />
                <a href="tel:+254796881472" className="hover:text-conison-magenta transition-colors">
                  +254 796 881 472
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-conison-magenta" />
                <a href="mailto:info@conison.com" className="hover:text-conison-magenta transition-colors">
                  info@conison.com
                </a>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-conison-magenta" />
                <span>Nairobi, Kenya</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p>&copy; {new Date().getFullYear()} Conison. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 