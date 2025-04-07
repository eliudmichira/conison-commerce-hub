import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebar } from '../../context/SidebarContext';
import { useAuth } from '../../context/AuthContext';
import { 
  FaHome, 
  FaClipboardList, 
  FaChartLine, 
  FaCreditCard, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes
} from 'react-icons/fa';

// Utility function to conditionally join classNames
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}) => {
  const [openState, setOpenState] = React.useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <div className="sidebar-container">
      {React.Children.map(children, child => {
        return React.cloneElement(child, { open, setOpen, animate });
      })}
    </div>
  );
};

export const SidebarBody = (props) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  open,
  setOpen,
  animate,
  ...props
}) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Redirect to home page or login page happens automatically via router protection
  };

  const sidebarLinks = [
    { label: "Dashboard", href: "/client", icon: <FaHome size={20} /> },
    { label: "Quotes", href: "/client/quotes", icon: <FaClipboardList size={20} /> },
    { label: "Projects", href: "/client/projects", icon: <FaChartLine size={20} /> },
    { label: "Payments", href: "/client/payments", icon: <FaCreditCard size={20} /> },
    { label: "Settings", href: "/client/settings", icon: <FaCog size={20} /> },
  ];

  return (
    <motion.div
      className={cn(
        "h-full px-4 py-4 hidden md:flex md:flex-col bg-white dark:bg-gray-800 w-[300px] flex-shrink-0 shadow-md",
        className
      )}
      animate={{
        width: animate ? (open ? "300px" : "80px") : "300px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      <div className="flex items-center justify-center py-6 mb-8">
        <Link to="/client" className="flex items-center">
          {/* Logo - use your actual logo */}
          <span className="text-2xl font-bold text-conison-magenta">
            Conison
          </span>
          <motion.span
            animate={{
              display: animate ? (open ? "inline-block" : "none") : "inline-block",
              opacity: animate ? (open ? 1 : 0) : 1,
            }}
            className="ml-2 text-2xl font-bold text-conison-gray dark:text-white"
          >
            Portal
          </motion.span>
        </Link>
      </div>

      <div className="flex flex-col flex-grow">
        <nav className="flex-1 space-y-4">
          {sidebarLinks.map((link) => (
            <SidebarLink key={link.href} link={link} open={open} animate={animate} />
          ))}
        </nav>

        <div className="pt-6 mt-auto border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center justify-start w-full px-4 py-3 text-gray-600 transition duration-150 rounded-lg group dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaSignOutAlt size={20} />
            <motion.span
              animate={{
                display: animate ? (open ? "inline-block" : "none") : "inline-block",
                opacity: animate ? (open ? 1 : 0) : 1,
              }}
              className="ml-3 text-sm font-medium"
            >
              Logout
            </motion.span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  open,
  setOpen,
  ...props
}) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Redirect happens via router protection
  };

  const sidebarLinks = [
    { label: "Dashboard", href: "/client", icon: <FaHome size={20} /> },
    { label: "Quotes", href: "/client/quotes", icon: <FaClipboardList size={20} /> },
    { label: "Projects", href: "/client/projects", icon: <FaChartLine size={20} /> },
    { label: "Payments", href: "/client/payments", icon: <FaCreditCard size={20} /> },
    { label: "Settings", href: "/client/settings", icon: <FaCog size={20} /> },
  ];

  return (
    <>
      <div
        className={cn(
          "h-16 px-4 flex flex-row md:hidden items-center justify-between bg-white dark:bg-gray-800 w-full shadow-sm"
        )}
        {...props}
      >
        <div className="flex items-center">
          <Link to="/client" className="flex items-center">
            <span className="text-xl font-bold text-conison-magenta">Conison Portal</span>
          </Link>
        </div>
        <div className="flex justify-end z-20">
          <button 
            onClick={() => setOpen(!open)}
            className="p-2 text-gray-600 dark:text-gray-300"
          >
            <FaBars size={20} />
          </button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
              className={cn(
                "fixed h-full w-full inset-0 bg-white dark:bg-gray-800 p-4 z-50 flex flex-col",
                className
              )}
            >
              <div className="flex items-center justify-between mb-8 p-2">
                <Link to="/client" className="flex items-center">
                  <span className="text-xl font-bold text-conison-magenta">Conison Portal</span>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 text-gray-600 dark:text-gray-300"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <nav className="flex-1 space-y-4">
                {sidebarLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center px-4 py-3 text-gray-600 transition duration-150 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    {link.icon}
                    <span className="ml-3 text-sm font-medium">{link.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="pt-6 mt-auto border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-start w-full px-4 py-3 text-gray-600 transition duration-150 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <FaSignOutAlt size={20} />
                  <span className="ml-3 text-sm font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({ link, open, animate }) => {
  return (
    <Link
      to={link.href}
      className="flex items-center px-4 py-3 text-gray-600 transition duration-150 rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 group"
    >
      {link.icon}
      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="ml-3 text-sm font-medium"
      >
        {link.label}
      </motion.span>
    </Link>
  );
}; 