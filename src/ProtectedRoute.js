// ProtectedRoute.js
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ element }) => {
  const { token } = useAuth();

  if (!token) {
    // If the user is not logged in, store the attempted route and then navigate to login
    localStorage.setItem('redirectPath', window.location.pathname);
    return <Navigate to="/login" />;
  }

  // If the user is logged in, render the provided element (page/component)
  return element;
};

export default ProtectedRoute;
