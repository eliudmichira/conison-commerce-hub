const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
const cors = require('cors')({ origin: true });
const { v4: uuidv4 } = require('uuid');

admin.initializeApp();

// MTN Mobile Money API Constants
const MTN_CONFIG = {
  consumerKey: functions.config().mtn?.consumer_key || 'OoYJlo8LDQNDyZQuePd89ugymdCAqxXF',
  consumerSecret: functions.config().mtn?.consumer_secret || 'EXTxFsuL5MZzUa7X',
  apiUrl: functions.config().mtn?.api_url || 'https://sandbox.momodeveloper.mtn.com',
  callbackHost: functions.config().mtn?.callback_host || 'https://conison-commerce-hub.web.app'
};

// Get an access token from MTN API
async function getMTNAccessToken() {
  try {
    const auth = Buffer.from(`${MTN_CONFIG.consumerKey}:${MTN_CONFIG.consumerSecret}`).toString('base64');
    const response = await axios({
      method: 'post',
      url: `${MTN_CONFIG.apiUrl}/collection/token/`,
      headers: {
        'Authorization': `Basic ${auth}`,
        'Ocp-Apim-Subscription-Key': MTN_CONFIG.consumerKey
      }
    });
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting MTN access token:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with MTN API');
  }
}

// Create payment request with MTN Mobile Money
exports.createMTNPayment = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      // Only allow POST method
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }

      const { phoneNumber, amount, currency, reference } = req.body;
      
      // Validate required fields
      if (!phoneNumber || !amount || !currency) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }

      // Generate unique reference if not provided
      const paymentReference = reference || `TX_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      
      // Get access token
      const accessToken = await getMTNAccessToken();
      
      // Create UUID for request
      const requestId = uuidv4();
      
      // Generate callback URL
      const callbackUrl = `${MTN_CONFIG.callbackHost}/api/mtn-payment-callback`;
      
      // Request body for payment
      const requestBody = {
        amount: amount.toString(),
        currency: currency,
        externalId: paymentReference,
        payer: {
          partyIdType: 'MSISDN',
          partyId: phoneNumber
        },
        payerMessage: 'Payment for Conison Technologies',
        payeeNote: 'Thank you for your payment'
      };
      
      // Make the payment request
      const paymentResponse = await axios({
        method: 'post',
        url: `${MTN_CONFIG.apiUrl}/collection/v1_0/requesttopay`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Reference-Id': requestId,
          'X-Target-Environment': 'sandbox',
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': MTN_CONFIG.consumerKey
        },
        data: requestBody
      });
      
      // Store transaction in Firestore
      const transaction = {
        requestId,
        phoneNumber,
        amount,
        currency,
        reference: paymentReference,
        status: 'PENDING',
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      await admin.firestore().collection('mtn_transactions').doc(requestId).set(transaction);
      
      // Return success
      return res.status(200).json({
        success: true,
        transactionId: requestId,
        reference: paymentReference
      });
    } catch (error) {
      console.error('Error creating MTN payment:', error.response?.data || error.message);
      return res.status(500).json({
        error: 'Failed to process MTN payment',
        details: error.message
      });
    }
  });
});

// Check MTN payment status
exports.checkMTNPaymentStatus = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      const { transactionId } = req.query;
      
      if (!transactionId) {
        return res.status(400).json({ error: 'Transaction ID is required' });
      }
      
      // Get transaction from Firestore
      const transactionDoc = await admin.firestore().collection('mtn_transactions').doc(transactionId).get();
      
      if (!transactionDoc.exists) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      
      const transaction = transactionDoc.data();
      
      // If already completed, return current status
      if (transaction.status !== 'PENDING') {
        return res.status(200).json({
          status: transaction.status,
          transactionId
        });
      }
      
      // Get access token
      const accessToken = await getMTNAccessToken();
      
      // Check payment status from MTN API
      const statusResponse = await axios({
        method: 'get',
        url: `${MTN_CONFIG.apiUrl}/collection/v1_0/requesttopay/${transactionId}`,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Target-Environment': 'sandbox',
          'Ocp-Apim-Subscription-Key': MTN_CONFIG.consumerKey
        }
      });
      
      const paymentStatus = statusResponse.data.status;
      
      // Update status in Firestore
      await admin.firestore().collection('mtn_transactions').doc(transactionId).update({
        status: paymentStatus,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      
      // Return the actual status from MTN API
      return res.status(200).json({
        status: paymentStatus,
        transactionId
      });
    } catch (error) {
      console.error('Error checking MTN payment status:', error.response?.data || error.message);
      return res.status(500).json({
        error: 'Failed to check payment status',
        details: error.message
      });
    }
  });
});

// Callback for MTN payment notification (webhook)
exports.mtnPaymentCallback = functions.https.onRequest(async (req, res) => {
  try {
    const { referenceId } = req.body;
    
    if (!referenceId) {
      return res.status(400).json({ error: 'Reference ID is required' });
    }
    
    // Update transaction status in Firestore
    await admin.firestore().collection('mtn_transactions').doc(referenceId).update({
      status: 'SUCCESSFUL',
      callbackReceived: true,
      callbackData: req.body,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error in MTN payment callback:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a payment record in Firestore after successful payment
exports.createPaymentRecord = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
      }
      
      const { 
        userId, 
        amount, 
        currency, 
        method, 
        transactionId, 
        service, 
        status = 'completed'
      } = req.body;
      
      if (!userId || !amount || !method || !transactionId) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
      
      const payment = {
        userId,
        amount: parseFloat(amount),
        currency: currency || 'USD',
        method,
        transactionId,
        service: service || 'General service',
        status,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      };
      
      const paymentRef = await admin.firestore().collection('payments').add(payment);
      
      return res.status(200).json({
        success: true,
        paymentId: paymentRef.id
      });
    } catch (error) {
      console.error('Error creating payment record:', error);
      return res.status(500).json({
        error: 'Failed to create payment record',
        details: error.message
      });
    }
  });
}); 