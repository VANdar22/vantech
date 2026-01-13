import React, { useState, useEffect } from 'react';
import logo from './assets/logo.png';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StaggeredMenu from './components/StaggeredMenu';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import SplashScreen from './components/SplashScreen';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Services', ariaLabel: 'View our services', link: '/services' },
  { label: 'Projects', ariaLabel: 'View our projects', link: '/projects' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const socialItems = [
  { label: 'Linkedin', link: 'https://linkedin.com' },
  { label: 'Instagram', link: 'https://www.instagram.com/vantech_studio?igsh=cm5naTQ2N3FhNGlt&utm_source=qr' },
  { label: 'Github', link: 'https://github.com/VANdar22' }
];

function App() {
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('hasSeenSplash');
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('hasSeenSplash', 'true');
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
        <SplashScreen onComplete={handleSplashComplete} />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col overflow-hidden">
        {/* Fixed Navigation */}
        <div className="fixed top-0 left-0 w-full z-50">
          <StaggeredMenu
            position="right"
            colors="#f5f5f5"
            items={menuItems}
            logoUrl={logo}
            socialItems={socialItems}
            displaySocials={true}
            openMenuButtonColor="transparent"
            closeMenuButtonColor="transparent"
            displayItemNumbering={true}
            menuButtonColor="#ea1821"
            accentColor="#ea1821"
          />
        </div>

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
