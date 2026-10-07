import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, ArrowUp, ArrowUpRight, Check, FileText, Send, Sparkles } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useToast } from './Toast';

export default function RetroContact() {
  const { personal } = resumeData;
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    addToast(`Copied email to clipboard: ${personal.email}`);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(personal.phone);
    addToast(`Copied phone to clipboard: ${personal.phone}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-20 sm:py-24 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 pb-3 border-b border-[#24221E]/15">
        <div className="text-xs font-mono font-bold tracking-widest text-[#B93826] uppercase">
          [ 07 / CORRESPONDENCE & CONTACT ]
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#141311] tracking-tight mt-1">
          Get in Touch
        </h2>
        <p className="text-sm font-sans text-[#68645C] mt-1 max-w-xl">
          Based in Leuven, Belgium. Open to software engineering internships, working student positions, and technology collaborations.
        </p>
      </div>

      {/* Clean Minimal Contact Card */}
      <div className="retro-paper p-6 sm:p-10 rounded-xs space-y-8 relative">
        <div className="washi-tape washi-tape-amber -top-2.5 right-10 rotate-1 hidden sm:block" />

        {/* Big Email Hero Box */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#24221E]/12">
          <div className="space-y-1">
            <div className="text-xs font-mono uppercase font-bold text-[#68645C]">
              DIRECT EMAIL ADDRESS
            </div>
            <a
              href={`mailto:${personal.email}`}
              className="text-2xl sm:text-3xl font-serif font-bold text-[#141311] hover:text-[#B93826] transition-colors inline-block"
            >
              {personal.email}
            </a>
            <div className="text-xs font-mono text-[#68645C]">
              Replies typically within 24 hours.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 font-mono text-xs">
            <a
              href={`mailto:${personal.email}?subject=Hello%20Jonah%20%E2%80%94%20Software%20Engineering%20Inquiry`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#24221E] text-[#F8F6F0] font-bold hover:bg-[#B93826] transition-all rounded-xs shadow-xs hover:shadow-sm flex-1 sm:flex-initial active:translate-y-[1px]"
            >
              <Mail className="w-4 h-4 text-[#F8F6F0]" />
              <span>SEND EMAIL</span>
            </a>

            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/70 border border-[#24221E]/20 text-[#24221E] font-bold hover:bg-[#EFECE2] hover:border-[#24221E]/40 transition-all rounded-xs shadow-xs flex-1 sm:flex-initial active:translate-y-[1px]"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#2A7B4C]" />
                  <span className="text-[#2A7B4C]">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#68645C]" />
                  <span>COPY</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Secondary Details Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          {/* Phone */}
          <div
            onClick={handleCopyPhone}
            className="p-4 bg-white/60 border border-[#24221E]/15 hover:border-[#24221E]/35 hover:bg-[#EFECE2] cursor-pointer transition-all rounded-xs group"
          >
            <div className="flex items-center justify-between text-[#68645C] text-[10px] font-bold uppercase mb-1">
              <span>PHONE / WHATSAPP</span>
              <Copy className="w-3.5 h-3.5 group-hover:text-[#24221E]" />
            </div>
            <div className="font-bold text-sm text-[#141311]">
              {personal.phone}
            </div>
            <div className="text-[10px] text-[#68645C] mt-0.5">Click to copy number</div>
          </div>

          {/* Location */}
          <div className="p-4 bg-white/60 border border-[#24221E]/15 rounded-xs">
            <div className="text-[#68645C] text-[10px] font-bold uppercase mb-1">
              LOCATION & CAMPUS
            </div>
            <div className="font-bold text-sm text-[#141311]">
              Leuven, Belgium
            </div>
            <div className="text-[10px] text-[#68645C] mt-0.5">UCLL Applied Computer Science</div>
          </div>

          {/* Status & Work Eligibility */}
          <div className="p-4 bg-white/60 border border-[#24221E]/15 rounded-xs">
            <div className="text-[#68645C] text-[10px] font-bold uppercase mb-1">
              STATUS & CITIZENSHIP
            </div>
            <div className="font-bold text-sm text-[#141311]">
              🇨🇦 Canadian Citizen
            </div>
            <div className="text-[10px] text-[#2A7B4C] font-semibold mt-0.5">Active EU Student Status</div>
          </div>
        </div>

        {/* Quick Document Download Bar */}
        <div className="pt-4 border-t border-[#24221E]/12 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-[#68645C]">
            <FileText className="w-4 h-4 text-[#1E4E79]" />
            <span>Need an offline copy of my curriculum vitae?</span>
          </div>

          <a
            href="./Jonah-OToole-Resume.pdf"
            download="Jonah-OToole-Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/80 border border-[#24221E]/20 text-[#24221E] font-bold hover:bg-[#24221E] hover:text-[#F8F6F0] transition-all rounded-xs shadow-xs"
          >
            <span>DOWNLOAD RESUME (PDF)</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Colophon Footer */}
      <footer className="mt-16 pt-6 border-t border-[#24221E]/15 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[#68645C]">
        <div>
          © {new Date().getFullYear()} Jonah O'Toole • Typed in Leuven, Belgium.
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 font-bold text-[#24221E] hover:underline"
        >
          <span>TOP OF RECORD</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </footer>
    </section>
  );
}

