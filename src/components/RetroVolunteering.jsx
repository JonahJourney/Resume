import React from 'react';
import { HeartHandshake, Check, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { useResumeData } from '../context/ResumeDataContext';

export default function RetroVolunteering() {
  const { data, isEditMode, updateField } = useResumeData();
  const { volunteering } = data;

  return (
    <section id="volunteering" className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 pb-3 border-b-2 border-[#24221E]">
        <div className="text-xs font-mono font-bold tracking-widest text-[#1E4E79] uppercase">
          [ 02 / VOLUNTEERING & PUBLIC LEADERSHIP ]
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#141311] tracking-tight mt-1">
          Erasmus Student Network (ESN) Track Record
        </h2>
        <p className="text-sm font-sans text-[#68645C] mt-1 max-w-2xl">
          Four continuous years of active civic leadership and digital infrastructure management supporting international exchange students across Belgium.
        </p>
      </div>

      {/* Grid of timeline entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {volunteering.map((item, idx) => (
          <div
            key={item.id}
            className="retro-paper p-6 retro-paper-hover flex flex-col justify-between"
          >
            <div>
              {/* Header metadata */}
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#24221E]/15 font-mono text-xs">
                <span className="font-bold text-[#1E4E79]">{item.organization}</span>
                {item.current ? (
                  <span className="text-[10px] font-bold text-[#2A7B4C] bg-[#2A7B4C]/10 border border-[#2A7B4C] px-1.5 py-0.5">
                    ● CURRENT
                  </span>
                ) : (
                  <span className="text-[#68645C] text-[11px]">{item.period}</span>
                )}
              </div>

              {/* Title & Role */}
              <div className="mt-3 mb-2">
                <h3 className="text-xl font-serif text-[#141311]">
                  {item.role}
                </h3>
                <div className="text-xs font-mono text-[#68645C]">
                  {item.location} {item.current && `• ${item.period}`}
                </div>
              </div>

              {/* Description (Editable) */}
              <p
                contentEditable={isEditMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => updateField(`volunteering.${idx}.description`, e.currentTarget.innerText)}
                className={`text-xs sm:text-sm text-[#38352F] leading-relaxed font-sans mt-2 mb-3 transition-all ${
                  isEditMode
                    ? 'outline-dashed outline-2 outline-[#1E4E79] bg-[#FDF8EE] p-1.5 rounded cursor-text'
                    : ''
                }`}
              >
                {item.description}
              </p>

              {/* Achievements */}
              <div className="space-y-1.5 pt-2 border-t border-[#24221E]/10 font-sans text-xs text-[#24221E]">
                {item.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="font-mono text-[#1E4E79] font-bold">↳</span>
                    <span
                      contentEditable={isEditMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => updateField(`volunteering.${idx}.achievements.${i}`, e.currentTarget.innerText)}
                      className={`leading-tight transition-all ${
                        isEditMode
                          ? 'outline-dashed outline-1 outline-[#1E4E79] bg-[#FDF8EE] px-1 rounded cursor-text'
                          : ''
                      }`}
                    >
                      {ach}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 pt-4 mt-4 border-t border-[#24221E]/10 font-mono text-[10px]">
              {item.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2 py-0.5 bg-[#F8F6F0] border border-[#24221E]/20 text-[#24221E]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
