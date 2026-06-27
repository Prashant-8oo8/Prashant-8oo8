import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Resume from './components/Resume';
import Scene from './components/Scene';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const containerRef = useRef(null);
  const scrollProgress = useRef({ value: 0 });
  const glowTealRef = useRef(null);
  const glowOrangeRef = useRef(null);
  const [activeSection, setActiveSection] = useState(0);

  // Background color changes smoothly based on active section
  const getBgColor = () => {
    return '#fdfdfc';
  };

  // Scroll to a specific section programmatically
  const scrollToSection = (index) => {
    const container = containerRef.current;
    if (!container) return;

    const sections = container.querySelectorAll('.scroll-section');
    if (sections[index]) {
      container.scrollTo({
        top: sections[index].offsetTop,
        behavior: 'smooth'
      });
      setActiveSection(index);
    }
  };

  // Monitor scroll height to set active section link highlight
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;

    // Determine section index based on scroll offset
    const sections = container.querySelectorAll('.scroll-section');
    let currentIndex = activeSection;

    sections.forEach((section, index) => {
      // If the section top is near the scroll top (with some offset for the navbar)
      if (section.offsetTop <= scrollTop + 150) {
        currentIndex = index;
      }
    });

    if (currentIndex !== activeSection) {
      setActiveSection(currentIndex);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Hook up GSAP ScrollTrigger to update our scrollProgress ref
    const trigger = ScrollTrigger.create({
      trigger: container,
      scroller: container,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        // self.progress is a float between 0 and 1
        scrollProgress.current.value = self.progress;
      }
    });

    // 2. Viewport entrance animation for typography/cards (fade-in-up)
    const sections = container.querySelectorAll('.scroll-section');
    sections.forEach((section) => {
      const animatedElements = section.querySelectorAll('h1, h2, p, button, .glass-card, div.border-t');

      // Set initial states
      gsap.set(animatedElements, {
        y: 40,
        opacity: 0
      });

      ScrollTrigger.create({
        trigger: section,
        scroller: container,
        start: "top 75%",
        end: "bottom 25%",
        onEnter: () => {
          gsap.to(animatedElements, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
            stagger: 0.12,
            overwrite: "auto"
          });
        },
        onLeaveBack: () => {
          gsap.to(animatedElements, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power4.out",
            overwrite: "auto"
          });
        }
      });
    });

    // 3. Cinematic Glows - Inertia Mouse Follower Effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;

      // Shift glow centers relative to window center
      const offsetX = clientX - window.innerWidth / 2;
      const offsetY = clientY - window.innerHeight / 2;

      gsap.to(glowTealRef.current, {
        x: offsetX,
        y: offsetY,
        duration: 1.6,
        ease: "power2.out"
      });

      gsap.to(glowOrangeRef.current, {
        x: -offsetX * 0.4,
        y: -offsetY * 0.4,
        duration: 2.2,
        ease: "power2.out"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      trigger.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      className="w-full h-full relative transition-colors duration-1000 ease-out overflow-hidden"
      style={{ backgroundColor: getBgColor() }}
    >
      {/* Cinematic Lighting Layers (Floating Glow Blooms) */}
      <div
        ref={glowTealRef}
        className="ambient-glow glow-teal top-[-10%] left-[-10%]"
      />
      <div
        ref={glowOrangeRef}
        className="ambient-glow glow-orange bottom-[-10%] right-[-10%]"
      />

      {/* Floating 3D Canvas Scene - Placed in background, reused across page */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <Scene scrollProgress={scrollProgress} />
      </div>

      {/* Floating Glass Header */}
      <Header activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* Main Snap Scrolling Container */}
      <main
        ref={containerRef}
        onScroll={handleScroll}
        className="scroll-container w-full h-full"
      >
        <Hero scrollToSection={scrollToSection} />
        <Projects />
        <Skills />
        <Resume />
        <Experience />
      </main>
    </div>
  );
}
