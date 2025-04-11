import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { FaCode, FaMobileAlt, FaPalette, FaChartLine, FaCloud, FaVideo, FaShieldAlt, FaRobot, FaLightbulb } from 'react-icons/fa';
import servicesData from '../data/ServiceData';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  // More comprehensive service matching logic
  const findService = (id) => {
    if (!id) {
      console.log('No service ID provided');
      return null;
    }
    
    console.log('Searching for service with ID:', id);
    console.log('Available services:', servicesData.map(s => ({id: s.id, path: s.path})));
    
    // 1. Try direct ID match
    let service = servicesData.find(s => s && s.id === id);
    if (service) {
      console.log('Found service by direct ID match:', service.id);
      return service;
    }
    
    // 2. Try path matching
    service = servicesData.find(s => {
      if (!s || !s.path) return false;
      return Array.isArray(s.path) && s.path.includes(id);
    });
    if (service) {
      console.log('Found service by path match:', service.id);
      return service;
    }
    
    // 3. Try partial matching (for cases like "logo" matching "logo-design")
    service = servicesData.find(s => {
      if (!s) return false;
      
      // Check if any path or id contains our search term
      if (s.id && typeof s.id === 'string' && s.id.includes(id)) return true;
      if (s.path && Array.isArray(s.path) && s.path.some(p => p && p.includes(id))) return true;
      
      // Check for specific common terms
      if (id && typeof id === 'string' && id.includes('logo')) {
        if (s.id === 'graphic-design') return true;
        if (s.subServices && Array.isArray(s.subServices)) {
          return s.subServices.some(sub => 
            sub && typeof sub === 'string' && sub.toLowerCase().includes('logo')
          );
        }
      }
      
      return false;
    });
    
    if (service) {
      console.log('Found service by partial match:', service.id);
    } else {
      console.log('No matching service found');
    }
    
    return service;
  };

  const service = findService(serviceId);

  if (!service) {
    console.log(`Service not found: ${serviceId}, available services:`, 
      servicesData.map(s => ({id: s.id, path: s.path})));
    
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The service you're looking for doesn't exist.</p>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Requested service ID: <code>{serviceId}</code></p>
          <p className="text-gray-600 dark:text-gray-300 mb-8">Available services:</p>
          <ul className="text-gray-600 dark:text-gray-300 mb-8">
            {servicesData.map(s => (
              <li key={s.id} className="mb-2">
                <code>{s.id}</code> - {s.title}
              </li>
            ))}
          </ul>
          <button
            onClick={() => navigate('/services')}
            className="bg-conison-magenta text-white px-6 py-3 rounded-lg hover:bg-conison-magenta/90 transition"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  // Convert the service data format to match the expected structure
  const serviceForDisplay = {
    title: service.title,
    description: service.description,
    icon: service.icon,
    image: service.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: service.features || [],
    process: service.subServices.map((subService, index) => ({
      title: subService,
      description: service.subServiceDescriptions?.[index] || 'Comprehensive solution tailored to your needs.'
    }))
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <button
              onClick={() => navigate('/services')}
              className="text-conison-magenta hover:text-conison-magenta/80 transition mb-8 inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Services
            </button>
            <div className="flex items-center mb-6">
              <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-conison-yellow/10'} mr-4`}>
                {serviceForDisplay.icon}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{serviceForDisplay.title}</h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300">{serviceForDisplay.description}</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What We Offer</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {serviceForDisplay.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-conison-magenta mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceForDisplay.process.map((step, index) => (
                <div key={index} className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/quote-request', { 
                state: { 
                  service: serviceForDisplay.title,
                  serviceId: service.id,
                  category: service.category
                }
              })}
              className="bg-conison-magenta text-white px-8 py-4 rounded-lg hover:bg-conison-magenta/90 transition shadow-lg hover:shadow-xl text-lg"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage; 