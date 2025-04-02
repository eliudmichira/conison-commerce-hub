
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Home", path: "/" },
  { 
    name: "Services", 
    path: "/services",
    submenu: [
      { name: "Digital Marketing", path: "/services/digital-marketing" },
      { name: "Web & App Development", path: "/services/web-app-development" },
      { name: "Video Production", path: "/services/video-production" },
      { name: "IT & Tech Solutions", path: "/services/it-tech-solutions" },
      { name: "Branding", path: "/services/branding" },
      { name: "Business Consultancy", path: "/services/business-consultancy" },
    ]
  },
  { name: "Pricing", path: "/pricing" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
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
                {item.submenu ? (
                  <button 
                    className="flex items-center text-gray-700 hover:text-conison-600 font-medium"
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    {item.name} <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                ) : (
                  <Link 
                    to={item.path} 
                    className="text-gray-700 hover:text-conison-600 font-medium"
                  >
                    {item.name}
                  </Link>
                )}

                {item.submenu && (
                  <div className={cn(
                    "absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-hidden z-10 transition-all origin-top-right",
                    openSubmenu === item.name ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  )}>
                    <div className="py-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setOpenSubmenu(null)}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button 
              asChild 
              variant="default"
              className="bg-conison-600 hover:bg-conison-700"
            >
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          {menuItems.map((item) => (
            <div key={item.name}>
              {item.submenu ? (
                <div>
                  <button
                    className="w-full flex justify-between items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-conison-600 hover:bg-gray-50 rounded-md"
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    {item.name}
                    <ChevronDown 
                      className={`ml-1 h-4 w-4 transition-transform ${openSubmenu === item.name ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  {openSubmenu === item.name && (
                    <div className="pl-4 space-y-1 mt-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.name}
                          to={subitem.path}
                          className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-conison-600 hover:bg-gray-50 rounded-md"
                          onClick={() => {
                            setOpenSubmenu(null);
                            setIsOpen(false);
                          }}
                        >
                          {subitem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-conison-600 hover:bg-gray-50 rounded-md"
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
            >
              <Link 
                to="/contact"
                onClick={() => setIsOpen(false)}
              >
                Get a Quote
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
