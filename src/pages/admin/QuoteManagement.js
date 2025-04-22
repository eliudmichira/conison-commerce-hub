import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc, query, orderBy, where, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { FaFilter, FaSearch, FaFileAlt, FaCheck, FaTimes, FaEye, FaBell, FaExternalLinkAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';

const QuoteManagement = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [newQuotesCount, setNewQuotesCount] = useState(0);
  const [showNotificationBadge, setShowNotificationBadge] = useState(false);
  const [detailViewQuote, setDetailViewQuote] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setLoading(true);
        const quotesQuery = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(quotesQuery);
        
        const quotesData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.() || new Date(),
          formattedDate: doc.data().createdAt?.toDate?.().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          }) || new Date().toLocaleDateString()
        }));
        
        setQuotes(quotesData);
        setFilteredQuotes(quotesData);
        
        // Check for new quotes (less than 24 hours old)
        const twentyFourHoursAgo = new Date();
        twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
        
        const newQuotes = quotesData.filter(
          quote => quote.createdAt > twentyFourHoursAgo && quote.status === 'pending'
        );
        
        setNewQuotesCount(newQuotes.length);
        setShowNotificationBadge(newQuotes.length > 0);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching quotes:', err);
        setError('Failed to load quotes. Please try again.');
        setLoading(false);
      }
    };

    fetchQuotes();
    
    // Set up interval to check for new quotes (every 5 minutes)
    const interval = setInterval(fetchQuotes, 5 * 60 * 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Apply filters when status filter or search term changes
    let result = quotes;
    
    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(quote => quote.status === statusFilter);
    }
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(quote => 
        (quote.contactName && quote.contactName.toLowerCase().includes(term)) ||
        (quote.contactEmail && quote.contactEmail.toLowerCase().includes(term)) ||
        (quote.service && quote.service.toLowerCase().includes(term)) ||
        (quote.serviceCategory && quote.serviceCategory.toLowerCase().includes(term)) ||
        (quote.serviceType && quote.serviceType.toLowerCase().includes(term)) ||
        (quote.referenceNumber && quote.referenceNumber.toLowerCase().includes(term)) ||
        (quote.id && quote.id.toLowerCase().includes(term))
      );
    }
    
    setFilteredQuotes(result);
  }, [statusFilter, searchTerm, quotes]);

  const handleStatusChange = async (quoteId, newStatus) => {
    try {
      const quoteRef = doc(db, 'quotes', quoteId);
      await updateDoc(quoteRef, { 
        status: newStatus,
        updatedAt: new Date()
      });
      
      // Update local state
      setQuotes(prevQuotes => 
        prevQuotes.map(quote => 
          quote.id === quoteId ? { ...quote, status: newStatus } : quote
        )
      );
      
      // Also update filtered quotes
      setFilteredQuotes(prevQuotes => 
        prevQuotes.map(quote => 
          quote.id === quoteId ? { ...quote, status: newStatus } : quote
        )
      );
      
      // Close detail view if open
      if (detailViewQuote && detailViewQuote.id === quoteId) {
        setDetailViewQuote({...detailViewQuote, status: newStatus});
      }
      
      // Show success message
      toast.success(`Quote status updated to ${newStatus}`);
    } catch (err) {
      console.error('Error updating quote status:', err);
      setError('Failed to update quote status. Please try again.');
      toast.error('Failed to update quote status');
    }
  };

  const viewQuoteDetails = (quote) => {
    setDetailViewQuote(quote);
    setShowDetailView(true);
  };

  const closeDetailView = () => {
    setShowDetailView(false);
    setDetailViewQuote(null);
  };

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Extract budget range numbers
  const extractBudgetRange = (budgetString) => {
    if (!budgetString) return { min: 0, max: 0 };
    
    const matches = budgetString.match(/\$(\d+)\s*-\s*\$(\d+)/);
    if (matches && matches.length >= 3) {
      return {
        min: parseInt(matches[1], 10),
        max: parseInt(matches[2], 10)
      };
    }
    
    return { min: 0, max: 0 };
  };

  // Create project from quote
  const createProject = (quoteId) => {
    // Navigate to project creation page with quote ID
    navigate(`/admin/projects/new?quoteId=${quoteId}`);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2 flex items-center">
            Quote Management
            {showNotificationBadge && (
              <span className="relative ml-2">
                <FaBell className="text-yellow-500" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {newQuotesCount}
                </span>
              </span>
            )}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Manage quote requests and convert them to projects</p>
      </div>
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search quotes..."
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-400" />
            </div>
            <select
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg appearance-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="converted">Converted to Project</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Quotes</p>
          <p className="text-2xl font-bold">{quotes.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending Quotes</p>
          <p className="text-2xl font-bold text-yellow-500">{quotes.filter(q => q.status === 'pending').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Approved Quotes</p>
          <p className="text-2xl font-bold text-green-500">{quotes.filter(q => q.status === 'approved').length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Converted to Projects</p>
          <p className="text-2xl font-bold text-purple-500">{quotes.filter(q => q.status === 'converted').length}</p>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reference</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No quotes found matching your criteria
                    </td>
                </tr>
              ) : (
                filteredQuotes.map(quote => {
                  // Determine if this is a new quote (less than 24 hours old)
                  const twentyFourHoursAgo = new Date();
                  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
                  const isNew = quote.createdAt > twentyFourHoursAgo && quote.status === 'pending';
                  
                  return (
                    <tr key={quote.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 ${isNew ? 'bg-yellow-50 dark:bg-yellow-900/10' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaFileAlt className={`mr-2 ${isNew ? 'text-yellow-500' : 'text-gray-400'}`} />
                      <div>
                            <div className="font-medium text-gray-900 dark:text-white">{quote.referenceNumber || 'N/A'}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{quote.contactName || 'Unknown'}</div>
                          </div>
                          {isNew && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              New
                            </span>
                          )}
                      </div>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{quote.serviceCategory || 'N/A'}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{quote.serviceType || 'N/A'}</div>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{quote.estimatedBudget || 'N/A'}</div>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{quote.formattedDate}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                          quote.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                          quote.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                          quote.status === 'converted' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                        }`}>
                          {quote.status?.charAt(0).toUpperCase() + quote.status?.slice(1) || 'Unknown'}
                      </span>
                    </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => viewQuoteDetails(quote)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                        >
                          <FaEye className="inline mr-1" /> View
                        </button>
                        
                        {quote.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusChange(quote.id, 'approved')}
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 mr-3"
                            >
                              <FaCheck className="inline mr-1" /> Approve
                            </button>
                            <button
                              onClick={() => handleStatusChange(quote.id, 'rejected')}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <FaTimes className="inline mr-1" /> Reject
                            </button>
                          </>
                        )}
                        
                        {quote.status === 'approved' && (
                          <button
                            onClick={() => createProject(quote.id)}
                            className="text-purple-600 hover:text-purple-900 dark:text-purple-400 dark:hover:text-purple-300"
                          >
                            <FaExternalLinkAlt className="inline mr-1" /> Create Project
                          </button>
                        )}
                    </td>
                  </tr>
                  );
                })
              )}
              </tbody>
            </table>
          </div>
      </div>
      
      {/* Detail View Modal */}
      {showDetailView && detailViewQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Quote Details</h2>
              <button
                onClick={closeDetailView}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Quote Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Reference Number</p>
                      <p className="font-medium text-gray-900 dark:text-white">{detailViewQuote.referenceNumber || 'N/A'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                      <p>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          detailViewQuote.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          detailViewQuote.status === 'approved' ? 'bg-green-100 text-green-800' :
                          detailViewQuote.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          detailViewQuote.status === 'converted' ? 'bg-purple-100 text-purple-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {detailViewQuote.status?.charAt(0).toUpperCase() + detailViewQuote.status?.slice(1) || 'Unknown'}
                        </span>
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Submission Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">{detailViewQuote.formattedDate}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Service Category</p>
                      <p className="font-medium text-gray-900 dark:text-white">{detailViewQuote.serviceCategory || 'N/A'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Service Type</p>
                      <p className="font-medium text-gray-900 dark:text-white">{detailViewQuote.serviceType || 'N/A'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Budget Range</p>
                      <p className="font-medium text-gray-900 dark:text-white">{detailViewQuote.estimatedBudget || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Client Information</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                      <p className="font-medium text-gray-900 dark:text-white">{detailViewQuote.contactName || 'N/A'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium text-gray-900 dark:text-white">{detailViewQuote.contactEmail || detailViewQuote.email || 'N/A'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-medium text-gray-900 dark:text-white">{detailViewQuote.phone || 'N/A'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Company</p>
                      <p className="font-medium text-gray-900 dark:text-white">{detailViewQuote.company || 'N/A'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">User ID</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {detailViewQuote.userId !== 'anonymous' ? detailViewQuote.userId : 'Anonymous User'}
                        {detailViewQuote.isAnonymous && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Anonymous
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Details</h3>
                
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Project Description</p>
                    <p className="font-medium text-gray-900 dark:text-white whitespace-pre-line">
                      {detailViewQuote.projectDescription || 'No description provided'}
                    </p>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Project Timeline</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {detailViewQuote.timeline || 'No timeline specified'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Additional Requirements</p>
                    <p className="font-medium text-gray-900 dark:text-white whitespace-pre-line">
                      {detailViewQuote.additionalRequirements || 'No additional requirements'}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="mt-8 flex flex-wrap justify-end space-x-4">
                {detailViewQuote.status === 'pending' && (
                  <>
                    <button
                      onClick={() => {
                        handleStatusChange(detailViewQuote.id, 'approved');
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <FaCheck className="inline mr-2" /> Approve Quote
                    </button>
                    <button
                      onClick={() => {
                        handleStatusChange(detailViewQuote.id, 'rejected');
                      }}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <FaTimes className="inline mr-2" /> Reject Quote
                    </button>
                  </>
                )}
                
                {detailViewQuote.status === 'approved' && (
                  <button
                    onClick={() => {
                      createProject(detailViewQuote.id);
                    }}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <FaExternalLinkAlt className="inline mr-2" /> Create Project
                  </button>
                )}
                
                <button
                  onClick={closeDetailView}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          </div>
        )}
    </div>
  );
};

export default QuoteManagement; 