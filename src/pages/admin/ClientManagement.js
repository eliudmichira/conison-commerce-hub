import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, updateDoc, where, getDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { FaUserCircle, FaEnvelope, FaPhone, FaBuilding, FaSearch, FaUsers, FaSync, FaEye, FaFileInvoiceDollar, FaProjectDiagram } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ClientManagement = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [clientMetrics, setClientMetrics] = useState({});
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientModal, setShowClientModal] = useState(false);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching clients from Firestore...");
      
      // First try with where clause to filter just clients
      let clientsData = [];
      try {
        const clientsQuery = query(
          collection(db, 'users'), 
          where('role', '==', 'client'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(clientsQuery);
        
        clientsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          displayName: doc.data().displayName || doc.data().name || 'Unnamed Client',
          email: doc.data().email || 'No email provided',
          createdAt: doc.data().createdAt?.toDate?.() 
            ? doc.data().createdAt.toDate().toISOString() 
            : new Date().toISOString()
        }));
      } catch (indexError) {
        console.warn("Index error, falling back to client-side filtering:", indexError);
        
        // Fallback to get all users and filter client-side if index doesn't exist
        const usersQuery = query(
          collection(db, 'users'),
          orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(usersQuery);
        
        clientsData = snapshot.docs
          .filter(doc => doc.data().role === 'client')
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
            displayName: doc.data().displayName || doc.data().name || 'Unnamed Client',
            email: doc.data().email || 'No email provided',
            createdAt: doc.data().createdAt?.toDate?.() 
              ? doc.data().createdAt.toDate().toISOString() 
              : new Date().toISOString()
          }));
      }
      
      console.log(`Found ${clientsData.length} clients`);
      setClients(clientsData);
      setFilteredClients(clientsData);
      
      // Get metrics for each client
      const metrics = {};
      await Promise.all(clientsData.map(async (client) => {
        try {
          metrics[client.id] = await fetchClientMetrics(client.id);
        } catch (err) {
          console.error(`Error fetching metrics for client ${client.id}:`, err);
          metrics[client.id] = { quotes: 0, projects: 0 };
        }
      }));
      
      setClientMetrics(metrics);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching clients:', err);
      setError('Failed to load clients. Please try again.');
      setLoading(false);
    }
  };
  
  const fetchClientMetrics = async (clientId) => {
    // Get client quotes count
    const quotesQuery = query(
      collection(db, 'quotes'),
      where('userId', '==', clientId)
    );
    const quotesSnapshot = await getDocs(quotesQuery);
    
    // Get client projects count
    const projectsQuery = query(
      collection(db, 'projects'),
      where('clientId', '==', clientId)
    );
    const projectsSnapshot = await getDocs(projectsQuery);
    
    return {
      quotes: quotesSnapshot.size,
      projects: projectsSnapshot.size
    };
  };

  const viewClientDetails = async (client) => {
    try {
      setSelectedClient(client);
      
      // Fetch the latest client data
      const clientRef = doc(db, 'users', client.id);
      const clientSnap = await getDoc(clientRef);
      
      if (clientSnap.exists()) {
        const updatedClient = {
          id: clientSnap.id,
          ...clientSnap.data(),
          displayName: clientSnap.data().displayName || clientSnap.data().name || 'Unnamed Client'
        };
        setSelectedClient(updatedClient);
      }
      
      setShowClientModal(true);
    } catch (err) {
      console.error('Error fetching client details:', err);
      toast.error('Failed to load client details');
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const result = clients.filter(client => 
        (client.displayName && client.displayName.toLowerCase().includes(term)) ||
        (client.email && client.email.toLowerCase().includes(term)) ||
        (client.company && client.company.toLowerCase().includes(term)) ||
        (client.phone && client.phone.includes(term))
      );
      setFilteredClients(result);
    } else {
      setFilteredClients(clients);
    }
  }, [searchTerm, clients]);

  const handleStatusChange = async (clientId, isActive) => {
    try {
      const clientRef = doc(db, 'users', clientId);
      const timestamp = Timestamp.fromDate(new Date());
      await updateDoc(clientRef, { 
        isActive: isActive,
        updatedAt: timestamp
      });
      
      // Update local state
      setClients(prevClients => 
        prevClients.map(client => 
          client.id === clientId ? { ...client, isActive: isActive } : client
        )
      );
      
      toast.success(`Client ${isActive ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      console.error('Error updating client status:', err);
      setError('Failed to update client status. Please try again.');
      toast.error('Failed to update client status');
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      console.error("Date formatting error:", e);
      return 'Invalid date';
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={fetchClients}
            className="mt-2 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 px-4 py-2 rounded-md text-sm font-medium flex items-center"
          >
            <FaSync className="mr-2" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Client Management</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage your client accounts
        </p>
      </div>
      
      {/* Client Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mr-4">
              <FaUsers className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Clients</p>
              <p className="text-2xl font-bold">{clients.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3 mr-4">
              <FaFileInvoiceDollar className="h-6 w-6 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Quotes</p>
              <p className="text-2xl font-bold">
                {Object.values(clientMetrics).reduce((sum, metrics) => sum + metrics.quotes, 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mr-4">
              <FaProjectDiagram className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Projects</p>
              <p className="text-2xl font-bold">
                {Object.values(clientMetrics).reduce((sum, metrics) => sum + metrics.projects, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search clients by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-md pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      {/* Client List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {filteredClients.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Activity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {client.photoURL ? (
                            <img 
                              className="h-10 w-10 rounded-full" 
                              src={client.photoURL} 
                              alt={client.displayName} 
                            />
                          ) : (
                            <FaUserCircle className="h-10 w-10 text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {client.displayName}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            ID: {client.id.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <FaEnvelope className="mr-2" />
                          {client.email}
                        </div>
                        {client.phone && (
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                            <FaPhone className="mr-2" />
                            {client.phone}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {client.company ? (
                        <div className="flex items-center">
                          <FaBuilding className="mr-2" />
                          {client.company}
                        </div>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col text-sm">
                        <div className="flex items-center mb-1">
                          <FaFileInvoiceDollar className="text-purple-500 mr-2" />
                          <span className="text-gray-900 dark:text-white">
                            {clientMetrics[client.id]?.quotes || 0} Quotes
                          </span>
                        </div>
                        <div className="flex items-center">
                          <FaProjectDiagram className="text-green-500 mr-2" />
                          <span className="text-gray-900 dark:text-white">
                            {clientMetrics[client.id]?.projects || 0} Projects
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        client.isActive === false 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      }`}>
                        {client.isActive === false ? 'Inactive' : 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => viewClientDetails(client)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          title="View client details"
                        >
                          <FaEye />
                        </button>
                        <button 
                          onClick={() => handleStatusChange(client.id, !client.isActive)}
                          className={`${
                            client.isActive ? 'text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300' : 'text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300'
                          }`}
                          title={client.isActive ? 'Deactivate client' : 'Activate client'}
                        >
                          <FaSync />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <FaUsers className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No clients found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? `No clients matching "${searchTerm}" found.` : 'There are no clients in the system yet.'}
            </p>
          </div>
        )}
      </div>
      
      {/* Client Details Modal */}
      {showClientModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Client Details</h2>
              <button
                onClick={() => setShowClientModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                  {selectedClient.photoURL ? (
                    <img src={selectedClient.photoURL} alt={selectedClient.displayName} className="w-full h-full object-cover" />
                  ) : (
                    <FaUserCircle className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{selectedClient.displayName}</h3>
                  <div className="flex items-center mt-1">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      selectedClient.isActive === false 
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                        : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    }`}>
                      {selectedClient.isActive === false ? 'Inactive' : 'Active'}
                    </span>
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                      Client since {formatDate(selectedClient.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Contact Information</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <FaEnvelope className="text-gray-400 mr-2" />
                      <span className="text-gray-900 dark:text-white">{selectedClient.email}</span>
                    </div>
                    {selectedClient.phone && (
                      <div className="flex items-center mb-2">
                        <FaPhone className="text-gray-400 mr-2" />
                        <span className="text-gray-900 dark:text-white">{selectedClient.phone}</span>
                      </div>
                    )}
                    {selectedClient.company && (
                      <div className="flex items-center">
                        <FaBuilding className="text-gray-400 mr-2" />
                        <span className="text-gray-900 dark:text-white">{selectedClient.company}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Activity</h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <FaFileInvoiceDollar className="text-purple-500 mr-2" />
                        <span className="text-gray-900 dark:text-white">Quotes</span>
                      </div>
                      <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full text-xs font-bold">
                        {clientMetrics[selectedClient.id]?.quotes || 0}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <FaProjectDiagram className="text-green-500 mr-2" />
                        <span className="text-gray-900 dark:text-white">Projects</span>
                      </div>
                      <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs font-bold">
                        {clientMetrics[selectedClient.id]?.projects || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap space-x-2">
                <Link
                  to={`/admin/quotes?clientId=${selectedClient.id}`}
                  className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-md hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center"
                >
                  <FaFileInvoiceDollar className="mr-2" /> View Quotes
                </Link>
                <Link
                  to={`/admin/projects?clientId=${selectedClient.id}`}
                  className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-4 py-2 rounded-md hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors flex items-center"
                >
                  <FaProjectDiagram className="mr-2" /> View Projects
                </Link>
                <button
                  onClick={() => handleStatusChange(selectedClient.id, !selectedClient.isActive)}
                  className={`${
                    selectedClient.isActive ? 
                      'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50' : 
                      'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/50'
                  } px-4 py-2 rounded-md transition-colors flex items-center`}
                >
                  <FaSync className="mr-2" /> 
                  {selectedClient.isActive ? 'Deactivate Client' : 'Activate Client'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement; 