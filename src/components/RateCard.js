// components/RateCard.js
import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Filter, ChevronDown, Info } from 'lucide-react';

const RateCard = ({ categoryFilter = 'all', searchQuery = '', onRequestQuote }) => {
  const { isDarkMode } = useDarkMode();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [filteredServices, setFilteredServices] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  
  // Service categories data
  const serviceCategories = [
    {
      id: 'web',
      name: 'Web Development',
      description: 'Custom websites from simple landing pages to complex web applications.',
      services: [
        { id: 'basic-website', name: 'Basic Website (5-7 pages)', price: '$350 - $600', estimatedTime: '2-3 weeks', popular: false },
        { id: 'business-website', name: 'Business Website (8-15 pages)', price: '$600 - $1,500', estimatedTime: '3-5 weeks', popular: true },
        { id: 'e-commerce', name: 'E-commerce Website', price: '$1,000 - $2,500', estimatedTime: '4-8 weeks', popular: false },
        { id: 'web-application', name: 'Custom Web Application', price: '$2,500 - $10,000+', estimatedTime: '8-12 weeks', popular: false },
        { id: 'website-redesign', name: 'Website Redesign', price: '$500 - $2,000', estimatedTime: '2-6 weeks', popular: false }
      ]
    },
    {
      id: 'design',
      name: 'Graphic Design',
      description: 'Professional design services to elevate your brand and visual presence.',
      services: [
        { id: 'logo-design', name: 'Logo Design', price: '$150 - $450', estimatedTime: '1-2 weeks', popular: true },
        { id: 'branding-package', name: 'Branding Package', price: '$450 - $800', estimatedTime: '2-3 weeks', popular: false },
        { id: 'social-media-graphics', name: 'Social Media Graphics (per set)', price: '$100 - $300', estimatedTime: '1-2 weeks', popular: false },
        { id: 'print-materials', name: 'Print Materials (brochures, flyers)', price: '$150 - $400', estimatedTime: '1-2 weeks', popular: false },
        { id: 'packaging-design', name: 'Packaging Design', price: '$300 - $800', estimatedTime: '2-4 weeks', popular: false }
      ]
    },
    {
      id: 'marketing',
      name: 'Digital Marketing',
      description: 'Strategic digital marketing services to boost your online presence.',
      services: [
        { id: 'social-media-management', name: 'Social Media Management (monthly)', price: '$200 - $500/mo', estimatedTime: 'Ongoing', popular: true },
        { id: 'seo-package', name: 'SEO Package (monthly)', price: '$250 - $600/mo', estimatedTime: 'Ongoing', popular: false },
        { id: 'content-marketing', name: 'Content Marketing (monthly)', price: '$300 - $800/mo', estimatedTime: 'Ongoing', popular: false },
        { id: 'email-marketing', name: 'Email Marketing (monthly)', price: '$150 - $400/mo', estimatedTime: 'Ongoing', popular: false },
        { id: 'ppc-campaign', name: 'PPC Campaign Management (monthly)', price: '$200 - $1,000/mo', estimatedTime: 'Ongoing', popular: false }
      ]
    },
    {
      id: 'app',
      name: 'App Development',
      description: 'Custom mobile applications for iOS and Android platforms.',
      services: [
        { id: 'ios-app', name: 'iOS App Development', price: '$2,500 - $10,000', estimatedTime: '8-16 weeks', popular: false },
        { id: 'android-app', name: 'Android App Development', price: '$2,500 - $10,000', estimatedTime: '8-16 weeks', popular: false },
        { id: 'cross-platform-app', name: 'Cross-Platform App', price: '$3,000 - $12,000', estimatedTime: '10-18 weeks', popular: true },
        { id: 'app-maintenance', name: 'App Maintenance (monthly)', price: '$200 - $500/mo', estimatedTime: 'Ongoing', popular: false },
        { id: 'app-redesign', name: 'App Redesign/Update', price: '$1,000 - $5,000', estimatedTime: '4-10 weeks', popular: false }
      ]
    }
  ];
  
  // Filter services based on category and search query
  useEffect(() => {
    let filtered = [...serviceCategories];
    
    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(category => category.id === categoryFilter);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      
      // Filter services within categories
      filtered = filtered.map(category => {
        const matchedServices = category.services.filter(service => 
          service.name.toLowerCase().includes(query) || 
          service.price.toLowerCase().includes(query)
        );
        
        if (matchedServices.length > 0) {
          return {
            ...category,
            services: matchedServices
          };
        }
        return null;
      }).filter(Boolean);
    }
    
    setFilteredServices(filtered);
    setIsEmpty(filtered.length === 0);
    
    // Auto-expand first category if only one is showing
    if (filtered.length === 1 && expandedCategory !== filtered[0].id) {
      setExpandedCategory(filtered[0].id);
    }
    
    // If current expanded category is not in filtered results, reset it
    if (expandedCategory && !filtered.some(category => category.id === expandedCategory)) {
      setExpandedCategory(filtered.length > 0 ? filtered[0].id : null);
    }
  }, [categoryFilter, searchQuery, expandedCategory]);
  
  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };
  
  // Request a quote for a specific service
  const handleRequestQuote = (categoryId, serviceId) => {
    onRequestQuote && onRequestQuote(categoryId, serviceId);
  };

  return (
    <div>
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Our Service Rates</h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Transparent pricing for all our services. The rates below are starting points and may vary based on project complexity.
        </p>
      </div>
      
      {/* Empty State */}
      {isEmpty && (
        <div className={`text-center py-12 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <Search className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No services found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            We couldn't find any services matching your criteria.
          </p>
          <button
            onClick={() => {
              // Reset filters
              if (typeof window !== 'undefined') {
                window.location.href = '/rate-card';
              }
            }}
            className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors inline-flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Reset Filters
          </button>
        </div>
      )}
      
      {/* Rate Card Accordion */}
      <div className="space-y-6">
        {filteredServices.map((category) => (
          <div 
            key={category.id}
            className={`rounded-xl overflow-hidden border transition-all ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            } ${expandedCategory === category.id ? 'shadow-lg' : ''}`}
          >
            {/* Category Header */}
            <button
              className={`w-full flex items-center justify-between p-6 text-left transition-colors ${
                expandedCategory === category.id
                  ? isDarkMode ? 'bg-gray-700' : 'bg-red-50'
                  : isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
              onClick={() => toggleCategory(category.id)}
            >
              <div>
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mt-1">{category.description}</p>
              </div>
              <ChevronDown 
                className={`w-6 h-6 text-red-600 transform transition-transform ${
                  expandedCategory === category.id ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {/* Category Content */}
            {expandedCategory === category.id && (
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className={isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}>
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Service
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Price Range
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                          Est. Timeline
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                          Get Quote
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {category.services.map((service) => (
                        <tr 
                          key={service.id}
                          className={`${
                            isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                          } transition-colors ${
                            service.popular ? 'bg-red-50/50 dark:bg-red-900/10' : ''
                          }`}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="font-medium">
                                  {service.name}
                                  {service.popular && (
                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                      Popular
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-red-600 dark:text-red-400">
                              {service.price}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-600 dark:text-gray-300">
                              {service.estimatedTime}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => handleRequestQuote(category.id, service.id)}
                              className="inline-flex items-center px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
                            >
                              Get Quote
                              <ArrowRight className="ml-1 w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Additional Information */}
      <div className="mt-8 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 flex items-start">
        <Info className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-1">
            About Our Pricing
          </h4>
          <p className="text-blue-700 dark:text-blue-400 text-sm">
            Rates provided are starting points and may vary based on specific project requirements. 
            For complex projects or custom needs, we recommend requesting a detailed quote. 
            All prices are in USD and exclude any applicable taxes or third-party costs.
          </p>
        </div>
      </div>
      
      {/* Request Custom Quote CTA */}
      <div className="mt-12 text-center">
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          Need something not listed here or have specific requirements?
        </p>
        <Link
          to="/quote"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Request a Custom Quote
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default RateCard;