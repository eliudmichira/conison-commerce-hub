import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ChevronDown, 
  CheckCircle, 
  Send, 
  Loader2,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  ArrowRight
} from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const ContactPage = () => {
  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    success: false,
    message: ''
  });
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitted: true, success: false, message: 'Sending your message...' });
    
    try {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setFormStatus({ 
        submitted: true, 
        success: true, 
        message: 'Thank you! Your message has been sent successfully.' 
      });
      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
    } catch (error) {
      setFormStatus({ 
        submitted: true, 
        success: false, 
        message: 'Message sending failed. Please try again.' 
      });
    }
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8 text-blue-600" />,
      title: 'Email Support',
      description: 'Respond within 24 hours',
      contact: 'support@conison.tech',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30'
    },
    {
      icon: <Phone className="w-8 h-8 text-green-600" />,
      title: 'Phone Consultation',
      description: 'Mon-Fri, 9AM-5PM',
      contact: '+211 92 668 5125',
      bgColor: 'bg-green-50 dark:bg-green-900/30'
    },
    {
      icon: <MapPin className="w-8 h-8 text-purple-600" />,
      title: 'Office Location',
      description: 'Visit our main office',
      contact: 'Ministries Road, Juba',
      bgColor: 'bg-purple-50 dark:bg-purple-900/30'
    }
  ];

  const socialLinks = [
    { 
      icon: <Facebook className="w-6 h-6" />, 
      href: "https://facebook.com/conison",
      color: "hover:text-blue-600"
    },
    { 
      icon: <Instagram className="w-6 h-6" />, 
      href: "https://instagram.com/conison",
      color: "hover:text-pink-600"
    },
    { 
      icon: <Twitter className="w-6 h-6" />, 
      href: "https://twitter.com/conison",
      color: "hover:text-sky-500"
    },
    { 
      icon: <Linkedin className="w-6 h-6" />, 
      href: "https://linkedin.com/company/conison",
      color: "hover:text-blue-700"
    }
  ];

  const FAQItems = [
    {
      question: "What services do you offer?",
      answer: "We provide comprehensive technology solutions including digital marketing, web and mobile app development, IT consulting, branding, and video production."
    },
    {
      question: "How long does a typical project take?",
      answer: "Project timelines vary based on complexity. Typically, web projects take 4-8 weeks, mobile apps 8-12 weeks, and comprehensive digital transformations 3-6 months."
    },
    {
      question: "Do you work with international clients?",
      answer: "Absolutely! We have experience working with clients globally, offering flexible communication and project management approaches."
    },
    {
      question: "What is your pricing model?",
      answer: "We offer transparent pricing with fixed-price, hourly, and retainer models. Each project is custom-quoted after understanding your specific requirements."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
    >
      {/* Hero Section with Enhanced Layout */}
      <motion.section 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative bg-gradient-to-r from-blue-600 to-purple-600 py-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto">
            Connect with Conison Technologies
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your business with cutting-edge technology solutions? We're here to listen, understand, and deliver excellence.
          </p>
        </div>
      </motion.section>

      {/* Contact Methods Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white dark:bg-gray-750 rounded-2xl shadow-lg p-8 text-center transform transition-all hover:-translate-y-2"
              >
                <div className={`
                  inline-flex 
                  items-center 
                  justify-center 
                  w-20 
                  h-20 
                  ${method.bgColor} 
                  rounded-full 
                  mb-6
                `}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{method.description}</p>
                <p className="text-blue-600 dark:text-blue-400 font-medium">{method.contact}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* REST OF THE PREVIOUS CONTACT PAGE REMAINS THE SAME */}
      
      {/* Social Media Section with Enhanced Icons */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Stay Connected</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12">
            Follow our journey, get insights, and stay updated with the latest technology trends and innovations.
          </p>
          <div className="flex justify-center space-x-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  text-gray-600 
                  dark:text-gray-400 
                  ${social.color} 
                  transition-all 
                  duration-300 
                  hover:scale-110
                `}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default ContactPage;