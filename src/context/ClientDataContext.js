import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

// Create context
const ClientDataContext = createContext();

// Custom hook to use client data context
export const useClientData = () => {
  return useContext(ClientDataContext);
};

export const ClientDataProvider = ({ children }) => {
  const [quotes, setQuotes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();

  // Load client data based on authenticated user
  useEffect(() => {
    if (currentUser) {
      loadClientData(currentUser.id);
    } else {
      // Reset data if no user is logged in
      setQuotes([]);
      setProjects([]);
      setPayments([]);
    }
    setLoading(false);
  }, [currentUser]);

  // Function to load client data from localStorage
  const loadClientData = (userId) => {
    try {
      // Get existing data from localStorage or create empty arrays
      const storedQuotes = localStorage.getItem(`quotes_${userId}`);
      const storedProjects = localStorage.getItem(`projects_${userId}`);
      const storedPayments = localStorage.getItem(`payments_${userId}`);
      
      // Parse stored data or use empty arrays
      setQuotes(storedQuotes ? JSON.parse(storedQuotes) : generateSampleQuotes(userId));
      setProjects(storedProjects ? JSON.parse(storedProjects) : generateSampleProjects(userId));
      setPayments(storedPayments ? JSON.parse(storedPayments) : generateSamplePayments(userId));
      
      // If no data exists, initialize with sample data to demonstrate functionality
      if (!storedQuotes) {
        const samples = generateSampleQuotes(userId);
        localStorage.setItem(`quotes_${userId}`, JSON.stringify(samples));
      }
      
      if (!storedProjects) {
        const samples = generateSampleProjects(userId);
        localStorage.setItem(`projects_${userId}`, JSON.stringify(samples));
      }
      
      if (!storedPayments) {
        const samples = generateSamplePayments(userId);
        localStorage.setItem(`payments_${userId}`, JSON.stringify(samples));
      }
      
    } catch (error) {
      console.error('Error loading client data:', error);
      // Initialize with empty arrays if error
      setQuotes([]);
      setProjects([]);
      setPayments([]);
    }
  };
  
  // Functions to update client data in localStorage
  const updateQuotes = (newQuotes) => {
    if (currentUser) {
      setQuotes(newQuotes);
      localStorage.setItem(`quotes_${currentUser.id}`, JSON.stringify(newQuotes));
    }
  };
  
  const updateProjects = (newProjects) => {
    if (currentUser) {
      setProjects(newProjects);
      localStorage.setItem(`projects_${currentUser.id}`, JSON.stringify(newProjects));
    }
  };
  
  const updatePayments = (newPayments) => {
    if (currentUser) {
      setPayments(newPayments);
      localStorage.setItem(`payments_${currentUser.id}`, JSON.stringify(newPayments));
    }
  };
  
  // Add a new quote
  const addQuote = (quote) => {
    const newQuotes = [...quotes, { ...quote, id: Date.now().toString() }];
    updateQuotes(newQuotes);
    return newQuotes[newQuotes.length - 1];
  };
  
  // Add a new project
  const addProject = (project) => {
    const newProjects = [...projects, { ...project, id: Date.now().toString() }];
    updateProjects(newProjects);
    return newProjects[newProjects.length - 1];
  };
  
  // Add a new payment
  const addPayment = (payment) => {
    const newPayments = [...payments, { ...payment, id: Date.now().toString() }];
    updatePayments(newPayments);
    return newPayments[newPayments.length - 1];
  };
  
  // Update existing items
  const updateQuote = (id, updates) => {
    const newQuotes = quotes.map(quote => 
      quote.id === id ? { ...quote, ...updates } : quote
    );
    updateQuotes(newQuotes);
    return newQuotes.find(q => q.id === id);
  };
  
  const updateProject = (id, updates) => {
    const newProjects = projects.map(project => 
      project.id === id ? { ...project, ...updates } : project
    );
    updateProjects(newProjects);
    return newProjects.find(p => p.id === id);
  };
  
  const updatePayment = (id, updates) => {
    const newPayments = payments.map(payment => 
      payment.id === id ? { ...payment, ...updates } : payment
    );
    updatePayments(newPayments);
    return newPayments.find(p => p.id === id);
  };

  // Provide context value
  const value = {
    quotes,
    projects,
    payments,
    loading,
    addQuote,
    addProject,
    addPayment,
    updateQuote,
    updateProject,
    updatePayment
  };

  return (
    <ClientDataContext.Provider value={value}>
      {children}
    </ClientDataContext.Provider>
  );
};

// Helper functions to generate sample data
const generateSampleQuotes = (userId) => {
  const now = new Date();
  const oneWeekAgo = new Date(now);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const twoWeeksAgo = new Date(now);
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  
  return [
    {
      id: '1',
      userId,
      service: 'Web Development',
      description: 'E-commerce website with payment integration',
      amount: 2500,
      status: 'approved',
      createdAt: twoWeeksAgo.toISOString(),
      updatedAt: oneWeekAgo.toISOString()
    },
    {
      id: '2',
      userId,
      service: 'Digital Marketing',
      description: 'Social media marketing campaign',
      amount: 1200,
      status: 'pending',
      createdAt: oneWeekAgo.toISOString(),
      updatedAt: oneWeekAgo.toISOString()
    }
  ];
};

const generateSampleProjects = (userId) => {
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const twoMonthsAgo = new Date(now);
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  
  const threeMonthsFromNow = new Date(now);
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
  
  return [
    {
      id: '1',
      userId,
      name: 'E-commerce Website',
      description: 'Online store with product catalog and payment processing',
      status: 'in_progress',
      progress: 65,
      startDate: oneMonthAgo.toISOString(),
      endDate: threeMonthsFromNow.toISOString(),
      milestones: [
        { id: '1', name: 'Project Planning', completed: true },
        { id: '2', name: 'Design Mockups', completed: true },
        { id: '3', name: 'Frontend Development', completed: true },
        { id: '4', name: 'Backend Development', completed: false },
        { id: '5', name: 'Payment Integration', completed: false },
        { id: '6', name: 'Testing & Launch', completed: false }
      ]
    },
    {
      id: '2',
      userId,
      name: 'Brand Identity',
      description: 'Logo design and brand guidelines',
      status: 'completed',
      progress: 100,
      startDate: twoMonthsAgo.toISOString(),
      endDate: oneMonthAgo.toISOString(),
      milestones: [
        { id: '1', name: 'Brand Strategy', completed: true },
        { id: '2', name: 'Logo Concepts', completed: true },
        { id: '3', name: 'Logo Refinement', completed: true },
        { id: '4', name: 'Brand Guidelines', completed: true }
      ]
    }
  ];
};

const generateSamplePayments = (userId) => {
  const now = new Date();
  const oneMonthAgo = new Date(now);
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  const twoMonthsAgo = new Date(now);
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  
  return [
    {
      id: '1',
      userId,
      quoteId: '1',
      amount: 1250, // First payment (50%)
      currency: 'USD',
      method: 'card',
      status: 'completed',
      date: twoMonthsAgo.toISOString()
    },
    {
      id: '2',
      userId,
      quoteId: '1',
      amount: 1250, // Second payment (50%)
      currency: 'USD',
      method: 'bank',
      status: 'completed',
      date: oneMonthAgo.toISOString()
    }
  ];
};

export default ClientDataContext; 