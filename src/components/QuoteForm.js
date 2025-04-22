// components/QuoteForm.js
import React, { useState } from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const QuoteForm = ({ initialValues = {}, onSubmit, onPrevious }) => {
  const { isDarkMode } = useDarkMode();
  
  // Form fields state
  const [formValues, setFormValues] = useState({
    name: initialValues.name || '',
    email: initialValues.email || '',
    phone: initialValues.phone || '',
    company: initialValues.company || '',
    serviceCategory: initialValues.serviceCategory || '',
    serviceType: initialValues.serviceType || '',
    estimatedBudget: initialValues.estimatedBudget || '',
    projectDescription: initialValues.projectDescription || '',
    timeline: initialValues.timeline || '',
    additionalInfo: initialValues.additionalInfo || '',
    referralSource: initialValues.referralSource || '',
    preferredContactMethod: initialValues.preferredContactMethod || 'email',
    tosAgreed: initialValues.tosAgreed || false
  });
  
  // Form validation state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormValues(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field when user makes changes
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    const requiredFields = ['name', 'email', 'phone', 'projectDescription'];
    requiredFields.forEach(field => {
      if (!formValues[field]?.trim()) {
        newErrors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formValues.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation - allow various formats
    if (formValues.phone && !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formValues.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // Terms of service agreement
    if (!formValues.tosAgreed) {
      newErrors.tosAgreed = 'You must agree to the terms of service';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Call the parent component's onSubmit handler
      onSubmit && onSubmit(formValues);
      
      // Reset submission state after a delay
      setTimeout(() => {
        setIsSubmitting(false);
      }, 2000);
    }
  };
  
  // Timeline options
  const timelineOptions = [
    { value: 'asap', label: 'As soon as possible' },
    { value: '1-2-weeks', label: '1-2 weeks' },
    { value: '2-4-weeks', label: '2-4 weeks' },
    { value: '1-2-months', label: '1-2 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: 'flexible', label: 'Flexible / Not sure yet' }
  ];
  
  // Referral source options
  const referralOptions = [
    { value: 'search-engine', label: 'Search Engine (Google, Bing, etc.)' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'friend-referral', label: 'Friend or Colleague' },
    { value: 'existing-client', label: 'I\'m an existing client' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'other', label: 'Other' }
  ];
  
  // Generate field class based on error state
  const getFieldClass = (fieldName) => {
    const baseClass = "w-full px-4 py-3 rounded-lg border focus:ring-2 focus:outline-none transition-colors";
    
    if (errors[fieldName]) {
      return `${baseClass} border-red-300 bg-red-50 dark:border-red-500 dark:bg-red-900/20 focus:ring-red-500`;
    }
    
    return `${baseClass} border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-conison-magenta dark:text-white`;
  };

  return (
    <form onSubmit={handleSubmit} id="quote-form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Personal Information */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Personal Information</h3>
        </div>
        
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            className={getFieldClass('name')}
            placeholder="Your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
          )}
        </div>
        
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            className={getFieldClass('email')}
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
          )}
        </div>
        
        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formValues.phone}
            onChange={handleChange}
            className={getFieldClass('phone')}
            placeholder="+1 (123) 456-7890"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
          )}
        </div>
        
        {/* Company Field */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Company/Organization
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formValues.company}
            onChange={handleChange}
            className={getFieldClass('company')}
            placeholder="Your company name (if applicable)"
          />
        </div>
        
        {/* Project Information */}
        <div className="md:col-span-2 mt-6">
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Project Information</h3>
        </div>
        
        {/* Service Category Field - Read-only if provided from parent */}
        <div>
          <label htmlFor="serviceCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Service Category
          </label>
          <input
            type="text"
            id="serviceCategory"
            name="serviceCategory"
            value={formValues.serviceCategory}
            onChange={handleChange}
            className={`${getFieldClass('serviceCategory')} ${initialValues.serviceCategory ? 'bg-gray-50 dark:bg-gray-600' : ''}`}
            placeholder="e.g., Web Development, Graphic Design"
            readOnly={!!initialValues.serviceCategory}
          />
        </div>
        
        {/* Service Type Field - Read-only if provided from parent */}
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Service Type
          </label>
          <input
            type="text"
            id="serviceType"
            name="serviceType"
            value={formValues.serviceType}
            onChange={handleChange}
            className={`${getFieldClass('serviceType')} ${initialValues.serviceType ? 'bg-gray-50 dark:bg-gray-600' : ''}`}
            placeholder="e.g., E-commerce Website, Logo Design"
            readOnly={!!initialValues.serviceType}
          />
        </div>
        
        {/* Estimated Budget Field - Read-only if provided from parent */}
        <div>
          <label htmlFor="estimatedBudget" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Estimated Budget
          </label>
          <input
            type="text"
            id="estimatedBudget"
            name="estimatedBudget"
            value={formValues.estimatedBudget}
            onChange={handleChange}
            className={`${getFieldClass('estimatedBudget')} ${initialValues.estimatedBudget ? 'bg-gray-50 dark:bg-gray-600' : ''}`}
            placeholder="e.g., $1,000 - $5,000"
            readOnly={!!initialValues.estimatedBudget}
          />
        </div>
        
        {/* Timeline Field */}
        <div>
          <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Timeline
          </label>
          <select
            id="timeline"
            name="timeline"
            value={formValues.timeline}
            onChange={handleChange}
            className={getFieldClass('timeline')}
          >
            <option value="" disabled>Select timeline...</option>
            {timelineOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        {/* Project Description Field */}
        <div className="md:col-span-2">
          <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Project Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            value={formValues.projectDescription}
            onChange={handleChange}
            rows="5"
            className={getFieldClass('projectDescription')}
            placeholder="Please describe your project requirements, goals, and any specific features you need."
          ></textarea>
          {errors.projectDescription && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.projectDescription}</p>
          )}
        </div>
        
        {/* Additional Information Field */}
        <div className="md:col-span-2">
          <label htmlFor="additionalInfo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Additional Information
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            value={formValues.additionalInfo}
            onChange={handleChange}
            rows="3"
            className={getFieldClass('additionalInfo')}
            placeholder="Any other details that might help us understand your project better."
          ></textarea>
        </div>
        
        {/* Preferred Contact Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Preferred Contact Method
          </label>
          <div className="mt-2 space-y-2">
            <div className="flex items-center">
              <input
                id="contact-email"
                name="preferredContactMethod"
                type="radio"
                value="email"
                checked={formValues.preferredContactMethod === 'email'}
                onChange={handleChange}
                className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300"
              />
              <label htmlFor="contact-email" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Email
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="contact-phone"
                name="preferredContactMethod"
                type="radio"
                value="phone"
                checked={formValues.preferredContactMethod === 'phone'}
                onChange={handleChange}
                className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300"
              />
              <label htmlFor="contact-phone" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Phone
              </label>
            </div>
          </div>
        </div>
        
        {/* Referral Source Field */}
        <div>
          <label htmlFor="referralSource" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            How did you hear about us?
          </label>
          <select
            id="referralSource"
            name="referralSource"
            value={formValues.referralSource}
            onChange={handleChange}
            className={getFieldClass('referralSource')}
          >
            <option value="">Select an option...</option>
            {referralOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        
        {/* Terms of Service Agreement */}
        <div className="md:col-span-2">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="tosAgreed"
                name="tosAgreed"
                type="checkbox"
                checked={formValues.tosAgreed}
                onChange={handleChange}
                className="h-4 w-4 text-conison-magenta focus:ring-conison-magenta border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="tosAgreed" className="font-medium text-gray-700 dark:text-gray-300">
                I agree to the <a href="/terms" className="text-conison-magenta hover:underline">Terms of Service</a> and <a href="/privacy" className="text-conison-magenta hover:underline">Privacy Policy</a> <span className="text-red-500">*</span>
              </label>
              {errors.tosAgreed && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.tosAgreed}</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Form Actions */}
      <div className="flex justify-between items-center mt-8">
        {onPrevious && (
          <button
            type="button"
            onClick={onPrevious}
            className="px-5 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back
            </span>
          </button>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-6 py-3 bg-conison-magenta text-white rounded-lg shadow-md hover:shadow-lg transition-all ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
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
            <span className="flex items-center">
              Submit Quote Request
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </span>
          )}
        </button>
      </div>
    </form>
  );
};

export default QuoteForm;