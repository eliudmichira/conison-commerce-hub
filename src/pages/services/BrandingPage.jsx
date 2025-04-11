import React from 'react';
import { Link } from 'react-router-dom';
import { FaPalette, FaLightbulb, FaUsers, FaChartLine } from 'react-icons/fa';
import { useDarkMode } from '../../context/DarkModeContext';

const BrandingPage = () => {
  const { isDarkMode } = useDarkMode();

  const services = [
    {
      icon: <FaPalette className="w-8 h-8" />,
      title: "Visual Identity",
      description: "Create a unique and memorable visual identity that represents your brand's personality and values."
    },
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: "Brand Strategy",
      description: "Develop a comprehensive brand strategy that aligns with your business goals and target audience."
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: "Brand Guidelines",
      description: "Establish clear brand guidelines to maintain consistency across all your marketing materials."
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Brand Positioning",
      description: "Define your brand's unique position in the market and create a compelling value proposition."
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-primary text-white' : 'bg-white text-text-primary'}`}>
      {/* Hero Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-dark-secondary' : 'bg-off-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-blue to-primary-teal">
              Professional Branding Services
            </h1>
            <p className="text-xl text-text-secondary dark:text-dark-text-primary max-w-3xl mx-auto mb-8">
              Create a powerful and memorable brand identity that resonates with your target audience and sets you apart from the competition.
            </p>
            <Link 
              to="/quote-request?service=branding" 
              className="inline-flex items-center justify-center bg-gradient-to-r from-primary-blue to-primary-teal text-white font-semibold py-4 px-8 rounded-full hover:shadow-button-hover transition-all duration-300 transform hover:scale-105"
            >
              Get a Branding Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Branding Services</h2>
            <p className="text-xl text-text-secondary dark:text-dark-text-primary max-w-3xl mx-auto">
              Comprehensive branding solutions to help your business stand out and make a lasting impression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 ${
                  isDarkMode ? 'bg-dark-secondary' : 'bg-light'
                }`}
              >
                <div className="text-primary-blue mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-dark-secondary' : 'bg-off-white'}`}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Brand?</h2>
          <p className="text-xl text-text-secondary dark:text-dark-text-primary max-w-3xl mx-auto mb-8">
            Let's create a brand that truly represents your business and connects with your audience.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center bg-gradient-to-r from-primary-blue to-primary-teal text-white font-semibold py-4 px-8 rounded-full hover:shadow-button-hover transition-all duration-300 transform hover:scale-105"
          >
            Contact Us Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BrandingPage; 