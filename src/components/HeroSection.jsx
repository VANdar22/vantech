import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useAnimation } from 'framer-motion';
import { BLACK_OPACITY_30, BACKGROUND_LIGHT } from '../constants/colors';
import heroImage from '../assets/image.png';

import smileImage from '../assets/smile.png';

const HeroSection = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  // Image feels STATIC (only 5px shift)
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 5], 
    { clamp: true }
  );

  // Background container slight drift for depth
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "6%"],
    { clamp: true }
  );

  // Fade image very slightly
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.9],
    [1, 0.75],
    { clamp: true }
  );

  // Removed contentY transform to eliminate text parallax effect

  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    [1, 0],
    { clamp: true }
  );
  
  // Smooth premium easing
  const transition = {
    ease: [0.25, 1, 0.5, 1],
    duration: 0.9
  };

  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      opacity: 1,
      transition: { 
        duration: 3,
        ease: [0.25, 1, 0.5, 1]
      }
    });
    
    // Image doesn't need any special initialization
  }, [controls]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* White background with delayed animation */}
      <motion.div 
        className="absolute inset-0 z-10 bg-f0edee"
        style={{
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { 
            duration: 0.5,
            ease: [0.25, 1, 0.5, 1]
          }
        }}
      />
      
      <div 
        ref={targetRef}
        className="relative z-20 w-full flex-1 flex flex-col"
        style={{ 
          transform: 'translateZ(0)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {/* Image Section - Full width on mobile, contained on larger screens */}
        <motion.div 
          className="w-full h-[70vh] md:h-[80vh] overflow-hidden flex-shrink-0"
          style={{ 
            y,
            opacity,
            willChange: 'transform, opacity',
            minHeight: '500px',
          }}
        >
          <div className="h-full w-full flex items-start pt-16 justify-center p-4 sm:p-6 md:p-8">
            <motion.div
              className="w-full h-full max-w-5xl mx-auto bg-cover bg-center rounded-3xl shadow-2xl overflow-hidden mt-8"
              style={{
                backgroundImage: `url(${heroImage})`,
                backgroundPosition: 'center 20%',
                backgroundSize: 'cover',
                y: imgY,
                opacity,
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                WebkitTransform: 'translateZ(0)',
                WebkitPerspective: 1000,
                border: '8px solid #0E38B1',
                boxSizing: 'border-box',
                minHeight: '100%',
              }}
            />
          </div>
        </motion.div>

        {/* Text Section - Below image on mobile, overlaid on larger screens */}
        <motion.div 
          className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-1 flex flex-col justify-center"
          style={{
            color: 'blue',
            opacity: contentOpacity
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full text-center md:text-start py-8 md:py-0"
          >
            <h1 className="font-['Montserrat'] bg-gradient-to-r from-[#0E38B1] via-[#3A6BC8] to-[#5E8BFF] bg-clip-text text-transparent">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
                <div className="text-center sm:text-left">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight whitespace-nowrap tracking-tight">
                    Learning That <span className="hidden sm:inline">Feels Like Play</span>
                  </div>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold sm:hidden">
                    Feels Like Play
                  </div>
                </div>
                <div className="relative flex items-center justify-center w-20 h-20 sm:w-18 sm:h-18 md:w-20 md:h-20">
                  <div className="absolute inset-0 bg-yellow-400 mix-blend-multiply rounded-full opacity-70"></div>
                  <img 
                    src={smileImage} 
                    alt="Smile" 
                    className="h-16 w-16 sm:h-14 sm:w-14 md:h-16 md:w-16 transform transition-transform duration-300 hover:scale-110 object-contain relative z-10" 
                  />
                </div>
              </div>
            </h1>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
