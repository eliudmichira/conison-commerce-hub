import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { FaCode, FaMobileAlt, FaPalette, FaChartLine, FaCloud, FaVideo, FaShieldAlt, FaRobot, FaLightbulb } from 'react-icons/fa';

const ServicesPage = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const services = [
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technologies.',
      icon: <FaCode className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Frontend Development', 'Backend Development', 'E-commerce Solutions'],
      link: '/services/web-development'
    },
    {
      id: 'mobile-development',
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      icon: <FaMobileAlt className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['iOS Development', 'Android Development', 'Cross-platform Solutions'],
      link: '/services/mobile-development'
    },
    {
      id: 'ui-ux-design',
      title: 'UI/UX Design',
      description: 'User-centered design solutions that enhance user experience.',
      icon: <FaPalette className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['User Interface Design', 'User Experience Design', 'Prototyping'],
      link: '/services/ui-ux-design'
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your online presence.',
      icon: <FaChartLine className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['SEO Optimization', 'Social Media Marketing', 'Content Strategy'],
      link: '/services/digital-marketing'
    },
    {
      id: 'cloud-solutions',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions.',
      icon: <FaCloud className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Cloud Migration', 'DevOps', 'Serverless Architecture'],
      link: '/services/cloud-solutions'
    },
    {
      id: 'animation-video-production',
      title: 'Animation & Video Production',
      description: 'Professional animation and video production services for all your creative needs.',
      icon: <FaVideo className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['2D & 3D Animation', 'Motion Graphics', 'Video Editing'],
      link: '/services/animation-video-production'
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by artificial intelligence and machine learning.',
      icon: <FaRobot className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['AI Integration', 'ML Models', 'Data Analytics'],
      link: '/services/ai-ml'
    },
    {
      id: 'cybersecurity',
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets.',
      icon: <FaShieldAlt className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Security Audits', 'Penetration Testing', 'Security Training'],
      link: '/services/cybersecurity'
    },
    {
      id: 'consulting',
      title: 'IT Consulting',
      description: 'Expert guidance for your technology decisions and implementations.',
      icon: <FaLightbulb className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Technology Strategy', 'Digital Transformation', 'Process Optimization'],
      link: '/services/consulting'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Services</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We offer a comprehensive range of digital services to help your business thrive in today's competitive landscape.
            Explore our services below to find the perfect solution for your needs.
          </p>
        </div>

        {services.map((service, index) => (
          <div 
            key={service.id} 
            id={service.id}
            className={`mb-20 pb-16 ${index !== services.length - 1 && 'border-b border-gray-200 dark:border-gray-700'}`}
          >
            <div className={`flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} items-start gap-12`}>
              <div className="lg:w-2/5 flex justify-center">
                <div className="w-full overflow-hidden rounded-lg shadow-xl transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
                  <img 
                    src={service.image} 
                    alt={`${service.title} service`}
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className={`p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="flex items-center">
                      <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-conison-yellow/10'} mr-4`}>
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold dark:text-white">{service.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:w-3/5">
                <h2 className="text-3xl font-bold mb-4 dark:text-white">{service.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
                  {service.description}
                </p>
                
                <h3 className="text-xl font-semibold mb-4 dark:text-white">What We Offer:</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {service.features.map((feature, idx) => (
                    <li 
                      key={idx} 
                      className="flex items-start"
                    >
                      <svg 
                        className="h-6 w-6 text-conison-magenta mr-2 mt-0.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button 
                  className="bg-conison-magenta text-white px-6 py-3 rounded-lg hover:bg-conison-magenta/90 transition shadow-lg hover:shadow-xl"
                  onClick={() => navigate(service.link)}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage; 