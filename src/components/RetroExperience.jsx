import React, { useState } from 'react';
import { ExternalLink, Calendar, MapPin, Check, ArrowUpRight } from 'lucide-react';
import { useResumeData } from '../context/ResumeDataContext';

export default function RetroExperience({ smoothVelocity }) {
  const { data, isEditMode, updateField } = useResumeData();
  const { experience } = data;
  const [filter, setFilter] = useState('all');

  const filteredExperience = experience.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const categories = [
    { id: 'all', label: 'ALL ENTRIES' },
    { id: 'tech', label: 'SOFTWARE & WEB' },
    { id: 'media', label: 'MEDIA & PRODUCTION' },
    { id: 'leadership', label: 'YOUTH LEADERSHIP' },
  ];

  return (
    <section id="experience" className="py-16 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-3 border-b-2 border-[#24221E] gap-4">
        <div>
          <div className="text-xs font-mono font-bold tracking-widest text-[#B93826] uppercase">
            [ 01 / WORK EXPERIENCE ]
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#141311] tracking-tight mt-1">
            Professional Roles & Engagements
          </h2>
        </div>

        {/* Retro Filter Switches */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs no-print">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-3 py-1 border border-[#24221E] transition-all ${
                filter === cat.id
                  ? 'bg-[#24221E] text-[#F8F6F0] font-bold shadow-retro-sm'
                  : 'bg-[#FDFCF7] text-[#24221E] hover:bg-[#EFECE2]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Entries */}
      <div className="space-y-6">
        {filteredExperience.map((job, idx) => {
          const originalIndex = experience.findIndex((j) => j.id === job.id);
          return (
            <div
              key={job.id}
              className="retro-paper p-6 sm:p-7 retro-paper-hover relative group"
            >
              {/* Top row: Dates & Type */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#24221E]/15 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#141311] bg-[#EFECE2] px-2.5 py-0.5 border border-[#24221E]/20">
                    {job.period}
                  </span>
                  <span className="text-[#68645C]">•</span>
                  <span className="text-[#68645C]">{job.location}</span>
                </div>

                <span className="text-[11px] font-bold uppercase text-[#B93826] tracking-wider">
                  {job.type}
                </span>
              </div>

              {/* Title & Company */}
              <div className="mt-4 mb-3 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h3 className="text-2xl font-serif text-[#141311] group-hover:text-[#1E4E79] transition-colors">
                    {job.role}
                  </h3>
                  <div className="text-sm font-semibold font-sans text-[#4A463E] mt-0.5">
                    {job.company}
                  </div>
                </div>

                {job.website && (
                  <a
                    href={job.website.startsWith('http') ? job.website : `https://${job.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#1E4E79] hover:underline"
                  >
                    <span>{job.website.replace(/^https?:\/\//, '')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Description (Editable) */}
              <p
                contentEditable={isEditMode}
                suppressContentEditableWarning={true}
                onBlur={(e) => updateField(`experience.${originalIndex}.description`, e.currentTarget.innerText)}
                className={`text-sm text-[#38352F] leading-relaxed font-sans mb-4 transition-all ${
                  isEditMode
                    ? 'outline-dashed outline-2 outline-[#B93826] bg-[#FDF8EE] p-1.5 rounded cursor-text'
                    : ''
                }`}
              >
                {job.description}
              </p>

              {/* Achievements Bullet Points (Editable) */}
              <div className="space-y-1.5 pt-2 border-t border-[#24221E]/10 font-sans text-xs text-[#24221E]">
                {job.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="font-mono text-[#B93826] font-bold mt-0.5">↳</span>
                    <span
                      contentEditable={isEditMode}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => updateField(`experience.${originalIndex}.achievements.${i}`, e.currentTarget.innerText)}
                      className={`leading-relaxed transition-all ${
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

              {/* Stamped Skill Tags */}
              <div className="flex flex-wrap gap-2 pt-4 mt-4 border-t border-[#24221E]/10 font-mono text-[11px]">
                {job.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2 py-0.5 bg-[#F8F6F0] border border-[#24221E]/30 text-[#24221E] font-medium"
                  >
                    #{skill}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
