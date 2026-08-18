import React from 'react';
import { useScrollVelocity } from './hooks/useScrollVelocity';
import { ToastProvider } from './components/Toast';
import RetroHeader from './components/RetroHeader';
import RetroHero from './components/RetroHero';
import RetroTicker from './components/RetroTicker';
import RetroExperience from './components/RetroExperience';
import RetroVolunteering from './components/RetroVolunteering';
import RetroEducation from './components/RetroEducation';
import RetroWriting from './components/RetroWriting';
import RetroSkills from './components/RetroSkills';
import RetroLanguages from './components/RetroLanguages';
import RetroAwards from './components/RetroAwards';
import RetroContact from './components/RetroContact';
import KoalaScrollCompanion from './components/KoalaScrollCompanion';
import MobileAppDock from './components/MobileAppDock';

function MainApp() {
  const { velocity, smoothVelocity, progress } = useScrollVelocity();

  return (
    <div className="relative min-h-screen bg-[#F8F6F0] text-[#24221E] font-sans overflow-x-hidden pb-16 sm:pb-0">
      {/* Authentic Paper Grain & Retro Dot Overlays */}
      <div className="fixed inset-0 bg-retro-dots opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 paper-grain pointer-events-none z-0" />

      {/* Koala Spirit Animal (Bamboo Climber on Desktop, Floating Widget on Mobile) */}
      <KoalaScrollCompanion scrollProgress={progress} />

      {/* Mobile App Bottom Navigation Dock (<640px) */}
      <MobileAppDock />

      {/* Retro Document Top Bar */}
      <RetroHeader scrollProgress={progress} />

      {/* Main Document Content */}
      <main className="relative z-10 px-0 sm:pr-8 md:pr-0">
        <RetroHero smoothVelocity={smoothVelocity} />
        
        <RetroTicker smoothVelocity={smoothVelocity} />
        
        <RetroExperience smoothVelocity={smoothVelocity} />
        
        <RetroVolunteering />
        
        <RetroEducation />
        
        <RetroWriting />
        
        <RetroSkills />
        
        <RetroLanguages />
        
        <RetroAwards />
        
        <RetroContact />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <MainApp />
    </ToastProvider>
  );
}
