import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ProjectCaseStudy = ({ project }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  const nextImage = () => {
    setCarouselIndex(prevIndex => 
      prevIndex === (project.media.images?.length - 1 || 0) ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCarouselIndex(prevIndex => 
      prevIndex === 0 ? (project.media.images?.length - 1 || 0) : prevIndex - 1
    );
  };

  // Handle video end
  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Move to next image after video ends
    if (project.project.id === 'aateek' && carouselIndex === 0) {
      setCarouselIndex(1);
    }
  };

  // Auto-advance carousel
  useEffect(() => {
    if (!project.media.images || project.media.images.length <= 1 || isHovered || selectedImage) {
      return;
    }

    // Don't auto-advance if we're on the video (index 0) for Aateek
    if (project.project.id === 'aateek' && carouselIndex === 0) {
      // Video will handle its own transition via onEnded
      return;
    }

    const interval = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % project.media.images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselIndex, isHovered, project.media.images, selectedImage, project.project.id]);

  const openImage = (image, index) => {
    setSelectedImage(image);
    setCurrentImageIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeImage = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction) => {
    const images = project.media.images || [];
    let newIndex = currentImageIndex + direction;
    
    if (newIndex < 0) newIndex = images.length - 1;
    if (newIndex >= images.length) newIndex = 0;
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(images[newIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImage) {
        if (e.key === 'Escape') closeImage();
        if (e.key === 'ArrowLeft') navigateImage(-1);
        if (e.key === 'ArrowRight') navigateImage(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex]);

  return (
    <div 
      className="min-h-screen w-full flex flex-col overflow-x-hidden"
      style={{ backgroundColor: project.theme.backgroundColor, color: project.theme.textColor }}
    >
      {/* Hero Section with Side-by-Side Layout */}
      <motion.div 
        className="w-full py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
        style={{ backgroundColor: project.theme.backgroundColor }}
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={container}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Main Project Image Carousel with Curtain Reveal */}
            <div className="w-full max-w-xl aspect-video h-80 overflow-hidden relative mx-auto">
              <motion.div 
                className="absolute inset-0 z-10"
                style={{ backgroundColor: project.theme.backgroundColor }}
                initial={{ x: '0%' }}
                whileInView={{ 
                  x: '100%',
                  transition: {
                    duration: 1.8,
                    ease: [0.76, 0, 0.24, 1],
                    delay: 0.3
                  }
                }}
                viewport={{ once: true, amount: 1 }}
              />
              <motion.div 
                className="w-full h-full relative"
                initial={{ opacity: 0 }}
                whileInView={{ 
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    delay: 0.8,
                    ease: 'easeOut'
                  }
                }}
                viewport={{ once: true, amount: 1 }}
              >
                {project.media.images && project.media.images.length > 0 ? (
                <>
                  <div 
                    className="w-full h-full relative"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <motion.div 
                      className={`w-full h-full flex items-center justify-center relative overflow-hidden ${project.project.id === 'classscope' ? 'bg-white' : 'bg-black'}`}
                      style={{ aspectRatio: '16/9' }}
                    >
                      {project.project.id === 'aateek' && carouselIndex === 0 ? (
                        <motion.video
                          ref={videoRef}
                          autoPlay
                          muted
                          playsInline
                          onEnded={handleVideoEnd}
                          className="absolute inset-0 w-full h-full object-contain p-2 m-auto"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                        >
                          <source src={project.media.images[0]} type="video/mp4" />
                          Your browser does not support the video tag.
                        </motion.video>
                      ) : project.project.id !== 'classscope' ? (
                        <>
                          {carouselIndex === 0 && (
                            <motion.div 
                              className="absolute inset-0 flex items-center justify-center bg-black"
                              initial={false}
                              animate={{
                                opacity: carouselIndex === 0 ? 1 : 0,
                                scale: carouselIndex === 0 ? 1 : 0.95,
                              }}
                              transition={{ duration: 0.5, ease: 'easeInOut' }}
                            >
                              <motion.div className="w-full h-full flex items-center justify-center">
                                <motion.img
                                  src={project.media.logo}
                                  alt={`${project.project.title} logo`}
                                  className="max-w-[80%] max-h-[80%] w-auto h-auto object-contain p-4"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.3 }}
                                  style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                                />
                              </motion.div>
                            </motion.div>
                          )}
                          {carouselIndex > 0 && (
                            <motion.img
                              key={carouselIndex}
                              src={project.media.images[carouselIndex]}
                              alt={`${project.project.title} preview ${carouselIndex}`}
                              className="absolute inset-0 max-w-full max-h-full object-contain p-2 m-auto"
                              initial={{ opacity: 0 }}
                              animate={{
                                opacity: 1,
                                scale: 1,
                              }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.5, ease: 'easeInOut' }}
                              onClick={() => openImage(project.media.images[carouselIndex], carouselIndex)}
                            />
                          )}
                        </>
                      ) : (
                        <motion.img
                          key={carouselIndex}
                          src={project.media.images[carouselIndex]}
                          alt={`${project.project.title} preview ${carouselIndex + 1}`}
                          className="absolute inset-0 max-w-full max-h-full object-contain p-2 m-auto"
                          initial={{ opacity: 0 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                          }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, ease: 'easeInOut' }}
                          onClick={() => openImage(project.media.images[carouselIndex], carouselIndex)}
                        />
                      )}
                    </motion.div>
                    
                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {project.media.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCarouselIndex(index);
                          }}
                          className={`w-2 h-2 rounded-full transition-all ${index === carouselIndex ? 'bg-white w-6' : 'bg-white bg-opacity-50'}`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </>
              ) : project.media.backgroundImage ? (
                <div className="w-full h-full flex items-center justify-center bg-black">
                  <motion.img
                    src={project.media.backgroundImage}
                    alt={`${project.project.title} preview`}
                    className="max-w-full max-h-full object-contain p-4"
                    onClick={() => openImage(project.media.backgroundImage, 0)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <p className="text-gray-500">No images available</p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Title and Subtitle */}
            <motion.div 
              className="w-full md:w-1/2 lg:w-2/5 space-y-4"
              variants={container}
            >
              <motion.a 
                href={project.project.cta?.url || '#'}
                target={project.project.cta?.external ? "_blank" : "_self"}
                rel={project.project.cta?.external ? "noopener noreferrer" : ""}
                className="w-full block no-underline hover:opacity-90 transition-opacity"
                variants={fadeInUp}
                style={{
                  fontFamily: '"Climate Crisis", sans-serif',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  color: project.theme.accentColor || '#EA1821',
                  fontSize: 'clamp(1.25rem, 4.5vw, 2.75rem)',
                  lineHeight: 1,
                  cursor: 'pointer'
                }}
              >
                {project.project.title.split(' ').map((word, i) => (
                  <motion.span 
                    key={i}
                    style={{ display: 'inline-block', marginRight: '0.3em' }}
                    variants={{
                      hidden: { y: 20, opacity: 0 },
                      visible: {
                        y: 0,
                        opacity: 1,
                        transition: {
                          duration: 0.5,
                          delay: i * 0.05
                        }
                      }
                    }}
                  >
                    {word + ' '}
                  </motion.span>
                ))}
              </motion.a>
              {project.project.subtitle && (
                <motion.p 
                  className="text-base sm:text-lg md:text-xl mt-2"
                  variants={fadeInUp}
                  style={{
                    color: project.theme.accentColor || '#EA1821',
                    fontFamily: '"Climate Crisis", sans-serif',
                    fontWeight: 300,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}
                >
                  {project.project.subtitle}
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Content Section */}
      <motion.div 
        className="w-full"
        initial="hidden"
        animate={controls}
        variants={container}
      >
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {project.project.categories && project.project.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.project.categories.map((category) => (
                  <motion.span 
                    key={`category-${category.toLowerCase().replaceAll(' ', '-')}`}
                    className="px-4 py-2 border rounded-full text-sm font-['Montserrat']"
                    variants={fadeInUp}
                    style={{
                      borderColor: project.theme.accentColor,
                      color: project.theme.accentColor,
                      backgroundColor: `${project.theme.accentColor}20` // 20% opacity of accent color
                    }}
                  >
                    {category}
                  </motion.span>
                ))}
              </div>
            )}
          </div>

          {/* Right Column */}
          <motion.div 
            className="space-y-8 mt-8"
            variants={container}
          >
            <motion.p 
              className="text-lg md:text-xl leading-relaxed opacity-90 font-['Montserrat']"
              variants={fadeInUp}
            >
              {project.project.description}
            </motion.p>
            
            {project.project.cta && (
              <motion.div variants={fadeInUp}>
                <motion.a
                  href={project.project.cta.url}
                  target={project.project.cta.external ? "_blank" : "_self"}
                  rel={project.project.cta.external ? "noopener noreferrer" : ""}
                  className="inline-flex items-center text-lg font-medium border-b-2 border-transparent hover:border-current transition-all duration-300 font-['Montserrat']"
                  style={{
                    color: project.theme.accentColor || '#EA1821',
                    borderColor: project.theme.accentColor || '#EA1821'
                  }}
                  whileHover={{ x: 5 }}
                >
                  {project.project.cta.label}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="inline-block ml-2"
                  >
                    <svg 
                      className="w-4 h-4" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </motion.span>
                </motion.a>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImage}
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                closeImage();
              }}
            >
              <XMarkIcon className="h-8 w-8" />
            </button>

            <div className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center">
              <button 
                className="absolute left-4 text-white hover:text-gray-300 transition-colors p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(-1);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <motion.img
                key={currentImageIndex}
                src={selectedImage}
                alt={`${project.project.title} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              />

              <button 
                className="absolute right-4 text-white hover:text-gray-300 transition-colors p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(1);
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="absolute bottom-6 text-white text-center w-full">
              <p className="text-sm opacity-80">
                {currentImageIndex + 1} / {project.media.images.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

ProjectCaseStudy.propTypes = {
  project: PropTypes.shape({
    project: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string,
      categories: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string.isRequired,
      cta: PropTypes.shape({
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    }).isRequired,
    layout: PropTypes.shape({
      type: PropTypes.string.isRequired,
      structure: PropTypes.shape({
        hero: PropTypes.shape({
          height: PropTypes.string.isRequired,
          alignment: PropTypes.string.isRequired,
          content: PropTypes.string.isRequired
        }).isRequired,
        content: PropTypes.shape({
          columns: PropTypes.number.isRequired,
          left: PropTypes.arrayOf(PropTypes.string).isRequired,
          right: PropTypes.arrayOf(PropTypes.string).isRequired
        }).isRequired
      }).isRequired
    }).isRequired,
    media: PropTypes.shape({
      logo: PropTypes.shape({
        type: PropTypes.string,
        src: PropTypes.string,
        alt: PropTypes.string
      }),
      backgroundImage: PropTypes.string
    }),
    theme: PropTypes.shape({
      backgroundColor: PropTypes.string.isRequired,
      textColor: PropTypes.string.isRequired,
      accentColor: PropTypes.string.isRequired,
      font: PropTypes.shape({
        heading: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  }).isRequired
};

export default ProjectCaseStudy;
