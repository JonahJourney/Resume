import React from 'react';
import { resumeData } from '../data/resumeData';

export default function RetroLanguages() {
  const { languages } = resumeData;

  return (
    <section id="languages" className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 pb-3 border-b-2 border-[#24221E]">
        <div className="text-xs font-mono font-bold tracking-widest text-[#1E4E79] uppercase">
          [ 05 / MULTILINGUAL FLUENCY & CEFR MATRIX ]
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#141311] tracking-tight mt-1">
          Language Competence
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        {languages.map((lang, idx) => (
          <div
            key={idx}
            className="retro-paper p-5 retro-paper-hover flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#24221E]/15">
                <span className="text-3xl select-none">{lang.flag}</span>
                <span className="text-[11px] font-bold px-2 py-0.5 border border-[#24221E] bg-[#EFECE2]">
                  {lang.cefr}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-[#141311]">
                {lang.name}
              </h3>
              <div className="text-xs font-bold text-[#68645C] mt-0.5">
                {lang.level}
              </div>

              <p className="text-xs font-sans text-[#38352F] mt-2 leading-relaxed">
                {lang.details}
              </p>
            </div>

            <div className="pt-3 mt-3 border-t border-[#24221E]/10 text-[11px] text-[#68645C]">
              {lang.summary}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
