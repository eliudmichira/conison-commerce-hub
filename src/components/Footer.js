// components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 text-conison-gray dark:text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="mb-4 overflow-hidden">
              <img 
                src="/images/conison_logo_large.png" 
                alt="Conison Technologies Logo" 
                className="h-20"
              />
            </div>
            <p className="mb-4">
              Empowering businesses through innovative digital solutions tailored to your needs.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-conison-cyan hover:text-conison-magenta dark:text-conison-cyan dark:hover:text-conison-magenta transition-colors">
                <FaFacebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-conison-cyan hover:text-conison-magenta dark:text-conison-cyan dark:hover:text-conison-magenta transition-colors">
                <FaTwitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-conison-cyan hover:text-conison-magenta dark:text-conison-cyan dark:hover:text-conison-magenta transition-colors">
                <FaInstagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-conison-cyan hover:text-conison-magenta dark:text-conison-cyan dark:hover:text-conison-magenta transition-colors">
                <FaLinkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-conison-cyan dark:text-conison-cyan">Services</h3>
            <div className="grid grid-cols-2 gap-x-4">
              <ul className="space-y-2">
                <li>
                  <Link to="/services/web-development" className="hover:text-conison-magenta transition-colors">Web Development</Link>
                </li>
                <li>
                  <Link to="/services/mobile-development" className="hover:text-conison-magenta transition-colors">Mobile Development</Link>
                </li>
                <li>
                  <Link to="/services/ai-ml" className="hover:text-conison-magenta transition-colors">AI & ML Solutions</Link>
                </li>
                <li>
                  <Link to="/services/cloud-solutions" className="hover:text-conison-magenta transition-colors">Cloud Solutions</Link>
                </li>
                <li>
                  <Link to="/services/business-consulting" className="hover:text-conison-magenta transition-colors">Business Consulting</Link>
                </li>
              </ul>
              <ul className="space-y-2">
                <li>
                  <Link to="/services/motion-graphics" className="hover:text-conison-magenta transition-colors">Motion Graphics</Link>
                </li>
                <li>
                  <Link to="/services/cybersecurity" className="hover:text-conison-magenta transition-colors">Cybersecurity</Link>
                </li>
                <li>
                  <Link to="/services/digital-marketing" className="hover:text-conison-magenta transition-colors">Digital Marketing</Link>
                </li>
                <li>
                  <Link to="/services/graphic-design" className="hover:text-conison-magenta transition-colors">Graphic Design</Link>
                </li>
                <li>
                  <Link to="/services/branding" className="hover:text-conison-magenta transition-colors">Branding</Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-conison-cyan dark:text-conison-cyan">Quick Links</h3>
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
                <Link to="/contact" className="hover:text-conison-magenta transition-colors">Contact</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-conison-cyan dark:text-conison-cyan">Contact Us</h3>
            <div className="space-y-2">
              {/* Kenya Office */}
              <div>
                <h4 className="font-semibold mb-2 text-conison-magenta">Kenya</h4>
                <address className="not-italic">
                  <p className="mb-2">Nairobi, Kenya</p>
                  <p className="mb-2">
                    <a href="tel:+254796881472" className="hover:text-conison-magenta transition-colors">+254 796 881 472</a>
                  </p>
                </address>
              </div>
              
              {/* South Sudan Office */}
              <div>
                <h4 className="font-semibold mb-2 text-conison-magenta">South Sudan</h4>
                <address className="not-italic">
                  <p className="mb-2">Office Number 7, Baping Business Centre</p>
                  <p className="mb-2">Hai Sujun, Juba, South Sudan</p>
                  <p className="mb-2">
                    <a href="tel:+211920504110" className="hover:text-conison-magenta transition-colors">+211 920 504 110</a>
                  </p>
                </address>
              </div>
              
              {/* Email */}
              <div>
                <p>
                  <a href="mailto:info@conisontechnologies.com" className="hover:text-conison-magenta transition-colors">info@conisontechnologies.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 text-center">
          <p>&copy; {currentYear} Conison Technologies. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <Link to="/privacy-policy" className="text-sm hover:text-conison-magenta transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-sm hover:text-conison-magenta transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;