// src/components/QuoteForm.js
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import services from '../data/ServiceData';
import { useDarkMode } from '../context/DarkModeContext';

// Form field components for reusability
const FormInput = ({ id, label, type = "text", register, errors, validation = {}, placeholder = "", required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label} {required && '*'}
    </label>
    <input
      type={type}
      id={id}
      {...register(id, validation)}
      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
        errors[id] ? "border-red-500 dark:border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
    />
    {errors[id] && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[id].message}</p>
    )}
  </div>
);

const FormSelect = ({ id, label, options = [], register, errors, validation = {}, placeholder = "Select an option", disabled = false, required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label} {required && '*'}
    </label>
    <select
      id={id}
      {...register(id, validation)}
      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
        errors[id] ? "border-red-500 dark:border-red-500" : "border-gray-300"
      }`}
      disabled={disabled}
    >
      <option value="">{placeholder}</option>
      {Array.isArray(options) && options.map((option, index) => {
        if (option === undefined || option === null) return null;
        return (
          <option key={index} value={typeof option === 'string' ? option : (option.value || '')}>
            {typeof option === 'string' ? option : (option.label || option.value || 'Unknown option')}
          </option>
        );
      })}
    </select>
    {errors[id] && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[id].message}</p>
    )}
  </div>
);

const FormTextarea = ({ id, label, register, errors, validation = {}, rows = 4, placeholder = "", helpText = "", required = false }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
      {label} {required && '*'}
    </label>
    <textarea
      id={id}
      {...register(id, validation)}
      rows={rows}
      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
        errors[id] ? "border-red-500 dark:border-red-500" : "border-gray-300"
      }`}
      placeholder={placeholder}
    ></textarea>
    {errors[id] && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[id].message}</p>
    )}
    {helpText && (
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{helpText}</div>
    )}
  </div>
);

const FormCheckboxGroup = ({ label, name, options, register }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label}
    </label>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {options.map((option, index) => (
        <div key={index} className="flex items-start">
          <input
            type="checkbox"
            id={`${name}-${index}`}
            value={option}
            {...register(name)}
            className="mt-1 h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor={`${name}-${index}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            {option}
          </label>
        </div>
      ))}
    </div>
  </div>
);

const FormRadioGroup = ({ id, label, options, register, errors, validation = {}, required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label} {required && '*'}
    </label>
    <div className="space-y-2">
      {options.map((option, index) => (
        <div key={index} className="flex items-center">
          <input
            type="radio"
            id={`${id}-${index}`}
            value={option.value || option}
            {...register(id, validation)}
            className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor={`${id}-${index}`} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            {option.label || option}
          </label>
        </div>
      ))}
    </div>
    {errors[id] && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[id].message}</p>
    )}
  </div>
);

