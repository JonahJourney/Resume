import React from 'react';
import { ExternalLink, ArrowUpRight, GraduationCap } from 'lucide-react';
import { useResumeData } from '../context/ResumeDataContext';

export default function RetroEducation() {
  const { data, isEditMode, updateField } = useResumeData();
  const { education } = data;

  return (
    <section id="education" className="py-20 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 pb-3 border-b-2 border-[#24221E]">
        <div className="text-xs font-mono font-bold tracking-widest text-[#2A7B4C] uppercase">
          [ 03 / ACADEMIC BACKGROUND & CURRICULA ]
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#141311] tracking-tight mt-1">
          Higher Education & Formal Studies
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu, idx) => (
          <div
            key={edu.id}
            className="retro-paper p-6 sm:p-7 retro-paper-hover flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-[#24221E]/15 font-mono text-xs">
                <span className="text-[#68645C]">{edu.period}</span>
                <span className="font-bold text-[#2A7B4C] uppercase">
                  {edu.status}
                </span>
              </div>

              {/* Degree Title & School */}
              <div className="mt-3 mb-2">
                <h3 className="text-2xl font-serif text-[#141311]">
                  {edu.degree}
                </h3>
                <div className="text-sm font-semibold font-sans text-[#4A463E] mt-0.5">
                  {edu.institution} • {edu.location}
                </div>
              </div>

              {/* Highlights (Editable) */}
              <div className="space-y-2 mt-4 pt-3 border-t border-[#24221E]/10 font-sans text-xs text-[#24221E]">
                {edu.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="font-mono text-[#2A7B4C] font-bold">↳</span>
                    <span
                      contentEditable={isEditMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => updateField(`education.${idx}.highlights.${i}`, e.currentTarget.innerText)}
                      className={`leading-relaxed transition-all ${
                        isEditMode
                          ? 'outline-dashed outline-1 outline-[#2A7B4C] bg-[#FDF8EE] px-1 rounded cursor-text'
                          : ''
                      }`}
                    >
                      {h}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Website Link */}
            <div className="pt-4 mt-4 border-t border-[#24221E]/15 flex items-center justify-between font-mono text-xs">
              <span className="text-[11px] text-[#68645C]">OFFICIAL PORTAL:</span>
              <a
                href={edu.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#1E4E79] hover:underline"
              >
                <span>{edu.website.replace(/^https?:\/\//, '')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
