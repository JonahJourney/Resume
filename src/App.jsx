import React from 'react';
import { useScrollVelocity } from './hooks/useScrollVelocity';
import { ToastProvider } from './components/Toast';
import { ResumeDataProvider } from './context/ResumeDataContext';
import RetroHeader from './components/RetroHeader';
import RetroHero from './components/RetroHero';
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
import SecretEditorModal from './components/SecretEditorModal';

function MainApp() {
  const { velocity, smoothVelocity, progress } = useScrollVelocity();

  return (
    <div className="relative min-h-screen bg-[#F8F6F0] text-[#24221E] font-sans overflow-x-hidden pb-16 sm:pb-0">
      {/* Authentic Paper Grain & Retro Dot Overlays */}
      <div className="fixed inset-0 bg-retro-dots opacity-40 pointer-events-none z-0" />
      <div className="fixed inset-0 paper-grain pointer-events-none z-0" />

      {/* Secret Editor Toolbar & Passcode Listener (Hidden from normal visitors) */}
      <SecretEditorModal />

      {/* Koala Spirit Animal (4 Stationed Koalas along the bamboo) */}
      <KoalaScrollCompanion scrollProgress={progress} />

      {/* Mobile App Bottom Navigation Dock (<640px) */}
      <MobileAppDock />

      {/* Retro Document Top Bar */}
      <RetroHeader scrollProgress={progress} />

      {/* Main Document Content with generous editorial whitespace */}
      <main className="relative z-10 px-0 sm:pr-8 md:pr-0 divide-y divide-[#24221E]/10">
        <RetroHero smoothVelocity={smoothVelocity} />
        
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
      <ResumeDataProvider>
        <MainApp />
      </ResumeDataProvider>
    </ToastProvider>
  );
}
