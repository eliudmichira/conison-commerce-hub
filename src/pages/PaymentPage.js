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

  useEffect(() => {
    // Check for payment status in URL parameters
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    const error = params.get('error');

    if (status === 'success') {
      setPaymentStatus('success');
      // Clear quote data from localStorage after successful payment
      localStorage.removeItem('quoteData');
    } else if (status === 'failed' || error) {
      setPaymentStatus('failed');
    }

    // Get quote data from localStorage
    const storedQuoteData = localStorage.getItem('quoteData');
    if (storedQuoteData) {
      setQuoteData(JSON.parse(storedQuoteData));
    } else {
      // Redirect to quote request if no data is found
      navigate('/quote-request');
    }
  }, [location, navigate]);

  const handlePaymentSuccess = (paymentData) => {
    console.log('Payment successful:', paymentData);
    
    // Store payment info in localStorage for receipt
    localStorage.setItem('paymentData', JSON.stringify(paymentData));
    
    // Redirect to success page
    navigate('/payment?status=success');
  };

  const handlePaymentCancel = () => {
    // Redirect back to quote page or home
    navigate('/quote-request');
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
            <p>There was an issue processing your payment. Please try again.</p>
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
            />
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentPage; 