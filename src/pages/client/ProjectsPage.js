import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useClientData } from '../../context/ClientDataContext';
import { motion } from 'framer-motion';
import { 
  FaExclamationCircle, 
  FaCheckCircle, 
  FaClipboardCheck,
  FaHourglassHalf, 
  FaStopwatch,
  FaChartLine
} from 'react-icons/fa';

const ProjectsPage = () => {
  const { projects, loading } = useClientData();
  const [filter, setFilter] = useState('all');

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.status === filter);
  
  // Sort by date (newest first)
  const sortedProjects = [...filteredProjects].sort((a, b) => 
    new Date(b.startDate) - new Date(a.startDate)
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case 'starting':
        return <FaStopwatch className="text-blue-500" />;
      case 'in_progress':
        return <FaHourglassHalf className="text-yellow-500" />;
      case 'completed':
        return <FaCheckCircle className="text-green-500" />;
      default:
        return <FaExclamationCircle className="text-gray-500" />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'starting':
        return 'bg-blue-100 text-blue-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-conison-magenta"></div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Your Projects</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track progress and manage your projects with Conison
        </p>
      </motion.div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`py-4 px-6 font-medium text-sm focus:outline-none whitespace-nowrap ${
                filter === 'all'
                  ? 'border-b-2 border-conison-magenta text-conison-magenta'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              All Projects ({projects.length})
            </button>
            <button
              onClick={() => setFilter('starting')}
              className={`py-4 px-6 font-medium text-sm focus:outline-none whitespace-nowrap ${
                filter === 'starting'
                  ? 'border-b-2 border-conison-magenta text-conison-magenta'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Starting ({projects.filter(p => p.status === 'starting').length})
            </button>
            <button
              onClick={() => setFilter('in_progress')}
              className={`py-4 px-6 font-medium text-sm focus:outline-none whitespace-nowrap ${
                filter === 'in_progress'
                  ? 'border-b-2 border-conison-magenta text-conison-magenta'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              In Progress ({projects.filter(p => p.status === 'in_progress').length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`py-4 px-6 font-medium text-sm focus:outline-none whitespace-nowrap ${
                filter === 'completed'
                  ? 'border-b-2 border-conison-magenta text-conison-magenta'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Completed ({projects.filter(p => p.status === 'completed').length})
            </button>
          </nav>
        </div>

        <div className="p-6">
          {sortedProjects.length > 0 ? (
            <div className="space-y-8">
              {sortedProjects.map((project) => (
                <motion.div 
                  key={project.id}
                  className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <div className="flex items-center">
                        <FaChartLine className="text-conison-magenta text-xl mr-3" />
                        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                          {project.name}
                        </h2>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusClass(project.status)}`}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1 capitalize">{project.status.replace('_', ' ')}</span>
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {project.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Project Timeline</h3>
                        <div className="flex flex-col space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Start Date:</span>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                              {new Date(project.startDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Estimated Completion:</span>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                              {new Date(project.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Progress</h3>
                        <div className="w-full mb-1">
                          <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                            {project.progress}%
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-conison-magenta h-2.5 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Milestones</h3>
                      <div className="space-y-2">
                        {project.milestones.map((milestone, index) => (
                          <div 
                            key={index} 
                            className="flex items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
                          >
                            <div className={`flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-3 ${
                              milestone.completed 
                                ? 'bg-green-100 text-green-500' 
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              {milestone.completed ? (
                                <FaClipboardCheck className="h-3 w-3" />
                              ) : (
                                <div className="h-2 w-2 rounded-full bg-current" />
                              )}
                            </div>
                            <span className={`text-sm ${
                              milestone.completed 
                                ? 'text-gray-800 dark:text-white font-medium line-through opacity-75' 
                                : 'text-gray-600 dark:text-gray-300'
                            }`}>
                              {milestone.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Project ID: {project.id}
                      </div>
                      <Link 
                        to={`/client/projects/${project.id}`}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-conison-magenta hover:bg-conison-cyan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-conison-yellow"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FaExclamationCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {filter === 'all' 
                  ? "You don't have any projects yet." 
                  : `You don't have any ${filter.replace('_', ' ')} projects.`}
              </p>
              <Link
                to="/client/quotes"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-conison-magenta hover:bg-conison-cyan focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-conison-yellow"
              >
                View Quotes
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage; 