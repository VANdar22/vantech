import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const text = 'VAN';
  const subText = 'tech';

  useEffect(() => {
    // Start exit animation after 2 seconds
    const timer = setTimeout(() => {
      setIsAnimating(true);
      
      // Remove from DOM after animation completes
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 900); // Smooth exit duration
    }, 2000); // Total splash time ~2.9s

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            className="fixed inset-0 bg-[#EA1821]/100 z-10"
            initial={{ y: 0, opacity: 1 }}
            animate={isAnimating ? { y: '-100%', opacity: 0.92 } : { y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.9,
              ease: [0.4, 0, 0.2, 1] // Material-like natural ease
            }}
          >
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="flex items-baseline justify-center">
                  <h1 
                    className="text-7xl md:text-9xl font-bold text-gray-200"
                    style={{
                      fontFamily: '"Flexing", sans-serif',
                      fontWeight: 800,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {text.split('').map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: index * 0.04,
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1]
                          }
                        }}
                        style={{ display: 'inline-block' }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </h1>
                  <motion.span 
                    className="text-7xl md:text-9xl font-bold text-gray-200 ml-1"
                    style={{
                      fontFamily: '"Flexing", sans-serif',
                      fontWeight: 800,
                      letterSpacing: '0.05em',
                      textTransform: 'lowercase'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: text.length * 0.05,
                        duration: 0.3,
                        ease: 'easeOut'
                      }
                    }}
                  >
                    {subText}
                  </motion.span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
