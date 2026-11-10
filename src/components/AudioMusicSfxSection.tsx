import React, { useState } from 'react';
import { 
  Music, Volume2, Sparkles, Copy, Check, Disc, Play, 
  Square, Radio, Layers, Waves
} from 'lucide-react';
import { productionPackageData } from '../data/productionPackage';
import { audioEngine } from '../utils/audioEngine';

interface AudioMusicSfxSectionProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  showToast: (msg: string) => void;
}

export const AudioMusicSfxSection: React.FC<AudioMusicSfxSectionProps> = ({
  isMusicPlaying,
  onToggleMusic,
  showToast
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const music = productionPackageData.music;
  const sfxOverview = productionPackageData.sfxOverview;
  const scenes = productionPackageData.scenes;

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    showToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="audio" className="py-16 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
              <span>Sound Design &amp; Orchestration</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>84 BPM 3/4 Lullaby</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              🎵 Background Music &amp; Layered Sound Effects (SFX)
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              An enchanted, whimsical orchestral score combining celesta, concert harp, and pizzicato strings with three tactile sound design layers.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleMusic}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                isMusicPlaying
                  ? 'bg-amber-400 text-slate-950 font-bold hover:bg-amber-300'
                  : 'bg-slate-900 text-amber-400 border border-amber-500/30 hover:bg-slate-800'
              }`}
            >
              {isMusicPlaying ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isMusicPlaying ? 'Stop Web Audio Score' : 'Play Web Audio Score'}</span>
            </button>
          </div>
        </div>

        {/* Music Composition & AI Prompt (Top Split) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Left: Musical Architecture (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-amber-400" />
                  <h3 className="text-base font-bold text-white font-display">
                    "{music.title}"
                  </h3>
                </div>
                <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  {music.tempo}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-800/80 text-xs">
                <div>
                  <span className="text-slate-500 block font-medium">Genre &amp; Mood:</span>
                  <span className="text-slate-200 font-semibold">{music.genre}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-medium">Harmonic Key:</span>
                  <span className="text-slate-200 font-semibold">{music.key}</span>
                </div>
              </div>

              {/* Instrumentation List */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Core Orchestral Palette:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {music.instrumentation.map((inst, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-300 p-1.5 rounded bg-slate-900/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>{inst}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Musical Progression Timeline */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  Chronological Progression:
                </span>
                <div className="space-y-2">
                  {music.structure.map((st, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 text-xs space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-amber-400 font-bold">{st.time}</span>
                        <span className="font-semibold text-slate-200">{st.section}</span>
                      </div>
                      <p className="text-slate-400 text-[11px]">{st.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: AI Music Generator Prompt (Suno & Udio) (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Disc className="w-4 h-4 text-amber-400" />
                  <h3 className="text-base font-bold text-white font-display">
                    AI Music Generator Prompt (Suno v3.5 &amp; Udio)
                  </h3>
                </div>
                <button
                  onClick={() => handleCopy(music.sunoPrompt, 'Suno Music Prompt')}
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  {copiedKey === 'Suno Music Prompt' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'Suno Music Prompt' ? 'Copied' : 'Copy Prompt'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed">
                  {music.sunoPrompt}
                </pre>
              </div>

              {/* Udio Style Tags */}
              <div className="space-y-1.5 pt-2">
                <span className="text-xs text-slate-400 font-medium">Udio Style Tags (Comma-Separated):</span>
                <div className="flex flex-wrap gap-1.5">
                  {music.udioTags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs font-mono bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Interactive SFX Trigger Pad */}
              <div className="pt-4 border-t border-slate-800 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive SFX Trigger Audition</span>
                </div>
                <p className="text-xs text-slate-400">
                  Click to audition key sound effects synthesized in real time with Web Audio API:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  <button
                    onClick={() => {
                      audioEngine.playMagicSparkle(0.25);
                      showToast("Playing Pip's Bioluminescent Sparkle!");
                    }}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 text-left transition-all group"
                  >
                    <span className="text-xs font-bold text-white block group-hover:text-amber-400">Pip's Sparkle</span>
                    <span className="text-[10px] text-slate-500 block">Celesta &amp; chimes</span>
                  </button>

                  <button
                    onClick={() => {
                      audioEngine.playPitterPatter();
                      showToast("Playing Dot's Mossy Pitter-Patter!");
                    }}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 text-left transition-all group"
                  >
                    <span className="text-xs font-bold text-white block group-hover:text-amber-400">Moss Footfalls</span>
                    <span className="text-[10px] text-slate-500 block">Spongy bark clicks</span>
                  </button>

                  <button
                    onClick={() => {
                      audioEngine.playEmotionalChord();
                      showToast("Playing Reunion Climax Swell!");
                    }}
                    className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/40 text-left transition-all group"
                  >
                    <span className="text-xs font-bold text-white block group-hover:text-amber-400">Reunion Swell</span>
                    <span className="text-[10px] text-slate-500 block">G Major 9th resolve</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Layer Sound Design Master Sheet */}
        <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                Sound Design Architecture
              </div>
              <h3 className="text-lg font-bold text-white font-display">
                Tri-Layer Spatial Audio Cue Sheet (0:00 - 0:20)
              </h3>
            </div>
            <button
              onClick={() => {
                const sfxSheet = scenes.map(s => `SCENE ${s.id} (${s.timeRange}):\n` + s.sfxCues.map(c => `  [${c.timestamp}] ${c.cue} (${c.type})`).join('\n')).join('\n\n');
                handleCopy(sfxSheet, 'SFX Cue Sheet');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>Copy Full SFX Cue Sheet</span>
            </button>
          </div>

          {/* Three layers description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <span className="text-amber-400 font-bold block flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" /> Layer 1: Macro Foley
              </span>
              <p className="text-slate-300 leading-relaxed">{sfxOverview.foleyLayer}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <span className="text-emerald-400 font-bold block flex items-center gap-1.5">
                <Waves className="w-3.5 h-3.5" /> Layer 2: Twilight Ambience
              </span>
              <p className="text-slate-300 leading-relaxed">{sfxOverview.ambientLayer}</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
              <span className="text-indigo-400 font-bold block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Layer 3: Bioluminescent Magic
              </span>
              <p className="text-slate-300 leading-relaxed">{sfxOverview.magicalLayer}</p>
            </div>
          </div>

          {/* Timecode SFX Matrix */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-2.5 px-3">Timecode</th>
                  <th className="py-2.5 px-3">Scene</th>
                  <th className="py-2.5 px-3">Sound Effect Event</th>
                  <th className="py-2.5 px-3">Audio Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {scenes.flatMap(s => s.sfxCues.map(cue => ({ ...cue, sceneId: s.id, sceneTitle: s.title }))).map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/40">
                    <td className="py-2.5 px-3 font-mono text-amber-400 font-bold">{row.timestamp}</td>
                    <td className="py-2.5 px-3 font-medium text-white">Scene {row.sceneId} · {row.sceneTitle}</td>
                    <td className="py-2.5 px-3">{row.cue}</td>
                    <td className="py-2.5 px-3 text-slate-400 font-mono text-[11px]">{row.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
