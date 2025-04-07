import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClientData } from '../../context/ClientDataContext';
import { FaCheck, FaHourglassHalf, FaTimesCircle, FaFileDownload } from 'react-icons/fa';

const QuotesPage = () => {
  const { quotes, loading, updateQuote } = useClientData();
  const [filter, setFilter] = useState('all');

  if (loading) {
    return <div className="p-6 text-center">Loading quotes...</div>;
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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Your Quotes</h1>
        <Link 
          to="/quote-request" 
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          Request New Quote
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex space-x-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            filter === 'all' 
              ? 'text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setFilter('all')}
        >
          All Quotes
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            filter === 'pending' 
              ? 'text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            filter === 'approved' 
              ? 'text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setFilter('approved')}
        >
          Approved
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            filter === 'expired' 
              ? 'text-purple-600 border-b-2 border-purple-600 dark:text-purple-400 dark:border-purple-400' 
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
          }`}
          onClick={() => setFilter('expired')}
        >
          Expired
        </button>
      </div>

      {/* Quotes list */}
      {sortedQuotes.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sortedQuotes.map((quote) => (
            <div 
              key={quote.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{quote.service}</h3>
                  {quote.status === 'pending' ? (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-xs rounded-full flex items-center">
                      <FaHourglassHalf className="mr-1" /> Pending
                    </span>
                  ) : quote.status === 'approved' ? (
                    <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full flex items-center">
                      <FaCheck className="mr-1" /> Approved
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-xs rounded-full flex items-center">
                      <FaTimesCircle className="mr-1" /> Expired
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {quote.description}
                </p>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Amount: ${quote.amount.toLocaleString()}</span>
                  <span>Date: {new Date(quote.createdAt || quote.updatedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <button 
                    className="text-sm text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-200 flex items-center"
                    onClick={() => window.alert('Quote details downloaded!')}
                  >
                    <FaFileDownload className="mr-1" /> Download PDF
                  </button>
                  {quote.status === 'pending' && (
                    <button
                      onClick={() => handleAcceptQuote(quote.id)}
                      className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors"
                    >
                      Accept Quote
                    </button>
                  )}
                  {quote.status === 'approved' && (
                    <Link
                      to={`/client/payments/make?quoteId=${quote.id}`}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                    >
                      Make Payment
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No quotes found for the selected filter.</p>
          <Link 
            to="/quote-request" 
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors inline-block"
          >
            Request a Quote Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuotesPage; 