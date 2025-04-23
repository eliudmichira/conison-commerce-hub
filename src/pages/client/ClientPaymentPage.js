import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useClientData } from '../../context/ClientDataContext';
import PaymentGateway from '../../components/PaymentGateway';
import { FaArrowLeft, FaCheckCircle, FaExclamationCircle, FaFileInvoiceDollar } from 'react-icons/fa';

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
  if (!dateValue) return new Date().toLocaleDateString();
  
  try {
    // Handle Firestore Timestamp objects
    if (dateValue.seconds) {
      return new Date(dateValue.seconds * 1000).toLocaleDateString();
    }
    
    // Handle Date objects or ISO strings
    return new Date(dateValue).toLocaleDateString();
  } catch (error) {
    console.warn("Error formatting date:", error);
    return new Date().toLocaleDateString();
  }
};

const ClientPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { quotes, addPayment } = useClientData();
  const [quote, setQuote] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

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

  useEffect(() => {
    if (quote && quote.status !== 'approved') {
      setError('This quote is not approved for payment. Please contact support if you believe this is an error.');
    }
  }, [quote]);

  const handlePaymentSuccess = async (paymentData) => {
    try {
      // Validate payment data
      if (!paymentData || !paymentData.transactionId || !paymentData.amount) {
        throw new Error('Invalid payment data received');
      }

      // Augment payment data with quote ID and additional details
      const fullPaymentData = {
        ...paymentData,
        quoteId: quote.id,
        status: 'completed',
        date: new Date().toISOString(),
        service: quote.service,
        customerEmail: quote.contactEmail || '',
        customerName: quote.contactName || ''
      };
      
      // Add payment to the system
      await addPayment(fullPaymentData);
      
      // Store payment receipt URL in localStorage for receipt page
      if (paymentData.receiptUrl) {
        localStorage.setItem(`payment_receipt_${paymentData.transactionId}`, paymentData.receiptUrl);
      }
      
      // Update status in URL for a clean way to show success state
      navigate(`/client/payments/make?quoteId=${quote.id}&status=success&transactionId=${paymentData.transactionId}`);
    } catch (error) {
      console.error('Error registering payment:', error);
      setError(error.message || 'There was an error processing your payment. Please try again.');
      // Make sure the user can try again
      setIsProcessingPayment(false);
    }
  };

  const handlePaymentCancel = () => {
    // Navigate back to the quotes page
    navigate('/client/quotes');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
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
              <FaFileInvoiceDollar className="h-6 w-6 text-red-600 mr-2" />
              <h3 className="font-medium text-gray-800 dark:text-white">Payment Details</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="text-gray-500 dark:text-gray-400">Service:</div>
              <div className="text-gray-800 dark:text-white font-medium">{quote?.service}</div>
              
              <div className="text-gray-500 dark:text-gray-400">Amount:</div>
              <div className="text-gray-800 dark:text-white font-medium">{safeFormatCurrency(quote?.amount)}</div>
              
              <div className="text-gray-500 dark:text-gray-400">Date:</div>
              <div className="text-gray-800 dark:text-white font-medium">
                {safeFormatDate(quote?.date)}
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
              className="bg-gradient-to-r from-red-600 to-blue-600 text-white font-medium py-2 px-6 rounded-md hover:from-red-700 hover:to-blue-700 transition"
            >
              Go to Dashboard
            </Link>
            <Link
              to="/client/projects"
              className="bg-white text-red-600 border border-red-600 font-medium py-2 px-6 rounded-md hover:bg-gray-50 transition"
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
            className="inline-flex items-center bg-gradient-to-r from-red-600 to-blue-600 text-white font-medium py-2 px-6 rounded-md hover:from-red-700 hover:to-blue-700 transition"
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
      {isProcessingPayment && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-800 dark:text-white font-medium">Processing your payment...</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">Please do not close this window.</p>
          </div>
        </div>
      )}
      
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
              onProcessingChange={setIsProcessingPayment}
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
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Service</span>
                <span className="text-gray-800 dark:text-white font-medium">{quote?.service}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Quote ID</span>
                <span className="text-gray-800 dark:text-white font-medium">#{quote?.id?.substring(0, 8)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-800 dark:text-white font-medium">{safeFormatCurrency(quote?.amount)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="text-gray-800 dark:text-white font-medium">$0.00</span>
              </div>
              <div className="flex justify-between py-4 font-bold">
                <span className="text-gray-800 dark:text-white">Total</span>
                <span className="text-red-600 dark:text-blue-400 text-xl">{safeFormatCurrency(quote?.amount)}</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-800 dark:text-white mb-2">Payment Security</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your payment information is processed securely. We do not store credit card details nor do we share customer details with third parties.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientPaymentPage;