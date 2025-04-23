import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaFileInvoiceDollar, FaUserClock, FaExclamationTriangle, FaProjectDiagram, FaCreditCard, FaMoneyBillWave } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useClientData } from '../../context/ClientDataContext';
// Will be used for future client actions
// import { createQuote, createProject, createPayment } from '../../api/clientApi';

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

// Helper function to safely format numbers
const safeFormatNumber = (value) => {
  if (value === undefined || value === null) return "0";
  
  try {
    // Ensure value is a valid number
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return "0";
    
    return numValue.toLocaleString();
  } catch (error) {
    console.warn("Error formatting number:", error);
    return "0";
  }
};

const Dashboard = () => {
  const { currentUser, userData } = useAuth();
  const { quotes, projects, payments, loading, error, refreshData } = useClientData();
  const [stats, setStats] = useState({
    totalQuotes: 0,
    activeProjects: 0,
    totalPaid: 0,
    pendingPayments: 0,
  });

  // Calculate dashboard statistics from real data
  useEffect(() => {
    if (!loading) {
      const activeProjects = projects.filter(p => p.status !== 'completed').length;
      const pendingQuotes = quotes.filter(q => q.status === 'pending').length;
      
      // Calculate total paid amount
      const totalPaid = payments.reduce((sum, payment) => {
        return payment.status === 'completed' ? sum + payment.amount : sum;
      }, 0);
      
      // Calculate pending payment amount (from approved quotes)
      const pendingPayments = quotes.reduce((sum, quote) => {
        if (quote.status === 'approved') {
          // Calculate what's already been paid for this quote
          const paidForQuote = payments.reduce((paid, payment) => {
            return payment.quoteId === quote.id && payment.status === 'completed' 
              ? paid + payment.amount 
              : paid;
          }, 0);
          
          // Add remaining amount to pending total
          return sum + (quote.amount - paidForQuote);
        }
        return sum;
      }, 0);
      
      setStats({
        totalQuotes: quotes.length,
        activeProjects,
        totalPaid,
        pendingPayments,
      });
    }
  }, [quotes, projects, payments, loading]);

  // Get recent activity (newest items first)
  const getRecentActivity = () => {
    if (loading) return [];
    
    const allActivities = [
      ...quotes.map(quote => ({
        type: 'quote',
        id: quote.id,
        title: `Quote for ${quote.service}`,
        date: quote.createdAt || quote.updatedAt,
        status: quote.status,
        amount: quote.amount || 0 // Ensure amount is not undefined
      })),
      ...payments.map(payment => ({
        type: 'payment',
        id: payment.id,
        title: `Payment for ${quotes.find(q => q.id === payment.quoteId)?.service || 'Service'}`,
        date: payment.date,
        status: payment.status,
        amount: payment.amount || 0 // Ensure amount is not undefined
      })),
      ...projects.map(project => ({
        type: 'project',
        id: project.id,
        title: project.name,
        date: project.startDate,
        status: project.status,
        progress: project.progress || 0 // Ensure progress is not undefined
      }))
    ];
    
    // Sort by date (newest first) and take the first 5
    return allActivities
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-conison-magenta mx-auto"></div>
        <p className="mt-4 text-conison-magenta">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <FaExclamationTriangle className="mr-2" />
            <h3 className="font-bold">Error Loading Data</h3>
          </div>
          <p className="mb-2">{error}</p>
          <button 
            onClick={refreshData}
            className="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 px-4 py-2 rounded-md text-sm font-medium"
          >
            Try Again
          </button>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Welcome, {userData?.name || currentUser?.displayName || 'Client'}</h1>
          <p>Your dashboard is unavailable at the moment. Please try again later or contact support.</p>
        </div>
      </div>
    );
  }

  const recentActivity = getRecentActivity();
  const hasNoData = quotes.length === 0 && projects.length === 0 && payments.length === 0;

  // Add a section to display quote requests in the dashboard
  const renderQuoteRequestsSection = () => {
    // Filter to show only quotes
    const clientQuotes = quotes.filter(item => item.type === 'quote' || !item.type);
    
    if (clientQuotes.length === 0) {
      return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Your Quote Requests</h2>
          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-4 rounded-lg">
            <p className="font-medium">You haven't submitted any quote requests yet.</p>
            <Link 
              to="/quote-request" 
              className="mt-3 inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Request a quote now
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      );
    }
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Your Quote Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Reference</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Service</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Budget</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {clientQuotes.map((quote, index) => (
                <tr key={quote.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{quote.referenceNumber || 'CQ-000'}</div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{quote.serviceCategory || quote.service || 'Service'}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{quote.serviceType || ''}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{quote.estimatedBudget || '$0 - $0'}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {quote.createdAt ? new Date(quote.createdAt.seconds * 1000).toLocaleDateString() : 'Unknown date'}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      quote.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      quote.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      quote.status === 'converted' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                      'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                    }`}>
                      {quote.status ? quote.status.charAt(0).toUpperCase() + quote.status.slice(1) : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <Link 
            to="/quote-request" 
            className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            New Quote Request
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome, {userData?.name || currentUser?.displayName || 'Client'}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's an overview of your projects and services
        </p>
      </div>

      {hasNoData && (
        <div className="flex flex-col space-y-4 mb-8">
          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 p-4 rounded-lg">
            <p className="font-medium">You don't have any data yet.</p>
            <p className="text-sm mt-1">Start by requesting a quote or exploring our services.</p>
          </div>
          <Link
            to="/quote-request"
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-200 text-center"
          >
            Request a Quote
          </Link>
        </div>
      )}

      {/* Stats cards */}
      {!hasNoData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400">Total Quotes</h3>
              <FaFileInvoiceDollar className="text-purple-500 text-xl" />
            </div>
            <p className="text-2xl font-bold">{stats.totalQuotes}</p>
            <div className="mt-2">
              <Link to="/client/quotes" className="text-purple-500 text-sm hover:underline">
                View all quotes
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400">Active Projects</h3>
              <FaProjectDiagram className="text-blue-500 text-xl" />
            </div>
            <p className="text-2xl font-bold">{stats.activeProjects}</p>
            <div className="mt-2">
              <Link to="/client/projects" className="text-blue-500 text-sm hover:underline">
                View active projects
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-600 dark:text-gray-400">Total Paid</h3>
              <FaMoneyBillWave className="text-green-500 text-xl" />
            </div>
            <p className="text-2xl font-bold">{safeFormatCurrency(stats.totalPaid)}</p>
            <div className="mt-2">
              <Link to="/client/payments" className="text-green-500 text-sm hover:underline">
                View payment history
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Quote Requests - New Section */}
      {renderQuoteRequestsSection()}
      
      {/* Recent Activity */}
      {!hasNoData && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentActivity.map((activity) => (
                <div key={`${activity.type}-${activity.id}`} className="py-4">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{activity.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(activity.date || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      {activity.type === 'project' ? (
                        <div>
                          <span 
                            className={`text-sm px-2 py-1 rounded-full ${
                              activity.status === 'completed' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            }`}
                          >
                            {activity.status === 'in_progress' ? 'In Progress' : activity.status || 'Unknown'}
                          </span>
                          <p className="text-sm mt-1">{safeFormatNumber(activity.progress)}% complete</p>
                        </div>
                      ) : activity.type === 'payment' ? (
                        <div>
                          <span 
                            className={`text-sm px-2 py-1 rounded-full ${
                              activity.status === 'completed' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}
                          >
                            {activity.status || 'Pending'}
                          </span>
                          <p className="text-sm mt-1">{safeFormatCurrency(activity.amount)}</p>
                        </div>
                      ) : (
                        <div>
                          <span 
                            className={`text-sm px-2 py-1 rounded-full ${
                              activity.status === 'approved' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                : activity.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            }`}
                          >
                            {activity.status || 'Pending'}
                          </span>
                          <p className="text-sm mt-1">{safeFormatCurrency(activity.amount)}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No recent activity found.</p>
          )}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/quote-request" 
            className="block p-4 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg text-center hover:bg-purple-200 dark:hover:bg-purple-800 transition duration-200"
          >
            Request a New Quote
          </Link>
          <Link 
            to="/client/payments/make" 
            className="block p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-center hover:bg-green-200 dark:hover:bg-green-800 transition duration-200"
          >
            Make a Payment
          </Link>
          <Link 
            to="/contact" 
            className="block p-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-center hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-200"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 