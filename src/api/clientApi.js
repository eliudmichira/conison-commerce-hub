// Production-ready API implementation
// This connects to the real backend API endpoints

import { firebaseAuth, firestore } from '../firebase/config';
import { collection, addDoc, updateDoc, getDocs, getDoc, doc, query, where, Timestamp, serverTimestamp } from 'firebase/firestore';

// Helper function to generate reference ID for receipts
const generateReceiptId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `INV-${timestamp}${randomStr}`.toUpperCase();
};

// Convert Firestore timestamps to ISO strings for consistent handling
const convertTimestamps = (data) => {
  if (!data) return data;
  
  const result = { ...data };
  Object.keys(result).forEach(key => {
    if (result[key] instanceof Timestamp) {
      result[key] = result[key].toDate().toISOString();
    }
  });
  
  return result;
};

// Error handling wrapper for API calls
const handleApiCall = async (apiFunc) => {
  try {
    return await apiFunc();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error.message || 'An error occurred while accessing the database.');
  }
};

// Get current user ID
const getCurrentUserId = () => {
  const user = firebaseAuth.currentUser;
  if (!user) {
    throw new Error('User not authenticated. Please sign in to continue.');
  }
  return user.uid;
};

// Quotes API
export const getQuotes = async (userId) => {
  return handleApiCall(async () => {
    if (!userId) {
      userId = getCurrentUserId();
    }
    
    const quotesRef = collection(firestore, 'quotes');
    const q = query(quotesRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    }));
  });
};

export const createQuote = async (quoteData) => {
  return handleApiCall(async () => {
    if (!quoteData.userId) {
      quoteData.userId = getCurrentUserId();
    }
    
    // Add server timestamp for reliable sorting
    const docData = {
      ...quoteData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(firestore, 'quotes'), docData);
    const newQuote = await getDoc(docRef);
    
    return {
      id: docRef.id,
      ...convertTimestamps(newQuote.data())
    };
  });
};

export const updateQuote = async (quoteId, updates) => {
  return handleApiCall(async () => {
    // Add server timestamp for when document was last updated
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp()
    };
    
    const quoteRef = doc(firestore, 'quotes', quoteId);
    await updateDoc(quoteRef, updateData);
    
    const updatedQuote = await getDoc(quoteRef);
    return {
      id: quoteId,
      ...convertTimestamps(updatedQuote.data())
    };
  });
};

// Projects API
export const getProjects = async (userId) => {
  return handleApiCall(async () => {
    if (!userId) {
      userId = getCurrentUserId();
    }
    
    const projectsRef = collection(firestore, 'projects');
    const q = query(projectsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    }));
  });
};

export const createProject = async (projectData) => {
  return handleApiCall(async () => {
    if (!projectData.userId) {
      projectData.userId = getCurrentUserId();
    }
    
    // Add server timestamp for reliable sorting
    const docData = {
      ...projectData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(firestore, 'projects'), docData);
    const newProject = await getDoc(docRef);
    
    return {
      id: docRef.id,
      ...convertTimestamps(newProject.data())
    };
  });
};

export const updateProject = async (projectId, updates) => {
  return handleApiCall(async () => {
    // Add server timestamp for when document was last updated
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp()
    };
    
    const projectRef = doc(firestore, 'projects', projectId);
    await updateDoc(projectRef, updateData);
    
    const updatedProject = await getDoc(projectRef);
    return {
      id: projectId,
      ...convertTimestamps(updatedProject.data())
    };
  });
};

// Payments API
export const getPayments = async (userId) => {
  return handleApiCall(async () => {
    if (!userId) {
      userId = getCurrentUserId();
    }
    
    const paymentsRef = collection(firestore, 'payments');
    const q = query(paymentsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...convertTimestamps(doc.data())
    }));
  });
};

export const createPayment = async (paymentData) => {
  return handleApiCall(async () => {
    if (!paymentData.userId) {
      paymentData.userId = getCurrentUserId();
    }
    
    // Generate receipt ID and timestamp for reliable sorting
    const docData = {
      ...paymentData,
      receiptId: generateReceiptId(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    
    const docRef = await addDoc(collection(firestore, 'payments'), docData);
    
    // If this payment is for a quote, update the quote status
    if (paymentData.quoteId) {
      const quoteRef = doc(firestore, 'quotes', paymentData.quoteId);
      await updateDoc(quoteRef, { 
        status: 'paid',
        paymentId: docRef.id,
        updatedAt: serverTimestamp()
      });
    }
    
    const newPayment = await getDoc(docRef);
    return {
      id: docRef.id,
      ...convertTimestamps(newPayment.data())
    };
  });
};

export const updatePayment = async (paymentId, updates) => {
  return handleApiCall(async () => {
    // Add server timestamp for when document was last updated
    const updateData = {
      ...updates,
      updatedAt: serverTimestamp()
    };
    
    const paymentRef = doc(firestore, 'payments', paymentId);
    await updateDoc(paymentRef, updateData);
    
    const updatedPayment = await getDoc(paymentRef);
    return {
      id: paymentId,
      ...convertTimestamps(updatedPayment.data())
    };
  });
}; 