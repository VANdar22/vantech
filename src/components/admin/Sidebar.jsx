import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 p-4">
      <div className="flex items-center space-x-2 p-4 border-b">
        <h2 className="text-xl font-bold">Service Center</h2>
      </div>
      <nav className="mt-6">
        <NavLink 
          to="/admin/dashboard" 
          className={({ isActive }) => 
            `flex items-center px-4 py-3 rounded-lg mb-2 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          Dashboard
        </NavLink>
        <NavLink 
          to="/admin/notifications" 
          className={({ isActive }) => 
            `flex items-center px-4 py-3 rounded-lg mb-2 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`
          }
        >
          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          Notifications
        </NavLink>
      </nav>
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
        <div className="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
            <span className="text-sm font-medium">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
