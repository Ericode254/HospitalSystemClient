
import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// Define the types for the props
interface ProtectedRouteProps {
  children: React.ReactNode; // ReactNode for the wrapped component
  requiredRole?: string;     // Optional role requirement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  // Get the JWT token from cookies
  const token = document.cookie.split('; ').find(row => row.startsWith('access_token='));

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/signin" replace />;
  }

  try {
    // Decode the token to extract user info
    const decodedToken = jwtDecode<{ role: string }>(token.split('=')[1]);
    const userRole = decodedToken.role;

    // Check if the user's role matches the required role
    if (requiredRole && requiredRole !== userRole) {
      return <Navigate to="/signin" replace />; // Redirect if role doesn't match
    }

    // Render the protected component
    return <>{children}</>;
  } catch (error) {
    // If there's an error decoding the token, redirect to login
    return <Navigate to="/signin" replace />;
  }
};

export default ProtectedRoute;

