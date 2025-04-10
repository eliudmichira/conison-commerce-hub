import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Code,
  Smartphone,
  Cloud,
  TrendingUp,
  Database,
  Palette,
  Server,
  Shield,
  Zap,
  Users,
  Rocket,
  Handshake
} from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

const PortfolioPage = () => {
  const { isDarkMode } = useDarkMode();

  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'A full-featured e-commerce platform with advanced inventory management and payment processing.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Web Development',
      icon: Code
    },
    {
      title: 'Mobile Banking App',
      description: 'A secure and user-friendly mobile banking application with biometric authentication.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Mobile Development',
      icon: Smartphone
    },
    {
      title: 'Cloud Migration',
      description: 'Enterprise cloud migration project with zero downtime and improved performance.',
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Cloud Solutions',
      icon: Cloud
    },
    {
      title: 'Digital Marketing Campaign',
      description: 'Comprehensive digital marketing strategy that increased client revenue by 200%.',
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Digital Marketing',
      icon: TrendingUp
    },
    {
      title: 'Data Analytics Platform',
      description: 'Real-time data analytics platform with advanced visualization capabilities.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Data Management',
      icon: Database
    },
    {
      title: 'UI/UX Redesign',
      description: 'Complete UI/UX overhaul resulting in 40% increase in user engagement.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'UI/UX Design',
      icon: Palette
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className={`rounded-lg overflow-hidden shadow-lg ${isDarkMode ? 'bg-conison.gray-800' : 'bg-conison.gray-50'}`}
              >
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                    <div className="p-4">
                      <div className="flex items-center gap-2">
                        <project.icon className={`w-5 h-5 ${isDarkMode ? 'text-conison-magenta' : 'text-conison-magenta'}`} />
                        <span className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className={`text-xl font-semibold ${isDarkMode ? 'text-white' : 'text-conison.gray-900'}`}>
                    {project.title}
                  </h3>
                  <p className={`mt-2 ${isDarkMode ? 'text-conison.gray-400' : 'text-conison.gray-600'}`}>
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-conison.gray-800' : 'bg-conison.gray-50'}`}>
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