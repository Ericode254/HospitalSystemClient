import React from 'react';
import Sidebar from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';

const Main: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;

