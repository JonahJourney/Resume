import React, { useState } from 'react';
import { Activity, Gauge, ArrowDown, ArrowUp, Zap, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function VelocityHUD({ velocity, smoothVelocity, speed, direction, progress }) {
  const [collapsed, setCollapsed] = useState(false);

  const displaySpeed = Math.round(speed * 100);
  const normalizedSpeed = Math.min(speed / 2.5, 1); // 0 to 1

  const triggerAwardCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#2563EB', '#F59E0B', '#10B981', '#7C3AED', '#06B6D4'],
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 hidden md:block">
      <div className="glass-panel rounded-2xl shadow-xl border border-slate-200/80 p-3.5 transition-all duration-300 backdrop-blur-xl bg-white/90 text-slate-800">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg transition-colors ${speed > 0.1 ? 'bg-blue-100 text-blue-600 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Scroll Physics Engine
              </div>
              <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <span>{displaySpeed} px/s</span>
                <span className="text-slate-300">•</span>
                <span className="flex items-center font-medium text-[11px]">
                  {direction === 1 && (
                    <span className="text-blue-600 flex items-center gap-0.5">
                      <ArrowDown className="w-3 h-3" /> Downward
                    </span>
                  )}
                  {direction === -1 && (
                    <span className="text-purple-600 flex items-center gap-0.5">
                      <ArrowUp className="w-3 h-3" /> Reversed
                    </span>
                  )}
                  {direction === 0 && <span className="text-slate-400">Resting</span>}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={collapsed ? "Expand physics HUD" : "Collapse physics HUD"}
            aria-label="Toggle Physics HUD"
          >
            {collapsed ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {!collapsed && (
          <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2 text-xs">
            {/* Speedometer Bar */}
            <div>
              <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                <span>Dynamic Momentum</span>
                <span>{Math.round(normalizedSpeed * 100)}%</span>
              </div>
              <div className="w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 transition-all duration-100 rounded-full"
                  style={{ width: `${Math.max(normalizedSpeed * 100, 4)}%` }}
                />
              </div>
            </div>

            {/* Readout stats */}
            <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1">
              <span>Scroll Progress:</span>
              <span className="font-semibold text-slate-800">{Math.round(progress)}%</span>
            </div>

            <button
              onClick={triggerAwardCelebration}
              className="w-full mt-1.5 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-blue-700 rounded-xl font-medium text-[11px] border border-blue-200/60 transition-all active:scale-95 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Celebrate Portfolio 🌟
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
