import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaFileInvoiceDollar, FaUserClock } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useClientData } from '../../context/ClientDataContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { quotes, projects, payments, loading } = useClientData();
  const [stats, setStats] = useState({
    totalQuotes: 0,
    activeProjects: 0,
    totalPaid: 0,
    pendingPayments: 0,
  });

  // Calculate dashboard statistics from real data
  useEffect(() => {
    if (!loading) {
      const activeProjects = projects.filter(p => p.status !== 'completed').length;
      const pendingQuotes = quotes.filter(q => q.status === 'pending').length;
      
      // Calculate total paid amount
      const totalPaid = payments.reduce((sum, payment) => {
        return payment.status === 'completed' ? sum + payment.amount : sum;
      }, 0);
      
      // Calculate pending payment amount (from approved quotes)
      const pendingPayments = quotes.reduce((sum, quote) => {
        if (quote.status === 'approved') {
          // Calculate what's already been paid for this quote
          const paidForQuote = payments.reduce((paid, payment) => {
            return payment.quoteId === quote.id && payment.status === 'completed' 
              ? paid + payment.amount 
              : paid;
          }, 0);
          
          // Add remaining amount to pending total
          return sum + (quote.amount - paidForQuote);
        }
        return sum;
      }, 0);
      
      setStats({
        totalQuotes: quotes.length,
        activeProjects,
        totalPaid,
        pendingPayments,
      });
    }
  }, [quotes, projects, payments, loading]);

  // Get recent activity (newest items first)
  const getRecentActivity = () => {
    if (loading) return [];
    
    const allActivities = [
      ...quotes.map(quote => ({
        type: 'quote',
        id: quote.id,
        title: `Quote for ${quote.service}`,
        date: quote.createdAt || quote.updatedAt,
        status: quote.status,
        amount: quote.amount
      })),
      ...payments.map(payment => ({
        type: 'payment',
        id: payment.id,
        title: `Payment for ${quotes.find(q => q.id === payment.quoteId)?.service || 'Service'}`,
        date: payment.date,
        status: payment.status,
        amount: payment.amount
      })),
      ...projects.map(project => ({
        type: 'project',
        id: project.id,
        title: project.name,
        date: project.startDate,
        status: project.status,
        progress: project.progress
      }))
    ];
    
    // Sort by date (newest first) and take the first 5
    return allActivities
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading dashboard data...</div>;
  }

  const recentActivity = getRecentActivity();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome, {currentUser?.name || 'Client'}</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's an overview of your projects and services
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 dark:text-gray-400">Total Quotes</h3>
            <FaFileInvoiceDollar className="text-purple-500 text-xl" />
          </div>
          <p className="text-2xl font-bold">{stats.totalQuotes}</p>
          <div className="mt-2">
            <Link to="/client/quotes" className="text-purple-500 text-sm hover:underline">
              View all quotes
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 dark:text-gray-400">Active Projects</h3>
            <FaFileInvoiceDollar className="text-blue-500 text-xl" />
          </div>
          <p className="text-2xl font-bold">{stats.activeProjects}</p>
          <div className="mt-2">
            <Link to="/client/projects" className="text-blue-500 text-sm hover:underline">
              View active projects
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 dark:text-gray-400">Total Paid</h3>
            <FaFileInvoiceDollar className="text-green-500 text-xl" />
          </div>
          <p className="text-2xl font-bold">${stats.totalPaid.toLocaleString()}</p>
          <div className="mt-2">
            <Link to="/client/payments" className="text-green-500 text-sm hover:underline">
              View payment history
            </Link>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-600 dark:text-gray-400">Pending Payments</h3>
            <FaFileInvoiceDollar className="text-yellow-500 text-xl" />
          </div>
          <p className="text-2xl font-bold">${stats.pendingPayments.toLocaleString()}</p>
          <div className="mt-2">
            <Link to="/client/payments/pending" className="text-yellow-500 text-sm hover:underline">
              View pending payments
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        {recentActivity.length > 0 ? (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivity.map((activity) => (
              <div key={`${activity.type}-${activity.id}`} className="py-4">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    {activity.type === 'project' ? (
                      <div>
                        <span 
                          className={`text-sm px-2 py-1 rounded-full ${
                            activity.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                          }`}
                        >
                          {activity.status === 'in_progress' ? 'In Progress' : activity.status}
                        </span>
                        <p className="text-sm mt-1">{activity.progress}% complete</p>
                      </div>
                    ) : activity.type === 'payment' ? (
                      <div>
                        <span 
                          className={`text-sm px-2 py-1 rounded-full ${
                            activity.status === 'completed' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          }`}
                        >
                          {activity.status}
                        </span>
                        <p className="text-sm mt-1">${activity.amount.toLocaleString()}</p>
                      </div>
                    ) : (
                      <div>
                        <span 
                          className={`text-sm px-2 py-1 rounded-full ${
                            activity.status === 'approved' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                              : activity.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}
                        >
                          {activity.status}
                        </span>
                        <p className="text-sm mt-1">${activity.amount.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No recent activity found.</p>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="/quote-request" 
            className="block p-4 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-lg text-center hover:bg-purple-200 dark:hover:bg-purple-800 transition duration-200"
          >
            Request a New Quote
          </Link>
          <Link 
            to="/client/payments/make" 
            className="block p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-lg text-center hover:bg-green-200 dark:hover:bg-green-800 transition duration-200"
          >
            Make a Payment
          </Link>
          <Link 
            to="/contact" 
            className="block p-4 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg text-center hover:bg-blue-200 dark:hover:bg-blue-800 transition duration-200"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 