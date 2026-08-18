import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

/**
 * KoalaScrollCompanion — Dual Responsive Engine
 * 
 * - Desktop/Tablet (>=640px): Climbs full-height bamboo stalk with 60FPS physics
 * - Mobile (<640px): Floating app companion badge with interactive tap & speech bubble, leaving 100% of mobile screen width for crisp, comfortable reading!
 */
export default function KoalaScrollCompanion({ scrollProgress }) {
  const koalaRef = useRef(null);
  const trackRef = useRef(null);
  const leftPawRef = useRef(null);
  const rightPawRef = useRef(null);
  const leftEarRef = useRef(null);
  const rightEarRef = useRef(null);

  const [speech, setSpeech] = useState(null);
  const speechTimeoutRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animFrameRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollYRef = useRef(0);
  const hasMovedRef = useRef(false);

  const quotes = [
    "G'day! I'm Jonah's spirit animal 🐨",
    "9 years in Swiss Alps, now in Leuven! 🇨🇭🇧🇪",
    "Did you see the Duke of Ed Gold award? 🥇",
    "Applied CS @ UCLL is awesome 💻",
    "Paddle boarding & hiking time! 🛶",
    "ESN Belgium IT operations running smooth 🚀",
    "Always calm under pressure! 🎋",
  ];

  useEffect(() => {
    if (!isDraggingRef.current) {
      targetProgressRef.current = scrollProgress;
    }
  }, [scrollProgress]);

  // Smooth RAF loop
  useEffect(() => {
    let phase = 0;

    const loop = () => {
      if (!isDraggingRef.current) {
        const delta = targetProgressRef.current - currentProgressRef.current;
        currentProgressRef.current += delta * 0.14;

        if (Math.abs(delta) > 0.05) {
          phase += delta * 0.4;
          const pawOffset = Math.sin(phase) * 6;
          const earOffset = Math.cos(phase * 0.6) * 3;

          if (leftPawRef.current) leftPawRef.current.style.transform = `translate3d(0, ${pawOffset}px, 0) rotate(-20deg)`;
          if (rightPawRef.current) rightPawRef.current.style.transform = `translate3d(0, ${-pawOffset}px, 0) rotate(20deg)`;
          if (leftEarRef.current) leftEarRef.current.style.transform = `rotate(${-earOffset}deg)`;
          if (rightEarRef.current) rightEarRef.current.style.transform = `rotate(${earOffset}deg)`;
        }
      }

      const windowHeight = window.innerHeight;
      const minTop = 40;
      const maxTop = windowHeight - 110;
      const currentY = minTop + (currentProgressRef.current / 100) * (maxTop - minTop);

      if (koalaRef.current) {
        koalaRef.current.style.transform = `translate3d(0, ${currentY}px, 0)`;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleDragStart = (clientY) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartYRef.current = clientY;
    dragStartScrollYRef.current = window.scrollY;
  };

  const handleDragMove = (clientY) => {
    if (!isDraggingRef.current) return;
    const deltaY = clientY - dragStartYRef.current;
    if (Math.abs(deltaY) > 3) {
      hasMovedRef.current = true;
    }

    const windowHeight = window.innerHeight;
    const trackRange = windowHeight - 150;
    const totalScrollable = document.documentElement.scrollHeight - windowHeight;

    if (trackRange > 0 && totalScrollable > 0) {
      const scrollDelta = (deltaY / trackRange) * totalScrollable;
      const newScrollY = Math.max(0, Math.min(dragStartScrollYRef.current + scrollDelta, totalScrollable));
      window.scrollTo({ top: newScrollY, behavior: 'auto' });

      const newProgress = (newScrollY / totalScrollable) * 100;
      currentProgressRef.current = newProgress;
      targetProgressRef.current = newProgress;
    }
  };

  const handleDragEnd = () => {
    isDraggingRef.current = false;
    setIsDragging(false);

    if (!hasMovedRef.current) {
      handleQuickClick();
    }
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientY);

    const onMouseMove = (moveEvent) => handleDragMove(moveEvent.clientY);
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      handleDragEnd();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) handleDragStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) handleDragMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => handleDragEnd();

  const handleTrackClick = (e) => {
    if (e.target === koalaRef.current || koalaRef.current?.contains(e.target)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const minTop = 40;
    const maxTop = window.innerHeight - 110;
    const ratio = Math.max(0, Math.min((clickY - minTop) / (maxTop - minTop), 1));
    const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: ratio * totalScrollable, behavior: 'smooth' });
  };

  const handleQuickClick = () => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setSpeech(randomQuote);

    confetti({
      particleCount: 35,
      spread: 50,
      origin: { x: 0.9, y: 0.5 },
      colors: ['#2A7B4C', '#B8860B', '#1E4E79', '#B93826'],
    });

    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeech(null);
    }, 3500);
  };

  return (
    <>
      {/* ======================================================== */}
      {/* DESKTOP & TABLET: Vertical Bamboo Stalk Climber (>=640px) */}
      {/* ======================================================== */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className={`hidden sm:flex fixed right-6 top-0 bottom-0 z-40 select-none flex-col items-center no-print ${
          isDragging ? 'cursor-grabbing' : 'cursor-pointer'
        }`}
        style={{ width: '48px' }}
        title="Interactive Scrollbar — Hold & drag Koala to scroll!"
      >
        {/* Bamboo Stalk */}
        <div className="absolute top-0 bottom-0 w-3 bg-[#5A8F4C] border-x-2 border-[#24221E] shadow-sm flex flex-col justify-between py-6 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="relative w-full h-1 bg-[#3E6B32] border-y border-[#24221E]">
              {i % 2 === 0 ? (
                <div className="absolute -left-3 -top-2 w-3.5 h-1.5 bg-[#6EA358] border border-[#24221E] rounded-full -rotate-45" />
              ) : (
                <div className="absolute -right-3 -top-2 w-3.5 h-1.5 bg-[#6EA358] border border-[#24221E] rounded-full rotate-45" />
              )}
            </div>
          ))}
        </div>

        {/* Draggable Koala Handle */}
        <div
          ref={koalaRef}
          onMouseDown={handleMouseDown}
          className={`absolute top-0 group will-change-transform ${
            isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab hover:scale-105'
          }`}
          style={{ touchAction: 'none' }}
        >
          {/* Speech Bubble */}
          {speech && (
            <div className="absolute right-16 top-0 -translate-y-1/2 w-48 p-2.5 bg-[#FDFCF7] border-2 border-[#24221E] shadow-retro text-[11px] font-mono font-bold text-[#141311] rounded-sm animate-in fade-in zoom-in-95 duration-150 z-50 pointer-events-none">
              <div className="leading-snug">{speech}</div>
              <div className="text-[9px] text-[#2A7B4C] mt-1 font-normal">🎋 (Hold & Drag to Scroll!)</div>
            </div>
          )}

          {/* Desktop Hover Hint */}
          {!speech && !isDragging && (
            <div className="absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#FDFCF7] text-[#141311] border-2 border-[#24221E] shadow-retro p-3 rounded-xs text-[11px] font-mono whitespace-normal w-56 shadow-lg pointer-events-none z-50">
              <div className="font-bold text-[#B93826] flex items-center gap-1 mb-1">
                <span>🐨 Hi there!</span>
              </div>
              <p className="text-[#38352F] leading-snug font-sans text-xs">
                I'm <strong>Jonah's spirit animal</strong> — always calm in tense situations, friendly, and very easy to work with!
              </p>
              <div className="mt-1.5 pt-1.5 border-t border-[#24221E]/15 text-[10px] text-[#2A7B4C] font-mono font-semibold">
                🎋 Hold & drag me to scroll!
              </div>
            </div>
          )}

          {/* Koala SVG */}
          <div className="w-16 h-18 relative filter drop-shadow-md transition-transform">
            <svg viewBox="0 0 110 110" className="w-full h-full overflow-visible">
              <g ref={leftEarRef} style={{ transformOrigin: '30px 25px' }}>
                <circle cx="30" cy="25" r="17" fill="#8C8880" stroke="#24221E" strokeWidth="2.5" />
                <circle cx="30" cy="25" r="10" fill="#EAE5DC" />
              </g>
              <g ref={rightEarRef} style={{ transformOrigin: '80px 25px' }}>
                <circle cx="80" cy="25" r="17" fill="#8C8880" stroke="#24221E" strokeWidth="2.5" />
                <circle cx="80" cy="25" r="10" fill="#EAE5DC" />
              </g>
              <rect x="42" y="52" width="26" height="22" rx="4" fill="#B93826" stroke="#24221E" strokeWidth="2.5" />
              <path d="M53 58 L57 58 M55 56 L55 64" stroke="#FDFCF7" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="55" cy="68" rx="23" ry="20" fill="#8C8880" stroke="#24221E" strokeWidth="2.5" />
              <ellipse cx="55" cy="70" rx="14" ry="13" fill="#EAE5DC" />
              <circle cx="55" cy="42" r="25" fill="#A19D94" stroke="#24221E" strokeWidth="2.5" />
              <circle cx="41" cy="49" r="4" fill="#E8B4B8" opacity="0.6" />
              <circle cx="69" cy="49" r="4" fill="#E8B4B8" opacity="0.6" />
              <ellipse cx="55" cy="45" rx="8" ry="11" fill="#1C1B18" stroke="#24221E" strokeWidth="1.5" />
              <ellipse cx="53" cy="41" rx="2.5" ry="3.5" fill="#504C46" opacity="0.5" />
              <circle cx="43" cy="37" r="3.5" fill="#141311" />
              <circle cx="42" cy="36" r="1.2" fill="#FFF" />
              <circle cx="67" cy="37" r="3.5" fill="#141311" />
              <circle cx="66" cy="36" r="1.2" fill="#FFF" />
              <g transform="translate(64, 48) rotate(-15)">
                <path d="M0 6 Q8 -2 18 -4 Q12 6 0 6" fill="#3D9960" stroke="#24221E" strokeWidth="1.5" />
              </g>
              <g ref={leftPawRef} style={{ transformOrigin: '30px 58px' }}>
                <ellipse cx="30" cy="58" rx="7" ry="10" fill="#8C8880" stroke="#24221E" strokeWidth="2.5" />
                <circle cx="36" cy="54" r="3" fill="#24221E" />
              </g>
              <g ref={rightPawRef} style={{ transformOrigin: '80px 58px' }}>
                <ellipse cx="80" cy="58" rx="7" ry="10" fill="#8C8880" stroke="#24221E" strokeWidth="2.5" />
                <circle cx="74" cy="54" r="3" fill="#24221E" />
              </g>
              <ellipse cx="38" cy="88" rx="7" ry="8" fill="#75716A" stroke="#24221E" strokeWidth="2.5" />
              <ellipse cx="72" cy="88" rx="7" ry="8" fill="#75716A" stroke="#24221E" strokeWidth="2.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MOBILE APP VIEW: Floating Companion Button (<640px)      */}
      {/* ======================================================== */}
      <div className="sm:hidden fixed top-16 right-3 z-40 select-none no-print">
        <button
          onClick={handleQuickClick}
          className="flex items-center gap-1 px-2.5 py-1.5 bg-[#FDFCF7]/95 border-2 border-[#24221E] shadow-retro rounded-full active:scale-95 transition-transform"
          title="Jonah's Spirit Animal"
        >
          <span className="text-sm">🐨</span>
          <span className="text-[10px] font-mono font-bold text-[#141311]">
            {Math.round(scrollProgress)}%
          </span>
        </button>

        {/* Mobile Speech Bubble Popup */}
        {speech && (
          <div className="absolute right-0 top-10 w-52 p-3 bg-[#FDFCF7] border-2 border-[#24221E] shadow-retro text-[11px] font-mono font-bold text-[#141311] rounded-sm animate-in fade-in zoom-in-95 duration-150 z-50">
            <div className="leading-snug">{speech}</div>
            <div className="text-[9px] text-[#2A7B4C] mt-1.5 font-normal">
              🌿 Jonah's Spirit Animal
            </div>
          </div>
        )}
      </div>
    </>
  );
}
