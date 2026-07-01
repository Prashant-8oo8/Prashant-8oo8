import React, { useState } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

export default function Header({ activeSection, scrollToSection }) {

  const [mobileOpen, setMobileOpen] = useState(false);

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
    { label: 'home', index: 0 },
    { label: 'projects', index: 1 },
    { label: 'skills', index: 2 },
    { label: 'experience', index: 3 },
    { label: 'resume', index: 4 },
  ];

  const handleNavClick = (index) => {
    scrollToSection(index);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-16 py-4 md:py-5 flex justify-between items-center border-b border-zinc-200 bg-[#fdfdfc]/80 backdrop-blur-md">

        {/* Logo */}
        <button
          onClick={() => handleNavClick(0)}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex items-center gap-3 group cursor-pointer"
        >
          {/* Monogram mark */}
          <span
            className="hidden sm:block font-mono text-[13px] tracking-[0.25em] text-zinc-600 group-hover:text-zinc-900 transition-colors duration-300"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontWeight: "900",
              letterSpacing: "0.2em"
            }}
          >
            PRASHANT MISHRA
          </span>
          {/* Short monogram for extra-small screens */}
          <span
            className="block sm:hidden font-mono text-sm tracking-[0.15em] text-zinc-600"
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontWeight: "900",
            }}
          >
            PM
          </span>
        </button>

        {/* Desktop Nav (hidden below md) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">
          {navItems.map((item) => (
            <button
              key={item.index}
              onClick={() => scrollToSection(item.index)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className={`relative font-mono text-[11px] tracking-[0.15em] uppercase pb-1 transition-colors duration-300 cursor-pointer ${activeSection === item.index
                  ? 'text-zinc-900 font-bold'
                  : 'text-zinc-500 hover:text-zinc-800'
                }`}
            >
              {item.label}

              {/* Active underline */}
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#FFD700] transition-all duration-500 ease-out ${activeSection === item.index ? 'w-full opacity-100' : 'w-0 opacity-0'
                  }`}
              />
            </button>
          ))}

          {/* Hire me dot-accent */}
          <a href="mailto:prashant32064@gmail.com"
            className="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-zinc-500 hover:text-zinc-900 transition-colors duration-300 group">
            <span className="w-2 h-2 rounded-full bg-[#FFD700] group-hover:animate-ping" />
            hire me
          </a>
        </nav>

        {/* Mobile Hamburger Toggle (visible below md) */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl border border-zinc-200 bg-zinc-100/80 text-zinc-700 hover:bg-zinc-200 transition-colors duration-200 cursor-pointer"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Menu Overlay (below md) */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide-down panel */}
        <nav
          className={`absolute top-[57px] left-0 w-full bg-[#fdfdfc]/95 backdrop-blur-xl border-b border-zinc-200 shadow-2xl transition-transform duration-500 ease-out ${
            mobileOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
        >
          <div className="flex flex-col px-6 py-6 gap-1">
            {navItems.map((item) => (
              <button
                key={item.index}
                onClick={() => handleNavClick(item.index)}
                className={`w-full text-left py-3 px-4 min-h-[44px] rounded-xl font-mono text-xs tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer ${
                  activeSection === item.index
                    ? 'text-zinc-900 font-bold bg-zinc-100 border-l-[3px] border-[#FFD700]'
                    : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Hire me link */}
            <a
              href="mailto:prashant32064@gmail.com"
              className="flex items-center gap-3 py-3 px-4 min-h-[44px] rounded-xl font-mono text-xs tracking-[0.15em] uppercase text-zinc-500 hover:text-zinc-900 hover:bg-zinc-50 transition-all duration-300 mt-2 border-t border-zinc-100 pt-4"
            >
              <span className="w-2 h-2 rounded-full bg-[#FFD700] shrink-0" />
              hire me
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}