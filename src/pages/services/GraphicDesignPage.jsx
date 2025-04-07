import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import { FaPalette, FaPen, FaImage, FaLayerGroup, FaBrush } from 'react-icons/fa';
import ParticleBackground from '../../components/ParticleBackground';

const GraphicDesignPage = () => {
  const { isDarkMode } = useDarkMode();

  const features = [
    {
      icon: <FaPalette className="text-4xl text-conison-magenta" />,
      title: 'Brand Identity',
      description: 'Create a strong visual identity with logos, color schemes, and brand guidelines.'
    },
    {
      icon: <FaPen className="text-4xl text-conison-magenta" />,
      title: 'Print Design',
      description: 'Professional designs for business cards, brochures, flyers, and other print materials.'
    },
    {
      icon: <FaImage className="text-4xl text-conison-magenta" />,
      title: 'Digital Graphics',
      description: 'Eye-catching designs for social media, websites, and digital marketing materials.'
    },
    {
      icon: <FaLayerGroup className="text-4xl text-conison-magenta" />,
      title: 'UI/UX Design',
      description: 'User-friendly interfaces and experiences for websites and applications.'
    }
  ];

  const services = [
    {
      title: 'Branding',
      items: ['Logo Design', 'Brand Guidelines', 'Business Cards', 'Stationery']
    },
    {
      title: 'Marketing Materials',
      items: ['Brochures', 'Flyers', 'Banners', 'Social Media Graphics']
    },
    {
      title: 'Digital Design',
      items: ['Website Graphics', 'App Interfaces', 'Email Templates', 'Digital Ads']
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
              Graphic <span className="text-conison-magenta">Design</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Transform your ideas into stunning visual designs that capture your brand's essence.
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Design Services</h2>
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
                      <FaBrush className="text-conison-magenta mr-2" />
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
          <h2 className="text-3xl font-bold mb-6">Ready to Elevate Your Brand?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's create stunning designs that make your brand stand out.
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

export default GraphicDesignPage; 