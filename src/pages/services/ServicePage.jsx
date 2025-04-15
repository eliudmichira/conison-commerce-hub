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
      id: 'web-development',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Web Development',
      description: 'Custom websites and applications designed to meet your specific business needs.'
    },
    {
      id: 'mobile-development',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.'
    },
    {
      id: 'ai-ml',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'AI & ML Solutions',
      description: 'Leverage the power of artificial intelligence and machine learning for your business.'
    },
    {
      id: 'cloud-solutions',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and services for your business needs.'
    },
    {
      id: 'business-consulting',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Business Consulting',
      description: 'Expert guidance to help your business grow and succeed.'
    },
    {
      id: 'motion-graphics',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Motion Graphics',
      description: 'Engaging motion graphics and animations for your brand.'
    },
    {
      id: 'cybersecurity',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets.'
    },
    {
      id: 'digital-marketing',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Digital Marketing',
      description: 'Strategic marketing campaigns for sustainable business growth.'
    },
    {
      id: 'graphic-design',
      image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Graphic Design',
      description: 'Professional design services for all your visual communication needs.'
    },
    {
      id: 'branding',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Branding',
      description: 'Create a memorable brand identity that sets you apart.'
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
                  src={image.image} 
                  alt={image.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm">{image.description}</p>
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