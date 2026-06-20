import React from 'react';
import gsap from 'gsap';

export default function Header({ activeSection, scrollToSection }) {

  const handleMouseMove = (e) => {
    const item = e.currentTarget;
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(item, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
  };

  const navItems = [
    { label: 'home',       index: 0 },
    { label: 'projects',   index: 1 },
    { label: 'skills',     index: 2 },
    { label: 'experience', index: 3 },
    { label: 'resume',     index: 4 },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-16 py-5 flex justify-between items-center border-b border-white/[0.06] bg-[#131313]/80 backdrop-blur-sm">

      {/* Logo */}
      <button
        onClick={() => scrollToSection(0)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="flex items-center gap-3 group cursor-pointer"
      >
        {/* Monogram mark */}
        <span 
          className="hidden sm:block font-mono text-[11px] tracking-[0.25em] text-[#8e9192] group-hover:text-[#e4e2e1] transition-colors duration-300"
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontWeight: "900",
            letterSpacing: "1em"
          }}
        >
          PRASHANT MISHRA
        </span>
      </button>

      {/* Nav */}
      <nav className="flex items-center gap-8 md:gap-12">
        {navItems.map((item) => (
          <button
            key={item.index}
            onClick={() => scrollToSection(item.index)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`relative font-mono text-[11px] tracking-[0.15em] uppercase pb-1 transition-colors duration-300 cursor-pointer ${
              activeSection === item.index
                ? 'text-[#e4e2e1]'
                : 'text-[#555858] hover:text-[#8e9192]'
            }`}
          >
            {item.label}

            {/* Active underline */}
            <span
              className={`absolute bottom-0 left-0 h-[1px] bg-[#00ced1] transition-all duration-500 ease-out ${
                activeSection === item.index ? 'w-full opacity-100' : 'w-0 opacity-0'
              }`}
            />
          </button>
        ))}

        {/* Hire me dot-accent */}
        
        <a href="mailto:prashant32064@gmail.com"
          className="hidden md:flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-[#555858] hover:text-[#e4e2e1] transition-colors duration-300 group">
        
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ced1] group-hover:animate-ping" />
          hire me
        </a>
      </nav>
    </header>
  );
}