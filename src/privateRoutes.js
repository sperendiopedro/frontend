import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

const PrivateRoute = ({ element }) => {
  const authStatus = isAuthenticated();
  const token = localStorage.getItem('token');
  console.log("Authenticated:", authStatus); 
  console.log(token);   
 

  return (
    authStatus ? element : <Navigate to="/login" />
  );
};

export default PrivateRoute;
