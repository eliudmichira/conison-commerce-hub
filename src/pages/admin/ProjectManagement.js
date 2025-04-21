import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { formatCurrency } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Modal from '../../components/ui/Modal';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [projectForm, setProjectForm] = useState({
    status: '',
    notes: '',
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const projectsQuery = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const projectsSnapshot = await getDocs(projectsQuery);
      const projectsList = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      setProjects(projectsList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects: ", error);
      toast.error("Failed to load projects");
      setLoading(false);
    }
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (project) => {
    setSelectedProject(project);
    setProjectForm({
      status: project.status,
      notes: project.notes || '',
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (project) => {
    setSelectedProject(project);
    setIsDeleteModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProjectForm({
      ...projectForm,
      [name]: value
    });
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    if (!selectedProject) return;

    try {
      setLoading(true);
      const projectRef = doc(db, "projects", selectedProject.id);
      await updateDoc(projectRef, {
        status: projectForm.status,
        notes: projectForm.notes,
        updatedAt: new Date()
      });
      toast.success("Project updated successfully");
      setIsEditModalOpen(false);
      fetchProjects();
    } catch (error) {
      console.error("Error updating project: ", error);
      toast.error("Failed to update project");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async () => {
    try {
      setLoading(true);
      await deleteDoc(doc(db, "projects", selectedProject.id));
      toast.success("Project deleted successfully");
      setIsDeleteModalOpen(false);
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project: ", error);
      toast.error("Failed to delete project");
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = statusFilter === 'all' 
    ? projects 
    : projects.filter(project => project.status === statusFilter);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Project Management</h1>
        <div className="flex items-center">
          <select
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2 mr-4 focus:outline-none focus:ring-2 focus:ring-conison-magenta"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Projects</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProjects.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      No projects found
                    </td>
                  </tr>
                ) : (
                  filteredProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{project.projectName || project.title || "Unnamed Project"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{project.clientName || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{formatCurrency(project.totalAmount || 0)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(project.status)}`}>
                          {project.status?.charAt(0).toUpperCase() + project.status?.slice(1).replace('-', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {project.createdAt?.toLocaleDateString() || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewProject(project)}
                          className="text-conison-blue-dark dark:text-blue-400 hover:text-conison-blue mr-3"
                        >
                          <FaEye className="inline" />
                        </button>
                        <button
                          onClick={() => handleEditClick(project)}
                          className="text-conison-blue-dark dark:text-blue-400 hover:text-conison-blue mr-3"
                        >
                          <FaEdit className="inline" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(project)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900"
                        >
                          <FaTrash className="inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View Project Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Project Details">
        {selectedProject && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Project Name</h3>
                <p className="text-gray-900 dark:text-white">{selectedProject.projectName || selectedProject.title || "Unnamed Project"}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Client</h3>
                <p className="text-gray-900 dark:text-white">{selectedProject.clientName || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Total Value</h3>
                <p className="text-gray-900 dark:text-white">{formatCurrency(selectedProject.totalAmount || 0)}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Status</h3>
                <p className="text-gray-900 dark:text-white">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedProject.status)}`}>
                    {selectedProject.status?.charAt(0).toUpperCase() + selectedProject.status?.slice(1).replace('-', ' ')}
                  </span>
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Created</h3>
                <p className="text-gray-900 dark:text-white">{selectedProject.createdAt?.toLocaleDateString() || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Last Updated</h3>
                <p className="text-gray-900 dark:text-white">{selectedProject.updatedAt?.toDate().toLocaleDateString() || "N/A"}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-medium text-gray-500 dark:text-gray-400">Description</h3>
              <p className="text-gray-900 dark:text-white whitespace-pre-line">{selectedProject.description || "No description available"}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-500 dark:text-gray-400">Notes</h3>
              <p className="text-gray-900 dark:text-white whitespace-pre-line">{selectedProject.notes || "No notes available"}</p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-conison-magenta"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Project Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Project">
        {selectedProject && (
          <form onSubmit={handleUpdateProject} className="p-4">
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={projectForm.status}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="notes">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={projectForm.notes}
                onChange={handleInputChange}
                rows="4"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-white dark:bg-gray-700 dark:border-gray-600 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="mr-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-conison-magenta"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-conison-magenta text-white rounded-md hover:bg-conison-magenta-dark focus:outline-none focus:ring-2 focus:ring-conison-magenta"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update Project"}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title="Delete Project">
        <div className="p-4">
          <p className="mb-4 text-gray-700 dark:text-gray-300">Are you sure you want to delete this project? This action cannot be undone.</p>
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={() => setIsDeleteModalOpen(false)}
              className="mr-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-conison-magenta"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDeleteProject}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Project"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectManagement; 