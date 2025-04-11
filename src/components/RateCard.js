// components/RateCard.js
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { Link } from 'react-router-dom';

// Move data to separate variables for better organization
const CATEGORIES = [
  { id: 'graphic', name: 'Graphic Design', icon: '🎨' },
  { id: 'branding', name: 'Branding & Identity', icon: '✨' },
  { id: 'web', name: 'Web & App Development', icon: '💻' },
  { id: 'marketing', name: 'Digital Marketing', icon: '📊' },
  { id: 'motion', name: 'Motion Graphics', icon: '🎬' },
  { id: 'photo', name: 'Photography & Videography', icon: '📸' },
  { id: 'it', name: 'IT Solutions', icon: '🔧' },
  { id: 'ecommerce', name: 'E-Commerce Solutions', icon: '🛒' }
];

const CATEGORY_DESCRIPTIONS = {
  graphic: "Professional graphic design services to elevate your brand's visual presence and create memorable impressions for your audience.",
  branding: "Comprehensive branding solutions to establish a strong and consistent brand identity that resonates with your target market.",
  web: "Custom web and app development services tailored to your business needs, with a focus on performance and user experience.",
  marketing: "Strategic digital marketing services to boost your online presence, engagement, and drive measurable business results.",
  motion: "Dynamic motion graphics and animation to bring your brand to life and create engaging visual content that stands out.",
  photo: "Professional photography and videography services for all your visual content needs, from product shots to corporate videos.",
  it: "Advanced IT solutions to optimize your business operations, enhance security, and streamline your technology infrastructure.",
  ecommerce: "Complete e-commerce solutions to help you sell online effectively, from store setup to payment processing and marketing."
};

