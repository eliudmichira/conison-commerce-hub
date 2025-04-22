import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { FaChartBar, FaChartLine, FaChartPie, FaUsers, FaFileInvoiceDollar, FaProjectDiagram } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const AnalyticsPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState({
    conversions: {
      quotes: 0,
      projects: 0,
      conversionRate: 0
    },
    revenue: {
      monthly: [],
      total: 0,
      average: 0
    },
    services: []
  });

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        setLoading(true);
        
        // Fetch quotes data
        const quotesQuery = query(collection(db, 'quotes'));
        const quotesSnapshot = await getDocs(quotesQuery);
        const totalQuotes = quotesSnapshot.size;
        const convertedQuotes = quotesSnapshot.docs.filter(doc => 
          doc.data().status === 'converted' || doc.data().status === 'accepted'
        ).length;
        
        // Fetch projects data
        const projectsQuery = query(collection(db, 'projects'));
        const projectsSnapshot = await getDocs(projectsQuery);
        const totalProjects = projectsSnapshot.size;
        
        // Calculate conversion rate
        const conversionRate = totalQuotes > 0 ? (convertedQuotes / totalQuotes) * 100 : 0;
        
        // Fetch payments data for revenue analysis
        const paymentsQuery = query(
          collection(db, 'payments'),
          where('status', '==', 'completed'),
          orderBy('createdAt', 'desc')
        );
        const paymentsSnapshot = await getDocs(paymentsQuery);
        const payments = paymentsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          amount: parseFloat(doc.data().amount) || 0,
          createdAt: doc.data().createdAt ? new Date(doc.data().createdAt) : new Date()
        }));
        
        // Calculate total revenue
        const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
        const averageRevenue = payments.length > 0 ? totalRevenue / payments.length : 0;
        
        // Group payments by month for chart data
        const monthlyRevenue = groupByMonth(payments);
        
        // Analyze services distribution
        const servicesMap = {};
        quotesSnapshot.docs.forEach(doc => {
          const service = doc.data().serviceCategory;
          if (service) {
            servicesMap[service] = (servicesMap[service] || 0) + 1;
          }
        });
        
        const servicesDistribution = Object.entries(servicesMap).map(([name, count]) => ({
          name,
          count,
          percentage: (count / totalQuotes) * 100
        })).sort((a, b) => b.count - a.count);
        
        setAnalytics({
          conversions: {
            quotes: totalQuotes,
            projects: totalProjects,
            conversionRate: conversionRate.toFixed(1)
          },
          revenue: {
            monthly: monthlyRevenue,
            total: totalRevenue,
            average: averageRevenue
          },
          services: servicesDistribution
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to load analytics data. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchAnalyticsData();
  }, [currentUser]);
  
  // Helper function to group payments by month
  const groupByMonth = (payments) => {
    const months = {};
    
    payments.forEach(payment => {
      const date = payment.createdAt;
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      
      if (!months[monthKey]) {
        months[monthKey] = {
          month: date.toLocaleString('default', { month: 'short' }),
          year: date.getFullYear(),
          total: 0,
          count: 0
        };
      }
      
      months[monthKey].total += payment.amount;
      months[monthKey].count += 1;
    });
    
    return Object.values(months)
      .sort((a, b) => new Date(`${a.year}-${a.month}`) - new Date(`${b.year}-${b.month}`))
      .slice(-6); // Last 6 months
  };
  
  // Format currency for display
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-red-600 dark:text-red-200">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded hover:from-purple-700 hover:to-indigo-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View performance metrics and business insights
        </p>
      </div>
      
      {/* Conversion Metrics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          <FaChartBar className="inline mr-2" /> Conversion Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Quotes</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{analytics.conversions.quotes}</p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <FaFileInvoiceDollar className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{analytics.conversions.projects}</p>
              </div>
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-full">
                <FaProjectDiagram className="text-2xl text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Conversion Rate</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{analytics.conversions.conversionRate}%</p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <FaChartLine className="text-2xl text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Revenue Analysis */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          <FaChartLine className="inline mr-2" /> Revenue Analysis
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(analytics.revenue.total)}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Average Transaction</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {formatCurrency(analytics.revenue.average)}
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Growth</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {analytics.revenue.monthly.length >= 2 ? 
                `${((analytics.revenue.monthly[analytics.revenue.monthly.length - 1]?.total / 
                   (analytics.revenue.monthly[analytics.revenue.monthly.length - 2]?.total || 1) - 1) * 100).toFixed(1)}%` : 
                'N/A'}
            </p>
          </div>
        </div>
        
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-4">Monthly Revenue</h3>
          <div className="h-64 flex items-end">
            {analytics.revenue.monthly.map((month, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-purple-600 to-indigo-600 rounded-t-sm"
                  style={{ 
                    height: `${Math.min(
                      (month.total / Math.max(...analytics.revenue.monthly.map(m => m.total))) * 200, 
                      200
                    )}px` 
                  }}
                ></div>
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">{month.month}</div>
                <div className="text-xs font-medium text-gray-800 dark:text-white">{formatCurrency(month.total)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Service Distribution */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          <FaChartPie className="inline mr-2" /> Service Distribution
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="space-y-4">
            {analytics.services.map((service, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{service.name}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{service.count} quotes ({service.percentage.toFixed(1)}%)</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${service.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>This analytics data is based on your business activity on the Conison Commerce Hub platform.</p>
      </div>
    </div>
  );
};

export default AnalyticsPage; 