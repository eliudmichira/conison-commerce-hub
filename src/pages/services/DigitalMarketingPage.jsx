import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import { FaChartLine, FaSearch, FaHashtag, FaEnvelope, FaAd, FaBullhorn } from 'react-icons/fa';
import ParticleBackground from '../../components/ParticleBackground';

const DigitalMarketingPage = () => {
  const { isDarkMode } = useDarkMode();

  const features = [
    {
      icon: <FaSearch className="text-4xl text-conison-magenta" />,
      title: 'SEO Optimization',
      description: "Improve your website's visibility in search engines and drive organic traffic."
    },
    {
      icon: <FaAd className="text-4xl text-conison-magenta" />,
      title: 'PPC Advertising',
      description: 'Targeted pay-per-click campaigns to reach your ideal customers.'
    },
    {
      icon: <FaHashtag className="text-4xl text-conison-magenta" />,
      title: 'Social Media Marketing',
      description: 'Engage with your audience and build brand awareness across social platforms.'
    },
    {
      icon: <FaEnvelope className="text-4xl text-conison-magenta" />,
      title: 'Email Marketing',
      description: 'Effective email campaigns to nurture leads and maintain customer relationships.'
    }
  ];

  const strategies = [
    {
      title: 'Content Strategy',
      items: ['Blog Writing', 'Content Planning', 'SEO Content', 'Content Distribution']
    },
    {
      title: 'Social Media',
      items: ['Platform Management', 'Community Engagement', 'Influencer Marketing', 'Analytics']
    },
    {
      title: 'Analytics & Reporting',
      items: ['Performance Tracking', 'ROI Analysis', 'Campaign Optimization', 'Monthly Reports']
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
              Digital <span className="text-conison-magenta">Marketing</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Drive growth and increase your online presence with our comprehensive digital marketing services.
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

      {/* Strategies Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Marketing Strategies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {strategies.map((strategy, index) => (
              <div 
                key={index}
                className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
              >
                <h3 className="text-xl font-semibold mb-4">{strategy.title}</h3>
                <ul className="space-y-2">
                  {strategy.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center">
                      <FaBullhorn className="text-conison-magenta mr-2" />
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
          <h2 className="text-3xl font-bold mb-6">Ready to Grow Your Business?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your marketing goals and create a strategy that delivers results.
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

export default DigitalMarketingPage; 