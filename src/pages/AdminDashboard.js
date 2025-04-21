import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDarkMode } from '../context/DarkModeContext';
import { 
  FaUsers, FaFileInvoiceDollar, FaProjectDiagram, 
  FaMoneyBillWave, FaExclamationCircle, FaCheckCircle,
  FaSpinner, FaSearch, FaFilter
} from 'react-icons/fa';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase';

const AdminDashboard = () => {
  const { currentUser } = useAuth();
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState('overview');
  const [quotes, setQuotes] = useState([]);
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState({
    totalQuotes: 0,
    pendingQuotes: 0,
    completedProjects: 0,
    activeProjects: 0,
    monthlyRevenue: 0,
    totalClients: 0
  });
  
  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch quotes
        const quotesQuery = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));
        const quotesSnapshot = await getDocs(quotesQuery);
        const quotesData = quotesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toISOString() || new Date().toISOString()
        }));
        setQuotes(quotesData);
        
        // Fetch projects
        const projectsQuery = query(collection(db, 'projects'), orderBy('startDate', 'desc'));
        const projectsSnapshot = await getDocs(projectsQuery);
        const projectsData = projectsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          startDate: doc.data().startDate?.toDate().toISOString() || new Date().toISOString()
        }));
        setProjects(projectsData);
        
        // Fetch payments
        const paymentsQuery = query(collection(db, 'payments'), orderBy('date', 'desc'));
        const paymentsSnapshot = await getDocs(paymentsQuery);
        const paymentsData = paymentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date?.toDate().toISOString() || new Date().toISOString()
        }));
        setPayments(paymentsData);
        
        // Fetch users (clients)
        const usersQuery = query(collection(db, 'users'), where('role', '==', 'client'));
        const usersSnapshot = await getDocs(usersQuery);
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
        
        // Calculate statistics
        const pendingQuotes = quotesData.filter(q => q.status === 'pending').length;
        const activeProjects = projectsData.filter(p => p.status !== 'completed').length;
        
        // Calculate total revenue for current month
        const now = new Date();
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthlyPayments = paymentsData.filter(p => 
          new Date(p.date) >= monthStart && 
          p.status === 'completed'
        );
        const monthlyRevenue = monthlyPayments.reduce((sum, payment) => sum + payment.amount, 0);
        
        setStatistics({
          totalQuotes: quotesData.length,
          pendingQuotes,
          completedProjects: projectsData.filter(p => p.status === 'completed').length,
          activeProjects,
          monthlyRevenue,
          totalClients: usersData.length
        });
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load dashboard data. Please try again.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  // Get recent activity (combines quotes, projects, payments)
  const getRecentActivity = () => {
    if (loading) return [];
    
    const allActivities = [
      ...quotes.slice(0, 10).map(quote => ({
        type: 'quote',
        id: quote.id,
        title: `Quote for ${quote.service}`,
        date: quote.createdAt,
        status: quote.status,
        amount: quote.amount,
        client: quote.contactName || users.find(u => u.id === quote.userId)?.name || 'Unknown Client'
      })),
      ...payments.slice(0, 10).map(payment => ({
        type: 'payment',
        id: payment.id,
        title: `Payment for ${quotes.find(q => q.id === payment.quoteId)?.service || 'Service'}`,
        date: payment.date,
        status: payment.status,
        amount: payment.amount,
        client: payment.customerName || users.find(u => u.id === payment.userId)?.name || 'Unknown Client'
      })),
      ...projects.slice(0, 10).map(project => ({
        type: 'project',
        id: project.id,
        title: project.name,
        date: project.startDate,
        status: project.status,
        progress: project.progress || 0,
        client: project.clientName || users.find(u => u.id === project.userId)?.name || 'Unknown Client'
      }))
    ];
    
    // Sort by date (newest first) and take the first 10
    return allActivities
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-conison-magenta mx-auto"></div>
        <p className="mt-4 text-gray-700 dark:text-gray-300">Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg mb-6">
          <div className="flex items-center mb-2">
            <FaExclamationCircle className="mr-2" />
            <h3 className="font-bold">Error Loading Data</h3>
          </div>
          <p className="mb-2">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 px-4 py-2 rounded-md text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const recentActivity = getRecentActivity();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Overview of all client activities and business metrics
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 dark:text-gray-400">Pending Quotes</h3>
            <FaFileInvoiceDollar className="text-purple-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{statistics.pendingQuotes}</p>
          <div className="mt-2">
            <Link to="/admin/quotes" className="text-purple-500 text-sm hover:underline">
              View all quotes
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 dark:text-gray-400">Active Projects</h3>
            <FaProjectDiagram className="text-blue-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{statistics.activeProjects}</p>
          <div className="mt-2">
            <Link to="/admin/projects" className="text-blue-500 text-sm hover:underline">
              Manage projects
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 dark:text-gray-400">Monthly Revenue</h3>
            <FaMoneyBillWave className="text-green-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatCurrency(statistics.monthlyRevenue)}</p>
          <div className="mt-2">
            <Link to="/admin/payments" className="text-green-500 text-sm hover:underline">
              View payment history
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 dark:text-gray-400">Total Clients</h3>
            <FaUsers className="text-yellow-500 text-xl" />
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{statistics.totalClients}</p>
          <div className="mt-2">
            <Link to="/admin/clients" className="text-yellow-500 text-sm hover:underline">
              View all clients
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        {recentActivity.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {recentActivity.map((activity, idx) => (
                  <tr key={`${activity.type}-${activity.id}-${idx}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white capitalize">
                      {activity.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {activity.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {activity.client}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(activity.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        activity.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' 
                          : activity.status === 'approved' || activity.status === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : activity.status === 'rejected'
                              ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      }`}>
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link 
                        to={`/admin/${activity.type}s/${activity.id}`} 
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No recent activity found.</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link 
            to="/admin/quotes/pending" 
            className="block p-4 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200 rounded-lg text-center hover:bg-purple-200 dark:hover:bg-purple-900/50 transition duration-200"
          >
            Process Quotes
          </Link>
          <Link 
            to="/admin/projects/new" 
            className="block p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-lg text-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition duration-200"
          >
            Create Project
          </Link>
          <Link 
            to="/admin/clients" 
            className="block p-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-lg text-center hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition duration-200"
          >
            Manage Clients
          </Link>
          <Link 
            to="/admin/reports" 
            className="block p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-lg text-center hover:bg-green-200 dark:hover:bg-green-900/50 transition duration-200"
          >
            View Reports
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 