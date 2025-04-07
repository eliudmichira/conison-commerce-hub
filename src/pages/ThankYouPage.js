import React from 'react';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const ThankYouPage = () => {
  const { isDarkMode } = useDarkMode();

  return (
    <div className="py-24 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-700 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-teal-600 dark:from-green-600 dark:to-teal-700 py-8 px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-white bg-opacity-25">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Quote Request Received!</h1>
            <p className="text-green-100 text-lg">Thank you for choosing Conison Technologies</p>
          </div>
          
          <div className="py-8 px-8 md:px-16">
            <div className="text-center mb-8">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We've received your quote request and our team is already working on it. You'll receive a customized quote within 48 hours.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any urgent questions, please don't hesitate to contact us directly at <a href="mailto:info@conisontechnologies.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">info@conisontechnologies.com</a> or call us at <a href="tel:+254712345678" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">+254 712 345 678</a>.
              </p>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-600 pt-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">What happens next?</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-4">
                    1
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white">Quote Preparation</h4>
                    <p className="text-gray-600 dark:text-gray-400">Our team will review your requirements and prepare a detailed quote tailored to your needs.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-4">
                    2
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white">Quote Delivery</h4>
                    <p className="text-gray-600 dark:text-gray-400">We'll email you the quote within 48 hours, including project scope, timeline, and costs.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-4">
                    3
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-white">Consultation Call</h4>
                    <p className="text-gray-600 dark:text-gray-400">We'll schedule a call to discuss the quote, answer questions, and make any necessary adjustments.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/" 
                className="w-full sm:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-center transition-colors duration-300"
              >
                Return to Home
              </Link>
              <Link 
                to="/services" 
                className="w-full sm:w-auto px-8 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-800 font-medium rounded-lg text-center transition-colors duration-300"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage; 