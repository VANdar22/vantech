import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  // Split text into characters with bounce effect
  const SplitText = ({ text, className, delay = 0 }) => {
    return (
      <div className={className} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
        {text.split('').map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? {
              opacity: 1,
              y: 0,
              transition: {
                delay: delay + (i * 0.03),
                type: 'spring',
                damping: 15,
                stiffness: 200,
                mass: 0.5,
              }
            } : {}}
            style={{ 
              display: 'inline-block', 
              whiteSpace: 'pre',
              willChange: 'transform, opacity',
              transformOrigin: 'bottom'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    );
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
      className="relative flex items-center justify-center min-h-screen bg-[#f5f5f5]"
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
            <motion.div 
              ref={ref}
              className="mx-auto font-bold leading-tight text-black-800"
              style={{
                textTransform: 'uppercase',
                fontFamily: '"Climate Crisis", sans-serif',
                fontSize: 'clamp(2.25rem, 8vw, 5rem)',
                fontWeight: 400,
                lineHeight: 1,
                letterSpacing: '0.02em',

                maxWidth: '100%',
                margin: '0 auto',
                padding: '0 8px',
                fontVariationSettings: '"wght" 400',
                fontFeatureSettings: '"tnum" 1, "ss01" 1, "ss02" 1'
              }}
            >
              <div className="flex flex-col space-y-1 sm:space-y-2 md:space-y-3">
                <div className="block">
                  <SplitText text="we make" delay={0.2} />
                </div>
                <div className="block">
                  <SplitText text="therefore" delay={0.4} />
                </div>
                <div className="block">
                  <SplitText text="we exist" delay={0.6} />
                </div>
              </div>
              <div className="mt-4 sm:mt-6 space-y-1">
                <motion.div 
                  className="explora text-xl sm:text-2xl md:text-3xl font-light text-[#EA1821]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 1.2,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  } : {}}
                >
                  designed in accra
                </motion.div>
                <motion.div 
                  className="text-sm sm:text-base md:text-lg text-[#1B1D1C]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 1.4,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  } : {}}
                >
                  est 2022
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
