import React, { useState } from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

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

  return (
    <div className="min-h-screen pt-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <h1 
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
              <div className="flex flex-col">
                <div className="block text-[#ea1821]">Ready to</div>
                <div className="block text-[#ea1821]">make it</div>
                <div className="block text-[#ea1821]">real?</div>
              </div>
            </h1>
            <p className="text-lg text-gray-800 max-w-lg" style={{ fontFamily: 'Clash Display' }}>
              Have a project in mind or want to discuss how we can work together? We'd love to hear from you. 
              Fill out the form and our team will get back to you as soon as possible.
            </p>
            <div className="pt-4 -ml-5">
              <div className="flex space-x-6">
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 hover:bg-gray-100/50 rounded-full transition-colors"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-10 h-10 text-black hover:text-[#C41220] transition-colors" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 hover:bg-gray-100/50 rounded-full transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-10 h-10 text-black hover:text-[#C41220] transition-colors" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 hover:bg-gray-100/50 rounded-full transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-10 h-10 text-black hover:text-[#C41220] transition-colors" />
                </a>
              </div>
            </div>
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
