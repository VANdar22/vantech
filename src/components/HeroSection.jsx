import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Frame corner component
  const CornerMarkers = () => (
    <>
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#EA1821]" />
      {/* Top Right */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#EA1821]" />
      {/* Bottom Left */}
      <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#EA1821]" />
      {/* Bottom Right */}
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#EA1821]" />
    </>
  );

  return (
    <section 
      className="relative flex items-center justify-center min-h-screen bg-white"
      style={{
        padding: '60px 24px',
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Frame Corners */}
      <CornerMarkers />
      
      <div className="relative z-10 w-full max-w-[1200px] mx-auto text-center p-6 sm:p-8 md:p-12">
        {/* Double Border Effect */}
        <div className="relative p-6 sm:p-8 md:p-12">
          {/* Primary Border */}
          <div className="absolute inset-0 border-2 sm:border-3 md:border-4 border-[#D40000]" />
          
          {/* Secondary Border (offset) */}
          <div 
            className="absolute inset-0 border-2 sm:border-3 md:border-4 border-[#D40000] -z-10"
            style={{
              top: '12px',
              left: '12px',
              right: '-12px',
              bottom: '-12px',
              opacity: 0.6
            }}
          />
          
          {/* Content Container */}
          <div className="relative">
            <motion.h1
              className="mx-auto font-bold leading-tight text-gray-900"
              initial="hidden"
              animate="visible"
              variants={{
                ...fadeUp,
                visible: {
                  ...fadeUp.visible,
                  transition: {
                    ...fadeUp.visible.transition,
                    delay: 0.2
                  }
                }
              }}
              style={{
                textTransform: 'uppercase',
                fontFamily: 'clash display',
                fontSize: 'clamp(2.5rem, 10vw, 6rem)',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '0.02em',
                color: '#1B1D1C',
                maxWidth: '100%',
                margin: '0 auto',
                padding: '0 8px'
              }}
            >
              <div className="flex flex-col space-y-1 sm:space-y-2 md:space-y-3">
                <div className="block">we make</div>
                <div className="block">therefore</div>
                <div className="block">we exist</div>
              </div>
              <div className="mt-4 sm:mt-6 space-y-1">
              <div className="explora text-xl sm:text-2xl md:text-3xl font-light text-[#EA1821]">designed in accra, ghana</div>

                <div className="text-sm sm:text-base md:text-lg text-[#1B1D1C]">est 2023</div>
              </div>
            </motion.h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
