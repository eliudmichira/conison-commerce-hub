
import { Link } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Subscribe logic would go here
    alert(`Thanks for subscribing with: ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <h3 className="text-xl font-semibold mb-6">About Conison</h3>
            <p className="text-gray-300 mb-4">
              Conison Technologies provides comprehensive digital solutions and IT services to businesses in South Sudan and beyond.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-white transition-colors">Portfolio</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-conison-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">Juba Town, near Baping Insurance, South Sudan</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-conison-500 flex-shrink-0" />
                <a href="tel:+211920504110" className="text-gray-300 hover:text-white transition-colors">+211 920 504 110</a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-conison-500 flex-shrink-0" />
                <a href="mailto:conisonstech@gmail.com" className="text-gray-300 hover:text-white transition-colors">conisonstech@gmail.com</a>
              </li>
              <li className="flex items-center">
                <Clock className="mr-3 h-5 w-5 text-conison-500 flex-shrink-0" />
                <span className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button 
                  type="submit"
                  className="bg-conison-600 hover:bg-conison-700 text-white"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mt-6 pt-6">
          <div className="text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Conison Technologies. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
