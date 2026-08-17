import React, { useState, useEffect } from 'react';
import { ExternalLink, ArrowUpRight, Sparkles, Eye, X, Printer, Download, FileText, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import confetti from 'canvas-confetti';

export default function RetroAwards() {
  const { awards, certifications } = resumeData;
  const [selectedCert, setSelectedCert] = useState(null);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#B8860B', '#B93826', '#1E4E79', '#24221E'],
    });
  };

  return (
    <section id="awards" className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b-2 border-[#24221E] gap-4">
        <div>
          <div className="text-xs font-mono font-bold tracking-widest text-[#B8860B] uppercase">
            [ 06 / CITATIONS, HONOURS & CREDENTIALS ]
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#141311] tracking-tight mt-1">
            Awards & Official Certifications
          </h2>
        </div>

        <button
          onClick={triggerConfetti}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FDFCF7] border border-[#24221E] shadow-retro-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all font-mono text-xs font-bold no-print active:translate-x-[2px] active:translate-y-[2px]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>STAMP CELEBRATION</span>
        </button>
      </div>

      {/* Duke of Edinburgh Showcase */}
      <div className="retro-paper p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-[#24221E]/15">
          <div>
            <span className="rubber-stamp rubber-stamp-amber text-[10px] mb-2">
              TRIPLE CROWN RECIPIENT
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#141311] mt-1">
              The Duke of Edinburgh's International Award
            </h3>
          </div>

          <a
            href="https://www.dofe.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#1E4E79] hover:underline"
          >
            <span>dofe.org</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <p className="text-xs sm:text-sm text-[#38352F] leading-relaxed font-sans mt-3 mb-6 max-w-3xl">
          A global youth achievement program for ages 14–24 that builds confidence and resilience through self-designed challenges in volunteering, physical fitness, skills, and autonomous alpine expeditions. Completed Bronze, Silver, and Gold.
        </p>

        {/* 3 Award Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono">
          {awards.map((award) => (
            <div
              key={award.id}
              className="p-4 bg-[#F8F6F0] border border-[#24221E] hover:bg-[#EFECE2] transition-colors"
            >
              <div className="flex items-center justify-between text-xs pb-1 border-b border-[#24221E]/15">
                <span className="font-bold text-[#B8860B]">{award.level}</span>
                <span className="text-[#68645C] text-[11px]">{award.date}</span>
              </div>
              <div className="font-serif font-bold text-xl text-[#141311] mt-2">
                {award.title}
              </div>
              <p className="text-xs font-sans text-[#4A463E] mt-1 leading-relaxed">
                {award.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="retro-paper p-6 retro-paper-hover flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-[#24221E]/15 font-mono text-xs">
                <span className="text-[#68645C]">{cert.date}</span>
                <span className="font-bold text-[#1E4E79]">{cert.badge}</span>
              </div>

              <div className="mt-3 mb-2">
                <h3 className="text-2xl font-serif text-[#141311]">
                  {cert.title}
                </h3>
                <div className="text-xs font-mono text-[#68645C] mt-0.5">
                  ISSUER: {cert.issuer} {cert.credentialId && `(ID: ${cert.credentialId})`}
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#38352F] leading-relaxed font-sans mt-2">
                {cert.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#24221E]/15 font-mono text-xs flex flex-wrap items-center justify-between gap-2">
              {cert.id === 'first-aid' ? (
                <button
                  onClick={() => setSelectedCert('first-aid')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#24221E] text-[#F8F6F0] hover:bg-[#B93826] font-bold text-xs transition-colors shadow-retro-sm active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <Eye className="w-3.5 h-3.5 text-[#F8F6F0]" />
                  <span>VIEW ORIGINAL CERTIFICATE</span>
                </button>
              ) : (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-bold text-[#B93826] hover:underline"
                >
                  <span>VERIFY CREDENTIAL ONLINE</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              <span className="text-[#68645C] text-[11px]">
                {cert.id === 'first-aid' ? 'AIR GLACIERS SION (CH)' : 'TEACHER RECORD'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ORIGINAL CERTIFICATE DOCUMENT VIEWER MODAL */}
      {selectedCert === 'first-aid' && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#141311]/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-[#FDFCF7] border-4 border-[#24221E] shadow-2xl p-4 sm:p-6 text-[#141311] rounded-xs animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#24221E] font-mono text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#B93826]" />
                <span className="font-bold text-[#141311]">
                  AIR-GLACIERS TRAINING CERTIFICATE — JONAH O'TOOLE
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="./first-aid-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-[#F8F6F0] border border-[#24221E] hover:bg-[#EFECE2] text-xs font-bold"
                  title="Open Original PDF in New Tab"
                >
                  <ExternalLink className="w-3 h-3 text-[#1E4E79]" />
                  <span>OPEN PDF</span>
                </a>

                <a
                  href="./first-aid-certificate.pdf"
                  download="Jonah-OToole-First-Aid-Certificate.pdf"
                  className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 bg-[#F8F6F0] border border-[#24221E] hover:bg-[#EFECE2] text-xs font-bold"
                  title="Download Certificate PDF"
                >
                  <Download className="w-3 h-3 text-[#2A7B4C]" />
                  <span>DOWNLOAD</span>
                </a>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-1 bg-[#F8F6F0] border-2 border-[#24221E] hover:bg-[#24221E] hover:text-[#F8F6F0] transition-colors"
                  title="Close Certificate Viewer (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Image Container */}
            <div className="flex-1 overflow-y-auto my-3 bg-[#EFECE2] p-2 sm:p-4 border border-[#24221E]/30 flex items-center justify-center rounded-xs shadow-inner">
              <img
                src="./first-aid-certificate.png"
                alt="Air-Glaciers Training Certificate for Jonah O'Toole"
                className="max-w-full max-h-[68vh] object-contain shadow-md border border-[#24221E]/20 bg-white"
              />
            </div>

            {/* Modal Footer Controls */}
            <div className="pt-3 border-t border-[#24221E]/20 flex flex-wrap items-center justify-between gap-2 font-mono text-xs no-print">
              <div className="text-[11px] text-[#68645C] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#2A7B4C]" />
                <span>Verified Air-Glaciers SA • Valid until 24/06/2028</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="./first-aid-certificate.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden inline-flex items-center gap-1 px-3 py-1 bg-[#F8F6F0] border border-[#24221E] font-bold text-xs"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>OPEN PDF</span>
                </a>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="px-4 py-1.5 bg-[#24221E] text-[#F8F6F0] font-bold text-xs hover:bg-[#B93826] transition-colors"
                >
                  CLOSE [ESC]
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
