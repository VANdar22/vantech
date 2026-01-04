import React from 'react';
import PropTypes from 'prop-types';

import ScrollVelocity from '../components/ScrollVelocity';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Puzzle, Workflow, UsersRound, ShieldCheck, Handshake, Target } from 'lucide-react';
import ThinkIcon from '../components/svgs/ThinkIcon';
import TeamIcon from '../components/svgs/TeamIcon';
import BuiltIcon from '../components/svgs/BuiltIcon';
import ProcessIcon from '../components/svgs/ProcessIcon';
import SvgMask from '../components/SvgMask';
import PageTransition from '../components/PageTransition';
import Footer from '../components/Footer';
import { accentColors } from '../constants/colors';
import styles from './Services.module.css';

// Import images
import strategyImg from '../assets/strategy.png';
import productImg from '../assets/product.png';
import softwareImg from '../assets/software.png';
import launchImg from '../assets/launch.png';

const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 0.9 },
      y: { 
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      },
      scale: { 
        duration: 0.8,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const letterAnimation = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95,
    filter: 'blur(4px)'
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0)',
    transition: {
      delay: i * 0.015, // Faster letter-by-letter for description
      duration: 0.8,   // Shorter duration for description
      ease: [0.16, 1, 0.3, 1],
      opacity: { duration: 1 },
      y: { duration: 1 },
      scale: { duration: 1.2, ease: [0.34, 1.56, 0.64, 1] },
      filter: { duration: 0.8 }
    }
  })
};

/**
 * AnimatedText Component
 * @param {React.ReactNode} children - The text content to animate
 * @param {number} [delay=0] - Delay before animation starts in seconds
 * @param {boolean} [split=false] - Whether to split text into words for individual animation
 * @param {string} [className=''] - Additional CSS classes
 */
const AnimatedText = ({ 
  children, 
  delay = 0, 
  split = false, 
  className = '' 
}) => {
  if (split && typeof children === 'string') {
    // Split into words and preserve spaces
    const words = children.split(/(\s+)/u);
    return (
      <span className={`inline-block ${className}`}>
        {words.map((word, wordIndex) => {
          const wordKey = `word-${word.trim() || 'space'}-${wordIndex}`;
          if (word.trim() === '') {
            return <span key={wordKey}>&nbsp;</span>;
          }
          return (
            <motion.span
              key={wordKey}
              className="inline-block mr-1.5 last:mr-0"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ 
                delay: delay + (wordIndex * 0.04),
                ...fadeInUp.visible.transition
              }}
            >
              {word}
            </motion.span>
          );
        })}
      </span>
    );
  }

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ 
        delay,
        ...fadeInUp.visible.transition
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
const capabilities = [
    {
      label: 'Strategy & Discovery',
      title: 'Clarity before code.',
      body: 'We help you define the right problem before anything is built. This phase aligns stakeholders, reduces risk, and sets a clear direction for product success.',
      image: strategyImg,
      bullets: [
        'Product vision and roadmap definition',
        'User research and stakeholder interviews',
        'Market and competitor analysis',
      ],
      cta: 'How we discover',
    },
    {
      label: 'Product Design',
      title: 'Design that feels effortless.',
      body: 'We design intuitive, accessible digital experiences that align user needs with business goals.',
      image: productImg,
      bullets: [
        'UX research and user journey mapping',
        'UI design systems and visual identity',
        'Prototyping and usability testing',
      ],
      cta: 'How we design',
    },
    {
      label: 'Software Development',
      title: 'Built to scale and last.',
      body: 'We engineer reliable, maintainable software systems using modern technologies and best practices.',
      image: softwareImg,
      bullets: [
        'Web and mobile application development',
        'Backend systems and APIs',
        'Cloud infrastructure and performance optimization',
      ],
      cta: 'How we build',
    },
    {
      label: 'Launch & Enablement',
      title: 'Support beyond delivery.',
      body: 'We help teams launch confidently and operate independently long after handover.',
      image: launchImg,
      bullets: [
        'Deployment and release management',
        'Documentation and team onboarding',
        'Ongoing support and iteration',
      ],
      cta: 'How we support',
    },
  ];
  const solutions = [
    {
      icon: Puzzle,
      title: 'Product-Led Thinking',
      body: 'We approach every project with a product mindset, focusing on outcomes, users, and long-term value.',
    },
    {
      icon: Workflow,
      title: 'Design Meets Engineering',
      body: 'Design and development work closely together, ensuring ideas translate cleanly into production.',
    },
    {
      icon: UsersRound,
      title: 'Senior, Focused Teams',
      body: 'Small teams led by experienced designers and engineers—no unnecessary layers.',
    },
    {
      icon: ShieldCheck,
      title: 'Built for Scale',
      body: 'We prioritize performance, security, and maintainability from day one.',
    },
    {
      icon: Handshake,
      title: 'True Partnership',
      body: 'We work as an extension of your team, sharing responsibility for outcomes.',
    },
    {
      icon: Target,
      title: 'Clarity Above All',
      body: 'We specialize in turning complex ideas into simple, usable digital products.',
    },
  ];
  


