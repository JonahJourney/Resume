import React from 'react';
import { GraduationCap, ExternalLink, Calendar, MapPin, CheckCircle2, BookOpen, Award } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Education() {
  const { education } = resumeData;

  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200/60 text-cyan-700 text-xs font-bold uppercase tracking-wider mb-3">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-600" />
          <span>Academic Background</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
          Education & Training
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-xl">
          Strong formal foundation in applied computer systems, software development methodologies, and international analytical education.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="glass-card rounded-3xl p-6 border border-slate-200/80 bg-white/90 shadow-sm hover:shadow-xl hover:border-cyan-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200/60 mb-2">
                    {edu.badge}
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-cyan-600 transition-colors">
                    {edu.degree}
                  </h3>
                  <div className="text-sm font-semibold text-slate-700 mt-0.5">
                    {edu.institution}
                  </div>
                </div>

                <a
                  href={edu.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-slate-100/80 text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 transition-colors flex-shrink-0 group/link"
                  title={`Visit ${edu.institution} Official Website`}
                >
                  <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                </a>
              </div>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                  <span>{edu.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{edu.location}</span>
                </div>
              </div>

              {/* Highlights */}
              <div className="space-y-2 pt-1">
                {edu.highlights.map((h, hIdx) => (
                  <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 mt-0.5 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags & Link Footer */}
            <div className="pt-5 mt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {edu.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium group-hover:bg-cyan-50 group-hover:text-cyan-700 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={edu.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-cyan-600 hover:text-cyan-700 flex items-center gap-1 hover:underline ml-auto"
              >
                <span>{edu.website.replace(/^https?:\/\//, '')}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
