import React from 'react';
import { Wrench, Video, Mic, Music, Sliders, CheckCircle2 } from 'lucide-react';
import { productionPackageData } from '../data/productionPackage';

export const ToolRecommendationsSection: React.FC = () => {
  const tools = productionPackageData.toolRecommendations;

  const getIcon = (category: string) => {
    if (category.toLowerCase().includes('video')) return <Video className="w-5 h-5 text-amber-400" />;
    if (category.toLowerCase().includes('voice')) return <Mic className="w-5 h-5 text-emerald-400" />;
    if (category.toLowerCase().includes('score') || category.toLowerCase().includes('music')) return <Music className="w-5 h-5 text-indigo-400" />;
    return <Sliders className="w-5 h-5 text-rose-400" />;
  };

  return (
    <section id="pipeline" className="py-16 border-b border-slate-800/80 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1 flex items-center gap-1.5">
              <span>Production Pipeline</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>State-of-the-Art Creative Stack</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              🛠️ Recommended AI Tools &amp; Production Pipeline
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Curated workflow to take these prompts, audio cues, and script lines from storyboard to pristine 4K 60fps master delivery.
            </p>
          </div>
        </div>

        {/* 4 Tool Category Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-950 flex flex-col justify-between space-y-4 hover:border-slate-700 transition-colors shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                      {getIcon(item.category)}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block">Phase 0{idx + 1}</span>
                      <h3 className="text-base font-bold text-white font-display">{item.category}</h3>
                    </div>
                  </div>
                </div>

                {/* Primary Tool Highlight */}
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
                  <div className="text-[11px] font-medium text-slate-400">Industry Standard Pick:</div>
                  <div className="text-base font-extrabold text-amber-400 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>{item.primaryTool}</span>
                  </div>
                </div>

                {/* Pipeline Role */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.pipelineRole}
                </p>

                {/* Alternatives */}
                <div className="text-xs space-y-1">
                  <span className="text-slate-500 font-medium block">Tested Alternatives:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.alternativeTools.map((alt, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Settings Code Block */}
              <div className="pt-3 border-t border-slate-800/80">
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Recommended Configuration:</span>
                <code className="block p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-amber-300/90 whitespace-pre-wrap">
                  {item.recommendedSettings}
                </code>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
