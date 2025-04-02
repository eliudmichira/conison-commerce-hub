
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Globe, Code, Video, Shield, Brush, BarChart3, 
  MapPin, Calendar, MessageSquare, HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MegaMenuProps {
  isOpen: boolean;
  category: string;
  onClose: () => void;
}

interface ServiceLink {
  name: string;
  description: string;
  path: string;
}

const MegaMenu = ({ isOpen, category, onClose }: MegaMenuProps) => {
  const location = useLocation();
  const [activeLinks, setActiveLinks] = useState<string[]>([]);
  
  // Update active links based on browsing history
  useEffect(() => {
    // This would ideally use more sophisticated tracking
    // For now, we just mark the current path as active
    setActiveLinks(prev => {
      const currentPath = location.pathname;
      if (!prev.includes(currentPath)) {
        return [...prev, currentPath].slice(-5); // Keep last 5 visited paths
      }
      return prev;
    });
  }, [location.pathname]);

  const getCategoryIcon = () => {
    switch (category) {
      case "digital-marketing": return <Globe className="h-12 w-12 text-conison-500" />;
      case "web-app-development": return <Code className="h-12 w-12 text-conison-500" />;
      case "video-production": return <Video className="h-12 w-12 text-conison-500" />;
      case "it-tech-solutions": return <Shield className="h-12 w-12 text-conison-500" />;
      case "branding": return <Brush className="h-12 w-12 text-conison-500" />;
      case "business-consultancy": return <BarChart3 className="h-12 w-12 text-conison-500" />;
      default: return null;
    }
  };

  const getCategoryContent = (): {title: string, description: string, services: ServiceLink[]} => {
    switch (category) {
      case "digital-marketing":
        return {
          title: "Digital Marketing & Online Growth",
          description: "Strategic digital marketing solutions to reach your target audience and drive growth.",
          services: [
            { name: "Social Media Management", description: "Engaging content and community management", path: "/services/digital-marketing#social-media" },
            { name: "Search Engine Optimization", description: "Improve visibility on search engines", path: "/services/digital-marketing#seo" },
            { name: "Pay-Per-Click Advertising", description: "Strategic ad campaigns on Google and social platforms", path: "/services/digital-marketing#ppc" },
            { name: "Email & SMS Marketing", description: "Targeted campaigns that convert", path: "/services/digital-marketing#email" },
            { name: "E-commerce Marketing", description: "Strategies to boost online store sales", path: "/services/digital-marketing#ecommerce" }
          ]
        };
      case "web-app-development":
        return {
          title: "Web & App Development",
          description: "Custom digital solutions tailored to your business needs.",
          services: [
            { name: "Website Design & Development", description: "Custom, responsive websites", path: "/services/web-app-development#websites" },
            { name: "Mobile App Development", description: "Native and cross-platform mobile apps", path: "/services/web-app-development#mobile-apps" },
            { name: "Website Security & Maintenance", description: "Keep your website secure and up-to-date", path: "/services/web-app-development#security" },
            { name: "Domain & Web Hosting", description: "Reliable hosting solutions", path: "/services/web-app-development#hosting" },
            { name: "Payment Gateway Integration", description: "Seamless payment solutions", path: "/services/web-app-development#payment" }
          ]
        };
      case "video-production":
        return {
          title: "Video Production & Creative Content",
          description: "Professional video content that tells your brand story.",
          services: [
            { name: "Corporate Videos & Ads", description: "Professional brand videos", path: "/services/video-production#corporate" },
            { name: "Motion Graphics & Animation", description: "Engaging animated content", path: "/services/video-production#animation" },
            { name: "Photography & Videography", description: "High-quality visual content", path: "/services/video-production#photography" },
            { name: "Drone Videography", description: "Stunning aerial footage", path: "/services/video-production#drone" },
            { name: "Event Coverage", description: "Comprehensive event documentation", path: "/services/video-production#events" }
          ]
        };
      case "it-tech-solutions":
        return {
          title: "IT & Tech Solutions",
          description: "Technology solutions to streamline your business operations.",
          services: [
            { name: "Point of Sale (POS) Systems", description: "Integrated retail solutions", path: "/services/it-tech-solutions#pos" },
            { name: "Custom Business Software", description: "Tailored software development", path: "/services/it-tech-solutions#software" },
            { name: "Cloud Solutions & Backup", description: "Secure cloud infrastructure", path: "/services/it-tech-solutions#cloud" },
            { name: "CRM & ERP Solutions", description: "Optimize business management", path: "/services/it-tech-solutions#crm" },
            { name: "Cybersecurity & Data Protection", description: "Comprehensive security solutions", path: "/services/it-tech-solutions#security" }
          ]
        };
      case "branding":
        return {
          title: "Branding & Corporate Identity",
          description: "Distinctive visual identities that capture your brand essence.",
          services: [
            { name: "Logo & Brand Identity", description: "Distinctive visual identities", path: "/services/branding#logo" },
            { name: "Company Profile & Brochure", description: "Professional business documents", path: "/services/branding#profile" },
            { name: "Product & Packaging Design", description: "Attractive packaging solutions", path: "/services/branding#packaging" },
            { name: "Marketing Collateral Design", description: "Cohesive marketing materials", path: "/services/branding#collateral" },
            { name: "Event Branding", description: "Comprehensive event branding", path: "/services/branding#event" }
          ]
        };
      case "business-consultancy":
        return {
          title: "Business Consultancy & Strategy",
          description: "Expert guidance to position and grow your brand effectively.",
          services: [
            { name: "Brand Strategy Development", description: "Position your brand for success", path: "/services/business-consultancy#brand" },
            { name: "Marketing Strategy", description: "Result-driven marketing plans", path: "/services/business-consultancy#marketing" },
            { name: "Digital Transformation", description: "Leverage technology effectively", path: "/services/business-consultancy#digital" },
            { name: "Digital Marketing Workshops", description: "Enhance your team's skills", path: "/services/business-consultancy#workshops" },
            { name: "IT Consultation for Startups", description: "Technology advisory for new businesses", path: "/services/business-consultancy#startups" }
          ]
        };
      default:
        return {
          title: "",
          description: "",
          services: []
        };
    }
  };

  const content = getCategoryContent();

  if (!isOpen || !category) return null;

  return (
    <div className="absolute left-0 w-full bg-white shadow-lg rounded-b-lg z-50 mt-2 border-t border-gray-100 animate-fade-in">
      <div className="container mx-auto px-4 py-6">
        <div className="flex">
          {/* Left column - Category overview */}
          <div className="w-1/4 pr-8 border-r border-gray-200">
            <div className="flex items-center mb-4">
              {getCategoryIcon()}
              <h3 className="text-xl font-bold ml-3">{content.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{content.description}</p>
            <Link 
              to={`/services/${category}`}
              className="inline-flex items-center text-conison-600 font-medium hover:underline"
              onClick={onClose}
            >
              View All Services
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {/* Right column - Services grid */}
          <div className="w-3/4 pl-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.services.map((service, index) => (
                <Link 
                  key={index}
                  to={service.path}
                  className={cn(
                    "block p-4 rounded-lg hover:bg-gray-50 transition-colors",
                    activeLinks.includes(service.path) ? "bg-gray-50 border-l-4 border-conison-500" : ""
                  )}
                  onClick={onClose}
                >
                  <h4 className="font-semibold text-gray-900 mb-1">{service.name}</h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
