import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { FaFilePdf, FaFileExcel, FaFileAlt, FaDownload, FaFilter } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const ReportsPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({
    type: 'all',
    period: 'month'
  });

  // Available report types
  const reportTypes = [
    { id: 'financial', name: 'Financial Reports', icon: <FaFilePdf /> },
    { id: 'client', name: 'Client Reports', icon: <FaFileExcel /> },
    { id: 'project', name: 'Project Reports', icon: <FaFileAlt /> },
    { id: 'sales', name: 'Sales Reports', icon: <FaFileExcel /> }
  ];

  useEffect(() => {
    const fetchReportsList = async () => {
      try {
        setLoading(true);
        
        // Mock report data (in a real app, this would come from Firebase)
        const mockReports = [
          {
            id: 'financial-monthly',
            name: 'Monthly Financial Summary',
            description: 'Financial overview including revenue, payments, and expenses',
            type: 'financial',
            period: 'month',
            lastGenerated: new Date(),
            formats: ['pdf', 'excel']
          },
          {
            id: 'client-activity',
            name: 'Client Activity Report',
            description: 'Report on client engagement and interaction metrics',
            type: 'client',
            period: 'month',
            lastGenerated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
            formats: ['pdf', 'excel']
          },
          {
            id: 'project-status',
            name: 'Project Status Summary',
            description: 'Overview of all projects and their current statuses',
            type: 'project',
            period: 'current',
            lastGenerated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
            formats: ['pdf', 'excel']
          },
          {
            id: 'sales-quarterly',
            name: 'Quarterly Sales Report',
            description: 'Detailed breakdown of sales by service category and client type',
            type: 'sales',
            period: 'quarter',
            lastGenerated: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
            formats: ['pdf', 'excel', 'csv']
          },
          {
            id: 'client-retention',
            name: 'Client Retention Analysis',
            description: 'Analysis of client retention rates and repeat business',
            type: 'client',
            period: 'year',
            lastGenerated: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
            formats: ['pdf', 'excel']
          },
          {
            id: 'project-completion',
            name: 'Project Completion Times',
            description: 'Analysis of project timelines and completion efficiency',
            type: 'project',
            period: 'quarter',
            lastGenerated: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
            formats: ['pdf', 'excel']
          }
        ];
        
        // In a real application, we would fetch reports from Firestore
        // const reportsQuery = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
        // const reportsSnapshot = await getDocs(reportsQuery);
        // const reportsData = reportsSnapshot.docs.map(doc => ({
        //   id: doc.id,
        //   ...doc.data()
        // }));
        
        setReports(mockReports);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Failed to load reports. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchReportsList();
  }, [currentUser]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenerateReport = (reportId) => {
    // In a real application, this would trigger a report generation process
    alert(`Generating report: ${reportId}`);
  };

  const handleDownloadReport = (reportId, format) => {
    // In a real application, this would download the report
    alert(`Downloading report ${reportId} in ${format.toUpperCase()} format`);
  };

  // Format date for display
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Filter reports based on selected criteria
  const filteredReports = reports.filter(report => {
    if (filters.type !== 'all' && report.type !== filters.type) return false;
    if (filters.period !== 'all' && report.period !== filters.period) return false;
    return true;
  });

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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate and download business reports
        </p>
      </div>
      
      {/* Filters */}
      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex items-center mb-4">
          <FaFilter className="text-gray-500 dark:text-gray-400 mr-2" />
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Filters</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Report Type
            </label>
            <select
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              className="block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Types</option>
              {reportTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Time Period
            </label>
            <select
              name="period"
              value={filters.period}
              onChange={handleFilterChange}
              className="block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Periods</option>
              <option value="month">Monthly</option>
              <option value="quarter">Quarterly</option>
              <option value="year">Yearly</option>
              <option value="current">Current (Live)</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Report Categories */}
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportTypes.map(type => (
          <div key={type.id} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className={`p-4 ${
              type.id === 'financial' ? 'bg-blue-500' :
              type.id === 'client' ? 'bg-green-500' :
              type.id === 'project' ? 'bg-purple-500' :
              'bg-orange-500'
            } text-white flex items-center justify-between`}>
              <span className="text-lg font-medium">{type.name}</span>
              {type.icon}
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {reports.filter(r => r.type === type.id).length} reports available
              </p>
              <button 
                onClick={() => setFilters(prev => ({ ...prev, type: type.id }))}
                className="mt-2 w-full px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                View Reports
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Reports List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">Available Reports</h2>
        </div>
        
        {filteredReports.length === 0 ? (
          <div className="p-6 text-center text-gray-500 dark:text-gray-400">
            No reports match your selected filters. Try adjusting your criteria.
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredReports.map(report => (
              <div key={report.id} className="p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                      {report.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {report.description}
                    </p>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-500">
                      <span>Last generated: {formatDate(report.lastGenerated)}</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{report.period}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => handleGenerateReport(report.id)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded hover:from-purple-700 hover:to-indigo-700 flex items-center justify-center"
                    >
                      <FaFileAlt className="mr-2" /> 
                      Generate
                    </button>
                    
                    <div className="flex gap-2">
                      {report.formats.map(format => (
                        <button
                          key={format}
                          onClick={() => handleDownloadReport(report.id, format)}
                          className={`px-3 py-2 border border-gray-300 dark:border-gray-600 rounded flex items-center justify-center
                            ${format === 'pdf' ? 'text-red-700 dark:text-red-400' : 
                              format === 'excel' ? 'text-green-700 dark:text-green-400' : 
                              'text-blue-700 dark:text-blue-400'}`}
                          title={`Download as ${format.toUpperCase()}`}
                        >
                          <FaDownload className="mr-1" /> 
                          {format.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Reports are generated based on your business data and updated regularly.</p>
      </div>
    </div>
  );
};

export default ReportsPage; 