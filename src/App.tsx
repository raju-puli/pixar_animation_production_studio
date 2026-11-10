import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroDirectorHeader } from './components/HeroDirectorHeader';
import { AnimaticReelPlayer } from './components/AnimaticReelPlayer';
import { SceneBreakdownSection } from './components/SceneBreakdownSection';
import { VoiceoverStudioSection } from './components/VoiceoverStudioSection';
import { AudioMusicSfxSection } from './components/AudioMusicSfxSection';
import { ToolRecommendationsSection } from './components/ToolRecommendationsSection';
import { ExportModal } from './components/ExportModal';
import { Footer } from './components/Footer';
import { audioEngine } from './utils/audioEngine';

export default function App() {
  const [selectedSceneId, setSelectedSceneId] = useState<number>(1);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2500);
  };

  const handleToggleMusic = () => {
    const newState = audioEngine.toggleScore();
    setIsMusicPlaying(newState);
    showToast(newState ? "Lullaby score unmuted" : "Lullaby score paused");
  };

  const handlePlayReelFromHero = () => {
    const animaticElem = document.getElementById('animatic');
    if (animaticElem) {
      animaticElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpToScenesFromHero = () => {
    const scenesElem = document.getElementById('scenes');
    if (scenesElem) {
      scenesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectSceneFromPlayer = (sceneId: number) => {
    setSelectedSceneId(sceneId);
    const scenesElem = document.getElementById('scenes');
    if (scenesElem) {
      scenesElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenExport={() => setIsExportOpen(true)}
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Hero Section */}
        <HeroDirectorHeader
          onPlayReel={handlePlayReelFromHero}
          onJumpToScenes={handleJumpToScenesFromHero}
        />

        {/* 20-Second Interactive Animatic Reel */}
        <AnimaticReelPlayer
          onSelectSceneInBreakdown={handleSelectSceneFromPlayer}
          showToast={showToast}
        />

        {/* 🎬 4 Scenes x 5 Seconds Breakdown & Prompts */}
        <SceneBreakdownSection
          selectedSceneId={selectedSceneId}
          onSelectScene={setSelectedSceneId}
          showToast={showToast}
        />

        {/* 🎙️ Voiceover Script & Audition Studio */}
        <VoiceoverStudioSection
          showToast={showToast}
        />

        {/* 🎵 Background Music & Layered SFX */}
        <AudioMusicSfxSection
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
          showToast={showToast}
        />

        {/* 🛠️ AI Tool Recommendations & Production Pipeline */}
        <ToolRecommendationsSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Export Package Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        showToast={showToast}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 border border-amber-500/50 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-2xl text-xs font-medium text-amber-200 flex items-center gap-2 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
