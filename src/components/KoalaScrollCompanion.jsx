import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

/**
 * KoalaScrollCompanion — Fully Mobile-Touch Optimized & Desktop Draggable Companion
 * 
 * Features:
 * - Full Mobile Touch Drag support (onTouchStart, onTouchMove, onTouchEnd)
 * - Full Desktop Mouse Drag support
 * - Hardware accelerated translate3d 60FPS physics
 * - Click / tap for speech bubble & celebration confetti
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
    "Hold & drag me up and down! 🎋",
  ];

  // Update target progress on natural scroll
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

  // Universal drag logic for both mouse and touch
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

  // Mouse Handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleDragStart(e.clientY);

    const onMouseMove = (moveEvent) => {
      handleDragMove(moveEvent.clientY);
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      handleDragEnd();
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  // Touch Handlers (Mobile Support)
  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      handleDragStart(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      handleDragMove(e.touches[0].clientY);
    }
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  // Click on Bamboo Track to jump
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
      particleCount: 40,
      spread: 55,
      origin: { x: 0.9, y: 0.5 },
      colors: ['#2A7B4C', '#B8860B', '#1E4E79', '#B93826'],
    });

    if (speechTimeoutRef.current) clearTimeout(speechTimeoutRef.current);
    speechTimeoutRef.current = setTimeout(() => {
      setSpeech(null);
    }, 3500);
  };

  return (
    <div
      ref={trackRef}
      onClick={handleTrackClick}
      className={`fixed right-1 sm:right-6 top-0 bottom-0 z-40 select-none flex flex-col items-center no-print ${
        isDragging ? 'cursor-grabbing' : 'cursor-pointer'
      }`}
      style={{ width: '44px', touchAction: 'none' }}
      title="Interactive Scrollbar — Hold & drag Koala to scroll!"
    >
      {/* Bamboo Stalk Track */}
      <div className="absolute top-0 bottom-0 w-2.5 sm:w-3 bg-[#5A8F4C] border-x-2 border-[#24221E] shadow-sm flex flex-col justify-between py-6 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="relative w-full h-1 bg-[#3E6B32] border-y border-[#24221E]">
            {i % 2 === 0 ? (
              <div className="absolute -left-2.5 -top-1.5 w-3 h-1.5 bg-[#6EA358] border border-[#24221E] rounded-full -rotate-45" />
            ) : (
              <div className="absolute -right-2.5 -top-1.5 w-3 h-1.5 bg-[#6EA358] border border-[#24221E] rounded-full rotate-45" />
            )}
          </div>
        ))}
      </div>

      {/* Draggable Koala Scrollbar Handle (Mouse & Touch Enabled) */}
      <div
        ref={koalaRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`absolute top-0 group will-change-transform ${
          isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab hover:scale-105 active:scale-95'
        }`}
        style={{ touchAction: 'none' }}
      >
        {/* Speech Bubble */}
        {speech && (
          <div className="absolute right-14 sm:right-16 top-0 -translate-y-1/2 w-44 sm:w-52 p-2.5 bg-[#FDFCF7] border-2 border-[#24221E] shadow-retro text-[10px] sm:text-[11px] font-mono font-bold text-[#141311] rounded-sm animate-in fade-in zoom-in-95 duration-150 z-50 pointer-events-none">
            <div className="leading-snug">{speech}</div>
            <div className="text-[9px] text-[#2A7B4C] mt-1 font-normal">🎋 (Hold & Drag to Scroll!)</div>
          </div>
        )}

        {/* Drag & Spirit Animal Hint on hover */}
        {!speech && !isDragging && (
          <div className="hidden sm:block absolute right-16 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#FDFCF7] text-[#141311] border-2 border-[#24221E] shadow-retro p-3 rounded-xs text-[11px] font-mono whitespace-normal w-56 shadow-lg pointer-events-none z-50">
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

        {/* Vector Koala Graphic (Responsive on mobile) */}
        <div className="w-12 h-14 sm:w-16 sm:h-18 relative filter drop-shadow-md transition-transform">
          <svg viewBox="0 0 110 110" className="w-full h-full overflow-visible">
            {/* Left Ear */}
            <g ref={leftEarRef} style={{ transformOrigin: '30px 25px' }}>
              <circle cx="30" cy="25" r="17" fill="#8C8880" stroke="#24221E" strokeWidth="2.5" />
              <circle cx="30" cy="25" r="10" fill="#EAE5DC" />
            </g>

            {/* Right Ear */}
            <g ref={rightEarRef} style={{ transformOrigin: '80px 25px' }}>
              <circle cx="80" cy="25" r="17" fill="#8C8880" stroke="#24221E" strokeWidth="2.5" />
              <circle cx="80" cy="25" r="10" fill="#EAE5DC" />
            </g>

            {/* Adventure Pack (Canadian Red) */}
            <rect x="42" y="52" width="26" height="22" rx="4" fill="#B93826" stroke="#24221E" strokeWidth="2.5" />
            <path d="M53 58 L57 58 M55 56 L55 64" stroke="#FDFCF7" strokeWidth="2" strokeLinecap="round" />

            {/* Body */}
            <ellipse cx="55" cy="68" rx="23" ry="20" fill="#8C8880" stroke="#24221E" strokeWidth="2.5" />
            <ellipse cx="55" cy="70" rx="14" ry="13" fill="#EAE5DC" />

            {/* Head */}
            <circle cx="55" cy="42" r="25" fill="#A19D94" stroke="#24221E" strokeWidth="2.5" />

            {/* Cheeks */}
            <circle cx="41" cy="49" r="4" fill="#E8B4B8" opacity="0.6" />
            <circle cx="69" cy="49" r="4" fill="#E8B4B8" opacity="0.6" />

            {/* Big Koala Nose */}
            <ellipse cx="55" cy="45" rx="8" ry="11" fill="#1C1B18" stroke="#24221E" strokeWidth="1.5" />
            <ellipse cx="53" cy="41" rx="2.5" ry="3.5" fill="#504C46" opacity="0.5" />

            {/* Eyes */}
            <circle cx="43" cy="37" r="3.5" fill="#141311" />
            <circle cx="42" cy="36" r="1.2" fill="#FFF" />
            <circle cx="67" cy="37" r="3.5" fill="#141311" />
            <circle cx="66" cy="36" r="1.2" fill="#FFF" />

            {/* Fresh Bamboo Leaf in mouth */}
            <g transform="translate(64, 48) rotate(-15)">
              <path d="M0 6 Q8 -2 18 -4 Q12 6 0 6" fill="#3D9960" stroke="#24221E" strokeWidth="1.5" />
            </g>

            {/* Left Arm & Paw */}
            <g ref={leftPawRef} style={{ transformOrigin: '30px 58px' }}>
              <ellipse
                cx="30"
                cy="58"
                rx="7"
                ry="10"
                fill="#8C8880"
                stroke="#24221E"
                strokeWidth="2.5"
              />
              <circle cx="36" cy="54" r="3" fill="#24221E" />
            </g>

            {/* Right Arm & Paw */}
            <g ref={rightPawRef} style={{ transformOrigin: '80px 58px' }}>
              <ellipse
                cx="80"
                cy="58"
                rx="7"
                ry="10"
                fill="#8C8880"
                stroke="#24221E"
                strokeWidth="2.5"
              />
              <circle cx="74" cy="54" r="3" fill="#24221E" />
            </g>

            {/* Left Foot */}
            <ellipse cx="38" cy="88" rx="7" ry="8" fill="#75716A" stroke="#24221E" strokeWidth="2.5" />
            {/* Right Foot */}
            <ellipse cx="72" cy="88" rx="7" ry="8" fill="#75716A" stroke="#24221E" strokeWidth="2.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}
