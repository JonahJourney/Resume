import React from 'react';
import { Globe2, MessageSquare, Check, Sparkles } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Languages() {
  const { languages } = resumeData;

  return (
    <section id="languages" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200/60 text-violet-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Globe2 className="w-3.5 h-3.5 text-violet-600" />
          <span>Multilingual Fluency</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
          Language Proficiency
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-xl">
          True bilingual native speaker in English and French, with practical communicative European competence in Dutch and Spanish.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {languages.map((lang, idx) => (
          <div
            key={idx}
            className="glass-card rounded-3xl p-6 border border-slate-200/80 bg-white/95 shadow-sm hover:shadow-xl hover:border-violet-300 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300 select-none">
                  {lang.flag}
                </span>
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                    lang.cefr.includes('Native')
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-violet-50 text-violet-700 border border-violet-200'
                  }`}
                >
                  {lang.cefr}
                </span>
              </div>

              <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-violet-600 transition-colors">
                {lang.name}
              </h3>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">
                {lang.level}
              </div>

              <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">
                {lang.details}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <div className="text-[11px] font-medium text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-200/60 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
                <span className="truncate">{lang.summary}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
