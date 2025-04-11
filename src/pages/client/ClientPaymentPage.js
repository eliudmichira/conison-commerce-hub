import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useClientData } from '../../context/ClientDataContext';
import PaymentGateway from '../../components/PaymentGateway';
import { FaArrowLeft, FaCheckCircle, FaExclamationCircle, FaFileInvoiceDollar } from 'react-icons/fa';

const ClientPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quotes, payments, addPayment } = useClientData();
  const [quote, setQuote] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Parse query parameters to get the quote ID
    const queryParams = new URLSearchParams(location.search);
    const quoteId = queryParams.get('quoteId');
    const status = queryParams.get('status');
    
    // Set payment status if present in URL
    if (status) {
      setPaymentStatus(status);
    }
    
    // Find the quote by ID
    if (quoteId) {
      const foundQuote = quotes.find(q => q.id === quoteId);
      if (foundQuote) {
        setQuote(foundQuote);
      } else {
        setError('Quote not found. Please select a valid quote to make a payment.');
      }
    } else {
      setError('No quote selected. Please select a quote to make a payment.');
    }
    
    setLoading(false);
  }, [location.search, quotes]);

  const handlePaymentSuccess = async (paymentData) => {
    // Augment payment data with quote ID
    const fullPaymentData = {
      ...paymentData,
      quoteId: quote.id,
      status: 'completed',
      date: new Date().toISOString()
    };
    
    try {
      // Add payment to the system
      await addPayment(fullPaymentData);
      
      // Update status in URL for a clean way to show success state
      navigate(`/client/payments/make?quoteId=${quote.id}&status=success`);
    } catch (error) {
      console.error('Error registering payment:', error);
      setError('There was an error processing your payment. Please try again.');
    }
  };

  const handlePaymentCancel = () => {
    // Navigate back to the quotes page
    navigate('/client/quotes');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-conison-magenta"></div>
      </div>
    );
  }

  // Show success state
  if (paymentStatus === 'success') {
    return (
      <div className="pb-12">
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <FaCheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            Thank you for your payment. Your project will begin shortly and our team will be in touch with next steps.
          </p>
          <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg mb-8 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-4">
              <FaFileInvoiceDollar className="h-6 w-6 text-conison-magenta mr-2" />
              <h3 className="font-medium text-gray-800 dark:text-white">Payment Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="text-gray-500 dark:text-gray-400">Service:</div>
              <div className="text-gray-800 dark:text-white font-medium">{quote?.service}</div>
              
              <div className="text-gray-500 dark:text-gray-400">Amount:</div>
              <div className="text-gray-800 dark:text-white font-medium">${quote?.amount}</div>
              
              <div className="text-gray-500 dark:text-gray-400">Date:</div>
              <div className="text-gray-800 dark:text-white font-medium">
                {new Date().toLocaleDateString()}
              </div>
              
              <div className="text-gray-500 dark:text-gray-400">Reference:</div>
              <div className="text-gray-800 dark:text-white font-medium">
                {`INV-${Math.floor(1000 + Math.random() * 9000)}`}
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <Link
              to="/client"
              className="bg-conison-magenta text-white font-medium py-2 px-6 rounded-md hover:bg-conison-cyan transition"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/client/projects"
              className="bg-white text-conison-magenta border border-conison-magenta font-medium py-2 px-6 rounded-md hover:bg-gray-50 transition"
            >
              View Projects
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="pb-12">
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
            <FaExclamationCircle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            {error}
          </p>
          <Link
            to="/client/quotes"
            className="inline-flex items-center bg-conison-magenta text-white font-medium py-2 px-6 rounded-md hover:bg-conison-cyan transition"
          >
            <FaArrowLeft className="mr-2" />
            Back to Quotes
          </Link>
        </motion.div>
      </div>
    );
  }

  // Normal payment flow
  return (
    <div className="pb-12">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <Link to="/client/quotes" className="mr-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
            <FaArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              Payment for {quote?.service}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Complete your payment to begin your project
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-6">Payment Method</h2>
            <PaymentGateway
              amount={quote?.amount}
              currency="USD"
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Service:</span>
                <span className="text-gray-800 dark:text-white font-medium">{quote?.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Description:</span>
                <span className="text-gray-800 dark:text-white text-right">{quote?.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Quote ID:</span>
                <span className="text-gray-800 dark:text-white font-medium">{quote?.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Quote Date:</span>
                <span className="text-gray-800 dark:text-white font-medium">
                  {quote && (quote.createdAt || quote.updatedAt) ? new Date(quote.createdAt || quote.updatedAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
              <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 dark:text-white font-medium">Total Amount:</span>
                  <span className="text-xl text-conison-magenta dark:text-conison-cyan font-bold">
                    ${quote?.amount ? quote.amount.toLocaleString() : '0'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mt-6">
            <h3 className="font-medium text-gray-800 dark:text-white mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              If you have any questions or need assistance with your payment, please contact our support team.
            </p>
            <Link
              to="/contact"
              className="text-sm text-conison-magenta hover:text-conison-cyan dark:text-conison-cyan dark:hover:text-conison-magenta font-medium focus:outline-none"
            >
              Contact Support →
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientPaymentPage;