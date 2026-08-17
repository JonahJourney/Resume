import React from 'react';
import { Mail, Phone, MapPin, Globe, Sparkles, Download, ArrowRight, ShieldCheck, Award, Code, CheckCircle, ExternalLink, Copy } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useToast } from './Toast';

export default function Hero({ smoothVelocity }) {
  const { personal, stats } = resumeData;
  const { addToast } = useToast();

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copied: ${text}`);
  };

  // Subtle momentum skew based on scroll velocity (reversed on scroll up)
  const skewAngle = Math.max(Math.min(smoothVelocity * 2.5, 4), -4);
  const transformStyle = {
    transform: `perspective(1000px) skewY(${skewAngle * 0.4}deg)`,
    transition: 'transform 0.15s ease-out',
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div style={transformStyle} className="space-y-10">
        {/* Availability / Status Badge */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold shadow-xs animate-pulse-subtle">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-4" />
            <span>Available for Tech Opportunities</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>IT Manager @ ESN Belgium</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 text-xs font-medium">
            <span>🇨🇦 Canadian • 🇧🇪 Leuven, Belgium</span>
          </div>
        </div>

        {/* Main Title & Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-display tracking-tight text-slate-900 leading-[1.08]">
                Hi, I'm <span className="text-gradient">Jonah O'Toole</span>
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-600 leading-relaxed max-w-2xl">
                Applied Computer Science student at <span className="font-semibold text-slate-900">UCLL</span>, experienced Web Developer, and IT Manager for <span className="font-semibold text-blue-600">ESN Belgium</span>.
              </p>
            </div>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/70 shadow-xs">
              {personal.bio}
            </p>

            {/* Quick Contact & Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#experience"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all active:scale-95"
              >
                <span>Explore Experience</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-200 shadow-xs hover:border-slate-300 hover:-translate-y-0.5 transition-all"
              >
                <Mail className="w-4 h-4 text-blue-600" />
                <span>Get in Touch</span>
              </a>

              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-purple-50/80 hover:bg-purple-100 text-purple-700 font-semibold text-sm border border-purple-200/70 shadow-xs hover:-translate-y-0.5 transition-all"
              >
                <Download className="w-4 h-4 text-purple-600" />
                <span>Save / Print PDF</span>
              </button>
            </div>

            {/* Interactive Contact Badges */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                onClick={() => handleCopy(personal.email, 'Email')}
                className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-blue-50/60 border border-slate-200/80 text-xs font-medium text-slate-700 transition-all hover:border-blue-300 shadow-xs"
                title="Click to copy email"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>{personal.email}</span>
                <Copy className="w-3 h-3 text-slate-400 group-hover:text-blue-600 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={() => handleCopy(personal.phone, 'Phone number')}
                className="group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-emerald-50/60 border border-slate-200/80 text-xs font-medium text-slate-700 transition-all hover:border-emerald-300 shadow-xs"
                title="Click to copy phone"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>{personal.phone}</span>
                <Copy className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{personal.location}</span>
              </div>
            </div>
          </div>

          {/* Interactive Highlight Card */}
          <div className="lg:col-span-4">
            <div className="glass-card rounded-3xl p-6 relative overflow-hidden bg-gradient-to-br from-white via-white to-blue-50/30 border border-slate-200/90 shadow-xl">
              {/* Subtle decorative glow orb */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center font-extrabold font-display text-xl shadow-lg shadow-blue-500/20">
                      JO
                    </div>
                    <div>
                      <h2 className="font-bold text-slate-900 font-display text-base">Jonah O'Toole</h2>
                      <p className="text-xs text-blue-600 font-medium">Applied CS @ UCLL</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold">
                    🥇 DoE Gold
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">Current Studies:</span>
                    <span className="font-semibold text-slate-800">Applied Computer Science</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">University:</span>
                    <span className="font-semibold text-blue-700">UCLL (Leuven, BE)</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-slate-50">
                    <span className="text-slate-400">ESN Leadership:</span>
                    <span className="font-semibold text-slate-800">IT Manager (Belgium)</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="text-slate-400">Bilingual:</span>
                    <span className="font-semibold text-slate-800">English 🇨🇦 & French 🇫🇷</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://ucll.be"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100/90 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-semibold transition-all border border-slate-200/60 group"
                  >
                    <span>Visit UCLL Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Metric Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="glass-card p-4 sm:p-5 rounded-2xl border border-slate-200/80 bg-white/80 group hover:border-blue-300 transition-all"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-display text-slate-900 group-hover:text-blue-600 transition-colors">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-slate-700 mt-1">{stat.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{stat.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
