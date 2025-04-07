// pages/HomePage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedHero from '../components/AnimatedHero';
import Testimonials from '../components/Testimonials';
import HeroTagline from '../components/HeroTagline';
import { FaCode, FaMobileAlt, FaPalette, FaChartLine, FaCloud, FaVideo } from 'react-icons/fa';

const HomePage = () => {
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState('all');

  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      icon: <FaCode className="w-8 h-8" />,
      description: 'Custom websites and web applications built with cutting-edge technologies.',
      subServices: ['Frontend Development', 'Backend Development', 'E-commerce Solutions'],
      category: 'development'
    },
    {
      id: 'mobile-development',
      title: 'Mobile Development',
      icon: <FaMobileAlt className="w-8 h-8" />,
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      subServices: ['iOS Development', 'Android Development', 'Cross-platform Solutions'],
      category: 'development'
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      icon: <FaPalette className="w-8 h-8" />,
      description: 'User-centered design solutions that enhance user experience.',
      category: 'design'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      icon: <FaChartLine className="w-8 h-8" />,
      description: 'Comprehensive digital marketing strategies to grow your online presence.',
      category: 'marketing'
    },
    {
      id: 'cloud-solutions',
      title: 'Cloud Solutions',
      icon: <FaCloud className="w-8 h-8" />,
      description: 'Scalable cloud infrastructure and deployment solutions.',
      subServices: ['Cloud Migration', 'DevOps', 'Serverless Architecture'],
      category: 'infrastructure'
    },
    {
      id: 'animation-video-production',
      title: 'Animation & Video Production',
      icon: <FaVideo className="w-8 h-8" />,
      description: 'Professional animation and video production services for all your creative needs.',
      category: 'design'
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      icon: '🤖',
      description: 'Intelligent solutions powered by artificial intelligence and machine learning.',
      subServices: ['AI Integration', 'ML Models', 'Data Analytics'],
      category: 'ai'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      icon: '🔒',
      description: 'Comprehensive security solutions to protect your digital assets.',
      subServices: ['Security Audits', 'Penetration Testing', 'Security Training'],
      category: 'security'
    },
    {
      id: 'consulting',
      title: 'IT Consulting',
      icon: '💡',
      description: 'Expert guidance for your technology decisions and implementations.',
      subServices: ['Technology Strategy', 'Digital Transformation', 'Process Optimization'],
      category: 'consulting'
    }
  ];

  const filterServices = (category) => {
    setActiveTab(category);
  };

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(service => service.category === activeTab);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-conison-gray'}`}>
      {/* Hero Section with Particles and Animated Content */}
      <header id="home" className={`${isDarkMode 
        ? 'bg-gradient-to-r from-gray-900 to-conison-gray/90' 
        : 'bg-gradient-to-r from-conison-cyan to-conison-magenta'} 
        text-white min-h-screen flex items-center relative`}
      >
        <ParticleBackground />
        <div className="absolute inset-0 z-10">
          <AnimatedHero />
        </div>
      </header>
      
      {/* Enhanced Tagline Section */}
      <section className={`py-10 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
        <HeroTagline />
      </section>
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Company Overview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Conison Technologies?</h2>
              <p className="text-xl text-conison-gray dark:text-gray-100 max-w-3xl mx-auto">
                We combine technical expertise with innovative solutions to help businesses thrive in the digital age.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg transform transition-transform hover:scale-105">
                <div className="text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                <p className="text-conison-gray dark:text-gray-300">
                  Our experienced professionals bring years of industry expertise to every project.
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg transform transition-transform hover:scale-105">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Innovative Solutions</h3>
                <p className="text-conison-gray dark:text-gray-300">
                  We leverage cutting-edge technologies to deliver exceptional results.
                </p>
              </div>
              <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg transform transition-transform hover:scale-105">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold mb-2">Client-Focused</h3>
                <p className="text-conison-gray dark:text-gray-300">
                  Your success is our priority, with dedicated support throughout your journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-conison-cyan dark:text-conison-cyan font-semibold tracking-wider mb-2">
                OUR SERVICES
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Technology Solutions</h2>
              <p className="text-xl text-conison-gray dark:text-gray-100 max-w-3xl mx-auto">
                Tailored solutions to accelerate your business growth and digital transformation
              </p>
            </div>

            {/* Service Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={() => filterServices('all')}
                className={`px-6 py-2 rounded-full ${
                  activeTab === 'all'
                    ? 'bg-conison-magenta text-white'
                    : 'bg-white dark:bg-gray-700 text-conison-gray dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                All Services
              </button>
              <button
                onClick={() => filterServices('development')}
                className={`px-6 py-2 rounded-full ${
                  activeTab === 'development'
                    ? 'bg-conison-magenta text-white'
                    : 'bg-white dark:bg-gray-700 text-conison-gray dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                Development
              </button>
              <button
                onClick={() => filterServices('infrastructure')}
                className={`px-6 py-2 rounded-full ${
                  activeTab === 'infrastructure'
                    ? 'bg-conison-magenta text-white'
                    : 'bg-white dark:bg-gray-700 text-conison-gray dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                Infrastructure
              </button>
              <button
                onClick={() => filterServices('ai')}
                className={`px-6 py-2 rounded-full ${
                  activeTab === 'ai'
                    ? 'bg-conison-magenta text-white'
                    : 'bg-white dark:bg-gray-700 text-conison-gray dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                AI & ML
              </button>
              <button
                onClick={() => filterServices('security')}
                className={`px-6 py-2 rounded-full ${
                  activeTab === 'security'
                    ? 'bg-conison-magenta text-white'
                    : 'bg-white dark:bg-gray-700 text-conison-gray dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                Security
              </button>
              <button
                onClick={() => filterServices('consulting')}
                className={`px-6 py-2 rounded-full ${
                  activeTab === 'consulting'
                    ? 'bg-conison-magenta text-white'
                    : 'bg-white dark:bg-gray-700 text-conison-gray dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                Consulting
              </button>
            </div>

            {/* Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map((service, index) => (
                <div key={service.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden flex flex-col animate-fadeIn border border-transparent dark:border-gray-700 service-card" style={{ animationDelay: `${0.1 * index}s` }}>
                  <div className="p-6 flex-grow">
                    <div className="flex items-center mb-4">
                      <div className="text-4xl mr-4">{service.icon}</div>
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                    </div>
                    <p className="text-conison-gray dark:text-gray-100 mb-4">{service.description}</p>
                    {service.subServices && (
                      <ul className="text-conison-gray dark:text-gray-100 mt-4 space-y-2">
                        {service.subServices.map((subService, idx) => (
                          <li key={idx} className="flex items-start">
                            <svg className="w-5 h-5 text-conison-cyan dark:text-conison-cyan mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            {subService}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="p-6 bg-gray-50 dark:bg-gray-700">
                    <Link to={`/services/${service.id}`} className="text-conison-cyan hover:text-conison-magenta dark:text-conison-cyan dark:hover:text-conison-magenta font-medium transition flex items-center">
                      Learn more
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/services" 
                className="bg-conison-cyan text-white font-semibold py-3 px-8 rounded-lg hover:bg-conison-magenta transition-all duration-300 inline-block border border-transparent"
              >
                Discover all our services
              </Link>
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-conison-magenta dark:text-conison-magenta font-semibold tracking-wider mb-2">
                SUCCESS STORIES
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Recent Work</h2>
              <p className="text-xl text-conison-gray dark:text-gray-100 max-w-3xl mx-auto">
                See how we've helped businesses transform their digital presence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">E-commerce Platform Transformation</h3>
                  <p className="text-conison-gray dark:text-gray-100 mb-4">
                    Helped a retail client increase online sales by 200% through a complete digital transformation.
                  </p>
                  <Link
                    to="/case-studies/ecommerce-transformation"
                    className="inline-flex items-center text-conison-magenta dark:text-conison-magenta font-medium hover:underline"
                  >
                    Read Case Study →
                  </Link>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Mobile App Success</h3>
                  <p className="text-conison-gray dark:text-gray-100 mb-4">
                    Developed a cross-platform mobile app that reached 1M+ downloads in its first year.
                  </p>
                  <Link
                    to="/case-studies/mobile-app-success"
                    className="inline-flex items-center text-conison-magenta dark:text-conison-magenta font-medium hover:underline"
                  >
                    Read Case Study →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-conison-magenta text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
            <svg className="absolute top-0 left-0 transform translate-y-40 translate-x-24" width="404" height="404" fill="none" viewBox="0 0 404 404">
              <defs>
                <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="4" height="4" className="text-white" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Supercharge Your Business?</h2>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Let's transform your ideas into reality and take your business to new heights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/quote-request" className="bg-white text-conison-magenta font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-300 text-center">
                Get a Free Quote
              </Link>
              <Link to="/contact" className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-conison-magenta transition-all duration-300 text-center">
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <Testimonials />
      </div>
    </div>
  );
};

export default HomePage;