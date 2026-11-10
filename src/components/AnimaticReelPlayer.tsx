import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Mic, MicOff, 
  Maximize2, ChevronRight, ChevronLeft, Sparkles, Check
} from 'lucide-react';
import { productionPackageData, SceneData } from '../data/productionPackage';
import { audioEngine } from '../utils/audioEngine';
import { speechNarrator } from '../utils/speechNarrator';

interface AnimaticReelPlayerProps {
  onSelectSceneInBreakdown: (sceneId: number) => void;
  showToast: (msg: string) => void;
}

export const AnimaticReelPlayer: React.FC<AnimaticReelPlayerProps> = ({ 
  onSelectSceneInBreakdown,
  showToast 
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0); // in seconds (0.0 to 20.0)
  const [voiceoverEnabled, setVoiceoverEnabled] = useState<boolean>(true);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(false);
  const [recentSfx, setRecentSfx] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const lastSpokenSceneRef = useRef<number | null>(null);

  const totalDuration = 20.0;
  const scenes = productionPackageData.scenes || [];
  const fullScript = productionPackageData.voiceover?.fullScript || [];

  // Ensure currentTime is a finite, valid number clamped between 0 and 19.999
  const safeTime = Number.isFinite(currentTime) ? Math.max(0, Math.min(19.999, currentTime)) : 0;
  const calculatedIndex = Math.floor(safeTime / 5.0);
  const activeSceneIndex = Math.max(0, Math.min(Math.max(0, scenes.length - 1), calculatedIndex));
  const activeScene: SceneData = scenes[activeSceneIndex] || scenes[0];

  // Active voiceover line with robust fallback
  const activeVo = fullScript[activeSceneIndex] || fullScript[0] || {
    timestamp: activeScene?.timeRange || "0:00 - 0:05",
    line: activeScene?.voScript?.text || "In the hush of twilight, little Dot felt all alone in the great big woods...",
    direction: activeScene?.voScript?.subtext || "Warm storytelling tone"
  };

  // Trigger voiceover when scene changes during playback
  useEffect(() => {
    if (isPlaying && voiceoverEnabled && activeVo?.line) {
      if (lastSpokenSceneRef.current !== activeSceneIndex) {
        lastSpokenSceneRef.current = activeSceneIndex;
        speechNarrator.speak(activeVo.line, {
          rate: 0.88,
          pitch: 0.95
        });
      }
    }
  }, [activeSceneIndex, isPlaying, voiceoverEnabled, activeVo]);

  // SFX cue detection
  useEffect(() => {
    const currentInt = Math.floor(safeTime);
    const timecodeStr = `0:${currentInt < 10 ? '0' : ''}${currentInt}`;
    
    // Find if there's an sfx at this second
    for (const scene of scenes) {
      const match = scene.sfxCues.find(s => s.timestamp === timecodeStr);
      if (match) {
        setRecentSfx(match.cue);
        // Play audio if applicable
        if (currentInt === 4 || currentInt === 8 || currentInt === 19) {
          audioEngine.playMagicSparkle(0.18);
        } else if (currentInt === 6) {
          audioEngine.playPitterPatter();
        } else if (currentInt === 16 || currentInt === 18) {
          audioEngine.playEmotionalChord();
        }
        break;
      }
    }
  }, [currentTime, scenes]);

  // Playback loop
  const updatePlayback = useCallback((timestamp: number) => {
    if (!lastTimestampRef.current) {
      lastTimestampRef.current = timestamp;
    }
    const delta = (timestamp - lastTimestampRef.current) / 1000;
    lastTimestampRef.current = timestamp;

    setCurrentTime((prev) => {
      const next = prev + delta;
      if (next >= totalDuration) {
        setIsPlaying(false);
        speechNarrator.stop();
        return totalDuration;
      }
      return next;
    });

    animFrameRef.current = requestAnimationFrame(updatePlayback);
  }, [totalDuration]);

  useEffect(() => {
    if (isPlaying) {
      lastTimestampRef.current = performance.now();
      animFrameRef.current = requestAnimationFrame(updatePlayback);
    } else {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      lastTimestampRef.current = null;
    }

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, updatePlayback]);

  const handleTogglePlay = () => {
    if (currentTime >= totalDuration) {
      setCurrentTime(0);
      lastSpokenSceneRef.current = null;
    }
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    if (nextState) {
      if (musicEnabled) {
        audioEngine.startLullabyScore();
      }
    } else {
      speechNarrator.stop();
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    lastSpokenSceneRef.current = null;
    speechNarrator.stop();
  };

  const handleSeek = (newTime: number) => {
    const validTime = Number.isFinite(newTime) ? newTime : 0;
    const clamped = Math.max(0, Math.min(totalDuration, validTime));
    setCurrentTime(clamped);
    lastSpokenSceneRef.current = null;
    if (voiceoverEnabled && isPlaying) {
      const newIndex = Math.max(0, Math.min(scenes.length - 1, Math.floor(clamped / 5.0)));
      const textToSpeak = scenes[newIndex]?.voScript?.text;
      if (textToSpeak) {
        speechNarrator.speak(textToSpeak);
      }
    }
  };

  const handleJumpToScene = (sceneIndex: number) => {
    handleSeek(sceneIndex * 5.0);
  };

  const toggleMusic = () => {
    const newState = !musicEnabled;
    setMusicEnabled(newState);
    if (newState && isPlaying) {
      audioEngine.startLullabyScore();
    } else {
      audioEngine.stopLullabyScore();
    }
    showToast(newState ? "Lullaby score unmuted" : "Lullaby score muted");
  };

  const toggleVoiceover = () => {
    const newState = !voiceoverEnabled;
    setVoiceoverEnabled(newState);
    if (!newState) {
      speechNarrator.stop();
    } else if (isPlaying) {
      speechNarrator.speak(activeVo.line);
    }
    showToast(newState ? "Voiceover narration enabled" : "Voiceover narration muted");
  };

  // Format time display (00:00:00)
  const formatTimecode = (sec: number) => {
    const s = Math.floor(sec);
    const frames = Math.floor((sec - s) * 60);
    return `00:${s < 10 ? '0' : ''}${s}:${frames < 10 ? '0' : ''}${frames}`;
  };

  return (
    <section id="animatic" className="py-12 border-b border-slate-800/80 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
              Interactive 20-Second Screening
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
              Animatic Storyboard &amp; Synced Dialogue Reel
            </h2>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span>20.0s Total Runtime</span>
            <span aria-hidden="true">·</span>
            <span>4 Scenes × 5.0s</span>
            <span aria-hidden="true">·</span>
            <span className="text-amber-400 font-mono">60 FPS Sync</span>
          </div>
        </div>

        {/* Video Monitor Frame */}
        <div 
          ref={containerRef}
          className={`relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl transition-all ${
            isFullscreen ? 'fixed inset-4 z-50 rounded-2xl flex flex-col justify-between' : ''
          }`}
        >
          {/* Main Visual Display Area */}
          <div className="relative aspect-video w-full overflow-hidden bg-slate-950 flex items-center justify-center">
            {/* Visual still with cinematic subtle zoom effect */}
            <img
              key={activeScene.id}
              src={activeScene.imageSrc}
              alt={activeScene.title}
              className={`w-full h-full object-cover transition-all duration-1000 ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
              referrerPolicy="no-referrer"
            />

            {/* Dark gradient vignette for cinema presence */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />

            {/* Top-left: Scene metadata overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-medium bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-slate-200">
              <span className="text-amber-400 font-bold">SCENE {activeScene.id}/4</span>
              <span className="text-slate-600">·</span>
              <span className="font-semibold text-white">{activeScene.title}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-mono">{activeScene.timeRange}</span>
            </div>

            {/* Top-right: Timecode and 4K UE5 badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-mono tabular-nums text-amber-300 font-semibold tracking-wider">
                {formatTimecode(currentTime)}
              </div>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
                title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* SFX trigger badge notification */}
            {recentSfx && isPlaying && (
              <div className="absolute top-16 right-4 max-w-xs bg-amber-500/10 border border-amber-500/30 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-amber-200 flex items-center gap-2 animate-fade-in shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="truncate font-mono">{recentSfx}</span>
              </div>
            )}

            {/* Bottom: Subtitle / Spoken Voiceover Bar */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="max-w-3xl mx-auto bg-slate-950/85 backdrop-blur-md border border-slate-800 rounded-xl px-5 py-3.5 shadow-2xl">
                <div className="flex items-center justify-between text-[11px] text-amber-400 font-medium mb-1 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5">
                    <Mic className="w-3.5 h-3.5" />
                    <span>Storyteller Voiceover · {activeScene.timeRange}</span>
                  </span>
                  <span className="text-slate-400 font-normal capitalize">
                    {activeScene.voScript.pacing}
                  </span>
                </div>
                <p className="text-sm sm:text-base font-medium text-slate-100 leading-snug">
                  "{activeVo?.line || activeScene?.voScript?.text || ''}"
                </p>
                <div className="text-[11px] text-slate-400 italic mt-1">
                  Direction: {activeVo?.direction || activeScene?.voScript?.subtext || 'Storyteller tone'}
                </div>
              </div>
            </div>
          </div>

          {/* Player Timeline & Control Console */}
          <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800/80 space-y-4">
            {/* 4-Scene Segmented Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>00:00</span>
                <span className="text-amber-400 font-bold">{formatTimecode(currentTime)} / 00:20:00</span>
                <span>00:20</span>
              </div>

              {/* Interactive Scrub Bar with 4 distinct scene regions */}
              <div 
                className="relative h-3 bg-slate-800 rounded-full overflow-hidden cursor-pointer group"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const ratio = clickX / rect.width;
                  handleSeek(ratio * totalDuration);
                }}
              >
                {/* 4 Scene background stripes */}
                <div className="absolute inset-0 grid grid-cols-4 divide-x divide-slate-900 pointer-events-none">
                  <div className="h-full bg-slate-800/50" />
                  <div className="h-full bg-slate-800/50" />
                  <div className="h-full bg-slate-800/50" />
                  <div className="h-full bg-slate-800/50" />
                </div>

                {/* Filled playhead track */}
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 rounded-full transition-all duration-75 relative"
                  style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                </div>
              </div>

              {/* 4 Scene Label Markers below the bar */}
              <div className="grid grid-cols-4 gap-1 text-[11px] text-slate-400 pt-1">
                {scenes.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => handleJumpToScene(idx)}
                    className={`text-left truncate px-1 py-0.5 rounded hover:bg-slate-800 transition-colors ${
                      activeSceneIndex === idx ? 'text-amber-400 font-semibold' : 'text-slate-400'
                    }`}
                  >
                    <span className="font-mono text-[10px] block opacity-70">Scene {s.id} ({s.timeRange})</span>
                    <span className="truncate">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Playback Transport & Audio Switches */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleTogglePlay}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all shadow-md"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>{currentTime >= totalDuration ? 'Replay Short' : 'Play Animatic'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-colors"
                  title="Reset to 00:00"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Scene step buttons */}
                <div className="flex items-center border border-slate-800 rounded-xl bg-slate-900 overflow-hidden">
                  <button
                    disabled={activeSceneIndex === 0}
                    onClick={() => handleJumpToScene(Math.max(0, activeSceneIndex - 1))}
                    className="p-2.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
                    title="Previous Scene"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-2 text-xs font-mono text-slate-400">
                    {activeScene.id} / 4
                  </span>
                  <button
                    disabled={activeSceneIndex === scenes.length - 1}
                    onClick={() => handleJumpToScene(Math.min(scenes.length - 1, activeSceneIndex + 1))}
                    className="p-2.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 transition-colors"
                    title="Next Scene"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Audio Controls */}
              <div className="flex items-center gap-2 text-xs">
                {/* Voiceover Speech Toggle */}
                <button
                  onClick={toggleVoiceover}
                  className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 transition-colors ${
                    voiceoverEnabled
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                  title={voiceoverEnabled ? 'Voiceover Active' : 'Voiceover Muted'}
                >
                  {voiceoverEnabled ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                  <span>{voiceoverEnabled ? 'Voiceover ON' : 'Voiceover OFF'}</span>
                </button>

                {/* Music Score Toggle */}
                <button
                  onClick={toggleMusic}
                  className={`px-3 py-2 rounded-xl border flex items-center gap-1.5 transition-colors ${
                    musicEnabled
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                  title={musicEnabled ? 'Ambient Score Active' : 'Score Muted'}
                >
                  {musicEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                  <span>{musicEnabled ? 'Music Score ON' : 'Music Score OFF'}</span>
                </button>

                {/* Inspect Current Scene Button */}
                <button
                  onClick={() => onSelectSceneInBreakdown(activeScene.id)}
                  className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 transition-colors hidden sm:flex items-center gap-1.5"
                >
                  <span>Inspect Scene {activeScene.id} Prompt</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
