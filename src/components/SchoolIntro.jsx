import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(SplitText);

const SchoolIntro = () => {
  const introTextRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    // Animate the main heading
    if (headingRef.current) {
      const splitHeading = new SplitText(headingRef.current, {
        type: 'lines,words,chars',
        linesClass: 'split-line'
      });

      gsap.set(splitHeading.chars, { 
        opacity: 0, 
        y: 30,
        display: 'inline-block'
      });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      
      tl.to(splitHeading.chars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: 'back.out(1.7)'
      });

      // Animate the main text
      if (introTextRef.current) {
        const splitText = new SplitText(introTextRef.current, {
          type: 'lines,words',
          linesClass: 'split-line'
        });

        gsap.set(splitText.words, { 
          opacity: 0, 
          y: 20
        });

        tl.to(splitText.words, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'power2.out'
        }, '-=0.4');
      }

      return () => {
        if (splitHeading) splitHeading.revert();
        gsap.killTweensOf('.char, .word, .line');
      };
    }
  }, []);
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Top Left SVG */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48">
        <svg 
          viewBox="0 0 256 256" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000óut
          /svg"
        >
          <path d="M 192 0 C 227.346 0 256 28.654 256 64 C 256 99.346 227.346 128 192 128 C 227.346 128 256 156.654 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 C 99.346 0 128 28.654 128 64 C 128 28.654 156.654 0 192 0 Z M 128 100 C 112.536 100 100 112.536 100 128 C 100 143.464 112.536 156 128 156 C 143.464 156 156 143.464 156 128 C 156 112.536 143.464 100 128 100 Z" fill="#0E38B1" />
        </svg>
      </div>

      {/* Bottom Right SVG */}
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48">
        <svg 
          viewBox="0 0 256 256" 
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M 192 0 C 227.346 0 256 28.654 256 64 C 256 99.346 227.346 128 192 128 C 227.346 128 256 156.654 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 C 99.346 0 128 28.654 128 64 C 128 28.654 156.654 0 192 0 Z M 128 100 C 112.536 100 100 112.536 100 128 C 100 143.464 112.536 156 128 156 C 143.464 156 156 143.464 156 128 C 156 112.536 143.464 100 128 100 Z" fill="#0E38B1" />
        </svg>
      </div>

      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="w-full text-center overflow-hidden">
          <div 
            ref={introTextRef}
            className="text-2xl sm:text-3xl md:text-4xl font-['Clash_Display'] font-medium text-black/80
            leading-relaxed max-w-5xl mx-auto text-center tracking-wide pt-20"
          >
            At <span className="text-[#0E38B1] text-2xl sm:text-4xl font-bold">Obuase Complex JHS</span>, we believe education should <span className="text-[#0E38B1] text-2xl sm:text-4xl font-bold">inspire</span>. 
            Our classrooms are <span className="text-[#0E38B1] text-2xl sm:text-4xl font-bold">lively</span>, our teachers are <span className="text-[#0E38B1] text-2xl sm:text-4xl font-bold">supportive</span>, 
            and our students are full of <span className="text-[#0E38B1] text-2xl sm:text-4xl font-bold">potential</span>. 
            Join a community that <span className="text-[#0E38B1] text-2xl sm:text-4xl font-bold">loves to learn</span> and <span className="text-[#0E38B1] text-2xl sm:text-4xl font-bold">aims high</span>.
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolIntro;
