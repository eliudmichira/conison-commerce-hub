import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClientData } from '../../context/ClientDataContext';
import { motion } from 'framer-motion';
import { 
  FaExclamationCircle, 
  FaCheckCircle, 
  FaReceipt, 
  FaDownload, 
  FaCreditCard,
  FaPaypal,
  FaMobile,
  FaUniversity
} from 'react-icons/fa';

const PaymentsPage = () => {
  const { payments, quotes, loading } = useClientData();
  const [filter, setFilter] = useState('all');

  const filteredPayments = filter === 'all'
    ? payments
    : payments.filter(payment => payment.status === filter);

  // Sort by date (newest first)
  const sortedPayments = [...filteredPayments].sort((a, b) =>
    new Date(b.date) - new Date(a.date)
  );

  // Get service name from quote ID
  const getServiceName = (quoteId) => {
    const quote = quotes.find(q => q.id === quoteId);
    return quote ? quote.service : 'Unknown Service';
  };

  // Get payment method icon
  const getMethodIcon = (method) => {
    switch (method) {
      case 'card':
        return <FaCreditCard className="text-blue-500" />;
      case 'paypal':
        return <FaPaypal className="text-blue-700" />;
      case 'mpesa':
      case 'mobile':
        return <FaMobile className="text-green-600" />;
      case 'bank':
        return <FaUniversity className="text-gray-600" />;
      default:
        return <FaCreditCard className="text-gray-500" />;
    }
  };

  // Format currency
  const formatCurrency = (amount, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-conison-magenta"></div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Payment History</h1>
        <p className="text-gray-600 dark:text-gray-300">
          View and manage your payment records
        </p>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`py-4 px-6 font-medium text-sm focus:outline-none whitespace-nowrap ${
                filter === 'all'
                  ? 'border-b-2 border-conison-magenta text-conison-magenta'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              All Payments ({payments.length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`py-4 px-6 font-medium text-sm focus:outline-none whitespace-nowrap ${
                filter === 'completed'
                  ? 'border-b-2 border-conison-magenta text-conison-magenta'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Completed ({payments.filter(p => p.status === 'completed').length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`py-4 px-6 font-medium text-sm focus:outline-none whitespace-nowrap ${
                filter === 'pending'
                  ? 'border-b-2 border-conison-magenta text-conison-magenta'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Pending ({payments.filter(p => p.status === 'pending').length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {sortedPayments.length > 0 ? (
            <div className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Method
                      </th>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 bg-gray-50 dark:bg-gray-700 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                        Receipt
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {sortedPayments.map(payment => (
                      <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
                          {getServiceName(payment.quoteId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                          {formatCurrency(payment.amount, payment.currency)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <span className="mr-2">{getMethodIcon(payment.method)}</span>
                            <span className="capitalize">{payment.method}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            payment.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {payment.status === 'completed' ? (
                              <div className="flex items-center">
                                <FaCheckCircle className="mr-1" />
                                <span>Completed</span>
                              </div>
                            ) : (
                              <span>Pending</span>
                            )}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {payment.status === 'completed' && (
                            <Link
                              to={`/client/payments/${payment.id}`}
                              className="text-conison-magenta hover:text-conison-cyan dark:text-conison-cyan dark:hover:text-conison-magenta flex items-center justify-end"
                            >
                              <FaReceipt className="mr-1" />
                              <span>View Receipt</span>
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <FaExclamationCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                No payments found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {filter === 'all' 
                  ? "You haven't made any payments yet." 
                  : `You don't have any ${filter} payments.`}
              </p>
              <Link
                to="/client/quotes"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-conison-magenta hover:bg-conison-cyan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-conison-yellow"
              >
                View Quotes
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Payment Summary Card */}
      {payments.length > 0 && (
        <motion.div
          className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Payment Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Total Payments</h3>
              <p className="text-2xl font-bold text-conison-magenta dark:text-conison-cyan">
                {formatCurrency(payments.reduce((sum, payment) => sum + payment.amount, 0), 'USD')}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Payment Methods</h3>
              <div className="flex space-x-4 mt-2">
                {[...new Set(payments.map(p => p.method))].map(method => (
                  <div key={method} className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="mr-1">{getMethodIcon(method)}</span>
                    <span className="text-sm capitalize">{method}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-1">Latest Payment</h3>
              <p className="text-gray-800 dark:text-white">
                {new Date(sortedPayments[0]?.date).toLocaleDateString() || 'N/A'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {getServiceName(sortedPayments[0]?.quoteId)}
              </p>
            </div>
          </div>
          
          <div className="mt-6 text-right">
            <button
              onClick={() => {
                // In a real app, this would generate and download a PDF of all payments
                alert('This would download a PDF of all your payment records in a real app.');
              }}
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-conison-magenta"
            >
              <FaDownload className="mr-2 -ml-1" />
              Export Payment History
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PaymentsPage; 