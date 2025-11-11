import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';

const AdminPortal = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/admin/dashboard" className="text-2xl font-bold text-gray-900">
              Admin Portal
            </Link>
            <nav className="hidden md:flex space-x-4">
              <Link to="/admin/dashboard" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
              <Link to="/admin/appointments" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Appointments
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPortal;
