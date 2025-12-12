import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import schoolImage from '../assets/school.png';
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
    title: "ABOUT ",
    fontSize: "3rem",
    fontWeight: 600,
    fontFamily: "Montserrat",
    letterSpacing: "0.1em",
    color: "#0E38B1",
    marginBottom: "1rem"
  },

  sections: [
    {
      id: 1,
      spacingBottom: "0",
      paragraphs: [
        {
          text: [
            "Obuasi Complex JHS is a top-tier junior high school in Obuasi, Ashanti Region, known for academic excellence and holistic education. The school offers a comprehensive curriculum with modern facilities, including science/computer labs and a well-stocked library. Students excel in academics and competitions, supported by dedicated teachers and diverse extracurricular activities. The school fosters a nurturing environment that emphasizes character development, community values, and prepares students for future success. With a strong alumni network and commitment to innovation, Obuasi Complex JHS shapes well-rounded individuals ready to become tomorrow's leaders."
          ],
          className: "text-base sm:text-lg text-gray-800 leading-normal font-['Montserrat']"
        },
        {
          type: "div",
          className: "relative w-full my-12 mx-auto overflow-hidden",
          content: {
            type: "div",
            className: "w-full h-[50vh] sm:h-[60vh] md:h-[70vh] max-h-[800px] bg-cover bg-center rounded-3xl shadow-2xl overflow-hidden",
            style: {
              backgroundImage: `url(${schoolImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              border: '8px solid #0E38B1',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              WebkitTransform: 'translateZ(0)'
            },
            alt: "Obuasi Complex JHS Students"
          }
        },
        {
          text: [
            "Our students consistently excel in various academic competitions and examinations, a testament to our commitment to educational excellence. We provide a supportive learning environment that encourages critical thinking, creativity, and innovation. The school boasts modern facilities including well-equipped classrooms, science and computer laboratories, and a resourceful library. We also offer a range of extracurricular activities including sports, cultural programs, and STEM clubs to ensure the all-round development of our students. At Obuasi Complex JHS, we maintain strong partnerships with parents and the community to create a nurturing environment where every student can thrive. Our alumni network continues to grow, with many former students excelling in various fields both nationally and internationally. We are proud of our diverse student body and dedicated staff who work together to maintain our reputation as one of the leading junior high schools in the Ashanti Region. Our commitment to excellence in education remains unwavering as we prepare our students for the challenges of senior high school and beyond. Join us at Obuasi Complex JHS, where we believe in nurturing minds, building character, and shaping futures through quality education and holistic development."
          ],
          className: "text-base sm:text-lg text-gray-800 leading-normal font-['Montserrat']"
        },
        {
          type: "div",
          className: "w-full my-12"
        },
        {
          type: "h2",
          text: "Message from the Headteacher",
          className: "text-4xl font-bold text-[#0E38B1] mb-8 font-['Montserrat'] text-left"
        },
        {
          type: "motion.div",
          props: {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6 }
          },
          className: "w-full text-center"
        },
        {
          text: [
            "At Obuasi Complex JHS, we believe in the \"potential of every child.\" We celebrate \"curiosity,\" value \"hard work,\" and encourage our students to embrace challenges as \"opportunities to learn and grow.\" Our school community stands together in shaping \"bright futures.\""
          ],
          className: "text-xl sm:text-2xl font-['Clash_Display'] font-medium text-black/80 leading-relaxed max-w-4xl text-left tracking-wide"
        },
        {
          type: "div",
          className: "text-center mt-8"
        },
        {
          type: "p",
          className: "text-xl text-[#0E38B1] font-['Clash_Display'] font-semibold tracking-wide"
        },
        {
          text: [
            "Headteacher"
          ],
          className: "text-lg text-[#0E38B1] font-['Clash_Display'] font-medium tracking-wide"
        },
        {
          text: [
            "Obuasi Complex JHS"
          ],
          className: "text-base text-gray-600 font-['Clash_Display'] tracking-wide mt-1"
        },
        {
          type: "/div"
        },
        {
          type: "/div"
        },
        {
          type: "/motion.div"
        },
        {
          type: "/div"
        },
        {
          type: "div",
          className: "grid md:grid-cols-2 gap-8 my-12"
        },
        {
          type: "h2",
          text: "Our Mission",
          className: "text-4xl font-bold text-[#0E38B1] mb-4 mt-8 font-['Montserrat']"
        },
        {
          text: [
            "To provide a supportive, stimulating, and inclusive learning environment where all students can grow academically, socially, and personally."
          ],
          className: "text-base sm:text-lg text-gray-700 leading-relaxed font-['Montserrat']"
        },
        {
          type: "h2",
          text: "Our Vision",
          className: "text-4xl font-bold text-[#0E38B1] mb-4 mt-8 font-['Montserrat']"
        },
        {
          text: [
            "To inspire young minds to become lifelong learners, responsible citizens, and leaders of tomorrow."
          ],
          className: "text-base sm:text-lg text-gray-700 leading-relaxed font-['Montserrat']"
        }
      ]
    }
  ]
};

const About = () => {
  const { container, header, headerUnderline, sections } = aboutData;

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white">
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
        </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
