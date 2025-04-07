import React, { useState, useEffect } from 'react';
import { useDarkMode } from '../context/DarkModeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaExternalLinkAlt, FaSearch, FaTimes, FaExpandAlt } from 'react-icons/fa';

const PortfolioPage = () => {
  const { isDarkMode } = useDarkMode();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setProjects(portfolioProjects);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className={`min-h-screen pt-24 pb-20 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Portfolio</h1>
          <p className="text-xl max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
            Explore our successful projects and see how we transform ideas into innovative digital solutions
          </p>
        </motion.div>

        {/* Filters and Search */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            {/* Category Filters */}
            <motion.div 
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {['all', 'web', 'mobile', 'branding', 'cloud'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`px-6 py-2 rounded-full transition-all ${
                    activeFilter === filter
                      ? 'bg-conison-magenta text-white shadow-md'
                      : `${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`
                  }`}
                >
                  {filter === 'all' ? 'All Projects' : filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </motion.div>

            {/* Search */}
            <motion.div 
              className="relative w-full md:w-64"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full py-2 pl-10 pr-4 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white border-gray-700 focus:border-conison-cyan' 
                      : 'bg-white text-gray-800 border-gray-300 focus:border-conison-magenta'
                  } border focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-conison-magenta transition-colors`}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-conison-magenta"></div>
          </div>
        ) : (
          <>
            <AnimatePresence>
              {filteredProjects.length === 0 ? (
                <motion.div 
                  className="text-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h3 className="text-xl font-semibold mb-2">No projects found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </motion.div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      className={`group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                      } ${project.category === 'branding' ? 'ring-2 ring-opacity-50 ring-yellow-400 dark:ring-yellow-600' : ''}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                      onClick={() => openProjectModal(project)}
                    >
                      <div className="relative overflow-hidden h-60">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                          <motion.div 
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ scale: 1.1 }}
                          >
                            <button className="bg-conison-magenta text-white px-4 py-2 rounded-lg flex items-center">
                              View Project <FaExternalLinkAlt className="ml-2" />
                            </button>
                          </motion.div>
                        </div>
                        <div className="absolute top-3 right-3">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase ${
                            project.category === 'web' ? 'bg-blue-500 text-white' :
                            project.category === 'mobile' ? 'bg-green-500 text-white' :
                            project.category === 'branding' ? 'bg-yellow-500 text-black' :
                            'bg-purple-500 text-white'
                          }`}>
                            {project.category}
                          </span>
                        </div>
                        {project.category === 'branding' && project.galleryImages && (
                          <div className="absolute bottom-3 left-3">
                            <span className="bg-white bg-opacity-80 text-black text-xs px-2 py-1 rounded-md">
                              +{project.galleryImages.length} Mockups
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className={`mb-4 text-sm line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className={`text-xs px-3 py-1 rounded-full ${
                                isDarkMode 
                                  ? 'bg-gray-700 text-gray-300' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Project Modal */}
            <AnimatePresence>
              {selectedProject && (
                <motion.div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeProjectModal}
                >
                  <motion.div
                    className={`relative max-w-4xl w-full rounded-xl overflow-y-auto max-h-[90vh] ${
                      isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
                    }`}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: 'spring', damping: 25 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black bg-opacity-30 text-white hover:bg-opacity-50 transition-all"
                      onClick={closeProjectModal}
                    >
                      <FaTimes />
                    </button>
                    
                    <div className="h-80 relative">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full object-cover rounded-lg shadow-lg"
                        loading="lazy"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                        <div className="text-white">
                          <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
                          <div className="flex items-center mt-2">
                            <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase mr-3 ${
                              selectedProject.category === 'web' ? 'bg-blue-500 text-white' :
                              selectedProject.category === 'mobile' ? 'bg-green-500 text-white' :
                              selectedProject.category === 'branding' ? 'bg-yellow-500 text-black' :
                              'bg-purple-500 text-white'
                            }`}>
                              {selectedProject.category}
                            </span>
                            <span className="text-gray-300">{selectedProject.client}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3">Project Overview</h3>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {selectedProject.longDescription || selectedProject.description}
                        </p>
                      </div>
                      
                      {/* Gallery for branding projects */}
                      {selectedProject.category === 'branding' && selectedProject.galleryImages && (
                        <div className="mb-8">
                          <h3 className="text-xl font-bold mb-4">Project Gallery</h3>
                          <div className="relative">
                            <div className="overflow-hidden rounded-lg">
                              <div className="flex space-x-4 overflow-x-auto pb-4 snap-x scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                                {selectedProject.galleryImages.map((img, idx) => (
                                  <div 
                                    key={idx} 
                                    className="flex-shrink-0 w-full md:w-[calc(50%-8px)] snap-center overflow-hidden rounded-lg shadow-lg"
                                  >
                                    <div className="relative group">
                                      <img 
                                        src={img} 
                                        alt={`${selectedProject.title} - Mockup ${idx + 1}`} 
                                        className="w-full h-auto object-cover rounded-lg shadow-lg"
                                        loading="lazy"
                                      />
                                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                                      <div className={`absolute bottom-3 left-3 text-xs px-2 py-1 rounded-md ${
                                        isDarkMode 
                                          ? 'bg-gray-800 text-white' 
                                          : 'bg-white bg-opacity-90 text-gray-800'
                                      }`}>
                                        Mockup {idx + 1}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            {selectedProject.galleryImages.length > 1 && (
                              <div className="flex justify-center mt-4 space-x-2">
                                {selectedProject.galleryImages.map((_, idx) => (
                                  <button
                                    key={idx}
                                    className={`w-2 h-2 rounded-full ${
                                      idx === 0
                                        ? 'bg-conison-magenta'
                                        : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
                                    }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="mb-6">
                        <h3 className="text-xl font-bold mb-3">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag, idx) => (
                            <span 
                              key={idx} 
                              className={`text-sm px-3 py-1 rounded-full ${
                                isDarkMode 
                                  ? 'bg-gray-700 text-gray-300' 
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {selectedProject.results && (
                        <div className="mb-6">
                          <h3 className="text-xl font-bold mb-3">Results</h3>
                          <ul className={`list-disc pl-5 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {selectedProject.results.map((result, idx) => (
                              <li key={idx} className="mb-1">{result}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="mt-8 flex justify-end">
                        {selectedProject.liveUrl && (
                          <a 
                            href={selectedProject.liveUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bg-conison-magenta text-white px-6 py-2 rounded-lg hover:bg-conison-magenta/90 transition-all mr-3 flex items-center"
                          >
                            Visit Website <FaExternalLinkAlt className="ml-2" />
                          </a>
                        )}
                        <button
                          onClick={closeProjectModal}
                          className={`px-6 py-2 rounded-lg border ${
                            isDarkMode 
                              ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                              : 'border-gray-300 text-gray-600 hover:bg-gray-100'
                          } transition-all`}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  );
};

// Sample portfolio data
const portfolioProjects = [
  {
    id: 1,
    title: "E-commerce Platform Redesign",
    description: "Complete redesign and development of an e-commerce platform with improved UX and conversion optimization",
    longDescription: "We completely reimagined the e-commerce experience for a retail client, focusing on streamlined user flows, mobile responsiveness, and optimized checkout process. The new platform integrates with their inventory management system and provides robust analytics.",
    image: "https://images.unsplash.com/photo-1523289333742-be1143f6b766?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZSUyMGNvbW1lcmNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    category: "web",
    client: "Retail Solutions Inc.",
    tags: ["React", "Node.js", "MongoDB", "AWS", "Redux"],
    results: [
      "200% increase in online sales",
      "45% improvement in conversion rate",
      "65% reduction in cart abandonment",
      "Mobile traffic increased by 120%"
    ],
    liveUrl: "https://example.com"
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Secure and user-friendly mobile banking application with biometric authentication and real-time notifications",
    longDescription: "We developed a cutting-edge mobile banking application that prioritizes security while delivering an intuitive user experience. The app includes biometric authentication, real-time transaction alerts, and comprehensive financial management tools.",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG1vYmlsZSUyMGJhbmtpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    category: "mobile",
    client: "First Digital Bank",
    tags: ["React Native", "Node.js", "MongoDB", "Firebase", "Redux"],
    results: [
      "Downloaded by over 50,000 users in first month",
      "4.8/5 average rating on app stores",
      "98.5% uptime with zero security breaches",
      "Reduced customer service calls by 35%"
    ],
    liveUrl: null
  },
  {
    id: 3,
    title: "Nexus Brand Identity",
    description: "Complete brand identity creation for a tech startup, including logo system, visual language, and brand guidelines",
    longDescription: "We created a comprehensive brand identity for Nexus, a technology startup focused on AI solutions. The project involved developing a flexible logo system, defining a distinctive visual language, creating custom iconography, and delivering detailed brand guidelines to ensure consistent application across all touchpoints.",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    category: "branding",
    client: "Nexus Technologies",
    tags: ["Brand Strategy", "Logo Design", "Typography", "Visual Identity", "Brand Guidelines"],
    results: [
      "Successfully secured $2.5M in venture capital after rebrand",
      "Brand recognition increased by 78% in target market",
      "Media coverage in 5 major tech publications",
      "Won 2023 Design Excellence Award"
    ],
    liveUrl: "https://example.com",
    galleryImages: [
      "https://images.unsplash.com/photo-1634942537034-a3b018550cc4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1583321500900-82807e458f3c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80"
    ]
  },
  {
    id: 4,
    title: "Cloud Migration & Infrastructure",
    description: "Full migration from on-premise infrastructure to cloud-based solutions with improved security and scalability",
    longDescription: "We orchestrated a complete migration from legacy on-premise infrastructure to a modern cloud architecture. The project involved designing a secure, scalable infrastructure, implementing CI/CD pipelines, and providing comprehensive training.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdWQlMjBjb21wdXRpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
    category: "cloud",
    client: "Tech Solutions Group",
    tags: ["AWS", "Azure", "Kubernetes", "Docker", "Terraform"],
    results: [
      "Reduced IT operational costs by 40%",
      "Improved system reliability to 99.99% uptime",
      "Decreased deployment time from days to minutes",
      "Enhanced security posture with zero incidents"
    ],
    liveUrl: null
  },
  {
    id: 5,
    title: "Educational Platform",
    description: "Interactive learning platform with video courses, assessments, and progress tracking for students",
    longDescription: "We built a comprehensive educational platform that enables interactive learning through video courses, live sessions, automated assessments, and detailed progress tracking. The platform includes admin tools for educators to manage content and monitor student progress.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
    category: "web",
    client: "EdTech Innovations",
    tags: ["React", "Node.js", "MongoDB", "WebRTC", "Redis"],
    results: [
      "Reached 15,000 active students within first quarter",
      "Average course completion rate of 87%",
      "Course satisfaction rating of 4.7/5",
      "95% of students reported improved learning outcomes"
    ],
    liveUrl: "https://example.com"
  },
  {
    id: 6,
    title: "Fitness Tracking App",
    description: "Mobile application for tracking workouts, nutrition, and health metrics with personalized recommendations",
    longDescription: "We designed and developed a comprehensive fitness tracking application that allows users to monitor workouts, nutrition, and health metrics. The app provides personalized recommendations based on user goals and integrates with wearable devices for seamless data collection.",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zml0bmVzcyUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
    category: "mobile",
    client: "FitLife Solutions",
    tags: ["Flutter", "Firebase", "Google Fit API", "Apple HealthKit", "Machine Learning"],
    results: [
      "Over 100,000 downloads across iOS and Android",
      "Average session time of 12 minutes",
      "Retention rate of 65% after 30 days",
      "4.6/5 average rating on app stores"
    ],
    liveUrl: null
  },
  {
    id: 7,
    title: "Eco Harvest Rebrand",
    description: "Sustainable brand transformation for an organic food company including packaging, digital presence, and retail experience",
    longDescription: "We led a complete rebrand for Eco Harvest, transforming them from a local organic producer to a nationally recognized sustainable food brand. The project included creating a new visual identity system, developing sustainable packaging solutions, redesigning their digital presence, and creating guidelines for retail experiences.",
    image: "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "branding",
    client: "Eco Harvest Foods",
    tags: ["Brand Strategy", "Packaging Design", "Sustainable Design", "Digital Brand", "Retail Experience"],
    results: [
      "115% increase in retail distribution within 8 months",
      "Featured in 3 major food industry publications",
      "Consumer brand perception scores improved by 64%",
      "Packaging design reduced materials usage by 30%"
    ],
    liveUrl: "https://example.com",
    galleryImages: [
      "https://images.unsplash.com/photo-1634487359989-3e90c9432133?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80",
      "https://images.unsplash.com/photo-1589831377283-33cb1cc6bd5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1987&q=80"
    ]
  },
  {
    id: 8,
    title: "Fintech Brand System",
    description: "Comprehensive brand system for a financial technology platform targeting modern investors and banking customers",
    longDescription: "We developed an innovative brand system for FinFlow, a fintech platform challenging traditional banking. The project involved creating a distinctive visual identity that balances professionalism with approachability, designing a complete UI system for their digital products, and developing a flexible brand architecture to accommodate future growth and product expansions.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "branding",
    client: "FinFlow Technologies",
    tags: ["Brand Strategy", "Visual Identity", "UI Design System", "Brand Architecture", "Digital Experience"],
    results: [
      "User acquisition cost reduced by 32% after rebrand",
      "Brand recognition reached 45% among target audience within 6 months",
      "App engagement metrics increased by 28%", 
      "Winner of Financial Brand Innovation Award"
    ],
    liveUrl: "https://example.com",
    galleryImages: [
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2201&q=80",
      "https://images.unsplash.com/photo-1603697482472-695ab6df2db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
    ]
  },
  {
    id: 9,
    title: "Luxury Hospitality Branding",
    description: "Elegant branding and identity system for a boutique luxury hotel chain with locations across Africa and Europe",
    longDescription: "We created a sophisticated brand identity for Azure Retreats, a luxury boutique hotel chain. The project encompassed developing a premium visual language, crafting custom typography and iconography, designing branded collateral and environmental graphics, and establishing guidelines for guest experience touchpoints across all their properties.",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    category: "branding",
    client: "Azure Retreats International",
    tags: ["Luxury Branding", "Environmental Design", "Print Collateral", "Typography", "Experience Design"],
    results: [
      "Average booking value increased by 24% post-rebrand",
      "Featured in Luxury Travel Magazine's 'Brands to Watch'",
      "Social media engagement up 87% within first three months",
      "Successful expansion to 3 new locations guided by brand strategy"
    ],
    liveUrl: "https://example.com",
    galleryImages: [
      "https://images.unsplash.com/photo-1606744888344-493238951221?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2342&q=80",
      "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2338&q=80"
    ]
  }
];

export default PortfolioPage; 