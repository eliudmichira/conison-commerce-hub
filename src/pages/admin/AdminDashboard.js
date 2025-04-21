import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where, orderBy, limit, getDoc, doc } from 'firebase/firestore';
import { FaUsers, FaFileInvoiceDollar, FaProjectDiagram, FaCheckCircle, FaChartBar, FaMoneyBillWave, FaExchangeAlt, FaCalendarAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AdminDashboard = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalClients: 0,
    activeProjects: 0,
    pendingQuotes: 0,
    completedPayments: 0,
    totalRevenue: 0
  });
  const [recentClients, setRecentClients] = useState([]);
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is an admin
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Check if user is logged in
        if (!currentUser || !currentUser.uid) {
          setError("Please log in to access the admin dashboard");
          setLoading(false);
          return;
        }

        // If we already have userData and role, use that
        if (userData && userData.role === 'admin') {
          // Continue with data loading
          fetchDashboardData();
          return;
        }

        // Otherwise, fetch fresh user data to verify role
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (!userDoc.exists() || userDoc.data().role !== 'admin') {
          setError("You don't have permission to access the admin dashboard");
          setLoading(false);
          // Redirect to home after 3 seconds
          setTimeout(() => navigate('/'), 3000);
          return;
        }

        // If we reach here, the user is an admin
        fetchDashboardData();
      } catch (err) {
        console.error("Error checking admin access:", err);
        setError("Authentication error. Please try logging in again.");
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, [currentUser, userData, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Get total clients
      const clientsSnapshot = await getDocs(collection(db, 'users'));
      const totalClients = clientsSnapshot.docs.filter(doc => doc.data().role === 'client').length;
      
      // Get active projects
      const projectsQuery = query(
        collection(db, 'projects'),
        where('status', '==', 'active')
      );
      const projectsSnapshot = await getDocs(projectsQuery);
      const activeProjects = projectsSnapshot.size;
      
      // Get pending quotes
      const quotesQuery = query(
        collection(db, 'quotes'),
        where('status', '==', 'pending')
      );
      const quotesSnapshot = await getDocs(quotesQuery);
      const pendingQuotes = quotesSnapshot.size;
      
      // Get completed payments and calculate total revenue
      const paymentsQuery = query(
        collection(db, 'payments'),
        where('status', '==', 'completed')
      );
      const paymentsSnapshot = await getDocs(paymentsQuery);
      const completedPayments = paymentsSnapshot.size;
      const totalRevenue = paymentsSnapshot.docs.reduce(
        (sum, doc) => sum + (parseFloat(doc.data().amount) || 0), 0
      );
      
      // Get recent clients (users with role 'client')
      const usersQuery = query(
        collection(db, 'users'),
        where('role', '==', 'client'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const usersSnapshot = await getDocs(usersQuery);
      const recentClientsData = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt ? new Date(doc.data().createdAt) : new Date()
      }));
      
      // Get recent quotes
      const recentQuotesQuery = query(
        collection(db, 'quotes'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const recentQuotesSnapshot = await getDocs(recentQuotesQuery);
      const recentQuotesData = recentQuotesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt ? new Date(doc.data().createdAt) : new Date()
      }));
      
      // Get recent payments
      const recentPaymentsQuery = query(
        collection(db, 'payments'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const recentPaymentsSnapshot = await getDocs(recentPaymentsQuery);
      const recentPaymentsData = recentPaymentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt ? doc.data().createdAt.toDate ? doc.data().createdAt.toDate() : new Date(doc.data().createdAt) : new Date()
      }));
      
      // Update state with all data
      setStats({
        totalClients,
        activeProjects,
        pendingQuotes,
        completedPayments,
        totalRevenue
      });
      setRecentClients(recentClientsData);
      setRecentQuotes(recentQuotesData);
      setRecentPayments(recentPaymentsData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again later.");
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    if (isNaN(date.getTime())) return 'Invalid date';
    
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-red-600 dark:text-red-200">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-conison-blue text-white rounded hover:bg-conison-blue-dark"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Admin Dashboard</h1>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Link 
            to="/admin/payments" 
            className="inline-flex items-center px-4 py-2 bg-conison-blue text-white rounded hover:bg-conison-blue-dark transition"
          >
            <FaMoneyBillWave className="mr-2" /> Manage Payments
          </Link>
          <Link 
            to="/admin/quotes" 
            className="inline-flex items-center px-4 py-2 bg-conison-magenta text-white rounded hover:bg-purple-700 transition"
          >
            <FaFileInvoiceDollar className="mr-2" /> Manage Quotes
          </Link>
        </div>
      </header>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-blue-100 dark:bg-blue-900 p-3 mr-4">
            <FaUsers className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Clients</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">{stats.totalClients}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mr-4">
            <FaProjectDiagram className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Projects</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">{stats.activeProjects}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-yellow-100 dark:bg-yellow-900 p-3 mr-4">
            <FaFileInvoiceDollar className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Pending Quotes</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">{stats.pendingQuotes}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-purple-100 dark:bg-purple-900 p-3 mr-4">
            <FaCheckCircle className="h-6 w-6 text-purple-600 dark:text-purple-300" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Completed Payments</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">{stats.completedPayments}</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex items-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mr-4">
            <FaMoneyBillWave className="h-6 w-6 text-green-600 dark:text-green-300" />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
            <p className="text-2xl font-semibold text-gray-800 dark:text-white">{formatCurrency(stats.totalRevenue)}</p>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <FaCalendarAlt className="mr-2 text-conison-blue" /> Recent Activity
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex -mb-px">
              <button className="border-b-2 border-conison-magenta py-4 px-6 font-medium text-conison-magenta">
                Overview
              </button>
            </nav>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Recent Payments */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                  <FaExchangeAlt className="mr-2 text-green-500" /> Recent Payments
                </h3>
                <div className="space-y-3">
                  {recentPayments.length > 0 ? (
                    recentPayments.map(payment => (
                      <div key={payment.id} className="flex items-center p-2 border-b border-gray-200 dark:border-gray-600">
                        <div className={`w-3 h-3 rounded-full mr-3 ${payment.status === 'completed' ? 'bg-green-500' : payment.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{payment.customerName || payment.email || 'Unknown client'}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(payment.createdAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(payment.amount)}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{payment.status || 'Unknown'}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent payments found</p>
                  )}
                </div>
                <div className="mt-4 text-right">
                  <Link to="/admin/payments" className="text-sm text-conison-magenta hover:text-conison-blue">
                    View all payments →
                  </Link>
                </div>
              </div>
              
              {/* Recent Clients */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                  <FaUsers className="mr-2 text-blue-500" /> Recent Clients
                </h3>
                <div className="space-y-3">
                  {recentClients.length > 0 ? (
                    recentClients.map(client => (
                      <div key={client.id} className="flex items-center p-2 border-b border-gray-200 dark:border-gray-600">
                        <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-3 text-gray-700 dark:text-gray-300 font-medium">
                          {client.name ? client.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{client.name || 'Unnamed'}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{client.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(client.createdAt)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent clients found</p>
                  )}
                </div>
                <div className="mt-4 text-right">
                  <Link to="/admin/client-management" className="text-sm text-conison-magenta hover:text-conison-blue">
                    View all clients →
                  </Link>
                </div>
              </div>
              
              {/* Recent Quotes */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-3 flex items-center">
                  <FaFileInvoiceDollar className="mr-2 text-yellow-500" /> Recent Quotes
                </h3>
                <div className="space-y-3">
                  {recentQuotes.length > 0 ? (
                    recentQuotes.map(quote => (
                      <div key={quote.id} className="flex items-center p-2 border-b border-gray-200 dark:border-gray-600">
                        <div className={`w-3 h-3 rounded-full mr-3 ${quote.status === 'approved' ? 'bg-green-500' : quote.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{quote.clientName || quote.contactName || 'Unknown client'}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{quote.service || 'Service not specified'}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{formatCurrency(quote.amount)}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{quote.status || 'Unknown'}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-4">No recent quotes found</p>
                  )}
                </div>
                <div className="mt-4 text-right">
                  <Link to="/admin/quote-management" className="text-sm text-conison-magenta hover:text-conison-blue">
                    View all quotes →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Analytics Preview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
          <FaChartBar className="mr-2 text-conison-blue" /> Business Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Revenue Summary</h3>
            <div className="h-40 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Total Revenue</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                  From {stats.completedPayments} completed payments
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Conversion Rate</h3>
            <div className="h-40 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {stats.pendingQuotes > 0 ? 
                    `${Math.round((stats.activeProjects / stats.pendingQuotes) * 100)}%` : 
                    'N/A'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Quote to Project Conversion</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Client Growth</h3>
            <div className="h-40 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.totalClients}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Total Client Accounts</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                  {recentClients.length} new clients in the last 30 days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 