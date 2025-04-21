import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import PaymentGateway from '../components/PaymentGateway';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [quoteData, setQuoteData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for payment status in URL parameters
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    const errorParam = params.get('error');

    if (status === 'success') {
      setPaymentStatus('success');
      // Clear quote data from localStorage after successful payment
      localStorage.removeItem('quoteData');
    } else if (status === 'failed' || errorParam) {
      setPaymentStatus('failed');
      if (errorParam) {
        setError(decodeURIComponent(errorParam));
      }
    }

    // Get quote data from localStorage
    try {
      const storedQuoteData = localStorage.getItem('quoteData');
      if (storedQuoteData) {
        setQuoteData(JSON.parse(storedQuoteData));
      } else {
        // Redirect to quote request if no data is found
        navigate('/quote-request');
      }
    } catch (err) {
      console.error('Error loading quote data:', err);
      setError('Could not load quote data. Please try again.');
    }
  }, [location, navigate]);

  const handlePaymentSuccess = (paymentData) => {
    try {
      console.log('Payment successful:', paymentData);
      
      // Store payment info in localStorage for receipt
      localStorage.setItem('paymentData', JSON.stringify(paymentData));
      
      // Redirect to success page
      navigate('/payment?status=success');
    } catch (err) {
      console.error('Error handling payment success:', err);
      setError('Payment was processed but we encountered an error. Please contact support.');
      navigate('/payment?status=failed&error=' + encodeURIComponent('Payment processing error'));
    }
  };

  const handlePaymentCancel = () => {
    // Redirect back to quote page or home
    navigate('/quote-request');
  };

  const handleProcessingChange = (isProcessing) => {
    setIsProcessing(isProcessing);
  };

  if (!quoteData) {
    return null;
  }

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Payment Details</h1>
          <p className="text-lg">Please review your order and proceed with payment</p>
        </div>

        {isProcessing && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-conison-magenta mx-auto mb-4"></div>
              <p className="text-gray-800 font-medium">Processing your payment...</p>
              <p className="text-gray-600 text-sm mt-2">Please do not close this window.</p>
            </div>
          </div>
        )}

        {paymentStatus === 'success' ? (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-8">
            <strong className="font-bold">Payment Successful!</strong>
            <p>Thank you for your payment. Your order has been confirmed.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-conison-magenta text-white px-4 py-2 rounded hover:bg-conison-cyan"
            >
              Return to Home
            </button>
          </div>
        ) : paymentStatus === 'failed' ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8">
            <strong className="font-bold">Payment Failed</strong>
            <p>{error || 'There was an issue processing your payment. Please try again.'}</p>
            <button
              onClick={() => setPaymentStatus(null)}
              className="mt-4 bg-conison-magenta text-white px-4 py-2 rounded hover:bg-conison-cyan"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className={`bg-white shadow rounded-lg p-6 mb-8 ${isDarkMode ? 'bg-gray-800' : ''}`}>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span>{quoteData.service}</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantity:</span>
                  <span>{quoteData.quantity || 1}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Amount:</span>
                  <span>${quoteData.totalAmount || quoteData.amount || 100}</span>
                </div>
              </div>
            </div>

            <PaymentGateway 
              amount={quoteData.totalAmount || quoteData.amount || 100} 
              currency="USD"
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
              onProcessingChange={handleProcessingChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage; 