// components/PaymentGateway.js
import React, { useState, useEffect } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useDarkMode } from '../context/DarkModeContext';

// Paystack test key
const PAYSTACK_PUBLIC_KEY = 'pk_test_aca08eaa627315e72234220e37729c6660057210';

// Helper function to format currency values
const formatCurrency = (value, currencyCode = 'USD') => {
  try {
    // Ensure value is a valid number
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return `${currencyCode || 'USD'} 0.00`;
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode || 'USD'
    }).format(numValue);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${currencyCode || 'USD'} ${(parseFloat(value) || 0).toFixed(2)}`;
  }
};

// Paystack Form Component
const PaystackForm = ({ amount, currency, onSuccess, onError, onLoadingChange }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [initializationFailed, setInitializationFailed] = useState(false);

  // Effect to propagate loading state changes to parent
  useEffect(() => {
    if (typeof onLoadingChange === 'function') {
      onLoadingChange(loading);
    }
  }, [loading, onLoadingChange]);

  // Convert amount to the smallest currency unit (kobo for NGN, cents for USD)
  // Paystack requires amount in the smallest currency unit
  const paystackAmount = Math.round(parseFloat(amount || 0) * 100);

  // Safe config to avoid initialization errors
  const config = {
    reference: (new Date()).getTime().toString(),
    email: email || 'customer@example.com', // Provide fallback email
    amount: paystackAmount,
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: currency || 'USD',
    firstname: name ? name.split(' ')[0] : '',
    lastname: name ? name.split(' ').slice(1).join(' ') : '',
    phone: phone || '',
    // Optional metadata
    metadata: {
      custom_fields: [
        {
          display_name: "Full Name",
          variable_name: "full_name",
          value: name || ''
        },
        {
          display_name: "Mobile Number",
          variable_name: "mobile_number",
          value: phone || ''
        }
      ]
    }
  };

  // Initialize Paystack - must be at top level
  const initializePayment = usePaystackPayment(config);

  // Check if initialization was successful
  useEffect(() => {
    if (initializePayment === null || initializePayment === undefined) {
      console.error("Paystack initialization failed");
      setInitializationFailed(true);
      if (onError) {
        onError({ message: "Payment system unavailable" });
      }
    }
  }, [initializePayment, onError]);

  // Paystack callback functions
  const onClose = () => {
    setLoading(false);
    // Handle case when user closes payment modal
    setErrorMessage("Payment cancelled. Please try again.");
    if (onError) onError({ message: "Payment cancelled" });
  };

  const onPaystackSuccess = (reference) => {
    setLoading(false);
    // Handle successful payment
    if (onSuccess) {
      onSuccess({
        transactionId: reference.reference,
        method: 'paystack',
        amount,
        currency,
        reference: reference
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Form validation
    if (!email) {
      setErrorMessage('Email is required');
      return;
    }
    
    if (!name) {
      setErrorMessage('Name is required');
      return;
    }
    
    // Check if initialization failed or if initializePayment is not a function
    if (initializationFailed || typeof initializePayment !== 'function') {
      setErrorMessage("Payment system is currently unavailable. Please try again later.");
      if (onError) {
        onError({ message: "Payment system initialization failed" });
      }
      return;
    }
    
    setLoading(true);
    setErrorMessage('');
    
    try {
      // Initialize Paystack payment with a timeout for safety
      const paymentInitiated = initializePayment(onPaystackSuccess, onClose);
      
      // If payment didn't start properly
      if (paymentInitiated === false) {
        throw new Error("Payment didn't initialize properly");
      }
    } catch (error) {
      console.error("Error initializing payment:", error);
      setLoading(false);
      setErrorMessage("Could not initialize payment. Please try again.");
      if (onError) {
        onError({ message: "Payment initialization failed" });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
          placeholder="John Doe"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
          placeholder="email@example.com"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
          placeholder="+1234567890"
          required
        />
      </div>
      
      {errorMessage && (
        <div className="text-red-600 text-sm mt-2 mb-4">
          {errorMessage}
        </div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-green-600 text-white py-3 px-8 rounded-lg shadow hover:bg-green-700 transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : (
          `Pay ${formatCurrency(amount, currency)} with Paystack`
        )}
      </button>
    </form>
  );
};

// Main PaymentGateway component
const PaymentGateway = ({ amount = 0, currency = 'USD', onSuccess, onCancel, onProcessingChange }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { isDarkMode } = useDarkMode();

  // Update processing state when loading changes
  useEffect(() => {
    if (typeof onProcessingChange === 'function') {
      onProcessingChange(loading);
    }
  }, [loading, onProcessingChange]);

  const handlePaymentError = (errorData) => {
    setLoading(false);
    if (errorData) {
      setError(errorData.message || 'Payment failed. Please try again.');
      console.error('Payment error:', errorData);
    } else {
      setError('An unexpected error occurred. Please try again later.');
      console.error('Payment error: Unknown error (no errorData provided)');
    }
  };

  const handlePaymentSuccess = (paymentData) => {
    try {
      setLoading(false);
      if (typeof onSuccess === 'function' && paymentData) {
        onSuccess(paymentData);
      } else {
        console.warn('Payment success handler called without valid data or callback');
      }
    } catch (error) {
      console.error('Error in payment success handler:', error);
      setError('Error processing successful payment');
    }
  };

  const handleCancel = () => {
    setLoading(false);
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  // Handler to update loading state from PaystackForm
  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Payment Gateway</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 dark:text-gray-300 mb-2">Amount to pay:</p>
        <div className="text-3xl font-bold text-green-600 dark:text-green-400">
          {formatCurrency(amount, currency)}
        </div>
      </div>
      
      {/* Paystack Payment Form */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium dark:text-white">
            Pay with Paystack
          </h3>
        </div>
        
        <PaystackForm 
          amount={amount} 
          currency={currency} 
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          onLoadingChange={handleLoadingChange}
        />
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <button 
          type="button" 
          onClick={handleCancel}
          disabled={loading}
          className={`bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PaymentGateway;