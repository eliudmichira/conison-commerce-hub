import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import { FaVideo, FaFilm, FaPaintBrush, FaCamera, FaEdit } from 'react-icons/fa';
import ParticleBackground from '../../components/ParticleBackground';

const AnimationVideoPage = () => {
  const { isDarkMode } = useDarkMode();

  const features = [
    {
      icon: <FaVideo className="text-4xl text-conison-magenta" />,
      title: '2D & 3D Animation',
      description: 'Create engaging animations with our expert team using the latest animation software and techniques.'
    },
    {
      icon: <FaFilm className="text-4xl text-conison-magenta" />,
      title: 'Video Production',
      description: 'Professional video production services including filming, editing, and post-production.'
    },
    {
      icon: <FaPaintBrush className="text-4xl text-conison-magenta" />,
      title: 'Motion Graphics',
      description: 'Eye-catching motion graphics and visual effects for your brand and marketing materials.'
    },
    {
      icon: <FaCamera className="text-4xl text-conison-magenta" />,
      title: 'Commercial Production',
      description: 'High-quality commercial videos that effectively communicate your brand message.'
    }
  ];

  const services = [
    {
      title: 'Pre-Production',
      items: ['Concept Development', 'Script Writing', 'Storyboarding', 'Location Scouting']
    },
    {
      title: 'Production',
      items: ['Filming', 'Animation Creation', 'Voice-over Recording', 'Sound Design']
    },
    {
      title: 'Post-Production',
      items: ['Video Editing', 'Color Grading', 'Special Effects', 'Final Delivery']
    }
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
              Animation & <span className="text-conison-magenta">Video Production</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Bring your ideas to life with our professional animation and video production services.
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

      {/* Services Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Production Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
              >
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <FaEdit className="text-conison-magenta mr-2" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Something Amazing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your project and bring your vision to life with our animation and video production services.
          </p>
          <a 
            href="/quote-request" 
            className="inline-block bg-conison-magenta text-white px-8 py-3 rounded-lg hover:bg-conison-magenta-dark transition-colors"
          >
            Get a Quote
          </a>
        </div>
      </section>
    </div>
  );
};

export default AnimationVideoPage; 