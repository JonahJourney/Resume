import React from 'react';
import { HeartHandshake, ShieldCheck, Users, Sparkles, Calendar, MapPin, CheckCircle2, ChevronRight, Laptop, Award } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Volunteering({ smoothVelocity }) {
  const { volunteering } = resumeData;

  return (
    <section id="volunteering" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
          <HeartHandshake className="w-3.5 h-3.5 text-indigo-600" />
          <span>Community Impact & Governance</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
          Leadership & ESN Volunteering
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-2xl">
          Four continuous years of active leadership and digital governance within the <span className="font-semibold text-slate-700">Erasmus Student Network (ESN)</span>, managing national IT infrastructure, board secretarial operations, and major international student events.
        </p>
      </div>

      {/* Interactive Timeline Cards */}
      <div className="relative border-l-2 border-indigo-100 pl-4 sm:pl-8 ml-2 sm:ml-4 space-y-8">
        {volunteering.map((item, idx) => (
          <div
            key={item.id}
            className="relative group"
          >
            {/* Timeline Dot with pulsing ring if current */}
            <div
              className={`absolute -left-[25px] sm:-left-[41px] top-6 w-5 h-5 rounded-full border-4 border-white shadow-md flex items-center justify-center ${
                item.current
                  ? 'bg-blue-600 ring-4 ring-blue-100'
                  : 'bg-slate-300 group-hover:bg-indigo-600 transition-colors'
              }`}
            />

            {/* Card Content */}
            <div className="glass-card rounded-3xl p-6 border border-slate-200/80 bg-white/95 shadow-sm hover:shadow-xl hover:border-indigo-300 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                      {item.organization}
                    </span>
                    {item.current && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Current Role
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {item.role}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 sm:text-right">
                  <div className="flex items-center gap-1 font-medium text-slate-700">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span>{item.period}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                {item.description}
              </p>

              {/* Achievements */}
              <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-50">
                {item.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 flex-shrink-0" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 mt-2">
                {item.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50/70 text-indigo-800 text-[11px] font-medium border border-indigo-100/60"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
