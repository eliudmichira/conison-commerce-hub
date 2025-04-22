// components/ServiceComparison.js
import React, { useState } from 'react';
import { Check, X, Info } from 'lucide-react';

const ServiceComparison = ({ isDarkMode, onSelectService }) => {
  const [activeTab, setActiveTab] = useState('web');
  
  // Service comparison tabs
  const tabs = [
    { id: 'web', label: 'Web Development' },
    { id: 'design', label: 'Graphic Design' },
    { id: 'marketing', label: 'Digital Marketing' },
    { id: 'app', label: 'App Development' }
  ];
  
  // Service package definitions for each category
  const servicePackages = {
    web: [
      {
        name: "Basic Website",
        price: "$350 - $600",
        serviceId: "web-development",
        typeId: "basic-business",
        features: [
          { text: "5-7 Pages", included: true },
          { text: "Mobile Responsive", included: true },
          { text: "Contact Form", included: true },
          { text: "Social Media Integration", included: true },
          { text: "Basic SEO", included: true },
          { text: "CMS Integration", included: false },
          { text: "E-commerce Functionality", included: false },
          { text: "Custom Functionality", included: false }
        ]
      },
      {
        name: "Business Website",
        price: "$600 - $1,500",
        serviceId: "web-development",
        typeId: "business-website",
        features: [
          { text: "8-15 Pages", included: true },
          { text: "Mobile Responsive", included: true },
          { text: "Contact Form", included: true },
          { text: "Social Media Integration", included: true },
          { text: "Advanced SEO", included: true },
          { text: "CMS Integration", included: true },
          { text: "E-commerce Functionality", included: false },
          { text: "Custom Functionality", included: true, limited: true }
        ]
      },
      {
        name: "E-commerce Website",
        price: "$1,000 - $2,500",
        serviceId: "e-commerce",
        typeId: "standard",
        features: [
          { text: "10-20 Products", included: true },
          { text: "Mobile Responsive", included: true },
          { text: "Contact Form", included: true },
          { text: "Social Media Integration", included: true },
          { text: "Advanced SEO", included: true },
          { text: "CMS Integration", included: true },
          { text: "E-commerce Functionality", included: true },
          { text: "Custom Functionality", included: true }
        ]
      }
    ],
    design: [
      {
        name: "Logo Design",
        price: "$150 - $450",
        serviceId: "graphic-design",
        typeId: "logo-design",
        features: [
          { text: "3 Initial Concepts", included: true },
          { text: "2 Revision Rounds", included: true },
          { text: "Vector Files", included: true },
          { text: "Print-Ready Files", included: true },
          { text: "Brand Guidelines", included: false },
          { text: "Social Media Kit", included: false },
          { text: "Stationery Design", included: false },
          { text: "Brand Strategy", included: false }
        ]
      },
      {
        name: "Branding Package",
        price: "$450 - $800",
        serviceId: "graphic-design",
        typeId: "branding-package",
        features: [
          { text: "5 Initial Concepts", included: true },
          { text: "3 Revision Rounds", included: true },
          { text: "Vector Files", included: true },
          { text: "Print-Ready Files", included: true },
          { text: "Brand Guidelines", included: true },
          { text: "Social Media Kit", included: true },
          { text: "Stationery Design", included: true },
          { text: "Brand Strategy", included: false }
        ]
      },
      {
        name: "Corporate Identity",
        price: "$800 - $1,500",
        serviceId: "graphic-design",
        typeId: "corporate-identity",
        features: [
          { text: "5 Initial Concepts", included: true },
          { text: "Unlimited Revisions", included: true },
          { text: "Vector Files", included: true },
          { text: "Print-Ready Files", included: true },
          { text: "Brand Guidelines", included: true },
          { text: "Social Media Kit", included: true },
          { text: "Stationery Design", included: true },
          { text: "Brand Strategy", included: true }
        ]
      }
    ],
    marketing: [
      {
        name: "Social Media Basic",
        price: "$200 - $500/mo",
        serviceId: "digital-marketing",
        typeId: "social-media-basic",
        features: [
          { text: "3 Platforms", included: true },
          { text: "8 Posts per Month", included: true },
          { text: "Monthly Reports", included: true },
          { text: "Community Management", included: true },
          { text: "Content Calendar", included: true },
          { text: "Paid Ads Management", included: false },
          { text: "Competitor Analysis", included: false },
          { text: "Strategy Development", included: false }
        ]
      },
      {
        name: "Social Media Pro",
        price: "$500 - $1,200/mo",
        serviceId: "digital-marketing",
        typeId: "social-media-pro",
        features: [
          { text: "5 Platforms", included: true },
          { text: "16 Posts per Month", included: true },
          { text: "Weekly Reports", included: true },
          { text: "Community Management", included: true },
          { text: "Content Calendar", included: true },
          { text: "Paid Ads Management", included: true },
          { text: "Competitor Analysis", included: true },
          { text: "Strategy Development", included: false }
        ]
      },
      {
        name: "Social Media Enterprise",
        price: "$1,200 - $2,500/mo",
        serviceId: "digital-marketing",
        typeId: "social-media-enterprise",
        features: [
          { text: "All Platforms", included: true },
          { text: "30+ Posts per Month", included: true },
          { text: "Weekly Reports", included: true },
          { text: "24/7 Community Management", included: true },
          { text: "Content Calendar", included: true },
          { text: "Paid Ads Management", included: true },
          { text: "Competitor Analysis", included: true },
          { text: "Strategy Development", included: true }
        ]
      }
    ],
    app: [
      {
        name: "Basic App",
        price: "$2,500 - $5,000",
        serviceId: "app-development",
        typeId: "basic-app",
        features: [
          { text: "Single Platform (iOS or Android)", included: true },
          { text: "User Authentication", included: true },
          { text: "Basic UI Design", included: true },
          { text: "Up to 5 Screens", included: true },
          { text: "Performance Analytics", included: true },
          { text: "Push Notifications", included: false },
          { text: "API Integration", included: false },
          { text: "Admin Dashboard", included: false }
        ]
      },
      {
        name: "Standard App",
        price: "$5,000 - $10,000",
        serviceId: "app-development",
        typeId: "standard-app",
        features: [
          { text: "Cross-platform (iOS & Android)", included: true },
          { text: "User Authentication", included: true },
          { text: "Custom UI Design", included: true },
          { text: "Up to 10 Screens", included: true },
          { text: "Performance Analytics", included: true },
          { text: "Push Notifications", included: true },
          { text: "API Integration", included: true },
          { text: "Admin Dashboard", included: false }
        ]
      },
      {
        name: "Premium App",
        price: "$10,000+",
        serviceId: "app-development",
        typeId: "premium-app",
        features: [
          { text: "Cross-platform (iOS & Android)", included: true },
          { text: "Advanced Authentication", included: true },
          { text: "Premium UI/UX Design", included: true },
          { text: "Unlimited Screens", included: true },
          { text: "Advanced Analytics", included: true },
          { text: "Push Notifications", included: true },
          { text: "Multiple API Integrations", included: true },
          { text: "Custom Admin Dashboard", included: true }
        ]
      }
    ]
  };
  
  // Function to render check or x icon for features
  const renderFeatureIcon = (feature) => {
    if (feature.included) {
      return feature.limited ? (
        <div className="flex items-center text-yellow-500">
          <Check className="w-5 h-5" />
          <span className="text-xs ml-1">(Limited)</span>
        </div>
      ) : (
        <Check className="w-5 h-5 text-green-500" />
      );
    }
    return <X className="w-5 h-5 text-red-500" />;
  };

  return (
    <div>
      {/* Service Category Tabs */}
      <div className="flex overflow-x-auto pb-2 hide-scrollbar mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 font-medium rounded-lg mr-2 transition-all ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white'
                : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Comparison Table */}
      <div className={`rounded-xl overflow-hidden border ${
        isDarkMode ? 'border-gray-700' : 'border-gray-200'
      }`}>
        {/* Table Header */}
        <div className={`grid grid-cols-4 ${
          isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <div className="p-4 font-medium">Features</div>
          {servicePackages[activeTab].map((pkg, index) => (
            <div key={index} className="p-4 font-medium text-center">{pkg.name}</div>
          ))}
        </div>
        
        {/* Table Body */}
        <div className={isDarkMode ? 'bg-gray-800' : 'bg-white'}>
          {/* Price Row */}
          <div className={`grid grid-cols-4 ${
            isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'
          }`}>
            <div className={`p-4 font-medium ${
              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
            }`}>Price</div>
            {servicePackages[activeTab].map((pkg, index) => (
              <div key={index} className="p-4 text-center">
                <span className="font-semibold text-red-600">{pkg.price}</span>
              </div>
            ))}
          </div>
          
          {/* Feature Rows */}
          {servicePackages[activeTab][0].features.map((feature, featureIndex) => (
            <div 
              key={featureIndex} 
              className={`grid grid-cols-4 ${
                featureIndex < servicePackages[activeTab][0].features.length - 1
                  ? isDarkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'
                  : ''
              }`}
            >
              <div className={`p-4 ${
                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
              }`}>
                {feature.text}
              </div>
              {servicePackages[activeTab].map((pkg, pkgIndex) => (
                <div key={pkgIndex} className="p-4 flex justify-center items-center">
                  {renderFeatureIcon(pkg.features[featureIndex])}
                </div>
              ))}
            </div>
          ))}
          
          {/* Action Buttons */}
          <div className={`grid grid-cols-4 ${
            isDarkMode ? 'border-t border-gray-700 bg-gray-700/50' : 'border-t border-gray-200 bg-gray-50'
          }`}>
            <div className="p-4"></div>
            {servicePackages[activeTab].map((pkg, index) => (
              <div key={index} className="p-4 flex justify-center">
                <button
                  onClick={() => onSelectService(pkg.serviceId, pkg.typeId)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                >
                  Get Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex items-start text-sm text-gray-500 dark:text-gray-400">
        <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
        <p>Pricing shown is estimated and may vary based on specific project requirements. Request a custom quote for accurate pricing.</p>
      </div>
    </div>
  );
};

export default ServiceComparison;