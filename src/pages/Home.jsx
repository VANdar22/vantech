import React from 'react';
import HeroSection from '../components/HeroSection';
import SchoolIntro from '../components/SchoolIntro';
import About from '../pages/About';
import NewsSection from '../components/NewsSection';
import BentoGridSecondDemo from '../components/bento-grid-demo-2';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroSection />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
