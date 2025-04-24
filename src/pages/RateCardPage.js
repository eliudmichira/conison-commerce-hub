import React, { useState, useRef, useMemo, useCallback } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Search,
  X,
  Filter,
  ArrowDownToLine,
  Info,
  ArrowRight
} from 'lucide-react';

// Import only the dark mode context
import { useDarkMode } from '../context/DarkModeContext';
import MotionWrapper from '../components/MotionWrapper';

// Simple placeholder for RateCard component
const RateCardPlaceholder = ({ categoryFilter, searchQuery, onRequestQuote }) => {
  const { isDarkMode } = useDarkMode();
  
  const services = [
    // Web Development Services
    { 
      id: 'basic-website', 
      name: 'Basic Website', 
      category: 'web-development', 
      price: '$350 - $600', 
      description: 'Simple 5-7 page website with responsive design, contact form, and basic SEO setup' 
    },
    { 
      id: 'business-website', 
      name: 'Business Website', 
      category: 'web-development', 
      price: '$600 - $1,500', 
      description: 'Professional site with up to 15 pages, custom features, CMS integration, and advanced SEO' 
    },
    { 
      id: 'e-commerce-website', 
      name: 'E-commerce Website', 
      category: 'web-development', 
      price: '$1,000 - $2,500', 
      description: 'Full-featured online store with product management, payment integration, and inventory system' 
    },
    { 
      id: 'web-application', 
      name: 'Web Application', 
      category: 'web-development', 
      price: '$2,500 - $5,000', 
      description: 'Custom web application with user authentication, database integration, and advanced features' 
    },
    
    // Graphic Design Services
    { 
      id: 'logo-design', 
      name: 'Logo Design', 
      category: 'graphic-design', 
      price: '$150 - $450', 
      description: 'Custom logo design with multiple revisions, color variations, and file formats' 
    },
    { 
      id: 'branding-package', 
      name: 'Branding Package', 
      category: 'graphic-design', 
      price: '$450 - $800', 
      description: 'Complete brand identity including logo, color palette, typography, and brand guidelines' 
    },
    { 
      id: 'social-media-graphics', 
      name: 'Social Media Graphics', 
      category: 'graphic-design', 
      price: '$30 - $60 per design', 
      description: 'Custom graphics for social media platforms with consistent branding' 
    },
    
    // Digital Marketing Services
    { 
      id: 'seo-package', 
      name: 'SEO Package', 
      category: 'digital-marketing', 
      price: '$250 - $600/mo', 
      description: 'Keyword research, on-page optimization, content strategy, and monthly reporting' 
    },
    { 
      id: 'social-media-management', 
      name: 'Social Media Management', 
      category: 'digital-marketing', 
      price: '$200 - $500/mo', 
      description: 'Content creation, posting schedule, community management, and performance analytics' 
    },
    { 
      id: 'email-marketing', 
      name: 'Email Marketing', 
      category: 'digital-marketing', 
      price: '$150 - $400/mo', 
      description: 'Email campaign design, automation setup, list management, and performance tracking' 
    },
    
    // Mobile Development Services
    { 
      id: 'ios-app', 
      name: 'iOS App Development', 
      category: 'mobile-development', 
      price: '$2,500 - $10,000', 
      description: 'Native iOS application development with App Store submission and maintenance' 
    },
    { 
      id: 'android-app', 
      name: 'Android App Development', 
      category: 'mobile-development', 
      price: '$2,500 - $10,000', 
      description: 'Native Android application development with Play Store submission and maintenance' 
    },
    { 
      id: 'cross-platform-app', 
      name: 'Cross-Platform App', 
      category: 'mobile-development', 
      price: '$3,000 - $12,000', 
      description: 'Cross-platform mobile app development using React Native or Flutter' 
    }
  ];
  
  // Filter services based on category and search query
  const filteredServices = services.filter(service => {
    const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;
    const matchesSearch = !searchQuery || 
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      service.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-8 text-center">Our Services</h2>
      
      {filteredServices.length === 0 ? (
        <div className={`p-8 text-center rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <p className="text-lg">No services found matching your criteria. Please try a different search or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <div 
              key={service.id}
              className={`rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl overflow-hidden ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              }`}
            >
              <div className={`h-2 ${
                service.category === 'web-development' 
                  ? 'bg-gradient-to-r from-pink-500 to-blue-500' 
                  : service.category === 'graphic-design'
                    ? 'bg-gradient-to-r from-pink-500 to-blue-500'
                    : service.category === 'digital-marketing'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500'
              }`}></div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{service.name}</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {service.description}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-blue-600">{service.price}</span>
                  <button
                    onClick={() => onRequestQuote(service.id, service.category)}
                    className="px-5 py-2.5 bg-gradient-to-r from-pink-600 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-pink-700 hover:to-blue-700 transition-all duration-300 flex items-center"
                  >
                    Request Quote
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl p-6">
        <div className="flex items-start">
          <Info className="flex-shrink-0 w-5 h-5 mt-1 mr-3 text-blue-500 dark:text-blue-400" />
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">About Our Pricing</h4>
            <p className="text-blue-700 dark:text-blue-400">
              Rates provided are starting points and may vary based on specific project requirements. 
              For complex projects or custom needs, we recommend requesting a detailed quote.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define CategoryFilter directly
const CategoryFilter = ({ categories, activeCategory, onChange, isDarkMode, className }) => (
  <div className={className}>
    {categories.map((category) => (
      <button
        key={category.id}
        onClick={() => onChange(category.id)}
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
          activeCategory === category.id
            ? 'bg-white text-pink-600 shadow-md'
            : 'bg-white/10 text-white hover:bg-white/20'
        }`}
      >
        {category.name}
      </button>
    ))}
  </div>
);

