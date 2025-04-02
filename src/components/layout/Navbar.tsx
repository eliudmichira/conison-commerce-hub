
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import MegaMenu from "./MegaMenu";
import QuickAction from "./QuickAction";

const menuItems = [
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

const Navbar = () => {
  const location = useLocation();
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [recentlyVisited, setRecentlyVisited] = useState<string[]>([]);
  
  // Track navigation history for contextual awareness
  useEffect(() => {
    const currentPath = location.pathname;
    setRecentlyVisited(prev => {
      if (!prev.includes(currentPath)) {
        return [...prev, currentPath].slice(-5); // Keep last 5 visited paths
      }
      return prev;
    });
  }, [location.pathname]);

  const handleMegaMenuToggle = (categorySlug: string) => {
    if (activeMegaMenu === categorySlug) {
      setActiveMegaMenu(null);
    } else {
      setActiveMegaMenu(categorySlug);
    }
  };

  const closeMegaMenu = () => {
    setActiveMegaMenu(null);
  };

  // Determine if a menu item should be highlighted based on current path and history
  const isMenuItemActive = (path: string): boolean => {
    // Exact match for home
    if (path === "/" && location.pathname === "/") return true;
    
    // For other pages, check if current path starts with this path
    // This handles both exact matches and nested routes
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    
    return false;
  };

  // Check if a path is in recently visited
  const isRecentlyVisited = (path: string): boolean => {
    return recentlyVisited.includes(path) && !isMenuItemActive(path);
  };

  return (
    <>
      <QuickAction />
      <header className="sticky top-0 z-40 w-full bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-conison-700">CONISON</span>
                <span className="ml-1 text-sm text-conison-500">TECHNOLOGIES</span>
              </Link>
            </div>

            {/* Desktop menu */}
            <nav className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.categories ? (
                    <button 
                      className={cn(
                        "flex items-center font-medium",
                        isMenuItemActive(item.path) ? "text-conison-600" : "text-gray-700 hover:text-conison-600",
                        isRecentlyVisited(item.path) ? "after:content-[''] after:block after:absolute after:-bottom-1 after:left-0 after:w-1 after:h-1 after:bg-conison-400 after:rounded-full" : ""
                      )}
                      onClick={() => handleMegaMenuToggle(item.categories?.[0].slug || "")}
                      onMouseEnter={() => setActiveMegaMenu(item.categories?.[0].slug || "")}
                    >
                      {item.name}
                      <svg 
                        className={`w-4 h-4 ml-1 transition-transform ${activeMegaMenu ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  ) : (
                    <Link 
                      to={item.path} 
                      className={cn(
                        "font-medium relative",
                        isMenuItemActive(item.path) ? "text-conison-600" : "text-gray-700 hover:text-conison-600",
                        isRecentlyVisited(item.path) ? "after:content-[''] after:block after:absolute after:-bottom-1 after:left-0 after:w-1 after:h-1 after:bg-conison-400 after:rounded-full" : ""
                      )}
                    >
                      {item.name}
                    </Link>
                  )}

                  {item.categories && (
                    <div 
                      className="absolute left-0 pt-2 -ml-4 w-max"
                      onMouseLeave={closeMegaMenu}
                    >
                      <div className={cn(
                        "bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden transition-all duration-200 origin-top",
                        activeMegaMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                      )}>
                        <div className="py-2">
                          {item.categories.map((category) => (
                            <button
                              key={category.slug}
                              className={cn(
                                "block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
                                activeMegaMenu === category.slug ? "bg-gray-50" : ""
                              )}
                              onClick={() => handleMegaMenuToggle(category.slug)}
                              onMouseEnter={() => setActiveMegaMenu(category.slug)}
                            >
                              {category.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-conison-600" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-conison-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              <Button 
                asChild 
                variant="default"
                className="bg-conison-600 hover:bg-conison-700"
              >
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <Link to="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-conison-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
              
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-conison-600 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
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

        {/* Mega menu container */}
        {activeMegaMenu && (
          <MegaMenu 
            isOpen={!!activeMegaMenu} 
            category={activeMegaMenu} 
            onClose={closeMegaMenu} 
          />
        )}

        {/* Mobile menu */}
        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.categories ? (
                  <div>
                    <button
                      className={cn(
                        "w-full flex justify-between items-center px-3 py-2 text-base font-medium rounded-md",
                        isMenuItemActive(item.path) ? "text-conison-600 bg-gray-50" : "text-gray-700 hover:text-conison-600 hover:bg-gray-50"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to={item.path}>{item.name}</Link>
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={cn(
                      "block px-3 py-2 text-base font-medium rounded-md",
                      isMenuItemActive(item.path) ? "text-conison-600 bg-gray-50" : "text-gray-700 hover:text-conison-600 hover:bg-gray-50"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-4 px-3">
              <Button 
                asChild 
                variant="default" 
                className="w-full bg-conison-600 hover:bg-conison-700"
                onClick={() => setIsOpen(false)}
              >
                <Link to="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
