import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClientData } from '../../context/ClientDataContext';
import { motion } from 'framer-motion';
import { 
  FaCheck, 
  FaHourglassHalf, 
  FaTimesCircle, 
  FaFileDownload, 
  FaPlusCircle,
  FaArrowRight,
  FaCalendarAlt,
  FaDollarSign,
  FaExternalLinkAlt
} from 'react-icons/fa';

const QuotesPage = () => {
  const { quotes, loading, updateQuote } = useClientData();
  const [filter, setFilter] = useState('all');

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse flex justify-center items-center space-x-2">
          <div className="h-3 w-3 bg-conison-cyan rounded-full"></div>
          <div className="h-3 w-3 bg-conison-magenta rounded-full"></div>
          <div className="h-3 w-3 bg-conison-cyan rounded-full"></div>
        </div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Loading your quotes...</p>
      </div>
    );
  }

  // Filter quotes based on the selected filter
  const filteredQuotes = filter === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.status === filter);
  
  // Sort quotes by date (newest first)
  const sortedQuotes = [...filteredQuotes].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.updatedAt);
    const dateB = new Date(b.createdAt || b.updatedAt);
    return dateB - dateA;
  });

  const handleAcceptQuote = (quoteId) => {
    updateQuote(quoteId, { status: 'approved' });
  };

  // Animation variants for list items
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">Your Quotes</h1>
        <Link 
          to="/quote-request" 
          className="px-5 py-2.5 bg-gradient-to-r from-conison-cyan to-conison-magenta text-white rounded-lg hover:opacity-90 transition-all duration-300 flex items-center shadow-md"
        >
          <FaPlusCircle className="mr-2" />
          Request New Quote
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap space-x-2 mb-8 border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
            filter === 'all' 
              ? 'text-conison-magenta border-b-2 border-conison-magenta dark:text-conison-magenta dark:border-conison-magenta' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setFilter('all')}
        >
          All Quotes
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
            filter === 'pending' 
              ? 'text-conison-magenta border-b-2 border-conison-magenta dark:text-conison-magenta dark:border-conison-magenta' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
            filter === 'approved' 
              ? 'text-conison-magenta border-b-2 border-conison-magenta dark:text-conison-magenta dark:border-conison-magenta' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setFilter('approved')}
        >
          Approved
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
            filter === 'expired' 
              ? 'text-conison-magenta border-b-2 border-conison-magenta dark:text-conison-magenta dark:border-conison-magenta' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setFilter('expired')}
        >
          Expired
        </button>
      </div>

      {/* Quotes list */}
      {sortedQuotes.length > 0 ? (
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {sortedQuotes.map((quote) => (
            <motion.div 
              key={quote.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-100 dark:border-gray-700"
              variants={item}
            >
              <div className="relative">
                <div className={`h-2 w-full ${
                  quote.status === 'pending' 
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-300' 
                    : quote.status === 'approved' 
                      ? 'bg-gradient-to-r from-conison-cyan to-conison-magenta' 
                      : 'bg-gradient-to-r from-red-500 to-red-400'
                }`}></div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold dark:text-white">{quote.service}</h3>
                    {quote.status === 'pending' ? (
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 text-xs rounded-full flex items-center">
                        <FaHourglassHalf className="mr-1.5" /> Pending
                      </span>
                    ) : quote.status === 'approved' ? (
                      <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200 text-xs rounded-full flex items-center">
                        <FaCheck className="mr-1.5" /> Approved
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200 text-xs rounded-full flex items-center">
                        <FaTimesCircle className="mr-1.5" /> Expired
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                    {quote.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-6">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FaDollarSign className="mr-1.5 text-conison-cyan" />
                      <span>${quote.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FaCalendarAlt className="mr-1.5 text-conison-magenta" />
                      <span>{new Date(quote.createdAt || quote.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                    <button 
                      className="text-sm text-conison-cyan hover:text-conison-cyan-dark dark:text-conison-cyan dark:hover:text-conison-cyan-light flex items-center transition-colors"
                      onClick={() => window.alert('Quote details downloaded!')}
                    >
                      <FaFileDownload className="mr-1.5" /> Download
                    </button>
                    
                    {quote.status === 'pending' && (
                      <button
                        onClick={() => handleAcceptQuote(quote.id)}
                        className="px-3 py-1.5 bg-gradient-to-r from-conison-cyan to-conison-magenta text-white text-sm rounded-lg flex items-center hover:opacity-90 transition-all shadow-sm"
                      >
                        Accept Quote <FaCheck className="ml-1.5" />
                      </button>
                    )}
                    
                    {quote.status === 'approved' && (
                      <Link
                        to={`/client/payments/make?quoteId=${quote.id}`}
                        className="px-3 py-1.5 bg-gradient-to-r from-conison-cyan to-conison-magenta text-white text-sm rounded-lg flex items-center hover:opacity-90 transition-all shadow-sm"
                      >
                        Make Payment <FaArrowRight className="ml-1.5" />
                      </Link>
                    )}
                    
                    {quote.status === 'expired' && (
                      <Link
                        to={`/quote-request?renew=${quote.id}`}
                        className="px-3 py-1.5 bg-conison-gray text-white text-sm rounded-lg flex items-center hover:bg-conison-gray-dark transition-all shadow-sm"
                      >
                        Request Again <FaExternalLinkAlt className="ml-1.5" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700"
        >
          <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No quotes found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
            No quotes match your current filter. Request a new quote to get started with your project.
          </p>
          <Link 
            to="/quote-request" 
            className="px-5 py-2.5 bg-gradient-to-r from-conison-cyan to-conison-magenta text-white rounded-lg hover:opacity-90 transition-all duration-300 inline-flex items-center shadow-md"
          >
            <FaPlusCircle className="mr-2" />
            Request a Quote Now
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default QuotesPage; 