// components/PaymentGateway.js
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

// Initialize Stripe with your publishable key - replace with your actual key when in production
const stripePromise = loadStripe('pk_test_51OypMYJapBRyvNd4p9XE0ZspNtM66u9ZEepLrBp9EHOL3JqGiqx87WnoDKDc6IlFsU1kVmrgd3Nb9wROUi6Psvmw00ycpZxSrq');

// Helper function to format currency values
const formatCurrency = (value, currencyCode = 'USD') => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode || 'USD'
    }).format(value || 0);
  } catch (error) {
    console.error('Error formatting currency:', error);
    return `${currencyCode || 'USD'} ${(value || 0).toLocaleString()}`;
  }
};

// The actual form for Stripe card payments
const StripeCardForm = ({ amount, currency, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      // Create a payment method
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          // You can collect these from the user if needed
          // name: 'Customer Name',
          // email: 'customer@example.com',
        },
      });

      if (error) {
        setErrorMessage(error.message);
        onError(error);
        return;
      }

      // Here you would typically send the payment method ID to your server
      // For demonstration, we're simulating a successful payment
      // In production, replace this with an actual call to your backend
      
      // Simulating API call to your server
      const response = await simulatePaymentRequest(paymentMethod.id, amount, currency);
      
      // Handle successful payment
      onSuccess({
        transactionId: `pm_${paymentMethod.id}`,
        method: 'card',
        amount,
        currency
      });
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      onError(err);
    } finally {
      setLoading(false);
    }
  };

  // This simulates sending payment info to your server
  // In production, replace with actual API call
  const simulatePaymentRequest = async (paymentMethodId, amount, currency) => {
    // Simulating a server request
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, id: paymentMethodId });
      }, 1000);
    });
    
    // In production your code would look something like this:
    /*
    return await axios.post('/api/process-payment', {
      paymentMethodId,
      amount,
      currency
    });
    */
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Card Details
        </label>
        <div className="p-3 border rounded-md bg-white dark:bg-gray-700">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        {errorMessage && (
          <div className="text-red-600 text-sm mt-2">
            {errorMessage}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full bg-conison-magenta text-white py-3 px-8 rounded-lg shadow hover:bg-conison-cyan transition ${
          (!stripe || loading) ? 'opacity-50 cursor-not-allowed' : ''
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
          `Pay ${formatCurrency(amount, currency)}`
        )}
      </button>
    </form>
  );
};

// M-PESA Form Component
const MPesaForm = ({ amount, currency, onSuccess, onError }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMessage('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      // In production, you would call your backend to initiate an M-PESA payment
      // For now, we'll simulate a successful payment
      await simulateMPesaRequest(phoneNumber, amount);
      
      onSuccess({
        transactionId: 'mpesa_' + Math.random().toString(36).substr(2, 9),
        method: 'mpesa',
        amount,
        currency
      });
    } catch (err) {
      setErrorMessage('An error occurred. Please try again.');
      onError(err);
    } finally {
      setLoading(false);
    }
  };

  const simulateMPesaRequest = async (phoneNumber, amount) => {
    // Simulating API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 dark:text-gray-300 mb-2">
          M-PESA Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          className="w-full p-3 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
          placeholder="e.g. 254712345678"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        {errorMessage && (
          <div className="text-red-600 text-sm mt-2">
            {errorMessage}
          </div>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          You will receive an M-PESA prompt on this phone number to complete payment.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-conison-magenta text-white py-3 px-8 rounded-lg shadow hover:bg-conison-cyan transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending M-PESA Request...
          </div>
        ) : (
          `Pay ${formatCurrency(amount, currency)} with M-PESA`
        )}
      </button>
    </form>
  );
};

