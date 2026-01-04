import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import aboutImage from "../assets/a3.png";
import { BACKGROUND_LIGHT } from "../constants/colors";
import Footer from "../components/Footer";

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
      type: "spring",
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
      type: "spring",
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
    align: "center",
  },
  header: {
    title: "",
    fontSize: "3rem",
    fontWeight: 600,
    fontFamily: "Clash Display",
    letterSpacing: "0.02em",
    color: "#EA1821",
    marginBottom: "1rem",
  },

  sections: [
    {
      id: 1,
      spacingBottom: "0",
      paragraphs: [
        {
          text: [
            <span key="design-philosophy" className="block mb-6">
              We're a studio that designs and builds digital products with care.
              Sometimes they're our own ideas, sometimes they start as yours and
              every time we treat them like they matter.
            </span>,
          ],
          className:
            "text-lg sm:text-2xl text-[#1B1D1C] leading-relaxed font-['Montserrat'] font-normal",
        },
        {
          text: [
            <span key="products-text" className="block mb-6">
              From{" "}
              <span
                className="font-['Montserrat'] font-bold text-4xl sm:text-2xl"
                style={{ color: "#EA1821" }}
              >
                ClassScope
              </span>
              , a simple and reliable school management platform, to the website
              for{" "}
              <a
                href="https://midakresearch.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Montserrat'] font-bold text-4xl sm:text-2xl hover:underline"
                style={{ color: "#EA1821" }}
              >
                Midak Research
              </a>
              , built to clearly communicate insight and expertise, we love
              creating digital products that people actually use.
            </span>,
          ],
          className:
            "text-lg sm:text-2xl text-[#1B1D1C] leading-relaxed font-['Montserrat'] font-normal",
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
          ),
        },
      ],
    },
  ],
};

const About = () => {
  const { container, header, headerUnderline, sections } = aboutData;

  const containerRef = useRef(null);
  const topSvgRef = useRef(null);
  const bottomSvgRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const isTopSvgInView = useInView(topSvgRef, { once: true });
  const isBottomSvgInView = useInView(bottomSvgRef, { once: true });

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-b from-[#f5f5f5] to-[#EA1821]/20">
      {/* Top Left SVG */}
      <motion.div
        ref={topSvgRef}
        className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 z-10 cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isTopSvgInView ? { opacity: 1, scale: 1 } : {}}
        whileHover={{ scale: 1.1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          hover: { duration: 0.2 },
        }}
      >
        <motion.svg
          viewBox="0 0 256 256"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ rotate: -90 }}
          animate={isTopSvgInView ? { rotate: 0 } : {}}
          transition={{
            rotate: {
              duration: 1.2,
              ease: "easeOut",
              delay: 0.4,
            },
          }}
        >
          <motion.path
            d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z"
            fill="#EA1821"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isTopSvgInView ? { pathLength: 1, opacity: 1 } : {}}
            whileHover={{
              fill: "#ff4d4d",
              transition: { duration: 0.2 },
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.2,
              fill: { duration: 0.2 },
            }}
          />
        </motion.svg>
      </motion.div>

      {/* Bottom Right SVG */}
      <motion.div
        ref={bottomSvgRef}
        className="absolute bottom-0 right-0 w-24 h-24 md:w-32 md:h-32 z-10 cursor-pointer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isBottomSvgInView ? { opacity: 1, scale: 1 } : {}}
        whileHover={{ scale: 1.1 }}
        transition={{
          duration: 0.8,
          delay: 0.4,
          hover: { duration: 0.2 },
        }}
      >
        <motion.svg
          viewBox="0 0 256 256"
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ rotate: 90 }}
          animate={isBottomSvgInView ? { rotate: 0 } : {}}
          transition={{
            rotate: {
              duration: 1.2,
              ease: "easeOut",
              delay: 0.6,
            },
          }}
        >
          <motion.path
            d="M 152 70.059 L 201.539 20.519 L 235.48 54.461 L 185.941 104 L 256 104 L 256 152 L 185.941 152 L 235.48 201.539 L 201.539 235.48 L 152 185.941 L 152 256 L 104 256 L 104 185.941 L 54.46 235.48 L 20.52 201.539 L 70.059 152 L 0 152 L 0 104 L 70.059 104 L 20.519 54.46 L 54.461 20.52 L 104 70.059 L 104 0 L 152 0 Z"
            fill="#EA1821"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isBottomSvgInView ? { pathLength: 1, opacity: 1 } : {}}
            whileHover={{
              fill: "#ff4d4d",
              transition: { duration: 0.2 },
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.4,
              fill: { duration: 0.2 },
            }}
          />
        </motion.svg>
      </motion.div>
      <div
        className="flex-grow mt-16 sm:mt-20"
        style={{
          padding: `${container.paddingTop} ${container.paddingX} ${container.paddingBottom}`,
          textAlign: container.align,
        }}
      >
        <div
          ref={containerRef}
          className="mx-auto px-4 sm:px-6 lg:px-8"
          style={{
            maxWidth: container.maxWidth,
            textAlign: "left",
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
              textTransform: "uppercase",
              fontFamily: '"Montserrat", sans-serif',
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
                    marginBottom: section.spacingBottom,
                  }}
                >
                  {section.paragraphs.map((paragraph, pIndex) => {
                    const key = `${section.id}-${pIndex}`;

                    // Handle div containers
                    if (paragraph.type === "div") {
                      return (
                        <motion.div
                          key={key}
                          variants={childVariants}
                          className={paragraph.className}
                        >
                          {paragraph.content &&
                            (paragraph.content.type === "div" ? (
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
                            ))}
                        </motion.div>
                      );
                    }

                    // Handle headings
                    if (paragraph.type === "h2") {
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
