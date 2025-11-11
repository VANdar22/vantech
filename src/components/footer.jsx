import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-4 md:mb-0">
            <span className="text-lg font-medium">© 2023 AutoServ Scheduler. All rights reserved.</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <Link to="/login" className="flex items-center">
              <img 
                src="/src/assets/logo.png" 
                alt="Admin" 
                className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
