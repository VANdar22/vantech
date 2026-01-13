import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  {
    number: "1",
    title: "Strategy Call",
    description:
      "We start with a strategy call to understand your goals, audience, and requirements. We collect all necessary assets, references, and content so we are aligned from day one.",
  },
  {
    number: "2",
    title: "Research",
    description:
      "We research your industry and users, then define the site structure and user flows. Wireframes are created where necessary to ensure clarity and usability before design begins.",
  },
  {
    number: "3",
    title: "UI/UX Design",
    description:
      "We design a clean, functional interface that reflects your brand and delivers a strong user experience across all devices.",
  },
  {
    number: "4",
    title: "Build & Test",
    description:
      "Approved designs are developed into a fast, responsive website. We test across devices and browsers to ensure quality and performance.",
  },
  {
    number: "5",
    title: "Launch & Support",
    description:
      "We deploy the site and remain available for updates, refinements, and ongoing support as your product evolves.",
  },
];

const numberSVGs = {
  1: (
    <path
      d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z"
      fill="rgba(196, 18, 32, 0.1)"
    />
  ),
  2: (
    <path
      d="M 128 128 C 198.692 128 256 185.308 256 256 L 192 256 C 192 220.654 163.346 192 128 192 C 92.654 192 64 220.654 64 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 L 64 0 C 64 35.346 92.654 64 128 64 C 163.346 64 192 35.346 192 0 Z"
      fill="rgba(196, 18, 32, 0.1)"
    />
  ),
  3: (
    <path
      d="M 128 0 C 198.692 0 256 57.308 256 128 C 256 198.692 198.692 256 128 256 C 57.308 256 0 198.692 0 128 C 0 57.308 57.308 0 128 0 Z M 128 64 C 92.654 64 64 92.654 64 128 C 64 163.346 92.654 192 128 192 C 163.346 192 192 163.346 192 128 C 192 92.654 163.346 64 128 64 Z"
      fill="rgba(196, 18, 32, 0.1)"
    />
  ),
  4: (
    <path
      d="M 64 160 C 46.327 160 32 174.327 32 192 C 32 209.673 46.327 224 64 224 C 81.673 224 96 209.673 96 192 L 128 192 C 128 227.346 99.346 256 64 256 C 28.654 256 0 227.346 0 192 C 0 156.654 28.654 128 64 128 Z M 192 128 C 227.346 128 256 156.654 256 192 C 256 227.346 227.346 256 192 256 C 156.654 256 128 227.346 128 192 L 160 192 C 160 209.673 174.327 224 192 224 C 209.673 224 224 209.673 224 192 C 224 174.327 209.673 160 192 160 Z M 64 0 C 99.346 0 128 28.654 128 64 L 96 64 C 96 46.327 81.673 32 64 32 C 46.327 32 32 46.327 32 64 C 32 81.673 46.327 96 64 96 L 64 128 C 28.654 128 0 99.346 0 64 C 0 28.654 28.654 0 64 0 Z M 192 0 C 227.346 0 256 28.654 256 64 C 256 99.346 227.346 128 192 128 L 192 96 C 209.673 96 224 81.673 224 64 C 224 46.327 209.673 32 192 32 C 174.327 32 160 46.327 160 64 L 128 64 C 128 28.654 156.654 0 192 0 Z"
      fill="rgba(196, 18, 32, 0.1)"
    />
  ),
  5: (
    <path
      d="M 120 176 L 40 256 L 0 256 L 0 216 L 80 136 L 120 136 Z M 192 256 L 64 256 L 128 192 Z M 256 216 L 256 256 L 216 256 L 136 176 L 136 136 L 176 136 Z M 64 128 L 0 192 L 0 64 Z M 256 192 L 192 128 L 256 64 Z M 120 80 L 120 120 L 80 120 L 0 40 L 0 0 L 40 0 Z M 256 40 L 176 120 L 136 120 L 136 80 L 216 0 L 256 0 Z M 128 64 L 64 0 L 192 0 Z"
      fill="rgba(196, 18, 32, 0.1)"
    />
  ),
};

const StepCard = ({ number, title, description, isActive, onNext, onPrev }) => (
  <div className="relative w-full flex flex-col items-center justify-center min-h-[420px] sm:h-[420px] px-4 sm:px-12">
    <button
      onClick={onPrev}
      className="hidden sm:block absolute -left-10 top-1/2 -translate-y-1/2 p-2.5 bg-[#f5f5f5] hover:bg-[#f5f5f5]/60 active:scale-95 transform transition-all duration-200 ease-in-out z-10 shadow-lg hover:shadow-xl w-10 h-10 rounded-full"
      aria-label="Previous step"
    >
      <ChevronLeft className="w-6 h-6 text-[#ea1841]" />
    </button>

    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[320px] h-[360px] sm:w-full sm:max-w-3xl sm:h-[340px] p-6 sm:p-8 bg-[#f5f5f5] relative mx-auto overflow-hidden border border-[#e0e0e0] shadow-[8px_8px_0_0_rgba(0,0,0,0.1)] transform transition-all duration-300 hover:shadow-[12px_12px_0_0_rgba(0,0,0,0.15)] hover:-translate-x-0.5 hover:-translate-y-0.5"
    >
      <div className="absolute inset-0 opacity-2 overflow-hidden">
        {/* Corner borders */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ea1841]/10 opacity-100" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ea1841]/10 opacity-100" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ea1841]/10 opacity-100" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ea1841]/10 opacity-100" />
        <div className="absolute inset-0 flex items-center justify-center w-full h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
            className="w-[150%] h-[150%] sm:w-[120%] sm:h-[120%]"
            preserveAspectRatio="xMidYMid meet"
          >
            {numberSVGs[number]}
          </svg>
        </div>
      </div>
      <div className="flex flex-col h-full relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          className="text-4xl sm:text-3xl! font-bold text-[#ea1841] mb-4 sm:mb-6 font-climate-crisis"
        >
          {number}
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="text-xl sm:text-xl font-bold text-black mb-4 sm:mb-6 font-['Montserrat']"
        >
          {title}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 font-['Montserrat']"
        >
          {description}
        </motion.p>
      </div>
    </motion.div>

    <button
      onClick={onNext}
      className="hidden sm:block absolute -right-10 top-1/2 -translate-y-1/2 p-2.5 bg-[#f5f5f5] hover:bg-[#f5f5f5]/60 active:scale-95 transform transition-all duration-200 ease-in-out z-10 shadow-lg hover:shadow-xl w-10 h-10 rounded-full"
      aria-label="Next step"
    >
      <ChevronRight className="w-6 h-6 text-[#ea1841]" />
    </button>

    {/* Pagination Dots */}
    <div className="flex justify-center mt-4 sm:mt-0 sm:absolute sm:bottom-6 w-full">
      <div className="flex space-x-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              i === number - 1 ? "bg-[#C41220] w-6" : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  </div>
);

const HowWeWork = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nextStep = () => {
    setCurrentStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
  };

  // Auto-advance to next step every 3.25 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextStep();
    }, 22500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-f5f5f5" id="how-we-work">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1]
            }
          }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#EA1821] mb-4 font-climate-crisis">
            OUR PROCESS
          </h2>
        </motion.div>

        <div className="max-w-5xl mx-auto relative px-4 sm:px-8 lg:px-12">
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <StepCard
                key={currentStep}
                number={steps[currentStep].number}
                title={steps[currentStep].title}
                description={steps[currentStep].description}
                isActive={true}
                onNext={nextStep}
                onPrev={prevStep}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
