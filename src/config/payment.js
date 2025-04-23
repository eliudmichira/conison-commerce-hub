/**
 * Payment Gateway Configuration
 * 
 * This file contains configuration for Paystack payment processor used in the application.
 * In production, these values should be set in environment variables.
 */

const config = {
  // Paystack configuration
  PAYSTACK_PUBLIC_KEY: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || 'pk_test_aca08eaa627315e72234220e37729c6660057210',
  
  // Payment processing API endpoint
  PAYMENT_API_URL: process.env.REACT_APP_PAYMENT_API_URL || '/api/payments',
  
  // Supported currencies
  SUPPORTED_CURRENCIES: ['USD', 'NGN', 'GHS', 'ZAR'],
  
  // Default currency
  DEFAULT_CURRENCY: 'USD',
  
  // Payment methods available by region
  PAYMENT_METHODS: {
    GLOBAL: ['card', 'bank_transfer'],
    AFRICA: ['card', 'bank_transfer', 'mobile_money']
  }
};

export default config; 