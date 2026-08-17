import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, ArrowUp, Sparkles, CheckCircle2, MessageSquare, ExternalLink, Heart } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useToast } from './Toast';

export default function Contact() {
  const { personal } = resumeData;
  const { addToast } = useToast();

  const [subjectTopic, setSubjectTopic] = useState('Software Engineering Opportunity');
  const [senderName, setSenderName] = useState('');
  const [senderMsg, setSenderMsg] = useState('');

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    addToast(`${label} copied to clipboard!`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDraftEmail = (e) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subjectTopic}${senderName ? ` - ${senderName}` : ''}`);
    const mailtoBody = encodeURIComponent(
      `Hello Jonah,\n\n${senderMsg || "I reviewed your resume and portfolio and would love to connect regarding opportunities."}\n\nBest regards,\n${senderName || 'A Recruiter / Collaborator'}`
    );
    window.location.href = `mailto:${personal.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    addToast('Opening your default mail client...');
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
          <Send className="w-3.5 h-3.5 text-blue-600" />
          <span>Let's Build Something Great</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold font-display text-slate-900 tracking-tight">
          Get In Touch
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mt-2">
          Currently based in Leuven, Belgium. Open to software development internships, student tech roles, and collaborative projects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 bg-white/95 shadow-md space-y-6">
            <h3 className="text-lg font-bold font-display text-slate-900">
              Direct Contact Details
            </h3>

            {/* Email Card */}
            <div
              onClick={() => handleCopy(personal.email, 'Email address')}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-blue-50/60 hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-100/80 text-blue-600 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">Email Address</div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {personal.email}
                    </div>
                  </div>
                </div>
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
              </div>
            </div>

            {/* Phone Card */}
            <div
              onClick={() => handleCopy(personal.phone, 'Phone number')}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100/80 text-emerald-600 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-semibold">Mobile Phone</div>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      {personal.phone}
                    </div>
                  </div>
                </div>
                <Copy className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
              </div>
            </div>

            {/* Location Card */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-100/80 text-purple-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold">Home Base & Studies</div>
                  <div className="text-sm font-bold text-slate-900">
                    Leuven, Belgium (UCLL Campus)
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-200/60 text-xs text-slate-700 leading-relaxed">
              <span className="font-bold text-blue-900">🇨🇦 Canadian Citizen in Belgium:</span> Full eligibility for EU student internships, exchange, and multinational collaborations.
            </div>
          </div>
        </div>

        {/* Quick Message Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleDraftEmail}
            className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-200/80 bg-white/95 shadow-md space-y-5"
          >
            <div>
              <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>Send a Fast Message</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Choose a topic or draft a customized email directly to Jonah.
              </p>
            </div>

            {/* Topic selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Inquiry Topic</label>
              <div className="flex flex-wrap gap-2">
                {[
                  'Software Engineering Opportunity',
                  'Internship / Working Student',
                  'ESN / Student Leadership',
                  'Web Development Project',
                ].map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setSubjectTopic(topic)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      subjectTopic === topic
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Your Name / Organization</label>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Sarah Jenkins (Tech Recruiter)"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Custom Message (Optional)</label>
              <textarea
                rows={3}
                value={senderMsg}
                onChange={(e) => setSenderMsg(e.target.value)}
                placeholder="Hi Jonah, we came across your resume and would love to discuss..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Launch Mail Draft to jonah.otoole@icloud.com</span>
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
            JO
          </div>
          <span>© {new Date().getFullYear()} Jonah O'Toole. Built with React & Vite.</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 text-slate-400">
            Crafted for Light Mode Excellence ☀️
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 font-semibold transition-colors"
            title="Back to Top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </footer>
    </section>
  );
}
