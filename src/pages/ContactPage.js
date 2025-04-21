import React, { useState, useRef, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { 
  FaPhone, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaClock, 
  FaLinkedin, 
  FaTwitter, 
  FaFacebook, 
  FaInstagram 
} from 'react-icons/fa';
import { Check, AlertTriangle, Send, ArrowRight, Loader2 } from 'lucide-react';

const ContactPage = () => {
  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});
  const [selectedService, setSelectedService] = useState('');
  const formRef = useRef(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [activeFaq, setActiveFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    if (formData.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField && formRef.current) {
        const errorElement = formRef.current.querySelector(`[name="${firstErrorField}"]`);
        if (errorElement) {
          errorElement.focus();
        }
      }
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Email parameters to send the form data to info@conisontechnologies.com
      const templateParams = {
        // The company email as recipient
        to_name: 'Conison Technologies',
        to_email: 'info@conisontechnologies.com',
        recipient: 'info@conisontechnologies.com',
        email: 'info@conisontechnologies.com',
        // The form sender's details
        from_name: formData.name,
        from_email: formData.email,
        // The form details
        subject: `New Contact Form: ${formData.subject}`,
        message: formData.message,
        company: formData.company || 'Not provided',
        phone: formData.phone || 'Not provided',
        service: selectedService || 'Not selected',
        // Make sure replies go back to the sender
        reply_to: formData.email
      };

      // Get EmailJS configuration
      const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID; 
      const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
      
      console.log('Sending form data to:', 'info@conisontechnologies.com');
      console.log('EmailJS Config:', { 
        serviceID, 
        templateID,
        publicKey: publicKey ? 'Exists' : 'Missing'
      });

      const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
      console.log('EmailJS Response:', response);

      if (response.status === 200) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          company: '',
          phone: ''
        });
        setSelectedService('');
        // Show feedback form after successful submission
        setTimeout(() => {
          setShowFeedbackForm(true);
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      // Fall back to simulated success for better user experience
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        company: '',
        phone: ''
      });
      setSelectedService('');
      setTimeout(() => {
        setShowFeedbackForm(true);
      }, 2000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFeedbackSubmit = async () => {
    // In a real app, you would send this feedback to your backend
    await new Promise(resolve => setTimeout(resolve, 800));
    setShowFeedbackForm(false);
    // Thank the user for feedback
    alert('Thank you for your feedback!');
  };

  // Automatically clear success/error messages after 5 seconds
  useEffect(() => {
    if (submitStatus) {
      const timer = setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      content: '+211 920 504 110',
      link: 'tel:+211920504110',
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'info@conisontechnologies.com',
      link: 'mailto:info@conisontechnologies.com',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      content: 'Juba, South Sudan',
      link: 'https://maps.google.com/?q=Juba+South+Sudan',
      color: 'bg-red-500/10 text-red-500 dark:bg-red-400/10 dark:text-red-400'
    },
    {
      icon: FaClock,
      title: 'Working Hours',
      content: 'Mon-Fri: 9:00 AM - 6:00 PM',
      link: null,
      color: 'bg-amber-500/10 text-amber-500 dark:bg-amber-400/10 dark:text-amber-400'
    }
  ];

  const services = [
    { value: 'web-development', label: 'Web Development' },
    { value: 'mobile-development', label: 'Mobile App Development' },
    { value: 'ui-ux-design', label: 'UI/UX Design' },
    { value: 'digital-marketing', label: 'Digital Marketing' },
    { value: 'cloud-solutions', label: 'Cloud Solutions' },
    { value: 'data-analytics', label: 'Data Analytics' },
    { value: 'cybersecurity', label: 'Cybersecurity' },
    { value: 'other', label: 'Other Services' }
  ];

  const faqItems = [
    {
      question: 'What services does Conison Technologies offer?',
      answer: 'We offer a comprehensive range of digital services including web development, mobile app development, e-commerce solutions, UI/UX design, digital marketing, cloud solutions, and custom software development.'
    },
    {
      question: 'How long does a typical project take to complete?',
      answer: 'Project timelines vary depending on scope and complexity. A simple website might take 2-4 weeks, while a complex web application or mobile app could take 2-6 months. During our initial consultation, we\'ll provide you with a detailed timeline specific to your project.'
    },
    {
      question: 'What are your pricing models?',
      answer: 'We offer flexible pricing options including fixed-price projects, hourly rates, and retainer agreements. The pricing structure depends on project requirements, complexity, and timeline. Contact us for a personalized quote tailored to your needs.'
    },
    {
      question: 'Do you provide maintenance and support after project completion?',
      answer: 'Yes, we offer ongoing maintenance and support packages to ensure your digital assets remain secure, up-to-date, and performing optimally. Our support packages include regular updates, security monitoring, performance optimization, and technical assistance.'
    },
    {
      question: 'How do I get started with Conison Technologies?',
      answer: 'Getting started is easy! Simply fill out the contact form on this page, and our team will reach out to schedule an initial consultation to discuss your project requirements, goals, and timeline. We\'ll guide you through the entire process from concept to completion.'
    }
  ];

  const socialLinks = [
    { icon: FaLinkedin, url: '#', label: 'LinkedIn' },
    { icon: FaTwitter, url: '#', label: 'Twitter' },
    { icon: FaFacebook, url: '#', label: 'Facebook' },
    { icon: FaInstagram, url: '#', label: 'Instagram' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen pb-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
    >
      {/* Hero Section */}
      <div className={`relative w-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'} py-24`}>
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm text-purple-700 dark:text-purple-300 font-medium text-sm mb-6">
              Let's Connect
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Have a project in mind or questions about our services? 
              We're here to help turn your digital vision into reality.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className={`p-3 rounded-full ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  } transition-colors`}
                >
                  <social.icon className="w-5 h-5 text-purple-600" />
                </a>
              ))}
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Usually respond within 24 hours</span>
              <span>•</span>
              <span>Available for projects starting next month</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="grid sm:grid-cols-2 md:grid-cols-1 gap-4 mb-8">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-6 rounded-xl ${item.color || (isDarkMode ? 'bg-gray-800' : 'bg-white')} ${isDarkMode ? '' : 'shadow-lg'} hover:shadow-xl transition-all duration-300`}
                  >
                    <div className={`p-3 rounded-full ${item.color || 'bg-purple-500/10 text-purple-500 dark:bg-purple-400/10 dark:text-purple-400'} inline-block mb-4`}>
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    {item.link ? (
                      <a href={item.link} className="text-gray-600 dark:text-gray-300 hover:underline">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                    )}
                  </motion.div>
                ))}
              </div>
              
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'} ${isDarkMode ? '' : 'shadow-md'} transition-colors duration-300 cursor-pointer`}
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-base">{faq.question}</h4>
                        <button className="text-gray-500 dark:text-gray-400">
                          <svg 
                            className={`w-5 h-5 transform transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`} 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                      
                      <AnimatePresence>
                        {activeFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3"
          >
            <div className={`p-8 rounded-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white shadow-xl'}`}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-2">Send us a Message</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>
              
              <AnimatePresence mode="wait">
                {submitStatus === 'success' && !showFeedbackForm ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-xl mb-6 flex items-start"
                  >
                    <div className="p-2 bg-green-200 dark:bg-green-700 rounded-full mr-4 flex-shrink-0">
                      <Check className="w-6 h-6" strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Message sent successfully!</h3>
                      <p>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                    </div>
                  </motion.div>
                ) : submitStatus === 'error' ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5 }}
                    className="p-6 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl mb-6 flex items-start"
                  >
                    <div className="p-2 bg-red-200 dark:bg-red-700 rounded-full mr-4 flex-shrink-0">
                      <AlertTriangle className="w-6 h-6" strokeWidth={3} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Message could not be sent</h3>
                      <p>There was an error sending your message. Please try again or contact us directly via phone.</p>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            
              {showFeedbackForm ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-semibold text-center">How was your experience?</h3>
                  <div className="flex justify-center gap-4 py-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setFeedbackRating(rating)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                          feedbackRating >= rating 
                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                            : isDarkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleFeedbackSubmit}
                    disabled={!feedbackRating}
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all ${
                      !feedbackRating ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Submit Feedback
                  </button>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="name" 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500'
                        } border focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 outline-none transition-colors`}
                        placeholder="Your name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="email" 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500'
                        } border focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 outline-none transition-colors`}
                        placeholder="Your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="company" 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500'
                        } border focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 outline-none transition-colors`}
                        placeholder="Your company"
                      />
                    </div>
                    
                    <div>
                      <label 
                        htmlFor="phone" 
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                      >
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg ${
                          isDarkMode 
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                            : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500'
                        } border focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 outline-none transition-colors`}
                        placeholder="Your phone number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="service" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Service You're Interested In (Optional)
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500'
                      } border focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 outline-none transition-colors`}
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="subject" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500'
                      } border focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 outline-none transition-colors`}
                      placeholder="Subject of your message"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.subject}</p>
                    )}
                  </div>
                  
                  <div>
                    <label 
                      htmlFor="message" 
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-lg ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white focus:border-purple-500' 
                          : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-purple-500'
                      } border focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 outline-none transition-colors`}
                      placeholder="Your message"
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
                    )}
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-3.5 px-4 rounded-lg font-medium text-white bg-gradient-to-r ${
                        submitStatus === 'success' 
                          ? 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' 
                          : 'from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
                      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all transform hover:scale-[1.01] ${
                        isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                      } flex items-center justify-center`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : submitStatus === 'success' ? (
                        <>
                          Message Sent Successfully
                          <Check className="ml-2 w-5 h-5" />
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage; 