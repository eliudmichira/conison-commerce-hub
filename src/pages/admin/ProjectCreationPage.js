import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import toast from 'react-hot-toast';
import { FaArrowLeft, FaUser, FaQuoteLeft, FaCalendarAlt, FaDollarSign, FaTasks } from 'react-icons/fa';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ProjectCreationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const quoteId = searchParams.get('quoteId');

  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [quoteData, setQuoteData] = useState(null);
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    projectName: '',
    clientId: '',
    quoteId: quoteId || '',
    description: '',
    startDate: new Date().toISOString().substr(0, 10),
    deadline: '',
    totalAmount: '',
    status: 'pending',
    notes: '',
    tasks: [],
    paymentTerms: 'full',
    paymentStatus: 'unpaid'
  });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        
        // Fetch clients
        await fetchClients();
        
        // If there's a quoteId, fetch quote details
        if (quoteId) {
          await fetchQuoteDetails(quoteId);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error loading initial data:", err);
        setError("Failed to load initial data. Please try again.");
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, [quoteId]);

  const fetchClients = async () => {
    try {
      const clientsQuery = query(collection(db, 'users'), where('role', '==', 'client'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(clientsQuery);
      
      if (snapshot.empty) {
        setError("No clients found. Please create a client first.");
        setClients([]);
        return;
      }
      
      const clientsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        name: doc.data().name || doc.data().displayName || 'Unknown'
      }));
      
      setClients(clientsList);
      
      // If there's only one client, select it by default
      if (clientsList.length === 1) {
        setFormData(prev => ({
          ...prev,
          clientId: clientsList[0].id
        }));
      }
    } catch (err) {
      console.error("Error fetching clients:", err);
      setError("Failed to load clients. Please try again.");
      throw err;
    }
  };

  const fetchQuoteDetails = async (id) => {
    try {
      const quoteRef = doc(db, 'quotes', id);
      const quoteSnap = await getDoc(quoteRef);
      
      if (!quoteSnap.exists()) {
        setError("Quote not found. Please try again.");
        throw new Error("Quote not found");
      }
      
      const quote = {
        id: quoteSnap.id,
        ...quoteSnap.data()
      };
      
      setQuoteData(quote);
      
      // Extract budget range from estimatedBudget (format: "$150 - $450")
      let budgetAmount = 0;
      if (quote.estimatedBudget) {
        const matches = quote.estimatedBudget.match(/\$(\d+)\s*-\s*\$(\d+)/);
        if (matches && matches.length >= 3) {
          // Use the max value from the range
          budgetAmount = parseInt(matches[2], 10);
        }
      }
      
      // Populate form with quote data
      setFormData(prev => ({
        ...prev,
        projectName: quote.serviceCategory ? `${quote.serviceCategory} - ${quote.serviceType}` : 'New Project',
        clientId: quote.userId !== 'anonymous' ? quote.userId : '',
        description: quote.projectDescription || '',
        totalAmount: budgetAmount || '',
        quoteId: id
      }));
      
    } catch (err) {
      console.error("Error fetching quote details:", err);
      throw err;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.clientId) {
      toast.error("Please select a client");
      return;
    }
    
    if (!formData.projectName) {
      toast.error("Please enter a project name");
      return;
    }
    
    try {
      setLoading(true);
      
      // Create project in Firestore
      const projectData = {
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
        totalAmount: parseFloat(formData.totalAmount) || 0
      };
      
      // Find client name from selected clientId
      const selectedClient = clients.find(client => client.id === formData.clientId);
      if (selectedClient) {
        projectData.clientName = selectedClient.name;
        projectData.clientEmail = selectedClient.email;
      }
      
      const docRef = await addDoc(collection(db, 'projects'), projectData);
      
      toast.success("Project created successfully!");
      
      // If this was created from a quote, update the quote status
      if (formData.quoteId) {
        const quoteRef = doc(db, 'quotes', formData.quoteId);
        await updateDoc(quoteRef, {
          status: 'converted',
          projectId: docRef.id,
          updatedAt: new Date()
        });
      }
      
      // Navigate back to projects list
      navigate('/admin/projects');
      
    } catch (err) {
      console.error("Error creating project:", err);
      toast.error("Failed to create project. Please try again.");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <div className="mt-4">
            <button 
              onClick={() => navigate('/admin/projects')}
              className="px-4 py-2 bg-red-100 dark:bg-red-800/50 text-red-700 dark:text-red-300 rounded-md hover:bg-red-200 transition-colors"
            >
              Back to Projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <button 
            onClick={() => navigate('/admin/projects')}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-2"
          >
            <FaArrowLeft className="mr-2" /> Back to Projects
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Project</h1>
        </div>
      </div>
      
      {quoteData && (
        <div className="mb-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
          <h2 className="text-lg font-semibold text-purple-700 dark:text-purple-300 flex items-center">
            <FaQuoteLeft className="mr-2" /> Creating from Quote
          </h2>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Reference:</p>
              <p className="font-medium text-gray-900 dark:text-white">{quoteData.referenceNumber || quoteData.id}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Service:</p>
              <p className="font-medium text-gray-900 dark:text-white">
                {quoteData.serviceCategory}{quoteData.serviceType ? ` - ${quoteData.serviceType}` : ''}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Budget:</p>
              <p className="font-medium text-gray-900 dark:text-white">{quoteData.estimatedBudget || 'Not specified'}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaTasks className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter project name"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Client</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <select
                  name="clientId"
                  value={formData.clientId}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="">Select a client</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.name} ({client.email})
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Deadline (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className="text-gray-400" />
                </div>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Value</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaDollarSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleInputChange}
                  className="pl-10 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter project description"
            ></textarea>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notes (Internal)</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows="2"
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
              placeholder="Internal notes about this project"
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/admin/projects')}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-md mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-md hover:from-purple-700 hover:to-indigo-700 transition-colors"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectCreationPage; 