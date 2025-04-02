
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  client: string;
  description: string;
  link?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2426&q=80",
    client: "JubaShop",
    description: "A complete e-commerce solution with payment integration, inventory management, and customer portal.",
    link: "#",
  },
  {
    id: 2,
    title: "Corporate Brand Identity",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1634942536862-e72f9e1f0cc1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    client: "Unity Bank",
    description: "Complete rebrand including logo design, brand guidelines, marketing materials, and website refresh.",
    link: "#",
  },
  {
    id: 3,
    title: "Digital Marketing Campaign",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    client: "Savanna Tours",
    description: "Integrated marketing campaign across social media, email, and search advertising with 300% ROI.",
    link: "#",
  },
  {
    id: 4,
    title: "Mobile Booking App",
    category: "App Development",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2341&q=80",
    client: "Highland Hotels",
    description: "A native mobile application for hotel booking, room service, and loyalty program management.",
    link: "#",
  },
  {
    id: 5,
    title: "Corporate Video Production",
    category: "Video Production",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2342&q=80",
    client: "South Sudan Petroleum",
    description: "A series of corporate videos showcasing the company's operations, values, and community impact.",
    link: "#",
  },
  {
    id: 6,
    title: "ERP System Implementation",
    category: "IT Solutions",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
    client: "Juba Manufacturing",
    description: "Custom ERP solution integrating inventory, production, sales, and financial management systems.",
    link: "#",
  },
  {
    id: 7,
    title: "Social Media Management",
    category: "Digital Marketing",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2274&q=80",
    client: "Green Harvest",
    description: "Ongoing social media management resulting in 200% increase in engagement and 150% growth in followers.",
    link: "#",
  },
  {
    id: 8,
    title: "Business Consultancy",
    category: "Business Consultancy",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
    client: "Startups Collective",
    description: "Business strategy development and digital transformation roadmap for a startup incubator.",
    link: "#",
  },
];

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  
  const categories = ["All", ...Array.from(new Set(portfolioItems.map(item => item.category)))];
  
  const filteredItems = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-conison-950 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              Showcasing our best work and successful projects across various industries.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Featured Projects" 
            subtitle="Browse our work categorized by service area"
          />
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center mb-12 gap-3">
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-conison-600 hover:bg-conison-700" : ""}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block bg-conison-100 text-conison-600 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-conison-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Client: {item.client}
                  </p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-conison-600 hover:text-conison-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedItem(item);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Case Studies" 
            subtitle="Detailed insights into our most impactful projects"
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Case Study 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                  alt="Case Study" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-conison-100 text-conison-600 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
                  Digital Transformation
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Unity Bank Digital Transformation
                </h3>
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Challenge</h4>
                    <p className="text-gray-600">
                      Unity Bank was struggling with outdated systems and low digital adoption among customers.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Solution</h4>
                    <p className="text-gray-600">
                      We implemented a comprehensive digital strategy including a new mobile banking app, website redesign, and staff training.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Results</h4>
                    <p className="text-gray-600">
                      300% increase in mobile banking adoption, 45% reduction in branch visits, and 25% increase in customer satisfaction.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild variant="outline" className="text-conison-600 border-conison-600 hover:bg-conison-50">
                    <Link to="#">Read Full Case Study</Link>
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Case Study 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
                  alt="Case Study" 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <span className="inline-block bg-conison-100 text-conison-600 text-xs font-semibold px-2.5 py-1 rounded-full mb-2">
                  Digital Marketing
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Savanna Tours Marketing Campaign
                </h3>
                <div className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Challenge</h4>
                    <p className="text-gray-600">
                      Savanna Tours needed to expand their customer base beyond local markets to international tourists.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Solution</h4>
                    <p className="text-gray-600">
                      We created a targeted digital marketing strategy using SEO, PPC campaigns, and strategic content marketing.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Results</h4>
                    <p className="text-gray-600">
                      150% increase in website traffic, 200% growth in international bookings, and 300% return on marketing investment.
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Button asChild variant="outline" className="text-conison-600 border-conison-600 hover:bg-conison-50">
                    <Link to="#">Read Full Case Study</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Client Testimonials" 
            subtitle="What our clients say about working with us"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm">
              <div className="mb-6 text-conison-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-6 text-lg italic">
                "The team at Conison Technologies went above and beyond our expectations. They truly understood our vision and delivered a website that perfectly represents our brand. Their attention to detail and technical expertise is outstanding."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/12.jpg" 
                  alt="John Deng" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">John Deng</h4>
                  <p className="text-sm text-gray-600">CEO, Unity Bank</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-100 shadow-sm">
              <div className="mb-6 text-conison-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-6 text-lg italic">
                "Our digital marketing results have been phenomenal since working with Conison. They helped us reach new markets we didn't think were possible. The ROI on our campaigns has exceeded our expectations by far."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/24.jpg" 
                  alt="Sarah Ayen" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Ayen</h4>
                  <p className="text-sm text-gray-600">Marketing Director, Savanna Tours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-conison-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Contact us today to discuss how we can help you achieve your digital goals.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-white text-conison-600 hover:bg-gray-100">
                <Link to="/contact">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Portfolio Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">{selectedItem.title}</h3>
              <button 
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto flex-grow">
              <div className="aspect-w-16 aspect-h-9">
                <img 
                  src={selectedItem.image} 
                  alt={selectedItem.title}
                  className="object-cover w-full"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="inline-block bg-conison-100 text-conison-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                    {selectedItem.category}
                  </span>
                  <span className="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                    Client: {selectedItem.client}
                  </span>
                </div>
                <p className="text-gray-700 mb-6">{selectedItem.description}</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Challenge</h4>
                    <p className="text-gray-600">
                      The client needed a solution that would help them overcome [specific challenge] while maintaining [specific requirements].
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Solution</h4>
                    <p className="text-gray-600">
                      We implemented a custom approach that included [specific solutions] and integrated with their existing systems.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Results</h4>
                    <p className="text-gray-600">
                      The project resulted in [specific metrics and improvements] which helped the client achieve their business objectives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-between">
              {selectedItem.link ? (
                <Button asChild className="bg-conison-600 hover:bg-conison-700">
                  <a href={selectedItem.link} target="_blank" rel="noopener noreferrer">
                    Visit Project
                  </a>
                </Button>
              ) : (
                <span></span>
              )}
              <Button
                variant="outline"
                onClick={() => setSelectedItem(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Portfolio;
