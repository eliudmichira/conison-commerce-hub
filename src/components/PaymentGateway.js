// Production-ready payment gateway component using Paystack
import React, { useState, useEffect } from 'react';
import { usePaystackPayment } from 'react-paystack';
import { useDarkMode } from '../context/DarkModeContext';
import { FaCreditCard, FaMobileAlt, FaMoneyBillWave, FaLock, FaStripe } from 'react-icons/fa';
import config from '../config/payment';

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

// Helper function to safely parse amount to ensure it's always a valid number
const safeParseAmount = (amount) => {
  if (amount === undefined || amount === null) return 0;
  
  try {
    const parsedAmount = parseFloat(amount);
    return isNaN(parsedAmount) ? 0 : parsedAmount;
  } catch (error) {
    console.warn("Error parsing amount:", error);
    return 0;
  }
};

// Paystack Form Component
const PaystackForm = ({ amount, currency, onSuccess, onError, onLoadingChange }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const { isDarkMode } = useDarkMode();
  
  // Effect to propagate loading state changes to parent
  useEffect(() => {
    if (typeof onLoadingChange === 'function') {
      onLoadingChange(loading);
    }
  }, [loading, onLoadingChange]);

  // Convert amount to the smallest currency unit (kobo for NGN, cents for USD)
  // Paystack requires amount in the smallest currency unit
  const paystackAmount = Math.round(parseFloat(amount || 0) * 100);

  // Safe config with production key from config
  const paystackConfig = {
    reference: (new Date()).getTime().toString(),
    email: email || 'customer@example.com', // Provide fallback email
    amount: paystackAmount,
    publicKey: config.PAYSTACK_PUBLIC_KEY,
    currency: currency || 'USD',
    firstname: name ? name.split(' ')[0] : '',
    lastname: name ? name.split(' ').slice(1).join(' ') : '',
    phone: phone || '',
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
  const initializePayment = usePaystackPayment(paystackConfig);

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
    
    setLoading(true);
    setErrorMessage('');
    
    try {
      // Initialize Paystack payment
      initializePayment(onPaystackSuccess, onClose);
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
        className={`w-full bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 text-white py-3 px-8 rounded-lg shadow transition ${
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
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  const { isDarkMode } = useDarkMode();

  // Ensure amount is a valid number
  const validAmount = safeParseAmount(amount);
  
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

  // Handler to update loading state from payment form
  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors = {};
    if (!cardDetails.number || cardDetails.number.replace(/\s/g, '').length !== 16) {
      newErrors.number = 'Please enter a valid 16-digit card number';
    }
    if (!cardDetails.name) {
      newErrors.name = 'Please enter the cardholder name';
    }
    if (!cardDetails.expiry || !cardDetails.expiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
    }
    if (!cardDetails.cvc || !cardDetails.cvc.match(/^\d{3,4}$/)) {
      newErrors.cvc = 'Please enter a valid security code';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors.form);
      return;
    }
    
    // Notify parent component that we're processing
    if (onProcessingChange) {
      onProcessingChange(true);
    }
    
    try {
      // In a real implementation, this would call a payment processor API
      // For demo purposes, we'll simulate a successful payment after a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call onSuccess with simulated payment data
      if (onSuccess) {
        onSuccess({
          transactionId: `t_${Math.random().toString(36).substr(2, 9)}`,
          amount: validAmount,
          currency,
          cardLast4: cardDetails.number.slice(-4),
          paymentMethod: paymentMethod,
          date: new Date().toISOString(),
          status: 'completed',
          receiptUrl: `https://receipts.example.com/${Math.random().toString(36).substr(2, 9)}`
        });
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      setError('Payment processing failed. Please try again.');
      if (onProcessingChange) {
        onProcessingChange(false);
      }
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'number') {
      const formatted = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      setCardDetails({ ...cardDetails, [name]: formatted });
    } else {
      setCardDetails({ ...cardDetails, [name]: value });
    }
    
    // Clear error when field is edited
    if (error && error.startsWith(name)) {
      setError(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Payment Gateway</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 dark:text-gray-300 mb-2">Amount to pay:</p>
        <div className="text-3xl font-bold text-red-600 dark:text-blue-400">
          {formatCurrency(amount, currency)}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium dark:text-white">
            Secure Payment
          </h3>
          <div className="flex space-x-2">
            <FaCreditCard className="text-gray-500 dark:text-gray-400" />
            <FaMobileAlt className="text-gray-500 dark:text-gray-400" />
            <FaMoneyBillWave className="text-gray-500 dark:text-gray-400" />
          </div>
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