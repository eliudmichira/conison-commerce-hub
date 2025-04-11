import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../../context/DarkModeContext';
import ParticleBackground from '../../components/ParticleBackground';

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

  const serviceImages = [
    {
      src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      alt: 'Service implementation',
      caption: 'Expert Implementation'
    },
    {
      src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      alt: 'Team collaboration',
      caption: 'Team Collaboration'
    },
    {
      src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      alt: 'Client meeting',
      caption: 'Client Consultation'
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-conison.gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary-blue via-primary-purple to-primary-teal text-white">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <ParticleBackground />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block mb-8"
            >
              <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
                <Icon className="w-12 h-12 text-white" />
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-xl max-w-3xl mx-auto text-white/90"
            >
              {description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Service Showcase */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative group overflow-hidden rounded-lg"
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm">{image.caption}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-6 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                }`}
              >
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <feature.icon className="w-8 h-8 mb-2" />
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className={`p-6 rounded-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg`}>
                  <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-xl font-semibold">{step.title}</h3>
                    </div>
                  </div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2">
                    <div className="w-8 h-1 bg-primary-teal"></div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className={`text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Let's discuss how we can help you achieve your goals
          </p>
          <Link
            to={ctaLink}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-teal hover:bg-primary-teal/90 transition-colors"
          >
            {ctaText}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServicePage; 