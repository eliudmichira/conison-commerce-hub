import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { isDarkMode } = useDarkMode();
  const [activeTab, setActiveTab] = useState('overview');
  const [quotes, setQuotes] = useState([]);
  const [statistics, setStatistics] = useState({
    totalQuotes: 0,
    pendingQuotes: 0,
    completedProjects: 0,
    activeProjects: 0,
    monthlyRevenue: 0
  });
  
  // Mock data - in a real app, fetch from API
  useEffect(() => {
    // Simulate API call to fetch quotes
    const mockQuotes = [
      { id: 1, name: 'John Doe', email: 'john@example.com', service: 'Web Development', date: '2023-04-01', status: 'pending' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', service: 'Graphic Design', date: '2023-04-02', status: 'contacted' },
      { id: 3, name: 'Robert Brown', email: 'robert@example.com', service: 'Digital Marketing', date: '2023-04-03', status: 'approved' },
      { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', service: 'Web Development', date: '2023-04-05', status: 'pending' },
      { id: 5, name: 'Michael Davis', email: 'michael@example.com', service: 'SEO', date: '2023-04-06', status: 'completed' }
    ];
    
    setQuotes(mockQuotes);
    
    // Set mock statistics
    setStatistics({
      totalQuotes: 32,
      pendingQuotes: 12,
      completedProjects: 45,
      activeProjects: 8,
      monthlyRevenue: 350000
    });
  }, []);
  
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Admin Header/Navigation */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Admin
              </span>
              <button className="ml-4 p-1 rounded-full text-gray-500 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-200">
                <span className="sr-only">Notifications</span>
                <svg className="h-6 w-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
              </button>
              <Link to="/" className="ml-4 px-3 py-1 rounded text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Return to Site
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Dashboard Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`mr-8 py-4 px-1 ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('quotes')}
              className={`mr-8 py-4 px-1 ${
                activeTab === 'quotes'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Quote Requests
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`mr-8 py-4 px-1 ${
                activeTab === 'projects'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`mr-8 py-4 px-1 ${
                activeTab === 'services'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 font-medium'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Services
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="mt-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Stat Card - Total Quotes */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Total Quotes</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{statistics.totalQuotes}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stat Card - Pending Quotes */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Pending Quotes</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{statistics.pendingQuotes}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stat Card - Active Projects */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Active Projects</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{statistics.activeProjects}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Stat Card - Monthly Revenue */}
                <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                        <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">Monthly Revenue</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900 dark:text-white">{formatCurrency(statistics.monthlyRevenue)}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Quotes Section */}
              <div className="mt-8">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Quote Requests</h2>
                <div className="mt-4 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {quotes.slice(0, 5).map((quote) => (
                        <tr key={quote.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{quote.name}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">{quote.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 dark:text-white">{quote.service}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 dark:text-gray-400">{quote.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
                              ${quote.status === 'contacted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''}
                              ${quote.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                              ${quote.status === 'completed' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' : ''}
                            `}>
                              {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          
          {/* Quotes Tab */}
          {activeTab === 'quotes' && (
            <div>
              <div className="flex justify-between mb-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">Quote Requests</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search quotes..."
                    className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Service</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {quotes.map((quote) => (
                      <tr key={quote.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">{quote.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">{quote.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 dark:text-white">{quote.service}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 dark:text-gray-400">{quote.date}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${quote.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : ''}
                            ${quote.status === 'contacted' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : ''}
                            ${quote.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : ''}
                            ${quote.status === 'completed' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' : ''}
                          `}>
                            {quote.status.charAt(0).toUpperCase() + quote.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3">View</button>
                          <button className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">Process</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Project Management</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  Project management functionality will be implemented in the next iteration. This will include project tracking, 
                  task assignment, timeline management, and client communication tools.
                </p>
              </div>
            </div>
          )}
          
          {/* Services Tab */}
          {activeTab === 'services' && (
            <div>
              <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Service Management</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Manage your service offerings, prices, and descriptions. This section will be enhanced with more features in future updates.
                </p>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <div className="flex justify-between mb-4">
                    <h3 className="text-md font-medium text-gray-900 dark:text-white">Services List</h3>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                      Add New Service
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Service Card */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Web Development</h4>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Professional website development services for businesses and individuals.
                        </div>
                        <div className="flex justify-between">
                          <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Edit</button>
                          <div className="text-sm text-gray-500 dark:text-gray-400">3 categories</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Service Card */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Graphic Design</h4>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Creative design solutions for branding, marketing, and digital assets.
                        </div>
                        <div className="flex justify-between">
                          <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Edit</button>
                          <div className="text-sm text-gray-500 dark:text-gray-400">5 categories</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Service Card */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Digital Marketing</h4>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Comprehensive marketing strategies for online businesses.
                        </div>
                        <div className="flex justify-between">
                          <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">Edit</button>
                          <div className="text-sm text-gray-500 dark:text-gray-400">4 categories</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 