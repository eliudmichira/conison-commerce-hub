// components/ServiceCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { motion } from 'framer-motion';

const ServiceCard = ({ service }) => {
  const { id, title, description, icon, category, features } = service;
  const { isDarkMode } = useDarkMode();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div 
      className="service-card bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col border-t-4 border-conison-magenta"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="service-content flex-grow">
        <div className="flex items-center mb-4">
          <div className="bg-conison-yellow p-3 rounded-lg mr-4">
            <span className="text-conison-gray text-2xl">{icon}</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-conison-gray dark:text-white">{title}</h3>
            <span className="text-sm text-conison-magenta">{category}</span>
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      </div>
      
      <div className="service-footer mt-auto">
        {features && features.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-conison-gray dark:text-white font-medium flex items-center focus:outline-none hover:text-conison-magenta dark:hover:text-conison-magenta transition-all"
            >
              {expanded ? 'View Less' : 'View Features'}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 ml-1 transform transition-transform ${expanded ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {expanded && (
              <ul className="mt-3 ml-5 space-y-1 list-disc text-gray-600 dark:text-gray-300">
                {features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <Link 
            to={`/services/${id}`} 
            className="inline-block text-conison-magenta hover:text-conison-magenta/80 font-medium transition-colors"
          >
            Learn More
            <span className="ml-1">→</span>
          </Link>
          
          <Link 
            to={`/quote-request?service=${id}`} 
            className="bg-conison-magenta text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;