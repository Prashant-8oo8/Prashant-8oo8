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
  const [displayed, setDisplayed] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

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
      className="scroll-section w-full min-h-screen px-6 md:px-16 pt-32 pb-16 flex items-center bg-gradient-to-b from-[#1c1c1c] to-[#131313] relative overflow-hidden"
    >
      {/* Teal radial glow — left */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_30%,rgba(0,206,209,0.05)_0%,rgba(0,0,0,0)_60%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_70%,rgba(255,140,0,0.03)_0%,rgba(0,0,0,0)_60%)]" />

      {/* Main Grid Container */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center z-10">

        {/* Left Side: Written Content (7 columns on desktop) */}
        <div className="col-span-12 md:col-span-7 flex flex-col justify-center items-start text-left select-none relative">
          <p className="label-caps text-[#00ced1] mb-6 flex items-center gap-2 animate-pulse">
            <span className="h-[2px] w-8 bg-[#00ced1]" />
            PORTFOLIO ARCHIVE // 2026
          </p>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-sans tracking-tight text-[#e4e2e1] leading-[1.1] mb-4">
            I'm Prashant Mishra
          </h1>

          {/* Typewriter */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-mono font-medium text-[#00ced1] mb-6 h-9 flex items-center gap-1">
            <span>{displayed}</span>
            <span className="inline-block w-[2px] h-[1.2em] bg-[#00ced1] animate-[blink_1s_step-end_infinite]" />
          </h2>

          <p className="text-sm sm:text-base font-light text-[#c4c7c7] max-w-lg leading-relaxed mb-10">
            I build production-ready full-stack products that ship fast, scale well, and solve real problems. Currently in my 4th year of CS — already shipping AI-powered apps used by real users.
          </p>

          <button
            ref={ctaRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={() => scrollToSection(1)}
            className="relative px-8 py-4 bg-transparent border border-[#ff8c00] text-[#ff8c00] rounded-sm text-xs label-caps hover:bg-[#ff8c00] hover:text-[#131313] transition-colors duration-500 shadow-[0_0_15px_rgba(255,140,0,0.15)] hover:shadow-[0_0_25px_rgba(255,140,0,0.4)] cursor-pointer"
          >
            Explore My Work
          </button>
        </div>

        {/* Right Side: Contained Photo (5 columns on desktop) */}
        <div className="md:col-span-5 hidden md:flex justify-end items-center w-full">
          <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-lg glass-card glow-border overflow-hidden p-2 shadow-2xl group ml-auto">
            {/* Ambient backing glow on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00ced1]/10 to-[#ff8c00]/10 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />

            <div className="relative w-full h-full rounded-md overflow-hidden bg-[#181818]">
              <img
                src={prashantImg}
                alt="Prashant Mishra"
                className="w-full h-full object-cover object-top opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700 ease-out group-hover:scale-103"
                style={{ filter: 'contrast(1.02) brightness(0.9)' }}
              />
              {/* Left edge soft melt effect */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(to_right,#131313_0%,#131313_10%,transparent_55%)]" />

              {/* Gentle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div
        onClick={() => scrollToSection(1)}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group z-10"
      >
        <span className="text-[10px] label-caps text-[#8e9192] group-hover:text-[#00ced1] transition-colors duration-300 mb-2">
          SCROLL DOWN
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#8e9192] to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#00ced1] indicator-glow rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}