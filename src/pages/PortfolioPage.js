import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { 
  FaLaptopCode, FaMobileAlt, FaPalette, 
  FaChartLine, FaDatabase, FaShieldAlt 
} from 'react-icons/fa';

const PortfolioPage = () => {
  const { isDarkMode } = useDarkMode();

  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Custom e-commerce solution with advanced features and seamless user experience.',
      image: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      category: 'Web Development',
      icon: FaLaptopCode,
      caseStudy: {
        challenge: 'Client needed a scalable e-commerce platform to handle growing business needs.',
        solution: 'Developed a custom solution with advanced features and optimized performance.',
        results: 'Increased sales by 45% and improved customer satisfaction.',
        images: [
          {
            src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
            alt: 'E-commerce platform dashboard',
            caption: 'Dashboard Overview'
          },
          {
            src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
            alt: 'Product management interface',
            caption: 'Product Management'
          }
        ]
      }
    },
    {
      title: 'Mobile Banking App',
      description: 'Secure and user-friendly mobile banking application with biometric authentication.',
      image: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      category: 'Mobile Development',
      icon: FaMobileAlt,
      caseStudy: {
        challenge: 'Bank needed a modern mobile app to serve tech-savvy customers.',
        solution: 'Created a secure, intuitive app with advanced features.',
        results: 'Achieved 80% customer adoption rate within 6 months.',
        images: [
          {
            src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
            alt: 'Mobile app interface',
            caption: 'App Interface'
          },
          {
            src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
            alt: 'Security features',
            caption: 'Security Features'
          }
        ]
      }
    },
    {
      title: 'Brand Identity Design',
      description: 'Complete brand identity package including logo, color scheme, and marketing materials.',
      image: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      category: 'Graphic Design',
      icon: FaPalette,
      caseStudy: {
        challenge: 'Startup needed a strong brand identity to stand out in competitive market.',
        solution: 'Developed comprehensive brand identity system.',
        results: 'Increased brand recognition by 60%.',
        images: [
          {
            src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
            alt: 'Brand guidelines',
            caption: 'Brand Guidelines'
          },
          {
            src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
            alt: 'Marketing materials',
            caption: 'Marketing Materials'
          }
        ]
      }
    },
    {
      title: 'Data Analytics Platform',
      description: 'Real-time data analytics platform with advanced visualization capabilities.',
      image: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
      category: 'Data Management',
      icon: FaDatabase,
      caseStudy: {
        challenge: 'Enterprise needed better data insights for decision making.',
        solution: 'Built custom analytics platform with real-time reporting.',
        results: 'Reduced decision-making time by 50%.',
        images: [
          {
            src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
            alt: 'Analytics dashboard',
            caption: 'Analytics Dashboard'
          },
          {
            src: 'https://cdn.pixabay.com/photo/2017/08/01/01/33/people-2563491_1280.jpg',
            alt: 'Data visualization',
            caption: 'Data Visualization'
          }
        ]
      }
    }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-conison.gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl sm:text-5xl md:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}
            >
              Our Portfolio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`mt-6 text-xl ${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}
            >
              Explore our recent projects and success stories
            </motion.p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="relative h-64">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <project.icon className="w-8 h-8 mb-2" />
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-sm opacity-90">{project.category}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                    {project.description}
                  </p>
                  <Link
                    to={`/portfolio/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`inline-flex items-center text-primary-teal hover:text-primary-teal/80 transition-colors`}
                  >
                    View Case Study
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Case Studies</h2>
          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl overflow-hidden shadow-lg ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">Challenge</h4>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {project.caseStudy.challenge}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Solution</h4>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {project.caseStudy.solution}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Results</h4>
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {project.caseStudy.results}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 p-4">
                    {project.caseStudy.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="relative group overflow-hidden rounded-lg">
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 text-white">
                            <p className="text-sm">{image.caption}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
            Ready to Start Your Project?
          </h2>
          <p className={`mt-4 text-lg ${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}>
            Let's discuss how we can help you achieve your goals
          </p>
          <div className="mt-8">
            <Link
              to="/contact"
              className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-conison-magenta hover:bg-conison-magenta-600 transition-colors`}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage; 