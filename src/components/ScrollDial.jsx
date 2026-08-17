import React, { useEffect, useState } from 'react';

/**
 * ScrollDial - An authentic mechanical retro scroll-driven animation.
 * 
 * Features:
 * - A vintage filmstrip sprocket & spinning brass gear / compass dial
 * - Moves ONLY when scrolling (rotation and film advancement proportional to scrollY)
 * - Reverses completely when scrolling backwards
 * - Speed of rotation directly corresponds to scroll speed
 */
export default function ScrollDial({ scrollProgress }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      // Rotation angle directly mapped to scroll position (so scroll down rotates clockwise, scroll up reverses counter-clockwise)
      const currentScrollY = window.scrollY;
      setRotation(currentScrollY * 0.25);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-30 hidden xl:flex flex-col items-center gap-3 select-none pointer-events-none no-print">
      {/* Top Vintage Sprocket Gear */}
      <div
        className="w-10 h-10 rounded-full border-2 border-dashed border-[#24221E] flex items-center justify-center bg-[#FDFCF7] shadow-retro-sm"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: 'transform 0.05s linear',
        }}
      >
        <div className="w-3 h-3 rounded-full bg-[#24221E]" />
      </div>

      {/* Filmstrip Ruler Track */}
      <div className="w-6 h-48 bg-[#FDFCF7] border-2 border-[#24221E] shadow-retro-sm relative overflow-hidden flex flex-col justify-between py-1">
        {/* Sprocket holes on left and right */}
        <div className="absolute left-0.5 top-0 bottom-0 flex flex-col justify-between py-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1 h-1.5 bg-[#24221E] rounded-xs" />
          ))}
        </div>
        <div className="absolute right-0.5 top-0 bottom-0 flex flex-col justify-between py-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1 h-1.5 bg-[#24221E] rounded-xs" />
          ))}
        </div>

        {/* Dynamic scroll carriage indicator */}
        <div
          className="w-3 h-4 bg-[#B93826] border border-[#24221E] mx-auto transition-transform duration-75"
          style={{
            transform: `translateY(${Math.min(Math.max((scrollProgress / 100) * 165, 0), 165)}px)`,
          }}
        />
      </div>

      {/* Bottom Compass Gear */}
      <div
        className="w-10 h-10 rounded-full border-2 border-[#24221E] flex items-center justify-center bg-[#FDFCF7] shadow-retro-sm font-mono text-[9px] font-bold text-[#68645C]"
        style={{
          transform: `rotate(${-rotation}deg)`,
          transition: 'transform 0.05s linear',
        }}
      >
        <span className="text-[#B93826]">N</span>
      </div>
    </div>
  );
}
