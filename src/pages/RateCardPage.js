import React, { useState, useEffect } from 'react';
import RateCard from '../components/RateCard';
import { useDarkMode } from '../context/DarkModeContext';
import { Link } from 'react-router-dom';

const RateCardPage = () => {
  const { isDarkMode } = useDarkMode();
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  
  // Animate elements on page load
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);
  
  // Pricing benefits data
  const pricingBenefits = [
    {
      title: "Transparent Pricing",
      description: "No hidden fees or surprise costs. You'll always know exactly what you're paying for.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      )
    },
    {
      title: "Value-Based Pricing",
      description: "Our prices reflect the value we deliver. We focus on ROI for your business.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: "Flexible Options",
      description: "We offer customized packages to fit your budget and project requirements.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      )
    },
    {
      title: "Quality Guarantee",
      description: "We stand behind the quality of our work with a 100% satisfaction guarantee.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      )
    }
  ];
  
  // FAQ items
  const faqItems = [
    {
      question: "Do you offer discounts for long-term projects?",
      answer: "Yes, we offer special rates for long-term partnerships and ongoing projects. The specific discount depends on the project scope, duration, and requirements. Contact us to discuss your specific needs."
    },
    {
      question: "Are there any additional costs not included in the rate card?",
      answer: "Our rate card covers all standard services. Additional costs may apply for third-party services (like stock photos, fonts, domain registration, hosting, or premium plugins). We'll always provide a detailed quote with all potential costs before starting work."
    },
    {
      question: "How do your payment terms work?",
      answer: "For most projects, we require a 40% deposit to begin work, with 30% due at the midpoint and the remaining 30% upon completion. For larger projects, we can discuss custom payment schedules. We accept M-Pesa, bank transfers, and credit card payments."
    },
    {
      question: "Can I get a custom quote for my project?",
      answer: "Absolutely! The rates on our rate card are starting points. Every project is unique, and we're happy to provide a custom quote tailored to your specific requirements. Fill out our quote request form to get started."
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-500 ease-out ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="inline-block py-1 px-3 rounded-full bg-conison-yellow/20 dark:bg-conison-yellow/10 text-conison-yellow dark:text-conison-yellow text-sm font-medium mb-3">
            Pricing & Services
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Our Rate Card</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transparent pricing for all our services. We offer competitive rates with no hidden costs.
          </p>
        </div>
        
        {/* Pricing Philosophy Section */}
        <div className={`max-w-4xl mx-auto mb-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 transition-all duration-500 ease-out ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Our Pricing Philosophy</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            At Conison Technologies, we believe in transparent pricing that delivers value. Our rates reflect the quality of our work and the expertise of our team. We work with clients of all sizes and tailor our solutions to fit your budget without compromising quality.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {pricingBenefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-conison-cyan/10 text-conison-cyan dark:bg-conison-cyan/20 dark:text-conison-cyan mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Rate Card Component */}
        <div className={`transition-all duration-500 ease-out ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          <RateCard />
        </div>
        
        {/* FAQ Section */}
        <div className={`max-w-4xl mx-auto mt-16 transition-all duration-500 ease-out ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-white">Frequently Asked Questions</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {faqItems.map((faq, index) => (
              <div key={index} className={index < faqItems.length - 1 ? "border-b border-gray-200 dark:border-gray-700" : ""}>
                <details className="group p-6">
                  <summary className="flex justify-between items-center cursor-pointer list-none">
                    <h5 className="text-gray-800 dark:text-white font-medium">{faq.question}</h5>
                    <span className="text-conison-magenta dark:text-conison-magenta ml-6 transform group-open:rotate-180 transition-transform duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </details>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className={`text-center mt-16 transition-all duration-500 ease-out ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Ready to Get Started?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your project needs and get a customized quote.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/quote-request" className="px-8 py-3 bg-conison-magenta hover:bg-conison-magenta/90 text-white font-medium rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
              Request a Quote
            </Link>
            <a href="tel:+254712345678" className="px-8 py-3 border border-conison-cyan text-conison-cyan hover:bg-conison-cyan/10 dark:text-conison-cyan dark:border-conison-cyan dark:hover:bg-conison-cyan/5 font-medium rounded-lg transition-colors duration-300">
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateCardPage;