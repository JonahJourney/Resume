import React from 'react';
import { useResumeData } from '../context/ResumeDataContext';
import { Code2, Terminal, Cpu, Database, Layout, Sparkles, CheckCircle2 } from 'lucide-react';

export default function RetroSkills() {
  const { data } = useResumeData();
  const { skills } = data;

  return (
    <section id="skills" className="py-20 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-10 pb-3 border-b-2 border-[#24221E]">
        <div className="text-xs font-mono font-bold tracking-widest text-[#B93826] uppercase">
          [ 05 / TECHNICAL INDEX & CAPABILITIES ]
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#141311] tracking-tight mt-1">
          Programming, Tooling & Core Strengths
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Programming Stack & Dev Tools */}
        <div className="md:col-span-7 space-y-6">
          {/* Core Languages Card */}
          <div className="retro-paper p-6 sm:p-7 space-y-5">
            <div className="text-xs font-mono font-bold uppercase text-[#68645C] pb-2 border-b border-[#24221E]/15 flex items-center justify-between">
              <span>// PROGRAMMING & ARCHITECTURE</span>
              <span className="text-[10px] text-[#2A7B4C] font-semibold">CORE COMPETENCIES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              {skills.programming.map((p, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[#F8F6F0] border border-[#24221E]/25 hover:border-[#24221E] hover:bg-[#EFECE2] transition-colors"
                >
                  <div className="flex items-center justify-between font-bold text-sm text-[#141311]">
                    <span>{p.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-[#24221E] text-[#F8F6F0] rounded-xs font-normal">
                      ACTIVE
                    </span>
                  </div>
                  <div className="text-[11px] font-sans text-[#68645C] mt-1">
                    {p.tag}
                  </div>
                </div>
              ))}
            </div>

            {/* Systems & Workflow */}
            <div className="pt-4 border-t border-[#24221E]/15">
              <div className="text-xs font-mono font-bold uppercase text-[#68645C] mb-3">
                // SYSTEMS, TOOLING & MEDIA
              </div>
              <div className="grid grid-cols-2 gap-2.5 font-mono text-xs">
                {skills.toolsAndDev.map((t, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-[#F8F6F0] border border-[#24221E]/20 hover:bg-[#EFECE2] transition-colors"
                  >
                    <div className="font-bold text-[#141311] text-xs">{t.name}</div>
                    <div className="text-[10px] font-sans text-[#68645C] mt-0.5">{t.tag}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Soft Skills & Human Strengths */}
        <div className="md:col-span-5 retro-paper p-6 sm:p-7 flex flex-col justify-between space-y-6">
          <div>
            <div className="text-xs font-mono font-bold uppercase text-[#68645C] pb-2 border-b border-[#24221E]/15 mb-4 flex items-center justify-between">
              <span>// WORK ETHIC & LEADERSHIP</span>
              <span className="text-[10px] text-[#1E4E79] font-semibold">ATTRIBUTES</span>
            </div>

            <div className="space-y-3 font-sans">
              {skills.softAndStrengths.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-[#F8F6F0] border border-[#24221E]/20 hover:bg-[#EFECE2] transition-colors"
                >
                  <div className="font-serif font-bold text-base text-[#141311]">
                    {s.name}
                  </div>
                  <p className="text-xs text-[#555] mt-1 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* TEFL Note */}
          <div className="p-3 bg-[#FDFCF7] border border-dashed border-[#B93826] text-[#B93826] font-mono text-xs">
            <span className="font-bold">TEFL CERTIFIED:</span> Structured pedagogy, classroom clarity & cross-cultural communication.
          </div>
        </div>
      </div>
    </section>
  );
}
