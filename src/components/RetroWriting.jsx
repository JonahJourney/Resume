import React, { useState } from 'react';
import { BookOpen, ExternalLink, Download, FileText, Compass, ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

export default function RetroWriting() {
  const [showFullAbstract, setShowFullAbstract] = useState(false);

  return (
    <section id="writing" className="py-20 sm:py-24 px-4 sm:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="mb-6 sm:mb-8 pb-3 border-b-2 border-[#24221E]">
        <div className="text-xs font-mono font-bold tracking-widest text-[#1E4E79] uppercase">
          [ ESSAYS, RESEARCH & CULTURAL INQUIRY ]
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif text-[#141311] tracking-tight mt-1">
          Personal Writing & Independent Research
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[#68645C] mt-1 max-w-2xl">
          Exploring ideas at the intersection of urban mobility, public infrastructure, and human-scale community design.
        </p>
      </div>

      {/* Essay Card */}
      <div className="retro-paper p-5 sm:p-8 retro-paper-hover space-y-5 relative">
        <div className="washi-tape washi-tape-blue -top-2.5 right-10 -rotate-2 hidden sm:block" />
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-[#24221E]/15">
          <div>
            <span className="rubber-stamp rubber-stamp-blue text-[10px] sm:text-[11px] mb-2">
              INDEPENDENT ESSAY & COMPARATIVE STUDY
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#141311] mt-1 leading-tight">
              The Transatlantic Divide
            </h3>
            <div className="text-xs sm:text-sm font-serif italic text-[#68645C] mt-0.5">
              A Comparative Analysis of Urban Planning, Mobility, and Culture in North America and Europe
            </div>
          </div>

          <div className="font-mono text-xs text-[#68645C] sm:text-right flex-shrink-0">
            <div>AUTHOR: Jonah O'Toole</div>
            <div className="text-[11px]">FORMAT: 13-Page Monograph</div>
          </div>
        </div>

        {/* Short Synopsis */}
        <p className="text-xs sm:text-sm text-[#38352F] leading-relaxed font-sans">
          Drawing on lived experience growing up with a foot on both continents—formative years in North America and nine years in Switzerland—this essay examines why two democratic, high-income regions produce fundamentally different sidewalk-level experiences. It began through a passion for public transportation and urban photography around Geneva, analyzing the regulatory, historical, and cultural choices that shape how we live.
        </p>

        {/* 3 Pillars Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs pt-1">
          <div className="p-3 bg-[#F8F6F0] border border-[#24221E]/20">
            <div className="font-bold text-[#B93826] text-[11px] uppercase mb-1">
              01 // The Automotive Paradigm
            </div>
            <p className="text-[11px] text-[#555] font-sans leading-snug">
              Vehicle physics, CAFE regulatory loopholes, and safety philosophies: American fortress mass vs. European pedestrian agility.
            </p>
          </div>

          <div className="p-3 bg-[#F8F6F0] border border-[#24221E]/20">
            <div className="font-bold text-[#1E4E79] text-[11px] uppercase mb-1">
              02 // The Built Environment
            </div>
            <p className="text-[11px] text-[#555] font-sans leading-snug">
              Rigid Euclidean single-use zoning vs. European mixed-use vitality, the missing-middle housing gap, and community wellness.
            </p>
          </div>

          <div className="p-3 bg-[#F8F6F0] border border-[#24221E]/20">
            <div className="font-bold text-[#2A7B4C] text-[11px] uppercase mb-1">
              03 // Infrastructure & Rail
            </div>
            <p className="text-[11px] text-[#555] font-sans leading-snug">
              Freight rail mastery vs. passenger high-speed networks, and the long-term economic solvency of municipal suburban sprawl.
            </p>
          </div>
        </div>

        {/* Expandable Abstract Excerpt */}
        {showFullAbstract && (
          <div className="p-4 bg-[#F8F6F0] border border-[#24221E]/30 rounded-xs font-sans text-xs text-[#24221E] space-y-2 animate-in fade-in duration-200">
            <div className="font-mono text-[10px] font-bold text-[#68645C] uppercase">
              EXCERPT FROM CHAPTER 1: "A TALE OF TWO CONTINENTS"
            </div>
            <blockquote className="italic border-l-2 border-[#1E4E79] pl-3 text-[#38352F] leading-relaxed">
              "For millions of North Americans, freedom was synonymous with a driver’s license, and the city itself was perceived as a series of isolated islands connected by asphalt rivers. In the Swiss context, the geography of life was radically compressed. Freedom was not granted at age sixteen with a set of keys; it was granted at age six with a pair of walking shoes and a transit pass."
            </blockquote>
          </div>
        )}

        {/* Action Controls */}
        <div className="pt-3 border-t border-[#24221E]/15 flex flex-wrap items-center justify-between gap-3 font-mono text-xs no-print">
          <button
            onClick={() => setShowFullAbstract(!showFullAbstract)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#68645C] hover:text-[#141311] transition-colors"
          >
            <span>{showFullAbstract ? 'HIDE EXCERPT' : 'VIEW ESSAY EXCERPT'}</span>
            {showFullAbstract ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <div className="flex items-center gap-2">
            <a
              href="./The-Transatlantic-Divide-Essay.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#24221E] text-[#F8F6F0] hover:bg-[#1E4E79] font-bold text-xs shadow-retro-sm transition-all active:translate-x-[1px] active:translate-y-[1px]"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>READ ESSAY [PDF]</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            <a
              href="./The-Transatlantic-Divide-Essay.pdf"
              download="Jonah-OToole-The-Transatlantic-Divide.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FDFCF7] border border-[#24221E] hover:bg-[#EFECE2] font-bold text-xs shadow-retro-sm transition-all"
              title="Download Essay PDF"
            >
              <Download className="w-3.5 h-3.5 text-[#2A7B4C]" />
              <span className="hidden sm:inline">DOWNLOAD</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
