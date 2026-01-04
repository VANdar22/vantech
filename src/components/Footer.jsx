import React, { useRef } from 'react';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import TargetCursor from './TargetCursor';

const Footer = () => {
  const footerData = {
    title: "Crazy Ideas exist",
    links: [
      { label: "Home", url: "/" },
      { label: "Contact", url: "/contact" },
      { label: "Projects", url: "/projects" },
    ],
    socials: [
      { platform: "instagram", url: "https://instagram.com" },
      { platform: "linkedin", url: "https://linkedin.com" },
      { platform: "github", url: "https://github.com" }
    ]
  };

  const SocialLink = ({ platform, url }) => {
    const iconProps = { className: "w-10 h-10 text-gray-700 hover:text-[#EA1821] transition-colors" };
    
    const getIcon = () => {
      switch (platform.toLowerCase()) {
        case 'instagram':
          return <FaInstagram {...iconProps} />;
        case 'linkedin':
          return <FaLinkedin {...iconProps} />;
        case 'github':
          return <FaGithub {...iconProps} />;
        default:
          return platform;
      }
    };

    return (
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label={platform}
      >
        {getIcon()}
      </a>
    );
  };

  const crazyRef = useRef(null);
  const ideasRef = useRef(null);
  const existRef = useRef(null);
  const makeRef = useRef(null);
  const realRef = useRef(null);
  const footerRef = useRef(null);
  const navLinkRefs = useRef([]);

  return (
    <footer ref={footerRef} className="w-full min-h-screen bg-gradient-to-b from-[#ea1821]/20 to-[#ea1821]/40 flex items-center justify-center py-8 sm:py-12 px-4 footer-cursor-area">
      <TargetCursor 
        spinDuration={1.5}
        hideDefaultCursor={false}
        parallaxOn={true}
        color="#e53e3e"
        containerRef={footerRef}
      />
      <div className="w-full max-w-4xl mx-auto text-center px-4 sm:px-6">
        <h2 className="font-bold text-[#1B1D1C] mb-6 sm:mb-8 font-climate-crisis uppercase" style={{
          letterSpacing: '0.02em',
          fontSize: 'clamp(1.5rem, 5vw, 3rem)',
          lineHeight: 1,
          textTransform: 'uppercase',
          fontFamily: '"Climate Crisis", sans-serif',
          fontWeight: 400
        }}>
          <div className="flex flex-col space-y-2 sm:space-y-4">
              <span className="block text-[#e53e3e]">
                <span ref={crazyRef} className="cursor-target">Crazy</span> <span ref={ideasRef} className="cursor-target">Ideas</span> <span ref={existRef} className="cursor-target">exist</span>
              </span>
              <span className="text-[#e53e3e] block">therefore</span>
              <span className="block text-[#e53e3e]">
                We <span ref={makeRef} className="cursor-target">make</span> them <span ref={realRef} className="cursor-target">real</span>
              </span>
          </div>
        </h2>
        
        <nav className="mb-12">
          <ul className="flex flex-wrap justify-center gap-6 md:gap-10">
            {footerData.links.map((link, index) => (
              <li key={link.label}>
                <a 
                  ref={el => navLinkRefs.current[index] = el}
                  href={link.url} 
                  className="text-xl text-gray-600 hover:text-[#e53e3e] transition-colors font-['Montserrat'] cursor-target"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex justify-center space-x-2 mb-12">
          {footerData.socials.map((social, index) => (
            <SocialLink key={index} platform={social.platform} url={social.url} />
          ))}
        </div>

        <div className="text-center">
          <p className="text-base font-montserrat-alt text-[#ea1821] ">
            All rights reserved ©{' '}
            <a 
              href="https://2v2studios.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#ea1821] hover:underline"
              style={{ 
                fontFamily: '"Flexing", sans-serif',
                fontWeight: 600,
                fontSize: '1.2rem',
                letterSpacing: '0.5px'
              }}
            >
              VANtech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