const RATES = {
  graphic: [
    { service: 'Logo Design', price: '$150 - $450', description: 'Custom logo design with unlimited revisions and all file formats', popular: true },
    { service: 'Business Cards Design', price: '$50 - $80', description: 'Professional business card design (design only)' },
    { service: 'Letterhead Design', price: '$40 - $70', description: 'Branded letterhead design (design only)' },
    { service: 'Company Profile Design', price: '$200 - $450', description: 'Professional company profile design (up to 12 pages)', popular: true },
    { service: 'Flyer/Poster Design', price: '$40 - $80', description: 'Eye-catching flyer or poster design (design only)' },
    { service: 'Banner Design', price: '$50 - $120', description: 'Custom banner design for events or advertising' },
    { service: 'Billboard Design', price: '$100 - $250', description: 'Professional billboard design for outdoor advertising' },
    { service: 'Brochure Design', price: '$80 - $200', description: 'Bi-fold or tri-fold brochure design (design only)' },
    { service: 'Catalog Design', price: '$250 - $600', description: 'Product catalog design (up to 20 pages)' },
    { service: 'Social Media Graphics', price: '$30 - $60', description: 'Per post or advert design', popular: true },
    { service: 'Package Design', price: '$150 - $400', description: 'Product packaging design with 3D mockups' }
  ],
  branding: [
    { service: 'Basic Brand Identity', price: '$450 - $800', description: 'Logo, business cards, letterhead, email signature', popular: true },
    { service: 'Complete Brand Package', price: '$1,000 - $2,500', description: 'Full visual identity system with brand guidelines', popular: true },
    { service: 'Brand Refresh', price: '$400 - $1,200', description: 'Update existing brand identity to modern standards' },
    { service: 'Event Branding', price: '$350 - $1,500', description: 'Complete visual identity for your event' },
    { service: 'Vehicle Branding', price: '$200 - $600', description: 'Design for vehicle graphics (per vehicle, excluding printing)' },
    { service: 'Branded Merchandise Design', price: '$50 - $150', description: 'Custom designs for various merchandise items' }
  ],
  web: [
    { service: 'Basic Business Website', price: '$350 - $600', description: '5-7 pages with responsive design', popular: true },
    { service: 'Custom Business Website', price: '$600 - $1,500', description: '8-15 pages with responsive design and custom features', popular: true },
    { service: 'E-commerce Website', price: '$1,000 - $2,500', description: 'Online store with payment gateway integration', popular: true },
    { service: 'Landing Page', price: '$150 - $300', description: 'High-converting single page website' },
    { service: 'Web App Development', price: '$2,000 - $6,000', description: 'Custom web application based on specific requirements' },
    { service: 'Mobile App Development', price: '$2,500 - $8,000', description: 'iOS and Android app development' },
    { service: 'UI/UX Design', price: '$400 - $1,500', description: 'User interface & experience design with prototyping' },
    { service: 'Website Maintenance', price: '$80 - $250', description: 'Monthly website maintenance package' },
    { service: 'Domain & Hosting Setup', price: '$50 - $120', description: 'Domain registration and hosting configuration' }
  ],
  marketing: [
    { service: 'Social Media Management', price: '$200 - $500', description: 'Monthly management for one platform', popular: true },
    { service: 'Social Media Bundle', price: '$350 - $800', description: 'Monthly management for 3 platforms', popular: true },
    { service: 'Google Ads Management', price: '$150 - $400', description: 'Monthly management (excluding ad spend)' },
    { service: 'Facebook Ads Management', price: '$150 - $350', description: 'Monthly management (excluding ad spend)' },
    { service: 'SEO Package', price: '$250 - $600', description: 'Monthly search engine optimization services', popular: true },
    { service: 'Content Marketing', price: '$300 - $800', description: 'Content strategy and creation (monthly)' },
    { service: 'Email Marketing Campaign', price: '$150 - $400', description: 'Campaign setup and management' },
    { service: 'SMS Marketing Campaign', price: '$100 - $300', description: 'Campaign setup and management (excluding SMS costs)' }
  ],
  motion: [
    { service: 'Logo Animation', price: '$80 - $250', description: 'Animated version of your logo', popular: true },
    { service: 'Explainer Video (30s)', price: '$300 - $600', description: 'Animated explainer video with voiceover', popular: true },
    { service: 'Explainer Video (60s)', price: '$500 - $900', description: 'Animated explainer video with voiceover' },
    { service: 'Social Media Video Ad', price: '$150 - $400', description: 'Short video ad optimized for social media', popular: true },
    { service: 'Corporate Video Editing', price: '$200 - $600', description: 'Professional editing of corporate footage' },
    { service: 'Video Intro/Outro', price: '$100 - $250', description: 'Custom branded intro or outro for videos' }
  ],
  photo: [
    { service: 'Product Photography', price: '$20 - $50', description: 'Per product with basic editing', popular: true },
    { service: 'Corporate Portraits', price: '$30 - $80', description: 'Per person with professional editing', popular: true },
    { service: 'Event Photography (Half Day)', price: '$150 - $400', description: 'Per half day (4 hours)' },
    { service: 'Event Photography (Full Day)', price: '$250 - $600', description: 'Per full day (8 hours)' },
    { service: 'Drone Photography', price: '$100 - $300', description: 'Per hour with edited images' },
    { service: 'Corporate Videography (Half Day)', price: '$250 - $700', description: 'Per half day (4 hours)' },
    { service: 'Corporate Videography (Full Day)', price: '$400 - $1,200', description: 'Per full day (8 hours)' },
    { service: 'Drone Videography', price: '$150 - $400', description: 'Per hour with edited footage' }
  ],
  it: [
    { service: 'Custom Software Development', price: '$3,000 - $20,000', description: 'Based on project requirements' },
    { service: 'POS System Setup', price: '$800 - $2,500', description: 'Complete point of sale system', popular: true },
    { service: 'CRM Implementation', price: '$1,500 - $4,000', description: 'Customer relationship management system', popular: true },
    { service: 'ERP Implementation', price: '$2,500 - $8,000', description: 'Enterprise resource planning system' },
    { service: 'Security Audit', price: '$500 - $1,500', description: 'Comprehensive IT security assessment' },
    { service: 'Data Backup Solutions', price: '$300 - $1,200', description: 'Custom data backup and recovery setup' },
    { service: 'IT Consulting', price: '$50 - $150', description: 'Per hour consultation services', popular: true }
  ],
  ecommerce: [
    { service: 'Shopify Store Setup', price: '$600 - $1,500', description: 'Complete store setup with product listings', popular: true },
    { service: 'WooCommerce Store Setup', price: '$700 - $1,800', description: 'Complete store setup with product listings', popular: true },
    { service: 'Custom E-commerce Development', price: '$2,000 - $6,000', description: 'Custom-built online store' },
    { service: 'Product Listing Service', price: '$1 - $4', description: 'Per product listing with optimization' },
    { service: 'E-commerce SEO Package', price: '$300 - $800', description: 'Monthly SEO for online stores', popular: true },
    { service: 'E-commerce Marketing Strategy', price: '$500 - $1,500', description: 'Comprehensive marketing plan' }
  ]
};

