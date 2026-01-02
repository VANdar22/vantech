import React, { useRef } from 'react';
import { m, motion, useScroll, useTransform } from 'framer-motion';
import visuraLogo from '../assets/visura.png';
import v1 from '../assets/v1.png';
import v2 from '../assets/v2.png';
import v3 from '../assets/v3.png';
import v4 from '../assets/v6.png';
import s1 from '../assets/s1.png';
import s2 from '../assets/s2.png';
import s3 from '../assets/s3.png';
import s4 from '../assets/s4.png';
import s5 from '../assets/s5.png';
import a1 from '../assets/a1.mp4';
import a5 from '../assets/a5.png';
import a6 from '../assets/a6.png';
import a7 from '../assets/a7.png';
import a8 from '../assets/a8.png';
import m1 from '../assets/m1.png';
import m2 from '../assets/m2.png';
import m3 from '../assets/m3.png';
import m4 from '../assets/m4.png';
import m5 from '../assets/m5.png';
import ProjectCaseStudy from '../components/ProjectCaseStudy';

const projects = [
  {
    project: {
      id: 'aateek',
      title: 'AAteek',
      subtitle: 'Vehicle Booking System',
      categories: ['Mobile App', 'Transportation'],
      description: 'Automobile booking system for easy vehicle reservations. AAteek simplifies the process of renting vehicles with a user-friendly interface, real-time availability checks, and secure payment processing. The app includes features like GPS tracking, driver verification, and 24/7 customer support.',
      cta: {
        label: 'Visit Live Site',
        url: 'https://luxury-nasturtium-2398ee.netlify.app/',
        external: true
      }
    },
    layout: {
      type: 'case-study',
      structure: {
        hero: {
          height: '60vh',
          alignment: 'center',
          content: 'title'
        },
        content: {
          columns: 2,
          left: ['title', 'subtitle', 'categories'],
          right: ['description', 'cta']
        }
      }
    },
    media: {
      logo: m1,
      images: [
        a1,
        a5,
        a6,
        a7,
        a8
      ],
      backgroundImage: null
    },
    theme: {
      backgroundColor: '#0A0C0F', // Deeper, more modern dark background
      textColor: '#FFFFFF',
      accentColor: '#FF4D4D', // Vibrant red accent for subtitles and interactive elements
      font: {
        heading: 'Clash_Display',
        body: 'Montserrat'
      }
    }
  },
  {
    project: {
      id: 'midak-research',
      title: 'Midak Research',
      subtitle : 'Advanced Data Analytics Platform',
      categories: ['Web Application', 'Data Science'],
      description: 'Midak Research is a cutting-edge data analytics platform that provides powerful insights through machine learning and statistical analysis. The platform features interactive dashboards, real-time data processing, and advanced visualization tools. Built with modern web technologies, it offers a seamless experience for data scientists and business analysts alike.',
      cta: {
        label: 'Visit Midak Research',
        url: 'https://midakresearch.com'
      }
    },
    layout: {
      type: 'case-study',
      structure: {
        hero: {
          height: '60vh',
          alignment: 'center',
          content: 'title'
        },
        content: {
          columns: 2,
          left: ['title', 'subtitle', 'categories'],
          right: ['description', 'cta']
        }
      }
    },
    media: {
      logo: m1,
      images: [
        m1,
        m2,
        m3,
        m4,
        m5
      ],
      backgroundImage: null
    },
    theme: {
      backgroundColor: '#b23c3c',
      textColor: '#FFFFFF',
      accentColor: '#E0B0FF', // Mauve accent color for subtitle
      font: {
        heading: 'Clash_Display',
        body: 'Montserrat'
      }
    }
  },
  {
    project: {
      id: 'visura',
      title: 'Visura',
      subtitle: 'Modern media streaming platform',
      categories: ['Mobile Application', 'Streaming'],
      description: 'A modern media player application with seamless streaming capabilities. Built with ReactNative and Spring Boot, Visura offers an intuitive interface for streaming your favorite media content with high-quality playback and minimal buffering. The platform supports multiple devices and provides personalized recommendations based on viewing history.',
      cta: {
        label: 'View project details',
        url: '/projects/visura'
      }
    },
    layout: {
      type: 'case-study',
      structure: {
        hero: {
          height: '60vh',
          alignment: 'center',
          content: 'title'
        },
        content: {
          columns: 2,
          left: ['title', 'subtitle', 'categories'],
          right: ['description', 'cta']
        }
      }
    },
    media: {
      logo: visuraLogo,
      backgroundImage: visuraLogo,
      images: [
        visuraLogo,
        v1,
        v2,
        v3,
        v4
      ]
    },
    theme: {
      backgroundColor: '#c42ac4',
      textColor: '#FFFFFF',
      accentColor: '#FFD700', // Gold accent color
      font: {
        heading: 'Clash_Display',
        body: 'Montserrat'
      }
    }
  },
  {
    project: {
      id: 'classscope',
      title: 'ClassScope',
      subtitle: 'School Management Platform',
      categories: ['Web Application', 'Education'],
      description: 'Comprehensive school management platform for educational institutions. ClassScope streamlines administrative tasks, student management, and communication between teachers, students, and parents in one unified platform. The system includes features like attendance tracking, grade management, and a built-in messaging system.',
      cta: null
    },
    layout: {
      type: 'case-study',
      structure: {
        hero: {
          height: '60vh',
          alignment: 'center',
          content: 'title'
        },
        content: {
          columns: 2,
          left: ['title', 'subtitle', 'categories'],
          right: ['description', 'cta']
        }
      }
    },
    media: {
      images: [
        s1,
        s2,
        s3,
        s4,
        s5
      ],
      backgroundImage: null
    },
    theme: {
      backgroundColor: '#2a6bff', // Lighter blue variant
      textColor: '#FFFFFF',
      accentColor: '#FFFFFF',
      font: {
        heading: 'Clash_Display',
        body: 'Montserrat'
      }
    }
  }
];

const Projects = () => {
  const containerRef = useRef(null);
  const projectRefs = useRef([]);
  
  // Create a ref for each project
  const setProjectRef = (el, index) => {
    projectRefs.current[index] = el;
  };

  // Calculate the parallax effect based on the project's position
  const getParallaxStyle = (index) => {
    const ref = projectRefs.current[index];
    if (!ref) return {};
    
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"]
    });

    // Smoother parallax effect with easing
    const y = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [index * 15, index * 5, -index * 30],
      { ease: [0.25, 0.1, 0.25, 1] } // Smooth easing function
    );

    // Add subtle scale effect
    const scale = useTransform(
      scrollYProgress,
      [0, 0.9, 1],
      [0.95, 1, 1],
      { ease: [0.25, 0.1, 0.25, 1] }
    );

    // Add opacity transition
    const opacity = useTransform(
      scrollYProgress,
      [0, 0.1, 0.9, 1],
      [0.5, 1, 1, 0.5],
      { ease: [0.25, 0.1, 0.25, 1] }
    );

    return { y, scale, opacity };
  };

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden" ref={containerRef}>
      <div className="w-full">
        {projects.map((project, index) => (
          <section 
            key={project.project.id}
            ref={el => setProjectRef(el, index)}
            className="relative w-full min-h-screen flex items-center justify-center py-20"
            style={{
              backgroundColor: project.theme.backgroundColor,
              color: project.theme.textColor
            }}
          >
            <motion.div
              style={getParallaxStyle(index)}
              className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              initial="hidden"
              animate="visible"
              custom={index}
              variants={containerVariants}
            >
              <ProjectCaseStudy project={project} />
            </motion.div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Projects;
