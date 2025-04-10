// Mock API using localStorage
// This is a temporary solution until a real backend is implemented

// Helper functions to generate unique IDs
const generateId = () => Math.random().toString(36).substring(2, 15);
const getCurrentTimestamp = () => new Date().toISOString();

// Initialize localStorage with empty collections if they don't exist
const initializeStorage = () => {
  if (!localStorage.getItem('quotes')) {
    localStorage.setItem('quotes', JSON.stringify([]));
  }
  if (!localStorage.getItem('projects')) {
    localStorage.setItem('projects', JSON.stringify([]));
  }
  if (!localStorage.getItem('payments')) {
    localStorage.setItem('payments', JSON.stringify([]));
  }
};

// Initialize storage on load
initializeStorage();

// Mock API delay to simulate network requests
const apiDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Generic CRUD operations
const getItems = async (collection, userId) => {
  await apiDelay();
  const items = JSON.parse(localStorage.getItem(collection) || '[]');
  return userId ? items.filter(item => item.userId === userId) : items;
};

const addItem = async (collection, item) => {
  await apiDelay();
  const items = JSON.parse(localStorage.getItem(collection) || '[]');
  const newItem = {
    ...item,
    id: generateId(),
    createdAt: getCurrentTimestamp()
  };
  items.push(newItem);
  localStorage.setItem(collection, JSON.stringify(items));
  return newItem;
};

const updateItem = async (collection, itemId, updates) => {
  await apiDelay();
  const items = JSON.parse(localStorage.getItem(collection) || '[]');
  const index = items.findIndex(item => item.id === itemId);
  
  if (index === -1) {
    throw new Error(`Item with ID ${itemId} not found in ${collection}`);
  }
  
  const updatedItem = {
    ...items[index],
    ...updates,
    updatedAt: getCurrentTimestamp()
  };
  
  items[index] = updatedItem;
  localStorage.setItem(collection, JSON.stringify(items));
  return updatedItem;
};

// Quotes API
export const getQuotes = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required to fetch quotes');
  }
  return getItems('quotes', userId);
};

export const createQuote = async (quoteData) => {
  if (!quoteData.userId) {
    throw new Error('User ID is required to create a quote');
  }
  
  // Set a flag for quotes created from the quick quote options
  const enhancedQuoteData = {
    ...quoteData,
    // Set isQuickQuote based on provided data or default to false
    isQuickQuote: quoteData.isQuickQuote || false
  };
  
  return addItem('quotes', enhancedQuoteData);
};

export const updateQuote = async (quoteId, updates) => {
  if (!quoteId) {
    throw new Error('Quote ID is required to update a quote');
  }
  return updateItem('quotes', quoteId, updates);
};

// Projects API
export const getProjects = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required to fetch projects');
  }
  return getItems('projects', userId);
};

export const createProject = async (projectData) => {
  if (!projectData.userId) {
    throw new Error('User ID is required to create a project');
  }
  return addItem('projects', projectData);
};

export const updateProject = async (projectId, updates) => {
  if (!projectId) {
    throw new Error('Project ID is required to update a project');
  }
  return updateItem('projects', projectId, updates);
};

// Payments API
export const getPayments = async (userId) => {
  if (!userId) {
    throw new Error('User ID is required to fetch payments');
  }
  return getItems('payments', userId);
};

export const createPayment = async (paymentData) => {
  if (!paymentData.userId) {
    throw new Error('User ID is required to create a payment');
  }
  return addItem('payments', paymentData);
};

export const updatePayment = async (paymentId, updates) => {
  if (!paymentId) {
    throw new Error('Payment ID is required to update a payment');
  }
  return updateItem('payments', paymentId, updates);
}; 