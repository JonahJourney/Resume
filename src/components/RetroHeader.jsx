import React, { useRef } from 'react';
import { Mail, ArrowUpRight, FileText } from 'lucide-react';
import { useToast } from './Toast';
import { useResumeData } from '../context/ResumeDataContext';

export default function RetroHeader({ scrollProgress }) {
  const { addToast } = useToast();
  const { isEditMode, setIsEditMode } = useResumeData();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('jonah.otoole@icloud.com');
    addToast('Stamped to clipboard: jonah.otoole@icloud.com');
  };

  // Secret triple-click on the FOLIO badge triggers Editor
  const handleFolioTripleClick = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      // Trigger Cmd+Shift+E event
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'e', metaKey: true, shiftKey: true }));
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 500);
    }
  };

  return (
    <div className="w-full border-b border-[#24221E]/15 bg-[#F8F6F0] text-[#24221E] py-3 px-4 sm:px-8 no-print select-none">
      {/* Micro scroll progress line */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-[#24221E]/10 z-50">
        <div
          className="h-full bg-[#24221E] transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Document reference stamp with secret triple-click */}
        <div
          onClick={handleFolioTripleClick}
          className="flex items-center gap-3 text-[#68645C] cursor-default"
          title="Curriculum Vitae"
        >
          <span className="font-bold text-[#24221E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#2A7B4C] inline-block" />
            FOLIO / JO—2026
          </span>
          <span className="hidden md:inline">•</span>
          <span className="hidden md:inline">APPLIED CS @ UCLL</span>
          <span className="hidden lg:inline">•</span>
          <span className="hidden lg:inline">LEUVEN, BE / CANADA</span>
        </div>

        {/* Right: Tactile Quick Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#FDFCF7] border border-[#24221E] shadow-retro-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all active:translate-x-[2px] active:translate-y-[2px]"
          >
            <Mail className="w-3 h-3 text-[#B93826]" />
            <span className="font-semibold text-[11px]">jonah.otoole@icloud.com</span>
          </button>

          <a
            href="./Jonah-OToole-Resume.pdf"
            download="Jonah-OToole-Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1 bg-[#FDFCF7] border border-[#24221E] shadow-retro-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all active:translate-x-[2px] active:translate-y-[2px]"
            title="Download Official Resume PDF"
          >
            <FileText className="w-3 h-3 text-[#1E4E79]" />
            <span className="font-semibold text-[11px]">DOWNLOAD RESUME [PDF]</span>
          </a>

          <a
            href="#contact"
            className="flex items-center gap-1 px-3 py-1 bg-[#24221E] text-[#F8F6F0] font-semibold text-[11px] hover:bg-[#B93826] transition-colors"
          >
            <span>CONNECT</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
