import React from 'react';
import HeroSection from '../components/HeroSection';
import About from '../pages/About';
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