// Rating component for scales of 1-5
const FormRating = ({ id, label, options, register, errors, validation = {}, helpText = "", required = false }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label} {required && '*'}
    </label>
    {helpText && (
      <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">{helpText}</div>
    )}
    <div className="flex flex-wrap gap-4">
      {options.map((option) => (
        <div key={option.value} className="flex flex-col items-center">
          <input
            type="radio"
            id={`${id}-${option.value}`}
            value={option.value}
            {...register(id, validation)}
            className="sr-only"
          />
          <label 
            htmlFor={`${id}-${option.value}`}
            className={`flex flex-col items-center cursor-pointer transition-all duration-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700`}
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 mb-1 text-lg font-medium
              ${errors[id] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'}
              peer-checked:border-conison-magenta peer-checked:bg-conison-magenta`}
            >
              {option.value}
            </div>
            <span className="text-xs text-center text-gray-600 dark:text-gray-400">{option.label}</span>
          </label>
        </div>
      ))}
    </div>
    {errors[id] && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[id].message}</p>
    )}
  </div>
);

// Constants
const BUDGET_OPTIONS = [
  { value: "under-1000", label: "Under $1,000" },
  { value: "1000-5000", label: "$1,000 - $5,000" },
  { value: "5000-10000", label: "$5,000 - $10,000" },
  { value: "10000-20000", label: "$10,000 - $20,000" },
  { value: "20000-50000", label: "$20,000 - $50,000" },
  { value: "50000-plus", label: "$50,000+" },
  { value: "not-sure", label: "Not sure yet / Need consultation" }
];

const TIMELINE_OPTIONS = [
  'Less than 1 month',
  '1-2 months',
  '3-6 months',
  '6+ months',
  'Ongoing support'
];

const HEAR_ABOUT_US_OPTIONS = [
  'Google Search',
  'Social Media',
  'Referral from a friend',
  'Previous Client',
  'Other'
];

const PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low - Not urgent, planning phase' },
  { value: 'medium', label: 'Medium - Important but flexible timeline' },
  { value: 'high', label: 'High - Urgent, need to complete soon' },
  { value: 'critical', label: 'Critical - Time-sensitive, top priority' }
];

const COMMUNICATION_OPTIONS = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone Call' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'meeting', label: 'In-person Meeting' },
  { value: 'video', label: 'Video Call (Zoom/Google Meet)' }
];

const INDUSTRY_OPTIONS = [
  'Technology',
  'Healthcare',
  'Education',
  'Finance & Banking',
  'E-commerce & Retail',
  'Real Estate',
  'Hospitality & Tourism',
  'Manufacturing',
  'Media & Entertainment',
  'Government & NGO',
  'Professional Services',
  'Other'
];

const BUSINESS_SCALE_OPTIONS = [
  { value: 'startup', label: 'Startup (1-10 employees)' },
  { value: 'small', label: 'Small Business (11-50 employees)' },
  { value: 'medium', label: 'Medium Business (51-200 employees)' },
  { value: 'large', label: 'Large Business (201-1000 employees)' },
  { value: 'enterprise', label: 'Enterprise (1000+ employees)' },
  { value: 'individual', label: 'Individual/Freelancer' }
];

const CONTENT_READINESS_OPTIONS = [
  { value: 'not-started', label: 'Not started - We will need complete content creation' },
  { value: 'in-progress', label: 'In progress - We have some content but need help completing it' },
  { value: 'ready', label: 'Ready - We have all content prepared and ready to use' },
  { value: 'need-audit', label: 'Have existing content - Needs review/audit' }
];

const IMPORTANCE_RATING_OPTIONS = [
  { value: '1', label: 'Not Important' },
  { value: '2', label: 'Somewhat Important' },
  { value: '3', label: 'Important' },
  { value: '4', label: 'Very Important' },
  { value: '5', label: 'Critical' }
];

const QuoteForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useDarkMode();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [projectTypes, setProjectTypes] = useState([]);
  const [prefilled, setPrefilled] = useState(false);
  const [prefilledService, setPrefilledService] = useState('');
  const [prefilledPrice, setPrefilledPrice] = useState('');
  const initialService = new URLSearchParams(location.search).get('service');

  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue, 
    formState: { errors } 
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      industry: '',
      businessScale: '',
      website: '',
      preferredCommunication: '',
      hearAboutUs: '',
      serviceCategory: initialService || '',
      serviceType: '',
      projectGoals: '',
      projectDescription: '',
      currentChallenges: '',
      targetAudience: '',
      successMetrics: '',
      budget: '',
      timeline: '',
      priority: '',
      projectStartDate: '',
      projectEndDate: '',
      brandColors: '',
      contentReadiness: '',
      increaseSales: '',
      improveUserExperience: '',
      enhanceBrandImage: '',
      expandMarketReach: '',
      reduceOperationalCosts: '',
      features: '',
      competitors: '',
      designReferences: '',
      additionalNotes: '',
      terms: false
    }
  });

  const watchServiceCategory = watch('serviceCategory');
  const watchServiceType = watch('serviceType');

  // Check URL for service parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    const priceParam = params.get('price');
    
    // Flag to track if we should auto-advance to step 2
    let shouldAdvanceToStep2 = false;
    let fieldsWerePrefilled = false;
    
    if (serviceParam) {
      setPrefilledService(serviceParam);
      
      try {
        // Find the service and set the form values - first try exact match with id or path
        let foundService = services.find(s => 
          s.id === serviceParam || 
          (s.path && s.path.includes(serviceParam))
        );
        
        // If no exact match by id or path, try title match
        if (!foundService) {
          foundService = services.find(s => 
            s.title && s.title.toLowerCase().replace(/\s+/g, '-') === serviceParam.toLowerCase()
          );
        }
        
        // If still no match, try partial match
        if (!foundService) {
          foundService = services.find(s => 
            (s.title && s.title.toLowerCase().includes(serviceParam.toLowerCase().replace(/-/g, ' '))) ||
            (serviceParam.toLowerCase().replace(/-/g, ' ').includes(s.title && s.title.toLowerCase()))
          );
        }
        
        // Last resort fallback for 'digital-marketing'
        if (!foundService && serviceParam.toLowerCase().includes('digital-marketing')) {
          // Find the actual digital marketing service
          foundService = services.find(s => 
            s.id === 'digital-marketing' || 
            (s.title && s.title.toLowerCase().includes('digital marketing'))
          );
          
          // If still not found, use a hardcoded fallback
          if (!foundService) {
            foundService = services.find(s => s.category === 'Marketing');
            
            // Ultimate fallback
            if (!foundService) {
              foundService = {
                id: 'digital-marketing',
                title: 'Digital Marketing & SEO',
                category: 'Marketing',
                features: [
                  'Social Media Management',
                  'SEO Optimization',
                  'Content Marketing',
                  'Email Marketing',
                  'PPC Advertising'
                ]
              };
            }
          }
        }
        
        if (foundService) {
          console.log("Found matching service:", foundService);
          setPrefilledService(foundService.title);
          setValue('serviceCategory', foundService.category || 'Marketing');
          
          // Find service types based on the category
          const serviceWithSameCategory = services.filter(s => 
            s.category === (foundService.category || 'Marketing')
          );
          
          // Set project types
          const types = serviceWithSameCategory.map(s => s.title);
          setProjectTypes(types.length > 0 ? types : [foundService.title]);
          
          // Set the selected service type
          setValue('serviceType', foundService.title);
          
          // Auto-fill required fields in step 1 to allow advancing to step 2
          shouldAdvanceToStep2 = true;
          fieldsWerePrefilled = true;
        } else {
          // If no matching service found, create a generic entry with the param
          console.log("No matching service found for:", serviceParam);
          setPrefilledService(serviceParam.replace(/-/g, ' '));
          
          // Try to extract a category from the service param
          let categoryGuess = 'Other';
          if (serviceParam.includes('web') || serviceParam.includes('app')) {
            categoryGuess = 'Development';
          } else if (serviceParam.includes('design') || serviceParam.includes('brand')) {
            categoryGuess = 'Design & Creative';
          } else if (serviceParam.includes('market') || serviceParam.includes('seo')) {
            categoryGuess = 'Marketing';
          }
          
          setValue('serviceCategory', categoryGuess);
          setValue('serviceType', serviceParam.replace(/-/g, ' '));
          fieldsWerePrefilled = true;
          shouldAdvanceToStep2 = true;
        }
      } catch (error) {
        console.error("Error processing service parameter:", error);
        // Still set the service name for display
        setPrefilledService(serviceParam.replace(/-/g, ' '));
      }
    }
    
    // Handle price parameter if present
    if (priceParam) {
      setPrefilledPrice(priceParam);
      
      try {
        // Find the closest matching budget option
        const matchingBudget = BUDGET_OPTIONS.find(option => 
          option.value === priceParam || priceParam === option.value
        );
        
        if (matchingBudget) {
          setValue('budget', matchingBudget.value);
        } else {
          // If no exact match, create a custom budget option based on the URL parameter
          // First, add the custom price to the budget options
          const customBudget = priceParam;
          if (!BUDGET_OPTIONS.some(option => option.value === customBudget)) {
            BUDGET_OPTIONS.push({ value: customBudget, label: customBudget });
          }
          // Then set the budget value
          setValue('budget', customBudget);
        }
        
        shouldAdvanceToStep2 = true;
        fieldsWerePrefilled = true;
      } catch (error) {
        console.error("Error processing price parameter:", error);
        // Still set the price for display
        setPrefilledPrice(priceParam);
      }
    }
    
    // Set prefilled flag to prevent duplicate setting on re-renders
    setPrefilled(fieldsWerePrefilled);
    
    // Auto-advance to step 2 if all required fields in step 1 are filled
    if (shouldAdvanceToStep2 && !prefilled) {
      // Give time for the form to update before advancing
      setTimeout(() => {
        setCurrentStep(2);
      }, 100);
    }
  }, [location.search, prefilled, setValue]);

  // Update project types when service category changes
  useEffect(() => {
    if (watchServiceCategory) {
      const serviceWithSameCategory = services.filter(s => s.category === watchServiceCategory);
      const types = serviceWithSameCategory.map(s => s.title);
      setProjectTypes(types);
      
      if (types.length > 0 && (!watchServiceType || !types.includes(watchServiceType))) {
        setValue('serviceType', types[0]);
      }
    }
  }, [watchServiceCategory, setValue, watchServiceType]);

  // Form navigation functions
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };

  // Check if current step is valid before allowing next step
  const canProceedToNextStep = () => {
    if (currentStep === 1) {
      return !errors.name && !errors.email && !errors.phone;
    }
    if (currentStep === 2) {
      return !errors.serviceCategory && !errors.serviceType && !errors.timeline && !errors.budget;
    }
    return true;
  };

  // Generate service categories from ServiceData
  const serviceCategories = [...new Set(services.map(service => service.category))];

  // Get features based on selected service type
  const getServiceFeatures = () => {
    try {
      // Return empty array if no service type is selected
      if (!watchServiceType) return [];
      
      console.log("Getting features for service type:", watchServiceType);
      console.log("Available services:", services);
      
      // Find the selected service object
      const selectedServiceObj = services.find(s => s && s.title === watchServiceType);
      
      // If no exact match, try finding by partial match or related service
      if (!selectedServiceObj) {
        console.log("No exact service match found, trying alternatives");
        
        // Try to find a service with a similar title (case insensitive)
        const similarService = services.find(s => 
          s && s.title && watchServiceType && 
          s.title.toLowerCase().includes(watchServiceType.toLowerCase())
        );
        
        // Try to find by partial match in the other direction
        const partialMatch = !similarService && services.find(s => 
          s && s.title && watchServiceType && 
          watchServiceType.toLowerCase().includes(s.title.toLowerCase())
        );

        // For Package Design specifically
        if (watchServiceType.includes("Package Design")) {
          console.log("Package Design detected, looking for graphic design features");
          const graphicDesignService = services.find(s => 
            s && s.title && s.title.toLowerCase().includes("graphic")
          );
          
          if (graphicDesignService && graphicDesignService.features) {
            console.log("Using graphic design features for package design");
            return graphicDesignService.features;
          }
        }
        
        // Return features from any matching service found
        if (similarService && similarService.features) {
          console.log("Using features from similar service:", similarService.title);
          return similarService.features;
        }
        
        if (partialMatch && partialMatch.features) {
          console.log("Using features from partial match:", partialMatch.title);
          return partialMatch.features;
        }
        
        // Default design-related features if nothing specific is found
        if (watchServiceType.toLowerCase().includes("design")) {
          console.log("Using default design features");
          return [
            "Brand Guidelines Compliance",
            "Multiple Design Concepts",
            "Print-Ready Files",
            "Source Files Included",
            "3D Mockups",
            "High Resolution",
            "Revisions Included",
            "Rush Delivery"
          ];
        }
        
        // Return empty array as last resort
        console.log("No matching features found, returning empty array");
        return [];
      }
      
      // Return features if they exist, otherwise return an empty array
      console.log("Service found:", selectedServiceObj.title, "Features:", selectedServiceObj.features);
      return (selectedServiceObj.features) ? selectedServiceObj.features : [];
    } catch (error) {
      console.error("Error in getServiceFeatures:", error);
      // Return default features for common service types as fallback
      if (watchServiceType && watchServiceType.toLowerCase().includes("design")) {
        return [
          "Brand Guidelines Compliance", 
          "Multiple Design Concepts",
          "Print-Ready Files",
          "Source Files Included",
          "Revisions"
        ];
      }
      return [];
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // In a real application, you would send data to your API here
      // For demonstration, we're using a timeout to simulate an API call
      console.log('Form data to be submitted:', data);
      
      // Simulate API request with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Show success message
      setIsSuccess(true);
      
      // Store submission data in localStorage for the thank you page if needed
      localStorage.setItem('quoteSubmission', JSON.stringify({
        name: data.name,
        email: data.email,
        serviceType: data.serviceType,
        submittedAt: new Date().toISOString()
      }));
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate('/thank-you');
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError(error.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state UI
  if (isSuccess) {
    return (
      <div className="text-center p-8 bg-green-50 dark:bg-green-900 rounded-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100 dark:bg-green-800">
          <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Quote Request Submitted Successfully!</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Thank you for your request. We'll be in touch with you shortly with a personalized quote.
        </p>
        <div className="animate-pulse">
          <p className="text-sm text-gray-500 dark:text-gray-400">Redirecting you to our thank you page...</p>
        </div>
      </div>
    );
  }

  // Form step indicator
  const ProgressIndicator = () => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {[1, 2, 3].map((stepNumber) => (
          <div 
            key={stepNumber}
            className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep === stepNumber 
                ? 'bg-conison-magenta text-white' 
                : currentStep > stepNumber 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            {currentStep > stepNumber ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            ) : (
              stepNumber
            )}
          </div>
        ))}
      </div>
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-600">
        <div 
          style={{ width: `${(currentStep / 3) * 100}%` }} 
          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-conison-magenta transition-all duration-500"
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
        <div className={currentStep >= 1 ? "font-semibold text-conison-magenta dark:text-conison-magenta" : ""}>Contact Information</div>
        <div className={currentStep >= 2 ? "font-semibold text-conison-magenta dark:text-conison-magenta" : ""}>Project Requirements</div>
        <div className={currentStep >= 3 ? "font-semibold text-conison-magenta dark:text-conison-magenta" : ""}>Project Details</div>
      </div>
    </div>
  );

  // Navigation buttons
  const NavigationButtons = ({ showPrevious = true, showNext = true, showSubmit = false }) => (
    <div className="flex justify-between">
      {showPrevious && (
        <button
          type="button"
          onClick={prevStep}
          className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
        >
          Previous
        </button>
      )}
      
      {showNext && (
        <button
          type="button"
          onClick={nextStep}
          disabled={!canProceedToNextStep()}
          className={`px-6 py-2 bg-conison-magenta hover:bg-opacity-90 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-conison-magenta focus:ring-opacity-50 ${
            !canProceedToNextStep() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next Step
        </button>
      )}
      
      {showSubmit && (
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-2 bg-conison-magenta hover:bg-opacity-90 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-conison-magenta focus:ring-opacity-50 ${
            isSubmitting ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </span>
          ) : (
            "Submit Quote Request"
          )}
        </button>
      )}
    </div>
  );

  // Form step components
  const ContactInfoStep = () => {
    console.log("ContactInfoStep rendering...");
    return (
    <div className="space-y-4 animate-fadeIn">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Contact Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput 
          id="name"
          label="Full Name"
          register={register}
          errors={errors}
          validation={{ required: "Name is required" }}
          placeholder="Your full name"
          required={true}
        />
        
        <FormInput 
          id="email"
          label="Email Address"
          type="email"
          register={register}
          errors={errors}
          validation={{ 
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address"
            }
          }}
          placeholder="Your email address"
          required={true}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput 
          id="phone"
          label="Phone Number"
          type="tel"
          register={register}
          errors={errors}
          validation={{ 
            required: "Phone number is required",
            pattern: {
              value: /^[0-9+\s()-]{10,15}$/,
              message: "Please enter a valid phone number"
            }
          }}
          placeholder="Your phone number"
          required={true}
        />
        
        <FormInput 
          id="company"
          label="Company/Organization"
          register={register}
          errors={errors}
          placeholder="Your company or organization"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.isArray(INDUSTRY_OPTIONS) && INDUSTRY_OPTIONS.length > 0 && (
          <FormSelect 
            id="industry"
            label="Industry/Business Type"
            options={INDUSTRY_OPTIONS}
            register={register}
            errors={errors}
            placeholder="Select your industry"
          />
        )}
        
        {Array.isArray(BUSINESS_SCALE_OPTIONS) && BUSINESS_SCALE_OPTIONS.length > 0 && (
          <FormSelect 
            id="businessScale"
            label="Business Scale"
            options={BUSINESS_SCALE_OPTIONS}
            register={register}
            errors={errors}
            placeholder="Select your business size"
          />
        )}
      </div>

      <FormInput 
        id="website"
        label="Website or Social Media URL"
        register={register}
        errors={errors}
        placeholder="https://"
        validation={{
          pattern: {
            value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/,
            message: "Please enter a valid URL"
          }
        }}
      />

      {Array.isArray(COMMUNICATION_OPTIONS) && COMMUNICATION_OPTIONS.length > 0 && (
        <FormRadioGroup
          id="preferredCommunication"
          label="Preferred Method of Communication"
          options={COMMUNICATION_OPTIONS}
          register={register}
          errors={errors}
          validation={{ required: "Please select a preferred communication method" }}
          required={true}
        />
      )}
      
      {Array.isArray(HEAR_ABOUT_US_OPTIONS) && HEAR_ABOUT_US_OPTIONS.length > 0 && (
        <FormSelect
          id="hearAboutUs"
          label="How did you hear about us?"
          options={HEAR_ABOUT_US_OPTIONS}
          register={register}
          errors={errors}
          placeholder="Please select"
        />
      )}
      
      <NavigationButtons showPrevious={false} />
    </div>
    );
  };

  const ProjectRequirementsStep = () => (
    <div className="space-y-4 animate-fadeIn">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Project Requirements</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          id="serviceCategory"
          label="Service Category"
          options={serviceCategories || []}
          register={register}
          errors={errors}
          validation={{ required: "Please select a service category" }}
          placeholder="Select service category"
          required={true}
        />
        
        <FormSelect
          id="serviceType"
          label="Project Type"
          options={projectTypes || []}
          register={register}
          errors={errors}
          validation={{ required: "Please select a project type" }}
          placeholder="Select project type"
          disabled={!watchServiceCategory}
          required={true}
        />
      </div>
      
      <FormTextarea
        id="projectGoals"
        label="Project Goals & Objectives"
        register={register}
        errors={errors}
        validation={{ 
          required: "Please provide your project goals",
          minLength: {
            value: 20,
            message: "Please provide more details (minimum 20 characters)"
          }
        }}
        placeholder="What are you trying to achieve with this project? What problems are you trying to solve?"
        helpText="Clear goals help us deliver a solution that meets your specific needs."
        required={true}
      />
      
      <FormTextarea
        id="currentChallenges"
        label="Current Challenges"
        register={register}
        errors={errors}
        placeholder="What challenges are you currently facing with your existing solution or process?"
        helpText="Understanding your pain points helps us address them specifically in our solution."
      />
      
      <FormTextarea
        id="projectDescription"
        label="Project Description"
        register={register}
        errors={errors}
        validation={{ 
          required: "Please provide a description of your project",
          minLength: {
            value: 30,
            message: "Please provide more details (minimum 30 characters)"
          }
        }}
        placeholder="Describe your project requirements, goals, and any specific features you need..."
        helpText="The more details you provide, the more accurate our quote will be."
        required={true}
      />
      
      <FormTextarea
        id="targetAudience"
        label="Target Audience"
        register={register}
        errors={errors}
        placeholder="Describe who will be using your product/service (age, demographics, needs, etc.)"
        helpText="Understanding your audience helps us design the perfect solution for them."
      />
      
      <FormTextarea
        id="successMetrics"
        label="Success Metrics"
        register={register}
        errors={errors}
        placeholder="How will you measure the success of this project? What specific goals or metrics are important?"
        helpText="Defining clear success metrics helps us focus on delivering outcomes that matter to you."
      />
      
      {Array.isArray(IMPORTANCE_RATING_OPTIONS) && IMPORTANCE_RATING_OPTIONS.length > 0 && (
        <div className="p-5 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
          <h4 className="text-md font-medium mb-3 text-gray-800 dark:text-white">Business Goals Importance</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Rate each business goal based on its importance to this project (1 = Not Important, 5 = Critical)
          </p>
          
          <div className="space-y-6">
            <FormRating
              id="increaseSales"
              label="Increase Sales/Conversions"
              options={IMPORTANCE_RATING_OPTIONS || []}
              register={register}
              errors={errors}
            />
              
            <FormRating
              id="improveUserExperience"
              label="Improve User Experience"
              options={IMPORTANCE_RATING_OPTIONS || []}
              register={register}
              errors={errors}
            />
              
            <FormRating
              id="enhanceBrandImage"
              label="Enhance Brand Image"
              options={IMPORTANCE_RATING_OPTIONS || []}
              register={register}
              errors={errors}
            />
              
            <FormRating
              id="expandMarketReach"
              label="Expand Market Reach"
              options={IMPORTANCE_RATING_OPTIONS || []}
              register={register}
              errors={errors}
            />
              
            <FormRating
              id="reduceOperationalCosts"
              label="Reduce Operational Costs"
              options={IMPORTANCE_RATING_OPTIONS || []}
              register={register}
              errors={errors}
            />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          id="budget"
          label="Budget Range"
          options={BUDGET_OPTIONS || []}
          register={register}
          errors={errors}
          validation={{ required: "Please select a budget range" }}
          placeholder="Select your budget range"
          required={true}
        />
        
        <FormSelect
          id="timeline"
          label="Timeline"
          options={TIMELINE_OPTIONS || []}
          register={register}
          errors={errors}
          placeholder="Select preferred timeline"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput 
          id="projectStartDate"
          label="Preferred Start Date"
          type="date"
          register={register}
          errors={errors}
          helpText="When would you like to start the project?"
        />
        
        <FormInput 
          id="projectEndDate"
          label="Target Completion Date"
          type="date"
          register={register}
          errors={errors}
          helpText="When do you need the project completed by?"
        />
      </div>
      
      <FormSelect
        id="priority"
        label="Project Priority"
        options={PRIORITY_OPTIONS || []}
        register={register}
        errors={errors}
        placeholder="Select project priority"
      />
      
      <NavigationButtons />
    </div>
  );

  const ProjectDetailsStep = () => {
    console.log("ProjectDetailsStep rendering...");
    console.log("Current service type:", watchServiceType);
    console.log("Features available:", getServiceFeatures());
    
    return (
    <div className="space-y-4 animate-fadeIn">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Project Details</h3>
      
      {/* Display features based on selected service type */}
      {watchServiceType && getServiceFeatures().length > 0 && (
        <FormCheckboxGroup
          label="Features Needed"
          name="features"
          options={getServiceFeatures()}
          register={register}
        />
      )}
      
      <FormTextarea
        id="competitors"
        label="Competitors"
        register={register}
        errors={errors}
        placeholder="List any competitors whose products/services are similar to what you're looking for. Include their websites if available."
        helpText="This helps us understand the market and ensure your solution stands out."
        rows={3}
      />

      <FormTextarea
        id="designReferences"
        label="Design References"
        register={register}
        errors={errors}
        placeholder="Share links to websites, apps, or designs that you like. Explain what aspects you appreciate about each."
        helpText="Visual references help us understand your aesthetic preferences."
        rows={3}
      />
      
      <FormTextarea
        id="brandColors"
        label="Brand Colors & Style Preferences"
        register={register}
        errors={errors}
        placeholder="Describe your brand colors, style preferences, or attach your brand guidelines if available."
        helpText="Understanding your brand identity helps us create designs that align with your overall brand image."
        rows={3}
      />
      
      {/* Additional fields based on service type */}
      {watchServiceType && watchServiceType.includes("Website") && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Do you have any existing website?
            </label>
            <div className="flex space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="existing-website-yes"
                  value="yes"
                  {...register("existingWebsite")}
                  className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="existing-website-yes" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="existing-website-no"
                  value="no"
                  {...register("existingWebsite")}
                  className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="existing-website-no" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                  No
                </label>
              </div>
            </div>
          </div>
          
          <FormSelect
            id="contentReadiness"
            label="Content Readiness"
            options={CONTENT_READINESS_OPTIONS}
            register={register}
            errors={errors}
            placeholder="Select content status"
            helpText="Let us know if you need help with content creation (text, images, videos, etc.)"
          />
          
          <FormInput
            id="domainName"
            label="Domain Name (if you have one)"
            register={register}
            errors={errors}
            placeholder="e.g., example.com"
            helpText="If you already own a domain name, please provide it here"
          />
        </div>
      )}
      
      {/* Attachments */}
      <div>
        <label htmlFor="attachments" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Attachments
        </label>
        <input
          type="file"
          id="attachments"
          multiple
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          You can attach design files, reference materials, or any documents that help explain your requirements.
        </div>
      </div>
      
      {/* Additional Notes */}
      <FormTextarea
        id="additionalNotes"
        label="Additional Notes"
        register={register}
        errors={errors}
        placeholder="Any other details or questions you'd like to share..."
        rows={3}
      />
      
      {/* Terms and privacy consent */}
      <div className="mt-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            {...register("terms", { required: "You must agree to the terms and privacy policy" })}
            className="mt-1 h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            I agree to the <a href="/terms" className="text-conison-cyan hover:underline dark:text-conison-cyan">Terms of Service</a> and <a href="/privacy" className="text-conison-cyan hover:underline dark:text-conison-cyan">Privacy Policy</a>
          </label>
        </div>
        {errors.terms && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.terms.message}</p>
        )}
      </div>
      
      <NavigationButtons showNext={false} showSubmit={true} />
    </div>
    );
  };

  return (
    <div className="quote-form">
      {/* Display pre-selected service header if applicable */}
      {(prefilledService || prefilledPrice) && (
        <div className={`mb-8 p-6 rounded-lg ${isDarkMode ? 'bg-gradient-to-br from-blue-900/50 to-indigo-900/50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'}`}>
          <h2 className="text-xl font-bold mb-3 dark:text-white">Request a Quote for</h2>
          <div className="flex flex-col md:flex-row md:items-center">
            {prefilledService && (
              <div className="flex items-center mb-3 md:mb-0 md:mr-6">
                <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-conison-magenta/20' : 'bg-conison-magenta/10'} flex items-center justify-center mr-3`}>
                  <svg className="w-5 h-5 text-conison-magenta dark:text-conison-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                  </svg>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Service:</span>
                  <p className="font-medium text-gray-900 dark:text-white">{prefilledService}</p>
                </div>
              </div>
            )}
            
            {prefilledPrice && (
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-green-800' : 'bg-green-100'} flex items-center justify-center mr-3`}>
                  <svg className="w-5 h-5 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">Price Range:</span>
                  <p className="font-medium text-gray-900 dark:text-white">{prefilledPrice}</p>
                </div>
              </div>
            )}
          </div>
          <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
            Please complete the form below to get a detailed quote for your project.
          </p>
        </div>
      )}

      <ProgressIndicator />

      {/* Display prefilled notification */}
      {prefilled && (
        <div className="mb-6 p-4 bg-conison-yellow/10 dark:bg-conison-yellow/5 border-l-4 border-conison-yellow text-conison-gray dark:text-conison-yellow rounded animate-fadeIn">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-conison-yellow" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                Some fields have been pre-filled based on your selection.
                Feel free to modify them if needed.
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setPrefilled(false)}
                  className="inline-flex bg-conison-cyan/10 dark:bg-conison-cyan/10 rounded-md p-1.5 text-conison-cyan dark:text-conison-cyan hover:bg-conison-cyan/20 dark:hover:bg-conison-cyan/20 transition-colors"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Display any form submission errors */}
      {submitError && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200">
          <p className="font-medium">Error:</p>
          <p>{submitError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 1 && <ContactInfoStep />}
        {currentStep === 2 && <ProjectRequirementsStep />}
        {currentStep === 3 && <ProjectDetailsStep />}
      </form>
    </div>
  );
};

export default QuoteForm;