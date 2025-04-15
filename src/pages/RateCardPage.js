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
  const [activeFaq, setActiveFaq] = useState(null);

  // Refs for scroll animations
  const heroRef = useRef(null);
  const benefitsRef = useRef(null);
  const faqRef = useRef(null);
  
  // Check if elements are in view for animations
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const benefitsInView = useInView(benefitsRef, { once: true, amount: 0.3 });
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
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Rate Card</span>
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
      
      {/* Rate Card Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800/50' : 'bg-white'}`}>
        <div className="container mx-auto px-6 lg:px-8">
          <RateCard />
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        ref={faqRef}
        className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Find answers to common questions about our pricing and services
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                className={`mb-4 rounded-lg overflow-hidden ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              >
                <button
                  className={`w-full px-6 py-4 text-left flex items-center justify-between ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="font-medium">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transform transition-transform ${
                      activeFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className={`px-6 py-4 ${
                    isDarkMode ? 'bg-gray-800' : 'bg-white'
                  }`}>
                    <p className="text-gray-600 dark:text-gray-300">{item.answer}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default RateCardPage;