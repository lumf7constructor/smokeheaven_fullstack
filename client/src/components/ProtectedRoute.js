import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const token = localStorage.getItem('token'); // Check for the token

  if (!token) {
    alert('You must log in to access this page.');
    return <Navigate to="/login" replace />; // Redirect to the login page
  }

  return Component; // Render the protected component
};

export default ProtectedRoute;
