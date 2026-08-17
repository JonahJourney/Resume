import React from 'react';
import { Award, Medal, Crown, ExternalLink, Calendar, ShieldCheck, HeartPulse, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import confetti from 'canvas-confetti';

export default function Awards() {
  const { awards, certifications } = resumeData;

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#F59E0B', '#2563EB', '#10B981', '#7C3AED'],
    });
  };

  const getAwardIcon = (level) => {
    switch (level) {
      case 'Gold':
        return <Crown className="w-6 h-6 text-amber-500" />;
      case 'Silver':
        return <Medal className="w-6 h-6 text-slate-400" />;
      case 'Bronze':
        return <Award className="w-6 h-6 text-amber-700" />;
      default:
        return <Award className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <section id="awards" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Crown className="w-3.5 h-3.5 text-amber-600" />
            <span>International Recognitions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-slate-900 tracking-tight">
            Honours, Awards & Certifications
          </h2>
          <p className="text-slate-500 text-sm mt-1 max-w-xl">
            Triple Crown recipient of The Duke of Edinburgh's International Award, alongside accredited professional teaching and alpine rescue certifications.
          </p>
        </div>

        <button
          onClick={triggerConfetti}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100/80 border border-amber-200 text-amber-800 text-xs font-bold transition-all shadow-xs active:scale-95 no-print"
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Celebrate Achievements 🎉</span>
        </button>
      </div>

      {/* Duke of Edinburgh Showcase Grid */}
      <div className="space-y-6 mb-12">
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-200/70 bg-gradient-to-br from-white via-white to-amber-50/20 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-amber-100">
            <div>
              <span className="text-xs font-bold text-amber-800 bg-amber-100/70 px-3 py-1 rounded-full border border-amber-200">
                Global Youth Leadership Program
              </span>
              <h3 className="text-2xl font-extrabold font-display text-slate-900 mt-2">
                The Duke of Edinburgh's International Award
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                A prestigious global program for ages 14–24 that builds confidence and resilience through self-designed challenges in volunteering, physical fitness, skills, and expeditions. Completed Bronze, Silver, and Gold.
              </p>
            </div>

            <a
              href="https://www.dofe.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-amber-50 border border-amber-200 text-slate-800 text-xs font-semibold shadow-xs hover:border-amber-300 transition-all flex-shrink-0"
            >
              <span>Visit Official DoFE.org</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-600" />
            </a>
          </div>

          {/* 3 Award Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
            {awards.map((award) => (
              <div
                key={award.id}
                className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-amber-300 transition-all group relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-110 transition-transform">
                    {getAwardIcon(award.level)}
                  </div>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {award.date}
                  </span>
                </div>

                <h4 className="text-lg font-bold font-display text-slate-900 group-hover:text-amber-700 transition-colors">
                  {award.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="glass-card rounded-3xl p-6 border border-slate-200/80 bg-white/95 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    {cert.id === 'tefl' ? <BookOpen className="w-6 h-6" /> : <HeartPulse className="w-6 h-6" />}
                  </div>
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-1">
                      {cert.badge}
                    </span>
                    <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cert.title}
                    </h3>
                    <div className="text-xs font-semibold text-slate-700">
                      {cert.issuer}
                    </div>
                  </div>
                </div>

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-100/80 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors flex-shrink-0 group/link"
                    title="Verify Credential Online"
                  >
                    <ExternalLink className="w-4 h-4 group-hover/link:scale-110 transition-transform" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-medium text-slate-700">Issued: {cert.date}</span>
                {cert.credentialId && (
                  <>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono text-[11px] text-slate-500">ID: {cert.credentialId}</span>
                  </>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Qualification</span>
              </span>

              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
                >
                  <span>Verify on TeacherRecord.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <span className="text-xs text-slate-400 font-medium">Air Glaciers Rescue Certified</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
