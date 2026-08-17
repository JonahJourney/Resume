import React, { useRef, useEffect } from 'react';

/**
 * Scroll-Driven Retro Ticker Tape
 * Directly animated by scroll movement:
 * - Advances when scrolling down
 * - Reverses when scrolling back up
 * - Speed corresponds to how fast you scroll
 */
export default function RetroTicker({ smoothVelocity }) {
  const containerRef = useRef(null);
  const positionRef = useRef(0);

  const tickerPhrases = [
    "APPLIED COMPUTER SCIENCE @ UCLL (LEUVEN)",
    "CANADIAN CITIZEN • 9 YRS IN SWITZERLAND • 3 YRS IN BELGIUM",
    "OUTDOORS: HIKING • BIKING • PADDLE BOARDING • SNOWSHOES",
    "IT MANAGER @ ESN BELGIUM",
    "DUKE OF EDINBURGH GOLD AWARDEE",
    "BILINGUAL ENGLISH & FRENCH (NATIVE)",
    "SENIOR MOVIE EDITOR @ ISCM CRANS-MONTANA",
    "WEB DEVELOPER (ALL ABOUT WATER & GREEN UP)",
    "JAVA • TYPESCRIPT • PYTHON • SQL",
    "TEFL CERTIFIED TEACHER (TEACHER RECORD)",
    "ALPINE FIRST AID (AIR GLACIERS)",
  ];

  const displayItems = [...tickerPhrases, ...tickerPhrases, ...tickerPhrases];

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;

      // Move tape in direct proportion to scroll amount
      positionRef.current -= deltaY * 1.2;

      if (containerRef.current) {
        const totalWidth = containerRef.current.scrollWidth / 3;
        if (positionRef.current <= -totalWidth) {
          positionRef.current += totalWidth;
        } else if (positionRef.current > 0) {
          positionRef.current -= totalWidth;
        }
        containerRef.current.style.transform = `translateX(${positionRef.current}px)`;
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="w-full py-2.5 bg-[#141311] text-[#F8F6F0] border-y-2 border-[#141311] overflow-hidden select-none font-mono text-xs tracking-wider font-bold">
      <div
        ref={containerRef}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
        style={{ transition: 'transform 0.05s ease-out' }}
      >
        {displayItems.map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <span className="text-[#B8860B]">★</span>
            <span>{phrase}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
