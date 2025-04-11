import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../components/ui/button';
import { MoveRight, Award, BarChart3, Users, Clock, Filter, Search, 
  ArrowUpRight, ChevronRight, ExternalLink, Zap, Check, Calendar
} from 'lucide-react';
import { 
  FaStar, FaLaptopCode, FaMobile, FaPalette, 
  FaDatabase, FaServer, FaRobot, FaChartLine
} from 'react-icons/fa';
import { useDarkMode } from '../context/DarkModeContext';

// Portfolio categories
const categories = [
  { id: 'all', name: 'All Projects' },
  { id: 'web-development', name: 'Web Development' },
  { id: 'mobile-development', name: 'Mobile Development' },
  { id: 'ecommerce', name: 'E-commerce' },
  { id: 'ui-ux', name: 'UI/UX Design' },
  { id: 'data', name: 'Data & Analytics' }
];

// Years for filtering
const years = ['All', '2024', '2023', '2022', '2021'];

// Comprehensive list of projects
const portfolioProjects = [
  {
    id: 'e-commerce-platform',
    title: 'E-commerce Platform',
    description: 'Custom e-commerce solution with advanced features, seamless user experience, and integrated payment processing.',
    longDescription: 'A fully custom e-commerce platform built from the ground up to meet the specific needs of a high-end fashion retailer. The solution includes inventory management, customer analytics, multi-payment gateway integration, and a headless CMS for content management.',
    category: 'ecommerce',
    image: 'https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    icon: FaLaptopCode,
    client: 'StyleLuxe Fashion',
    year: 2023,
    duration: '4 months',
    teamSize: 6,
    featured: true,
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    projectUrl: 'https://styleluxe.example.com',
    stats: {
      sales: '+45%',
      conversion: '+28%',
      retention: '+35%'
    },
    testimonial: {
      quote: "The new platform dramatically improved our customer experience while increasing our sales metrics across the board.",
      author: "Sarah Chen",
      position: "CTO, StyleLuxe Fashion"
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'E-commerce dashboard',
        caption: 'Admin dashboard with real-time analytics'
      },
      {
        src: 'https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Product management interface',
        caption: 'Inventory management system'
      }
    ]
  },
  {
    id: 'mobile-banking-app',
    title: 'Mobile Banking Application',
    description: 'Secure and user-friendly mobile banking solution with biometric authentication and instant transfers.',
    longDescription: 'A comprehensive mobile banking application built for a regional financial institution. The app features biometric security, real-time transaction processing, bill payments, and investment management tools. The UI was designed for maximum ease of use while maintaining strict security standards.',
    category: 'mobile-development',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    icon: FaMobile,
    client: 'SecureBank Financial',
    year: 2023,
    duration: '6 months',
    teamSize: 7,
    featured: true,
    technologies: ['React Native', 'Node.js', 'PostgreSQL', 'Firebase', 'OAuth'],
    projectUrl: 'https://securebank.example.com',
    stats: {
      adoption: '80%',
      transactions: '+120%',
      satisfaction: '4.7/5'
    },
    testimonial: {
      quote: "Our customers love the new mobile experience, and we've seen a dramatic increase in digital transactions.",
      author: "Robert Johnson",
      position: "Digital Director, SecureBank"
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1616077168079-7e09a677fb2c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Banking app interface',
        caption: 'User dashboard and financial overview'
      },
      {
        src: 'https://images.unsplash.com/photo-1613487665223-ac5a3e42ce75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Security features',
        caption: 'Biometric authentication system'
      }
    ]
  },
  {
    id: 'healthcare-management-system',
    title: 'Healthcare Management System',
    description: 'Comprehensive healthcare management platform for patient records, scheduling, and telemedicine.',
    longDescription: 'An integrated healthcare management system designed for a multi-location medical practice. The platform includes electronic health records, appointment scheduling, telemedicine capabilities, billing integration, and HIPAA-compliant data security measures.',
    category: 'web-development',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    icon: FaServer,
    client: 'MediCare Health Network',
    year: 2022,
    duration: '8 months',
    teamSize: 9,
    featured: false,
    technologies: ['Angular', 'Java Spring', 'PostgreSQL', 'AWS', 'Docker'],
    projectUrl: 'https://medicare-network.example.com',
    stats: {
      efficiency: '+40%',
      errors: '-65%',
      satisfaction: '4.8/5'
    },
    testimonial: {
      quote: "The system has transformed our practice management and patient care workflow. Our staff productivity has increased dramatically.",
      author: "Dr. Lisa Wong",
      position: "Medical Director, MediCare Health"
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Healthcare dashboard',
        caption: 'Provider dashboard with patient overview'
      },
      {
        src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Appointment scheduling',
        caption: 'Intelligent scheduling system'
      }
    ]
  },
  {
    id: 'ai-content-platform',
    title: 'AI Content Generation Platform',
    description: 'Advanced AI-powered platform for automated content creation and optimization.',
    longDescription: 'A sophisticated content platform leveraging the latest in AI technology to help marketing teams generate and optimize content at scale. Features include multilingual content generation, SEO optimization, sentiment analysis, and an intuitive editing interface.',
    category: 'web-development',
    image: 'https://images.unsplash.com/photo-1677442135132-79f98fbf76dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    icon: FaRobot,
    client: 'ContentGenius',
    year: 2024,
    duration: '5 months',
    teamSize: 5,
    featured: true,
    technologies: ['React', 'Python', 'TensorFlow', 'OpenAI API', 'MongoDB'],
    projectUrl: 'https://contentgenius.example.com',
    stats: {
      productivity: '+160%',
      content: '+300%',
      cost: '-45%'
    },
    testimonial: {
      quote: "This platform has revolutionized our content creation process. We're producing 3x more content with half the team.",
      author: "James Wilkins",
      position: "Marketing Director, ContentGenius"
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1677442135132-79f98fbf76dc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'AI content dashboard',
        caption: 'Content generation workspace'
      },
      {
        src: 'https://images.unsplash.com/photo-1673476795042-1980095dc48c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Analytics dashboard',
        caption: 'Content performance analytics'
      }
    ]
  },
  {
    id: 'real-estate-marketplace',
    title: 'Real Estate Marketplace',
    description: 'Comprehensive property platform with virtual tours and mortgage calculator features.',
    longDescription: 'A feature-rich real estate platform connecting buyers, sellers, and agents. The application includes virtual property tours, mortgage calculators, neighborhood analytics, and an agent matching algorithm to enhance the property buying experience.',
    category: 'web-development',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    icon: FaLaptopCode,
    client: 'HomeQuest Realty',
    year: 2023,
    duration: '7 months',
    teamSize: 8,
    featured: false,
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'ThreeJS', 'Google Maps API'],
    projectUrl: 'https://homequest.example.com',
    stats: {
      listings: '+85%',
      engagement: '+64%',
      conversion: '+32%'
    },
    testimonial: {
      quote: "The virtual tour feature has been a game-changer for our agents and clients. It's transformed how we showcase properties.",
      author: "Michael Reynolds",
      position: "CEO, HomeQuest Realty"
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Property listings',
        caption: 'Property discovery interface'
      },
      {
        src: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Virtual tour',
        caption: 'Immersive virtual property tour'
      }
    ]
  },
  {
    id: 'fitness-tracking-app',
    title: 'Fitness Tracking Mobile App',
    description: 'Personalized fitness tracking solution with AI coaching and nutrition planning.',
    longDescription: 'A comprehensive fitness application that helps users track workouts, monitor nutrition, and receive personalized coaching. The app features AI-powered workout recommendations, progress tracking, social challenges, and integration with wearable devices.',
    category: 'mobile-development',
    image: 'https://images.unsplash.com/photo-1510440777527-38815cfc6cc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    icon: FaMobile,
    client: 'FitFocus',
    year: 2022,
    duration: '5 months',
    teamSize: 6,
    featured: false,
    technologies: ['React Native', 'Firebase', 'TensorFlow Lite', 'HealthKit', 'Google Fit'],
    projectUrl: 'https://fitfocus.example.com',
    stats: {
      downloads: '250K+',
      retention: '68%',
      rating: '4.6/5'
    },
    testimonial: {
      quote: "The app's personalized approach has helped us achieve exceptional user engagement and retention rates.",
      author: "Emily Torres",
      position: "Product Manager, FitFocus"
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1510440777527-38815cfc6cc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Fitness app interface',
        caption: 'Workout tracking dashboard'
      },
      {
        src: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Nutrition tracking',
        caption: 'Nutrition and meal planning interface'
      }
    ]
  },
  {
    id: 'brand-identity-design',
    title: 'Corporate Brand Identity',
    description: 'Complete brand identity package with logo design, style guides, and marketing materials.',
    longDescription: 'A comprehensive brand identity project for a technology startup entering the competitive SaaS market. The work included market research, logo design, typography selection, color palette development, brand guidelines, and a complete set of marketing materials.',
    category: 'ui-ux',
    image: 'https://images.unsplash.com/photo-1600508774634-4e11d34730e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    icon: FaPalette,
    client: 'Nexion Technologies',
    year: 2022,
    duration: '3 months',
    teamSize: 4,
    featured: false,
    technologies: ['Adobe Creative Suite', 'Figma', 'Sketch', 'InVision', 'Miro'],
    projectUrl: 'https://nexion.example.com',
    stats: {
      recognition: '+60%',
      engagement: '+75%',
      conversion: '+40%'
    },
    testimonial: {
      quote: "The brand identity has been instrumental in our market positioning and helped us secure Series A funding.",
      author: "Alexander Kim",
      position: "CEO, Nexion Technologies"
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1634942537034-2531766767a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Brand guidelines',
        caption: 'Visual identity guidelines'
      },
      {
        src: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Marketing materials',
        caption: 'Print and digital marketing collateral'
      }
    ]
  },
  {
    id: 'supply-chain-dashboard',
    title: 'Supply Chain Analytics Dashboard',
    description: 'Real-time visualization platform for global supply chain management and optimization.',
    longDescription: 'An advanced analytics platform that provides real-time visibility into global supply chain operations. The dashboard includes predictive analytics for inventory management, interactive visualizations of logistics networks, and AI-powered optimization recommendations.',
    category: 'data',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    icon: FaDatabase,
    client: 'GlobalLogistics Inc.',
    year: 2023,
    duration: '6 months',
    teamSize: 7,
    featured: false,
    technologies: ['React', 'D3.js', 'Python', 'TensorFlow', 'PostgreSQL', 'Tableau'],
    projectUrl: 'https://globallogistics.example.com',
    stats: {
      efficiency: '+50%',
      accuracy: '+40%',
      cost: '-25%'
    },
    testimonial: {
      quote: "This dashboard has transformed our supply chain visibility and decision-making capabilities.",
      author: "Thomas Jackson",
      position: "VP Operations, GlobalLogistics"
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Analytics dashboard',
        caption: 'Supply chain overview dashboard'
      },
      {
        src: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Data visualization',
        caption: 'Interactive logistics network map'
      }
    ]
  },
  {
    id: 'crypto-trading-platform',
    title: 'Cryptocurrency Trading Platform',
    description: 'Secure and high-performance trading platform with advanced analytics and portfolio management.',
    longDescription: 'A comprehensive cryptocurrency trading platform featuring real-time market data, automated trading strategies, portfolio analytics, and secure wallet management. The platform includes advanced charting tools, risk assessment metrics, and integration with multiple exchanges.',
    category: 'web-development',
    image: 'https://images.unsplash.com/photo-1621761311921-16e5d53feefa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    icon: FaChartLine,
    client: 'CryptoTrade Pro',
    year: 2023,
    duration: '9 months',
    teamSize: 10,
    featured: false,
    technologies: ['React', 'Node.js', 'WebSockets', 'MongoDB', 'Redis', 'TradingView API'],
    projectUrl: 'https://cryptotradepro.example.com',
    stats: {
      users: '100K+',
      volume: '$5M+/day',
      uptime: '99.99%'
    },
    testimonial: {
      quote: "The platform's performance and security features have exceeded our expectations and set a new standard in crypto trading.",
      author: "Daniel Chen",
      position: "CTO, CryptoTrade Pro"
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1621761311921-16e5d53feefa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Trading dashboard',
        caption: 'Real-time trading interface'
      },
      {
        src: 'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Portfolio analysis',
        caption: 'Advanced portfolio analytics'
      }
    ]
  },
  {
    id: 'education-learning-platform',
    title: 'Interactive E-Learning Platform',
    description: 'Engaging online education platform with interactive courses, assessments, and progress tracking.',
    longDescription: 'A comprehensive e-learning solution designed for higher education institutions. The platform features interactive course content, real-time assessment tools, student progress tracking, virtual collaboration spaces, and integration with learning management systems.',
    category: 'web-development',
    image: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    icon: FaLaptopCode,
    client: 'EduConnect',
    year: 2022,
    duration: '7 months',
    teamSize: 8,
    featured: false,
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'AWS', 'Canvas API'],
    projectUrl: 'https://educonnect.example.com',
    stats: {
      engagement: '+70%',
      completion: '+45%',
      satisfaction: '4.8/5'
    },
    testimonial: {
      quote: "The platform has transformed our online learning experience and significantly improved student engagement metrics.",
      author: "Dr. Sarah Miller",
      position: "Director of Online Learning, EduConnect"
    },
    images: [
      {
        src: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Learning dashboard',
        caption: 'Student learning dashboard'
      },
      {
        src: 'https://images.unsplash.com/photo-1626968361222-291e74711449?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        alt: 'Interactive course',
        caption: 'Interactive lesson interface'
      }
    ]
  }
];

