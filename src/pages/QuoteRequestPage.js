// pages/QuoteRequestPage.js
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import QuoteForm from '../components/QuoteForm';
import { addDoc, collection } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';

// New component imports
import PricingSlider from '../components/PricingSlider';
import MotionWrapper from '../components/MotionWrapper';
import StepIndicator from '../components/StepIndicator';

const QuoteRequestPage = () => {
  const { isDarkMode } = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const formRef = useRef(null);
  const { currentUser } = useAuth();
  
  // Main state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [budgetRange, setBudgetRange] = useState([1000, 5000]);
  
  // Get query parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const serviceParam = queryParams.get('service');
  const typeParam = queryParams.get('type');

  // Process steps - modernized and clarified
  const processSteps = [
    {
      number: 1,
      title: 'Choose Service',
      description: 'Select the service category that best fits your project needs.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      number: 2,
      title: 'Set Budget',
      description: 'Determine your investment range to ensure we provide solutions that match your financial plan.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      number: 3,
      title: 'Project Details',
      description: 'Tell us about your specific requirements, timeline, and any other important details.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      )
    },
    {
      number: 4,
      title: 'Review & Submit',
      description: 'Review your information and submit your request for a detailed quote from our team.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      )
    }
  ];

  // Service categories - enhanced with more details and visual identifiers
  const serviceCategories = [
    {
      id: 'web-development',
      name: 'Web Development',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      description: "Custom website solutions from simple landing pages to complex web applications.",
      services: [
        { id: 'basic-website', name: 'Basic Website (5-7 pages)', price: '$350 - $600', minBudget: 350, maxBudget: 600 },
        { id: 'business-website', name: 'Business Website (8-15 pages)', price: '$600 - $1,500', minBudget: 600, maxBudget: 1500 },
        { id: 'e-commerce', name: 'E-commerce Website', price: '$1,000 - $2,500', minBudget: 1000, maxBudget: 2500 }
      ]
    },
    {
      id: 'graphic-design',
      name: 'Graphic Design',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      description: "Professional design services to enhance your brand identity and visual communication.",
      services: [
        { id: 'logo-design', name: 'Logo Design', price: '$150 - $450', minBudget: 150, maxBudget: 450 },
        { id: 'branding-package', name: 'Branding Package', price: '$450 - $800', minBudget: 450, maxBudget: 800 },
        { id: 'social-media-graphics', name: 'Social Media Graphics', price: '$30 - $60 per design', minBudget: 30, maxBudget: 300 }
      ]
    },
    {
      id: 'digital-marketing',
      name: 'Digital Marketing',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      description: "Strategic digital marketing services to boost your online presence and drive results.",
      services: [
        { id: 'social-media-management', name: 'Social Media Management', price: '$200 - $500/mo', minBudget: 200, maxBudget: 500 },
        { id: 'seo-package', name: 'SEO Package', price: '$250 - $600/mo', minBudget: 250, maxBudget: 600 },
        { id: 'email-marketing', name: 'Email Marketing', price: '$150 - $400/mo', minBudget: 150, maxBudget: 400 }
      ]
    },
    {
      id: 'app-development',
      name: 'App Development',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      description: "Custom mobile applications for iOS and Android to extend your digital reach.",
      services: [
        { id: 'ios-app', name: 'iOS App Development', price: '$2,500 - $10,000', minBudget: 2500, maxBudget: 10000 },
        { id: 'android-app', name: 'Android App Development', price: '$2,500 - $10,000', minBudget: 2500, maxBudget: 10000 },
        { id: 'cross-platform-app', name: 'Cross-Platform App', price: '$3,000 - $12,000', minBudget: 3000, maxBudget: 12000 }
      ]
    }
  ];

  // Testimonials - retained but with enhanced structure
  const testimonials = [
    {
      name: "Sarah Johnson",
      company: "Marketing Director, TechGrow Ltd",
      stars: 5,
      image: "/images/testimonials/sarah.jpg",
      testimonial: "The quoting process was incredibly smooth. Within 24 hours, I had a detailed breakdown of costs and timeline. The team at Conison Technologies delivered exactly what they promised, on time and within budget."
    },
    {
      name: "Michael Kimani",
      company: "CEO, LocalEats Delivery",
      stars: 5,
      image: "/images/testimonials/michael.jpg",
      testimonial: "I appreciated the transparency in their quoting process. They clearly explained all costs and what I was getting for my money. No surprises or hidden fees. Their e-commerce solution has increased our sales by 200%."
    },
    {
      name: "Jessica Wambui",
      company: "Marketing Manager, Savannah Tours",
      stars: 4,
      image: "/images/testimonials/jessica.jpg",
      testimonial: "Conison Technologies revamped our digital marketing strategy. The quote process was straightforward, and they were willing to work within our budget constraints."
    }
  ];

  // FAQ items - retained with minor text clarifications
  const faqItems = [
    {
      question: 'How long does it take to get a quote?',
      answer: 'We typically deliver quotes within 24-48 hours of receiving your request. For more complex projects, it may take up to 72 hours to ensure we provide you with an accurate and comprehensive quote.'
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
  ];

  // Handle form data updates
  const updateFormData = (newData) => {
    setFormData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  // Handle service selection
  const handleServiceSelect = (category, service) => {
    setSelectedService({
      category: category,
      service: service
    });
    
    // Update budget range based on service
    setBudgetRange([service.minBudget, service.maxBudget]);
    
    // Update form data
    updateFormData({
      serviceCategory: category.name,
      serviceType: service.name,
      estimatedBudget: `$${service.minBudget} - $${service.maxBudget}`
    });
    
    // Move to next step
    setCurrentStep(2);
  };

  // Handle budget selection
  const handleBudgetSelect = (range) => {
    // Validate budget range values
    const validatedRange = [
      Math.max(range[0], selectedService?.service?.minBudget || 1000),
      Math.min(range[1], selectedService?.service?.maxBudget || 5000)
    ];
    
    // Set the validated range
    setBudgetRange(validatedRange);
    
    // Update form data with formatted budget
    updateFormData({
      estimatedBudget: `$${validatedRange[0]} - $${validatedRange[1]}`
    });
    
    // Move to next step
    setCurrentStep(3);
  };

  // Handle form submission from step 3
  const handleFormSubmit = (formValues) => {
    // Generate the reference number first
    const referenceNumber = `CQ-${Math.floor(Math.random() * 900) + 100}`;
    
    // Combine all form data
    const finalFormData = {
      ...formData,
      ...formValues,
      // Add required metadata
      status: 'pending',
      createdAt: new Date(),
      userId: currentUser?.uid || 'anonymous',
      userEmail: currentUser?.email || formValues.email,
      referenceNumber: referenceNumber, // Use the generated reference number
    };
    
    // Immediately update form data with reference number
    setFormData(prev => ({ 
      ...prev, 
      ...formValues,
      referenceNumber: referenceNumber 
    }));
    
    console.log("Final form submission:", finalFormData);
    
    // Move to final step
    setCurrentStep(4);
    
    // Submit data to Firebase
    const submitQuote = async () => {
      try {
        // If the user is authenticated, use their user ID
        if (currentUser) {
          // Add to Firestore quotes collection
          const docRef = await addDoc(collection(db, 'quotes'), finalFormData);
          console.log("Quote submitted with ID:", docRef.id);
          
          // Send email notification to admin (would implement server-side)
          // This would typically be handled by a Cloud Function
          
        } else {
          // For anonymous users, still store the data
          const docRef = await addDoc(collection(db, 'quotes'), {
            ...finalFormData,
            isAnonymous: true
          });
          console.log("Anonymous quote submitted with ID:", docRef.id);
          
        }
        
        // Show success message
        toast.success("Your quote request has been submitted successfully!");
        
      } catch (error) {
        console.error("Error submitting quote:", error);
        // Show error message to user
        toast.error("There was an error submitting your quote. Please try again.");
      }
    };
    
    // Execute the submission
    submitQuote();
    
    // Optionally redirect to a thank you page after a delay
    // setTimeout(() => navigate('/thank-you'), 3000);
  };

  // Pre-fill values based on query params
  useEffect(() => {
    // Default values
    let prefilledValues = {};

    // Service mappings based on URL parameters
    if (serviceParam) {
      const category = serviceCategories.find(cat => cat.id === serviceParam);
      
      if (category) {
        let selectedServiceItem = null;
        
        if (typeParam) {
          selectedServiceItem = category.services.find(service => service.id === typeParam);
        }
        
        if (selectedServiceItem) {
          setSelectedService({
            category: category,
            service: selectedServiceItem
          });
          
          setBudgetRange([selectedServiceItem.minBudget, selectedServiceItem.maxBudget]);
          
          prefilledValues = {
            serviceCategory: category.name,
            serviceType: selectedServiceItem.name,
            estimatedBudget: `$${selectedServiceItem.minBudget} - $${selectedServiceItem.maxBudget}`
          };
          
          // If we have both service and type, skip to step 3
          setCurrentStep(3);
        } else {
          // If we just have service category, show the service selection
          setCurrentStep(1);
        }
        
        updateFormData(prefilledValues);
      }
    }
    
    setIsPageLoaded(true);
  }, [serviceParam, typeParam, serviceCategories]);

  // Scroll to form when step changes
  useEffect(() => {
    if (currentStep > 1 && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section - Modernized with cleaner design */}
      <header className={`relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-r from-red-600 via-blue-600 to-red-600'
      }`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <MotionWrapper delay={0.1}>
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-4">
                Project Quote Request
              </span>
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Get Your Custom Project Quote
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-8">
                Tell us about your project needs and receive a transparent, detailed quote within 48 hours.
              </p>
              <button 
                onClick={() => formRef.current.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-6 py-3 bg-white text-red-600 rounded-lg shadow-lg hover:shadow-xl transition duration-300 font-medium"
              >
                Start Your Quote
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
            </div>
          </MotionWrapper>
          
          {/* Process Step Indicators */}
          <MotionWrapper delay={0.3}>
            <div className="mt-16 max-w-5xl mx-auto bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-3">
                {processSteps.map((step, index) => {
                  // Define classes based on step status
                  const isActive = step.number === currentStep;
                  const isCompleted = step.number < currentStep;
                  const isPending = step.number > currentStep;
                  
                  // Set colors based on status
                  const circleClasses = isActive 
                    ? "bg-gradient-to-r from-red-600 to-blue-600 text-white ring-4 ring-red-200 dark:ring-red-900/50 shadow-lg"
                    : isCompleted 
                      ? "bg-green-500 text-white" 
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400";
                      
                  const titleClasses = isActive
                    ? "text-white dark:text-white font-bold text-lg"
                    : isCompleted
                      ? "text-white dark:text-white font-bold"
                      : "text-white/80 dark:text-white/80";
                      
                  const descClasses = isActive
                    ? "text-white/90 dark:text-white/90 font-medium"
                    : "text-white/70 dark:text-white/70";
                  
                  return (
                    <div key={step.number} className={`relative ${isActive ? 'z-10' : 'z-0'}`}>
                      {/* Connect line for desktop */}
                      {index > 0 && (
                        <div className="hidden md:block absolute h-1 bg-gray-300 dark:bg-gray-700 left-0 right-0 top-8 -translate-y-1/2 -z-10"
                          style={{ width: "calc(100% - 1rem)", left: "-50%" }}
                        />
                      )}
                      
                      <div 
                        className={`flex flex-col items-center text-center p-4 rounded-xl transition-all duration-300
                          ${isActive 
                            ? 'bg-gradient-to-br from-red-600/20 to-blue-600/20 transform scale-105 shadow-lg border border-white/10' 
                            : ''}`}
                      >
                        {/* Number Circle */}
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${circleClasses}`}>
                          {isCompleted ? (
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <span className="text-2xl font-bold">{step.number}</span>
                          )}
                        </div>
                        
                        {/* Title & Description */}
                        <h3 className={`font-semibold mb-2 ${titleClasses}`}>{step.title}</h3>
                        <p className={`text-sm ${descClasses}`}>{step.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </MotionWrapper>
        </div>
      </header>
      
      {/* Main Quote Request Flow - Multistep approach */}
      <main ref={formRef} className="container mx-auto px-4 py-16">
        {/* Step 1: Service Selection */}
        {currentStep === 1 && (
          <MotionWrapper>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
                  What service are you interested in?
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Select a service category and specific service to get started.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                {serviceCategories.map((category) => (
                  <div 
                    key={category.id}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all hover:shadow-xl duration-300"
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-red-100/10'} text-red-600 mr-4`}>
                        {category.icon}
                      </div>
                      <h3 className="text-xl font-semibold dark:text-white">{category.name}</h3>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {category.description}
                    </p>
                    
                    <div className="space-y-4">
                      {category.services.map((service) => (
                        <div 
                          key={service.id}
                          onClick={() => handleServiceSelect(category, service)}
                          className="flex justify-between items-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div>
                            <h4 className="font-medium dark:text-white">{service.name}</h4>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Starting from {service.price}</span>
                          </div>
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionWrapper>
        )}
        
        {/* Step 2: Budget Setting */}
        {currentStep === 2 && selectedService && (
          <MotionWrapper>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
                  Set Your Budget
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Adjust your budget range for your {selectedService.service.name} project.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <div className="flex items-center mb-8">
                  <div className={`p-3 rounded-xl ${isDarkMode ? 'bg-gray-700' : 'bg-red-100'} text-red-600 dark:text-red-400 mr-4`}>
                    {selectedService.category.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold dark:text-white">{selectedService.category.name}</h3>
                    <p className="text-red-600 dark:text-red-400">{selectedService.service.name}</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <h4 className="font-medium mb-2 dark:text-white">Estimated Price Range:</h4>
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600 mb-6">
                    ${selectedService.service.minBudget} - ${selectedService.service.maxBudget}
                  </div>
                  
                  <PricingSlider 
                    min={selectedService.service.minBudget}
                    max={selectedService.service.maxBudget}
                    value={budgetRange}
                    onChange={setBudgetRange}
                  />
                  
                  {/* Helper text for small budget ranges */}
                  {(selectedService.service.maxBudget - selectedService.service.minBudget) < 500 && (
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <p className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Tip: You can either drag the slider handles or directly type your preferred budget in the input fields.
                      </p>
                    </div>
                  )}
                  
                  <div className="mt-4 text-center">
                    <button 
                      onClick={() => handleBudgetSelect(budgetRange)}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                    >
                      Set Budget
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl mb-8">
                  <h4 className="font-medium mb-2 dark:text-white">What This Budget Typically Includes:</h4>
                  <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Professional design and development</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Project management and coordination</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>Testing and quality assurance</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>30 days of post-launch support</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => handleBudgetSelect(budgetRange)}
                    className="px-6 py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </MotionWrapper>
        )}
        
        {/* Step 3: Project Details Form */}
        {currentStep === 3 && (
          <MotionWrapper>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
                  Project Details
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us more about your project requirements and timeline.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                {/* Summary of selections so far */}
                {selectedService && (
                  <div className={`p-6 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <h3 className="font-medium mb-4 dark:text-white">Your Selections:</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Service:</span>
                        <p className="font-medium dark:text-white">{formData.serviceCategory}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                        <p className="font-medium dark:text-white">{formData.serviceType}</p>
                      </div>
                      </div>
                    
                    {/* Enhanced budget display */}
                    <div className="mt-4 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Your Budget Range:</span>
                        <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-blue-600">{formData.estimatedBudget}</span>
                      </div>
                      
                      {/* Visual budget indicator */}
                      <div className="mt-2">
                        <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-600 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-red-600 to-blue-600"
                            style={{
                              width: `${((
                                parseInt(formData.estimatedBudget?.split(' - ')[1]?.replace(/[^0-9]/g, '')) - 
                                parseInt(formData.estimatedBudget?.split(' - ')[0]?.replace(/[^0-9]/g, ''))
                              ) / (selectedService.service.maxBudget - selectedService.service.minBudget)) * 100}%`,
                              marginLeft: `${((
                                parseInt(formData.estimatedBudget?.split(' - ')[0]?.replace(/[^0-9]/g, '')) - 
                                selectedService.service.minBudget
                              ) / (selectedService.service.maxBudget - selectedService.service.minBudget)) * 100}%`
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                          <span>${selectedService.service.minBudget}</span>
                          <span>${selectedService.service.maxBudget}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="p-6">
                  <QuoteForm
                    initialValues={formData}
                    onSubmit={handleFormSubmit}
                    onPrevious={() => setCurrentStep(2)}
                  />
                </div>
              </div>
            </div>
          </MotionWrapper>
        )}
        
        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <MotionWrapper>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
                  Quote Request Submitted!
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Thank you for your quote request. Our team will review your project details and get back to you 
                  with a detailed quote within 48 hours.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
                <h3 className="text-lg font-semibold mb-4 dark:text-white">Your Request Summary:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Service:</span>
                      <p className="font-medium dark:text-white">{formData.serviceCategory}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Type:</span>
                      <p className="font-medium dark:text-white">{formData.serviceType}</p>
                    </div>
                    <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Your Budget Range:</span>
                    <p className="font-medium dark:text-white">{formData.estimatedBudget}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Reference Number:</span>
                    <p className="font-medium dark:text-white">{formData.referenceNumber}</p>
                    </div>
                  </div>
                  
                {/* Next Steps */}
                <div className="mt-8">
                  <h4 className="text-base font-semibold mb-3 dark:text-white">Next Steps:</h4>
                  <ol className="space-y-4">
                      <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 bg-gradient-to-r from-red-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 mt-0.5">
                        1
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">Our team will review your request and prepare a detailed quote.</p>
                      </li>
                      <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 bg-gradient-to-r from-red-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 mt-0.5">
                        2
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">You'll receive your quote via email within 48 hours.</p>
                      </li>
                      <li className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 bg-gradient-to-r from-red-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs mr-3 mt-0.5">
                        3
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">We'll schedule a consultation call to discuss your quote and project details.</p>
                      </li>
                  </ol>
                </div>
                
                {/* Action buttons */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    to="/"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Return to Home
                  </Link>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg hover:from-red-700 hover:to-blue-700 transition-colors"
                  >
                    Explore Our Services
                  </Link>
                </div>
              </div>
            </div>
          </MotionWrapper>
        )}
      </main>
      
      {/* Testimonials Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}>
        <div className="container mx-auto px-4">
          <MotionWrapper>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
                What Our Clients Say
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Don't just take our word for it. Here's what our clients have to say about our quote process and project delivery.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 mr-4">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name.replace(/\s+/g, '+')}&background=random`;
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold dark:text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[1, 2, 3, 4, 5].map(star => (
                      <svg 
                        key={star} 
                        className={`w-5 h-5 ${star <= testimonial.stars ? 'text-red-500' : 'text-gray-300 dark:text-gray-600'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 italic">
                    "{testimonial.testimonial}"
                  </p>
                </div>
              ))}
            </div>
          </MotionWrapper>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <MotionWrapper>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Have questions about our quote process? Find answers to common questions below.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((faq, index) => (
                <details 
                  key={index} 
                  className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
                >
                  <summary className="flex justify-between items-center cursor-pointer p-6 list-none">
                    <h5 className="text-gray-800 dark:text-white font-medium">{faq.question}</h5>
                    <span className={`ml-6 p-1.5 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} transform group-open:rotate-180 transition-transform duration-200`}>
                      <svg className={`w-4 h-4 ${isDarkMode ? 'text-red-500' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-2 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Still have questions? Contact our team for assistance.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                Contact Support
              </Link>
            </div>
          </MotionWrapper>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 mb-8">
        <div className="container mx-auto px-4">
          <MotionWrapper>
            <div className={`rounded-3xl overflow-hidden shadow-xl ${
              isDarkMode 
                ? 'bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 border border-gray-700' 
                : 'bg-gradient-to-r from-red-600 via-blue-600 to-red-600'
            }`}>
              <div className="p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  Ready to Start Your Project?
                </h2>
                <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                  Let's turn your ideas into reality. Get a detailed quote tailored to your specific project needs.
                </p>
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    formRef.current.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center px-8 py-4 bg-white text-red-600 rounded-lg shadow-lg hover:shadow-xl transition-all font-medium text-lg"
                >
                  Get Your Quote Now
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>
    </div>
  );
};

export default QuoteRequestPage;