const Services = () => {
  return (
    <PageTransition>
      <div className={`min-h-screen w-full ${styles.servicesContainer} bg-[#f5f5f5]`} style={{ color: '#1a1a1a' }}>
      {/* hero */}
      <motion.section 
        className="mx-auto max-w-6xl px-6 py-24 overflow-hidden bg-[#f5f5f5]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        variants={staggerContainer}
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-end">
          <div className="flex-1">
            <AnimatedText>
              <p className="text-sm uppercase tracking-[0.3em]" style={{ color: `${accentColors.main}80` }}>Services</p>
            </AnimatedText>
            <AnimatedText delay={0.2} split>
              <h1 className="mt-4 text-3xl font-['Clash_Display'] font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl ">
                We turn ideas into awesome digital products
              </h1>
            </AnimatedText>
          </div>
          <AnimatedText delay={0.2}>
            <div className="flex-1 max-w-xl space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
              <div className="[&>span]:inline-block [&>span]:opacity-95">
                <AnimatedText split={false} delay={0.25}>
                We help you turn complex ideas into clear, scalable digital products.
Every engagement blends strategic thinking, thoughtful design, and reliable engineering.

                </AnimatedText>
              </div>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-black px-6 py-3 text-base font-semibold transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
                  style={{
                    backgroundColor: '#EA1821',
                    color: 'white',
                    borderColor: '#EA1821',
                    '--tw-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                  }}
                  whileHover={{
                    backgroundColor: '#D40000',
                    color: 'white',
                    borderColor: '#D40000',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Talk to us</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
                </motion.a>
              </div>
            </div>
          </AnimatedText>
        </div>
      </motion.section>

      {/* capabilities */}
      <section className="mx-auto max-w-6xl px-6 py-16 space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em]" style={{ color: `${accentColors.main}80` }}>What we do</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Simple structure, deep capability.</h2>
          </div>
          <p className="text-gray-600 text-lg md:max-w-md leading-relaxed">
            We keep the interface minimal so conversations stay about your business. Behind the scenes, multidisciplinary
            teams cover the detail.
          </p>
        </div>
        <div className="space-y-12">
          {capabilities.map((capability, index) => (
            <motion.article
              key={capability.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`grid gap-10 lg:grid-cols-2 items-center pt-12 ${
                index === 0 ? 'border-t-0 pt-0' : ''
              } ${index % 2 === 0 ? '' : 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'}`}
            >
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-widest">
                    <span className="h-px w-8" style={{ backgroundColor: `${accentColors.main}80` }} />
                    <span style={{ color: `${accentColors.main}80` }}>{capability.label}</span>
                  </div>
                  <h3 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 md:text-4xl">{capability.title}</h3>
                </div>
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-3xl">{capability.body}</p>
                <div className="space-y-4">
                  {capability.bullets.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-lg md:text-xl">
                      <span className="text-gray-600">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </div>
                <motion.button 
                  className="group inline-flex items-center gap-2 rounded-full border px-6 py-3 text-base font-semibold transition-all duration-300 ease-in-out hover:shadow-lg"
                  style={{
                    backgroundColor: '#EA1821',
                    color: 'white',
                    borderColor: '#EA1821',
                    '--tw-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
                  }}
                  whileHover={{
                    backgroundColor: '#D40000',
                    color: 'white',
                    borderColor: '#D40000',
                    scale: 1.05,
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>{capability.cta}</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                </motion.button>
              </div>
              <div className="relative w-full max-w-[500px] h-[300px] mx-auto">
                <SvgMask 
                  className="h-full w-full"
                  type={index % 2 === 0 ? 'right' : 'left'}
                >
                  <div className="w-full h-full bg-white p-2">
                    <img
                      src={capability.image}
                      alt={capability.title}
                      className="w-full h-full"
                      loading="lazy"
                      style={{
                        objectPosition: 'center',
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        backfaceVisibility: 'hidden',
                        transform: 'translateZ(0)'
                      }}
                    />
                  </div>
                </SvgMask>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* solutions */}
      <section className="border-t border-gray-200">
        <div className="mx-auto max-w-6xl px-6 py-20 space-y-12">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.3em]" style={{ color: `${accentColors.main}80` }}>Our Approach</p>
            <h2 className="text-3xl font-semibold text-gray-900 mt-2">What Makes VANtech Different</h2>
            <div className="w-24 h-0.5 bg-gray-200 mt-6"></div>
          </div>
          
          <div className="relative">
            <div className="grid gap-12 md:grid-cols-2">
              {[
                {
                  icon: ThinkIcon,
                  title: 'We Think Before We Build',
                  body: 'We take time to understand the problem, the users, and the goal so what we build is clear, useful, and aligned from the start.'
                },
                {
                  icon: TeamIcon,
                  title: 'Small Team, Clear Ownership',
                  body: 'You work directly with the people doing the work. This keeps communication simple and accountability strong.'
                },
                {
                  icon: BuiltIcon,
                  title: 'Built to Last',
                  body: 'We build with clean code, solid structure, and scalability in mind so your product can grow with confidence.'
                },
                {
                  icon: ProcessIcon,
                  title: 'Simple, Honest Process',
                  body: 'We communicate clearly, set realistic expectations, and do what we say we\'ll do.'
                }
              ].map(({ icon: Icon, title, body }) => (
                <article key={title} className="space-y-4 group">
                  <Icon className="h-16 w-16 text-red-500" />
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 md:text-2xl">{title}</h3>
                    <p className="mt-2 text-gray-600 text-xl">{body}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-200 -translate-x-1/2"></div>
          </div>
        </div>
      </section>
  
      <ScrollVelocity
  texts={['TRUST✦YOUR✦CRAZY✦IDEA✦WE✦MAKE✦IT✦REAL✦']}
  velocity={200} 
  className="text-[#ea1821] text-8xl font-climate-crisis"
/>

      {/* Footer */}
      <Footer />
      
      </div>
    </PageTransition>
    
  );
};

// Add prop type validation for the AnimatedText component
AnimatedText.propTypes = {
  children: PropTypes.node,
  delay: PropTypes.number,
  split: PropTypes.bool,
  className: PropTypes.string
};

export default Services;