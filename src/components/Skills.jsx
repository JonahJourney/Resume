import React, { useState } from 'react';
import { Code2, Terminal, Cpu, Database, HardDrive, GitBranch, Gauge, Video, Sparkles, CheckCircle, Flame, Check } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Skills() {
  const { skills } = resumeData;
  const [activeTab, setActiveTab] = useState('all');

  const iconMap = {
    Code2: Code2,
    FileCode: Code2,
    Terminal: Terminal,
    Cpu: Cpu,
    Database: Database,
    HardDrive: HardDrive,
    GitBranch: GitBranch,
    Gauge: Gauge,
    Video: Video,
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Flame className="w-3.5 h-3.5 text-emerald-600" />
          <span>Core Capabilities</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
          Technical Skills & Strengths
        </h2>
        <p className="text-slate-500 text-sm mt-1 max-w-xl">
          A blend of object-oriented programming, modern web technologies, scalable relational databases, and demonstrated interpersonal strengths.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Technical & Programming Stack */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 bg-white/90 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-blue-600" />
                <span>Programming & Frameworks</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Applied computer science and full-stack software development.</p>
            </div>

            <div className="space-y-4">
              {skills.programming.map((skill, idx) => {
                const IconComponent = iconMap[skill.icon] || Code2;
                return (
                  <div key={idx} className="group">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1.5">
                      <div className="flex items-center gap-2">
                        <div className="p-1 rounded-md bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <IconComponent className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-slate-900 font-bold">{skill.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium hidden sm:inline">({skill.tag})</span>
                      </div>
                      <span className="text-blue-600 font-mono font-bold">{skill.level}%</span>
                    </div>

                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full transition-all duration-700 ease-out group-hover:brightness-110"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Tools, Systems & Media
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {skills.toolsAndDev.map((tool, tIdx) => {
                  const ToolIcon = iconMap[tool.icon] || HardDrive;
                  return (
                    <div
                      key={tIdx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70 hover:bg-blue-50/50 hover:border-blue-200 transition-all group/item"
                    >
                      <div className="flex items-center gap-2">
                        <ToolIcon className="w-4 h-4 text-slate-500 group-hover/item:text-blue-600 transition-colors" />
                        <div>
                          <div className="text-xs font-bold text-slate-800 leading-tight">{tool.name}</div>
                          <div className="text-[10px] text-slate-400">{tool.tag}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Soft Skills & Professional Attributes */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-3xl p-6 border border-slate-200/80 bg-white/90 shadow-sm space-y-4 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2 mb-1">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <span>Professional Attributes</span>
              </h3>
              <p className="text-xs text-slate-500">Key strengths from academic and organizational work.</p>
            </div>

            <div className="space-y-3.5 my-auto">
              {skills.softAndStrengths.map((strength, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50/40 via-white to-slate-50 border border-amber-100/80 hover:border-amber-300 transition-all group"
                >
                  <div className="flex items-start gap-2.5">
                    <div className="p-1 rounded-lg bg-amber-100 text-amber-700 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{strength.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5 leading-relaxed">{strength.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Education / TEFL highlight pill */}
            <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/70 text-rose-800 text-xs">
              <span className="font-bold">TEFL Certified Teacher:</span> Skilled in communicative pedagogy, clear structured instruction, and mentoring international students.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
