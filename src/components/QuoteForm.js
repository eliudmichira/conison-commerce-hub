// src/components/QuoteForm.js
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import services from '../data/ServiceData';
import { useDarkMode } from '../context/DarkModeContext';
import { useAuth } from '../context/AuthContext';
import { createQuote } from '../api/clientApi';

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
const FormRating = ({ id, label, options, register, errors, validation = {}, helpText = "", required = false, watch }) => {
  const [selectedValue, setSelectedValue] = useState("");
  
  // Handle selection change
  const handleSelectionChange = (e) => {
    setSelectedValue(e.target.value);
  };
  
  // Sync with watched value
  useEffect(() => {
    if (watch) {
      const watchedValue = watch(id);
      if (watchedValue) {
        setSelectedValue(watchedValue);
      }
    }
  }, [watch, id]);
  
  return (
    <div className="pb-2 pt-1">
      <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </div>
      {helpText && (
        <div className="mb-2 text-xs text-gray-500 dark:text-gray-400">{helpText}</div>
      )}
      <div className="flex flex-wrap gap-1 sm:gap-3 justify-between">
        {options.map((option) => (
          <div key={option.value} className="flex-1 max-w-[20%]">
            <input
              type="radio"
              id={`${id}-${option.value}`}
              value={option.value}
              {...register(id, {
                ...validation,
                onChange: handleSelectionChange
              })}
              className="sr-only"
            />
            <label 
              htmlFor={`${id}-${option.value}`}
              className={`flex flex-col items-center cursor-pointer transition-all duration-200 p-1 sm:p-2 rounded-lg ${
                selectedValue === option.value 
                  ? 'bg-conison-magenta/10 dark:bg-conison-magenta/20' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <div className={`w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border-2 mb-1 text-base sm:text-lg font-medium transition-all
                ${errors[id] ? 'border-red-500' : selectedValue === option.value 
                  ? 'border-conison-magenta bg-conison-magenta text-white scale-110 shadow-md' 
                  : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400'
                }
              `}>
                {option.value}
              </div>
              <span className={`text-xs text-center ${
                selectedValue === option.value 
                  ? 'text-conison-magenta dark:text-conison-magenta font-medium' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}>
                {option.label}
              </span>
            </label>
          </div>
        ))}
      </div>
      {errors[id] && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors[id].message}</p>
      )}
    </div>
  );
};

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