// Key stats for scrolling banner
const statsData = [
  {
    icon: <Award className="h-6 w-6" />,
    text: "35+ Completed Projects",
    color: "text-yellow-500 dark:text-yellow-400"
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    text: "45% Average Growth",
    color: "text-green-600 dark:text-green-400"
  },
  {
    icon: <Users className="h-6 w-6" />,
    text: "500K+ End Users",
    color: "text-blue-600 dark:text-blue-400"
  },
  {
    icon: <FaStar className="h-6 w-6" />,
    text: "98% Client Satisfaction",
    color: "text-yellow-500 dark:text-yellow-400"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    text: "15,000+ Development Hours",
    color: "text-purple-600 dark:text-purple-400"
  }
];

const PortfolioPage = () => {
  const { isDarkMode } = useDarkMode();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeYear, setActiveYear] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(portfolioProjects);
  const [selectedView, setSelectedView] = useState('grid');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState(null);
  
  // Scroll animation
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

  // Filter projects based on selected criteria
  useEffect(() => {
    let results = portfolioProjects;
    
    // Apply category filter
    if (activeCategory !== 'all') {
      results = results.filter(project => project.category === activeCategory);
    }
    
    // Apply year filter
    if (activeYear !== 'All') {
      results = results.filter(project => project.year.toString() === activeYear);
    }
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      results = results.filter(project => 
        project.title.toLowerCase().includes(search) ||
        project.description.toLowerCase().includes(search) ||
        project.client.toLowerCase().includes(search) ||
        project.technologies.some(tech => tech.toLowerCase().includes(search))
      );
    }
    
    setFilteredProjects(results);
  }, [activeCategory, activeYear, searchTerm]);

  // Reset all filters
  const handleResetFilters = () => {
    setActiveCategory('all');
    setActiveYear('All');
    setSearchTerm('');
  };

  // Get icon color based on category
  const getCategoryColor = (category) => {
    switch(category) {
      case 'web-development':
        return 'text-blue-600 dark:text-blue-400';
      case 'mobile-development':
        return 'text-green-600 dark:text-green-400';
      case 'ecommerce':
        return 'text-purple-600 dark:text-purple-400';
      case 'ui-ux':
        return 'text-pink-600 dark:text-pink-400';
      case 'data':
        return 'text-amber-600 dark:text-amber-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  // Get background color based on category
  const getCategoryBg = (category) => {
    switch(category) {
      case 'web-development':
        return 'bg-blue-600/90';
      case 'mobile-development':
        return 'bg-green-600/90';
      case 'ecommerce':
        return 'bg-purple-600/90';
      case 'ui-ux':
        return 'bg-pink-600/90';
      case 'data':
        return 'bg-amber-600/90';
      default:
        return 'bg-gray-600/90';
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
          </div>
          <motion.div 
            className="absolute inset-0 opacity-5"
            initial={{ backgroundPositionY: 0 }}
            animate={{ backgroundPositionY: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.4%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
              backgroundSize: '30px 30px'
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm text-purple-700 dark:text-purple-300 font-medium text-sm mb-6"
            >
              Our Case Studies
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`text-4xl sm:text-5xl md:text-6xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Portfolio</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`mt-6 text-xl max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Explore our recent projects and success stories that showcase our expertise and innovation across various industries
            </motion.p>
            
            {/* Portfolio stats */}
            <motion.div 
              className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Award className={`h-5 w-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Projects</span>
                </div>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>35+</div>
              </div>
              
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaStar className={`h-5 w-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-500'}`} />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Satisfaction</span>
                </div>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>98%</div>
              </div>
              
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Calendar className={`h-5 w-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Years</span>
                </div>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>5+</div>
              </div>
              
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-md'}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className={`h-5 w-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Clients</span>
                </div>
                <div className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>20+</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className={`sticky top-0 z-20 py-4 px-4 border-b backdrop-blur-md ${
        isDarkMode 
          ? 'border-gray-700 bg-gray-900/80' 
          : 'border-gray-200 bg-white/80'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Filter size={16} />
                Filters
                {(activeCategory !== 'all' || activeYear !== 'All') && (
                  <span className={`w-5 h-5 flex items-center justify-center text-xs rounded-full ${
                    isDarkMode ? 'bg-purple-600 text-white' : 'bg-purple-600 text-white'
                  }`}>
                    {(activeCategory !== 'all' ? 1 : 0) + (activeYear !== 'All' ? 1 : 0)}
                  </span>
                )}
              </button>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedView('grid')}
                  className={`p-2 rounded-lg ${
                    selectedView === 'grid' 
                      ? isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                      : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-700'
                  }`}
                  aria-label="Grid view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button 
                  onClick={() => setSelectedView('list')}
                  className={`p-2 rounded-lg ${
                    selectedView === 'list' 
                      ? isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                      : isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-700'
                  }`}
                  aria-label="List view"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className={`relative flex-grow max-w-md ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects, clients, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`block w-full pl-10 pr-10 py-2 border rounded-lg text-sm ${
                  isDarkMode 
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-purple-500 focus:border-purple-500' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-purple-500 focus:border-purple-500'
                }`}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label="Clear search"
                >
                  <svg className="h-4 w-4 text-gray-400 hover:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          {/* Expandable filter panel */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isFiltersOpen ? 'auto' : 0, opacity: isFiltersOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        aria-pressed={activeCategory === category.id}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          activeCategory === category.id
                            ? 'bg-purple-600 text-white shadow-sm'
                            : isDarkMode
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Year
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {years.map(year => (
                      <button
                        key={year}
                        onClick={() => setActiveYear(year)}
                        aria-pressed={activeYear === year}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          activeYear === year
                            ? 'bg-blue-600 text-white shadow-sm'
                            : isDarkMode
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleResetFilters}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                    isDarkMode 
                      ? 'text-gray-300 hover:text-white' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Project Display Section */}
      <section className="py-16" ref={targetRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProjects.length === 0 ? (
            <div className={`text-center py-20 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block p-6 rounded-full bg-gray-100 dark:bg-gray-800 mb-6"
              >
                <Search size={32} className="text-gray-400" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-3">No projects found</h3>
              <p className="text-lg mb-6">Try adjusting your search or filter criteria</p>
              <button 
                onClick={handleResetFilters}
                className={`px-6 py-2 rounded-lg text-white font-medium ${
                  isDarkMode 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-purple-600 hover:bg-purple-700'
                } transition-colors`}
              >
                Reset filters
              </button>
            </div>
          ) : (
            <>
              {/* Grid View */}
              {selectedView === 'grid' && (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                      className={`group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all h-full ${
                        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                      }`}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10" />
                        
                        {/* Category and Featured badge */}
                        <div className="absolute top-4 left-4 right-4 flex justify-between">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryBg(project.category)} text-white`}>
                            {categories.find(c => c.id === project.category)?.name || project.category}
                          </span>
                          
                          {project.featured && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/90 text-white">
                              <Zap className="w-3 h-3 mr-1" />
                              Featured
                            </span>
                          )}
                        </div>
                        
                        <div className="absolute bottom-4 left-4 text-white z-10">
                          <div className={`p-2 rounded-lg mb-2 inline-block ${getCategoryBg(project.category)}`}>
                            <project.icon className="w-6 h-6" />
                          </div>
                          <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-200">{project.year}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                            <span className="text-sm text-gray-200">{project.client}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col h-[calc(100%-16rem)]">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech, i) => (
                            <span 
                              key={i} 
                              className={`px-2 py-1 text-xs rounded-md ${
                                isDarkMode 
                                  ? 'bg-gray-700 text-gray-300' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span 
                              className={`px-2 py-1 text-xs rounded-md ${
                                isDarkMode 
                                  ? 'bg-gray-700 text-gray-300' 
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>
                        
                        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                          {project.description}
                        </p>
                        
                        {/* Project Details */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className={`p-3 rounded-lg ${
                            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                          }`}>
                            <div className="flex items-center gap-2 mb-1">
                              <Clock className={`w-3 h-3 ${getCategoryColor(project.category)}`} />
                              <span className={`text-xs font-medium ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                Duration
                              </span>
                            </div>
                            <div className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{project.duration}</div>
                          </div>
                          
                          <div className={`p-3 rounded-lg ${
                            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                          }`}>
                            <div className="flex items-center gap-2 mb-1">
                              <Users className={`w-3 h-3 ${getCategoryColor(project.category)}`} />
                              <span className={`text-xs font-medium ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                Team Size
                              </span>
                            </div>
                            <div className={`text-sm font-medium ${
                              isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>{project.teamSize} people</div>
                          </div>
                        </div>
                        
                        {/* Stats Section */}
                        <div className="grid grid-cols-3 gap-2 mb-6 mt-auto">
                          {Object.entries(project.stats).map(([key, value], i) => (
                            <div key={i} className="text-center">
                              <div className={`text-lg font-bold ${
                                value.startsWith('+') ? 'text-green-500 dark:text-green-400' : 
                                value.startsWith('-') ? 'text-amber-500 dark:text-amber-400' : 
                                getCategoryColor(project.category)
                              }`}>
                                {value}
                              </div>
                              <div className={`text-xs ${
                                isDarkMode ? 'text-gray-400' : 'text-gray-500'
                              }`}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <button
                          onClick={() => setExpandedProject(project)}
                          className={`inline-flex items-center font-medium self-start ${
                            isDarkMode 
                              ? 'text-purple-400 hover:text-purple-300' 
                              : 'text-purple-600 hover:text-purple-700'
                          } group/btn`}
                        >
                          View Case Study
                          <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
              
              {/* List View */}
              {selectedView === 'list' && (
                <motion.div 
                  className="space-y-6"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.5 }}
                      className={`group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all ${
                        isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 h-full">
                        <div className="relative h-64 md:h-auto">
                          <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10" />
                          
                          <div className="absolute top-4 left-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryBg(project.category)} text-white`}>
                              {categories.find(c => c.id === project.category)?.name || project.category}
                            </span>
                          </div>
                          
                          {project.featured && (
                            <div className="absolute top-4 right-4">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/90 text-white">
                                <Zap className="w-3 h-3 mr-1" />
                                Featured
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="p-6 md:col-span-2 flex flex-col">
                          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-2">
                            <div>
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg inline-block ${getCategoryBg(project.category)}`}>
                                  <project.icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {project.title}
                                </h3>
                              </div>
                              <div className="flex items-center gap-2 mt-1 ml-10">
                                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {project.year}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                                <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                  {project.client}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 ml-10 md:ml-0">
                              {project.technologies.slice(0, 3).map((tech, i) => (
                                <span 
                                  key={i} 
                                  className={`px-2 py-1 text-xs rounded-md ${
                                    isDarkMode 
                                      ? 'bg-gray-700 text-gray-300' 
                                      : 'bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 3 && (
                                <span 
                                  className={`px-2 py-1 text-xs rounded-md ${
                                    isDarkMode 
                                      ? 'bg-gray-700 text-gray-300' 
                                      : 'bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  +{project.technologies.length - 3} more
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                            {project.description}
                          </p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className={`p-3 rounded-lg ${
                              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                            }`}>
                              <div className="flex items-center gap-2 mb-1">
                                <Clock className={`w-3 h-3 ${getCategoryColor(project.category)}`} />
                                <span className={`text-xs font-medium ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  Duration
                                </span>
                              </div>
                              <div className={`text-sm font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>{project.duration}</div>
                            </div>
                            
                            <div className={`p-3 rounded-lg ${
                              isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                            }`}>
                              <div className="flex items-center gap-2 mb-1">
                                <Users className={`w-3 h-3 ${getCategoryColor(project.category)}`} />
                                <span className={`text-xs font-medium ${
                                  isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                  Team Size
                                </span>
                              </div>
                              <div className={`text-sm font-medium ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                              }`}>{project.teamSize} people</div>
                            </div>
                            
                            {/* Stats in columns */}
                            {Object.entries(project.stats).slice(0, 2).map(([key, value], i) => (
                              <div key={i} className={`p-3 rounded-lg ${
                                isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                              }`}>
                                <div className="flex items-center gap-2 mb-1">
                                  <BarChart3 className={`w-3 h-3 ${
                                    value.startsWith('+') ? 'text-green-500 dark:text-green-400' : 
                                    value.startsWith('-') ? 'text-amber-500 dark:text-amber-400' : 
                                    getCategoryColor(project.category)
                                  }`} />
                                  <span className={`text-xs font-medium ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                  }`}>
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                  </span>
                                </div>
                                <div className={`text-sm font-medium ${
                                  value.startsWith('+') ? 'text-green-500 dark:text-green-400' : 
                                  value.startsWith('-') ? 'text-amber-500 dark:text-amber-400' : 
                                  isDarkMode ? 'text-white' : 'text-gray-900'
                                }`}>
                                  {value}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex justify-between items-center mt-auto">
                            <div className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <span className="text-sm font-medium">
                                View the detailed case study
                              </span>
                            </div>
                            <button
                              onClick={() => setExpandedProject(project)}
                              className={`inline-flex items-center px-4 py-2 rounded-lg font-medium ${
                                isDarkMode 
                                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                                  : 'bg-purple-600 hover:bg-purple-700 text-white'
                              } transition-colors group/btn`}
                            >
                              Case Study
                              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-16"
        style={{ opacity, y }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              What Our Clients Say
            </h2>
            <p className={`mt-4 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Hear from the people we've worked with on successful projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolioProjects.filter(p => p.featured).map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`rounded-xl overflow-hidden ${
                  isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-lg'
                } p-6`}
              >
                <div className={`p-2 rounded-lg inline-block mb-4 ${getCategoryBg(project.category)}`}>
                  <project.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {project.title}
                </h3>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {project.client}
                </p>
                
                <div className={`p-4 rounded-lg mb-6 ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}>
                  <p className={`italic mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    "{project.testimonial.quote}"
                  </p>
                  <div className="flex items-center">
                    <div>
                      <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {project.testimonial.author}
                      </div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {project.testimonial.position}
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setExpandedProject(project)}
                  className={`inline-flex items-center font-medium ${
                    isDarkMode 
                      ? 'text-purple-400 hover:text-purple-300' 
                      : 'text-purple-600 hover:text-purple-700'
                  } group/btn`}
                >
                  View Project
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Banner */}
      <section className={`py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-hidden">
            <motion.div 
              className="flex space-x-16 items-center"
              animate={{ 
                x: [0, -1000], 
                transition: { 
                  x: { 
                    repeat: Infinity, 
                    repeatType: "loop", 
                    duration: 20, 
                    ease: "linear" 
                  } 
                } 
              }}
            >
              {/* Double the stats items to create a seamless loop */}
              {[...statsData, ...statsData].map((stat, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`${stat.color}`}>
                    {stat.icon}
                  </div>
                  <span className={`whitespace-nowrap font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {stat.text}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`rounded-2xl overflow-hidden relative ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } p-8 md:p-12 shadow-xl`}>
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Ready to Start Your Next Project?
                </h2>
                <p className={`text-lg mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Let's discuss your ideas and build something amazing together. Our team is ready to help transform your vision into reality.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    size="lg"
                  >
                    Get in Touch
                    <MoveRight className="ml-2 h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="lg"
                    className={isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : ''}
                  >
                    View Services
                  </Button>
                </div>
              </div>
              
              <div className={`rounded-xl overflow-hidden ${
                isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-50 border border-gray-100'
              } p-6`}>
                <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Our Process
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDarkMode ? 'bg-purple-900 text-purple-300' : 'bg-purple-100 text-purple-600'
                    }`}>
                      <span className="font-bold">1</span>
                    </div>
                    <div>
                      <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Discovery</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        We start by understanding your goals, audience, and requirements
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDarkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-100 text-blue-600'
                    }`}>
                      <span className="font-bold">2</span>
                    </div>
                    <div>
                      <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Planning</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        We create a detailed roadmap and technical specifications
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDarkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-600'
                    }`}>
                      <span className="font-bold">3</span>
                    </div>
                    <div>
                      <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Development</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Our team builds your solution with regular updates and feedback
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isDarkMode ? 'bg-amber-900 text-amber-300' : 'bg-amber-100 text-amber-600'
                    }`}>
                      <span className="font-bold">4</span>
                    </div>
                    <div>
                      <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Launch & Support</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        We ensure a smooth deployment and provide ongoing maintenance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Detail Modal */}
      {expandedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl ${
              isDarkMode ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            <button
              onClick={() => setExpandedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="relative aspect-video w-full">
              <img 
                src={expandedProject.image} 
                alt={expandedProject.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-lg ${getCategoryBg(expandedProject.category)}`}>
                    <expandedProject.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryBg(expandedProject.category)} text-white mb-2`}>
                      {categories.find(c => c.id === expandedProject.category)?.name || expandedProject.category}
                    </span>
                    <h2 className="text-3xl font-bold text-white">{expandedProject.title}</h2>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Project Overview
                  </h3>
                  <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {expandedProject.longDescription}
                  </p>
                  
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {expandedProject.technologies.map((tech, i) => (
                      <span 
                        key={i} 
                        className={`px-3 py-1.5 rounded-full text-sm ${
                          isDarkMode 
                            ? 'bg-gray-800 text-gray-300 border border-gray-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Project Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {expandedProject.images.map((image, i) => (
                      <div key={i} className="rounded-lg overflow-hidden">
                        <img 
                          src={image.src} 
                          alt={image.alt} 
                          className="w-full h-64 object-cover"
                        />
                        <div className={`p-3 ${
                          isDarkMode ? 'bg-gray-800' : 'bg-gray-50'
                        }`}>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {image.caption}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Results & Impact
                  </h3>
                  <div className={`p-6 rounded-xl mb-6 ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {Object.entries(expandedProject.stats).map(([key, value], i) => (
                        <div key={i} className="text-center">
                          <div className={`text-2xl font-bold mb-1 ${
                            value.startsWith('+') ? 'text-green-500 dark:text-green-400' : 
                            value.startsWith('-') ? 'text-amber-500 dark:text-amber-400' : 
                            getCategoryColor(expandedProject.category)
                          }`}>
                            {value}
                          </div>
                          <div className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                          }`}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className={`p-6 rounded-xl ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-50'
                  }`}>
                    <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Client Testimonial
                    </h3>
                    <p className={`text-lg italic mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      "{expandedProject.testimonial.quote}"
                    </p>
                    <div className="flex items-center">
                      <div>
                        <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {expandedProject.testimonial.author}
                        </div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {expandedProject.testimonial.position}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className={`sticky top-8 p-6 rounded-xl ${
                    isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white shadow-lg'
                  }`}>
                    <h3 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Project Details
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Client:</span>
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {expandedProject.client}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Year:</span>
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {expandedProject.year}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Duration:</span>
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {expandedProject.duration}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Team Size:</span>
                        <span className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          {expandedProject.teamSize} people
                        </span>
                      </div>
                      
                      <div className="border-t border-dashed my-4 pt-4 border-gray-700" />
                      
                      <div className="space-y-2">
                        <h4 className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Services Provided:
                        </h4>
                        <ul className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>UX/UI Design</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Full-Stack Development</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>DevOps & Deployment</span>
                          </li>
                          <li className="flex items-start">
                            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>Ongoing Support</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <a
                      href={expandedProject.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-center w-full px-4 py-2.5 rounded-lg font-medium ${
                        isDarkMode 
                          ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      } transition-colors mt-6`}
                    >
                      Visit Project
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PortfolioPage;