// Create a local SearchInput component
const SearchInput = ({ value, onChange, onClear, placeholder, isDarkMode, className }) => {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-10 py-3 rounded-lg border transition-colors shadow-sm ${
          isDarkMode 
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500' 
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-pink-500 focus:border-pink-500'
        }`}
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

// Simple Testimonial component
const TestimonialCard = ({ isDarkMode }) => (
  <div className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
    <div className="h-3 bg-gradient-to-r from-pink-600 to-blue-600"></div>
    <div className="p-8">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-pink-100 to-blue-100 dark:from-pink-900 dark:to-blue-900 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
        </div>
        
        <blockquote className="text-center">
          <p className="text-lg italic mb-6 text-gray-700 dark:text-gray-300">
            "The transparent pricing was a breath of fresh air. We knew exactly what we were getting and for what cost. Conison Technologies delivered our website redesign on time and on budget."
          </p>
        </blockquote>
        
        <div className="mt-4 text-center">
          <p className="font-semibold text-gray-800 dark:text-white">Sarah Johnson</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Marketing Director, TechGrow Ltd</p>
        </div>
      </div>
    </div>
  </div>
);

const RateCardPage = () => {
  // Hooks
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const rateCardRef = useRef(null);
  
  // State management
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const activeCategory = searchParams.get('category') || 'all';
  
  // Service categories for filtering
  const categories = useMemo(() => [
    { id: 'all', name: 'All Services' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'graphic-design', name: 'Graphic Design' },
    { id: 'digital-marketing', name: 'Digital Marketing' },
    { id: 'mobile-development', name: 'Mobile Development' }
  ], []);

  const services = [
    // Web Development Services
    { 
      id: 'basic-website', 
      name: 'Basic Website', 
      category: 'web-development', 
      price: '$350 - $600', 
      description: 'Simple 5-7 page website with responsive design, contact form, and basic SEO setup' 
    },
    { 
      id: 'business-website', 
      name: 'Business Website', 
      category: 'web-development', 
      price: '$600 - $1,500', 
      description: 'Professional site with up to 15 pages, custom features, CMS integration, and advanced SEO' 
    },
    { 
      id: 'e-commerce-website', 
      name: 'E-commerce Website', 
      category: 'web-development', 
      price: '$1,000 - $2,500', 
      description: 'Full-featured online store with product management, payment integration, and inventory system' 
    },
    { 
      id: 'web-application', 
      name: 'Web Application', 
      category: 'web-development', 
      price: '$2,500 - $5,000', 
      description: 'Custom web application with user authentication, database integration, and advanced features' 
    },
    
    // Graphic Design Services
    { 
      id: 'logo-design', 
      name: 'Logo Design', 
      category: 'graphic-design', 
      price: '$150 - $450', 
      description: 'Custom logo design with multiple revisions, color variations, and file formats' 
    },
    { 
      id: 'branding-package', 
      name: 'Branding Package', 
      category: 'graphic-design', 
      price: '$450 - $800', 
      description: 'Complete brand identity including logo, color palette, typography, and brand guidelines' 
    },
    { 
      id: 'social-media-graphics', 
      name: 'Social Media Graphics', 
      category: 'graphic-design', 
      price: '$30 - $60 per design', 
      description: 'Custom graphics for social media platforms with consistent branding' 
    },
    
    // Digital Marketing Services
    { 
      id: 'seo-package', 
      name: 'SEO Package', 
      category: 'digital-marketing', 
      price: '$250 - $600/mo', 
      description: 'Keyword research, on-page optimization, content strategy, and monthly reporting' 
    },
    { 
      id: 'social-media-management', 
      name: 'Social Media Management', 
      category: 'digital-marketing', 
      price: '$200 - $500/mo', 
      description: 'Content creation, posting schedule, community management, and performance analytics' 
    },
    { 
      id: 'email-marketing', 
      name: 'Email Marketing', 
      category: 'digital-marketing', 
      price: '$150 - $400/mo', 
      description: 'Email campaign design, automation setup, list management, and performance tracking' 
    },
    
    // Mobile Development Services
    { 
      id: 'ios-app', 
      name: 'iOS App Development', 
      category: 'mobile-development', 
      price: '$2,500 - $10,000', 
      description: 'Native iOS application development with App Store submission and maintenance' 
    },
    { 
      id: 'android-app', 
      name: 'Android App Development', 
      category: 'mobile-development', 
      price: '$2,500 - $10,000', 
      description: 'Native Android application development with Play Store submission and maintenance' 
    },
    { 
      id: 'cross-platform-app', 
      name: 'Cross-Platform App', 
      category: 'mobile-development', 
      price: '$3,000 - $12,000', 
      description: 'Cross-platform mobile app development using React Native or Flutter' 
    }
  ];
  
  // Scroll to rate card section when category or search changes
  const scrollToRateCard = useCallback(() => {
    if (rateCardRef.current) {
      rateCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Function to handle service category selection with URL parameter updates
  const handleCategoryChange = useCallback((categoryId) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('category', categoryId);
      return newParams;
    });
    scrollToRateCard();
  }, [setSearchParams, scrollToRateCard]);

  // Function to handle search queries with URL parameter updates
  const handleSearch = useCallback((value) => {
    setSearchQuery(value);
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (value) {
        newParams.set('search', value);
      } else {
        newParams.delete('search');
      }
      return newParams;
    });
    scrollToRateCard();
  }, [setSearchParams, scrollToRateCard]);

  // Clear search query
  const clearSearch = useCallback(() => {
    handleSearch('');
  }, [handleSearch]);

  // Function to handle navigation to quote request with prefilled service
  const handleRequestQuote = useCallback((service, type) => {
    navigate({
      pathname: '/quote-request',
      search: `?service=${encodeURIComponent(type)}&type=${encodeURIComponent(service)}`
    });
  }, [navigate]);

  // Dynamic class based on dark mode
  const themeClasses = {
    background: isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900',
    card: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
    button: {
      primary: 'bg-pink-600 hover:bg-pink-700 text-white transition-colors',
      secondary: isDarkMode 
        ? 'bg-gray-700 hover:bg-gray-600 text-white transition-colors' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors'
    },
    section: isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section - updated with gradient background */}
      <section className={`relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-r from-pink-600 via-blue-600 to-pink-600'
      }`}>
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 py-20 relative z-10">
          <MotionWrapper delay={0.1}>
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-4">
                Transparent Pricing
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Quality Services with Clear Pricing
              </h1>
              <p className="text-xl mb-8 text-white/80">
                Clear, competitive rates for all our digital services with no hidden costs.
              </p>
            
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link 
                  to="/quote-request" 
                  className="inline-flex items-center px-8 py-3.5 bg-white text-pink-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                >
                  Get Custom Quote
                </Link>
                
                <button 
                  onClick={scrollToRateCard}
                  className="inline-flex items-center px-8 py-3.5 border-2 border-white/30 text-white rounded-lg hover:bg-white/10 transition-all duration-300 font-medium"
                >
                  View Services <ArrowDownToLine className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </MotionWrapper>
          
          <MotionWrapper delay={0.3}>
            <div className="mt-8">
              <CategoryFilter 
                categories={categories}
                activeCategory={activeCategory}
                onChange={handleCategoryChange}
                isDarkMode={isDarkMode}
                className="flex flex-wrap justify-center gap-3"
              />
            </div>
          </MotionWrapper>
        </div>
      </section>
      
      {/* Filter and Search Section */}
      <section className={`sticky top-0 z-10 py-4 border-b ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Category filters with horizontal scroll on mobile */}
            <div className="flex overflow-x-auto space-x-2 pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-pink-600 to-blue-600 text-white'
                      : isDarkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* Search Input with clear button */}
            <SearchInput
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onClear={clearSearch}
              placeholder="Search services..."
              isDarkMode={isDarkMode}
              className="w-full md:w-64"
            />
          </div>
        </div>
      </section>
      
      {/* Rate Card Section */}
      <section 
        ref={rateCardRef}
        className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
        id="rate-cards"
      >
        <div className="container mx-auto px-6">
          <MotionWrapper>
            <RateCardPlaceholder 
            categoryFilter={activeCategory} 
            searchQuery={searchQuery} 
            onRequestQuote={handleRequestQuote}
          />
          </MotionWrapper>
        </div>
      </section>
      
      {/* Testimonials Section - Enhanced */}
      <section className={`py-16 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-gray-800 to-gray-900' 
          : 'bg-gradient-to-r from-pink-50 to-blue-50'
      }`}>
        <div className="container mx-auto px-6">
          <MotionWrapper>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
                Read about the experiences of businesses who have worked with us
            </p>
          </div>
          </MotionWrapper>
          
          <MotionWrapper delay={0.2}>
            <div className="max-w-2xl mx-auto">
              <TestimonialCard isDarkMode={isDarkMode} />
        </div>
          </MotionWrapper>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <MotionWrapper>
            <div className={`rounded-2xl p-8 shadow-lg transition-shadow overflow-hidden relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-600 to-blue-600"></div>
              <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                Let's discuss your project needs and create a custom solution that fits your budget and timeline.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                    to="/quote-request"
                    className="inline-flex items-center px-8 py-3.5 bg-gradient-to-r from-pink-600 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Request a Quote
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/contact"
                    className={`inline-flex items-center px-8 py-3.5 rounded-lg transition-all duration-300 font-medium ${
                    isDarkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    Contact Us
                </Link>
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>
    </div>
  );
};

export default RateCardPage;