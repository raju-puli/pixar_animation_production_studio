import React, { useState } from 'react';
import { 
  Camera, Sun, Sparkles, Copy, Check, Video, Eye, 
  Layers, Volume2, MessageSquareQuote, Maximize2, ExternalLink
} from 'lucide-react';
import { productionPackageData, SceneData } from '../data/productionPackage';

interface SceneBreakdownSectionProps {
  selectedSceneId: number;
  onSelectScene: (id: number) => void;
  showToast: (msg: string) => void;
}

export const SceneBreakdownSection: React.FC<SceneBreakdownSectionProps> = ({
  selectedSceneId,
  onSelectScene,
  showToast
}) => {
  const [promptTab, setPromptTab] = useState<'universal' | 'veo2' | 'sora' | 'midjourney'>('universal');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const scenes = productionPackageData.scenes;
  const currentScene = scenes.find(s => s.id === selectedSceneId) || scenes[0];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(label);
    showToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="scenes" className="py-16 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
              <span>Production Blueprints</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>4 Scenes × 5 Seconds</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              🎬 4K AI Video Prompts &amp; Scene Breakdown
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Engineered for Google Veo 2, OpenAI Sora, Runway Gen-3, and Unreal Engine 5 rendering at 60fps with Pixar feature animation quality.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const allPrompts = scenes.map(s => `--- SCENE ${s.id} (${s.timeRange}): ${s.title} ---\n${s.videoPrompt.universal}`).join('\n\n');
                handleCopy(allPrompts, 'All 4 Scene Prompts');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-2 transition-all hover:border-amber-500/50"
            >
              <Copy className="w-3.5 h-3.5 text-amber-400" />
              <span>Copy All 4 Video Prompts</span>
            </button>
          </div>
        </div>

        {/* 4 Scene Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {scenes.map((s) => {
            const isSelected = s.id === currentScene.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectScene(s.id)}
                className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500/80 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/30'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                {/* Active indicator bar */}
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-amber-400" />
                )}

                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className={`font-mono font-bold ${isSelected ? 'text-amber-400' : 'text-slate-400'}`}>
                    SCENE {s.id}
                  </span>
                  <span className="font-mono text-[11px] text-slate-500">
                    {s.timeRange}
                  </span>
                </div>
                <div className="text-sm font-bold text-white truncate">
                  {s.title}
                </div>
                <div className="text-xs text-slate-400 truncate mt-0.5">
                  {s.tagline}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Scene Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: 4K Visual Still & Cinematography Details (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Visual Frame */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-xl group">
              <img
                src={currentScene.imageSrc}
                alt={currentScene.title}
                className="w-full aspect-video object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/20 pointer-events-none" />

              {/* Badges on image */}
              <div className="absolute top-3 left-3 flex items-center gap-2 text-xs bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-md border border-slate-800 text-slate-300">
                <span className="text-amber-400 font-bold">Scene {currentScene.id}</span>
                <span className="text-slate-600">·</span>
                <span className="font-mono">{currentScene.timeRange}</span>
              </div>

              <button
                onClick={() => setLightboxImage(currentScene.imageSrc)}
                className="absolute top-3 right-3 p-2 bg-slate-950/80 hover:bg-slate-900 border border-slate-800 rounded-md text-slate-300 hover:text-white transition-colors"
                title="Expand 4K Keyframe"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <div className="text-lg font-bold text-white font-display">{currentScene.title}</div>
                  <div className="text-xs text-slate-300">{currentScene.tagline}</div>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  5.0s / 300 frames @ 60fps
                </div>
              </div>
            </div>

            {/* Technical Specifications Grid (Clean unboxed style) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cinematography Card */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  <Camera className="w-3.5 h-3.5" />
                  <span>Camera &amp; Optics</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block font-medium">Shot Type:</span>
                    <span>{currentScene.camera.shotType}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Camera Motion:</span>
                    <span>{currentScene.camera.motion}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Lens &amp; Aperture:</span>
                    <span className="font-mono">{currentScene.camera.lens}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Framing:</span>
                    <span>{currentScene.camera.framing}</span>
                  </div>
                </div>
              </div>

              {/* Lighting & Atmos Card */}
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  <Sun className="w-3.5 h-3.5" />
                  <span>Lighting &amp; Atmosphere</span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-300">
                  <div>
                    <span className="text-slate-500 block font-medium">Primary Source:</span>
                    <span>{currentScene.lighting.primary}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Ambient Wash:</span>
                    <span>{currentScene.lighting.ambient}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block font-medium">Atmospheric Effects:</span>
                    <span>{currentScene.lighting.atmosphere}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Character Performance & Micro-Acting */}
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 space-y-3">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-3.5 h-3.5" />
                <span>Character Performance &amp; Micro-Acting</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {currentScene.characters.map((c, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-slate-800/80 space-y-1">
                    <div className="font-bold text-white text-sm">{c.name}</div>
                    <div className="text-slate-400"><strong className="text-slate-300">Action:</strong> {c.action}</div>
                    <div className="text-slate-400"><strong className="text-slate-300">Emotion:</strong> {c.emotion}</div>
                    <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-800 mt-1">{c.details}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: AI Video Prompts & Copy Engine (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Prompt Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-white font-display">AI Video Generation Prompt</span>
                </div>
                <span className="text-xs font-mono text-slate-500">Scene {currentScene.id}</span>
              </div>

              {/* Model Selector Tabs */}
              <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg text-xs font-medium">
                <button
                  onClick={() => setPromptTab('universal')}
                  className={`flex-1 py-1.5 px-2 rounded-md transition-colors text-center ${
                    promptTab === 'universal'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Universal 4K
                </button>
                <button
                  onClick={() => setPromptTab('veo2')}
                  className={`flex-1 py-1.5 px-2 rounded-md transition-colors text-center ${
                    promptTab === 'veo2'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Veo 2
                </button>
                <button
                  onClick={() => setPromptTab('sora')}
                  className={`flex-1 py-1.5 px-2 rounded-md transition-colors text-center ${
                    promptTab === 'sora'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sora
                </button>
                <button
                  onClick={() => setPromptTab('midjourney')}
                  className={`flex-1 py-1.5 px-2 rounded-md transition-colors text-center ${
                    promptTab === 'midjourney'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Midjourney v6
                </button>
              </div>

              {/* Prompt Text Box */}
              <div className="relative">
                <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto selection:bg-amber-400 selection:text-slate-950">
                  {currentScene.videoPrompt[promptTab]}
                </pre>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => handleCopy(currentScene.videoPrompt[promptTab], `Scene ${currentScene.id} ${promptTab.toUpperCase()} Prompt`)}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    {copiedKey?.includes(`Scene ${currentScene.id}`) ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Active Prompt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Prompt engineering tips for this specific scene */}
              <div className="text-[11px] text-slate-400 border-t border-slate-800/80 pt-3 space-y-1">
                <span className="font-semibold text-slate-300 block">AI Video Prompt Parameters Included:</span>
                <code className="text-amber-300 font-mono block bg-slate-900/60 p-1.5 rounded border border-slate-800 text-[10px]">
                  --ar 16:9 --v 6.0, ultra-high definition, 4k resolution, cinematic lighting, photorealistic animation, crisp edges
                </code>
              </div>
            </div>

            {/* Sound FX Cues for this scene */}
            <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Scene {currentScene.id} Sound Effects (SFX) Cues</span>
                </span>
                <span className="font-mono text-slate-500">{currentScene.sfxCues.length} Cues</span>
              </div>

              <div className="space-y-2">
                {currentScene.sfxCues.map((sfx, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs p-2 rounded-lg bg-slate-900/50 border border-slate-800/70">
                    <span className="font-mono text-amber-400 font-bold shrink-0">{sfx.timestamp}</span>
                    <div className="flex-1">
                      <span className="text-slate-200">{sfx.cue}</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{sfx.type}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Director's Animation Notes */}
            <div className="p-4 rounded-2xl border border-slate-800/80 bg-slate-950/60 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <MessageSquareQuote className="w-3.5 h-3.5" />
                <span>Director's Animation Notes</span>
              </div>
              <p className="text-xs text-slate-300 italic leading-relaxed">
                "{currentScene.directorNotes}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img 
              src={lightboxImage} 
              alt="4K Scene Keyframe"
              className="w-full h-auto rounded-xl border border-slate-700 shadow-2xl" 
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 px-3 py-1 bg-slate-900/80 text-white rounded-lg border border-slate-700 text-xs font-medium hover:bg-slate-800"
            >
              Close (ESC)
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
