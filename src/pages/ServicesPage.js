import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';
import { 
  FaCode, FaMobileAlt, FaPalette, FaChartLine, 
  FaCloud, FaVideo, FaShieldAlt, FaRobot, 
  FaLightbulb, FaArrowRight, FaShoppingCart 
} from 'react-icons/fa';
import servicesData from '../data/ServiceData';
import ParticleBackground from '../components/ParticleBackground';

const ServicesPage = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleServices, setVisibleServices] = useState({});
  
  // Refs for intersection observer
  const serviceRefs = useRef({});
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'development', name: 'Development' },
    { id: 'design', name: 'Design & Creative' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'consulting', name: 'Consulting' },
    { id: 'ai', name: 'AI & Automation' }
  ];
  
  // Set up intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleServices(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );
    
    // Observe all service elements
    Object.values(serviceRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      Object.values(serviceRefs.current).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [services]);
  
  // Transform the servicesData on mount for display
  useEffect(() => {
    // Process servicesData to create display-friendly format
    const displayServices = [
      {
        id: 'graphic-design',
        title: 'Graphic Design',
        description: 'Professional graphic design services for all your visual communication needs.',
        icon: <FaPalette className="w-8 h-8" />,
        image: 'https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Logo Design', 'Brand Identity Materials', 'Print Design', 'Digital Graphics'],
        category: 'design',
        link: '/services/graphic-design'
      },
      {
        id: 'branding',
        title: 'Branding & Identity',
        description: 'Create a memorable brand identity that sets you apart from the competition.',
        icon: <FaPalette className="w-8 h-8" />,
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Brand Strategy', 'Visual Identity Development', 'Brand Guidelines', 'Logo Design'],
        category: 'design',
        link: '/services/branding'
      },
      {
        id: 'web-development',
        title: 'Web & App Development',
        description: 'Custom websites and applications designed to meet your specific business needs.',
        icon: <FaCode className="w-8 h-8" />,
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Custom Website Development', 'E-commerce Solutions', 'Content Management Systems', 'Web Application Development'],
        category: 'development',
        link: '/services/web-development'
      },
      {
        id: 'digital-marketing',
        title: 'Digital Marketing',
        description: 'Strategic marketing campaigns that drive traffic, leads, and conversions for sustainable growth.',
        icon: <FaChartLine className="w-8 h-8" />,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Search Engine Optimization', 'Social Media Marketing', 'Pay-Per-Click Advertising', 'Email Marketing'],
        category: 'marketing',
        link: '/services/digital-marketing'
      },
      {
        id: 'motion-graphics',
        title: 'Motion Graphics & Video Editing',
        description: 'Engaging video content that effectively communicates your message.',
        icon: <FaVideo className="w-8 h-8" />,
        image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Motion Graphics Design', 'Video Editing', 'Animation', 'Visual Effects'],
        category: 'design',
        link: '/services/motion-graphics'
      },
      {
        id: 'photography',
        title: 'Photography & Videography',
        description: 'Professional photography and videography services for all your visual needs.',
        icon: <FaVideo className="w-8 h-8" />,
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Product Photography', 'Corporate Photography', 'Event Photography', 'Aerial Photography'],
        category: 'design',
        link: '/services/photography'
      },
      {
        id: 'it-solutions',
        title: 'Corporate IT Solutions & Software Development',
        description: 'Tailored IT solutions to streamline your business operations.',
        icon: <FaCode className="w-8 h-8" />,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Custom Software Development', 'ERP Solutions', 'CRM Implementation', 'IT Infrastructure Setup'],
        category: 'development',
        link: '/services/it-solutions'
      },
      {
        id: 'cybersecurity',
        title: 'Cybersecurity & Data Protection',
        description: 'Comprehensive security solutions to protect your digital assets and sensitive information.',
        icon: <FaShieldAlt className="w-8 h-8" />,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Security Audits', 'Penetration Testing', 'Data Encryption', 'Secure Network Design'],
        category: 'development',
        link: '/services/cybersecurity'
      },
      {
        id: 'ecommerce',
        title: 'E-Commerce Solutions',
        description: 'Complete e-commerce solutions to help you sell your products online.',
        icon: <FaShoppingCart className="w-8 h-8" />,
        image: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['E-commerce Website Development', 'Shopping Cart Integration', 'Payment Gateway Setup', 'Product Catalog Management'],
        category: 'development',
        link: '/services/ecommerce'
      },
      {
        id: 'ai-automation',
        title: 'AI & Automation Services',
        description: 'Leverage the power of AI to automate and enhance your business processes.',
        icon: <FaRobot className="w-8 h-8" />,
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['AI Chatbot Development', 'Workflow Automation', 'Marketing Automation', 'Process Optimization'],
        category: 'ai',
        link: '/services/ai-automation'
      },
      {
        id: 'business-consulting',
        title: 'Business Consultation & Training',
        description: 'Expert business consultation and training to help you achieve your goals.',
        icon: <FaLightbulb className="w-8 h-8" />,
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: ['Business Strategy Development', 'Digital Transformation Consulting', 'Marketing Strategy', 'Process Optimization'],
        category: 'consulting',
        link: '/services/business-consulting'
      }
    ];
    
    // Process servicesData to create display-friendly format
    const enhancedServices = servicesData.map(service => {
      // Find matching display service for UI-specific properties
      const displayService = displayServices.find(ds => 
        ds.id === service.id || 
        (service.path && service.path.includes(ds.id))
      );
      
      return {
        id: service.id,
        title: service.title,
        description: service.description,
        icon: displayService?.icon || <FaCode className="w-8 h-8" />,
        image: displayService?.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        features: service.features?.slice(0, 4) || [],
        category: displayService?.category || 'development',
        link: `/services/${service.id}`
      };
    });
    
    setServices(enhancedServices);
    
    // Initialize refs for all services
    enhancedServices.forEach(service => {
      serviceRefs.current[service.id] = serviceRefs.current[service.id] || null;
    });
  }, []);

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Banner */}
      <div className="services-hero">
        <ParticleBackground />
        <motion.h1 
          className="services-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Services
        </motion.h1>
        <motion.p 
          className="services-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We offer a comprehensive range of digital services to help your business thrive in today's competitive landscape.
          Explore our services below to find the perfect solution for your needs.
        </motion.p>
      </div>

      {/* Category Filter */}
      <div className="bg-white dark:bg-gray-800 sticky top-16 z-10 shadow-md services-tabs-container">
        <div className="container mx-auto px-6 py-4 overflow-x-auto">
          <div className="flex space-x-2 justify-center">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${activeCategory === category.id
                    ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`
                }
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          className="space-y-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredServices.map((service, index) => (
            <motion.div 
              key={service.id} 
              id={service.id}
              ref={el => serviceRefs.current[service.id] = el}
              className={`${index !== filteredServices.length - 1 && 'border-b border-gray-200 dark:border-gray-700 pb-32'}`}
              initial={{ opacity: 0, y: 50 }}
              animate={visibleServices[service.id] ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
            >
              <div className={`flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} items-center gap-16`}>
                <div className="lg:w-2/5">
                  <motion.div 
                    className="relative rounded-2xl shadow-2xl overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img 
                      src={service.image} 
                      alt={`${service.title} service`}
                      className="w-full h-80 object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-8 w-full">
                        <div className="flex items-center">
                          <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm mr-4 text-white">
                            {service.icon}
                          </div>
                          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                <div className="lg:w-3/5">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{service.title}</h2>
                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                        <span className="w-8 h-1 bg-gradient-to-r from-red-600 to-blue-600 rounded-full mr-3"></span>
                        What We Offer
                      </h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {service.features.map((feature, idx) => (
                          <li 
                            key={idx} 
                            className="flex items-start"
                          >
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-red-600 to-blue-600 flex items-center justify-center mt-0.5">
                              <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <span className="ml-3 text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-6">
                      <motion.button 
                        className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
                        onClick={() => navigate(service.link)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                        <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                      
                      <button 
                        className="ml-4 inline-flex items-center px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                        onClick={() => navigate('/quote-request?service=' + service.id)}
                      >
                        Request Quote
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-red-600 to-blue-600 relative overflow-hidden">
        <ParticleBackground />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
            Let us help you transform your business with our comprehensive range of services. Contact us today for a consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              onClick={() => navigate('/quote-request')}
              className="inline-flex items-center justify-center bg-white text-red-600 font-semibold py-4 px-8 rounded-full hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request a Quote
              <FaArrowRight className="ml-2" />
            </motion.button>
            <button 
              onClick={() => navigate('/contact')}
              className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white font-semibold py-4 px-8 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;