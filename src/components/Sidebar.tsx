import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Group, Analytics, Settings, ExitToApp } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation(); // To track the current route and highlight the active link

  const handleLogout = () => {
    // Logic for logging out (e.g., clearing user session, redirecting, etc.)
    console.log('User logged out');
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col sticky top-0">
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-center bg-gray-900">
        <h2 className="text-xl font-semibold">Dashboard Logo</h2>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col flex-grow">
        <Link
          to="dashboard" // Relative path
          className={`text-white p-4 hover:bg-gray-700 flex items-center ${location.pathname === '/main/dashboard' ? 'bg-gray-700' : ''}`}
        >
          <Home className="mr-3" /> Dashboard
        </Link>
        <Link
          to="users" // Relative path
          className={`text-white p-4 hover:bg-gray-700 flex items-center ${location.pathname === '/main/users' ? 'bg-gray-700' : ''}`}
        >
          <Group className="mr-3" /> Users
        </Link>
        <Link
          to="other" // Relative path
          className={`text-white p-4 hover:bg-gray-700 flex items-center ${location.pathname === '/main/other' ? 'bg-gray-700' : ''}`}
        >
          <Analytics className="mr-3" /> Other Section
        </Link>
        <Link
          to="settings" // Relative path
          className={`text-white p-4 hover:bg-gray-700 flex items-center ${location.pathname === '/main/settings' ? 'bg-gray-700' : ''}`}
        >
          <Settings className="mr-3" /> Settings
        </Link>
      </div>

      {/* Logout Button */}
      <div className="mt-auto p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md flex items-center justify-center mt-4"
        >
          <ExitToApp className="mr-2" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

