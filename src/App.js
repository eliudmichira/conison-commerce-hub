// App.js
import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useDarkMode } from './context/DarkModeContext';
import NavBar from './components/ui/tubelight-navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import MobileDevelopmentPage from './pages/services/MobileDevelopmentPage';
import AnimationVideoPage from './pages/services/AnimationVideoPage';
import DigitalMarketingPage from './pages/services/DigitalMarketingPage';
import GraphicDesignPage from './pages/services/GraphicDesignPage';
import CybersecurityPage from './pages/services/CybersecurityPage';
import WebDevelopmentPage from './pages/services/WebDevelopmentPage';
import UiUxDesignPage from './pages/services/UiUxDesignPage';
import CloudSolutionsPage from './pages/services/CloudSolutionsPage';
import ConsultingPage from './pages/services/ConsultingPage';
import AiMlPage from './pages/services/AiMlPage';
import ColorPaletteDemo from './components/ColorPaletteDemo';

// Import styles
import './styles/colors.css';

// Lazy load components
const Home = React.lazy(() => import('./pages/HomePage'));
const AboutContact = React.lazy(() => import('./pages/AboutContactPage'));
const Services = React.lazy(() => import('./pages/ServicesPage'));
const Portfolio = React.lazy(() => import('./pages/PortfolioPage'));
const RateCard = React.lazy(() => import('./pages/RateCardPage'));
const QuoteRequest = React.lazy(() => import('./pages/QuoteRequestPage'));
const LoginPage = React.lazy(() => import('./components/auth/LoginPage'));
const RegisterPage = React.lazy(() => import('./components/auth/RegisterPage'));
const AdminRoutes = React.lazy(() => import('./routes/AdminRoutes'));
const ClientRoutes = React.lazy(() => import('./routes/ClientRoutes'));

// Create a protected route component
const ProtectedRoute = ({ element, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    console.log(`Role ${user.role} doesn't match required role ${requiredRole}, redirecting to home`);
    return <Navigate to="/" replace />;
  }
  
  return element;
};

const App = () => {
  const { isAuthenticated, user } = useAuth();
  const { isDarkMode } = useDarkMode();

  const navItems = [
    { name: 'Home', path: '/', icon: 'FaHome' },
    { name: 'About & Contact', path: '/contact', icon: 'FaUser' },
    { name: 'Services', path: '/services', icon: 'FaCogs' },
    { name: 'Portfolio', path: '/portfolio', icon: 'FaBriefcase' },
    { name: 'Rate Card', path: '/rate-card', icon: 'FaTag' },
    { name: 'Quote Request', path: '/quote-request', icon: 'FaFileAlt' }
  ];

  return (
    <div className={`min-h-screen flex flex-col ${isDarkMode ? 'dark' : ''}`}>
      <NavBar items={navItems} />
      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<AboutContact />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/mobile-development" element={<MobileDevelopmentPage />} />
            <Route path="/services/animation-video-production" element={<AnimationVideoPage />} />
            <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
            <Route path="/services/graphic-design" element={<GraphicDesignPage />} />
            <Route path="/services/cybersecurity" element={<CybersecurityPage />} />
            <Route path="/services/web-development" element={<WebDevelopmentPage />} />
            <Route path="/services/ui-ux-design" element={<UiUxDesignPage />} />
            <Route path="/services/cloud-solutions" element={<CloudSolutionsPage />} />
            <Route path="/services/consulting" element={<ConsultingPage />} />
            <Route path="/services/ai-ml" element={<AiMlPage />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/rate-card" element={<RateCard />} />
            <Route path="/quote-request" element={<QuoteRequest />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/brand-colors" element={<ColorPaletteDemo />} />

            {/* Protected routes */}
            <Route 
              path="/admin/*" 
              element={<ProtectedRoute element={<AdminRoutes />} requiredRole="admin" />} 
            />
            <Route 
              path="/client/*" 
              element={<ProtectedRoute element={<ClientRoutes />} />} 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default App;