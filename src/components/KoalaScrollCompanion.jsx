import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Compass, Laptop, Award } from 'lucide-react';

/**
 * KoalaBambooWaypoints — 4 Stationed Koalas on the Bamboo Stalk
 * 
 * Each Koala is fixed at a specific milestone along the document bamboo:
 * 1. Top (Hero): "Spirit Animal" — Calm under pressure & easy to work with
 * 2. Section 01/02 (Work & Swiss Roots): "Alpine Explorer" — 9 years in Switzerland & outdoor sports
 * 3. Section 03/04 (ESN & UCLL): "Digital Craftsman" — IT Manager ESN Belgium & Applied CS
 * 4. Section 06 (Awards & Transit Essay): "DoE Gold & Transit Explorer" — Gold Award & urban mobility
 */
export default function KoalaScrollCompanion() {
  const [activeKoala, setActiveKoala] = useState(null);

  const koalas = [
    {
      id: 'spirit-animal',
      topOffset: '8%',
      title: 'Jonah’s Spirit Animal',
      subtitle: 'CALM & EASYGOING',
      badge: '🐨 01',
      bubble: "Hi there! I'm Jonah's spirit animal — always calm in tense situations, friendly, and very easy to work with!",
      accentColor: '#B93826',
      accessory: 'backpack',
    },
    {
      id: 'swiss-alps',
      topOffset: '32%',
      title: 'Alpine Explorer',
      subtitle: '9 YEARS IN SWITZERLAND',
      badge: '🇨🇭 02',
      bubble: "Spent 9 formative years in Switzerland! When not coding, you'll find Jonah alpine hiking, snowshoeing in Crans-Montana, biking, or paddle boarding!",
      accentColor: '#1E4E79',
      accessory: 'scarf',
    },
    {
      id: 'tech-esn',
      topOffset: '58%',
      title: 'Digital Craftsman',
      subtitle: 'ESN BELGIUM & UCLL',
      badge: '💻 03',
      bubble: "Managing nationwide digital systems as IT Manager for ESN Belgium, while building software in Applied Computer Science at UCLL Leuven!",
      accentColor: '#2A7B4C',
      accessory: 'glasses',
    },
    {
      id: 'gold-transit',
      topOffset: '84%',
      title: 'Gold Award & Transit Geek',
      subtitle: 'TRIPLE CROWN DOFE',
      badge: '🥇 04',
      bubble: "Duke of Edinburgh Gold Awardee & transit enthusiast! Passionate about human-scale cities, trains, and author of 'The Transatlantic Divide' essay.",
      accentColor: '#B8860B',
      accessory: 'medal',
    },
  ];

  const handleKoalaClick = (k, e) => {
    e.stopPropagation();
    setActiveKoala(activeKoala === k.id ? null : k.id);

    const rect = e.currentTarget.getBoundingClientRect();
    const xRatio = (rect.left + rect.width / 2) / window.innerWidth;
    const yRatio = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 35,
      spread: 55,
      origin: { x: xRatio, y: yRatio },
      colors: [k.accentColor, '#24221E', '#F8F6F0', '#B8860B'],
    });
  };

  return (
    <div className="absolute right-4 sm:right-8 top-0 bottom-0 z-30 select-none no-print pointer-events-none w-14">
      {/* Continuous Bamboo Stalk running down the entire page length */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3.5 bg-[#5A8F4C] border-x-2 border-[#24221E] shadow-sm flex flex-col justify-between py-12">
        {[...Array(40)].map((_, i) => (
          <div key={i} className="relative w-full h-1 bg-[#3E6B32] border-y border-[#24221E]">
            {i % 2 === 0 ? (
              <div className="absolute -left-3 -top-2 w-3.5 h-1.5 bg-[#6EA358] border border-[#24221E] rounded-full -rotate-45" />
            ) : (
              <div className="absolute -right-3 -top-2 w-3.5 h-1.5 bg-[#6EA358] border border-[#24221E] rounded-full rotate-45" />
            )}
          </div>
        ))}
      </div>

      {/* 4 Stationed Koalas hugging the bamboo */}
      {koalas.map((k) => (
        <div
          key={k.id}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-auto group cursor-pointer"
          style={{ top: k.topOffset }}
          onClick={(e) => handleKoalaClick(k, e)}
        >
          {/* Speech Bubble on Hover or Click */}
          <div
            className={`absolute right-16 top-1/2 -translate-y-1/2 w-56 sm:w-64 p-3.5 bg-[#FDFCF7] border-2 border-[#24221E] shadow-retro text-xs font-mono rounded-xs z-50 transition-all duration-200 ${
              activeKoala === k.id
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto'
            }`}
          >
            {/* Speech Header */}
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#24221E]/15">
              <span className="font-bold text-[11px]" style={{ color: k.accentColor }}>
                {k.badge} // {k.title}
              </span>
              <span className="text-[9px] text-[#68645C] font-semibold">{k.subtitle}</span>
            </div>

            {/* Bubble Content */}
            <p className="text-[#38352F] leading-snug font-sans text-xs">
              {k.bubble}
            </p>

            <div className="mt-2 pt-1.5 border-t border-[#24221E]/10 flex items-center justify-between text-[10px] text-[#68645C]">
              <span>🎋 Tap for confetti!</span>
              <span className="text-[#2A7B4C] font-bold">STATIONED KOALA</span>
            </div>
          </div>

          {/* Koala Vector Illustration hugging the bamboo */}
          <div className="w-16 h-20 relative filter drop-shadow-md hover:scale-110 active:scale-95 transition-transform">
            <svg viewBox="0 0 110 120" className="w-full h-full overflow-visible">
              {/* LAYER 1: BEHIND BAMBOO */}
              <g id="layer-behind">
                {/* Left Ear */}
                <circle cx="28" cy="24" r="16" fill="#8C8880" stroke="#24221E" strokeWidth="2.5" />
                <circle cx="28" cy="24" r="9.5" fill="#EAE5DC" />

                {/* Right Ear */}
                <circle cx="82" cy="24" r="16" fill="#8C8880" stroke="#24221E" strokeWidth="2.5" />
                <circle cx="82" cy="24" r="9.5" fill="#EAE5DC" />

                {/* Red Backpack / Accessory */}
                {k.accessory === 'backpack' && (
                  <rect x="38" y="56" width="34" height="26" rx="5" fill="#B93826" stroke="#24221E" strokeWidth="2.5" />
                )}
                {k.accessory === 'scarf' && (
                  <rect x="38" y="56" width="34" height="26" rx="5" fill="#1E4E79" stroke="#24221E" strokeWidth="2.5" />
                )}
                {k.accessory === 'glasses' && (
                  <rect x="38" y="56" width="34" height="26" rx="5" fill="#2A7B4C" stroke="#24221E" strokeWidth="2.5" />
                )}
                {k.accessory === 'medal' && (
                  <rect x="38" y="56" width="34" height="26" rx="5" fill="#B8860B" stroke="#24221E" strokeWidth="2.5" />
                )}

                {/* Back Torso */}
                <ellipse cx="55" cy="74" rx="24" ry="22" fill="#8C8880" stroke="#24221E" strokeWidth="2.5" />

                {/* Feet clasping */}
                <ellipse cx="36" cy="95" rx="8" ry="10" fill="#75716A" stroke="#24221E" strokeWidth="2.5" transform="rotate(-15 36 95)" />
                <ellipse cx="74" cy="95" rx="8" ry="10" fill="#75716A" stroke="#24221E" strokeWidth="2.5" transform="rotate(15 74 95)" />
              </g>

              {/* LAYER 2: BAMBOO SEGMENT PASSING THROUGH */}
              <g id="layer-bamboo">
                <rect x="47" y="0" width="16" height="120" fill="#5A8F4C" stroke="#24221E" strokeWidth="2.5" />
                <rect x="49" y="0" width="4" height="120" fill="#78B564" opacity="0.6" />
                <line x1="47" y1="35" x2="63" y2="35" stroke="#24221E" strokeWidth="2" />
                <line x1="47" y1="80" x2="63" y2="80" stroke="#24221E" strokeWidth="2" />
              </g>

              {/* LAYER 3: FRONT ARMS & PAWS HUGGING AROUND THE STALK */}
              <g id="layer-front-arms">
                {/* Left Arm Curve */}
                <path
                  d="M 28 56 C 24 64, 38 72, 54 68"
                  fill="none"
                  stroke="#8C8880"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  d="M 28 56 C 24 64, 38 72, 54 68"
                  fill="none"
                  stroke="#24221E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="55" cy="67" r="7.5" fill="#A19D94" stroke="#24221E" strokeWidth="2" />
                <circle cx="57" cy="65" r="2" fill="#24221E" />
                <circle cx="58" cy="69" r="2" fill="#24221E" />

                {/* Right Arm Curve */}
                <path
                  d="M 82 56 C 86 64, 72 74, 56 72"
                  fill="none"
                  stroke="#8C8880"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  d="M 82 56 C 86 64, 72 74, 56 72"
                  fill="none"
                  stroke="#24221E"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="54" cy="73" r="7.5" fill="#A19D94" stroke="#24221E" strokeWidth="2" />
                <circle cx="52" cy="71" r="2" fill="#24221E" />
                <circle cx="51" cy="75" r="2" fill="#24221E" />
              </g>

              {/* LAYER 4: HEAD, SNOUT & ACCESSORIES */}
              <g id="layer-head">
                <circle cx="55" cy="42" r="24" fill="#A19D94" stroke="#24221E" strokeWidth="2.5" />
                <circle cx="41" cy="48" r="4.5" fill="#E8B4B8" opacity="0.65" />
                <circle cx="69" cy="48" r="4.5" fill="#E8B4B8" opacity="0.65" />

                {/* Nose & Eyes */}
                <ellipse cx="55" cy="44" rx="8" ry="11" fill="#1C1B18" stroke="#24221E" strokeWidth="1.5" />
                <ellipse cx="53" cy="40" rx="2.5" ry="3.5" fill="#504C46" opacity="0.55" />
                <circle cx="43" cy="37" r="3.5" fill="#141311" />
                <circle cx="42" cy="36" r="1.2" fill="#FFF" />
                <circle cx="67" cy="37" r="3.5" fill="#141311" />
                <circle cx="66" cy="36" r="1.2" fill="#FFF" />

                {/* Special Accessory based on Koala Identity */}
                {k.accessory === 'glasses' && (
                  <g stroke="#24221E" strokeWidth="2" fill="rgba(255,255,255,0.4)">
                    <circle cx="43" cy="37" r="7" />
                    <circle cx="67" cy="37" r="7" />
                    <line x1="50" y1="37" x2="60" y2="37" />
                  </g>
                )}

                {k.accessory === 'medal' && (
                  <g transform="translate(55, 66)">
                    <circle cx="0" cy="0" r="5" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5" />
                    <text x="0" y="2.5" fontSize="5" textAnchor="middle" fill="#24221E" fontWeight="bold">★</text>
                  </g>
                )}

                {/* Fresh Leaf */}
                <g transform="translate(64, 47) rotate(-10)">
                  <path d="M0 6 Q9 -3 20 -4 Q13 6 0 6" fill="#3D9960" stroke="#24221E" strokeWidth="1.5" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}
