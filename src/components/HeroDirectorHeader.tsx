import React from 'react';
import { Play, Sparkles, Sliders, Clock, Film, Layers } from 'lucide-react';
import { productionPackageData } from '../data/productionPackage';

interface HeroDirectorHeaderProps {
  onPlayReel: () => void;
  onJumpToScenes: () => void;
}

export const HeroDirectorHeader: React.FC<HeroDirectorHeaderProps> = ({ onPlayReel, onJumpToScenes }) => {
  const p = productionPackageData;

  return (
    <section className="relative pt-10 pb-12 border-b border-slate-800/80 overflow-hidden">
      {/* Subtle background ambient glow mimicking Pip's golden firefly aura */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Unboxed editorial kicker */}
        <div className="flex items-center gap-2 text-xs font-medium text-amber-400 mb-4 tracking-wide uppercase">
          <span>Pixar Animation Production Package</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>4K UHD 60fps</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Unreal Engine 5.4</span>
        </div>

        {/* Hero split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] font-display">
              Pip &amp; Dot: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-emerald-400">
                A Tiny Light in the Deep Woods
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {p.logline}
            </p>

            {/* Production Specifications - Clean unboxed text with subtle dividers */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-3 border-y border-slate-800 text-xs text-slate-400">
              <div>
                <span className="block text-slate-500 font-medium mb-0.5">Exact Runtime</span>
                <span className="text-slate-200 font-semibold text-sm font-mono tabular-nums">20.0s (4×5s)</span>
              </div>
              <div>
                <span className="block text-slate-500 font-medium mb-0.5">Fidelity Standard</span>
                <span className="text-slate-200 font-semibold text-sm">4K UHD @ 60fps</span>
              </div>
              <div>
                <span className="block text-slate-500 font-medium mb-0.5">Lighting &amp; GI</span>
                <span className="text-slate-200 font-semibold text-sm">UE5 Lumen GI</span>
              </div>
              <div>
                <span className="block text-slate-500 font-medium mb-0.5">Target AI Model</span>
                <span className="text-slate-200 font-semibold text-sm">Veo 2 / Sora</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onPlayReel}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-2.5 whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play 20s Interactive Animatic</span>
              </button>

              <button
                onClick={onJumpToScenes}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-sm transition-all flex items-center gap-2 whitespace-nowrap"
              >
                <Layers className="w-4 h-4 text-slate-400" />
                <span>Browse 4 Scene Prompts</span>
              </button>
            </div>
          </div>

          {/* Right column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl group">
              <img
                src={p.scenes[0].imageSrc}
                alt="Pip meets lost baby ladybug Dot under glowing twilight moss"
                className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">Scene 1 · 0:00 - 0:05</div>
                  <div className="text-sm font-bold text-white">Lost in the Dewdrops</div>
                </div>
                <div className="text-[11px] font-mono text-slate-400 bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded border border-slate-800">
                  4K UE5 Keyframe
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
