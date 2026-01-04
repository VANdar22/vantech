import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const animationRef = useRef(null);

  useEffect(() => {
    let start = null;
    const duration = 5000; // Increased from 3000ms to 5000ms (5 seconds total)
    
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      
      // Update progress (0-100%)
      setProgress(Math.floor(progress * 100));
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Start exit animation when loading is complete
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 500); // Short delay before hiding
      }
    };
    
    // Start the animation
    animationRef.current = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-[#EA1821] z-50 flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Main Content - Centered */}
        <div className="text-center">
          <h1 
            className="text-6xl md:text-8xl font-bold text-gray-200"
            style={{
              fontFamily: '"Flexing", sans-serif',
              fontWeight: 800,
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}
          >
            VAN<span style={{ fontWeight: 600, textTransform: 'lowercase' }}>tech</span>
          </h1>
        </div>

        {/* Loading Percentage - Bottom on mobile, bottom-right on larger screens */}
        <div className="fixed bottom-6 right-6 sm:right-8 sm:bottom-8">
          <motion.div 
            className="text-3xl sm:text-4xl font-bold text-gray-200 opacity-90"
            style={{
              fontFamily: '"Flexing", sans-serif',
              fontWeight: 600,
              letterSpacing: '0.05em'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: {
                delay: 0.3,
                duration: 0.5,
                ease: 'easeOut'
              }
            }}
          >
            {progress}%
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
