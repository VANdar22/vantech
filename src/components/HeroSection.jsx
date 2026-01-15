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

  // Frame corner component - Top corners only
  const CornerMarkers = () => (
    <>
      {/* Top Left */}
      <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#EA1821]" />
      {/* Top Right */}
      <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#EA1821]" />
    </>
  );

  return (
    <section 
      className="relative flex items-center justify-center min-h-[90vh] sm:min-h-screen bg-gray-100 dark:bg-[#131827] transition-colors duration-200"
      style={{
        padding: '40px 16px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Frame Corners */}
      <CornerMarkers />
      
      <div className="relative z-10 w-full max-w-[1200px] mx-auto text-center p-4 sm:p-6 md:p-8 lg:p-12">
        {/* Double Border Effect */}
        <div className="relative p-4 sm:p-6 md:p-8 lg:p-12">
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
                fontSize: 'clamp(2rem, 9vw, 5rem)',
                fontWeight: 400,
                lineHeight: '0.9',
                letterSpacing: '0.01em',
                maxWidth: '100%',
                margin: '0 auto',
                padding: '0 4px',
                wordSpacing: '-0.05em',
                fontVariationSettings: '"wght" 400',
                fontFeatureSettings: '"tnum" 1, "ss01" 1, "ss02" 1'
              }}
            >
              <div className="flex flex-col items-center space-y-0 sm:space-y-1 md:space-y-2 lg:space-y-3">
                <div className="text-center">
                  <SplitText text="we make" delay={0.2} />
                </div>
                <div className="text-center">
                  <SplitText text="therefore" delay={0.4} />
                </div>
                <div className="text-center">
                  <SplitText text="we exist" delay={0.6} />
                </div>
              </div>
              <div className="mt-3 sm:mt-5 md:mt-6 space-y-1 text-center">
                <motion.div 
                  className="explora text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-[#EA1821]"
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
                  designed _in_ accra
                </motion.div>
                <motion.div 
                  className="text-xs sm:text-sm md:text-base lg:text-lg text-black dark:text-white"
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
                  est - 2022
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
