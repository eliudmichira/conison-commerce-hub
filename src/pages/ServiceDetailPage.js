import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';
import { FaCode, FaMobileAlt, FaPalette, FaChartLine, FaCloud, FaVideo, FaShieldAlt, FaRobot, FaLightbulb } from 'react-icons/fa';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useDarkMode();

  const services = {
    'web-development': {
      title: 'Web Development',
      description: 'Custom websites and web applications built with cutting-edge technologies.',
      icon: <FaCode className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Frontend Development', 'Backend Development', 'E-commerce Solutions'],
      process: [
        {
          title: 'Planning & Analysis',
          description: 'We analyze your requirements and create a detailed project plan.'
        },
        {
          title: 'Design & Development',
          description: 'Our team creates the design and develops the solution using the latest technologies.'
        },
        {
          title: 'Testing & Quality Assurance',
          description: 'Rigorous testing ensures your solution works flawlessly.'
        },
        {
          title: 'Deployment & Support',
          description: 'We deploy your solution and provide ongoing support.'
        }
      ]
    },
    'mobile-development': {
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      icon: <FaMobileAlt className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['iOS Development', 'Android Development', 'Cross-platform Solutions'],
      process: [
        {
          title: 'Requirements Gathering',
          description: 'We understand your mobile app requirements and target platforms.'
        },
        {
          title: 'Design & Prototyping',
          description: 'Create intuitive mobile interfaces and interactive prototypes.'
        },
        {
          title: 'Development & Testing',
          description: 'Build and test your app across all target devices.'
        },
        {
          title: 'App Store Deployment',
          description: 'Prepare and deploy your app to the respective app stores.'
        }
      ]
    },
    'ui-ux-design': {
      title: 'UI/UX Design',
      description: 'User-centered design solutions that enhance user experience.',
      icon: <FaPalette className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['User Interface Design', 'User Experience Design', 'Prototyping'],
      process: [
        {
          title: 'Research & Analysis',
          description: 'Understand user needs and market trends.'
        },
        {
          title: 'Wireframing & Prototyping',
          description: 'Create wireframes and interactive prototypes.'
        },
        {
          title: 'Visual Design',
          description: 'Develop the final visual design with attention to detail.'
        },
        {
          title: 'Testing & Iteration',
          description: 'Test designs with users and iterate based on feedback.'
        }
      ]
    },
    'digital-marketing': {
      title: 'Digital Marketing',
      description: 'Comprehensive digital marketing strategies to grow your online presence.',
      icon: <FaChartLine className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['SEO Optimization', 'Social Media Marketing', 'Content Strategy'],
      process: [
        {
          title: 'Strategy Development',
          description: 'Create a comprehensive digital marketing strategy.'
        },
        {
          title: 'Content Creation',
          description: 'Develop engaging content for various platforms.'
        },
        {
          title: 'Campaign Execution',
          description: 'Implement and manage marketing campaigns.'
        },
        {
          title: 'Performance Analysis',
          description: 'Monitor and optimize campaign performance.'
        }
      ]
    },
    'cloud-solutions': {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions.',
      icon: <FaCloud className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Cloud Migration', 'DevOps', 'Serverless Architecture'],
      process: [
        {
          title: 'Assessment',
          description: 'Evaluate current infrastructure and requirements.'
        },
        {
          title: 'Migration Planning',
          description: 'Develop a detailed cloud migration plan.'
        },
        {
          title: 'Implementation',
          description: 'Execute the migration with minimal disruption.'
        },
        {
          title: 'Optimization',
          description: 'Optimize cloud resources and costs.'
        }
      ]
    },
    'animation-video-production': {
      title: 'Animation & Video Production',
      description: 'Professional animation and video production services for all your creative needs.',
      icon: <FaVideo className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['2D & 3D Animation', 'Motion Graphics', 'Video Editing'],
      process: [
        {
          title: 'Concept Development',
          description: 'Create storyboards and develop creative concepts.'
        },
        {
          title: 'Pre-Production',
          description: 'Plan and prepare for production.'
        },
        {
          title: 'Production',
          description: 'Create animations and video content.'
        },
        {
          title: 'Post-Production',
          description: 'Edit and polish the final product.'
        }
      ]
    },
    'ai-ml': {
      title: 'AI & Machine Learning',
      description: 'Intelligent solutions powered by artificial intelligence and machine learning.',
      icon: <FaRobot className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['AI Integration', 'ML Models', 'Data Analytics'],
      process: [
        {
          title: 'Data Analysis',
          description: 'Analyze data and identify AI opportunities.'
        },
        {
          title: 'Model Development',
          description: 'Develop and train AI/ML models.'
        },
        {
          title: 'Integration',
          description: 'Integrate AI solutions into existing systems.'
        },
        {
          title: 'Optimization',
          description: 'Fine-tune and optimize AI performance.'
        }
      ]
    },
    'cybersecurity': {
      title: 'Cybersecurity',
      description: 'Comprehensive security solutions to protect your digital assets.',
      icon: <FaShieldAlt className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Security Audits', 'Penetration Testing', 'Security Training'],
      process: [
        {
          title: 'Assessment',
          description: 'Evaluate current security posture.'
        },
        {
          title: 'Planning',
          description: 'Develop security improvement plan.'
        },
        {
          title: 'Implementation',
          description: 'Implement security measures.'
        },
        {
          title: 'Monitoring',
          description: 'Continuous security monitoring.'
        }
      ]
    },
    'consulting': {
      title: 'IT Consulting',
      description: 'Expert guidance for your technology decisions and implementations.',
      icon: <FaLightbulb className="w-8 h-8" />,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      features: ['Technology Strategy', 'Digital Transformation', 'Process Optimization'],
      process: [
        {
          title: 'Analysis',
          description: 'Analyze current technology landscape.'
        },
        {
          title: 'Strategy Development',
          description: 'Create technology roadmap.'
        },
        {
          title: 'Implementation Planning',
          description: 'Plan implementation strategy.'
        },
        {
          title: 'Execution Support',
          description: 'Support implementation process.'
        }
      ]
    }
  };

  const service = services[serviceId];

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-6 py-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The service you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/services')}
            className="bg-conison-magenta text-white px-6 py-3 rounded-lg hover:bg-conison-magenta/90 transition"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <button
              onClick={() => navigate('/services')}
              className="text-conison-magenta hover:text-conison-magenta/80 transition mb-8 inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Services
            </button>
            <div className="flex items-center mb-6">
              <div className={`p-3 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-conison-yellow/10'} mr-4`}>
                {service.icon}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">{service.title}</h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300">{service.description}</p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">What We Offer</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-6 w-6 text-conison-magenta mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.process.map((step, index) => (
                <div key={index} className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigate('/quote-request', { state: { service: service.title } })}
              className="bg-conison-magenta text-white px-8 py-4 rounded-lg hover:bg-conison-magenta/90 transition shadow-lg hover:shadow-xl text-lg"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage; 