import React from 'react';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiRedux, 
  SiFirebase, 
  SiAppwrite, 
  SiStripe, 
  SiGreensock, 
  SiThreedotjs, 
  SiVite, 
  SiGit, 
  SiGithub, 
  SiPostman, 
  SiVercel, 
  SiNodedotjs 
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';

const row1 = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'Stripe', icon: SiStripe, color: '#008CDD' },
  { name: 'Three.js', icon: SiThreedotjs, color: '#ffffff' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
  { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
];

const row2 = [
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'Redux', icon: SiRedux, color: '#764ABC' },
  { name: 'Appwrite', icon: SiAppwrite, color: '#FD366E' },
  { name: 'GSAP', icon: SiGreensock, color: '#88CE02' },
  { name: 'Vite', icon: SiVite, color: '#646CFF' },
  { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
  { name: 'AWS', icon: FaAws, color: '#ffffff' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
];

export default function Skills() {
  const MarqueeRow = ({ items, reverse }) => {
    return (
      <div 
        className="flex w-max gap-4 md:gap-6 pr-4 md:pr-6 hover-pause"
        style={{
          animation: `marquee-${reverse ? 'right' : 'left'} ${reverse ? '20s' : '30s'} linear infinite`
        }}
      >
        {[...items, ...items].map((item, i) => (
          <div 
            key={i} 
            className="flex flex-col items-center justify-center w-16 h-16 md:w-20 md:h-20 shrink-0 bg-[#181818] border border-white/10 rounded-xl transition-all duration-300 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 cursor-pointer"
          >
            <item.icon className="text-2xl md:text-3xl mb-1 md:mb-2" style={{ color: item.color }} />
            <span className="text-[10px] font-mono text-[#8e9192]">{item.name}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section 
      id="skills-section" 
      className="scroll-section w-full min-h-screen px-6 md:px-16 py-20 md:py-28 flex flex-col justify-center items-center bg-gradient-to-b from-[#131313] to-[#0e0e0e] overflow-hidden"
    >
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .hover-pause:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="w-full max-w-6xl mx-auto mb-12 md:mb-16">
        <p className="label-caps text-[#00ced1] mb-3 flex items-center gap-2">
          <span className="h-[2px] w-8 bg-[#00ced1]" />
          SKILLS & TECH STACK
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight text-[#e4e2e1]">
          Technologies I Work With
        </h2>
      </div>

      <div 
        className="w-[100vw] flex flex-col gap-6 md:gap-8 relative left-1/2 -translate-x-1/2"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
        }}
      >
        <MarqueeRow items={row1} reverse={false} />
        <MarqueeRow items={row2} reverse={true} />
      </div>
    </section>
  );
}
