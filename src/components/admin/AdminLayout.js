import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  RiDashboardLine, 
  RiFileList3Line, 
  RiUserLine, 
  RiSettings4Line, 
  RiMenuLine, 
  RiCloseLine, 
  RiLogoutBoxRLine,
  RiNotification3Line,
  RiSearchLine,
  RiArrowDownSLine
} from 'react-icons/ri';
import { 
  FaQuoteLeft, 
  FaMoneyBillWave, 
  FaChartBar, 
  FaUsersCog, 
  FaRegCalendarAlt,
  FaChevronDown,
  FaChevronRight
} from 'react-icons/fa';
import { MdOutlinePayment, MdAnalytics, MdHelpOutline } from 'react-icons/md';
import { useAuth } from '../../context/AuthContext';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { useDarkMode } from '../../context/DarkModeContext';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickStatsOpen, setQuickStatsOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [pendingQuotes, setPendingQuotes] = useState(0);
  const [newPayments, setNewPayments] = useState(0);
  const { userData, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    // Fetch quick stats for sidebar indicators
    const fetchSidebarStats = async () => {
      try {
        // Get pending quotes count
        const quotesQuery = query(
          collection(db, 'quotes'),
          where('status', '==', 'pending')
        );
        const quotesSnapshot = await getDocs(quotesQuery);
        setPendingQuotes(quotesSnapshot.size);
        
        // Get new payments (last 24 hours)
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        // Using a simpler query to avoid index issues
        const paymentsQuery = query(
          collection(db, 'payments'),
          orderBy('createdAt', 'desc')
        );
        
        const paymentsSnapshot = await getDocs(paymentsQuery);
        const recentPayments = paymentsSnapshot.docs.filter(doc => {
          const paymentDate = doc.data().createdAt?.toDate?.() || new Date(doc.data().createdAt || 0);
          return paymentDate > yesterday;
        });
        
        setNewPayments(recentPayments.length);
      } catch (error) {
        console.error("Error fetching sidebar stats:", error);
      }
    };
    
    fetchSidebarStats();
  }, []);

  // Group menu items for better organization
  const mainMenuItems = [
    { path: '/admin', icon: <RiDashboardLine />, label: 'Dashboard', exact: true },
    { path: '/admin/clients', icon: <RiUserLine />, label: 'Clients', badge: null },
    { path: '/admin/quotes', icon: <FaQuoteLeft />, label: 'Quotes', badge: pendingQuotes > 0 ? pendingQuotes : null },
    { path: '/admin/projects', icon: <RiFileList3Line />, label: 'Projects', badge: null },
    { path: '/admin/payments', icon: <MdOutlinePayment />, label: 'Payments', badge: newPayments > 0 ? newPayments : null },
  ];
  
  const reportingItems = [
    { path: '/admin/analytics', icon: <MdAnalytics />, label: 'Analytics' },
    { path: '/admin/reports', icon: <FaChartBar />, label: 'Reports' }
  ];
  
  const systemItems = [
    { path: '/admin/settings', icon: <RiSettings4Line />, label: 'Settings' },
    { path: '/admin/user-management', icon: <FaUsersCog />, label: 'User Management' },
    { path: '/admin/help', icon: <MdHelpOutline />, label: 'Help & Support' }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:w-72 lg:min-h-screen overflow-y-auto`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <img 
              src="/images/conison_logo_large.png" 
              alt="Conison Technologies Logo" 
              className="h-8 w-auto object-contain"
            />
            <span className="ml-3 text-xl font-semibold text-gray-800 dark:text-white">Admin Portal</span>
          </div>
          <button 
            onClick={closeSidebar}
            className="lg:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <RiCloseLine className="h-6 w-6" />
          </button>
        </div>

        {/* Admin profile summary */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-conison-magenta flex items-center justify-center text-white">
              {userData?.displayName?.charAt(0) || 'A'}
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-800 dark:text-white truncate">{userData?.displayName || 'Admin'}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{userData?.email || ''}</p>
            </div>
          </div>
        </div>

        {/* Quick stats summary */}
        <div className="px-6 py-3">
          <button 
            onClick={() => setQuickStatsOpen(!quickStatsOpen)}
            className="flex items-center justify-between w-full text-left text-sm font-medium text-gray-800 dark:text-white"
          >
            <span className="flex items-center">
              <FaChartBar className="mr-2 text-conison-magenta" />
              Quick Stats
            </span>
            {quickStatsOpen ? <FaChevronDown /> : <FaChevronRight />}
          </button>
          
          {quickStatsOpen && (
            <div className="mt-3 space-y-2 pl-2">
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-750 p-2 rounded">
                <span className="text-xs text-gray-600 dark:text-gray-400">Pending Quotes</span>
                <span className="text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-2 py-1 rounded-full">{pendingQuotes}</span>
              </div>
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-750 p-2 rounded">
                <span className="text-xs text-gray-600 dark:text-gray-400">New Payments (24h)</span>
                <span className="text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full">{newPayments}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Search Bar */}
        <div className="px-6 py-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-conison-magenta"
            />
            <RiSearchLine className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Sidebar navigation */}
        <nav className="mt-3 px-3">
          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Main Menu
            </h3>
            {mainMenuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                onClick={closeSidebar}
                className={({ isActive }) => 
                  `flex items-center justify-between px-3 py-2 mt-1 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? 'bg-conison-magenta text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <div className="flex items-center">
                  <span className="mr-3 text-lg">{item.icon}</span>
                  {item.label}
                </div>
                {item.badge && (
                  <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
          
          {/* Reporting Section */}
          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Reporting
            </h3>
            <div className="mt-1">
              <button
                onClick={() => setReportsOpen(!reportsOpen)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <div className="flex items-center">
                  <FaChartBar className="mr-3 text-lg" />
                  Reports & Analytics
                </div>
                {reportsOpen ? <RiArrowDownSLine /> : <FaChevronRight />}
              </button>
              
              {reportsOpen && (
                <div className="pl-10 mt-1 space-y-1">
                  {reportingItems.map((item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={closeSidebar}
                      className={({ isActive }) => 
                        `block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                          isActive 
                            ? 'bg-conison-magenta bg-opacity-20 text-conison-magenta' 
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
        </div>
      </div>
          
          {/* System Section */}
          <div className="mb-4">
            <h3 className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              System
            </h3>
            {systemItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) => 
                  `flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-md transition-colors ${
                    isActive 
                      ? 'bg-conison-magenta text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Sidebar footer */}
        <div className="mt-auto w-full px-6 py-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <button 
              onClick={toggleDarkMode}
              className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <span className="mr-2">{isDarkMode ? '🌞' : '🌙'}</span>
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
            
            <button 
              onClick={handleLogout}
              className="flex items-center text-sm font-medium text-red-500 hover:text-red-700"
            >
              <RiLogoutBoxRLine className="mr-1" />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="bg-white dark:bg-gray-800 shadow lg:hidden">
          <div className="px-4 py-3 flex items-center justify-between">
            <button 
              onClick={toggleSidebar}
              className="text-gray-500 dark:text-gray-200 focus:outline-none"
            >
              <RiMenuLine className="h-6 w-6" />
            </button>
            <div className="flex items-center">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                {mainMenuItems.find(item => 
                  item.path === location.pathname || 
                  (item.path === '/admin' && location.pathname === '/admin/')
                )?.label || 'Admin Portal'}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <button className="text-gray-500 dark:text-gray-200">
                <RiNotification3Line className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 