import React, { useState, useRef, useEffect } from 'react';
import RateCard from '../components/RateCard.js';
import { useDarkMode } from '../context/DarkModeContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { 
  CheckCircle, 
  DollarSign, 
  Users, 
  Shield, 
  ChevronDown,
  ArrowRight,
  Sparkles,
  Calendar,
  Clock,
  Filter,
  Search,
  Download,
  MessageSquare,
  Star,
  Zap,
  Hexagon,
  Share2,
  Percent,
  Globe,
  Palette,
  TrendingUp,
  Smartphone,
  Package,
  Wrench,
  Info
} from 'lucide-react';

// Custom components
import CategoryFilter from '../components/CategoryFilter.js';
import ServiceComparison from '../components/ServiceComparison.js';

const RateCardPage = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showComparison, setShowComparison] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeView, setActiveView] = useState('grid'); // 'grid' or 'table'
  
  // Refs for scroll animations and anchors
  const heroRef = useRef(null);
  const rateCardRef = useRef(null);
  const benefitsRef = useRef(null);
  const faqRef = useRef(null);
  const comparisonRef = useRef(null);
  const shareButtonRef = useRef(null);
  
  // Check if elements are in view for animations
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.3 });
  const faqInView = useInView(faqRef, { once: true, amount: 0.3 });
  
  // Service categories for filtering
  const categories = [
    { id: 'all', name: 'All Services', icon: <Hexagon className="w-4 h-4" /> },
    { id: 'web', name: 'Web Development', icon: <Globe className="w-4 h-4" /> },
    { id: 'design', name: 'Graphic Design', icon: <Palette className="w-4 h-4" /> },
    { id: 'marketing', name: 'Digital Marketing', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'app', name: 'App Development', icon: <Smartphone className="w-4 h-4" /> }
  ];
  
  // Initialize from URL parameters if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');
    
    if (categoryParam && categories.some(cat => cat.id === categoryParam)) {
      setActiveCategory(categoryParam);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    // Check for comparison view parameter
    const compareParam = params.get('compare');
    if (compareParam === 'true') {
      setShowComparison(true);
    }
  }, [location.search]);
  
  // Handle click outside share menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareButtonRef.current && !shareButtonRef.current.contains(event.target)) {
        setShowShareMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Pricing benefits data with improved icons and descriptions
  const pricingBenefits = [
    {
      title: "Transparent Pricing",
      description: "No hidden fees or surprise costs. All services have clear pricing, and you'll always receive a detailed breakdown before any work begins.",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-emerald-500"
    },
    {
      title: "Value-Based Pricing",
      description: "Our prices reflect the value and quality we deliver. We focus on achieving the best ROI for your business investment.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Flexible Packages",
      description: "Build custom service packages with modular pricing that adapt to your specific project requirements and budget constraints.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-purple-500"
    },
    {
      title: "Quality Guarantee",
      description: "We stand behind our work with a 100% satisfaction guarantee. If you're not happy with the results, we'll make it right.",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-amber-500"
    },
    {
      title: "Predictable Timelines",
      description: "Every project includes clear delivery timeframes so you know exactly when to expect deliverables and project completion.",
      icon: <Calendar className="w-6 h-6" />,
      color: "bg-indigo-500"
    },
    {
      title: "Priority Support",
      description: "All projects include responsive support from our team during development and after delivery to ensure your continued success.",
      icon: <MessageSquare className="w-6 h-6" />,
      color: "bg-rose-500"
    }
  ];
  
  // Enhanced special offers
  const specialOffers = [
    {
      title: "First-Time Client Discount",
      description: "Get 10% off your first project with us",
      icon: <Percent className="w-5 h-5" />,
      code: "FIRSTTIME10",
      expiryDate: "No Expiry"
    },
    {
      title: "Bundle Services",
      description: "Save 15% when you combine 3+ services",
      icon: <Package className="w-5 h-5" />,
      code: "BUNDLE15",
      expiryDate: "No Expiry"
    },
    {
      title: "Annual Maintenance",
      description: "20% off when you prepay for annual maintenance",
      icon: <Wrench className="w-5 h-5" />,
      code: "ANNUAL20",
      expiryDate: "No Expiry"
    }
  ];
  
  // Expanded FAQ items
  const faqItems = [
    {
      question: "Do you offer discounts for long-term projects?",
      answer: "Yes, we offer special rates for long-term partnerships and ongoing projects. The specific discount depends on the project scope, duration, and requirements. For projects lasting 6+ months, we typically offer 10-15% discounts. For annual commitments, discounts can range from 15-25%. Contact us to discuss your specific needs and we'll create a custom pricing package that offers the best value for your investment."
    },
    {
      question: "Are there any additional costs not included in the rate card?",
      answer: "Our rate card covers all standard services and labor costs. Additional costs may apply for third-party services and resources such as premium stock photos, commercial fonts, domain registration, hosting services, premium plugins, or third-party API subscriptions. We provide complete transparency by always providing a detailed quote with all potential costs before starting work, and we'll confirm with you before incurring any additional expenses during the project."
    },
    {
      question: "How do your payment terms work?",
      answer: "For most projects, we require a 40% deposit to begin work, with 30% due at the midpoint milestone and the remaining 30% upon completion and delivery. For larger projects exceeding $10,000, we can discuss custom payment schedules with monthly installments. We accept various payment methods including M-Pesa, bank transfers, credit card payments, and in some regions, PayPal. All payment terms are clearly outlined in our service agreement before project initiation."
    },
    {
      question: "Can I get a custom quote for my project?",
      answer: "Absolutely! The rates on our rate card are starting points. Every project is unique with its own specific requirements and challenges. We're happy to provide a comprehensive custom quote tailored to your specific needs after understanding your project objectives, scope, timeline, and technical requirements. Fill out our quote request form with as much detail as possible, and our team will prepare a detailed proposal within 2-3 business days."
    },
    {
      question: "Do you offer maintenance packages after project completion?",
      answer: "Yes, we offer several maintenance packages to keep your digital assets secure, up-to-date, and performing optimally. Our Basic package includes security updates and monitoring. The Standard package adds performance optimization and minor content updates. Our Premium package provides priority support, regular feature enhancements, and comprehensive analytics. All maintenance contracts can be monthly or annual, with discounts for annual commitments."
    },
    {
      question: "What is your revision policy?",
      answer: "We include two rounds of revisions in our standard project rate to ensure your complete satisfaction. Minor adjustments and tweaks during the development process don't count against these revision rounds. For extensive changes or shifts in project direction after approval of initial concepts, additional charges may apply based on our hourly rates. We'll always communicate clearly before any additional charges are incurred."
    },
    {
      question: "Do you offer rush delivery options?",
      answer: "Yes, we understand that sometimes you need projects completed on an accelerated timeline. We offer rush delivery options with a priority fee, typically 25-50% above the standard rate depending on the urgency and complexity. However, availability for rush projects depends on our current workload. Contact us with your timeline requirements, and we'll do our best to accommodate your needs while maintaining our quality standards."
    },
    {
      question: "Do your rates vary by region or country?",
      answer: "Our base rates are standardized across all regions we serve, but we do offer regional pricing adjustments for certain markets. For clients in developing economies, we may offer adjusted rates to better align with local economic conditions. Our goal is to provide fair and accessible pricing while maintaining our high quality standards across all markets. Please contact us to discuss your specific situation."
    }
  ];

  // Function to handle service category selection
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    
    // Update URL with category param
    const params = new URLSearchParams(location.search);
    params.set('category', categoryId);
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    
    // Scroll to rate card section
    if (rateCardRef.current) {
      rateCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Function to handle search queries
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Update URL with search param
    const params = new URLSearchParams(location.search);
    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  // Function to handle navigation to quote request with prefilled service
  const handleRequestQuote = (service, type) => {
    navigate(`/quote?service=${service}&type=${type}`);
  };

  // Function to toggle comparison view
  const toggleComparison = () => {
    setShowComparison(!showComparison);
    
    // Update URL with compare param
    const params = new URLSearchParams(location.search);
    if (!showComparison) {
      params.set('compare', 'true');
    } else {
      params.delete('compare');
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    
    // Scroll to comparison section if opening
    if (!showComparison && comparisonRef.current) {
      setTimeout(() => {
        comparisonRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  
  // Function to toggle view mode (grid or table)
  const toggleViewMode = (mode) => {
    setActiveView(mode);
  };
  
  // Function to handle share functionality
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = "Check out Conison Technologies' pricing and services";
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`I thought you might be interested in this: ${url}`)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url)
          .then(() => {
            // Show a small toast notification
            alert("Link copied to clipboard!");
          })
          .catch(err => {
            console.error('Could not copy text: ', err);
          });
        break;
    }
    
    setShowShareMenu(false);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section with Interactive Elements */}
      <section 
        ref={heroRef} 
        className="relative py-20 md:py-28 overflow-hidden"
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20 dark:from-purple-600/10 dark:to-blue-600/10"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
          
          {/* Animated grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900 dark:to-gray-900"></div>
          </div>
          
          {/* Floating elements for visual interest */}
          <motion.div
            className="absolute top-1/4 left-1/5 w-8 h-8 rounded-full bg-purple-500/30 backdrop-blur-md hidden lg:block"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute top-2/3 right-1/4 w-6 h-6 rounded-full bg-blue-500/30 backdrop-blur-md hidden lg:block"
            animate={{
              y: [0, -15, 0],
              x: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-4 h-4 rounded-full bg-amber-500/30 backdrop-blur-md hidden lg:block"
            animate={{
              y: [0, 15, 0],
              x: [0, 5, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 dark:from-purple-500/10 dark:to-blue-500/10 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
              Pricing & Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Transparent Pricing</span> For Quality Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Clear, competitive rates for all our digital services with no hidden costs. Browse our service catalog or request a custom quote tailored to your needs.
            </p>
            
            {/* Hero Action Buttons with Animations */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ y: 0 }}
              >
                <Link 
                  to="/quote" 
                  className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  Get Custom Quote
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ y: 0 }}
              >
                <button 
                  onClick={toggleComparison}
                  className={`px-8 py-3.5 font-medium rounded-lg transition-all duration-300 border flex items-center ${
                    isDarkMode 
                      ? 'border-gray-700 hover:bg-gray-800 text-gray-200' 
                      : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Compare Services
                </button>
              </motion.div>
              
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ y: 0 }}
              >
                <a 
                  href="/rate-card.pdf" 
                  download
                  className={`px-8 py-3.5 font-medium rounded-lg transition-all duration-300 border flex items-center ${
                    isDarkMode 
                      ? 'border-gray-700 hover:bg-gray-800 text-gray-200' 
                      : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </a>
              </motion.div>
              
              {/* Share Button with Dropdown */}
              <motion.div
                whileHover={{ y: -4 }}
                whileTap={{ y: 0 }}
                ref={shareButtonRef}
                className="relative"
              >
                <button 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className={`px-8 py-3.5 font-medium rounded-lg transition-all duration-300 border flex items-center ${
                    isDarkMode 
                      ? 'border-gray-700 hover:bg-gray-800 text-gray-200' 
                      : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
                
                {/* Share Menu Dropdown */}
                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg z-30 ${
                        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="py-1">
                        <button
                          onClick={() => handleShare('twitter')}
                          className={`flex items-center w-full px-4 py-2 text-sm ${
                            isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="w-5 h-5 mr-3 text-[#1DA1F2]">
                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                          </span>
                          Twitter
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className={`flex items-center w-full px-4 py-2 text-sm ${
                            isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="w-5 h-5 mr-3 text-[#1877F2]">
                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                          </span>
                          Facebook
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className={`flex items-center w-full px-4 py-2 text-sm ${
                            isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="w-5 h-5 mr-3 text-[#0A66C2]">
                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                          </span>
                          LinkedIn
                        </button>
                        <button
                          onClick={() => handleShare('email')}
                          className={`flex items-center w-full px-4 py-2 text-sm ${
                            isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="w-5 h-5 mr-3 text-gray-500">
                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                          </span>
                          Email
                        </button>
                        <button
                          onClick={() => handleShare('copy')}
                          className={`flex items-center w-full px-4 py-2 text-sm ${
                            isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <span className="w-5 h-5 mr-3 text-gray-500">
                            <svg fill="currentColor" viewBox="0 0 24 24"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
                          </span>
                          Copy Link
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
            
            {/* Service Category Quick Navigation with Enhanced Design */}
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all flex items-center ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                  }`}
                >
                  <span className="mr-1.5">{category.icon}</span>
                  {category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator animation */}
        <motion.div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400"
          animate={{ y: [0, 10, 0] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop" 
          }}
        >
          <span className="text-xs mb-1">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </section>
      
      {/* Special Offers Banner */}
      <section className={`py-4 ${isDarkMode ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden">
            {/* Moving offers banner */}
            <div className="flex animate-marquee">
              {[...specialOffers, ...specialOffers].map((offer, index) => (
                <div 
                  key={index}
                  className={`flex-shrink-0 flex items-center mx-6 px-4 py-1.5 rounded-full ${
                    isDarkMode 
                      ? 'bg-purple-800/50 border border-purple-700' 
                      : 'bg-white/80 border border-purple-200'
                  }`}
                >
                  <span className="text-purple-600 mr-2">{offer.icon}</span>
                  <span className="font-medium text-sm mr-2">{offer.title}:</span>
                  <span className="text-sm">{offer.description}</span>
                  {offer.code && (
                    <span className={`ml-2 px-2 py-0.5 text-xs font-mono rounded ${
                      isDarkMode ? 'bg-purple-700' : 'bg-purple-200'
                    }`}>
                      {offer.code}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Comparison Section (Conditionally Rendered) */}
      <AnimatePresence>
        {showComparison && (
          <motion.section
            ref={comparisonRef}
            className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="container mx-auto px-6 lg:px-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Compare Service Packages</h2>
                <button 
                  onClick={toggleComparison}
                  className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                >
                  <ChevronDown className="w-6 h-6 transform rotate-180" />
                </button>
              </div>
              
              <ServiceComparison 
                isDarkMode={isDarkMode} 
                onSelectService={handleRequestQuote} 
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>
      
      {/* Enhanced Filter and Search Section with View Toggle */}
      <section className={`py-6 border-b ${
        isDarkMode 
          ? 'bg-gray-800/90 backdrop-blur-sm border-gray-700 sticky top-0 z-20' 
          : 'bg-white/90 backdrop-blur-sm border-gray-200 sticky top-0 z-20'
      }`}>
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center w-full md:w-auto space-x-2">
              {/* Category Tabs */}
              <CategoryFilter 
                categories={categories}
                activeCategory={activeCategory}
                onChange={handleCategoryChange}
                isDarkMode={isDarkMode}
              />
              
              {/* View Toggle */}
              <div className={`hidden md:flex border rounded-lg overflow-hidden ${
                isDarkMode ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <button
                  onClick={() => toggleViewMode('grid')}
                  className={`px-3 py-2 flex items-center ${
                    activeView === 'grid'
                      ? isDarkMode 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 text-gray-900'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-400'
                        : 'bg-white text-gray-500'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => toggleViewMode('table')}
                  className={`px-3 py-2 flex items-center ${
                    activeView === 'table'
                      ? isDarkMode 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-gray-100 text-gray-900'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-400'
                        : 'bg-white text-gray-500'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Enhanced Search with clear button */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={handleSearch}
                className={`w-full pl-10 pr-10 py-2 rounded-lg border ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow`}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Rate Card Section with View Toggle Support */}
      <section 
        ref={rateCardRef}
        className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <RateCard 
            categoryFilter={activeCategory} 
            searchQuery={searchQuery} 
            onRequestQuote={handleRequestQuote}
            viewMode={activeView}
          />
        </div>
      </section>
      
      {/* Benefits Section with Enhanced Animation */}
      <section 
        ref={benefitsRef}
        className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Services</h2>
            <p className="text-gray-600 dark:text-gray-300">
              We're committed to providing exceptional value and transparent pricing for all our clients
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                className={`rounded-xl p-6 h-full ${
                  isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'
                } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} transition-all hover:shadow-md`}
                initial={{ opacity: 0, y: 20 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
              >
                <div className={`w-12 h-12 rounded-lg ${benefit.color} flex items-center justify-center text-white mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* FAQ Section - Enhanced with Better Animations */}
      <section 
        ref={faqRef}
        className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-sm font-medium mb-3">
              FAQ
            </span>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Find answers to common questions about our pricing and services
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className={`mb-4 rounded-xl overflow-hidden border ${
                  isDarkMode 
                    ? 'border-gray-700 bg-gray-800/50' 
                    : 'border-gray-200 bg-white'
                } transition-all ${activeFaq === index ? 'shadow-md' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <button
                  className={`w-full px-6 py-4 text-left flex items-center justify-between ${
                    isDarkMode ? 'hover:bg-gray-700/50' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="font-medium">{item.question}</span>
                  <motion.div
                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-purple-500" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className={`px-6 py-4 border-t ${
                        isDarkMode ? 'border-gray-700 bg-gray-700/30' : 'border-gray-100 bg-gray-50/50'
                      }`}>
                        <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Still have questions about our rates or services?
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Contact Our Team
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Enhanced CTA Section with Gradient Animation */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className={`rounded-2xl overflow-hidden relative`}
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 dark:from-purple-900/40 dark:to-blue-900/40">
              <div className="absolute inset-0 backdrop-blur-sm"></div>
              {isDarkMode && <div className="absolute inset-0 border border-gray-800 rounded-2xl"></div>}
            </div>
            
            <div className="relative px-8 py-12 md:py-16 text-center">
              <h2 className="text-3xl font-bold mb-6 dark:text-white">Ready to Get Started?</h2>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's discuss your project needs and create a custom solution that fits your budget and timeline.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/quote"
                    className="px-8 py-3.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    Request a Quote
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/contact"
                    className={`px-8 py-3.5 font-medium rounded-lg transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800 text-white hover:bg-gray-700' 
                        : 'bg-white text-gray-800 hover:bg-gray-50'
                    } shadow-md hover:shadow-lg`}
                  >
                    Schedule a Consultation
                  </Link>
                </motion.div>
              </div>
              
              {/* Rating stars */}
              <div className="mt-10 flex justify-center items-center">
                <div className="flex space-x-1 mr-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Rated 4.9/5 from over 200+ satisfied clients
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Back to top button */}
      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg z-30 ${
          isDarkMode 
            ? 'bg-gray-800 text-white hover:bg-gray-700' 
            : 'bg-white text-gray-800 hover:bg-gray-100'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </motion.button>
    </div>
  );
};

export default RateCardPage;