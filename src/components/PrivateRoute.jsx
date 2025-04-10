import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from './ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { currentUser, userData, loading } = useAuth();
  const location = useLocation();

  // While authentication is initializing, show a loading spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  // Pass the current location so we can redirect back after login
  if (!currentUser) {
    console.log('PrivateRoute - No authenticated user, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If a specific role is required and user doesn't have it
  if (requiredRole && userData?.role !== requiredRole) {
    console.log(`PrivateRoute - User role "${userData?.role}" doesn't match required role "${requiredRole}"`);
    
    // Redirect based on user's actual role
    if (userData?.role === 'admin') {
      return <Navigate to="/admin" replace />;
    } else {
      return <Navigate to="/client" replace />;
    }
  }

  // User is authenticated with correct role, render children
  return children;
};

export default PrivateRoute; 