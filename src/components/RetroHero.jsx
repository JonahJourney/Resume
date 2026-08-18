import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, ExternalLink, Copy, Compass, Mountain, Bike, Waves, Snowflake, Sparkles } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useToast } from './Toast';
import confetti from 'canvas-confetti';

export default function RetroHero({ smoothVelocity }) {
  const { personal, stats } = resumeData;
  const { addToast } = useToast();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    addToast(`Copied ${label}: ${text}`);
  };

  const triggerStampConfetti = () => {
    confetti({
      particleCount: 55,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#B93826', '#1E4E79', '#B8860B', '#2A7B4C', '#24221E'],
    });
  };

  // Dynamic stamp rotation driven by scroll position (reverses smoothly on scroll up!)
  const stampAngle = (scrollY * 0.08) % 360;

  return (
    <section id="hero" className="pt-12 sm:pt-16 pb-14 px-4 sm:px-8 max-w-5xl mx-auto">
      <div className="space-y-10">
        {/* Rubber Stamps with scroll-driven micro-rotation */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            className="rubber-stamp rubber-stamp-green text-[11px] cursor-default"
            style={{ transform: `rotate(${-2 + Math.sin(scrollY * 0.01) * 3}deg)` }}
          >
            <span>● APPLIED CS @ UCLL LEUVEN</span>
          </div>

          <div
            onClick={triggerStampConfetti}
            className="rubber-stamp rubber-stamp-amber text-[11px] cursor-pointer hover:scale-105 active:scale-95"
            style={{ transform: `rotate(${3 - Math.sin(scrollY * 0.01) * 4}deg)` }}
            title="Click to celebrate Gold Award"
          >
            <span>★ DUKE OF EDINBURGH GOLD AWARDEE</span>
          </div>

          <div
            className="rubber-stamp rubber-stamp-blue text-[11px] cursor-default"
            style={{ transform: `rotate(${-1 + Math.cos(scrollY * 0.01) * 3}deg)` }}
          >
            <span>🇨🇦 CANADIAN CITIZEN • 9Y CH • 3Y BE</span>
          </div>
        </div>

        {/* Big Editorial Headline */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold tracking-widest text-[#68645C] uppercase">
              Curriculum Vitae & Personal Record
            </div>
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif text-[#141311] tracking-tight leading-[0.95]">
              Jonah O'Toole
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-[#68645C] leading-snug pt-1">
              Applied Computer Science student at <a href="https://ucll.be" target="_blank" rel="noopener noreferrer" className="retro-link text-[#141311] not-italic font-sans font-semibold">UCLL</a>, IT Manager for <span className="text-[#1E4E79] font-sans font-semibold not-italic">ESN Belgium</span>, and passionate educator.
            </p>
          </div>

          {/* Narrative Bio Container with Washi Tape */}
          <div className="retro-paper p-6 sm:p-8 rounded-sm relative overflow-hidden">
            {/* Washi Tape Strip */}
            <div className="washi-tape washi-tape-amber -top-2.5 right-6 rotate-2 hidden sm:block" />
            <div className="washi-tape washi-tape-blue -top-2.5 left-6 -rotate-1 hidden sm:block" />

            <div className="text-xs font-mono uppercase text-[#68645C] tracking-wider mb-3 flex items-center justify-between pb-2 border-b border-[#24221E]/15">
              <span>[ CANDIDATE PROFILE & NARRATIVE ]</span>
              <span>RESIDENCE: LEUVEN, BE</span>
            </div>

            <p className="text-base sm:text-lg text-[#24221E] leading-relaxed font-sans">
              {personal.bio}
            </p>

            {/* Outdoor Passions Pills */}
            <div className="pt-4 mt-4 border-t border-[#24221E]/15">
              <div className="text-xs font-mono font-bold uppercase text-[#68645C] mb-2.5">
                // OUTDOOR DISCIPLINES & INTERESTS
              </div>
              <div className="flex flex-wrap gap-2 font-mono text-xs text-[#24221E]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8F6F0] border border-[#24221E]/30">
                  <Bike className="w-3.5 h-3.5 text-[#B93826]" />
                  <span>Biking</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8F6F0] border border-[#24221E]/30">
                  <Waves className="w-3.5 h-3.5 text-[#1E4E79]" />
                  <span>Paddle Boarding</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8F6F0] border border-[#24221E]/30">
                  <Snowflake className="w-3.5 h-3.5 text-[#2A7B4C]" />
                  <span>Snowshoeing</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8F6F0] border border-[#24221E]/30">
                  <Mountain className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Alpine Hiking</span>
                </span>
              </div>
            </div>

            {/* Contact Strip & Download Resume */}
            <div className="space-y-3 pt-6 mt-6 border-t border-[#24221E]/15 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleCopy(personal.email, 'Email')}
                  className="flex items-center justify-between p-2.5 bg-[#F8F6F0] border border-[#24221E]/30 hover:border-[#24221E] hover:bg-[#EFECE2] transition-colors text-left group"
                >
                  <div className="truncate">
                    <div className="text-[10px] text-[#68645C] font-semibold uppercase">Email:</div>
                    <div className="font-bold text-[#141311] truncate">{personal.email}</div>
                  </div>
                  <Copy className="w-3.5 h-3.5 text-[#68645C] group-hover:text-[#24221E] flex-shrink-0 ml-1" />
                </button>

                <button
                  onClick={() => handleCopy(personal.phone, 'Phone')}
                  className="flex items-center justify-between p-2.5 bg-[#F8F6F0] border border-[#24221E]/30 hover:border-[#24221E] hover:bg-[#EFECE2] transition-colors text-left group"
                >
                  <div>
                    <div className="text-[10px] text-[#68645C] font-semibold uppercase">Phone:</div>
                    <div className="font-bold text-[#141311]">{personal.phone}</div>
                  </div>
                  <Copy className="w-3.5 h-3.5 text-[#68645C] group-hover:text-[#24221E] flex-shrink-0 ml-1" />
                </button>

                <div className="p-2.5 bg-[#F8F6F0] border border-[#24221E]/30">
                  <div className="text-[10px] text-[#68645C] font-semibold uppercase">Location:</div>
                  <div className="font-bold text-[#141311]">{personal.location}</div>
                </div>
              </div>

              {/* Direct PDF Download Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <a
                  href="./Jonah-OToole-Resume.pdf"
                  download="Jonah-OToole-Resume.pdf"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#24221E] text-[#F8F6F0] hover:bg-[#B93826] font-bold text-xs shadow-retro-sm transition-all active:translate-x-[1px] active:translate-y-[1px]"
                >
                  <span>DOWNLOAD ORIGINAL RESUME (PDF) 📄</span>
                </a>

                <a
                  href="./Jonah-OToole-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#1E4E79] hover:underline"
                >
                  <span>Open PDF in new tab</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 bg-[#FDFCF7] border border-[#24221E] shadow-retro-sm transition-transform hover:-translate-y-1"
            >
              <div className="text-2xl sm:text-3xl font-bold text-[#141311]">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-[#24221E] mt-1">{stat.label}</div>
              <div className="text-[11px] text-[#68645C] mt-0.5">{stat.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
