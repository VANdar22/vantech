import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import aboutImage from '../assets/a3.png';
import { BACKGROUND_LIGHT } from '../constants/colors';
import Footer from '../components/Footer';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { 
      staggerChildren: 0.08,
      delayChildren: 0.1 * i,
    },
  }),
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
      mass: 0.5,
      delay: i * 0.1,
    },
  }),
};

const childVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
      mass: 0.5,
    },
  },
};

const aboutData = {
  container: {
    maxWidth: "1100px",
    paddingX: "1rem",
    paddingTop: "2rem",
    paddingBottom: "2rem",
    align: "center"
  },
  header: {
    title: "",
    fontSize: "3rem",
    fontWeight: 600,
    fontFamily: "Clash Display",
    letterSpacing: "0.02em",
    color: "#EA1821",
    marginBottom: "1rem"
  },

  sections: [
    {
      id: 1,
      spacingBottom: "0",
      paragraphs: [
        {
          text: [
            <span key="about-intro">
              We are a studio that builds and runs our own digital products – and sometimes teams up with clients to bring their ideas to life.
            </span>
          ],
          className: "text-lg sm:text-xl text-[#1B1D1C]] leading-relaxed font-['Montserrat'] mb-8"
        },
        {
          text: [
            <span key="products-text" className="block mb-6">
              From <span className="font-['Clash_Display'] font-bold text-lg sm:text-xl" style={{color: '#EA1821'}}>Visura</span>, our media player app, to <span className="font-['Clash_Display'] font-bold text-lg sm:text-xl" style={{color: '#EA1821'}}>ClassScope</span>, a school management platform, <span className="font-['Clash_Display'] font-bold text-lg sm:text-xl" style={{color: '#EA1821'}}>AAteek</span> Automobile Booking System, and the website for <a href="https://midakresearch.com" target="_blank" rel="noopener noreferrer" className="font-['Clash_Display'] font-bold text-lg sm:text-xl hover:underline" style={{color: '#EA1821'}}>Midak Research</a>, we love building products that people actually use.
            </span>
          ],
          className: "text-lg sm:text-xl text-[#1B1D1C] leading-relaxed font-['Montserrat']"
        },
        {
          text: [
            <span key="design-philosophy" className="block mb-6">
              We believe good design is thoughtful, purposeful, and never boring. Every product we make has a point of view – and a little personality too.
            </span>
          ],
          className: "text-lg sm:text-xl text-[#1B1D1C] leading-relaxed font-['Montserrat']"
        },
        {
          type: "div",
          className: "flex justify-center my-12",
          content: (
            <img 
              src={aboutImage} 
              alt="About VANtech"
              className="w-[28rem] h-[28rem] object-cover"
            />
          )
        },

      ]
    }
  ]
};

const About = () => {
  const { container, header, headerUnderline, sections } = aboutData;

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-b from-white to-[#EA1821]/20">
      {/* Top Left SVG */}
      <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 z-10">
        <svg 
          viewBox="0 0 256 256" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z" fill="#EA1821" />
        </svg>
      </div>
      
      {/* Bottom Right SVG */}
      <div className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 z-10">
        <svg 
          viewBox="0 0 256 256" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z" fill="#EA1821" />
        </svg>
      </div>
      <div 
        className="flex-grow mt-16 sm:mt-20"
        style={{
          padding: `${container.paddingTop} ${container.paddingX} ${container.paddingBottom}`,
          textAlign: container.align
        }}
      >
      <div 
        ref={containerRef}
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{
          maxWidth: container.maxWidth,
          textAlign: 'left'
        }}
      >
        <motion.h1 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          style={{
            fontSize: header.fontSize,
            fontWeight: header.fontWeight,
            letterSpacing: header.letterSpacing,
            color: header.color,
            marginBottom: header.marginBottom,
            textTransform: 'uppercase',
            fontFamily: '"Montserrat", sans-serif'
          }}
        >
          {header.title}
        </motion.h1>
        
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >

          <div>
            {sections.map((section, index) => (
              <motion.div 
                key={section.id}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                style={{
                  marginBottom: section.spacingBottom
                }}
              >
                {section.paragraphs.map((paragraph, pIndex) => {
                  const key = `${section.id}-${pIndex}`;
                  
                  // Handle div containers
                  if (paragraph.type === 'div') {
                    return (
                      <motion.div 
                        key={key}
                        variants={childVariants}
                        className={paragraph.className}
                      >
                        {paragraph.content && (
                          paragraph.content.type === 'div' ? (
                            <div 
                              className={paragraph.content.className}
                              style={paragraph.content.style}
                              aria-label={paragraph.content.alt}
                            />
                          ) : (
                            paragraph.content.src && (
                              <img
                                src={paragraph.content.src}
                                alt={paragraph.content.alt}
                                className={paragraph.content.className}
                              />
                            )
                          )
                        )}
                      </motion.div>
                    );
                  }
                  
                  // Handle headings
                  if (paragraph.type === 'h2') {
                    return (
                      <motion.h2 
                        key={key}
                        variants={childVariants}
                        className={paragraph.className}
                      >
                        {paragraph.text}
                      </motion.h2>
                    );
                  }
                  
                  // Handle regular text paragraphs
                  // Handle regular text paragraphs
                  if (paragraph.text) {
                    return (
                      <motion.div 
                        key={key}
                        className={paragraph.className}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={containerVariants}
                      >
                        {Array.isArray(paragraph.text) ? (
                          paragraph.text.map((text, i) => (
                            <motion.p 
                              key={i}
                              className="mb-4 last:mb-0"
                              variants={fadeInUp}
                              custom={i}
                            >
                              {text}
                            </motion.p>
                          ))
                        ) : (
                          <motion.p 
                            className="mb-4 last:mb-0"
                            variants={fadeInUp}
                          >
                            {paragraph.text}
                          </motion.p>
                        )}
                      </motion.div>
                    );
                  }
                  
                  return null;
                })}
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="flex justify-center my-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={aboutImage} 
              alt="About VANtech"
              className="w-[28rem] h-[28rem] object-cover"
            />
          </motion.div>
          
        </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
