import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import { FaMobile, FaCode, FaAndroid, FaApple, FaReact, FaDatabase, FaCloud } from 'react-icons/fa';
import { SiFlutter } from 'react-icons/si';
import ParticleBackground from '../../components/ParticleBackground';

const MobileDevelopmentPage = () => {
  const { isDarkMode } = useDarkMode();

  const features = [
    {
      icon: <FaMobile className="text-4xl text-conison-magenta" />,
      title: 'Cross-Platform Development',
      description: 'Build apps that work seamlessly across iOS and Android platforms using React Native and Flutter.'
    },
    {
      icon: <FaCode className="text-4xl text-conison-magenta" />,
      title: 'Native App Development',
      description: 'High-performance native applications using Swift for iOS and Kotlin for Android.'
    },
    {
      icon: <FaDatabase className="text-4xl text-conison-magenta" />,
      title: 'Backend Integration',
      description: 'Seamless integration with cloud services, databases, and APIs for robust functionality.'
    },
    {
      icon: <FaCloud className="text-4xl text-conison-magenta" />,
      title: 'Cloud Services',
      description: 'Integration with cloud platforms for scalable storage, authentication, and real-time features.'
    }
  ];

  const technologies = [
    { name: 'React Native', icon: <FaReact className="text-4xl text-blue-500" /> },
    { name: 'Flutter', icon: <SiFlutter className="text-4xl text-blue-400" /> },
    { name: 'iOS (Swift)', icon: <FaApple className="text-4xl text-gray-800" /> },
    { name: 'Android (Kotlin)', icon: <FaAndroid className="text-4xl text-green-500" /> }
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
              Mobile <span className="text-conison-magenta">Development</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Transform your ideas into powerful mobile applications with our expert development team.
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {technologies.map((tech, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-6"
              >
                <div className="mb-4">{tech.icon}</div>
                <h3 className="text-lg font-semibold">{tech.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Development Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-semibold mb-4">1. Planning & Design</h3>
              <ul className="space-y-2">
                <li>• Requirements Analysis</li>
                <li>• UI/UX Design</li>
                <li>• Architecture Planning</li>
                <li>• Technology Selection</li>
              </ul>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-semibold mb-4">2. Development</h3>
              <ul className="space-y-2">
                <li>• Agile Development</li>
                <li>• Code Review</li>
                <li>• Continuous Integration</li>
                <li>• Quality Assurance</li>
              </ul>
            </div>
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <h3 className="text-xl font-semibold mb-4">3. Deployment & Support</h3>
              <ul className="space-y-2">
                <li>• App Store Submission</li>
                <li>• Performance Optimization</li>
                <li>• Regular Updates</li>
                <li>• Ongoing Support</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Mobile App?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a custom solution that meets your business needs.
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

export default MobileDevelopmentPage; 