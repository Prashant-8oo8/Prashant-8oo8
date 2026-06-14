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
      className="scroll-section w-full min-h-screen px-6 md:px-16 pt-28 md:pt-32 pb-24 md:pb-40 flex flex-col justify-center items-start bg-gradient-to-b from-[#0e0e0e] to-[#131313] relative"
    >
      {/* Background Lighting Vignette Accent */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_50%,rgba(0,206,209,0.05)_0%,rgba(0,0,0,0)_60%)]" />

      <div className="w-full max-w-6xl mx-auto z-10 flex flex-col gap-12 md:gap-16 h-auto">
        {/* Top Header */}
        <div>
          <p className="label-caps text-[#00ced1] mb-3 flex items-center gap-2">
            <span className="h-[2px] w-8 bg-[#00ced1]" />
            DOCUMENT // ARTIFACT
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-sans tracking-tight text-[#e4e2e1] mb-4">
            Curriculum Vitae
          </h2>
          <p className="text-xs font-mono text-[#8e9192]">
            // Last updated: June 2026
          </p>
        </div>

        {/* Content Layout */}
        <div className="w-full flex flex-col lg:flex-row gap-8 items-start">
          
          {/* PDF Viewer Glass Card */}
          <div className="w-full lg:w-2/3 p-4 md:p-6 rounded-lg glass-card flex flex-col gap-4 relative group overflow-hidden">
            <div className="w-full aspect-[1/1.4] sm:aspect-auto sm:h-[600px] rounded bg-[#131313] border border-white/5 relative overflow-hidden flex items-center justify-center">
              {/* Fallback Message (hidden naturally when iframe renders over it) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-6 text-[#8e9192] z-0">
                <FileText className="w-10 h-10 text-[#444748]" />
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
          <div className="w-full lg:w-1/3 flex flex-col gap-8 pt-4">
            <div className="mb-4 select-none">
              <h4 className="text-lg sm:text-xl font-bold text-[#e4e2e1] mb-4">Download or View</h4>
              <p className="text-sm sm:text-base font-light text-[#c4c7c7] leading-relaxed mb-6">
                Grab a copy of my resume for your records, or open it in a full-screen view for a better reading experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-5 w-full">
              {/* Download Button */}
              <a 
                href={resumePdf} 
                download="Prashant_Mishra_Resume.pdf"
                ref={downloadBtnRef}
                onMouseMove={(e) => handleMouseMove(e, downloadBtnRef)}
                onMouseLeave={() => handleMouseLeave(downloadBtnRef)}
                className="inline-flex justify-center items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#1c1c1c] to-[#2d2d2d] border border-white/10 text-[#e4e2e1] hover:border-[#00ced1]/50 hover:text-[#00ced1] rounded-sm text-xs label-caps transition-all duration-500 shadow-md cursor-pointer w-full"
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
                className="inline-flex justify-center items-center gap-3 px-6 py-4 bg-transparent border border-white/10 text-[#e4e2e1] hover:border-[#ff8c00]/50 hover:text-[#ff8c00] rounded-sm text-xs label-caps transition-all duration-500 shadow-md cursor-pointer w-full"
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
