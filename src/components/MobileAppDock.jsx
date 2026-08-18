import React, { useState, useEffect } from 'react';
import { User, Briefcase, GraduationCap, BookOpen, Award, Send, FileDown, ArrowUp } from 'lucide-react';

export default function MobileAppDock() {
  const [activeTab, setActiveTab] = useState('hero');

  const tabs = [
    { id: 'hero', label: 'Bio', icon: User },
    { id: 'experience', label: 'Work', icon: Briefcase },
    { id: 'volunteering', label: 'ESN', icon: GraduationCap },
    { id: 'writing', label: 'Essay', icon: BookOpen },
    { id: 'awards', label: 'Awards', icon: Award },
    { id: 'contact', label: 'Contact', icon: Send },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const tab of tabs) {
        const el = document.getElementById(tab.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(tab.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-3 left-3 right-3 z-50 sm:hidden select-none no-print">
      <div className="bg-[#FDFCF7]/95 backdrop-blur-md border-2 border-[#24221E] shadow-retro rounded-xl px-2 py-1.5 flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => scrollToSection(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-all active:scale-90 ${
                isActive
                  ? 'bg-[#24221E] text-[#F8F6F0] font-bold shadow-xs'
                  : 'text-[#68645C] hover:text-[#141311]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] font-mono leading-none mt-1">
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* Quick PDF button */}
        <a
          href="./Jonah-OToole-Resume.pdf"
          download="Jonah-OToole-Resume.pdf"
          className="flex flex-col items-center justify-center py-1 px-2 rounded-lg bg-[#B93826] text-[#F8F6F0] font-bold active:scale-90 transition-transform shadow-xs"
          title="Download PDF"
        >
          <FileDown className="w-4 h-4" />
          <span className="text-[9px] font-mono leading-none mt-1">CV</span>
        </a>
      </div>
    </div>
  );
}
