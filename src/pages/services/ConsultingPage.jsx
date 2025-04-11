import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import { FaLightbulb, FaChartLine, FaCogs, FaRocket } from 'react-icons/fa';
import ParticleBackground from '../../components/ParticleBackground';
import { useNavigate } from 'react-router-dom';

const ConsultingPage = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const services = [
    {
      icon: <FaLightbulb className="text-4xl text-conison-magenta" />,
      title: 'Technology Strategy',
      description: 'Develop a comprehensive technology roadmap aligned with your business goals and objectives.',
      features: [
        'IT Strategic Planning',
        'Digital Transformation Roadmap',
        'Technology Assessment',
        'Vendor Selection'
      ]
    },
    {
      icon: <FaChartLine className="text-4xl text-conison-magenta" />,
      title: 'Business Analysis',
      description: 'Identify opportunities for improvement and optimize your business processes with technology.',
      features: [
        'Process Optimization',
        'Requirements Analysis',
        'Data-Driven Insights',
        'Performance Metrics'
      ]
    },
    {
      icon: <FaCogs className="text-4xl text-conison-magenta" />,
      title: 'Implementation Support',
      description: 'Expert guidance and support throughout the implementation phase of your technology projects.',
      features: [
        'Project Management',
        'Change Management',
        'Risk Mitigation',
        'Quality Assurance'
      ]
    },
    {
      icon: <FaRocket className="text-4xl text-conison-magenta" />,
      title: 'Innovation Consulting',
      description: 'Explore emerging technologies and innovative solutions to give your business a competitive edge.',
      features: [
        'Technology Trends Analysis',
        'Innovation Workshops',
        'Proof of Concept Development',
        'Digital Innovation Strategy'
      ]
    }
  ];

  const testimonials = [
    {
      quote: "Conison's IT consulting services helped us navigate our digital transformation journey with confidence. Their strategic guidance was invaluable.",
      name: "Sarah Johnson",
      title: "CTO, Global Retail Solutions"
    },
    {
      quote: "The team at Conison provided exceptional insights that transformed our approach to technology. Their expertise helped us achieve our business goals faster.",
      name: "Michael Chen",
      title: "Director of Operations, FinTech Innovations"
    },
    {
      quote: "Working with Conison's consultants was a game-changer for our organization. Their practical recommendations led to significant efficiency improvements.",
      name: "Jessica Martinez",
      title: "CEO, Healthcare Solutions"
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
              IT <span className="text-conison-magenta">Consulting</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Strategic guidance and expert advice to help your business leverage technology for growth and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Consulting Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} hover:shadow-lg transition-shadow`}
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  {service.description}
                </p>
                <div>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <span className="h-2 w-2 rounded-full bg-conison-magenta mt-1.5 mr-2 flex-shrink-0"></span>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Consulting Process</h2>
          <div className="relative">
            {/* Connector Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-conison-magenta transform -translate-x-1/2 hidden md:block"></div>
            
            {/* Process Steps */}
            <div className="space-y-12 relative">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <h3 className="text-xl font-semibold mb-2">Discovery & Assessment</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    We begin by understanding your current technology landscape, business goals, and challenges through interviews and analysis.
                  </p>
                </div>
                <div className="md:w-12 flex justify-center items-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-conison-magenta flex items-center justify-center text-white font-bold">1</div>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="md:w-12 flex justify-center items-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-conison-magenta flex items-center justify-center text-white font-bold">2</div>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 md:text-left">
                  <h3 className="text-xl font-semibold mb-2">Strategy Development</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    Based on our assessment, we develop a tailored strategic plan with recommendations for technology adoption and optimization.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 mb-6 md:mb-0 md:text-right">
                  <h3 className="text-xl font-semibold mb-2">Implementation Planning</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    We create a detailed implementation roadmap with prioritized initiatives, resource requirements, and timeline.
                  </p>
                </div>
                <div className="md:w-12 flex justify-center items-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-conison-magenta flex items-center justify-center text-white font-bold">3</div>
                </div>
                <div className="md:w-1/2 md:pl-12 hidden md:block"></div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 hidden md:block"></div>
                <div className="md:w-12 flex justify-center items-center relative z-10">
                  <div className="w-12 h-12 rounded-full bg-conison-magenta flex items-center justify-center text-white font-bold">4</div>
                </div>
                <div className="md:w-1/2 md:pl-12 mb-6 md:mb-0 md:text-left">
                  <h3 className="text-xl font-semibold mb-2">Execution & Support</h3>
                  <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                    We provide guidance and support during implementation, helping you navigate challenges and ensure successful outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} hover:shadow-lg transition-shadow`}
              >
                <div className="mb-4">
                  <svg className="h-8 w-8 text-conison-magenta opacity-50" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4 italic`}>
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get expert guidance on how to leverage technology to achieve your business goals.
          </p>
          <button 
            onClick={() => navigate('/quote-request')}
            className="inline-block bg-conison-magenta text-white px-8 py-3 rounded-lg hover:bg-conison-magenta-dark transition-colors"
          >
            Schedule a Consultation
          </button>
        </div>
      </section>
    </div>
  );
};

export default ConsultingPage; 