// data/ServiceData.js
import React from 'react';

const services = [
  {
    id: 'graphic-design',
    path: ['graphic-design'],
    category: 'Design & Creative',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Graphic Design',
    description: 'Professional graphic design services for all your visual communication needs.',
    subServices: [
      'Logo Design',
      'Business Cards, Letterheads, & Company Profiles',
      'Flyers, Banners, Posters, & Billboards',
      'Brochures, Catalogs, and Reports',
      'Social Media Graphics & Ads',
      'Product Packaging Design'
    ],
    features: [
      'Logo Design',
      'Brand Identity Materials',
      'Print Design',
      'Digital Graphics',
      'Packaging Design',
      'Marketing Collateral'
    ]
  },
  {
    id: 'branding',
    path: ['branding', 'brand-identity'],
    category: 'Design & Creative',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Branding & Identity',
    description: 'Create a memorable brand identity that sets you apart from the competition.',
    subServices: [
      'Company Branding (visual identity, brand guidelines)',
      'Event Branding (backdrops, stage setup, digital banners)',
      'Branded Merchandise (T-shirts, Mugs, Caps, Stickers)',
      'Vehicle Branding'
    ],
    features: [
      'Brand Strategy',
      'Visual Identity Development',
      'Brand Guidelines',
      'Logo Design',
      'Brand Messaging',
      'Brand Collateral Design'
    ]
  },
  {
    id: 'web-development',
    path: ['web-development', 'website', 'web-design'],
    category: 'Development',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Web & App Development',
    description: 'Custom websites and applications designed to meet your specific business needs.',
    subServices: [
      'Website Development (corporate, e-commerce, blogs, portfolios)',
      'Custom Mobile & Web Apps',
      'UI/UX Design & Prototyping',
      'Domain Registration & Web Hosting',
      'Website Maintenance & Support',
      'Payment Gateway Integration'
    ],
    features: [
      'Custom Website Development',
      'E-commerce Solutions',
      'Content Management Systems',
      'Web Application Development',
      'Mobile App Development',
      'Responsive Design',
      'UI/UX Design'
    ]
  },
  {
    id: 'digital-marketing',
    path: ['digital-marketing', 'marketing', 'online-marketing'],
    category: 'Marketing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
      </svg>
    ),
    title: 'Digital Marketing',
    description: 'Strategic marketing campaigns that drive traffic, leads, and conversions for sustainable growth.',
    subServices: [
      'Social Media Management & Marketing (Facebook, Instagram, LinkedIn, Twitter)',
      'Google & Facebook Ads Management',
      'SEO (Search Engine Optimization)',
      'Email & SMS Marketing',
      'Influencer & Affiliate Marketing'
    ],
    features: [
      'Search Engine Optimization (SEO)',
      'Social Media Marketing',
      'Pay-Per-Click (PPC) Advertising',
      'Email Marketing',
      'Content Marketing',
      'Analytics & Reporting',
      'Marketing Strategy'
    ]
  },
  {
    id: 'motion-graphics',
    path: ['motion-graphics', 'animation', 'video'],
    category: 'Design & Creative',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Motion Graphics & Video Editing',
    description: 'Engaging video content that effectively communicates your message.',
    subServices: [
      'Animated Explainers & Promo Videos',
      'Logo Animations',
      'Short Ads for Social Media & TV',
      'Event Highlight Videos'
    ],
    features: [
      'Motion Graphics Design',
      'Video Editing',
      'Animation',
      'Visual Effects',
      'Logo Animation',
      'Explainer Videos',
      'Social Media Videos'
    ]
  },
  {
    id: 'photography',
    path: ['photography', 'photo', 'videography'],
    category: 'Design & Creative',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Photography & Videography',
    description: 'Professional photography and videography services for all your visual needs.',
    subServices: [
      'Business Photography (products, corporate headshots)',
      'Event Coverage (weddings, conferences, private events)',
      'Drone Videography & Photography'
    ],
    features: [
      'Product Photography',
      'Corporate Photography',
      'Event Photography',
      'Aerial Photography',
      'Video Production',
      'Video Editing',
      'Commercial Photography'
    ]
  },
  {
    id: 'it-solutions',
    path: ['it-solutions', 'software', 'it'],
    category: 'Development',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    title: 'Corporate IT Solutions & Software Development',
    description: 'Tailored IT solutions to streamline your business operations.',
    subServices: [
      'Custom Business Management Software (inventory, accounting, HR systems)',
      'POS (Point of Sale) System Setup',
      'CRM (Customer Relationship Management) solutions',
      'ERP (Enterprise Resource Planning) solutions'
    ],
    features: [
      'Custom Software Development',
      'ERP Solutions',
      'CRM Implementation',
      'IT Infrastructure Setup',
      'Business Intelligence Solutions',
      'POS Systems',
      'Software Integration'
    ]
  },
  {
    id: 'cybersecurity',
    path: ['cybersecurity', 'security', 'data-protection'],
    category: 'IT Services',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Cybersecurity & Data Protection',
    description: 'Comprehensive security solutions to protect your digital assets and sensitive information.',
    subServices: [
      'Website & Server Security Audits',
      'Data Backup & Recovery Solutions',
      'Cyber Threat Analysis & Prevention'
    ],
    features: [
      'Security Audits',
      'Penetration Testing',
      'Data Encryption',
      'Secure Network Design',
      'Security Monitoring',
      'Data Backup Solutions',
      'Disaster Recovery Planning'
    ]
  },
  {
    id: 'ecommerce',
    path: ['ecommerce', 'online-store', 'shop'],
    category: 'Development',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    title: 'E-Commerce Solutions',
    description: 'Complete e-commerce solutions to help you sell your products online.',
    subServices: [
      'Online Store Setup (Shopify, WooCommerce, Custom Solutions)',
      'Product Photography & Listing Services',
      'E-Commerce Strategy & Marketing'
    ],
    features: [
      'E-commerce Website Development',
      'Shopping Cart Integration',
      'Payment Gateway Setup',
      'Product Catalog Management',
      'Order Processing Systems',
      'Inventory Management',
      'E-commerce SEO'
    ]
  },
  {
    id: 'ai-automation',
    path: ['ai-automation', 'artificial-intelligence', 'automation'],
    category: 'IT Services',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'AI & Automation Services',
    description: 'Leverage the power of AI to automate and enhance your business processes.',
    subServices: [
      'AI Chatbot Development for Businesses',
      'Marketing Automation (email, SMS, WhatsApp)',
      'AI-powered Social Media Management'
    ],
    features: [
      'AI Chatbot Development',
      'Workflow Automation',
      'Marketing Automation',
      'Process Optimization',
      'Machine Learning Solutions',
      'Data Analysis Automation',
      'Predictive Analytics'
    ]
  },
  {
    id: 'business-consulting',
    path: ['business-consulting', 'consulting', 'training'],
    category: 'Consulting',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: 'Business Consultation & Training',
    description: 'Expert business consultation and training to help you achieve your goals.',
    subServices: [
      'Digital Marketing Workshops'
    ],
    features: [
      'Business Strategy Development',
      'Digital Transformation Consulting',
      'Marketing Strategy',
      'Process Optimization',
      'Technology Integration Consulting',
      'Staff Training Programs',
      'Performance Analysis'
    ]
  }
];

export default services; 