const QuoteForm = ({ prefilledValues = {}, onFormSuccess }) => {
  const { register, handleSubmit, watch, formState: { errors }, setValue, getValues, trigger, reset } = useForm();
  const { isDarkMode } = useDarkMode();
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 3;
  const [prefilled, setPrefilled] = useState(Object.keys(prefilledValues).length > 0);
  const [prefilledService, setPrefilledService] = useState('');
  const [prefilledPrice, setPrefilledPrice] = useState('');
  const initialService = new URLSearchParams(location.search).get('service');
  const [selectedService, setSelectedService] = useState(prefilledValues.serviceCategory || '');
  const [estimatedAmount, setEstimatedAmount] = useState(0);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const { 
    register: formRegister, 
    handleSubmit: formHandleSubmit, 
    watch: formWatch, 
    setValue: formSetValue, 
    formState: { errors: formErrors } 
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: currentUser?.displayName || '',
      email: currentUser?.email || '',
      phone: '',
      company: '',
      industry: '',
      businessScale: '',
      website: '',
      preferredCommunication: '',
      hearAboutUs: '',
      serviceCategory: prefilledValues.serviceCategory || '',
      serviceType: prefilledValues.serviceType || '',
      projectGoals: '',
      projectDescription: '',
      currentChallenges: '',
      targetAudience: '',
      successMetrics: '',
      budget: prefilledValues.budget || '',
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

  const watchServiceCategory = formWatch('serviceCategory');
  const watchServiceType = formWatch('serviceType');

  // Watch values for conditional rendering
  const serviceCategory = watch('serviceCategory');
  const budget = watch('budget');

  // Check URL for service parameter and get location state data
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    const priceParam = params.get('price');
    
    // Check location state (passed from ServiceDetailPage) first
    const locationState = location.state || {};
    const { service: stateService, serviceId, category } = locationState;
    
    // Flag to track if we should auto-advance to step 2
    let shouldAdvanceToStep2 = false;
    let fieldsWerePrefilled = false;
    
    // Prefer state data over URL parameters
    const serviceToUse = stateService || serviceParam;
    
    if (serviceToUse) {
      setPrefilledService(serviceToUse);
      
      try {
        console.log("Looking for service match for:", serviceToUse);
        console.log("Service ID from state:", serviceId);
        console.log("Service category from state:", category);
        
        // First try to use the serviceId from state if available
        let foundService = null;
        if (serviceId) {
          foundService = services.find(s => s.id === serviceId);
          console.log("Matched by ID:", foundService ? "yes" : "no");
        }
        
        // If no service found by ID, try exact match with service name or path
        if (!foundService) {
          foundService = services.find(s => 
            (s.title && s.title.toLowerCase() === serviceToUse.toLowerCase().replace(/-/g, ' ')) ||
            s.id === serviceToUse.toLowerCase().replace(/\s+/g, '-') || 
            (s.path && s.path.includes(serviceToUse.toLowerCase().replace(/\s+/g, '-')))
          );
          console.log("Matched by title/path:", foundService ? "yes" : "no");
        }
        
        // Try special case for Logo Design
        if (!foundService && (serviceToUse.toLowerCase().includes('logo') || 
                             (serviceId && serviceId.toLowerCase().includes('logo')))) {
          foundService = services.find(s => 
            s.id === 'graphic-design' || 
            (s.subServices && s.subServices.some(sub => sub.toLowerCase().includes('logo')))
          );
          console.log("Matched Logo Design special case:", foundService ? "yes" : "no");
        }
        
        // If still no match, try partial match
        if (!foundService) {
          foundService = services.find(s => 
            (s.title && serviceToUse && s.title.toLowerCase().includes(serviceToUse.toLowerCase().replace(/-/g, ' '))) ||
            (s.id && serviceToUse && s.id.toLowerCase().includes(serviceToUse.toLowerCase().replace(/\s+/g, '-')))
          );
          console.log("Matched by partial match:", foundService ? "yes" : "no");
        }
        
        if (foundService) {
          console.log("Found matching service:", foundService);
          setPrefilledService(foundService.title);
          
          // Use category from state if available, otherwise from foundService
          const serviceCategory = category || foundService.category || 'Design & Creative';
          formSetValue('serviceCategory', serviceCategory);
          
          // Set project types based on the category
          const servicesWithSameCategory = services.filter(s => s.category === serviceCategory);
          
          // Set project types
          const types = servicesWithSameCategory.map(s => s.title);
          formSetValue('serviceType', foundService.title);
          
          // Auto-fill required fields in step 1 to allow advancing to step 2
          shouldAdvanceToStep2 = true;
          fieldsWerePrefilled = true;
        } else {
          // If no matching service found, create a generic entry with the param
          console.log("No matching service found for:", serviceToUse);
          setPrefilledService(serviceToUse.replace(/-/g, ' '));
          
          // Try to extract a category from the service param
          let categoryGuess = category || 'Other';
          if (!category) {
            if (serviceToUse.toLowerCase().includes('web') || serviceToUse.toLowerCase().includes('app')) {
              categoryGuess = 'Development';
            } else if (serviceToUse.toLowerCase().includes('design') || 
                     serviceToUse.toLowerCase().includes('brand') || 
                     serviceToUse.toLowerCase().includes('logo')) {
              categoryGuess = 'Design & Creative';
            } else if (serviceToUse.toLowerCase().includes('market') || 
                     serviceToUse.toLowerCase().includes('seo')) {
              categoryGuess = 'Marketing';
            }
          }
          
          formSetValue('serviceCategory', categoryGuess);
          
          // Set service type
          const serviceTypeGuess = serviceToUse.replace(/-/g, ' ');
          formSetValue('serviceType', serviceTypeGuess);
          
          fieldsWerePrefilled = true;
          shouldAdvanceToStep2 = true;
        }
      } catch (error) {
        console.error("Error processing service parameter:", error);
        // Still set the service name for display
        setPrefilledService(serviceToUse.replace(/-/g, ' '));
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
          formSetValue('budget', matchingBudget.value);
        } else {
          // If no exact match, create a custom budget option based on the URL parameter
          // First, add the custom price to the budget options
          const customBudget = priceParam;
          if (!BUDGET_OPTIONS.some(option => option.value === customBudget)) {
            BUDGET_OPTIONS.push({ value: customBudget, label: customBudget });
          }
          // Then set the budget value
          formSetValue('budget', customBudget);
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
  }, [location.search, location.state, prefilled, formSetValue, services]);

  // Update project types when service category changes
  useEffect(() => {
    if (watchServiceCategory) {
      const serviceWithSameCategory = services.filter(s => s.category === watchServiceCategory);
      const types = serviceWithSameCategory.map(s => s.title);
      formSetValue('serviceType', types[0]);
    }
  }, [watchServiceCategory, formSetValue, watchServiceType]);

  // Set initial values from prefilledValues when component mounts
  useEffect(() => {
    if (prefilledValues && Object.keys(prefilledValues).length > 0) {
      // Set form values based on prefilled values
      Object.entries(prefilledValues).forEach(([key, value]) => {
        setValue(key, value);
      });

      // Update any dependent states
      if (prefilledValues.serviceCategory) {
        setSelectedService(prefilledValues.serviceCategory);
      }
      
      if (prefilledValues.budget) {
        setEstimatedAmount(getEstimatedAmount(prefilledValues.budget));
      }
    }
  }, [prefilledValues, setValue]);

  // Update selectedService when serviceCategory changes
  useEffect(() => {
    if (watchServiceCategory) {
      setSelectedService(watchServiceCategory);
    }
  }, [watchServiceCategory]);

  // Update estimated amount when budget changes
  useEffect(() => {
    const currentBudget = formWatch('budget');
    if (currentBudget) {
      setEstimatedAmount(getEstimatedAmount(currentBudget));
    }
  }, [formWatch]);

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
      return !formErrors.name && !formErrors.email && !formErrors.phone;
    }
    if (currentStep === 2) {
      return !formErrors.serviceCategory && !formErrors.serviceType && !formErrors.timeline && !formErrors.budget;
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
      
      // Special direct handling for common service types
      const serviceTypeLower = watchServiceType.toLowerCase();
      
      // Special handling for Logo Design
      if (serviceTypeLower.includes('logo')) {
        console.log("Logo Design detected, providing logo design features");
        return [
          "Multiple Design Concepts",
          "Unlimited Revisions",
          "All File Formats (JPG, PNG, PDF, SVG)",
          "Color Variations",
          "Brand Guidelines",
          "Source Files",
          "High Resolution",
          "Vector Files",
          "3D Mockups",
          "Social Media Versions"
        ];
      }
      
      // Direct handling for web development
      if (serviceTypeLower.includes('web') && (serviceTypeLower.includes('development') || serviceTypeLower.includes('design'))) {
        return [
          "Responsive Design",
          "Custom Design",
          "Content Management System",
          "SEO Optimization",
          "User Experience Design",
          "Mobile Friendly",
          "Fast Loading Speed",
          "Contact Forms",
          "Social Media Integration",
          "Google Analytics"
        ];
      }
      
      // Find the selected service object by exact title match
      const selectedServiceObj = services.find(s => s && s.title === watchServiceType);
      
      // If found and has features, return them
      if (selectedServiceObj && selectedServiceObj.features) {
        console.log("Service found:", selectedServiceObj.title, "Features:", selectedServiceObj.features);
        return selectedServiceObj.features;
      }
      
      // If no exact match, try finding by partial match or related service
      console.log("No exact service match found, trying alternatives");
      
      // Try to find a service with a similar title (case insensitive)
      const similarService = services.find(s => 
        s && s.title && watchServiceType && 
        s.title.toLowerCase().includes(serviceTypeLower) || 
        serviceTypeLower.includes(s.title.toLowerCase())
      );
      
      // Return features from the similar service
      if (similarService && similarService.features) {
        console.log("Using features from similar service:", similarService.title);
        return similarService.features;
      }
      
      // Try finding a service that contains this as a subService
      const parentService = services.find(s => 
        s && s.subServices && s.subServices.some(sub => 
          sub.toLowerCase() === serviceTypeLower || 
          sub.toLowerCase().includes(serviceTypeLower) || 
          serviceTypeLower.includes(sub.toLowerCase())
        )
      );
      
      if (parentService && parentService.features) {
        console.log("Using features from parent service:", parentService.title);
        return parentService.features;
      }
      
      // Fallback based on service type keywords
      // Graphics & Design services
      if (serviceTypeLower.includes('design') || 
          serviceTypeLower.includes('brand') || 
          serviceTypeLower.includes('graphic')) {
        console.log("Using default design features");
        return [
          "Brand Guidelines Compliance",
          "Multiple Design Concepts",
          "Print-Ready Files",
          "Source Files Included",
          "High Resolution",
          "Revisions Included",
          "Express Delivery Available",
          "Commercial Use Rights"
        ];
      }
      
      // Development services
      if (serviceTypeLower.includes('develop') || 
          serviceTypeLower.includes('code') || 
          serviceTypeLower.includes('app')) {
        console.log("Using default development features");
        return [
          "Custom Development",
          "Responsive Design",
          "Cross-Browser Compatibility",
          "Clean Code",
          "Documentation",
          "Testing & QA",
          "Deployment",
          "Support & Maintenance"
        ];
      }
      
      // Marketing services
      if (serviceTypeLower.includes('market') || 
          serviceTypeLower.includes('seo') || 
          serviceTypeLower.includes('social')) {
        console.log("Using default marketing features");
        return [
          "Strategy Development",
          "Performance Tracking",
          "Regular Reporting",
          "Content Creation",
          "Audience Targeting",
          "Analytics Integration",
          "Optimization",
          "ROI Focus"
        ];
      }
      
      // Return empty array as last resort
      console.log("No matching features found, returning empty array");
      return [];
    } catch (error) {
      console.error("Error in getServiceFeatures:", error);
      // Return empty array on error
      return [];
    }
  };

  // Update the onSubmit function to include isQuickQuote flag
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setFormData({ ...formData, ...data });
      
      console.log('Submitting quote request:', data);
      
      // Get the user ID from Firebase auth or create a temporary ID for non-logged-in users
      const userId = userData?.uid || currentUser?.uid || `temp-${Date.now()}`;
      
      // Create a structured quote object
      const quoteData = {
        userId,
        service: data.serviceType || data.serviceCategory,
        category: data.category || getServiceCategory(data.serviceType || data.serviceCategory),
        description: data.projectDescription,
        requirements: data.projectRequirements || [],
        budget: data.budget,
        timeline: data.timeline,
        features: data.features || [],
        priority: data.priority,
        contactDetails: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          company: data.company
        },
        amount: estimatedAmount || getEstimatedAmount(data.budget),
        status: 'pending',
        isQuickQuote: Object.keys(prefilledValues).length > 0,
        additionalRequirements: data.additionalRequirements,
        contactName: data.name,
        contactEmail: data.email,
        contactPhone: data.phone,
        submittedAt: new Date().toISOString()
      };
      
      // Save the quote to our storage
      await createQuote(quoteData);
      
      // Call success callback if provided
      if (typeof onFormSuccess === 'function') {
        onFormSuccess();
      } else {
        // Navigate to thank you page if no callback provided
        navigate('/thank-you');
      }
    } catch (error) {
      console.error('Error submitting quote:', error);
      alert('There was an error submitting your quote. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Helper function to estimate an amount based on budget range
  const getEstimatedAmount = (budget) => {
    switch(budget) {
      case 'under-1000': return Math.floor(Math.random() * 1000);
      case '1000-5000': return Math.floor(Math.random() * 4000) + 1000;
      case '5000-10000': return Math.floor(Math.random() * 5000) + 5000;
      case '10000-20000': return Math.floor(Math.random() * 10000) + 10000;
      case '20000-50000': return Math.floor(Math.random() * 30000) + 20000;
      case '50000-plus': return Math.floor(Math.random() * 50000) + 50000;
      default: return 0;
    }
  };
  
  // Helper function to get service category
  const getServiceCategory = (serviceName) => {
    const service = services.find(s => s.title === serviceName);
    return service?.category || 'Other';
  };

  // Success state UI
  if (isSubmitting) {
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
    <div className="flex flex-col sm:flex-row justify-between mt-8 space-y-3 sm:space-y-0">
      {showPrevious && (
        <button
          type="button"
          onClick={prevStep}
          className="px-5 py-2.5 flex items-center justify-center rounded-lg bg-white border border-gray-300 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
      )}
      
      <div className="flex space-x-3 sm:ml-auto">
        {showNext && (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canProceedToNextStep()}
            className={`px-5 py-2.5 flex items-center justify-center rounded-lg transition-colors duration-200 
            ${canProceedToNextStep()
              ? 'bg-gradient-to-r from-conison-cyan to-conison-magenta text-white hover:from-conison-cyan-dark hover:to-conison-magenta-dark'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
        
        {showSubmit && (
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-conison-magenta focus:ring-opacity-50 ${
              isSubmitting 
              ? "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed" 
              : "bg-gradient-to-r from-conison-cyan to-conison-magenta text-white hover:opacity-90 shadow-md"
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
          register={formRegister}
          errors={formErrors}
          validation={{ required: "Name is required" }}
          placeholder="Your full name"
          required={true}
        />
        
        <FormInput 
          id="email"
          label="Email Address"
          type="email"
          register={formRegister}
          errors={formErrors}
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
          register={formRegister}
          errors={formErrors}
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
          register={formRegister}
          errors={formErrors}
          placeholder="Your company or organization"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.isArray(INDUSTRY_OPTIONS) && INDUSTRY_OPTIONS.length > 0 && (
          <FormSelect 
            id="industry"
            label="Industry/Business Type"
            options={INDUSTRY_OPTIONS}
            register={formRegister}
            errors={formErrors}
            placeholder="Select your industry"
          />
        )}
        
        {Array.isArray(BUSINESS_SCALE_OPTIONS) && BUSINESS_SCALE_OPTIONS.length > 0 && (
          <FormSelect 
            id="businessScale"
            label="Business Scale"
            options={BUSINESS_SCALE_OPTIONS}
            register={formRegister}
            errors={formErrors}
            placeholder="Select your business size"
          />
        )}
      </div>

      <FormInput 
        id="website"
        label="Website or Social Media URL"
        register={formRegister}
        errors={formErrors}
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
          register={formRegister}
          errors={formErrors}
          validation={{ required: "Please select a preferred communication method" }}
          required={true}
        />
      )}
      
      {Array.isArray(HEAR_ABOUT_US_OPTIONS) && HEAR_ABOUT_US_OPTIONS.length > 0 && (
        <FormSelect
          id="hearAboutUs"
          label="How did you hear about us?"
          options={HEAR_ABOUT_US_OPTIONS}
          register={formRegister}
          errors={formErrors}
          placeholder="Please select"
        />
      )}
      
      <NavigationButtons showPrevious={false} showNext={true} />
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
          register={formRegister}
          errors={formErrors}
          validation={{ required: "Please select a service category" }}
          placeholder="Select service category"
          required={true}
        />
        
        <FormSelect
          id="serviceType"
          label="Project Type"
          options={getServiceFeatures() || []}
          register={formRegister}
          errors={formErrors}
          validation={{ required: "Please select a project type" }}
          placeholder="Select project type"
          disabled={!watchServiceCategory}
          required={true}
        />
      </div>
      
      <FormTextarea
        id="projectGoals"
        label="Project Goals & Objectives"
        register={formRegister}
        errors={formErrors}
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
        register={formRegister}
        errors={formErrors}
        placeholder="What challenges are you currently facing with your existing solution or process?"
        helpText="Understanding your pain points helps us address them specifically in our solution."
      />
      
      <FormTextarea
        id="projectDescription"
        label="Project Description"
        register={formRegister}
        errors={formErrors}
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
        register={formRegister}
        errors={formErrors}
        placeholder="Describe who will be using your product/service (age, demographics, needs, etc.)"
        helpText="Understanding your audience helps us design the perfect solution for them."
      />
      
      <FormTextarea
        id="successMetrics"
        label="Success Metrics"
        register={formRegister}
        errors={formErrors}
        placeholder="How will you measure the success of this project? What specific goals or metrics are important?"
        helpText="Defining clear success metrics helps us focus on delivering outcomes that matter to you."
      />
      
      {Array.isArray(IMPORTANCE_RATING_OPTIONS) && IMPORTANCE_RATING_OPTIONS.length > 0 && (
        <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
          <h4 className="text-lg font-medium mb-3 text-gray-800 dark:text-white flex items-center">
            <svg className="w-5 h-5 mr-2 text-conison-magenta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Business Goals Importance
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 border-l-4 border-conison-magenta/30 pl-3 italic">
            Rate each business goal based on its importance to this project (1 = Not Important, 5 = Critical)
          </p>
          
          <div className="space-y-8">
            <FormRating
              id="increaseSales"
              label={
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-conison-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Increase Sales/Conversions
                </div>
              }
              options={IMPORTANCE_RATING_OPTIONS || []}
              register={formRegister}
              errors={formErrors}
              watch={formWatch}
            />
              
            <FormRating
              id="improveUserExperience"
              label={
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-conison-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Improve User Experience
                </div>
              }
              options={IMPORTANCE_RATING_OPTIONS || []}
              register={formRegister}
              errors={formErrors}
              watch={formWatch}
            />
              
            <FormRating
              id="enhanceBrandImage"
              label={
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-conison-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Enhance Brand Image
                </div>
              }
              options={IMPORTANCE_RATING_OPTIONS || []}
              register={formRegister}
              errors={formErrors}
              watch={formWatch}
            />
              
            <FormRating
              id="expandMarketReach"
              label={
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-conison-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Expand Market Reach
                </div>
              }
              options={IMPORTANCE_RATING_OPTIONS || []}
              register={formRegister}
              errors={formErrors}
              watch={formWatch}
            />
              
            <FormRating
              id="reduceOperationalCosts"
              label={
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-1.5 text-conison-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Reduce Operational Costs
                </div>
              }
              options={IMPORTANCE_RATING_OPTIONS || []}
              register={formRegister}
              errors={formErrors}
              watch={formWatch}
            />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormSelect
          id="budget"
          label="Budget Range"
          options={BUDGET_OPTIONS || []}
          register={formRegister}
          errors={formErrors}
          validation={{ required: "Please select a budget range" }}
          placeholder="Select your budget range"
          required={true}
        />
        
        <FormSelect
          id="timeline"
          label="Timeline"
          options={TIMELINE_OPTIONS || []}
          register={formRegister}
          errors={formErrors}
          placeholder="Select preferred timeline"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput 
          id="projectStartDate"
          label="Preferred Start Date"
          type="date"
          register={formRegister}
          errors={formErrors}
          helpText="When would you like to start the project?"
        />
        
        <FormInput 
          id="projectEndDate"
          label="Target Completion Date"
          type="date"
          register={formRegister}
          errors={formErrors}
          helpText="When do you need the project completed by?"
        />
      </div>
      
      <FormSelect
        id="priority"
        label="Project Priority"
        options={PRIORITY_OPTIONS || []}
        register={formRegister}
        errors={formErrors}
        placeholder="Select project priority"
      />
      
      <NavigationButtons showPrevious={true} showNext={true} />
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
          register={formRegister}
        />
      )}
      
      <FormTextarea
        id="competitors"
        label="Competitors"
        register={formRegister}
        errors={formErrors}
        placeholder="List any competitors whose products/services are similar to what you're looking for. Include their websites if available."
        helpText="This helps us understand the market and ensure your solution stands out."
        rows={3}
      />

      <FormTextarea
        id="designReferences"
        label="Design References"
        register={formRegister}
        errors={formErrors}
        placeholder="Share links to websites, apps, or designs that you like. Explain what aspects you appreciate about each."
        helpText="Visual references help us understand your aesthetic preferences."
        rows={3}
      />
      
      <FormTextarea
        id="brandColors"
        label="Brand Colors & Style Preferences"
        register={formRegister}
        errors={formErrors}
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
                  {...formRegister("existingWebsite")}
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
                  {...formRegister("existingWebsite")}
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
            register={formRegister}
            errors={formErrors}
            placeholder="Select content status"
            helpText="Let us know if you need help with content creation (text, images, videos, etc.)"
          />
          
          <FormInput
            id="domainName"
            label="Domain Name (if you have one)"
            register={formRegister}
            errors={formErrors}
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
        register={formRegister}
        errors={formErrors}
        placeholder="Any other details or questions you'd like to share..."
        rows={3}
      />
      
      {/* Terms and privacy consent */}
      <div className="mt-4">
        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            {...formRegister("terms", { required: "You must agree to the terms and privacy policy" })}
            className="mt-1 h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
            I agree to the <a href="/terms" className="text-conison-cyan hover:underline dark:text-conison-cyan">Terms of Service</a> and <a href="/privacy" className="text-conison-cyan hover:underline dark:text-conison-cyan">Privacy Policy</a>
          </label>
        </div>
        {formErrors.terms && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{formErrors.terms.message}</p>
        )}
      </div>
      
      <NavigationButtons showPrevious={true} showNext={false} showSubmit={true} />
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
        </div>
      )}
      
      <ProgressIndicator />
      
      {currentStep === 1 && <ContactInfoStep />}
      {currentStep === 2 && <ProjectRequirementsStep />}
      {currentStep === 3 && <ProjectDetailsStep />}
    </div>
  );
};

export default QuoteForm;