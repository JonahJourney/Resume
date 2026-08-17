import React, { useState, useEffect } from 'react';
import { Menu, X, Mail, Printer, Sparkles, ExternalLink, ArrowUpRight, Compass } from 'lucide-react';
import { useToast } from './Toast';

export default function Navbar({ activeSection, scrollProgress }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#hero' },
    { label: 'Experience', href: '#experience' },
    { label: 'Leadership', href: '#volunteering' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Languages', href: '#languages' },
    { label: 'Honours', href: '#awards' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('jonah.otoole@icloud.com');
    addToast('Email copied to clipboard: jonah.otoole@icloud.com');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-8 pt-4 pb-2 no-print">
      {/* Top micro progress line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100/50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 transition-all duration-75"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-6xl mx-auto">
        <nav
          className={`flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${
            isScrolled
              ? 'glass-panel shadow-lg shadow-slate-200/50 border border-slate-200/80 bg-white/80'
              : 'bg-white/60 backdrop-blur-md border border-slate-100'
          }`}
        >
          {/* Logo / Brand */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold font-display text-sm shadow-md group-hover:scale-105 transition-transform">
              JO
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Jonah O'Toole
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-none">
                Applied CS • Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-100/70 p-1 rounded-full border border-slate-200/40">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 hover:text-blue-600 hover:bg-white transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Action buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 border border-slate-200/80 rounded-full transition-all active:scale-95"
              title="Copy Email"
            >
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Copy Email</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-purple-600 hover:bg-purple-50/80 border border-slate-200/80 rounded-full transition-all active:scale-95"
              title="Print Clean Resume"
            >
              <Printer className="w-3.5 h-3.5 text-purple-600" />
              <span>Print CV</span>
            </button>

            <a
              href="#contact"
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-full shadow-sm hover:shadow-md hover:shadow-blue-500/20 transition-all active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>

        {/* Mobile menu dropdown */}
        {isOpen && (
          <div className="lg:hidden mt-2 p-4 glass-panel rounded-3xl shadow-xl border border-slate-200/90 bg-white/95 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-blue-50/80 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleCopyEmail();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium bg-slate-100 text-slate-800"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  Copy jonah.otoole@icloud.com
                </button>
                <button
                  onClick={() => {
                    handlePrint();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-medium bg-purple-50 text-purple-700 border border-purple-200"
                >
                  <Printer className="w-4 h-4 text-purple-600" />
                  Print Clean Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
