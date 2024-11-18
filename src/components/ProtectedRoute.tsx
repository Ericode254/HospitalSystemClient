import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookie from 'js-cookie';

interface DecodedToken {
  user_id: number;
  role: string;
  exp: number;
}

const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element; allowedRoles: string[] }) => {
  const token = Cookie.get('token'); // Replace with your token retrieval logic
  console.log(token);

  if (!token) {
    // If no token, redirect to signin
    return <Navigate to="/signin" replace />;
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);

    // Check if the token is expired
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (decoded.exp < currentTime) {
      Cookie.remove('token'); // Clear expired token
      return <Navigate to="/signin" replace />;
    }

    // Check if the user's role is allowed for the route
    if (!allowedRoles.includes(decoded.role)) {
      // Redirect unauthorized users to a default page (e.g., "/home")
      return <Navigate to="/home" replace />;
    }

    return children; // Render the protected component
  } catch (error) {
    console.error("Invalid token:", error);
    Cookie.remove('token'); // Clear invalid token
    return <Navigate to="/signin" replace />;
  }
};

export default ProtectedRoute;

