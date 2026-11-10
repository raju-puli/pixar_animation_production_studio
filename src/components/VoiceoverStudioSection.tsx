import React, { useState } from 'react';
import { Mic, Volume2, Play, Square, Sliders, Copy, Check, Sparkles } from 'lucide-react';
import { productionPackageData } from '../data/productionPackage';
import { speechNarrator } from '../utils/speechNarrator';

interface VoiceoverStudioSectionProps {
  showToast: (msg: string) => void;
}

export const VoiceoverStudioSection: React.FC<VoiceoverStudioSectionProps> = ({ showToast }) => {
  const [activeAuditionIndex, setActiveAuditionIndex] = useState<number | null>(null);
  const [speechRate, setSpeechRate] = useState<number>(0.88);
  const [speechPitch, setSpeechPitch] = useState<number>(0.95);
  const [copied, setCopied] = useState<boolean>(false);

  const vo = productionPackageData.voiceover;

  const handleAuditionLine = (index: number, text: string) => {
    if (activeAuditionIndex === index) {
      speechNarrator.stop();
      setActiveAuditionIndex(null);
      return;
    }

    setActiveAuditionIndex(index);
    speechNarrator.speak(text, {
      rate: speechRate,
      pitch: speechPitch,
      onEnd: () => setActiveAuditionIndex(null)
    });
  };

  const handleAuditionAll = () => {
    if (activeAuditionIndex !== null) {
      speechNarrator.stop();
      setActiveAuditionIndex(null);
      return;
    }

    const fullText = vo.fullScript.map(s => s.line).join(' ');
    setActiveAuditionIndex(99);
    speechNarrator.speak(fullText, {
      rate: speechRate,
      pitch: speechPitch,
      onEnd: () => setActiveAuditionIndex(null)
    });
  };

  const handleCopyScript = () => {
    const text = vo.fullScript.map(v => `[${v.timestamp}]\n"${v.line}"\n(Tone: ${v.direction})`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('Voiceover script copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="voiceover" className="py-16 border-b border-slate-800/80 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
              <span>Acoustic Direction</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Timed Storyteller Dialogue</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              🎙️ Timed Voiceover Script (0:00 - 0:20)
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Tuned to a warm, gentle storytelling cadence at ~110 words per minute, crafted to leave breathing space for music swells and sound effects.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAuditionAll}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeAuditionIndex === 99
                  ? 'bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
            >
              {activeAuditionIndex === 99 ? (
                <>
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Stop Audition</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Audition Full 20s VO</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyScript}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
              <span>{copied ? 'Copied Script' : 'Copy Script'}</span>
            </button>
          </div>
        </div>

        {/* Script Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Teleprompter Lines (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {vo.fullScript.map((item, idx) => {
              const isPlayingThis = activeAuditionIndex === idx;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all ${
                    isPlayingThis
                      ? 'bg-slate-900/90 border-amber-400/80 shadow-lg shadow-amber-500/10'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">
                        {item.timestamp}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">Scene {idx + 1}</span>
                    </div>

                    <button
                      onClick={() => handleAuditionLine(idx, item.line)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                        isPlayingThis
                          ? 'bg-amber-400 text-slate-950 font-bold'
                          : 'bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300'
                      }`}
                    >
                      {isPlayingThis ? (
                        <>
                          <Square className="w-3 h-3 fill-current" />
                          <span>Stop</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 fill-current" />
                          <span>Audition Line</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-base sm:text-lg font-semibold text-slate-100 leading-snug tracking-tight">
                    "{item.line}"
                  </p>

                  <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
                    <div>
                      <strong className="text-amber-300/80 font-medium">Director's Delivery Cue:</strong>{' '}
                      <span className="italic">{item.direction}</span>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px]">5.0 sec duration</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Voice Direction & Acoustic Specs Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            {/* Tone & Actor Profile */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Mic className="w-4 h-4" />
                <span>Voice Profile &amp; Tone</span>
              </div>

              <div className="space-y-3 text-xs text-slate-300">
                <div>
                  <span className="text-slate-500 font-medium block">Voice Character:</span>
                  <span className="font-semibold text-white">{vo.tone}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Narrator Persona:</span>
                  <span>{vo.narratorProfile}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Delivery Cadence:</span>
                  <span>{vo.targetPace}</span>
                </div>
                <div>
                  <span className="text-slate-500 font-medium block">Recommended Studio Chain:</span>
                  <span className="font-mono text-[11px] text-slate-400">{vo.microphoneChain}</span>
                </div>
              </div>
            </div>

            {/* Speech Audition Controls */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Sliders className="w-4 h-4" />
                <span>Live Audition Tuning</span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Playback Speed:</span>
                    <span className="font-mono text-amber-400">{speechRate.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.2"
                    step="0.02"
                    value={speechRate}
                    onChange={(e) => setSpeechRate(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>Soothing Bedtime</span>
                    <span>Standard</span>
                    <span>Brisk</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Vocal Pitch:</span>
                    <span className="font-mono text-amber-400">{speechPitch.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.2"
                    step="0.05"
                    value={speechPitch}
                    onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-0.5">
                    <span>Deep Warm</span>
                    <span>Neutral</span>
                    <span>Bright Storybook</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
