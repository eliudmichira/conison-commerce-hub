import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import { FaCloud, FaServer, FaDatabase, FaLock, FaSync } from 'react-icons/fa';
import ParticleBackground from '../../components/ParticleBackground';
import { useNavigate } from 'react-router-dom';

const CloudSolutionsPage = () => {
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();

  const features = [
    {
      icon: <FaCloud className="text-4xl text-conison-magenta" />,
      title: 'Cloud Migration',
      description: 'Seamlessly transition your existing infrastructure to the cloud with minimal disruption to your business.'
    },
    {
      icon: <FaServer className="text-4xl text-conison-magenta" />,
      title: 'Cloud Infrastructure',
      description: 'Design and implement scalable, reliable cloud infrastructure tailored to your specific business needs.'
    },
    {
      icon: <FaDatabase className="text-4xl text-conison-magenta" />,
      title: 'Cloud Database Solutions',
      description: 'Implement high-performance, scalable database solutions in the cloud with automated backups and failover.'
    },
    {
      icon: <FaLock className="text-4xl text-conison-magenta" />,
      title: 'Cloud Security',
      description: 'Secure your cloud infrastructure with industry best practices, encryption, and compliance standards.'
    }
  ];

  const providers = [
    {
      name: 'Amazon Web Services (AWS)',
      services: ['EC2', 'S3', 'RDS', 'Lambda', 'CloudFront']
    },
    {
      name: 'Microsoft Azure',
      services: ['Virtual Machines', 'Blob Storage', 'SQL Database', 'Azure Functions', 'Cosmos DB']
    },
    {
      name: 'Google Cloud Platform (GCP)',
      services: ['Compute Engine', 'Cloud Storage', 'Cloud SQL', 'Cloud Functions', 'BigQuery']
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
              Cloud <span className="text-conison-magenta">Solutions</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Scalable, secure, and cost-effective cloud services to power your business innovation.
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

      {/* Benefits Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits of Cloud Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-semibold mb-4">Cost Efficiency</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaSync className="text-conison-magenta mr-2 mt-1 flex-shrink-0" />
                  <span>Pay only for what you use with flexible pricing models</span>
                </li>
                <li className="flex items-start">
                  <FaSync className="text-conison-magenta mr-2 mt-1 flex-shrink-0" />
                  <span>Reduce capital expenditure on hardware and maintenance</span>
                </li>
                <li className="flex items-start">
                  <FaSync className="text-conison-magenta mr-2 mt-1 flex-shrink-0" />
                  <span>Scale resources up or down based on demand</span>
                </li>
              </ul>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-semibold mb-4">Scalability & Flexibility</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaSync className="text-conison-magenta mr-2 mt-1 flex-shrink-0" />
                  <span>Quickly scale to meet business growth or seasonal demands</span>
                </li>
                <li className="flex items-start">
                  <FaSync className="text-conison-magenta mr-2 mt-1 flex-shrink-0" />
                  <span>Adapt rapidly to changing business requirements</span>
                </li>
                <li className="flex items-start">
                  <FaSync className="text-conison-magenta mr-2 mt-1 flex-shrink-0" />
                  <span>Access resources from anywhere with internet connection</span>
                </li>
              </ul>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-semibold mb-4">Security & Compliance</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaSync className="text-conison-magenta mr-2 mt-1 flex-shrink-0" />
                  <span>Enterprise-grade security with advanced threat protection</span>
                </li>
                <li className="flex items-start">
                  <FaSync className="text-conison-magenta mr-2 mt-1 flex-shrink-0" />
                  <span>Automatic updates and security patches</span>
                </li>
                <li className="flex items-start">
                  <FaSync className="text-conison-magenta mr-2 mt-1 flex-shrink-0" />
                  <span>Compliance with industry standards (GDPR, HIPAA, etc.)</span>
                </li>
              </ul>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-semibold mb-4">Reliability & Performance</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <FaSync className="text-conison-magenta mr-2 mt-1 flex-shrink-0" />
                  <span>High availability with redundant systems and failover</span>
                </li>
                <li className="flex items-start">
                  <FaSync className="text-conison-magenta mr-2 mt-1 flex-shrink-0" />
                  <span>Improved disaster recovery capabilities</span>
                </li>
                <li className="flex items-start">
                  <FaSync className="text-conison-magenta mr-2 mt-1 flex-shrink-0" />
                  <span>Optimized performance with global content delivery</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cloud Providers Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Cloud Providers We Work With</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {providers.map((provider, index) => (
              <div key={index} className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className="text-xl font-semibold mb-4 text-center">{provider.name}</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {provider.services.map((service, serviceIndex) => (
                    <span
                      key={serviceIndex}
                      className={`px-3 py-1 rounded-full text-sm ${
                        isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-800'
                      }`}
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Move to the Cloud?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your cloud strategy and create a solution that transforms your business.
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

export default CloudSolutionsPage; 