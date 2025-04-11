import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import { FaCode, FaLaptopCode, FaShoppingCart, FaServer } from 'react-icons/fa';
import ParticleBackground from '../../components/ParticleBackground';
import { useNavigate } from 'react-router-dom';

const WebDevelopmentPage = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaLaptopCode className="text-4xl text-conison-magenta" />,
      title: 'Frontend Development',
      description: 'Responsive, modern websites optimized for all devices using React, Vue, and Angular frameworks.'
    },
    {
      icon: <FaServer className="text-4xl text-conison-magenta" />,
      title: 'Backend Development',
      description: 'Robust server-side applications with Node.js, PHP, Python, and Java.'
    },
    {
      icon: <FaShoppingCart className="text-4xl text-conison-magenta" />,
      title: 'E-commerce Solutions',
      description: 'Custom online stores with secure payment integration, inventory management, and customer portals.'
    },
    {
      icon: <FaCode className="text-4xl text-conison-magenta" />,
      title: 'Full-Stack Development',
      description: 'End-to-end web solutions from database design to UI implementation.'
    }
  ];

  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'Angular', category: 'Frontend' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Express', category: 'Backend' },
    { name: 'Django', category: 'Backend' },
    { name: 'Laravel', category: 'Backend' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'MySQL', category: 'Database' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'AWS', category: 'Infrastructure' },
    { name: 'Docker', category: 'Infrastructure' }
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'}`}>
      {/* Hero Section with Particles */}
      <section className="relative py-20">
        <ParticleBackground />
        <div className="absolute inset-0 bg-gradient-to-r from-conison-magenta/20 to-conison-magenta/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Web <span className="text-conison-magenta">Development</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Crafting responsive, high-performance websites and web applications that deliver exceptional user experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} hover:shadow-lg transition-shadow`}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Technologies We Use</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8">
            {technologies.map((tech, index) => (
              <div key={index} className="text-center">
                <span className={`inline-block px-3 py-1 rounded-full mb-2 text-xs ${
                  isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                }`}>
                  {tech.category}
                </span>
                <p className="font-semibold text-lg">{tech.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Development Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="text-center mb-4">
                <span className="inline-block w-10 h-10 rounded-full bg-conison-magenta text-white text-xl font-bold flex items-center justify-center">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Discovery</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-center`}>
                We analyze your requirements and define project goals, timeline, and budget.
              </p>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="text-center mb-4">
                <span className="inline-block w-10 h-10 rounded-full bg-conison-magenta text-white text-xl font-bold flex items-center justify-center">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Design</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-center`}>
                We create wireframes and design mockups for your approval before development.
              </p>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="text-center mb-4">
                <span className="inline-block w-10 h-10 rounded-full bg-conison-magenta text-white text-xl font-bold flex items-center justify-center">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Development</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-center`}>
                Our developers build your website using the latest technologies and best practices.
              </p>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <div className="text-center mb-4">
                <span className="inline-block w-10 h-10 rounded-full bg-conison-magenta text-white text-xl font-bold flex items-center justify-center">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-center">Launch & Support</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-center`}>
                We deploy your website and provide ongoing maintenance and support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Web Project?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your requirements and create a custom web solution that meets your business needs.
          </p>
          <button 
            onClick={() => navigate('/quote-request')} 
            className="inline-block bg-conison-magenta text-white px-8 py-3 rounded-lg hover:bg-conison-magenta-dark transition-colors"
          >
            Get a Quote
          </button>
        </div>
      </section>
    </div>
  );
};

export default WebDevelopmentPage; 