import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import prashantImg from '../assets/prashantImg.png'; // update path as needed

const roles = [
  "Full-Stack Developer",
  "AI Integration Builder",
  "CS Student",
  "Open Source Contributor",
];

export default function Hero({ scrollToSection }) {
  const ctaRef = useRef();
  const containerRef = useRef(null);
  
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // Typewriter Logic (Preserved)
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  // Entry Landing Animation (Zoom In)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the main central elements (Text -> Image -> Text)
      gsap.fromTo(".zoom-element", 
        { scale: 0.85, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "power4.out", stagger: 0.15 }
      );
      
      // Fade in the bottom UI elements slightly after
      gsap.fromTo(".fade-up-element",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: "power3.out", stagger: 0.1 }
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  // GSAP Magnetic Button Logic (Preserved)
  const handleMouseMove = (e) => {
    const btn = ctaRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.35, y: y * 0.35, scale: 1.05, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    const btn = ctaRef.current;
    if (!btn) return;
    gsap.to(btn, { x: 0, y: 0, scale: 1, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  };

  return (
    <section
      id="hero-section"
      ref={containerRef}
      className="scroll-section relative w-full h-screen bg-[#fdfdfc] text-zinc-900 overflow-hidden selection:bg-[#FFD700] selection:text-black"
    >
      {/* 1. Top Left Label (z-30 to stay above everything) */}
      <div className="absolute top-12 left-6 md:top-16 md:left-16 z-30 fade-up-element">
        <p className="text-xs md:text-sm font-bold tracking-[0.2em] text-zinc-400 uppercase flex items-center gap-3">
          <span className="w-8 h-[2px] bg-zinc-300"></span>
          Portfolio Archive // 2026
        </p>
      </div>

      {/* 2. LAYER 1 (BEHIND IMAGE): First Name (z-0) */}
      {/* Adjusted top position to push it higher up */}
      <div className="absolute top-[25%] md:top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-0 pointer-events-none px-4 zoom-element">
        <h1 className="text-[15vw] md:text-[10vw] lg:text-[11rem] font-black leading-[0.8] tracking-tighter uppercase whitespace-nowrap text-zinc-900">
          I'M PRASHANT
        </h1>
      </div>

      <div className="absolute top-2/5 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex justify-center items-center pointer-events-none mt-4 md:mt-0 zoom-element">
        <div className="relative w-64 h-[380px] md:w-[350px] md:h-[500px] rounded-[150px] overflow-hidden group bg-transparent pointer-events-auto">
          <img
            src={prashantImg}
            alt="Prashant Mishra"
            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="absolute top-[68%] md:top-[68%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-20 pointer-events-none px-4 zoom-element">
       <h1 className="text-[18vw] md:text-[14vw] lg:text-[11rem] font-bold italic leading-[0.8] tracking-tighter uppercase whitespace-nowrap text-transparent drop-shadow-2xl"
        style={{ WebkitTextStroke: "4px #6d87a8ff"}}>
          MISHRA<span className="text-[#FFD700]">.</span>
       </h1>
      </div>
      <div className="absolute bottom-8 left-6 md:bottom-[12%] md:left-16 flex flex-col items-start max-w-[320px] md:max-w-md z-30">
        
        {/* Typewriter text */}
        <h2 className="text-sm md:text-xl font-mono font-medium text-zinc-800 mb-5 h-6 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-md border border-zinc-200 shadow-sm fade-up-element">
          <span>{displayed}</span>
          <span className="inline-block w-[3px] h-[1em] bg-[#FFD700] animate-[blink_1s_step-end_infinite]" />
        </h2>

        {/* Description */}
        <p className="text-sm md:text-base font-medium text-zinc-600 leading-relaxed mb-8 bg-white/60 backdrop-blur-md p-3 rounded-lg md:bg-transparent md:p-0 md:backdrop-blur-none fade-up-element">
          I build production-ready full-stack products that ship fast, scale well, and solve real problems. Currently in my 4th year of CS — shipping AI-powered apps used by real users.
        </p>

        {/* Minimalist Solid CTA */}
        <button
          ref={ctaRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={() => scrollToSection(1)}
          className="relative px-8 py-4 md:px-10 md:py-5 bg-zinc-900 text-white rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#FFD700] hover:text-black transition-colors duration-500 cursor-pointer shadow-xl fade-up-element"
        >
          Explore My Work
        </button>
      </div>

      {/* 6. Minimalist Scroll Indicator (z-30) */}
      <div
        onClick={() => scrollToSection(1)}
        className="hidden md:flex absolute bottom-12 right-16 flex-col items-center cursor-pointer group z-30 fade-up-element"
      >
        <span className="text-[10px] font-bold tracking-widest text-zinc-400 group-hover:text-zinc-900 transition-colors duration-300 mb-3 uppercase" style={{ writingMode: 'vertical-rl' }}>
          Scroll Down
        </span>
        <div className="w-[2px] h-12 bg-zinc-200 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-zinc-900 animate-bounce" />
        </div>
      </div>
    </section>
  );
}