// Service Card component extracted for better readability
const ServiceCard = ({ service, price, description, isDarkMode, popular, onRequestQuote }) => (
  <div 
    className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 relative`}
  >
    {popular && (
      <div className="absolute top-0 right-0">
        <div className="bg-conison-yellow text-gray-800 text-xs font-bold px-3 py-1 rounded-bl-lg shadow-md">
          Popular
        </div>
      </div>
    )}
    <div className={`${isDarkMode ? 'bg-conison-gray' : 'bg-conison-magenta'} px-6 py-4`}>
      <h3 className="text-lg font-semibold text-white">{service}</h3>
    </div>
    <div className="p-6">
      <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-conison-cyan to-conison-magenta bg-clip-text text-transparent">{price}</div>
      <p className="text-gray-600 dark:text-gray-300 min-h-16">{description}</p>
      <button 
        onClick={() => onRequestQuote(service, price)}
        className="mt-4 px-4 py-2 bg-transparent border border-conison-cyan text-conison-cyan rounded-lg hover:bg-conison-cyan hover:text-white transition-colors duration-300 w-full font-medium"
      >
        Request Quote
      </button>
    </div>
  </div>
);

const RateCard = () => {
  const { isDarkMode } = useDarkMode();
  const [activeCategory, setActiveCategory] = useState('graphic');
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRates, setFilteredRates] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [rateCards, setRateCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  
  const currencies = {
    USD: '$',
    EUR: '€',
    GBP: '£'
  };
  
  // Handle window resize for mobile detection in a safer way (with SSR compatibility)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Set initial value
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Memoize the categories and rates to prevent unnecessary re-renders
  const categories = useMemo(() => CATEGORIES, []);
  const rates = useMemo(() => RATES, []);
  
  // Get current category description
  const currentCategoryDescription = CATEGORY_DESCRIPTIONS[activeCategory];
  
  // Handle search functionality
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredRates([]);
      setShowSearchResults(false);
    } else {
      const results = [];
      const term = searchTerm.toLowerCase();
      
      // Search across all categories
      Object.keys(rates).forEach(categoryId => {
        const matchingServices = rates[categoryId].filter(
          item => item.service.toLowerCase().includes(term) || item.description.toLowerCase().includes(term)
        );
        
        // Add category information to each result
        matchingServices.forEach(service => {
          results.push({
            ...service,
            categoryId,
            categoryName: categories.find(c => c.id === categoryId)?.name
          });
        });
      });
      
      setFilteredRates(results);
      setShowSearchResults(true);
    }
  }, [searchTerm, rates, categories]);
  
  // Handle quote request
  const handleRequestQuote = useCallback((service, price) => {
    // In a real application, this might open a modal or redirect to a quote form
    // For now, we'll just navigate to the quote request page
    window.location.href = `/quote-request?service=${encodeURIComponent(service)}&price=${encodeURIComponent(price)}`;
  }, []);
  
  // Clear search and go back to category view
  const clearSearch = () => {
    setSearchTerm('');
    setShowSearchResults(false);
  };
  
  return (
    <div className="py-12 relative overflow-hidden" id="rate-card">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-conison-cyan dark:bg-conison-cyan rounded-full opacity-20 -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-conison-magenta dark:bg-conison-magenta rounded-full opacity-20 -ml-32 -mb-32"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Section Title */}
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 rounded-full bg-conison-yellow/20 dark:bg-conison-yellow/10 text-conison-yellow dark:text-conison-yellow text-sm font-medium mb-3">
            Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 dark:text-white">Our Rate Card</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Clear and transparent pricing for our professional services. Rates may vary based on specific project requirements and complexity.
          </p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full px-4 py-2 pl-10 rounded-lg border ${
                isDarkMode 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'
              } focus:ring-2 focus:ring-conison-magenta focus:border-conison-magenta transition duration-200`}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            {searchTerm && (
              <button 
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}
          </div>
        </div>
        
        {showSearchResults ? (
          // Search Results
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold dark:text-white">
                Search Results ({filteredRates.length})
              </h3>
              <button 
                onClick={clearSearch}
                className="text-conison-cyan dark:text-conison-cyan flex items-center"
              >
                <span>Back to Categories</span>
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
              </button>
            </div>
            
            {filteredRates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRates.map((item, index) => (
                  <ServiceCard 
                    key={index}
                    service={item.service}
                    price={item.price}
                    description={`${item.description} (${item.categoryName})`}
                    isDarkMode={isDarkMode}
                    popular={item.popular}
                    onRequestQuote={handleRequestQuote}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h3 className="mt-4 text-xl font-medium text-gray-700 dark:text-gray-300">No services found</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Try adjusting your search term or browse by category</p>
              </div>
            )}
          </div>
        ) : (
          // Category View
          <>
            {/* Category Navigation */}
            <div className={`relative flex overflow-x-auto pb-2 ${isDarkMode ? 'scrollbar-dark' : 'scrollbar-light'}`}>
              <div className="flex space-x-1">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-lg ${
                      activeCategory === category.id
                        ? isDarkMode
                          ? 'bg-conison-magenta/90 text-white'
                          : 'bg-conison-magenta text-white'
                        : isDarkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors duration-200 flex items-center`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Category Description */}
            <div className="text-center mb-8">
              <h3 className="text-xl font-semibold mb-2 dark:text-white">
                {categories.find(c => c.id === activeCategory)?.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {currentCategoryDescription}
              </p>
            </div>
            
            {/* Rate Cards with Animation */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rates[activeCategory].map((item, index) => (
                <ServiceCard 
                  key={index}
                  service={item.service}
                  price={item.price}
                  description={item.description}
                  isDarkMode={isDarkMode}
                  popular={item.popular}
                  onRequestQuote={handleRequestQuote}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Notes and CTA */}
        <div className="mt-12 max-w-3xl mx-auto bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg shadow-sm">
          <h4 className="font-semibold text-center mb-2 dark:text-white">Important Notes</h4>
          <ul className="text-gray-600 dark:text-gray-300 text-sm list-disc pl-5 mb-4">
            <li>All prices are exclusive of VAT (16%).</li>
            <li>Prices may vary based on project scope, complexity, and specific requirements.</li>
            <li>For projects requiring expedited delivery, additional rush fees may apply.</li>
            <li>Payment terms: 50% deposit, 50% upon completion unless otherwise specified.</li>
          </ul>
          <div className="text-center">
            <Link to="/quote-request" className="bg-conison-cyan hover:bg-conison-cyan-dark text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300 inline-flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Contact for Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateCard;