// App.js
import React, { useEffect, memo, useMemo } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// Contexts
import { DarkModeProvider } from './context/DarkModeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ClientDataProvider } from './context/ClientDataContext';

// Layout Components
import NavBar from './components/ui/tubelight-navbar';
import Footer from './components/Footer';
import ClientLayout from './components/client/ClientLayout';
import AdminLayout from './components/admin/AdminLayout';

// Public Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import RateCardPage from './pages/RateCardPage';
import QuoteRequestPage from './pages/QuoteRequestPage';
import PaymentPage from './pages/PaymentPage';
import ThankYouPage from './pages/ThankYouPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';

// Service Pages
import WebDevelopmentPage from './pages/services/WebDevelopmentPage';
import AiMlPage from './pages/services/AiMlPage';
import CloudSolutionsPage from './pages/services/CloudSolutionsPage';
import ConsultingPage from './pages/services/ConsultingPage';
import AnimationVideoPage from './pages/services/AnimationVideoPage';
import CybersecurityPage from './pages/services/CybersecurityPage';
import DigitalMarketingPage from './pages/services/DigitalMarketingPage';
import GraphicDesignPage from './pages/services/GraphicDesignPage';
import MobileDevelopmentPage from './pages/services/MobileDevelopmentPage';
import BrandingPage from './pages/services/BrandingPage';

// Client Portal Pages
import ClientDashboard from './pages/client/Dashboard';
import ClientProjectsPage from './pages/client/ProjectsPage';
import ClientQuotesPage from './pages/client/QuotesPage';
import ClientPaymentsPage from './pages/client/PaymentsPage';
import ClientPaymentPage from './pages/client/ClientPaymentPage';
import ClientSettingsPage from './pages/client/SettingsPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ClientManagement from './pages/admin/ClientManagement';
import QuoteManagement from './pages/admin/QuoteManagement';
import ProjectManagement from './pages/admin/ProjectManagement';
import PaymentManagement from './pages/admin/PaymentManagement';
import SettingsPage from './pages/admin/SettingsPage';

// Auth Components
import PrivateRoute from './components/PrivateRoute';

// Styles
import './styles/colors.css';
import './styles/hero.css';

import ChatAssistant from './components/ChatAssistant';

// Development-only component
import TestAdminCreation from './components/TestAdminCreation';
import DiagnosticPage from './pages/DiagnosticPage';

// Dashboard redirect component
const DashboardRedirect = () => {
  const { userData } = useAuth();
  
  return userData?.role === 'admin' ? (
    <Navigate to="/admin" replace />
  ) : (
    <Navigate to="/client" replace />
  );
};

const AppContent = () => {
  const location = useLocation();
  const { pathname } = location;
  
  // Determine if we're on a dashboard route to hide navbar/footer
  const isDashboardRoute = useMemo(() => 
    pathname.startsWith('/client') || 
    pathname.startsWith('/admin'),
  [pathname]);
  
  // Check if we're on the homepage
  const isHomePage = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {!isDashboardRoute && <NavBar />}
      
      <main className={`flex-grow ${(!isDashboardRoute && !isHomePage) ? 'pt-24' : ''}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/services" element={<ServicesPage />} />
          
          {/* Service-specific routes - must come before the generic :id route */}
          <Route path="/services/web-development" element={<WebDevelopmentPage />} />
          <Route path="/services/ai-automation" element={<AiMlPage />} />
          <Route path="/services/ai-ml" element={<AiMlPage />} />
          <Route path="/services/cloud-solutions" element={<CloudSolutionsPage />} />
          <Route path="/services/business-consulting" element={<ConsultingPage />} />
          <Route path="/services/consulting" element={<ConsultingPage />} />
          <Route path="/services/motion-graphics" element={<AnimationVideoPage />} />
          <Route path="/services/cybersecurity" element={<CybersecurityPage />} />
          <Route path="/services/digital-marketing" element={<DigitalMarketingPage />} />
          <Route path="/services/graphic-design" element={<GraphicDesignPage />} />
          <Route path="/services/mobile-development" element={<MobileDevelopmentPage />} />
          <Route path="/services/branding" element={<BrandingPage />} />
          
          {/* Generic service route as a fallback */}
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/rate-card" element={<RateCardPage />} />
          <Route path="/quote-request" element={<QuoteRequestPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsOfServicePage />} />

          {/* Development-only route */}
          {process.env.NODE_ENV === 'development' && (
            <>
              <Route path="/dev/create-admin" element={<TestAdminCreation />} />
              <Route path="/dev/diagnostics" element={<DiagnosticPage />} />
            </>
          )}

          {/* Client Portal Routes */}
          <Route 
            path="/client/*" 
            element={
              <PrivateRoute>
                <ClientDataProvider>
                  <ClientLayout />
                </ClientDataProvider>
              </PrivateRoute>
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path="dashboard" element={<ClientDashboard />} />
            <Route path="projects" element={<ClientProjectsPage />} />
            <Route path="quotes" element={<ClientQuotesPage />} />
            <Route path="payments" element={<ClientPaymentsPage />} />
            <Route path="payments/make" element={<ClientPaymentPage />} />
            <Route path="payment/:id" element={<ClientPaymentPage />} />
            <Route path="settings" element={<ClientSettingsPage />} />
          </Route>
          
          {/* Admin Routes */}
          <Route 
            path="/admin/*" 
            element={
              <PrivateRoute requiredRole="admin">
                <AdminLayout />
              </PrivateRoute>
            } 
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="clients" element={<ClientManagement />} />
            <Route path="quotes" element={<QuoteManagement />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="payments" element={<PaymentManagement />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Dashboard redirect route */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <DashboardRedirect />
              </PrivateRoute>
            } 
          />

          {/* Catch-all route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      {!isDashboardRoute && <Footer />}
      <ChatAssistant />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <DarkModeProvider>
        <AppContent />
        <ToastContainer position="top-right" autoClose={3000} />
      </DarkModeProvider>
    </AuthProvider>
  );
};

export default App;