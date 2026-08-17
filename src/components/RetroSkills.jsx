import React from 'react';
import { resumeData } from '../data/resumeData';

export default function RetroSkills() {
  const { skills } = resumeData;

  return (
    <section id="skills" className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 pb-3 border-b-2 border-[#24221E]">
        <div className="text-xs font-mono font-bold tracking-widest text-[#B93826] uppercase">
          [ 04 / TECHNICAL INDEX & CAPABILITIES ]
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#141311] tracking-tight mt-1">
          Programming, Tooling & Core Strengths
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Programming Stack */}
        <div className="md:col-span-7 retro-paper p-6 sm:p-7 space-y-5">
          <div className="text-xs font-mono font-bold uppercase text-[#68645C] pb-2 border-b border-[#24221E]/15">
            // PROGRAMMING LANGUAGES & ARCHITECTURE
          </div>

          <div className="space-y-3.5 font-mono text-xs">
            {skills.programming.map((p, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between font-semibold text-[#141311]">
                  <span>{p.name} <span className="text-[#68645C] font-normal">({p.tag})</span></span>
                  <span className="text-[#B93826]">{p.level}%</span>
                </div>
                <div className="w-full h-2 bg-[#EFECE2] border border-[#24221E]/30 overflow-hidden">
                  <div
                    className="h-full bg-[#24221E] transition-all duration-700"
                    style={{ width: `${p.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tools & Dev */}
          <div className="pt-4 border-t border-[#24221E]/15">
            <div className="text-xs font-mono font-bold uppercase text-[#68645C] mb-3">
              // SYSTEMS & DIGITAL MEDIA TOOLKIT
            </div>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              {skills.toolsAndDev.map((t, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-[#F8F6F0] border border-[#24221E]/20"
                >
                  <div className="font-bold text-[#141311]">{t.name}</div>
                  <div className="text-[10px] text-[#68645C]">{t.tag}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Soft Skills & Attributes */}
        <div className="md:col-span-5 retro-paper p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase text-[#68645C] pb-2 border-b border-[#24221E]/15 mb-4">
              // WORK ETHIC & HUMAN ATTRIBUTES
            </div>

            <div className="space-y-3 font-sans">
              {skills.softAndStrengths.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#F8F6F0] border border-[#24221E]/20"
                >
                  <div className="font-serif font-bold text-base text-[#141311]">
                    {s.name}
                  </div>
                  <p className="text-xs text-[#68645C] mt-0.5 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TEFL Note */}
          <div className="p-3 bg-[#FDFCF7] border border-dashed border-[#B93826] text-[#B93826] font-mono text-xs">
            <span className="font-bold">TEFL TEACHER:</span> Certified instructional clarity & cross-cultural communication.
          </div>
        </div>
      </div>
    </section>
  );
}
