import React, { useState } from 'react';
import { ArrowDown, ArrowUp, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function RetroOdometer({ velocity, smoothVelocity, speed, direction, progress }) {
  const [collapsed, setCollapsed] = useState(false);

  const displaySpeed = Math.round(speed * 100);
  const normalizedSpeed = Math.min(speed / 2.5, 1);

  const triggerCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 65,
      origin: { y: 0.8 },
      colors: ['#B93826', '#1E4E79', '#B8860B', '#2A7B4C', '#24221E'],
    });
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 hidden sm:block select-none font-mono text-xs no-print">
      <div className="bg-[#FDFCF7] border-2 border-[#24221E] shadow-retro p-3 transition-all">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${speed > 0.08 ? 'bg-[#B93826] animate-ping' : 'bg-[#24221E]'}`} />
            <span className="font-bold text-[#141311]">
              VELOCITY: {displaySpeed} PX/S
            </span>
          </div>

          <div className="flex items-center gap-1 font-bold">
            {direction === 1 && (
              <span className="text-[#1E4E79] flex items-center">
                ↓ DOWN
              </span>
            )}
            {direction === -1 && (
              <span className="text-[#B93826] flex items-center">
                ↑ REV
              </span>
            )}
            {direction === 0 && <span className="text-[#68645C]">REST</span>}

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="ml-2 text-[#68645C] hover:text-[#24221E]"
            >
              {collapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {!collapsed && (
          <div className="mt-2 pt-2 border-t border-[#24221E]/15 space-y-1.5 text-[11px]">
            {/* Speed Gauge */}
            <div className="w-44 h-2 bg-[#EFECE2] border border-[#24221E]/30 overflow-hidden">
              <div
                className="h-full bg-[#24221E] transition-all duration-100"
                style={{ width: `${Math.max(normalizedSpeed * 100, 3)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[#68645C]">
              <span>SCROLL INDEX:</span>
              <span className="font-bold text-[#24221E]">{Math.round(progress)}%</span>
            </div>

            <button
              onClick={triggerCelebration}
              className="w-full mt-1 py-1 bg-[#F8F6F0] border border-[#24221E] hover:bg-[#24221E] hover:text-[#F8F6F0] font-bold text-[10px] uppercase transition-colors"
            >
              ★ STAMP RECORD
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
