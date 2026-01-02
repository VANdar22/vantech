import React, { useState, useRef, useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.5 });

  const textLines = ["Ready to", "make it", "real?"];
  
  // Animation variants for text characters
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  // Split text into characters
  const splitText = (text) => {
    return text.split('').map((char, i) => (
      <motion.span
        key={i}
        variants={child}
        style={{ display: 'inline-block' }}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));
  };

  return (
    <div className="min-h-screen pt-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <motion.div 
              ref={headingRef}
              className="font-bold leading-none text-gray-900"
              style={{
                fontFamily: 'Clash Display',
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                fontWeight: 800,
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                textTransform: 'uppercase'
              }}
            >
              <motion.div 
                className="flex flex-col"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={container}
              >
                {textLines.map((line, i) => (
                  <motion.div 
                    key={i} 
                    className="block text-[#ea1821] overflow-hidden"
                    custom={i}
                    variants={container}
                  >
                    {splitText(line)}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.p 
              className="text-lg text-gray-800 max-w-lg" 
              style={{ fontFamily: 'Clash Display' }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: 0.6, // Slight delay after the heading animation
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }
              } : {}}
            >
              Have a project in mind or want to discuss how we can work together? We'd love to hear from you. 
              Fill out the form and our team will get back to you as soon as possible.
            </motion.p>
            <motion.div 
              className="pt-4 -ml-5"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: 0.8, // Slightly after the subtext
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                  staggerChildren: 0.1
                }
              } : {}}
            >
              <motion.div className="flex space-x-6">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 hover:bg-gray-100/50 rounded-full transition-colors block"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="w-10 h-10 text-black hover:text-[#C41220] transition-colors" />
                  </a>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 hover:bg-gray-100/50 rounded-full transition-colors block"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="w-10 h-10 text-black hover:text-[#C41220] transition-colors" />
                  </a>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-4 hover:bg-gray-100/50 rounded-full transition-colors block"
                    aria-label="GitHub"
                  >
                    <FaGithub className="w-10 h-10 text-black hover:text-[#C41220] transition-colors" />
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          <div className="bg-white p-8 rounded-lg" style={{ fontFamily: 'Clash Display' }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#0E38B1]"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#0E38B1]"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm text-gray-700 mb-1">Phone (optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#0E38B1]"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 focus:outline-none focus:border-[#0E38B1]"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-[#C41220] text-white py-3 px-4 font-medium hover:bg-[#9e0e19] transition-colors"
                style={{ fontFamily: 'Clash Display' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
