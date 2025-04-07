import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import { FaShieldAlt, FaLock, FaUserShield, FaNetworkWired, FaBug } from 'react-icons/fa';
import ParticleBackground from '../../components/ParticleBackground';

const CybersecurityPage = () => {
  const { isDarkMode } = useDarkMode();

  const features = [
    {
      icon: <FaShieldAlt className="text-4xl text-conison-magenta" />,
      title: 'Security Assessment',
      description: 'Comprehensive security audits and vulnerability assessments for your systems.'
    },
    {
      icon: <FaLock className="text-4xl text-conison-magenta" />,
      title: 'Data Protection',
      description: 'Advanced encryption and security measures to protect your sensitive data.'
    },
    {
      icon: <FaUserShield className="text-4xl text-conison-magenta" />,
      title: 'Access Control',
      description: 'Implement secure authentication and authorization systems.'
    },
    {
      icon: <FaNetworkWired className="text-4xl text-conison-magenta" />,
      title: 'Network Security',
      description: 'Protect your network infrastructure from threats and attacks.'
    }
  ];

  const services = [
    {
      title: 'Security Solutions',
      items: ['Firewall Setup', 'Intrusion Detection', 'Malware Protection', 'VPN Services']
    },
    {
      title: 'Compliance',
      items: ['GDPR Compliance', 'HIPAA Compliance', 'PCI DSS', 'Security Audits']
    },
    {
      title: 'Monitoring & Support',
      items: ['24/7 Monitoring', 'Incident Response', 'Security Updates', 'Staff Training']
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
              Cyber<span className="text-conison-magenta">security</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Protect your business with our comprehensive cybersecurity solutions.
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Security Services</h2>
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
                      <FaBug className="text-conison-magenta mr-2" />
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
          <h2 className="text-3xl font-bold mb-6">Ready to Secure Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your security needs and implement the right solutions for your business.
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

export default CybersecurityPage; 