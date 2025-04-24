import React, { useState, useEffect, useMemo } from 'react';
import { collection, getDocs, doc, updateDoc, query, orderBy, where, Timestamp, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import toast from 'react-hot-toast';
import { FaEye, FaEdit, FaSearch, FaFileExport, FaChartBar } from 'react-icons/fa';
import { formatCurrency, formatDate } from '../../utils/helpers';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import Modal from '../../components/ui/Modal';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAnalyticsModalOpen, setIsAnalyticsModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [paymentForm, setPaymentForm] = useState({
    status: '',
    notes: '',
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      let paymentsQuery = query(
        collection(db, "payments"), 
        orderBy("createdAt", "desc")
      );
      
      // Apply date filters if provided
      if (dateRange.startDate && dateRange.endDate) {
        const startTimestamp = Timestamp.fromDate(new Date(dateRange.startDate));
        const endTimestamp = Timestamp.fromDate(new Date(dateRange.endDate));
        paymentsQuery = query(
          collection(db, "payments"),
          where("createdAt", ">=", startTimestamp),
          where("createdAt", "<=", endTimestamp),
          orderBy("createdAt", "desc")
        );
      }
      
      const paymentsSnapshot = await getDocs(paymentsQuery);
      const paymentsList = paymentsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));
      setPayments(paymentsList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching payments: ", error);
      toast.error("Failed to load payments");
      setLoading(false);
    }
  };

  const handleViewPayment = (payment) => {
    setSelectedPayment(payment);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (payment) => {
    setSelectedPayment(payment);
    setPaymentForm({
      status: payment.status || '',
      notes: payment.notes || '',
    });
    setIsEditModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm({
      ...paymentForm,
      [name]: value
    });
  };

  const handleUpdatePayment = async (e) => {
    e.preventDefault();
    if (!selectedPayment) return;

    try {
      setLoading(true);
      const paymentRef = doc(db, "payments", selectedPayment.id);
      await updateDoc(paymentRef, {
        status: paymentForm.status,
        notes: paymentForm.notes,
        updatedAt: new Date()
      });
      toast.success("Payment updated successfully");
      setIsEditModalOpen(false);
      fetchPayments();
    } catch (error) {
      console.error("Error updating payment: ", error);
      toast.error("Failed to update payment");
    } finally {
      setLoading(false);
    }
  };

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleExportCSV = () => {
    try {
      const headers = [
        'Transaction ID',
        'Customer Name',
        'Email',
        'Amount',
        'Date',
        'Status',
        'Payment Method',
        'Notes'
      ];
      
      const csvContent = [
        headers.join(','),
        ...filteredPayments.map(payment => [
          payment.transactionId || payment.id,
          (payment.customerName || payment.fullName || 'N/A').replace(/,/g, ' '),
          (payment.email || 'N/A').replace(/,/g, ' '),
          payment.amount,
          payment.createdAt.toISOString().split('T')[0],
          payment.status || 'Unknown',
          payment.paymentMethod || 'Paystack',
          (payment.notes || '').replace(/,/g, ' ').replace(/\n/g, ' ')
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `payments-export-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Payments exported successfully');
    } catch (error) {
      console.error('Error exporting payments:', error);
      toast.error('Failed to export payments');
    }
  };

  // Calculate payment analytics
  const paymentAnalytics = useMemo(() => {
    if (!payments.length) return {};
    
    // Total revenue
    const totalRevenue = payments.reduce((sum, payment) => 
      payment.status === 'completed' ? sum + (parseFloat(payment.amount) || 0) : sum, 0);
    
    // Count by status
    const statusCounts = payments.reduce((acc, payment) => {
      const status = payment.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    
    // Total transactions count
    const totalTransactions = payments.length;
    
    // Average transaction value
    const avgTransactionValue = totalRevenue / (statusCounts.completed || 1);
    
    return {
      totalRevenue,
      statusCounts,
      totalTransactions,
      avgTransactionValue
    };
  }, [payments]);

  // Filter payments based on search term and status
  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      // Filter by status
      const statusMatch = statusFilter === 'all' || payment.status === statusFilter;
      
      // Filter by search term
      const searchTermLower = searchTerm.toLowerCase();
      const searchMatch = !searchTerm || 
        (payment.transactionId && payment.transactionId.toLowerCase().includes(searchTermLower)) ||
        (payment.customerName && payment.customerName.toLowerCase().includes(searchTermLower)) ||
        (payment.email && payment.email.toLowerCase().includes(searchTermLower)) ||
        (payment.id && payment.id.toLowerCase().includes(searchTermLower));
      
      return statusMatch && searchMatch;
    });
  }, [payments, statusFilter, searchTerm]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'refunded':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">Payment Management</h1>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsAnalyticsModalOpen(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            <FaChartBar className="mr-2" /> Analytics
          </button>
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none"
          >
            <FaFileExport className="mr-2" /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Filter by Status</label>
            <select
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-conison-magenta"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Payments</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by transaction ID, customer, or email"
                className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-conison-magenta"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={dateRange.startDate}
              onChange={handleDateRangeChange}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-conison-magenta"
            />
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={dateRange.endDate}
              onChange={handleDateRangeChange}
              className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-conison-magenta"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={fetchPayments}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              Apply Filters
            </button>
          </div>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                      No payments found
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{payment.transactionId || payment.id.slice(0, 8)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{payment.customerName || payment.fullName || "N/A"}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{payment.email || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{formatCurrency(payment.amount)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {payment.createdAt.toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(payment.status)}`}>
                          {payment.status?.charAt(0).toUpperCase() + payment.status?.slice(1) || "Unknown"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewPayment(payment)}
                          className="text-conison-blue-dark dark:text-blue-400 hover:text-conison-blue mr-3"
                          title="View details"
                        >
                          <FaEye className="inline" />
                        </button>
                        <button
                          onClick={() => handleEditClick(payment)}
                          className="text-conison-blue-dark dark:text-blue-400 hover:text-conison-blue"
                          title="Edit payment"
                        >
                          <FaEdit className="inline" />
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

      {/* View Payment Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)} title="Payment Details">
        {selectedPayment && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Transaction ID</h3>
                <p className="text-gray-900 dark:text-white">{selectedPayment.transactionId || selectedPayment.id}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Amount</h3>
                <p className="text-gray-900 dark:text-white">{formatCurrency(selectedPayment.amount)}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Customer</h3>
                <p className="text-gray-900 dark:text-white">{selectedPayment.customerName || selectedPayment.fullName || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Email</h3>
                <p className="text-gray-900 dark:text-white">{selectedPayment.email || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                <p className="text-gray-900 dark:text-white">{selectedPayment.phone || "N/A"}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Status</h3>
                <p className="text-gray-900 dark:text-white">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(selectedPayment.status)}`}>
                    {selectedPayment.status?.charAt(0).toUpperCase() + selectedPayment.status?.slice(1) || "Unknown"}
                  </span>
                </p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Payment Date</h3>
                <p className="text-gray-900 dark:text-white">{selectedPayment.createdAt.toLocaleString()}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Payment Method</h3>
                <p className="text-gray-900 dark:text-white">{selectedPayment.paymentMethod || "Paystack"}</p>
              </div>
            </div>
            
            {selectedPayment.quoteId && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Quote Reference</h3>
                <p className="text-gray-900 dark:text-white">{selectedPayment.quoteId}</p>
              </div>
            )}
            
            {selectedPayment.notes && (
              <div className="mb-4">
                <h3 className="font-medium text-gray-500 dark:text-gray-400">Notes</h3>
                <p className="text-gray-900 dark:text-white whitespace-pre-line">{selectedPayment.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Edit Payment Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} title="Edit Payment">
        {selectedPayment && (
          <form onSubmit={handleUpdatePayment} className="p-4">
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Payment Status
              </label>
              <select
                name="status"
                value={paymentForm.status}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="">Select Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Admin Notes
              </label>
              <textarea
                name="notes"
                value={paymentForm.notes}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-white h-32"
                placeholder="Add notes about this payment (only visible to admins)"
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-conison-magenta text-white px-4 py-2 rounded-md"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Payment'}
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Analytics Modal */}
      <Modal isOpen={isAnalyticsModalOpen} onClose={() => setIsAnalyticsModalOpen(false)} title="Payment Analytics">
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Total Revenue</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(paymentAnalytics.totalRevenue || 0)}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Transactions</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {paymentAnalytics.totalTransactions || 0}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Average Value</h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {formatCurrency(paymentAnalytics.avgTransactionValue || 0)}
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Completion Rate</h3>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {paymentAnalytics.statusCounts && paymentAnalytics.totalTransactions ? 
                  `${Math.round((paymentAnalytics.statusCounts.completed || 0) / paymentAnalytics.totalTransactions * 100)}%` : 
                  '0%'}
              </p>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Payment Status Distribution</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {paymentAnalytics.statusCounts && Object.entries(paymentAnalytics.statusCounts).map(([status, count]) => (
                <div key={status} className="text-center">
                  <div className={`inline-block w-4 h-4 rounded-full ${getStatusBadgeClass(status)} mb-2`}></div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{status}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{count}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentManagement; 