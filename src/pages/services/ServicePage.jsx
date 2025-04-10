import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';

const ServicePage = ({ 
  title, 
  description, 
  icon: Icon, 
  features, 
  benefits, 
  process, 
  ctaText = "Get Started",
  ctaLink = "/contact"
}) => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-conison.gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-8"
            >
              <div className={`p-4 rounded-full ${isDarkMode ? 'bg-conison.gray-800' : 'bg-conison.gray-50'}`}>
                <Icon className={`w-12 h-12 ${isDarkMode ? 'text-conison-magenta' : 'text-conison-magenta'}`} />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`text-4xl sm:text-5xl md:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`mt-6 text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}
            >
              {description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-conison.gray-800' : 'bg-conison.gray-50'}`}
              >
                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
                  {feature.title}
                </h3>
                <p className={`${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-conison.gray-800' : 'bg-conison.gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
            Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-conison.gray-900' : 'bg-white'}`}
              >
                <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
                  {benefit.title}
                </h3>
                <p className={`${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}>
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
            Our Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-conison-magenta' : 'bg-conison-magenta'}`}>
                  <span className="text-white text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
                  {step.title}
                </h3>
                <p className={`${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-conison.gray-800' : 'bg-conison.gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
            Ready to Get Started?
          </h2>
          <p className={`text-lg mb-8 ${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}>
            Let's discuss how we can help you achieve your goals
          </p>
          <Link
            to={ctaLink}
            className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-conison-magenta hover:bg-conison-magenta-600 transition-colors`}
          >
            {ctaText}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicePage; 