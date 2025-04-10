import React, { useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const ContactPage = () => {
  const { isDarkMode } = useDarkMode();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // TODO: Implement actual form submission logic
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: 'Phone',
      content: '+211 92 668 5125',
      link: 'tel:+211926685125'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'info@conisontechnologies.com',
      link: 'mailto:info@conisontechnologies.com'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Address',
      content: 'Juba Town, Near Baping Insurance Company, South Sudan',
      link: 'https://maps.google.com/?q=Baping+Insurance+Company+Juba+South+Sudan'
    },
    {
      icon: FaClock,
      title: 'Working Hours',
      content: 'Mon-Fri: 9:00 AM - 6:00 PM',
      link: null
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex items-start space-x-4 p-6 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg`}
              >
                <div className={`p-3 rounded-full ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <item.icon className="w-6 h-6 text-conison-magenta" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-gray-600 dark:text-gray-300 hover:text-conison-magenta transition-colors"
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

            {/* Map Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className={`rounded-lg overflow-hidden shadow-lg ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold flex items-center">
                  <FaMapMarkerAlt className="mr-2 text-conison-magenta" />
                  Our Office Location
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
                  Find us at Juba Town, Near Baping Insurance Company, South Sudan
                </p>
              </div>
              <div className="h-80 w-full">
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
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`p-8 rounded-lg shadow-lg ${
              isDarkMode ? 'bg-gray-800' : 'bg-white'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  } focus:ring-2 focus:ring-conison-magenta focus:border-transparent`}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  } focus:ring-2 focus:ring-conison-magenta focus:border-transparent`}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  } focus:ring-2 focus:ring-conison-magenta focus:border-transparent`}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'border-gray-300'
                  } focus:ring-2 focus:ring-conison-magenta focus:border-transparent`}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-conison-magenta hover:bg-conison-magenta-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-conison-magenta transition-colors ${
                  isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {submitStatus === 'success' && (
                <div className="p-4 bg-green-100 text-green-700 rounded-lg">
                  Message sent successfully! We'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                  Something went wrong. Please try again later.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;