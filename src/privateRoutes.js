import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  console.log("Authenticated:", isAuthenticated); // Debugging line


  return (
    isAuthenticated ? element : <Navigate to="/login" />
  );
};

export default PrivateRoute;
