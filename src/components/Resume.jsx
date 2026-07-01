import React, { useRef } from 'react';
import gsap from 'gsap';
import { Download, ExternalLink, FileText } from 'lucide-react';
import resumePdf from '../assets/resume.pdf';

export default function Resume() {
  const downloadBtnRef = useRef(null);
  const viewBtnRef = useRef(null);

  // Magnetic button animation matching Experience.jsx
  const handleMouseMove = (e, ref) => {
    const btn = ref.current;
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

  const handleMouseLeave = (ref) => {
    const btn = ref.current;
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
      id="resume-section" 
      className="scroll-section w-full min-h-screen px-4 sm:px-6 md:px-16 py-16 sm:py-24 md:py-32 flex flex-col justify-center items-start bg-[#fdfdfc] relative selection:bg-[#FFD700] selection:text-black"
    >
      {/* Background Lighting Vignette Accent */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_50%,rgba(255,215,0,0.06)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="w-full max-w-6xl mx-auto z-10 flex flex-col gap-8 sm:gap-12 md:gap-16 h-auto">
        {/* Top Header */}
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-400 mb-3 flex items-center gap-2">
            <span className="h-[2px] w-8 bg-zinc-300" />
            DOCUMENT // ARTIFACT
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter uppercase text-zinc-900 mb-4">
            Curriculum Vitae
          </h2>
          <p className="text-xs font-mono text-zinc-400">
            // Last updated: June 2026
          </p>
        </div>

        {/* Content Layout */}
        <div className="w-full flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
          
          {/* PDF Viewer Card */}
          <div className="w-full lg:w-2/3 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-zinc-100 border border-zinc-200 flex flex-col gap-4 relative group overflow-hidden shadow-xl">
            <div className="w-full aspect-[1/1.4] sm:aspect-[1/1.3] md:aspect-auto md:h-[600px] rounded-xl sm:rounded-2xl bg-zinc-200 border border-zinc-300 relative overflow-hidden flex items-center justify-center">
              {/* Fallback Message (hidden naturally when iframe renders over it) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-6 text-zinc-500 z-0">
                <FileText className="w-10 h-10 text-zinc-400" />
                <p className="text-sm font-light">
                  Cannot render PDF directly in this browser.
                </p>
              </div>
              
              {/* iframe PDF Viewer */}
              <iframe 
                src={resumePdf} 
                title="Resume"
                className="w-full h-full relative z-10 border-0"
              />
            </div>
          </div>

          {/* Action Buttons Column */}
          <div className="w-full lg:w-1/3 flex flex-col gap-6 sm:gap-8 pt-2 sm:pt-4">
            <div className="mb-4 select-none">
              <h4 className="text-lg sm:text-xl font-black tracking-tighter uppercase text-zinc-900 mb-4">Download or View</h4>
              <p className="text-sm sm:text-base font-medium text-zinc-600 leading-relaxed mb-6">
                Grab a copy of my resume for your records, or open it in a full-screen view for a better reading experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 sm:gap-5 w-full">
              {/* Download Button */}
              <a 
                href={resumePdf} 
                download="Prashant_Mishra_Resume.pdf"
                ref={downloadBtnRef}
                onMouseMove={(e) => handleMouseMove(e, downloadBtnRef)}
                onMouseLeave={() => handleMouseLeave(downloadBtnRef)}
                className="inline-flex justify-center items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 min-h-[44px] bg-zinc-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#FFD700] hover:text-black transition-colors duration-500 shadow-xl cursor-pointer w-full"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>

              {/* View Fullscreen Button */}
              <a 
                href={resumePdf} 
                target="_blank"
                rel="noreferrer"
                ref={viewBtnRef}
                onMouseMove={(e) => handleMouseMove(e, viewBtnRef)}
                onMouseLeave={() => handleMouseLeave(viewBtnRef)}
                className="inline-flex justify-center items-center gap-3 px-6 py-3 sm:px-8 sm:py-4 min-h-[44px] bg-transparent border-[2px] border-zinc-900 text-zinc-900 rounded-full text-xs font-bold uppercase tracking-[0.15em] hover:bg-[#FFD700] hover:text-black hover:border-transparent transition-all duration-500 shadow-xl cursor-pointer w-full"
              >
                <ExternalLink className="w-4 h-4" />
                View Fullscreen
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
