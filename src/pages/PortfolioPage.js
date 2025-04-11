import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { 
  FaLaptopCode, FaMobileAlt, FaPalette, 
  FaDatabase, FaArrowRight, FaStar
} from 'react-icons/fa';
import { 
  ArrowUpRight, Filter, CheckCircle2, 
  ExternalLink, ChevronRight, MoveRight 
} from 'lucide-react';
import { Button } from '../components/ui/button';

const PortfolioPage = () => {
  const { isDarkMode } = useDarkMode();
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Custom e-commerce solution with advanced features and seamless user experience.',
      image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?q=80&w=1470&auto=format&fit=crop',
      category: 'Web Development',
      tags: ['React', 'Node.js', 'MongoDB'],
      icon: FaLaptopCode,
      stats: {
        sales: '+45%',
        conversion: '+28%',
        retention: '+35%'
      },
      caseStudy: {
        challenge: 'Client needed a scalable e-commerce platform to handle growing business needs and improve customer experience.',
        solution: 'Developed a custom solution with advanced features, optimized performance, and mobile-first approach.',
        results: 'Increased sales by 45% and improved customer satisfaction scores from 3.6 to 4.8 out of 5.',
        tech: ['React', 'Node.js', 'Express', 'MongoDB', 'AWS'],
        images: [
          {
            src: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1470&auto=format&fit=crop',
            alt: 'E-commerce platform dashboard',
            caption: 'Dashboard Overview'
          },
          {
            src: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=1471&auto=format&fit=crop',
            alt: 'Product management interface',
            caption: 'Product Management'
          }
        ]
      }
    },
    {
      title: 'Mobile Banking App',
      description: 'Secure and user-friendly mobile banking application with biometric authentication.',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
      category: 'Mobile Development',
      tags: ['React Native', 'Firebase', 'Biometrics'],
      icon: FaMobileAlt,
      stats: {
        adoption: '80%',
        transactions: '+120%',
        satisfaction: '4.7/5'
      },
      caseStudy: {
        challenge: 'Bank needed a modern mobile app to serve tech-savvy customers and reduce branch visits.',
        solution: 'Created a secure, intuitive app with advanced features including biometric authentication and instant transfers.',
        results: 'Achieved 80% customer adoption rate within 6 months and reduced branch transactions by 35%.',
        tech: ['React Native', 'Firebase', 'Redux', 'Node.js', 'AWS Amplify'],
        images: [
          {
            src: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?q=80&w=1480&auto=format&fit=crop',
            alt: 'Mobile app interface',
            caption: 'App Interface'
          },
          {
            src: 'https://images.unsplash.com/photo-1613487665223-ac5a3e42ce75?q=80&w=1480&auto=format&fit=crop',
            alt: 'Security features',
            caption: 'Security Features'
          }
        ]
      }
    },
    {
      title: 'Brand Identity Design',
      description: 'Complete brand identity package including logo, color scheme, and marketing materials.',
      image: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?q=80&w=1470&auto=format&fit=crop',
      category: 'Graphic Design',
      tags: ['Branding', 'UI/UX', 'Identity'],
      icon: FaPalette,
      stats: {
        recognition: '+60%',
        engagement: '+75%',
        conversion: '+40%'
      },
      caseStudy: {
        challenge: 'Startup needed a strong brand identity to stand out in competitive market and attract venture capital.',
        solution: 'Developed comprehensive brand identity system with logo, typography, color palette, and application guidelines.',
        results: 'Increased brand recognition by 60% and helped secure $2.5M in Series A funding.',
        tech: ['Adobe Creative Suite', 'Figma', 'InVision'],
        images: [
          {
            src: 'https://images.unsplash.com/photo-1634942537034-2531766767a1?q=80&w=1472&auto=format&fit=crop',
            alt: 'Brand guidelines',
            caption: 'Brand Guidelines'
          },
          {
            src: 'https://images.unsplash.com/photo-1580894723150-80c8734b8ad3?q=80&w=1470&auto=format&fit=crop',
            alt: 'Marketing materials',
            caption: 'Marketing Materials'
          }
        ]
      }
    },
    {
      title: 'Data Analytics Platform',
      description: 'Real-time data analytics platform with advanced visualization capabilities.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
      category: 'Data Management',
      tags: ['Python', 'D3.js', 'ML/AI'],
      icon: FaDatabase,
      stats: {
        efficiency: '+50%',
        accuracy: '+40%',
        cost: '-25%'
      },
      caseStudy: {
        challenge: 'Enterprise needed better data insights for decision making across departments and regions.',
        solution: 'Built custom analytics platform with real-time reporting, predictive modeling, and executive dashboards.',
        results: 'Reduced decision-making time by 50% and increased forecast accuracy by 40%.',
        tech: ['Python', 'React', 'D3.js', 'TensorFlow', 'AWS', 'PostgreSQL'],
        images: [
          {
            src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
            alt: 'Analytics dashboard',
            caption: 'Analytics Dashboard'
          },
          {
            src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1426&auto=format&fit=crop',
            alt: 'Data visualization',
            caption: 'Data Visualization'
          }
        ]
      }
    }
  ];

  const categories = ['All', 'Web Development', 'Mobile Development', 'Graphic Design', 'Data Management'];
  
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className={`relative py-24 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-purple-100 text-purple-800 font-medium text-sm mb-6"
            >
              Our Work
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl sm:text-5xl md:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Portfolio</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`mt-6 text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Explore our recent projects and success stories that showcase our expertise and innovation
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} />
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Filter by:
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === category
                      ? isDarkMode 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-purple-600 text-white'
                      : isDarkMode
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  layout
                  className={`group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                  }`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                        ${project.category === 'Web Development' ? 'bg-blue-600/90 text-white' : ''}
                        ${project.category === 'Mobile Development' ? 'bg-green-600/90 text-white' : ''}
                        ${project.category === 'Graphic Design' ? 'bg-purple-600/90 text-white' : ''}
                        ${project.category === 'Data Management' ? 'bg-amber-600/90 text-white' : ''}
                      `}>
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className={`p-2 rounded-lg mb-3 inline-block
                        ${project.category === 'Web Development' ? 'bg-blue-600/90' : ''}
                        ${project.category === 'Mobile Development' ? 'bg-green-600/90' : ''}
                        ${project.category === 'Graphic Design' ? 'bg-purple-600/90' : ''}
                        ${project.category === 'Data Management' ? 'bg-amber-600/90' : ''}
                      `}>
                        <project.icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          className={`px-2 py-1 text-xs rounded-md ${
                            isDarkMode 
                              ? 'bg-gray-700 text-gray-300' 
                              : 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                      {project.description}
                    </p>
                    
                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {Object.entries(project.stats).map(([key, value], i) => (
                        <div key={i} className="text-center">
                          <div className={`text-lg font-bold ${
                            isDarkMode ? 'text-purple-400' : 'text-purple-600'
                          }`}>
                            {value}
                          </div>
                          <div className={`text-xs ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Link
                      to={`/portfolio/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`inline-flex items-center font-medium group/link ${
                        isDarkMode 
                          ? 'text-purple-400 hover:text-purple-300' 
                          : 'text-purple-600 hover:text-purple-700'
                      }`}
                    >
                      View Case Study
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Featured Case Study Section */}
      <section className={`py-24 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`text-3xl md:text-4xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Case Study</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`mt-4 text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              A deep dive into one of our most successful projects
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`rounded-2xl overflow-hidden shadow-xl ${
              isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-600 p-2 rounded-lg">
                    <FaLaptopCode className="w-5 h-5 text-white" />
                  </div>
                  <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    E-commerce Platform
                  </h3>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className={`font-semibold mb-2 text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      The Challenge
                    </h4>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {projects[0].caseStudy.challenge}
                    </p>
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-2 text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      Our Solution
                    </h4>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      {projects[0].caseStudy.solution}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {projects[0].caseStudy.tech.map((tech, i) => (
                        <span 
                          key={i} 
                          className={`px-3 py-1 text-sm rounded-full ${
                            isDarkMode 
                              ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                              : 'bg-white text-gray-700 border border-gray-200'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className={`font-semibold mb-2 text-lg ${isDarkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                      The Results
                    </h4>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                      {projects[0].caseStudy.results}
                    </p>
                    
                    <div className="grid grid-cols-3 gap-4 mt-6">
                      <div className={`p-4 rounded-lg ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <FaStar className="text-yellow-500 w-4 h-4" />
                          <span className={`text-sm font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Sales
                          </span>
                        </div>
                        <div className="text-xl font-bold text-green-500">+45%</div>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <FaStar className="text-yellow-500 w-4 h-4" />
                          <span className={`text-sm font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Conversion
                          </span>
                        </div>
                        <div className="text-xl font-bold text-green-500">+28%</div>
                      </div>
                      <div className={`p-4 rounded-lg ${
                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          <FaStar className="text-yellow-500 w-4 h-4" />
                          <span className={`text-sm font-medium ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                          }`}>
                            Retention
                          </span>
                        </div>
                        <div className="text-xl font-bold text-green-500">+35%</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link
                  to="/portfolio/e-commerce-platform"
                  className={`inline-flex items-center mt-8 font-medium ${
                    isDarkMode 
                      ? 'text-purple-400 hover:text-purple-300' 
                      : 'text-purple-600 hover:text-purple-700'
                  }`}
                >
                  Full Case Study
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'} p-8 flex items-center`}>
                <div className="space-y-6 w-full">
                  <div className="relative rounded-lg overflow-hidden shadow-md aspect-video">
                    <img 
                      src={projects[0].caseStudy.images[0].src} 
                      alt={projects[0].caseStudy.images[0].alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <p className="text-white text-sm font-medium">
                            {projects[0].caseStudy.images[0].caption}
                          </p>
                          <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative rounded-lg overflow-hidden shadow-md aspect-video">
                    <img 
                      src={projects[0].caseStudy.images[1].src} 
                      alt={projects[0].caseStudy.images[1].alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <p className="text-white text-sm font-medium">
                            {projects[0].caseStudy.images[1].caption}
                          </p>
                          <ExternalLink className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-24 ${
        isDarkMode 
          ? 'bg-gray-900 bg-[url("/images/cta-pattern-dark.svg")]' 
          : 'bg-purple-50 bg-[url("/images/cta-pattern-light.svg")]'
      } bg-no-repeat bg-cover`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Ready to Start Your Project?
            </h2>
            <p className={`mb-8 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Let's discuss how we can help you achieve your goals and transform your digital presence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="group gap-3 px-6 py-6 text-base bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-md"
                >
                  Get in Touch
                  <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/services">
                <Button 
                  variant="outline"
                  size="lg" 
                  className={`gap-3 px-6 py-6 text-base ${
                    isDarkMode 
                      ? 'bg-transparent border-white text-white hover:bg-white/10' 
                      : 'border-purple-600 text-purple-600 hover:bg-purple-50'
                  }`}
                >
                  View Our Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;