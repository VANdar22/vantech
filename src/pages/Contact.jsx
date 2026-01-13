import React, { useState, useRef, useEffect } from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion, useInView } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [recaptchaValue, setRecaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!recaptchaValue) {
      alert('Please complete the reCAPTCHA verification');
      return;
    }
    
    // Add reCAPTCHA token to form data
    const formDataWithCaptcha = {
      ...formData,
      'g-recaptcha-response': recaptchaValue
    };
    
    // Handle form submission
    console.log('Form submitted:', formDataWithCaptcha);
    
    // Here you would typically send the data to your backend
    // Example:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formDataWithCaptcha),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   // Reset form
    //   setFormData({ name: '', email: '', phone: '', message: '' });
    //   recaptchaRef.current.reset();
    //   setRecaptchaValue(null);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
  };
  
  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };

  const headingRef = useRef(null);
  const isInView = useInView(headingRef, { once: true, amount: 0.5 });

  const textLines = ["Ready to", "make", "it real?"];
  
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
    <div className="min-h-screen pt-20 px-4 bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <motion.div 
              ref={headingRef}
              className="w-full"
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.div 
                className="font-['Climate_Crisis'] text-gray-900 text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight"
                style={{
                  textTransform: 'uppercase',
                  fontWeight: 400
                }}
                variants={container}
              >
                {textLines.map((line, i) => (
                  <motion.div 
                    key={i} 
                    className="block text-[#ea1821] overflow-hidden w-full whitespace-nowrap"
                    custom={i}
                    variants={container}
                  >
                    {splitText(line)}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.p 
              className="text-justify text-lg text-gray-800 max-w-lg font-['Montserrat'] font-normal leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: 0.6,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1]
                }
              } : {}}
            >
              Have a project in mind or want to discuss how we can work together? We'd love to hear from you. 
              Fill out the form and our team will get back to you as soon as possible.
            </motion.p>
            <motion.div 
              className="pt-4"
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
              <motion.div className="flex justify-center md:justify-start space-x-6">
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
          <div className="bg-[#f5f5f5] p-8 rounded-lg font-['Montserrat']">
            <form onSubmit={handleSubmit} className="space-y-5 ">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#C41220] focus:outline-none focus:ring-1 focus:ring-[#C41220] font-['Montserrat'] text-gray-800"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#C41220] focus:outline-none focus:ring-1 focus:ring-[#C41220] font-['Montserrat'] text-gray-800"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">Phone (optional)</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-[#C41220] focus:outline-none focus:ring-1 focus:ring-[#C41220] font-['Montserrat'] text-gray-800"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#C41220] focus:outline-none focus:ring-1 focus:ring-[#C41220] font-['Montserrat'] text-gray-800"
                  required
                />
              </div>
              
              <div className="my-4">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6Lewf0ksAAAAAHqVzrZFixUBHzZEWF1FLTyPCLLy"
                  onChange={handleRecaptchaChange}
                />
              </div>
              <button
                type="submit"
                disabled={!recaptchaValue}
                className={`w-full bg-[#C41220] text-white py-3 px-4 font-semibold transition-colors font-['Montserrat'] ${
                  recaptchaValue ? 'hover:bg-[#9e0e19]' : 'opacity-50 cursor-not-allowed'
                }`}
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
