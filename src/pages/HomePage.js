import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';
import { useAuth } from '../context/AuthContext';
import ParticleBackground from '../components/ParticleBackground';
import AnimatedHero from '../components/AnimatedHero';
import { 
  FaArrowRight, FaLaptopCode, FaShoppingCart, 
  FaMegaport, FaProjectDiagram, FaRocket 
} from 'react-icons/fa';

const HomePage = () => {
  const { isDarkMode } = useDarkMode();
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState({
    overview: false,
    caseStudies: false,
    quotes: false,
    cta: false
  });
  
  // Refs for scroll animations
  const overviewRef = useRef(null);
  const caseStudiesRef = useRef(null);
  const quotesRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Parallax scrolling effect
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  
  // Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === overviewRef.current) {
              setIsVisible(prev => ({ ...prev, overview: true }));
            } else if (entry.target === caseStudiesRef.current) {
              setIsVisible(prev => ({ ...prev, caseStudies: true }));
            } else if (entry.target === quotesRef.current) {
              setIsVisible(prev => ({ ...prev, quotes: true }));
            } else if (entry.target === ctaRef.current) {
              setIsVisible(prev => ({ ...prev, cta: true }));
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (overviewRef.current) observer.observe(overviewRef.current);
    if (caseStudiesRef.current) observer.observe(caseStudiesRef.current);
    if (quotesRef.current) observer.observe(quotesRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);
    
    return () => {
      if (overviewRef.current) observer.unobserve(overviewRef.current);
      if (caseStudiesRef.current) observer.unobserve(caseStudiesRef.current);
      if (quotesRef.current) observer.unobserve(quotesRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  // Featured quote examples with modern design
  const featuredQuotes = [
    {
      id: 'web-development',
      title: 'Business Website',
      priceRange: '$1,200 - $2,500',
      features: ['5-8 page responsive website', 'Custom design & branding', 'Contact form & basic SEO'],
      icon: <FaLaptopCode className="text-3xl text-primary-blue" />,
      link: '/quote-request?service=web-development&type=basic-business'
    },
    {
      id: 'e-commerce',
      title: 'E-commerce Store',
      priceRange: '$2,500 - $5,000',
      features: ['Fully functional online store', 'Product catalog & shopping cart', 'Payment integration & inventory'],
      icon: <FaShoppingCart className="text-3xl text-primary-blue" />,
      link: '/quote-request?service=e-commerce&type=standard'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      priceRange: '$800 - $1,500/mo',
      features: ['Social media management', 'SEO optimization', 'Monthly analytics reporting'],
      icon: <FaMegaport className="text-3xl text-primary-blue" />,
      link: '/quote-request?service=digital-marketing&type=standard'
    }
  ];

  // Featured core services 
  const coreServices = [
    {
      icon: <FaLaptopCode className="w-10 h-10 text-primary-blue" />,
      title: "Web & App Development",
      description: "Custom websites and applications designed for your business needs and growth objectives.",
      link: "/services/web-development"
    },
    {
      icon: <FaShoppingCart className="w-10 h-10 text-primary-blue" />,
      title: "E-commerce Solutions",
      description: "Complete online stores with secure checkout, inventory management, and customer analytics.",
      link: "/services/ecommerce"
    },
    {
      icon: <FaProjectDiagram className="w-10 h-10 text-primary-blue" />,
      title: "Digital Strategy",
      description: "Strategic planning to maximize your digital presence and achieve business objectives.",
      link: "/services"
    },
    {
      icon: <FaRocket className="w-10 h-10 text-primary-blue" />,
      title: "Growth & Marketing",
      description: "Data-driven campaigns that drive traffic, leads, and sustainable business growth.",
      link: "/services/digital-marketing"
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-primary text-white' : 'bg-white text-text-primary'}`}>
      {/* Enhanced Hero Section with Parallax */}
      <motion.header 
        id="home" 
        className={`${isDarkMode 
          ? 'bg-gradient-to-r from-dark-primary via-dark-secondary to-dark-primary' 
          : 'bg-gradient-to-r from-primary-blue via-primary-purple to-primary-purple'} 
          text-white min-h-screen flex items-center relative overflow-hidden`}
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <ParticleBackground />
        <div className="absolute inset-0 z-10">
          <AnimatedHero />
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.header>
      
      {/* Main Content */}
      <div className="relative z-10">
        {/* Company Overview with Animation */}
        <motion.section 
          ref={overviewRef}
          className="pt-12 pb-24 px-4 sm:px-6 lg:px-8"
          initial={{ opacity: 0 }}
          animate={isVisible.overview ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-primary-blue dark:text-primary-blue font-semibold tracking-wider mb-2">
                WHY CHOOSE US
              </span>
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-blue to-primary-purple">Powering Digital Innovation</h2>
              <p className="text-xl text-text-secondary dark:text-dark-text-primary max-w-3xl mx-auto">
                We combine technical expertise with innovative solutions to help businesses thrive in the digital age.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
              <motion.div 
                className="text-center p-8 bg-light dark:bg-dark-secondary rounded-2xl shadow-card hover:shadow-card-hover transition-all hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-blue to-primary-purple rounded-full mb-6 text-white text-2xl">🎯</div>
                <h3 className="text-xl font-semibold mb-3">Expert Team</h3>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  Our experienced professionals bring years of industry expertise to every project.
                </p>
              </motion.div>
              <motion.div 
                className="text-center p-8 bg-light dark:bg-dark-secondary rounded-2xl shadow-card hover:shadow-card-hover transition-all hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-blue to-primary-purple rounded-full mb-6 text-white text-2xl">⚡</div>
                <h3 className="text-xl font-semibold mb-3">Innovative Solutions</h3>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  We leverage cutting-edge technologies to deliver exceptional results.
                </p>
              </motion.div>
              <motion.div 
                className="text-center p-8 bg-light dark:bg-dark-secondary rounded-2xl shadow-card hover:shadow-card-hover transition-all hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-blue to-primary-purple rounded-full mb-6 text-white text-2xl">🤝</div>
                <h3 className="text-xl font-semibold mb-3">Client-Focused</h3>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  Your success is our priority, with dedicated support throughout your journey.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Core Services Highlight */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-off-white dark:bg-dark-primary rounded-t-3xl">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-primary-blue dark:text-primary-blue font-semibold tracking-wider mb-2">
                WHAT WE DO
              </span>
              <h2 className="text-4xl font-bold mb-4">Core Services</h2>
              <p className="text-xl text-text-secondary dark:text-dark-text-primary max-w-3xl mx-auto">
                Our specialized services to help your business succeed in the digital landscape
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              {coreServices.map((service, index) => (
                <motion.div 
                  key={index}
                  className="flex bg-light dark:bg-dark-secondary rounded-xl p-6 shadow-card border border-gray-100 dark:border-gray-700 hover:shadow-card-hover transition-all duration-300"
                  whileHover={{ y: -10 }}
                >
                  <div className="mr-6 p-4 bg-gradient-to-r from-primary-blue/10 to-primary-purple/10 rounded-xl flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-text-secondary dark:text-dark-text-secondary mb-4">{service.description}</p>
                    <Link 
                      to={service.link} 
                      className="group flex items-center font-medium text-primary-blue hover:text-primary-purple transition"
                    >
                      Learn more
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <Link 
                to="/services" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-primary-blue to-primary-purple text-white font-semibold py-4 px-8 rounded-full hover:shadow-button-hover transition-all duration-300 transform hover:scale-105"
              >
                View All Services
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Quote Examples Section */}
        <motion.section 
          ref={quotesRef}
          className="py-24 px-4 sm:px-6 lg:px-8 bg-light dark:bg-dark-primary"
          initial={{ opacity: 0 }}
          animate={isVisible.quotes ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-primary-purple dark:text-primary-purple font-semibold tracking-wider mb-2">
                QUICK QUOTES
              </span>
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-blue to-primary-purple">Featured Quote Examples</h2>
              <p className="text-xl text-text-secondary dark:text-dark-text-primary max-w-3xl mx-auto">
                Explore sample quotes for our most popular services. Request similar quotes with just one click.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredQuotes.map((quote, index) => (
                <motion.div 
                  key={quote.id}
                  className="bg-light dark:bg-dark-secondary rounded-xl overflow-hidden shadow-card border border-gray-100 dark:border-gray-700 hover:shadow-card-hover transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isVisible.quotes ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="mr-4">{quote.icon}</div>
                        <h3 className="text-xl font-bold">{quote.title}</h3>
                      </div>
                      <span className="px-4 py-2 rounded-full bg-gradient-to-r from-primary-purple/10 to-primary-blue/10 text-primary-purple font-medium text-sm">
                        {quote.priceRange}
                      </span>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {quote.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-primary-blue to-primary-purple flex items-center justify-center mt-0.5">
                            <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          </div>
                          <span className="ml-3 text-text-secondary dark:text-dark-text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                      <Link 
                        to={quote.link} 
                        className="inline-flex items-center justify-center w-full bg-gradient-to-r from-primary-blue to-primary-purple text-white font-medium py-3 px-6 rounded-lg hover:shadow-button transition-all duration-300"
                      >
                        Request Similar Quote
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link 
                to="/quote-request" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-primary-purple to-primary-blue text-white font-semibold py-4 px-8 rounded-full hover:shadow-button-hover transition-all duration-300 transform hover:scale-105"
              >
                Request Custom Quote
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* Case Studies with Visual Appeal */}
        <motion.section 
          ref={caseStudiesRef}
          className="py-24 px-4 sm:px-6 lg:px-8 bg-off-white dark:bg-dark-secondary"
          initial={{ opacity: 0 }}
          animate={isVisible.caseStudies ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="inline-block text-primary-purple dark:text-primary-purple font-semibold tracking-wider mb-2">
                SUCCESS STORIES
              </span>
              <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-blue to-primary-purple">Our Recent Work</h2>
              <p className="text-xl text-text-secondary dark:text-dark-text-primary max-w-3xl mx-auto">
                See how we've helped businesses transform their digital presence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div 
                className="bg-light dark:bg-dark-secondary rounded-xl overflow-hidden shadow-card border border-gray-100 dark:border-gray-700 hover:shadow-card-hover transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="h-48 bg-gradient-to-r from-primary-blue to-primary-purple flex items-center justify-center overflow-hidden">
                  <h3 className="text-3xl font-bold text-white">E-commerce Success</h3>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                      </svg>
                      200% Sales Increase
                    </span>
                  </div>
                  <p className="text-text-secondary dark:text-dark-text-primary mb-6">
                    Helped a retail client increase online sales by 200% through a complete digital transformation, implementing a modern e-commerce platform with personalized recommendations.
                  </p>
                  <Link
                    to="/case-studies/ecommerce-transformation"
                    className="inline-flex items-center text-primary-purple dark:text-primary-purple font-medium group"
                  >
                    Read Case Study 
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-light dark:bg-dark-secondary rounded-xl overflow-hidden shadow-card border border-gray-100 dark:border-gray-700 hover:shadow-card-hover transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="h-48 bg-gradient-to-r from-primary-purple to-primary-blue flex items-center justify-center overflow-hidden">
                  <h3 className="text-3xl font-bold text-white">Mobile App Success</h3>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                      </svg>
                      1M+ Downloads
                    </span>
                  </div>
                  <p className="text-text-secondary dark:text-dark-text-primary mb-6">
                    Developed a cross-platform mobile app that reached 1M+ downloads in its first year, featuring an intuitive interface and powerful backend integration with existing systems.
                  </p>
                  <Link
                    to="/case-studies/mobile-app-success"
                    className="inline-flex items-center text-primary-blue dark:text-primary-blue font-medium group"
                  >
                    Read Case Study
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="text-center mt-12">
              <Link 
                to="/portfolio" 
                className="inline-flex items-center justify-center bg-gradient-to-r from-primary-blue to-primary-purple text-white font-semibold py-4 px-8 rounded-full hover:shadow-button-hover transition-all duration-300 transform hover:scale-105"
              >
                View All Case Studies
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section 
          ref={ctaRef}
          className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-blue to-primary-purple"
          initial={{ opacity: 0 }}
          animate={isVisible.cta ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Start Your Digital Journey?</h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-10">
              Let's transform your ideas into reality. Our team is ready to help you achieve your business goals through innovative technology solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/quote-request" 
                className="inline-flex items-center justify-center bg-white text-primary-purple font-semibold py-4 px-8 rounded-full hover:shadow-button-hover transition-all duration-300 transform hover:scale-105"
              >
                Get a Free Quote
                <FaArrowRight className="ml-2" />
              </Link>
              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center bg-transparent text-white border-2 border-white font-semibold py-4 px-8 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
            
            {/* Dashboard Button */}
            <div className="mt-10">
              {user ? (
                <Link 
                  to="/client/dashboard" 
                  className="inline-flex items-center text-white underline hover:text-white/80 transition-all duration-300"
                >
                  Go to Your Dashboard
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              ) : (
                <Link 
                  to="/login" 
                  className="inline-flex items-center text-white underline hover:text-white/80 transition-all duration-300"
                >
                  Login to Your Account
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default HomePage;