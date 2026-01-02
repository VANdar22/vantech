import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StaggeredMenu from './components/StaggeredMenu';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
  { label: 'Projects', ariaLabel: 'View our projects', link: '/projects' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' },
];

const socialItems = [
  { label: 'Linkedin', link: 'https://linkedin.com' },
  { label: 'Instagram', link: 'https://instagram.com' },
  { label: 'Github', link: 'https://github.com' }
];

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full flex flex-col overflow-hidden">
        {/* Fixed Navigation */}
        <div className="fixed top-0 left-0 w-full z-50">
          <StaggeredMenu
            position="right"
            items={menuItems}
            logoUrl="/src/assets/logo.png"
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
