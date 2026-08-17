import React, { useState } from 'react';
import { Briefcase, ExternalLink, Calendar, MapPin, CheckCircle2, ChevronRight, Filter, Video, Code, Users } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Experience({ smoothVelocity }) {
  const { experience } = resumeData;
  const [filter, setFilter] = useState('all');

  const filteredExperience = experience.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const categories = [
    { id: 'all', label: 'All Roles', count: experience.length },
    { id: 'tech', label: 'Software & Web Dev', count: experience.filter(e => e.category === 'tech').length },
    { id: 'media', label: 'Media & Production', count: experience.filter(e => e.category === 'media').length },
    { id: 'leadership', label: 'Youth Leadership', count: experience.filter(e => e.category === 'leadership').length },
  ];

  // Subtle velocity dynamic offset
  const velocityOffset = Math.max(Math.min(smoothVelocity * 4, 10), -10);

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Work Experience
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Hands-on professional experience spanning web development, high-end video production, and youth leadership across Switzerland and Europe.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/60 no-print">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filter === cat.id
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Experience Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExperience.map((job, idx) => (
          <div
            key={job.id}
            className="glass-card rounded-3xl p-6 border border-slate-200/80 bg-white/90 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            style={{
              transform: `translateY(${velocityOffset * (idx % 2 === 0 ? 0.3 : -0.3)}px)`,
              transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="space-y-4">
              {/* Header Info */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 mb-2">
                    {job.type}
                  </span>
                  <h3 className="text-xl font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors">
                    {job.role}
                  </h3>
                  <div className="text-sm font-semibold text-slate-700 mt-0.5">
                    {job.company}
                  </div>
                </div>

                {job.website && (
                  <a
                    href={job.website.startsWith('http') ? job.website : `https://${job.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-100/80 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors flex-shrink-0 group/link"
                    title={`Visit ${job.company} Website`}
                  >
                    <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                  </a>
                )}
              </div>

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 pb-2 border-b border-slate-100">
                <div className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>{job.period}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{job.location}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {job.description}
              </p>

              {/* Key Achievements Bullet points */}
              <div className="space-y-2 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Key Contributions:</div>
                {job.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Tags Footer */}
            <div className="pt-5 mt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {job.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium group-hover:bg-blue-50 group-hover:text-blue-700 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {job.website && (
                <a
                  href={job.website.startsWith('http') ? job.website : `https://${job.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline ml-auto"
                >
                  <span>{job.website.replace(/^https?:\/\//, '')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
