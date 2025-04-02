
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, MessageSquare, HelpCircle } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const locations = [
  { name: "South Sudan", code: "SS" },
  { name: "Kenya", code: "KE" },
  { name: "Uganda", code: "UG" },
  { name: "Ethiopia", code: "ET" },
  { name: "Rwanda", code: "RW" }
];

const QuickAction = () => {
  const [currentLocation, setCurrentLocation] = useState("South Sudan");

  return (
    <div className="bg-gray-50 py-2 border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Location selector */}
        <div className="flex items-center">
          <MapPin className="h-4 w-4 text-conison-600 mr-1" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-conison-600">
                {currentLocation}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {locations.map((location) => (
                <DropdownMenuItem 
                  key={location.code}
                  onClick={() => setCurrentLocation(location.name)}
                >
                  {location.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Quick actions */}
        <div className="flex items-center space-x-4">
          <Button asChild variant="ghost" size="sm" className="text-gray-700 hover:text-conison-600">
            <Link to="/contact" className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Request Quote</span>
            </Link>
          </Button>
          
          <Button asChild variant="ghost" size="sm" className="text-gray-700 hover:text-conison-600">
            <Link to="/contact#consultation" className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Schedule Consultation</span>
            </Link>
          </Button>
          
          <Button asChild variant="ghost" size="sm" className="text-gray-700 hover:text-conison-600">
            <Link to="/contact#support" className="flex items-center">
              <HelpCircle className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Support</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickAction;
