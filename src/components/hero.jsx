import React from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/bg.png';

const Hero = () => {
  const navigate = useNavigate();

  const handleServiceClick = () => {
    navigate('/services');
  };

  return (
    <div className="relative min-h-[500px] w-full overflow-hidden bg-gray-900">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={bg}
          alt="Car service center"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10 bg-opacity-20"></div>

      {/* Content */}
      <div className="relative h-full flex items-center px-8 md:px-16 z-10 pt-32">
        <div className="p-8 rounded-lg max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-left">
            Welcome to Our Service Center
          </h1>
          <p className="text-xl md:text-2xl text-white text-left mt-4">
            Professional car maintenance and repair services
          </p>
        </div>
        
      
      </div>
    </div>
  );
};

export default Hero;
