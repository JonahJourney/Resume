import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Copy, ArrowUp, ArrowUpRight } from 'lucide-react';
import { resumeData } from '../data/resumeData';
import { useToast } from './Toast';

export default function RetroContact() {
  const { personal } = resumeData;
  const { addToast } = useToast();

  const [topic, setTopic] = useState('Software Engineering Opportunity');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    addToast(`Copied ${label}: ${text}`);
  };

  const handleSendMail = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Jonah O'Toole Portfolio] ${topic}${name ? ` - ${name}` : ''}`);
    const body = encodeURIComponent(
      `Hello Jonah,\n\n${message || 'I reviewed your portfolio and resume record and would like to get in touch.'}\n\nFrom,\n${name || 'A Recruiter / Collaborator'}`
    );
    window.location.href = `mailto:${personal.email}?subject=${subject}&body=${body}`;
    addToast('Opening mail client...');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-20 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-8 pb-3 border-b-2 border-[#24221E]">
        <div className="text-xs font-mono font-bold tracking-widest text-[#B93826] uppercase">
          [ 07 / CORRESPONDENCE & TRANSMISSION ]
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#141311] tracking-tight mt-1">
          Get in Touch
        </h2>
        <p className="text-sm font-sans text-[#68645C] mt-1 max-w-xl">
          Based in Leuven, Belgium. Open to software engineering internships, working student positions, and technology collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Contact Info */}
        <div className="md:col-span-5 retro-paper p-6 sm:p-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase text-[#68645C] pb-2 border-b border-[#24221E]/15">
              // DIRECT CHANNELS
            </div>

            {/* Email */}
            <div
              onClick={() => handleCopy(personal.email, 'Email')}
              className="p-3 bg-[#F8F6F0] border border-[#24221E] hover:bg-[#EFECE2] cursor-pointer transition-colors group"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-[#68645C] uppercase font-bold">EMAIL:</span>
                <Copy className="w-3.5 h-3.5 text-[#68645C] group-hover:text-[#24221E]" />
              </div>
              <div className="font-bold text-[#141311] text-sm mt-1 truncate">
                {personal.email}
              </div>
            </div>

            {/* Phone */}
            <div
              onClick={() => handleCopy(personal.phone, 'Phone number')}
              className="p-3 bg-[#F8F6F0] border border-[#24221E] hover:bg-[#EFECE2] cursor-pointer transition-colors group"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[10px] text-[#68645C] uppercase font-bold">MOBILE:</span>
                <Copy className="w-3.5 h-3.5 text-[#68645C] group-hover:text-[#24221E]" />
              </div>
              <div className="font-bold text-[#141311] text-sm mt-1">
                {personal.phone}
              </div>
            </div>

            {/* Location */}
            <div className="p-3 bg-[#F8F6F0] border border-[#24221E]">
              <div className="font-mono text-[10px] text-[#68645C] uppercase font-bold">
                HOME BASE:
              </div>
              <div className="font-bold text-[#141311] text-sm mt-1 font-mono">
                Leuven, Belgium (UCLL)
              </div>
            </div>
          </div>

          <div className="p-3 border border-dashed border-[#1E4E79] text-[#1E4E79] font-mono text-xs">
            <span className="font-bold">ELIGIBILITY:</span> Canadian citizen resident in Belgium with active EU student status.
          </div>
        </div>

        {/* Transmission Form */}
        <div className="md:col-span-7 retro-paper p-6 sm:p-7">
          <form onSubmit={handleSendMail} className="space-y-4">
            <div className="text-xs font-mono font-bold uppercase text-[#68645C] pb-2 border-b border-[#24221E]/15">
              // DISPATCH MESSAGE DRAFT
            </div>

            <div className="space-y-1 font-mono text-xs">
              <label className="font-bold text-[#24221E] uppercase">Inquiry Topic</label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Software Internship',
                  'Web Development',
                  'ESN Collaboration',
                  'General Inquiry',
                ].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    className={`px-2.5 py-1 border border-[#24221E] text-xs transition-all ${
                      topic === t
                        ? 'bg-[#24221E] text-[#F8F6F0] font-bold'
                        : 'bg-[#FDFCF7] text-[#24221E] hover:bg-[#EFECE2]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1 font-mono text-xs">
              <label className="font-bold text-[#24221E] uppercase">Your Name & Org</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex (Engineering Recruiter)"
                className="w-full px-3 py-2 bg-[#F8F6F0] border border-[#24221E] text-xs text-[#24221E] placeholder-[#9E998E] focus:outline-none focus:bg-[#FFF]"
              />
            </div>

            <div className="space-y-1 font-mono text-xs">
              <label className="font-bold text-[#24221E] uppercase">Message Note</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Jonah, saw your portfolio and would like to talk about..."
                className="w-full px-3 py-2 bg-[#F8F6F0] border border-[#24221E] text-xs text-[#24221E] placeholder-[#9E998E] focus:outline-none focus:bg-[#FFF] resize-none font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#24221E] text-[#F8F6F0] font-mono text-xs font-bold tracking-wider hover:bg-[#B93826] transition-colors border border-[#24221E] shadow-retro-sm active:translate-x-[2px] active:translate-y-[2px]"
            >
              TRANSMIT DRAFT TO JONAH.OTOOLE@ICLOUD.COM →
            </button>
          </form>
        </div>
      </div>

      {/* Colophon Footer */}
      <footer className="mt-16 pt-6 border-t-2 border-[#24221E] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-[#68645C]">
        <div>
          © {new Date().getFullYear()} Jonah O'Toole • Typed in Leuven, Belgium.
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 font-bold text-[#24221E] hover:underline"
        >
          <span>TOP OF RECORD</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </footer>
    </section>
  );
}
