import React from 'react';
import { Film, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-800 bg-slate-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Film className="w-4 h-4 text-amber-400" />
          <span className="font-bold text-slate-200">Pip &amp; Dot</span>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <span>A 20-Second 4K Animated Children's Short Film Production Package</span>
        </div>

        <div className="flex items-center gap-6 text-slate-400">
          <a href="#animatic" className="hover:text-amber-400 transition-colors">Animatic Reel</a>
          <a href="#scenes" className="hover:text-amber-400 transition-colors">4K Prompts</a>
          <a href="#voiceover" className="hover:text-amber-400 transition-colors">Dialogue Script</a>
          <a href="#audio" className="hover:text-amber-400 transition-colors">Soundtrack &amp; SFX</a>
          <a href="#pipeline" className="hover:text-amber-400 transition-colors">AI Pipeline</a>
        </div>

        <div className="text-slate-500">
          Crafted for Pixar-level storytelling and generative video direction.
        </div>
      </div>
    </footer>
  );
};
