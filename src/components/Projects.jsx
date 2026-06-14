import React, { useRef } from 'react';
import gsap from 'gsap';
import { ExternalLink, ShoppingBag, BrainCircuit, Coffee } from 'lucide-react';

export default function Projects() {
  const cardsRef = useRef([]);

  // Magnetic and glow effect on card elements
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set CSS variable for radial glow follow
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Subtle tilt/magnetic pull
    const tiltX = (y - rect.height / 2) / 15;
    const tiltY = -(x - rect.width / 2) / 15;

    gsap.to(card, {
      transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      transform: `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const projects = [
    {
      title: 'Haze & Co.',
      description: 'Building a seamless, high-conversion shopping experience for modern brands. Completely solo-developed end-to-end with secure Stripe payment integration, real-time Firebase inventory management, and an admin dashboard.',
      icon: <ShoppingBag className="w-6 h-6 text-[#00ced1]" />,
      tech: ['React', 'Stripe', 'Firebase', 'Tailwind'],
      glowColor: 'rgba(0, 206, 209, 0.15)',
      linkText: 'comming soon....',
      url: '#'
    },
    {
      title: 'AI Resume Analyzer',
      description: 'Automating the ATS filtering process using intelligent text extraction. Integrates powerful AI models to instantly parse, score, and provide actionable feedback on uploaded resumes.',
      icon: <BrainCircuit className="w-6 h-6 text-[#ff8c00]" />,
      tech: ['React', 'AI Models', 'Node.js', 'Tailwind'],
      glowColor: 'rgba(255, 140, 0, 0.15)',
      linkText: 'View Project',
      url: 'https://resume-analyzer-three-zeta.vercel.app/'
    },
    {
      title: 'Blogging Application',
      description: 'A robust content management system for writers and creators. Features a rich text editor, secure authentication, and a heavily optimized database schema for fast read operations.',
      icon: <Coffee className="w-6 h-6 text-[#c8c6c5]" />,
      tech: ['React', 'Appwrite', 'Tailwind', 'Authentication'],
      glowColor: 'rgba(200, 198, 197, 0.15)',
      linkText: 'View Project ',
      url: 'https://crazy-coffee.vercel.app/'
    },
    {
      title: 'Currency Converter App',
      description: 'Real-time financial utility providing instant exchange rates. Pulls View Project data from external APIs with zero-latency caching, wrapped in a highly responsive and minimal UI.',
      icon: <ExternalLink className="w-6 h-6 text-[#00ced1]" />,
      tech: ['React', 'External API', 'Tailwind', 'Caching'],
      glowColor: 'rgba(0, 206, 209, 0.15)',
      linkText: 'View Project',
      url: 'https://currency-conveter-nu.vercel.app'
    }
  ];

  return (
    <section 
      id="projects-section" 
      className="scroll-section w-full min-h-screen px-6 md:px-16 pt-28 md:pt-32 pb-16 flex flex-col justify-center items-start bg-[#1c1c1c] relative"
    >
      {/* Cinematic Gradient Backdrop */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_80%_60%,rgba(255,140,0,0.04)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="w-full max-w-6xl mx-auto z-10">
        {/* Section Heading */}
        <div className="mb-10 md:mb-14 select-none">
          <p className="label-caps text-[#ff8c00] mb-3 flex items-center gap-2">
            <span className="h-[2px] w-8 bg-[#ff8c00]" />
            SELECTED ARTIFACTS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight text-[#e4e2e1]">
            Featured Projects
          </h2>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
          {projects.map((project, idx) => (
            <div
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              className="relative p-8 rounded-lg glass-card flex flex-col justify-between h-auto overflow-hidden group cursor-pointer"
              style={{
                '--mouse-x': '50%',
                '--mouse-y': '50%',
              }}
            >
              {/* Dynamic Mouse Glow Aura Overlay */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle 180px at var(--mouse-x) var(--mouse-y), ${project.glowColor}, transparent 80%)`
                }}
              />

              {/* Card Top Information */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="p-3 bg-[#131313] border border-white/5 rounded-sm transition-transform duration-500 group-hover:scale-110">
                    {project.icon}
                  </div>
                  <span className="text-[10px] label-caps text-[#8e9192]">0{idx + 1} / 04</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-[#e4e2e1] mb-3 group-hover:text-[#00ced1] transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-sm sm:text-base font-light text-[#c4c7c7] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Card Bottom Details */}
              <div className="mt-6">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-0.5 bg-[#131313] text-[#8e9192] text-[10px] font-mono border border-white/5 rounded-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a href={project.url} target="_blank" rel="noreferrer" className="flex items-center text-xs font-mono text-[#ff8c00] group-hover:underline">
                  <span className="mr-2">{project.linkText}</span>
                  <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
