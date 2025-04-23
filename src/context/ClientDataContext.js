import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  getQuotes,
  createQuote,
  updateQuote,
  getProjects,
  createProject,
  updateProject,
  getPayments,
  createPayment,
  updatePayment
} from '../api/clientApi';

// Create context
const ClientDataContext = createContext();

// Custom hook to use client data context
export const useClientData = () => {
  const context = useContext(ClientDataContext);
  if (!context) {
    throw new Error('useClientData must be used within a ClientDataProvider');
  }
  return context;
};

export const ClientDataProvider = ({ children }) => {
  const { currentUser, userData } = useAuth();
  const [quotes, setQuotes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper to get user ID safely
  const getUserId = () => {
    // In production, we only use authenticated user ID
    return userData?.uid || currentUser?.uid;
  };

  // Load all client data
  const loadClientData = async () => {
    const userId = getUserId();
    
    // Only fetch data if user is authenticated
    if (!userId) {
      setLoading(false);
      setQuotes([]);
      setProjects([]);
      setPayments([]);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Load data from API
      const quotesData = await getQuotes(userId);
      const projectsData = await getProjects(userId);
      const paymentsData = await getPayments(userId);

      setQuotes(quotesData || []);
      setProjects(projectsData || []);
      setPayments(paymentsData || []);
    } catch (err) {
      console.error('Error loading client data:', err);
      setError('Failed to load data from server. Please try again later.');
      // Initialize with empty arrays
      setQuotes([]);
      setProjects([]);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  // Load data when user changes or on initial load
  useEffect(() => {
    // Only load data if user is authenticated
    if (currentUser || userData) {
      loadClientData();
    } else {
      // Clear data when not authenticated
      setQuotes([]);
      setProjects([]);
      setPayments([]);
      setLoading(false);
    }
  }, [currentUser, userData]);

  // Quotes functions
  const addQuote = async (quoteData) => {
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error('You must be logged in to create a quote');
      }
      
      const newQuote = await createQuote({
        ...quoteData,
        userId,
        status: 'pending'
      });
      setQuotes(prev => [...prev, newQuote]);
      return newQuote;
    } catch (err) {
      console.error('Error creating quote:', err);
      throw err;
    }
  };

  const updateQuoteStatus = async (quoteId, status) => {
    try {
      const updatedQuote = await updateQuote(quoteId, { status });
      setQuotes(prev => prev.map(q => 
        q.id === quoteId ? updatedQuote : q
      ));
      return updatedQuote;
    } catch (err) {
      console.error('Error updating quote:', err);
      throw err;
    }
  };

  // Projects functions
  const addProject = async (projectData) => {
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error('You must be logged in to create a project');
      }
      
      const newProject = await createProject({
        ...projectData,
        userId,
        status: 'active'
      });
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      console.error('Error creating project:', err);
      throw err;
    }
  };

  const updateProjectStatus = async (projectId, status) => {
    try {
      const updatedProject = await updateProject(projectId, { status });
      setProjects(prev => prev.map(p => 
        p.id === projectId ? updatedProject : p
      ));
      return updatedProject;
    } catch (err) {
      console.error('Error updating project:', err);
      throw err;
    }
  };

  // Payments functions
  const addPayment = async (paymentData) => {
    try {
      const userId = getUserId();
      if (!userId) {
        throw new Error('You must be logged in to make a payment');
      }
      
      const newPayment = await createPayment({
        ...paymentData,
        userId
      });
      setPayments(prev => [...prev, newPayment]);
      
      // Refresh data to ensure everything is up to date
      // This is important since payment creation also updates the quote status
      loadClientData();
      
      return newPayment;
    } catch (err) {
      console.error('Error creating payment:', err);
      throw err;
    }
  };

  const updatePaymentStatus = async (paymentId, status) => {
    try {
      const updatedPayment = await updatePayment(paymentId, { status });
      setPayments(prev => prev.map(p => 
        p.id === paymentId ? updatedPayment : p
      ));
      return updatedPayment;
    } catch (err) {
      console.error('Error updating payment:', err);
      throw err;
    }
  };

  const value = {
    quotes,
    projects,
    payments,
    loading,
    error,
    addQuote,
    updateQuoteStatus,
    addProject,
    updateProjectStatus,
    addPayment,
    updatePaymentStatus,
    refreshData: loadClientData
  };

  return (
    <ClientDataContext.Provider value={value}>
      {children}
    </ClientDataContext.Provider>
  );
};

export default ClientDataContext; 