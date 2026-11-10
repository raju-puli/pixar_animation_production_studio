import React from 'react';
import { Film, Download, Music, Volume2, VolumeX } from 'lucide-react';
import { audioEngine } from '../utils/audioEngine';

interface NavbarProps {
  onOpenExport: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenExport, isMusicPlaying, onToggleMusic }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Single text wordmark */}
        <a href="#" className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors">
          <Film className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="font-display">PIP &amp; DOT</span>
          <span className="text-slate-500 font-normal text-sm hidden sm:inline">| Animation Studio</span>
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a href="#animatic" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Animatic Reel</a>
          <a href="#scenes" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Scene Breakdown</a>
          <a href="#voiceover" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Voiceover Script</a>
          <a href="#audio" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">Music &amp; SFX</a>
          <a href="#pipeline" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">AI Pipeline</a>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMusic}
            aria-label={isMusicPlaying ? 'Mute background lullaby' : 'Play background lullaby'}
            title={isMusicPlaying ? 'Mute Score' : 'Play Ambient Score'}
            className={`p-2 rounded-lg border transition-all text-xs font-medium flex items-center gap-2 ${
              isMusicPlaying
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="hidden md:inline">Score Playing</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden md:inline">Audio Score</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenExport}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Package</span>
          </button>
        </div>
      </div>
    </header>
  );
};
