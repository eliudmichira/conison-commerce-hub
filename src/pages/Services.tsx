
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { 
  BarChart3, 
  Brush, 
  Code, 
  Globe, 
  Mail, 
  MousePointer, 
  Search, 
  ShoppingCart, 
  Smartphone, 
  Video, 
  Shield, 
  Database, 
  Cloud, 
  Compass, 
  Users
} from "lucide-react";

const serviceCategories = [
  {
    title: "Digital Marketing & Online Growth",
    services: [
      {
        title: "Social Media Management",
        description: "Strategic content creation and community management to build your brand's social presence.",
        icon: <Users className="h-10 w-10" />,
        link: "/services/digital-marketing#social-media"
      },
      {
        title: "Search Engine Optimization (SEO)",
        description: "Improve your website visibility on search engines and drive targeted traffic.",
        icon: <Search className="h-10 w-10" />,
        link: "/services/digital-marketing#seo"
      },
      {
        title: "Pay-Per-Click Advertising (PPC)",
        description: "Strategic ad campaigns on Google, Facebook, and other platforms to reach your audience.",
        icon: <MousePointer className="h-10 w-10" />,
        link: "/services/digital-marketing#ppc"
      },
      {
        title: "Email & SMS Marketing",
        description: "Engage your audience with targeted email and SMS campaigns that convert.",
        icon: <Mail className="h-10 w-10" />,
        link: "/services/digital-marketing#email"
      },
      {
        title: "E-commerce Marketing",
        description: "Specialized strategies to increase online store visits and boost sales.",
        icon: <ShoppingCart className="h-10 w-10" />,
        link: "/services/digital-marketing#ecommerce"
      }
    ]
  },
  {
    title: "Web & App Development",
    services: [
      {
        title: "Website Design & Development",
        description: "Custom, responsive websites tailored to your brand and business needs.",
        icon: <Globe className="h-10 w-10" />,
        link: "/services/web-app-development#websites"
      },
      {
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications for iOS and Android.",
        icon: <Smartphone className="h-10 w-10" />,
        link: "/services/web-app-development#mobile-apps"
      },
      {
        title: "Website Security & Maintenance",
        description: "Keep your website secure, up-to-date and performing optimally.",
        icon: <Shield className="h-10 w-10" />,
        link: "/services/web-app-development#security"
      },
      {
        title: "Domain Registration & Web Hosting",
        description: "Reliable domain and hosting solutions for your online presence.",
        icon: <Database className="h-10 w-10" />,
        link: "/services/web-app-development#hosting"
      },
      {
        title: "Payment Gateway Integration",
        description: "Seamless payment solutions to enable e-commerce functionality.",
        icon: <ShoppingCart className="h-10 w-10" />,
        link: "/services/web-app-development#payment"
      }
    ]
  },
  {
    title: "Video Production & Creative Content",
    services: [
      {
        title: "Corporate Videos & Commercial Ads",
        description: "Professional video content to showcase your brand and products.",
        icon: <Video className="h-10 w-10" />,
        link: "/services/video-production#corporate"
      },
      {
        title: "Motion Graphics & Animation",
        description: "Engaging animated content to explain complex ideas simply.",
        icon: <Video className="h-10 w-10" />,
        link: "/services/video-production#animation"
      },
      {
        title: "Photography & Videography",
        description: "High-quality visual content for marketing and branding purposes.",
        icon: <Video className="h-10 w-10" />,
        link: "/services/video-production#photography"
      },
      {
        title: "Event Coverage",
        description: "Comprehensive documentation of your corporate and social events.",
        icon: <Video className="h-10 w-10" />,
        link: "/services/video-production#events"
      }
    ]
  },
  {
    title: "IT & Tech Solutions",
    services: [
      {
        title: "Point of Sale (POS) Systems",
        description: "Integrated POS solutions for retail and hospitality businesses.",
        icon: <Shield className="h-10 w-10" />,
        link: "/services/it-tech-solutions#pos"
      },
      {
        title: "Custom Business Software",
        description: "Tailor-made software solutions to streamline your business operations.",
        icon: <Code className="h-10 w-10" />,
        link: "/services/it-tech-solutions#software"
      },
      {
        title: "Cloud Solutions & Data Backup",
        description: "Secure cloud infrastructure and reliable data backup services.",
        icon: <Cloud className="h-10 w-10" />,
        link: "/services/it-tech-solutions#cloud"
      },
      {
        title: "CRM & ERP Solutions",
        description: "Customer and resource management systems to optimize your business.",
        icon: <Users className="h-10 w-10" />,
        link: "/services/it-tech-solutions#crm"
      },
      {
        title: "Cybersecurity & Data Protection",
        description: "Comprehensive security solutions to protect your digital assets.",
        icon: <Shield className="h-10 w-10" />,
        link: "/services/it-tech-solutions#security"
      }
    ]
  },
  {
    title: "Branding & Corporate Identity",
    services: [
      {
        title: "Logo & Brand Identity Design",
        description: "Distinctive visual identities that capture your brand essence.",
        icon: <Brush className="h-10 w-10" />,
        link: "/services/branding#logo"
      },
      {
        title: "Company Profile & Brochure Design",
        description: "Professional documents that showcase your business capabilities.",
        icon: <Brush className="h-10 w-10" />,
        link: "/services/branding#profile"
      },
      {
        title: "Product & Packaging Design",
        description: "Attractive packaging solutions that enhance your product appeal.",
        icon: <Brush className="h-10 w-10" />,
        link: "/services/branding#packaging"
      },
      {
        title: "Marketing Collateral Design",
        description: "Cohesive design for all your marketing materials and touchpoints.",
        icon: <Brush className="h-10 w-10" />,
        link: "/services/branding#collateral"
      },
      {
        title: "Event Branding",
        description: "Comprehensive branding solutions for corporate and social events.",
        icon: <Brush className="h-10 w-10" />,
        link: "/services/branding#event"
      }
    ]
  },
  {
    title: "Business Consultancy & Strategy",
    services: [
      {
        title: "Brand Strategy Development",
        description: "Comprehensive strategies to position and grow your brand effectively.",
        icon: <Compass className="h-10 w-10" />,
        link: "/services/business-consultancy#brand"
      },
      {
        title: "Marketing Strategy & Campaigns",
        description: "Result-driven marketing plans to achieve your business objectives.",
        icon: <BarChart3 className="h-10 w-10" />,
        link: "/services/business-consultancy#marketing"
      },
      {
        title: "Digital Transformation Consulting",
        description: "Guidance on leveraging technology to transform your business processes.",
        icon: <Globe className="h-10 w-10" />,
        link: "/services/business-consultancy#digital"
      },
      {
        title: "Digital Marketing Workshops",
        description: "Educational sessions to enhance your team's digital marketing skills.",
        icon: <Users className="h-10 w-10" />,
        link: "/services/business-consultancy#workshops"
      },
      {
        title: "IT & Tech Consultation for Startups",
        description: "Technology advisory services for emerging businesses.",
        icon: <Code className="h-10 w-10" />,
        link: "/services/business-consultancy#startups"
      }
    ]
  }
];

const Services = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-conison-950 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Comprehensive digital solutions to help your business thrive in the digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      {serviceCategories.map((category, index) => (
        <section key={index} className={`py-16 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading 
              title={category.title} 
              centered={true}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.services.map((service, serviceIndex) => (
                <ServiceCard
                  key={serviceIndex}
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  link={service.link}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CTA Section */}
      <section className="py-16 bg-conison-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Contact us today for a free consultation and take the first step towards digital success.
            </p>
            <div className="flex justify-center">
              <a 
                href="/contact" 
                className="bg-white hover:bg-gray-100 text-conison-600 font-semibold py-3 px-8 rounded-md transition-colors"
              >
                Get a Free Quote
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