// PayPal Form Component - simplified for demo
const PayPalForm = ({ amount, currency, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const handlePayPalClick = async () => {
    setLoading(true);
    
    try {
      // In production, you would redirect to PayPal or use their SDK
      // For now, we'll simulate a successful payment
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      onSuccess({
        transactionId: 'paypal_' + Math.random().toString(36).substr(2, 9),
        method: 'paypal',
        amount,
        currency
      });
    } catch (err) {
      onError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        Click the button below to pay with PayPal. You will be redirected to PayPal to complete your payment.
      </p>
      
      <button
        type="button"
        onClick={handlePayPalClick}
        disabled={loading}
        className={`w-full bg-[#0070ba] text-white py-3 px-8 rounded-lg shadow hover:bg-[#003087] transition ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Redirecting to PayPal...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.067 8.478c.492.876.763 1.885.763 2.986 0 3.395-2.893 6.264-6.756 6.264h-1.717l-.546 3.466h-1.557l-.546 3.467h-3.082l.547-3.466h-1.557l.546-3.467h1.557l1.092-6.932h4.113c1.52 0 2.897.633 3.812 1.66A3.57 3.57 0 0 1 17.303 14h1.717c.732 0 1.414-.186 2.007-.505a3.555 3.555 0 0 0 1.326-1.347 3.607 3.607 0 0 0 .454-1.758 3.6 3.6 0 0 0-.227-1.252 3.54 3.54 0 0 0-.662-1.12 3.556 3.556 0 0 0-2.895-1.491h-2.863c-.09 0-.176.04-.234.108a.295.295 0 0 0-.057.256l.255 1.113c.02.086.06.166.116.235l.52.567c.03.033.067.06.11.077.07.03.15.03.221 0 .074-.03.134-.91.173-.174l.158-.341h1.542c.09 0 .176.04.234.108a.295.295 0 0 1 .57.256l-.254 1.113a.317.317 0 0 1-.117.235l-.52.567a.302.302 0 0 1-.109.077.289.289 0 0 1-.222 0 .302.302 0 0 1-.173-.174l-.158-.341h-1.717a3.56 3.56 0 0 0-1.546.354 3.54 3.54 0 0 0-1.245.954 3.556 3.556 0 0 0-.666 1.297 3.607 3.607 0 0 0-.098 1.84l-2.654 0 .546-3.467h3.258c.308 0 .613-.05.904-.15.6-.205 1.069-.673 1.32-1.296h1.43c.083-.475.225-.929.418-1.354H5.617L3 20.125h17.067c1.537 0 2.788-1.237 2.788-2.76 0-1.97-.98-2.89-2.788-2.89h-1.717c-.523 0-.904-.39-.904-.897 0-.308.127-.602.35-.816.224-.214.526-.334.843-.334h1.718c.09 0 .176.04.234.108a.295.295 0 0 1 .057.256l-.255 1.113a.317.317 0 0 1-.117.235l-.52.567a.302.302 0 0 1-.109.077.289.289 0 0 1-.222 0 .302.302 0 0 1-.173-.174l-.157-.341h-1.718c-.09 0-.176-.04-.234-.108a.295.295 0 0 1-.057-.256l.254-1.113c.02-.086.06-.166.117-.235l.52-.567a.302.302 0 0 1 .108-.077.289.289 0 0 1 .222 0c.074.03.134.091.173.174l.158.341h1.718c.732 0 1.414.186 2.007.505.593.32 1.062.766 1.325 1.347.264.581.399 1.18.399 1.758"></path>
            </svg>
            Pay with PayPal
          </div>
        )}
      </button>
    </div>
  );
};

// Main PaymentGateway component
const PaymentGateway = ({ amount = 0, currency = 'USD', onSuccess, onCancel }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [, setCountryCode] = useState('US');
  const [showMobilePayments, setShowMobilePayments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Available payment methods
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'credit-card', available: true },
    { id: 'paypal', name: 'PayPal', icon: 'paypal', available: true },
    { id: 'mpesa', name: 'M-PESA', icon: 'mobile', available: showMobilePayments },
    { id: 'momo', name: 'Mobile Money', icon: 'mobile', available: showMobilePayments },
    { id: 'bank', name: 'Bank Transfer', icon: 'bank', available: true }
  ];

  // Detect user's country (in a real app, this would use geolocation or IP-based detection)
  useEffect(() => {
    const detectCountry = async () => {
      try {
        // This would be a real API call in production
        // For now, we'll simulate a detection for Kenya to show M-PESA
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulating detection of Kenya
        // In production, you'd call a geolocation service
        const detectedCountry = 'KE'; // Kenya code for testing
        setCountryCode(detectedCountry);
        
        // Show mobile payment options for African countries
        if (['KE', 'GH', 'NG', 'TZ', 'UG', 'RW'].includes(detectedCountry)) {
          setShowMobilePayments(true);
        }
      } catch (err) {
        console.error('Error detecting country:', err);
        // Default to not showing mobile payments if detection fails
      }
    };
    
    detectCountry();
  }, []);

  const handlePaymentSelect = (methodId) => {
    setSelectedMethod(methodId);
    setError('');
  };
  
  const handlePaymentError = (errorData) => {
    setError(errorData.message || 'Payment failed. Please try again.');
    console.error('Payment error:', errorData);
  };

  const handlePaymentSuccess = (paymentData) => {
    if (typeof onSuccess === 'function') {
      onSuccess(paymentData);
    }
  };

  const handleCancel = () => {
    if (typeof onCancel === 'function') {
      onCancel();
    }
  };

  // Simulated payment submission for demo purposes
  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        setLoading(false);
        handlePaymentSuccess({
          id: `payment_${Date.now()}`,
        method: selectedMethod,
          amount: amount,
          currency: currency,
          status: 'completed'
      });
      } else {
      setLoading(false);
        handlePaymentError({
          message: 'Transaction declined. Please try again or use a different payment method.'
        });
      }
    }, 2000);
  };

  const handlePayment = async (paymentData) => {
    try {
      // Simulate a payment API call
      // const response = await axios.post('/api/payment', paymentData);
      // Instead of using axios, just create a simulated response
      
      // Wait for 1.5 seconds to simulate network request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mock response
      const mockResponse = {
        success: true,
        data: {
          transactionId: 'txn_' + Math.random().toString(36).substr(2, 9),
          amount: paymentData.amount,
          status: 'completed',
          date: new Date().toISOString()
        }
      };
      
      return mockResponse;
    } catch (error) {
      console.error('Payment error:', error);
      throw error;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Payment Methods</h2>
      
      <div className="mb-6">
        <p className="text-gray-700 dark:text-gray-300 mb-2">Amount to pay:</p>
        <div className="text-3xl font-bold text-conison-magenta dark:text-conison-yellow">
          {formatCurrency(amount, currency)}
        </div>
      </div>
      
      {!selectedMethod ? (
        <div className="space-y-4 mb-8">
          {paymentMethods.filter(method => method.available).map((method) => (
            <div 
              key={method.id}
              className={`border rounded-lg p-4 cursor-pointer transition flex items-center ${
                selectedMethod === method.id 
                  ? 'border-conison-magenta bg-conison-magenta/10 dark:bg-conison-magenta/20 dark:border-conison-magenta' 
                  : 'border-gray-200 hover:border-conison-cyan dark:border-gray-700 dark:hover:border-gray-500'
              }`}
              onClick={() => handlePaymentSelect(method.id)}
            >
                <div className="h-6 w-6 mr-3">
                  {method.icon === 'credit-card' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  )}
                  {method.icon === 'paypal' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {method.icon === 'mobile' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  )}
                  {method.icon === 'bank' && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-medium dark:text-white">{method.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {method.id === 'card' && 'Visa, Mastercard, etc.'}
                    {method.id === 'paypal' && 'Pay with your PayPal account'}
                    {method.id === 'mpesa' && 'Pay using M-PESA mobile money'}
                    {method.id === 'momo' && 'MTN, Airtel, and other mobile money services'}
                    {method.id === 'bank' && 'Direct bank transfer'}
                  </p>
                </div>
                <div className="ml-auto">
                  <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                    selectedMethod === method.id
                    ? 'border-conison-magenta bg-conison-magenta dark:border-conison-magenta dark:bg-conison-magenta'
                      : 'border-gray-300 dark:border-gray-600'
                  }`}>
                    {selectedMethod === method.id && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium dark:text-white">
              {paymentMethods.find(m => m.id === selectedMethod)?.name}
            </h3>
            <button 
              onClick={() => setSelectedMethod('')}
              className="text-conison-cyan hover:text-conison-magenta dark:text-conison-cyan dark:hover:text-conison-magenta text-sm"
            >
              Change payment method
            </button>
          </div>
          
          {selectedMethod === 'card' && (
            <Elements stripe={stripePromise}>
              <StripeCardForm 
                amount={amount} 
                currency={currency} 
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </Elements>
          )}
          
          {selectedMethod === 'mpesa' && (
            <MPesaForm 
              amount={amount} 
              currency={currency} 
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          )}
          
          {selectedMethod === 'paypal' && (
            <PayPalForm 
              amount={amount} 
              currency={currency} 
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          )}
          
          {selectedMethod === 'bank' && (
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Please make a transfer to the following bank account:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <p className="mb-2"><strong>Bank Name:</strong> Kenya Commercial Bank</p>
                <p className="mb-2"><strong>Account Name:</strong> Conison Technologies Ltd</p>
                <p className="mb-2"><strong>Account Number:</strong> 1234567890</p>
                <p className="mb-2"><strong>Branch:</strong> Nairobi Main</p>
                <p className="mb-0"><strong>Reference:</strong> INV-{Math.floor(Math.random() * 10000)}</p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                After making the transfer, please send your proof of payment to 
                <a href="mailto:payments@conison.com" className="text-conison-cyan hover:underline ml-1">
                  payments@conison.com
                </a>
              </p>
              <button 
                onClick={() => handlePaymentSuccess({ 
                  transactionId: `bank_${Math.random().toString(36).substr(2, 9)}`,
                  method: 'bank',
                  amount,
                  currency,
                  status: 'pending'
                })}
                className="w-full bg-conison-magenta text-white py-3 px-8 rounded-lg shadow hover:bg-conison-cyan transition"
              >
                I've Made the Transfer
              </button>
            </div>
          )}
          
          {selectedMethod === 'momo' && (
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Please send your Mobile Money payment to:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <p className="mb-2"><strong>Number:</strong> +254 712 345 678</p>
                <p className="mb-2"><strong>Name:</strong> Conison Technologies</p>
                <p className="mb-0"><strong>Reference:</strong> INV-{Math.floor(Math.random() * 10000)}</p>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                After making the payment, please wait for confirmation. You will receive a receipt via SMS.
              </p>
              <button 
                onClick={() => handlePaymentSuccess({ 
                  transactionId: `momo_${Math.random().toString(36).substr(2, 9)}`,
                  method: 'momo',
                  amount,
                  currency,
                  status: 'pending'
                })}
                className="w-full bg-conison-magenta text-white py-3 px-8 rounded-lg shadow hover:bg-conison-cyan transition"
              >
                I've Made the Payment
              </button>
            </div>
          )}
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {!selectedMethod && (
        <div className="flex justify-between">
          <button 
            type="button" 
            onClick={handleCancel}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      )}
      
      {selectedMethod && (
        <div className="flex space-x-4">
          <button 
            type="submit"
            disabled={loading}
            className={`flex-1 py-3 px-4 bg-conison-magenta text-white rounded-md font-medium hover:bg-conison-cyan focus:outline-none transition ${
              loading ? 'opacity-70 cursor-not-allowed' : ''
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
              `Pay ${formatCurrency(amount, currency)}`
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentGateway;