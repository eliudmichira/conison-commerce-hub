import React, { useState, useRef } from 'react';
import RateCard from '../components/RateCard';
import { useDarkMode } from '../context/DarkModeContext';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { 
  CheckCircle, 
  DollarSign, 
  Users, 
  Shield, 
  ChevronDown,
  ArrowRight,
  Sparkles
} from 'lucide-react';

const RateCardPage = () => {
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState('monthly');
  const [activeFaq, setActiveFaq] = useState(null);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);
  
  // Check if elements are in view for animations
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.3 });
  const pricingInView = useInView(pricingRef, { once: true, amount: 0.1 });
  const faqInView = useInView(faqRef, { once: true, amount: 0.3 });
  
  // Pricing benefits data with improved icons
  const pricingBenefits = [
    {
      title: "Transparent Pricing",
      description: "No hidden fees or surprise costs. You'll always know exactly what you're paying for.",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-emerald-500"
    },
    {
      title: "Value-Based Pricing",
      description: "Our prices reflect the value we deliver. We focus on ROI for your business.",
      icon: <Sparkles className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      title: "Flexible Options",
      description: "We offer customized packages to fit your budget and project requirements.",
      icon: <Users className="w-6 h-6" />,
      color: "bg-purple-500"
    },
    {
      title: "Quality Guarantee",
      description: "We stand behind the quality of our work with a 100% satisfaction guarantee.",
      icon: <Shield className="w-6 h-6" />,
      color: "bg-amber-500"
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
    }
  ];

  // Sample pricing plans
  const pricingPlans = {
    monthly: [
      {
        name: "Essential",
        price: "999",
        description: "Perfect for small businesses just getting started with digital presence",
        features: [
          "Responsive website (up to 5 pages)",
          "Basic SEO setup",
          "Contact form integration",
          "Mobile optimization",
          "1 month of support"
        ],
        highlight: false,
        cta: "Get Started"
      },
      {
        name: "Professional",
        price: "2,499",
        description: "Comprehensive solution for established businesses looking to grow online",
        features: [
          "Custom website design (up to 10 pages)",
          "Advanced SEO implementation",
          "Email marketing integration",
          "Basic e-commerce functionality",
          "Social media integration",
          "Content management system",
          "3 months of support & maintenance"
        ],
        highlight: true,
        cta: "Most Popular"
      },
      {
        name: "Enterprise",
        price: "5,999",
        description: "Full-scale digital solution for businesses with complex requirements",
        features: [
          "Custom web application development",
          "Full e-commerce capabilities",
          "Payment gateway integration",
          "Custom database solutions",
          "Advanced analytics dashboard",
          "API integrations",
          "6 months of priority support",
          "Dedicated account manager"
        ],
        highlight: false,
        cta: "Contact Us"
      }
    ],
    quarterly: [
      {
        name: "Essential",
        price: "2,699",
        description: "Perfect for small businesses just getting started with digital presence",
        features: [
          "Responsive website (up to 5 pages)",
          "Basic SEO setup",
          "Contact form integration",
          "Mobile optimization",
          "3 months of support",
          "Quarterly performance report"
        ],
        highlight: false,
        cta: "Get Started"
      },
      {
        name: "Professional",
        price: "6,799",
        description: "Comprehensive solution for established businesses looking to grow online",
        features: [
          "Custom website design (up to 10 pages)",
          "Advanced SEO implementation",
          "Email marketing integration",
          "Basic e-commerce functionality",
          "Social media integration",
          "Content management system",
          "6 months of support & maintenance",
          "Quarterly strategy consultation"
        ],
        highlight: true,
        cta: "Save 10%"
      },
      {
        name: "Enterprise",
        price: "15,999",
        description: "Full-scale digital solution for businesses with complex requirements",
        features: [
          "Custom web application development",
          "Full e-commerce capabilities",
          "Payment gateway integration",
          "Custom database solutions",
          "Advanced analytics dashboard",
          "API integrations",
          "1 year of priority support",
          "Dedicated account manager",
          "Quarterly technology reviews"
        ],
        highlight: false,
        cta: "Best Value"
      }
    ]
  };
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Hero Section */}
      <section 
        ref={heroRef} 
        className="relative py-24 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl opacity-20 dark:opacity-10"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-purple-500/20 dark:bg-purple-500/10 text-purple-700 dark:text-purple-300 text-sm font-medium mb-4">
              Pricing & Services
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Transparent <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Clear, competitive rates for all our digital services with no hidden costs. Invest in quality that delivers results.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to="/contact" 
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
              >
                Get Custom Quote
              </Link>
              <Link 
                to="/portfolio" 
                className={`px-8 py-3 font-medium rounded-lg transition-all duration-300 border ${
                  isDarkMode 
                    ? 'border-gray-700 hover:bg-gray-800 text-gray-200' 
                    : 'border-gray-300 hover:bg-gray-100 text-gray-700'
                }`}
              >
                View Our Work
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Pricing Philosophy Section */}
      <section 
        ref={benefitsRef}
        className={`py-16 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold mb-4">Our Pricing Philosophy</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              At Conison Technologies, we believe in transparent pricing that delivers value. Our rates reflect the quality of our work and the expertise of our team. We work with clients of all sizes and tailor our solutions to fit your budget without compromising quality.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {pricingBenefits.map((benefit, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} shadow-sm hover:shadow-md transition-all`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${benefit.color} text-white mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Plans Section */}
      <section 
        ref={pricingRef}
        className={`py-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={pricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold mb-4">Pricing Plans</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Choose the plan that's right for your business. All plans include our quality guarantee and exceptional support.
            </p>
            
            <div className={`inline-flex p-1 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-8`}>
              <button
                onClick={() => setActiveTab('monthly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'monthly' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setActiveTab('quarterly')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'quarterly' 
                    ? 'bg-purple-600 text-white shadow-sm' 
                    : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Quarterly <span className="text-xs font-light">(Save 10%)</span>
              </button>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {pricingPlans[activeTab].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={pricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2, ease: "easeOut" }}
                className={`relative rounded-2xl overflow-hidden ${
                  plan.highlight 
                    ? 'ring-2 ring-purple-600 dark:ring-purple-500' 
                    : isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg hover:shadow-xl transition-all`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 inset-x-0 py-1 text-center text-xs font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600">
                    MOST POPULAR
                  </div>
                )}
                
                <div className={`p-8 ${plan.highlight && 'pt-6'}`}>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 h-12">
                    {plan.description}
                  </p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold">KSh {plan.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">{activeTab === 'monthly' ? '/mo' : '/quarter'}</span>
                  </div>
                  
                  <Link 
                    to="/contact" 
                    className={`block w-full py-3 text-center rounded-lg font-medium mb-8 ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                        : isDarkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                    } transition-all`}
                  >
                    {plan.cta}
                  </Link>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Need a more customized solution? We've got you covered.
            </p>
            <Link 
              to="/contact" 
              className={`inline-flex items-center font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300`}
            >
              Contact us for a custom quote <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Rate Card Component */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <RateCard />
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section 
        ref={faqRef}
        className={`py-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Find answers to common questions about our pricing, payment terms, and policies.
            </p>
          </motion.div>
          
          <div className="max-w-4xl mx-auto">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                className={`mb-4 rounded-xl overflow-hidden ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-sm hover:shadow-md transition-all`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="flex justify-between items-center w-full p-6 text-left font-medium"
                  aria-expanded={activeFaq === index}
                >
                  <span>{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-purple-600 dark:text-purple-400 transition-transform ${
                      activeFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeFaq === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className={`p-6 pt-0 border-t ${
                    isDarkMode ? 'border-gray-700' : 'border-gray-200'
                  } text-gray-600 dark:text-gray-300`}>
                    {faq.answer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RateCardPage;