import React, { useRef } from 'react';
import gsap from 'gsap';
import { Mail, Sparkles, Trophy } from 'lucide-react';

const Github = (props) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Experience() {
  const mailButtonRef = useRef();

  // Magnetic button animation
  const handleMouseMove = (e) => {
    const btn = mailButtonRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(btn, {
      x: x * 0.35,
      y: y * 0.35,
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    const btn = mailButtonRef.current;
    if (!btn) return;
    gsap.to(btn, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <section 
      id="experience-section" 
      className="scroll-section w-full min-h-screen px-6 md:px-16 py-24 md:py-32 flex flex-col justify-center items-start bg-[#fdfdfc] relative selection:bg-[#FFD700] selection:text-black"
    >
      {/* Background Lighting Vignette Accent */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_80%,rgba(255,215,0,0.06)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="w-full max-w-6xl mx-auto z-10 flex flex-col gap-12 md:gap-16 h-auto">
        {/* Top Header */}
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3 flex items-center gap-2">
            <span className="h-[2px] w-8 bg-zinc-300" />
            LEADERSHIP &amp; IMPACT
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-zinc-900 mb-10 md:mb-14">
            Experience &amp; Leadership
          </h2>
        </div>

        {/* Core Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start">
          
          {/* Left Column - Experience Cards */}
          <div className="space-y-6">
            {/* Card 1: GDG on Campus */}
            <div className="p-6 md:p-8 rounded-3xl bg-zinc-100 border border-zinc-200 flex flex-col sm:flex-row gap-4 hover:border-[#FFD700]/50 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-zinc-200 border border-zinc-300 rounded-2xl h-fit">
                <Sparkles className="w-5 h-5 text-zinc-900" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 tracking-widest block mb-1">
                  CURRENT ROLE // LEADERSHIP
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tighter uppercase text-zinc-900 mb-1">
                  Technical Head
                </h3>
                <p className="text-xs font-mono text-zinc-500 mb-2">
                  Google Developer Groups (GDG) on Campus
                </p>
                <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
                  Focusing on mentoring junior developers, planning community curriculum, and orchestrating large-scale technical hackathons and code-alongs.
                </p>
              </div>
            </div>

            {/* Card 2: Enigma Roadies */}
            <div className="p-6 md:p-8 rounded-3xl bg-zinc-100 border border-zinc-200 flex flex-col sm:flex-row gap-4 hover:border-[#FFD700]/50 hover:shadow-lg transition-all duration-300">
              <div className="p-3 bg-zinc-200 border border-zinc-300 rounded-2xl h-fit">
                <Trophy className="w-5 h-5 text-zinc-900" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-zinc-500 tracking-widest block mb-1">
                  EVENT LEADERSHIP // ENIGMA
                </span>
                <h3 className="text-base sm:text-lg font-black tracking-tighter uppercase text-zinc-900 mb-1">
                  Event Head — &quot;Roadies&quot;
                </h3>
                <p className="text-xs font-mono text-zinc-500 mb-2">
                  ENIGMA College Fest
                </p>
                <p className="text-xs sm:text-sm font-medium text-zinc-600 leading-relaxed">
                  Led event design, logistical planning, and team recruitment for the signature obstacle-based performance event, coordinating over 100+ active participants.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Brief Call to Action / Info */}
          <div className="flex flex-col h-full py-2">
            <div className="select-none">
              <h4 className="text-lg sm:text-xl font-black tracking-tighter uppercase text-zinc-900 mb-4">Let&apos;s build the future together.</h4>
              <p className="text-sm sm:text-base font-medium text-zinc-600 leading-relaxed mb-8">
                I am always open to discussing technical sponsorships, mentoring opportunities, Full-Stack contracts, or high-performance WebGL integrations.
              </p>
              
              {/* Mail Button with Magnetic Glow */}
              <a 
                href="mailto:prashant32064@gmail.com" 
                ref={mailButtonRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#FFD700] hover:text-black transition-colors duration-500 shadow-xl cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                Get In Touch
              </a>
            </div>
            
            {/* Social Icons footer */}
            <div className="flex gap-6 mt-auto pt-16">
              <a href="https://github.com/Prashant-8oo8" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-black transition-colors duration-300">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/prashant-mishra-617221261/" target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-black transition-colors duration-300">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
