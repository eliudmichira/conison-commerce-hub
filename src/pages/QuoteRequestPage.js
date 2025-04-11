// pages/QuoteRequestPage.js
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDarkMode } from '../context/DarkModeContext';

// Lazy load components that aren't immediately visible
const ParticleBackground = lazy(() => import('../components/ParticleBackground'));
const QuoteForm = lazy(() => import('../components/QuoteForm'));

// Lightweight loading component
const LoadingFallback = () => (
  <div className="flex justify-center items-center p-8">
    <div className="w-8 h-8 border-4 border-conison-magenta/30 border-t-conison-magenta rounded-full animate-spin"></div>
  </div>
);

// Success message component
const SuccessMessage = ({ onClose }) => {
  const { isDarkMode } = useDarkMode();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl shadow-xl overflow-hidden max-w-md mx-auto ${
        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
      }`}
    >
      <div className="bg-gradient-to-r from-conison-cyan to-conison-magenta p-4">
        <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-conison-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>
      <div className="p-6 text-center">
        <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Quote Request Submitted!
        </h3>
        <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Thank you for your request. Our team will review your project details and get back to you within 48 hours with a detailed quote.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gradient-to-r from-conison-cyan to-conison-magenta text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Submit Another Request
          </button>
          <Link
            to="/client/dashboard"
            className={`px-4 py-2 rounded-lg border ${
              isDarkMode 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            } transition-colors`}
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

// Icon components for better performance
const ProcessIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
  </svg>
);

const TestimonialsIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
  </svg>
);

const FAQIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
  </svg>
);

const QuoteRequestPage = () => {
  const { isDarkMode } = useDarkMode();
  const [currentTab, setCurrentTab] = useState('form');
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const location = useLocation();
  
  // Get query parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const serviceParam = queryParams.get('service');
  const typeParam = queryParams.get('type');

  // Pre-fill values based on query params
  const getPrefilledValues = () => {
    // Default values
    const prefilledValues = {};

    // Service mappings based on URL parameters
    if (serviceParam) {
      switch(serviceParam) {
        case 'web-development':
          prefilledValues.serviceCategory = 'Web Development';
          prefilledValues.serviceType = typeParam === 'basic-business' ? 'Basic Website (5-7 pages)' : '';
          prefilledValues.budget = '1000-5000';
          break;
        case 'e-commerce':
          prefilledValues.serviceCategory = 'Web Development';
          prefilledValues.serviceType = 'E-commerce Website';
          prefilledValues.budget = '5000-10000';
          break;
        case 'digital-marketing':
          prefilledValues.serviceCategory = 'Digital Marketing';
          prefilledValues.budget = '1000-5000';
          break;
        default:
          break;
      }
    }

    return prefilledValues;
  };

  // Pass these pre-filled values to the QuoteForm component
  const prefilledValues = getPrefilledValues();

  // Animate elements on page load
  useEffect(() => {
    setIsPageLoaded(true);
    
    // If we have query parameters, automatically focus on the form tab
    if (serviceParam || typeParam) {
      setCurrentTab('form');
    }
  }, [serviceParam, typeParam]);

  // Handle form submission success
  const handleFormSuccess = () => {
    setShowSuccess(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset success state
  const resetSuccess = () => {
    setShowSuccess(false);
  };

  // Service categories for pricing - memoized to reduce re-renders
  const serviceCategories = React.useMemo(() => [
    {
      name: 'Web Development',
      services: [
        { name: 'Basic Website (5-7 pages)', price: '$350 - $600' },
        { name: 'Business Website (8-15 pages)', price: '$600 - $1,500' },
        { name: 'E-commerce Website', price: '$1,000 - $2,500' }
      ]
    },
    {
      name: 'Graphic Design',
      services: [
        { name: 'Logo Design', price: '$150 - $450' },
        { name: 'Branding Package', price: '$450 - $800' },
        { name: 'Social Media Graphics', price: '$30 - $60' }
      ]
    },
    {
      name: 'Digital Marketing',
      services: [
        { name: 'Social Media Management', price: '$200 - $500/mo' },
        { name: 'SEO Package', price: '$250 - $600/mo' },
        { name: 'Email Marketing', price: '$150 - $400/mo' }
      ]
    }
  ], []);

  // FAQ items
  const faqItems = React.useMemo(() => [
    {
      question: 'How long does it take to get a quote?',
      answer: 'We typically deliver quotes within 48 hours of receiving your request. For more complex projects, it may take up to 72 hours to ensure we provide you with an accurate and comprehensive quote.'
    },
    {
      question: 'What information do you need for an accurate quote?',
      answer: 'The more details you provide, the more accurate your quote will be. Key information includes your project scope, specific features needed, timeline requirements, and budget constraints. Any examples or references of similar projects are also helpful.'
    },
    {
      question: 'Is the quote binding or subject to change?',
      answer: 'Our quotes are valid for 30 days and the price remains fixed unless the project scope changes. If you request additional features or services after the quote is approved, we\'ll provide a separate quote for those changes.'
    },
    {
      question: 'What payment terms do you offer?',
      answer: 'For most projects, we require a 40% deposit to begin work, with 30% due at the midpoint and the remaining 30% upon completion. For larger projects, we can discuss custom payment schedules that work for your budget and timeline.'
    }
  ], []);

  // Process steps
  const processSteps = React.useMemo(() => [
    {
      number: 1,
      title: "Submit Request",
      description: "Fill out our comprehensive quote request form with details about your project needs."
    },
    {
      number: 2,
      title: "Project Analysis",
      description: "Our team will analyze your requirements and prepare a detailed quotation for your project."
    },
    {
      number: 3,
      title: "Quote Delivery",
      description: "Within 48 hours, you'll receive a detailed quote with project scope and cost breakdown."
    },
    {
      number: 4,
      title: "Project Start",
      description: "Once approved, we'll schedule a kickoff meeting and begin working on your project."
    }
  ], []);

  // Testimonials
  const testimonials = React.useMemo(() => [
    {
      name: "Sarah Johnson",
      company: "Marketing Director, TechGrow Ltd",
      stars: 5,
      testimonial: "The quoting process was incredibly smooth. Within 24 hours, I had a detailed breakdown of costs and timeline. The team at Conison Technologies delivered exactly what they promised, on time and within budget."
    },
    {
      name: "Michael Kimani",
      company: "CEO, LocalEats Delivery",
      stars: 5,
      testimonial: "I appreciated the transparency in their quoting process. They clearly explained all costs and what I was getting for my money. No surprises or hidden fees. Their e-commerce solution has increased our sales by 200%."
    },
    {
      name: "Jessica Wambui",
      company: "Marketing Manager, Savannah Tours",
      stars: 4,
      testimonial: "Conison Technologies revamped our digital marketing strategy. The quote process was straightforward, and they were willing to work within our budget constraints. Their social media management has helped us increase engagement by 150%."
    }
  ], []);

  // Why choose us points
  const whyChooseUs = React.useMemo(() => [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      ),
      text: "Expert team with years of industry experience"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      ),
      text: "Fast turnaround time with quality results"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      text: "Dedicated support team available to help"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      ),
      text: "Competitive pricing with no hidden fees"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
        </svg>
      ),
      text: "Customized solutions tailored to your needs"
    }
  ], []);

  // Tabs configuration
  const tabs = [
    { id: 'form', label: 'Quote Form', icon: <ProcessIcon /> },
    { id: 'testimonials', label: 'Testimonials', icon: <TestimonialsIcon /> },
    { id: 'faq', label: 'FAQ', icon: <FAQIcon /> }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Particles */}
      <header className={`${isDarkMode 
        ? 'bg-gradient-to-br from-gray-800 to-gray-900' 
        : 'bg-gradient-to-br from-conison-cyan to-conison-magenta'} 
        text-white relative overflow-hidden`}
      >
        <Suspense fallback={<div className="min-h-[20vh]"></div>}>
          <ParticleBackground />
        </Suspense>
        <div className="container mx-auto px-4 py-16 md:py-24 z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isPageLoaded ? 1 : 0, y: isPageLoaded ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-4 shadow-sm">
              Request a Custom Project Quote
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight">Get Your Project Quoted</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-light">
              Tell us about your needs and we'll create a customized solution with transparent pricing within 48 hours.
            </p>
          </motion.div>
        </div>
      </header>

      <div className={`bg-gray-50 dark:bg-gray-900 transition-opacity duration-500 ${isPageLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Process Steps */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center dark:text-white">How Our Quote Process Works</h2>
            <div className="relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-conison-cyan/20 via-conison-magenta/20 to-conison-cyan/20 transform -translate-y-1/2 hidden md:block"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {processSteps.map((step, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex-1 relative z-10 transform transition-all hover:-translate-y-1 hover:shadow-xl duration-300">
                    <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-xl ${isDarkMode ? 'bg-gradient-to-br from-gray-800 to-conison-magenta' : 'bg-gradient-to-br from-conison-yellow to-conison-magenta'} text-white flex items-center justify-center font-bold shadow-lg`}>
                      {step.number}
                    </div>
                    <h3 className="text-lg font-semibold mb-3 mt-4 text-center text-gray-800 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isPageLoaded ? 1 : 0, y: isPageLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:w-2/3"
            >
              {/* Tab Navigation */}
              <div className="mb-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  {tabs.map((tab) => (
                    <button 
                      key={tab.id}
                      onClick={() => setCurrentTab(tab.id)}
                      className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 flex items-center justify-center ${
                        currentTab === tab.id 
                          ? `text-conison-magenta dark:text-conison-magenta border-b-2 border-conison-magenta dark:border-conison-magenta ${isDarkMode ? 'bg-gray-900/5' : 'bg-conison-magenta/10'}` 
                          : 'text-gray-600 dark:text-gray-300 hover:text-conison-magenta dark:hover:text-conison-magenta hover:bg-gray-50 dark:hover:bg-gray-700/30'
                      }`}
                      aria-selected={currentTab === tab.id}
                      role="tab"
                    >
                      {tab.icon}
                      {tab.label}
                    </button>
                  ))}
                </div>
              
                {/* Tab Content */}
                <div className="p-8" id="quote-form">
                  {currentTab === 'form' ? (
                    <Suspense fallback={<LoadingFallback />}>
                      {showSuccess ? (
                        <SuccessMessage onClose={resetSuccess} />
                      ) : (
                        <QuoteForm prefilledValues={prefilledValues} onFormSuccess={handleFormSuccess} />
                      )}
                    </Suspense>
                  ) : currentTab === 'testimonials' ? (
                    <div className="transition-opacity duration-300">
                      <h3 className="text-2xl font-bold mb-8 dark:text-white">What Our Clients Say</h3>
                      
                      <div className="grid grid-cols-1 gap-8">
                        {testimonials.map((testimonial, index) => (
                          <div key={index} className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300">
                            <div className="flex flex-wrap items-center mb-4 gap-4">
                              <div className={`h-12 w-12 rounded-full ${isDarkMode ? 'bg-conison-gray/30' : 'bg-conison-cyan/20'} flex items-center justify-center text-conison-cyan dark:text-conison-cyan mr-2`}>
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800 dark:text-white">{testimonial.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                              </div>
                              
                              <div className="ml-auto flex" aria-label={`Rating: ${testimonial.stars} out of 5 stars`}>
                                {[1, 2, 3, 4, 5].map(star => (
                                  <svg key={star} className={`w-5 h-5 ${star <= testimonial.stars ? 'text-conison-yellow' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                  </svg>
                                ))}
                              </div>
                            </div>
                            <div className="relative">
                              <svg className="absolute left-0 top-0 h-8 w-8 text-gray-200 dark:text-gray-700 transform -translate-x-3 -translate-y-2 opacity-50" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                              </svg>
                              <p className="text-gray-600 dark:text-gray-300 pl-4 italic">
                                {testimonial.testimonial}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-10 text-center">
                        <button 
                          onClick={() => setCurrentTab('form')}
                          className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white ${isDarkMode ? 'bg-conison-magenta hover:bg-opacity-90' : 'bg-conison-magenta hover:bg-opacity-90'} transition duration-150 shadow-md`}
                        >
                          Get Your Quote Now
                          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ) : currentTab === 'faq' ? (
                    <div className="transition-opacity duration-300">
                      <h3 className="text-2xl font-bold mb-8 dark:text-white">Frequently Asked Questions</h3>
                      <div className="space-y-6">
                        {faqItems.map((faq, index) => (
                          <div key={index} className={`rounded-lg p-6 ${isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'} shadow-lg transition-colors`}>
                            <h4 className="text-lg font-semibold mb-2 dark:text-white">{faq.question}</h4>
                            <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
            
            {/* Sidebar with Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isPageLoaded ? 1 : 0, y: isPageLoaded ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:w-1/3"
            >
              <div className="sticky top-24 space-y-6">
                {/* Why Choose Us */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                    <span className={`inline-flex items-center justify-center p-1.5 mr-3 rounded-lg ${
                      isDarkMode ? 'bg-conison-cyan/30 text-conison-cyan' : 'bg-conison-cyan/20 text-conison-cyan'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </span>
                    Why Choose Conison Technologies
                  </h3>
                  <ul className="space-y-4 mt-6">
                    {whyChooseUs.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`text-conison-cyan dark:text-conison-cyan mt-0.5 mr-3 flex-shrink-0 ${isDarkMode ? 'bg-conison-cyan/20' : 'bg-conison-cyan/10'} rounded-lg p-1.5`}>
                          {item.icon}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{item.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Price Ranges */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                    <span className={`inline-flex items-center justify-center p-1.5 mr-3 rounded-lg ${
                      isDarkMode ? 'bg-conison-cyan/30 text-conison-cyan' : 'bg-conison-cyan/20 text-conison-cyan'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </span>
                    Estimated Price Ranges
                  </h3>
                  <div className="space-y-5 mt-4">
                    {serviceCategories.map((category, index) => (
                      <div key={index} className={`${index > 0 ? 'pt-4 border-t border-gray-100 dark:border-gray-700' : ''}`}>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                          {category.name}
                        </h4>
                        <ul className="space-y-2">
                          {category.services.map((service, serviceIndex) => (
                            <li key={serviceIndex} className="flex justify-between items-center bg-gray-50 dark:bg-gray-800/50 p-2 px-3 rounded-lg">
                              <span className="text-sm text-gray-600 dark:text-gray-400">{service.name}</span>
                              <span className="text-sm font-medium bg-gradient-to-r from-conison-magenta to-conison-cyan bg-clip-text text-transparent">{service.price}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg italic">
                    * Rates are estimates based on typical projects. Your detailed quote will be customized based on your specific requirements.
                  </p>
                  <div className="mt-4 text-center">
                    <Link 
                      to="/rate-card"
                      className={`inline-flex items-center font-medium text-conison-cyan hover:underline text-sm hover:text-conison-magenta`}
                    >
                      View Full Rate Card
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 backdrop-blur-sm">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white flex items-center">
                    <span className={`inline-flex items-center justify-center p-1.5 mr-3 rounded-lg ${
                      isDarkMode ? 'bg-conison-cyan/30 text-conison-cyan' : 'bg-conison-cyan/20 text-conison-cyan'
                    }`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </span>
                    Need Help?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                    If you have any questions about our quote process or need assistance filling out the form, our team is here to help.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-conison-yellow/10 flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-conison-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 dark:text-white">Phone</h3>
                        <a href="tel:+211920504110" className="text-conison-cyan hover:underline">+211 920504110</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-conison-magenta/10 flex items-center justify-center mr-4">
                        <svg className="w-6 h-6 text-conison-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-1 dark:text-white">Email</h3>
                        <a href="mailto:info@conisontechnologies.com" className="text-conison-cyan hover:underline">info@conisontechnologies.com</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 mb-16"
      >
        <div className="bg-gradient-to-br from-conison-yellow/5 via-conison-magenta/5 to-conison-cyan/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">Ready to Get Started?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Let's turn your ideas into reality. Fill out our quote form above to get started on your project journey.
          </p>
          <button
            onClick={() => {
              setCurrentTab('form');
              document.getElementById('quote-form').scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-conison-magenta hover:bg-conison-magenta/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-conison-magenta/50 transition-all duration-200"
          >
            Request a Quote Now
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </button>
        </div>
      </motion.div>
      
      {/* Feedback Button - Only render when fully loaded */}
      {isPageLoaded && (
        <div className="fixed bottom-8 right-8 z-50">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-gradient-to-r from-conison-cyan to-conison-magenta text-white rounded-full px-4 py-3 shadow-lg hover:shadow-xl transition-shadow"
            onClick={() => {
              alert("Thank you for your interest in providing feedback! We appreciate your thoughts on our quote request process. This feature will be available soon.");
            }}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
            </svg>
            Feedback
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default QuoteRequestPage;