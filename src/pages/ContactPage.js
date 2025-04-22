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
      // Using EmailJS to send the form data directly to info@conisontechnologies.com
      const templateParams = {
        to_email: 'info@conisontechnologies.com',
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        company: formData.company || 'Not provided',
        phone: formData.phone || 'Not provided',
        service: selectedService || 'Not selected'
      };

      // Replace these IDs with your actual EmailJS account details
      const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID; 
      const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;

      const response = await emailjs.send(serviceID, templateID, templateParams);

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
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
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
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-red-500/20 to-blue-500/20 backdrop-blur-sm text-red-700 dark:text-red-300 font-medium text-sm mb-6">
              Let's Connect
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">Touch</span>
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
                  <social.icon className="w-5 h-5 text-red-600" />
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
                    className={`flex items-start space-x-4 p-5 rounded-lg ${
                      isDarkMode ? 'bg-gray-800' : 'bg-white'
                    } shadow-sm hover:shadow-md transition-shadow`}
                  >
                    <div className={`p-3 rounded-full ${item.color}`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                      {item.link ? (
                        <a
                          href={item.link}
                          className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                          target={item.title === 'Address' ? '_blank' : undefined}
                          rel={item.title === 'Address' ? 'noopener noreferrer' : undefined}
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    Our Office Location
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                    Find us at Juba Town, Near Baping Insurance Company, South Sudan
                  </p>
                </div>
                <div className="h-60 w-full">
                  <iframe
                    title="Conison Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3980.093310925561!2d31.57726857557633!3d4.850291840992982!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1712d22a68a7d6bd%3A0x8e4b1fa3e4a5ffed!2sJuba%2C%20South%20Sudan!5e0!3m2!1sen!2sus!4v1649765431012!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-3"
          >
            <div className={`p-8 rounded-xl shadow-sm ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}>
              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <AnimatePresence mode="wait">
                {submitStatus === 'success' && !showFeedbackForm ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl mb-6 flex items-start"
                  >
                    <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-full mr-4 flex-shrink-0">
                      <Check className="w-6 h-6" />
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
                    transition={{ duration: 0.3 }}
                    className="p-6 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl mb-6 flex items-start"
                  >
                    <div className="p-2 bg-red-100 dark:bg-red-800/30 rounded-full mr-4 flex-shrink-0">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Message could not be sent</h3>
                      <p>There was an error sending your message. Please try again or contact us directly via phone.</p>
                    </div>
                  </motion.div>
                ) : null}

                {showFeedbackForm ? (
                  <motion.div
                    key="feedback"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-xl mb-6"
                  >
                    <h3 className="font-semibold text-lg mb-3">How would you rate your experience?</h3>
                    <div className="flex gap-2 mb-4">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <button
                          key={rating}
                          type="button"
                          onClick={() => setFeedbackRating(rating)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            feedbackRating >= rating 
                              ? 'bg-red-600 text-white' 
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {rating}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleFeedbackSubmit}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      Submit Feedback
                    </button>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${
                        errors.name ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="johndoe@example.com"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors`}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (123) 456-7890"
                      className={`w-full px-4 py-3 rounded-lg border ${
                        isDarkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : ''
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-1">
                    Service You're Interested In
                  </label>
                  <select
                    id="service"
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors`}
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
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${
                      errors.subject ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project or inquiry..."
                    rows="5"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      isDarkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-red-500 focus:border-transparent transition-colors ${
                      errors.message ? 'border-red-500 focus:ring-red-500' : ''
                    }`}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="privacy-policy"
                    className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500"
                    required
                  />
                  <label htmlFor="privacy-policy" className="ml-2 block text-sm">
                    I agree to the{' '}
                    <a 
                      href="/privacy-policy" 
                      className="text-red-600 hover:text-red-500 dark:text-red-400"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3.5 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:scale-[1.01] ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    } flex items-center justify-center`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
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
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Find answers to common questions about working with us. If you don't see what you're looking for, please reach out!
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <div 
                key={index}
                className={`mb-4 border rounded-xl overflow-hidden ${
                  isDarkMode 
                    ? 'border-gray-700 bg-gray-800' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="flex justify-between items-center w-full p-5 text-left font-medium"
                >
                  <span>{item.question}</span>
                  <ArrowRight 
                    className={`w-5 h-5 transform transition-transform ${
                      activeFaq === index ? 'rotate-90' : 'rotate-0'
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`p-5 pt-0 border-t ${
                        isDarkMode ? 'border-gray-700' : 'border-gray-200'
                      } text-gray-600 dark:text-gray-300`}>
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className={`rounded-2xl overflow-hidden relative ${
            isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-red-50 to-blue-50'
          } p-10 shadow-lg`}>
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-red-600 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Our team of experts is ready to help you achieve your business goals with cutting-edge technology solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+211920504110" 
                  className="py-3 px-6 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium flex items-center justify-center transition-colors"
                >
                  <FaPhone className="mr-2" />
                  Call Us Now
                </a>
                <a 
                  href="#top" 
                  className={`py-3 px-6 rounded-lg font-medium flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                      : 'bg-white hover:bg-gray-100 text-gray-900'
                  } transition-colors`}
                >
                  <FaEnvelope className="mr-2" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
