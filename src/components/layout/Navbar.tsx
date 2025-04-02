import { useState, useEffect, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { SimpleThemeToggle } from "@/components/ui/simple-theme-toggle";

// Move this data outside component to prevent recreation on each render
const MENU_ITEMS = [
  { name: "Home", path: "/" },
  { 
    name: "Services", 
    path: "/services",
    categories: [
      { name: "Digital Marketing", slug: "digital-marketing" },
      { name: "Web & App Development", slug: "web-app-development" },
      { name: "Video Production", slug: "video-production" },
      { name: "IT & Tech Solutions", slug: "it-tech-solutions" },
      { name: "Branding", slug: "branding" },
      { name: "Business Consultancy", slug: "business-consultancy" },
    ]
  },
  { name: "Pricing", path: "/pricing" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

// Maximum number of recent paths to track
const MAX_RECENT_PATHS = 5;

// Helper component for menu items to reduce repetition
const MenuItem = ({ item, isActive, isRecent, onDropdownToggle, activeDropdown }) => {
  const category = item.categories?.[0]?.slug;
  const isExpanded = activeDropdown === category;
  
  const handleAction = useCallback(() => {
    if (item.categories) {
      onDropdownToggle(isExpanded ? null : category);
    }
  }, [item, category, onDropdownToggle, isExpanded]);

  if (!item.categories) {
    return (
      <Link
        to={item.path}
        className={cn(
          "font-medium relative transition-colors duration-150",
          isActive ? "text-conison-600 dark:text-white" : "text-gray-700 dark:text-gray-300 hover:text-conison-600 dark:hover:text-white",
          isRecent ? "after:content-[''] after:block after:absolute after:-bottom-1 after:left-0 after:w-1 after:h-1 after:bg-conison-400 after:rounded-full" : ""
        )}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <button
      className={cn(
        "flex items-center font-medium transition-colors duration-150",
        isActive ? "text-conison-600 dark:text-white" : "text-gray-700 dark:text-gray-300 hover:text-conison-600 dark:hover:text-white",
        isRecent ? "after:content-[''] after:block after:absolute after:-bottom-1 after:left-0 after:w-1 after:h-1 after:bg-conison-400 after:rounded-full" : ""
      )}
      onClick={handleAction}
      onMouseEnter={handleAction}
      aria-expanded={isExpanded}
      aria-haspopup="true"
    >
      {item.name}
      <ChevronDown
        className={cn(
          "w-4 h-4 ml-1 transition-transform duration-200",
          isExpanded && "rotate-180"
        )}
        aria-hidden="true"
      />
    </button>
  );
};

// Categories dropdown menu component
const CategoriesDropdown = ({ item, activeDropdown, closeDropdown }) => {
  const isOpen = activeDropdown === item.categories[0].slug;
  
  return (
    <div className="absolute left-0 pt-2 -ml-4 w-max dropdown-container">
      <div 
        className={cn(
          "bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-200 origin-top",
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
        )}
        role="menu"
        aria-orientation="vertical"
      >
        <div className="py-2">
          {item.categories.map((category) => (
            <Link
              key={category.slug}
              to={`/services/${category.slug}`}
              className={cn(
                "block w-full text-left px-4 py-2 text-sm transition-colors duration-150",
                "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-conison-600 dark:hover:text-white"
              )}
              onClick={closeDropdown}
              role="menuitem"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

// Mobile menu item component 
const MobileMenuItem = ({ item, isActive, activeDropdown, handleDropdownToggle, closeDropdown, setIsOpen }) => {
  const isOpen = activeDropdown === item.categories?.[0]?.slug;
  
  if (!item.categories) {
    return (
      <Link
        to={item.path}
        className={cn(
          "block px-3 py-2 text-base font-medium rounded-md transition-colors duration-150",
          isActive ? 
            "text-conison-600 dark:text-white bg-gray-50 dark:bg-gray-800" : 
            "text-gray-700 dark:text-gray-300 hover:text-conison-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
        )}
        onClick={() => setIsOpen(false)}
      >
        {item.name}
      </Link>
    );
  }

  return (
    <div>
      <button
        className={cn(
          "w-full flex justify-between items-center px-3 py-2 text-base font-medium rounded-md transition-colors duration-150",
          isActive ? 
            "text-conison-600 dark:text-white bg-gray-50 dark:bg-gray-800" : 
            "text-gray-700 dark:text-gray-300 hover:text-conison-600 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
        )}
        onClick={() => handleDropdownToggle(isOpen ? null : item.categories[0].slug)}
        aria-expanded={isOpen}
      >
        {item.name}
        <ChevronDown 
          className={cn(
            "w-4 h-4 ml-1 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      
      {isOpen && (
        <div className="pl-4 py-2 space-y-1">
          {item.categories.map((category) => (
            <Link
              key={category.slug}
              to={`/services/${category.slug}`}
              className="block px-3 py-2 text-sm rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-conison-600 dark:hover:text-white"
              onClick={() => {
                setIsOpen(false);
                closeDropdown();
              }}
            >
              {category.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [recentlyVisited, setRecentlyVisited] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  
  // Track navigation history for contextual awareness
  useEffect(() => {
    if (location.pathname !== recentlyVisited[0]) {
    setRecentlyVisited(prev => {
        const newPaths = [location.pathname, ...prev.filter(p => p !== location.pathname)];
        return newPaths.slice(0, MAX_RECENT_PATHS);
      });
    }
  }, [location.pathname, recentlyVisited]);

  // Handle scroll events for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if a menu item is active based on current path
  const isMenuItemActive = useCallback((path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  // Check if a path was recently visited
  const isRecentlyVisited = useCallback((path) => {
    return recentlyVisited.includes(path);
  }, [recentlyVisited]);

  // Handle dropdown toggle
  const handleDropdownToggle = useCallback((category) => {
    setActiveDropdown(prev => prev === category ? null : category);
  }, []);

  // Close dropdown
  const closeDropdown = useCallback(() => {
    setActiveDropdown(null);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.dropdown-container')) {
        closeDropdown();
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown, closeDropdown]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeDropdown();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [closeDropdown]);

  return (
    <header 
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md" 
          : "bg-white dark:bg-gray-900 shadow-sm"
      )}
    >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
            <Link to="/" className="flex items-center" aria-label="Conison Technologies Home">
              <span className="text-2xl font-bold text-conison-700 dark:text-white transition-colors duration-200">CONISON</span>
              <span className="ml-1 text-sm text-conison-500 dark:text-gray-300 transition-colors duration-200">TECHNOLOGIES</span>
              </Link>
            </div>

            {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-6" aria-label="Main Navigation">
            {MENU_ITEMS.map((item) => (
                <div key={item.name} className="relative group">
                <MenuItem 
                  item={item}
                  isActive={isMenuItemActive(item.path)}
                  isRecent={isRecentlyVisited(item.path)}
                  onDropdownToggle={handleDropdownToggle}
                  activeDropdown={activeDropdown}
                />

                  {item.categories && (
                  <CategoriesDropdown 
                    item={item}
                    activeDropdown={activeDropdown}
                    closeDropdown={closeDropdown}
                  />
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" 
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-conison-600 dark:hover:text-white transition-colors duration-200" />
                {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-conison-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center transition-all duration-200">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              <Button 
                asChild 
                variant="default"
              className="bg-conison-600 hover:bg-conison-700 transition-all duration-200"
              >
                <Link to="/contact">Get a Quote</Link>
              </Button>

            {/* Theme toggle button */}
            <SimpleThemeToggle />
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200" 
              aria-label={`Shopping cart with ${totalItems} items`}
            >
              <ShoppingCart className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-conison-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              <button
                type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-conison-600 dark:hover:text-white focus:outline-none transition-colors duration-200"
                onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle mobile menu"
              >
                {isOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

      {/* Mobile menu with smooth transition */}
      <div 
        className={cn(
          "md:hidden transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
        id="mobile-menu"
        style={{
          transitionProperty: 'max-height, opacity',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 shadow-lg">
          {MENU_ITEMS.map((item) => (
            <MobileMenuItem
              key={item.name}
              item={item}
              isActive={isMenuItemActive(item.path)}
              activeDropdown={activeDropdown}
              handleDropdownToggle={handleDropdownToggle}
              closeDropdown={closeDropdown}
              setIsOpen={setIsOpen}
            />
          ))}
          <div className="mt-4 px-3 flex gap-2">
              <Button 
                asChild 
                variant="default" 
              className="flex-grow bg-conison-600 hover:bg-conison-700 transition-colors duration-200"
              >
              <Link to="/contact" onClick={() => setIsOpen(false)}>Get a Quote</Link>
              </Button>
            
            <SimpleThemeToggle />
            </div>
          </div>
        </div>
      </header>
  );
};

export default Navbar;