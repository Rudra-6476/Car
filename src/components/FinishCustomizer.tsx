import React from 'react';
import { CarColorFinish, WheelFinish } from '../types';
import { Palette, Check, Sparkles } from 'lucide-react';

interface FinishCustomizerProps {
  colorOptions: CarColorFinish[];
  activeColor: CarColorFinish;
  onSelectColor: (color: CarColorFinish) => void;
  wheelOptions: WheelFinish[];
  activeWheel: WheelFinish;
  onSelectWheel: (wheel: WheelFinish) => void;
}

export const FinishCustomizer: React.FC<FinishCustomizerProps> = ({
  colorOptions,
  activeColor,
  onSelectColor,
  wheelOptions,
  activeWheel,
  onSelectWheel,
}) => {
  return (
    <section id="finishes" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full cyber-hud-chip text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-4 border border-red-500/30">
            <Palette className="w-3.5 h-3.5" />
            <span>[ SECTION // 06 · CYBER ATELIER CONFIGURATOR ]</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight uppercase cyber-title">
            Bespoke Scarlet Finishes
          </h2>
          <p className="mt-4 text-neutral-200 text-sm sm:text-base leading-relaxed cyber-body">
            Multi-layer crimson lacquers, raw forged carbon weaves, and ceramic wheel caliper configurations engineered for nocturnal aesthetic supremacy.
          </p>
        </div>

        {/* Studio Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Column 1 & 2: Color Swatches Card */}
          <div className="lg:col-span-2 cyber-card cyber-corners rounded-3xl p-6 sm:p-8 border border-red-500/30 hover:border-red-500/60 shadow-2xl">
            <h3 className="text-xl font-bold text-white font-display mb-1 flex items-center justify-between cyber-title">
              <span>Exterior Paint Finishes</span>
              <span className="text-xs font-mono text-red-400 font-normal">
                {activeColor.name}
              </span>
            </h3>
            <p className="text-xs text-neutral-300 mb-6 cyber-body">
              Select a tailored finish to preview its reflections across the hypercar geometry.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {colorOptions.map((finish) => {
                const isSelected = activeColor.id === finish.id;
                return (
                  <button
                    key={finish.id}
                    onClick={() => onSelectColor(finish)}
                    className={`flex items-start gap-4 p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-red-500 bg-red-950/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                        : 'border-white/5 bg-black/40 hover:border-red-900/40 hover:bg-neutral-900/50'
                    }`}
                  >
                    {/* Color Swatch Orb */}
                    <div
                      className="w-12 h-12 rounded-xl shrink-0 shadow-lg relative flex items-center justify-center border border-white/20"
                      style={{
                        background: `radial-gradient(circle at 35% 30%, ${finish.secondaryHex} 0%, ${finish.hex} 70%, #1a0003 100%)`,
                      }}
                    >
                      {isSelected && <Check className="w-5 h-5 text-white drop-shadow" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-white truncate">
                          {finish.name}
                        </span>
                        {finish.matte && (
                          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-300">
                            Matte
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-red-400/90 font-mono mt-0.5">
                        {finish.subtitle}
                      </div>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                        {finish.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 3: Wheels & Brake Caliper Config */}
          <div className="cyber-card cyber-corners border border-red-500/30 hover:border-red-500/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div>
              <h3 className="text-xl font-bold text-white font-display mb-1 cyber-title">
                Forged Wheels & Ceramic Calipers
              </h3>
              <p className="text-xs text-neutral-300 mb-6 cyber-body">
                Lightweight center-lock aerospace alloy with carbon ceramic disc package.
              </p>

              <div className="space-y-3">
                {wheelOptions.map((wheel) => {
                  const isSelected = activeWheel.id === wheel.id;
                  return (
                    <button
                      key={wheel.id}
                      onClick={() => onSelectWheel(wheel)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-red-500 bg-red-950/30 shadow-[0_0_15px_rgba(220,38,38,0.25)]'
                          : 'border-white/5 bg-black/40 hover:border-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-7 h-7 rounded-lg border border-white/20 shadow-inner flex items-center justify-center"
                          style={{ backgroundColor: wheel.rimColor }}
                        >
                          <div
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: wheel.caliperColor }}
                          />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-white">
                            {wheel.name}
                          </div>
                          <div className="text-[11px] text-neutral-400 font-mono">
                            Caliper: {wheel.caliperColor === '#dc2626' ? 'Crimson Red' : 'Satin Black'}
                          </div>
                        </div>
                      </div>

                      {isSelected && <Check className="w-4 h-4 text-red-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Atelier Badge */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400 font-mono">
              <span>PAINT COATS: 7 LAYERS</span>
              <span className="text-red-400">CERAMIC COATED</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
