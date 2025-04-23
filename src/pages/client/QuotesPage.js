import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClientData } from '../../context/ClientDataContext';
import { FaCheck, FaHourglassHalf, FaTimesCircle, FaFileDownload } from 'react-icons/fa';

// Helper function to safely format currency values
const safeFormatCurrency = (value) => {
  if (value === undefined || value === null) return "$0.00";
  
  try {
    // Ensure value is a valid number
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "$0.00";
    
    return numValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  } catch (error) {
    console.warn("Error formatting currency:", error);
    return "$0.00";
  }
};

// Helper function to safely format dates
const safeFormatDate = (dateValue) => {
  if (!dateValue) return "Unknown date";
  
  try {
    // Handle Firestore Timestamp objects
    if (dateValue.seconds) {
      return new Date(dateValue.seconds * 1000).toLocaleDateString();
    }
    
    // Handle Date objects or ISO strings
    return new Date(dateValue).toLocaleDateString();
  } catch (error) {
    console.warn("Error formatting date:", error);
    return "Unknown date";
  }
};

const QuotesPage = () => {
  const { quotes, loading, error, refreshData } = useClientData();
  const [selectedStatus, setSelectedStatus] = useState('all');

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg">
          <h3 className="font-bold">Error</h3>
          <p>{error}</p>
          <button 
            onClick={refreshData}
            className="mt-2 bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-200 px-4 py-2 rounded-md text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const filteredQuotes = selectedStatus === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.status === selectedStatus);

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Your Quotes</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your quote requests
        </p>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedStatus === 'all' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setSelectedStatus('pending')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedStatus === 'pending' 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setSelectedStatus('approved')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedStatus === 'approved' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setSelectedStatus('rejected')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              selectedStatus === 'rejected' 
                ? 'bg-red-600 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      {filteredQuotes.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            {selectedStatus === 'all' 
              ? "You don't have any quotes yet." 
              : `You don't have any ${selectedStatus} quotes.`}
          </p>
          <Link 
            to="/quote-request" 
            className="mt-4 inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Request a Quote
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuotes.map(quote => (
            <div key={quote.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between mb-2">
                  <h3 className="text-lg font-semibold truncate">
                    {quote.service || 'Service Quote'}
                  </h3>
                  <span 
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      quote.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                        : quote.status === 'approved'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {quote.status === 'pending' ? (
                      <><FaHourglassHalf className="mr-1" /> Pending</>
                    ) : quote.status === 'approved' ? (
                      <><FaCheck className="mr-1" /> Approved</>
                    ) : (
                      <><FaTimesCircle className="mr-1" /> Rejected</>
                    )}
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {quote.description || quote.serviceType || 'No description provided'}
                </p>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <span>Amount: {safeFormatCurrency(quote.amount)}</span>
                  <span>Date: {safeFormatDate(quote.createdAt)}</span>
                </div>
                <div className="flex justify-between items-center">
                  {quote.status === 'approved' ? (
                    <Link 
                      to={`/client/payments/make?quoteId=${quote.id}`}
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm transition-colors"
                    >
                      Make Payment
                    </Link>
                  ) : quote.status === 'pending' ? (
                    <span className="text-sm text-yellow-600 dark:text-yellow-400">
                      Awaiting review
                    </span>
                  ) : (
                    <span className="text-sm text-red-600 dark:text-red-400">
                      Not available for payment
                    </span>
                  )}
                  
                  <button 
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    title="Download quote details"
                  >
                    <FaFileDownload />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 text-center">
        <Link 
          to="/quote-request" 
          className="bg-purple-600 text-white py-2 px-6 rounded-md hover:bg-purple-700 transition-colors"
        >
          Request a New Quote
        </Link>
      </div>
    </div>
  );
};

export default QuotesPage; 