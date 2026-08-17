import React, { useRef, useEffect } from 'react';
import { Sparkles, Code2, GraduationCap, Award, Globe2, Layers } from 'lucide-react';

export default function VelocityTicker({ smoothVelocity, direction }) {
  const xOffsetRef = useRef(0);
  const containerRef = useRef(null);

  const items = [
    { text: "Applied Computer Science @ UCLL", icon: GraduationCap, color: "text-blue-600" },
    { text: "IT Manager @ ESN Belgium", icon: Layers, color: "text-indigo-600" },
    { text: "Full-Stack Web & TypeScript", icon: Code2, color: "text-cyan-600" },
    { text: "Duke of Edinburgh Gold Award", icon: Award, color: "text-amber-500" },
    { text: "Bilingual English & French Native", icon: Globe2, color: "text-emerald-600" },
    { text: "Senior Movie Editor @ ISCM Switzerland", icon: Sparkles, color: "text-purple-600" },
    { text: "Java • Python • SQL • React", icon: Code2, color: "text-blue-600" },
    { text: "TEFL Certified Educator", icon: Award, color: "text-rose-500" },
  ];

  // Double array for infinite marquee looping
  const displayItems = [...items, ...items, ...items];

  useEffect(() => {
    let animId;

    const animate = () => {
      // Base auto drift + speed boost from scroll velocity (negative smoothVelocity reverses ticker!)
      const delta = 0.8 + smoothVelocity * 14;
      xOffsetRef.current -= delta;

      // Wrap around width
      if (containerRef.current) {
        const totalWidth = containerRef.current.scrollWidth / 3;
        if (xOffsetRef.current <= -totalWidth) {
          xOffsetRef.current += totalWidth;
        } else if (xOffsetRef.current > 0) {
          xOffsetRef.current -= totalWidth;
        }
        containerRef.current.style.transform = `translateX(${xOffsetRef.current}px)`;
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [smoothVelocity]);

  return (
    <div className="w-full py-4 bg-gradient-to-r from-blue-50/60 via-slate-50 to-indigo-50/60 border-y border-slate-200/80 overflow-hidden relative select-none">
      {/* Edge gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAFAFC] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAFAFC] to-transparent z-10 pointer-events-none" />

      <div
        ref={containerRef}
        className="flex items-center gap-6 whitespace-nowrap will-change-transform"
      >
        {displayItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200/80 shadow-xs text-xs font-semibold text-slate-800 backdrop-blur-xs"
            >
              <Icon className={`w-3.5 h-3.5 ${item.color}`} />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
