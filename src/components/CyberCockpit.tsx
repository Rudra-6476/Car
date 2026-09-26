import React, { useState } from 'react';
import { Cpu, Eye, Gauge, Compass, Shield, Activity, Radio, Sparkles, Zap } from 'lucide-react';

export const CyberCockpit: React.FC = () => {
  const [hudActive, setHudActive] = useState<boolean>(true);
  const [activeTelemetryTab, setActiveTelemetryTab] = useState<'TELEMETRY' | 'G-FORCE' | 'BATTERY'>('TELEMETRY');
  const [overboostActive, setOverboostActive] = useState<boolean>(false);

  const triggerOverboost = () => {
    setOverboostActive(true);
    setTimeout(() => setOverboostActive(false), 3000);
  };

  return (
    <section id="cockpit" className="py-24 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cyber-hud-chip text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-4 border border-red-500/30">
              <Cpu className="w-3.5 h-3.5" />
              <span>[ SECTION // 04 · CYBERNETIC COCKPIT & CHASSIS ]</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight text-balance uppercase cyber-title">
              Neural Cockpit & Monocoque
            </h2>
            <p className="mt-4 text-neutral-200 text-sm sm:text-base max-w-2xl leading-relaxed cyber-body">
              Autoclaved T1000 carbon fiber tub with integrated F1 rectangular telemetry yoke. Augmented-reality holographic HUD projects apex vectors and sector delta times directly onto the windscreen.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={triggerOverboost}
              className={`px-6 py-3 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                overboostActive
                  ? 'bg-yellow-400 text-black shadow-[0_0_30px_#ffea00] scale-95'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_25px_rgba(255,0,60,0.6)]'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{overboostActive ? '⚡ OVERBOOST ARMED (1,050 HP)' : 'PUSH-TO-PASS OVERBOOST'}</span>
            </button>
          </div>
        </div>

        {/* Cockpit Experience Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Cybernetic F1 Yoke & Digital Cluster Interface (7 Cols) */}
          <div className="lg:col-span-7 cyber-card cyber-corners rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between border border-red-500/30">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
              <div className="flex items-center gap-2 text-red-500 font-bold">
                <Radio className="w-4 h-4 animate-pulse" />
                <span>HELM-LINK HUD MATRIX</span>
              </div>
              <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-lg">
                {(['TELEMETRY', 'G-FORCE', 'BATTERY'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTelemetryTab(tab)}
                    className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all ${
                      activeTelemetryTab === tab
                        ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(255,0,60,0.6)]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Central Holographic Cluster Display */}
            <div className="my-8 p-6 rounded-2xl bg-black/80 border border-red-950/80 relative overflow-hidden font-mono">
              {/* Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none scanlines opacity-20" />
              
              {activeTelemetryTab === 'TELEMETRY' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-500">LAP TIMER DELTA</span>
                    <span className="text-emerald-400 font-bold">-0.482S vs DELTA BEST</span>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 rounded-xl bg-[#120a15] border border-red-500/20">
                      <span className="text-[10px] text-neutral-400 block">FRONT SLIP</span>
                      <span className="text-lg font-bold text-white">1.2%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#120a15] border border-red-500/20">
                      <span className="text-[10px] text-neutral-400 block">REAR TRACTION</span>
                      <span className="text-lg font-bold text-red-400">98.8%</span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#120a15] border border-red-500/20">
                      <span className="text-[10px] text-neutral-400 block">TYRE TEMP (FL/FR)</span>
                      <span className="text-lg font-bold text-white">92°C / 94°C</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-[#120a15] border border-red-500/20 flex justify-between items-center text-xs">
                    <span className="text-neutral-400">BRAKE BIAS RATIO:</span>
                    <span className="text-white font-bold">54.5% FRONT / 45.5% REAR</span>
                  </div>
                </div>
              )}

              {activeTelemetryTab === 'G-FORCE' && (
                <div className="py-4 flex flex-col items-center justify-center">
                  <div className="w-40 h-40 rounded-full border border-dashed border-red-500/40 relative flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full border border-red-500/20 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-red-600 shadow-[0_0_15px_#ff003c] animate-ping" />
                    </div>
                    <span className="absolute top-2 text-[10px] text-neutral-500">1.8G MAX</span>
                    <span className="absolute bottom-2 text-[10px] text-neutral-500">BRAKE 2.2G</span>
                  </div>
                  <div className="mt-4 text-center text-xs text-neutral-300">
                    CURRENT LATERAL ACCELERATION: <strong className="text-red-400">1.65G</strong>
                  </div>
                </div>
              )}

              {activeTelemetryTab === 'BATTERY' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-400">800V KERS PACK STATE:</span>
                    <span className="text-emerald-400 font-bold">96% CAPACITY · 185 kW READY</span>
                  </div>
                  <div className="h-3 w-full bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-white/10">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-red-500 rounded-full w-[96%]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-black/60 border border-white/5">
                      <span className="text-[10px] text-neutral-500 block">CELL TEMP</span>
                      <span className="text-white font-bold">38.4°C (NOMINAL)</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-black/60 border border-white/5">
                      <span className="text-[10px] text-neutral-500 block">DISCHARGE DRAW</span>
                      <span className="text-red-400 font-bold">420A BURST PEAK</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* F1 Steering Wheel Specs */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-neutral-400">
              <span>F1 YOKE WITH DUAL ROTARY SWITCHES</span>
              <span className="text-red-400 font-bold">T1000 PRE-PREG CARBON</span>
            </div>
          </div>

          {/* Right: Chassis & Ergonomics Architecture (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            <div className="p-6 rounded-3xl cyber-card cyber-corners border border-red-500/20 hover:border-red-500/60 transition-all">
              <span className="text-xs font-mono text-red-500 block mb-1 font-bold">[ CHASSIS // 01 ]</span>
              <h4 className="text-lg font-bold text-white font-display uppercase cyber-title">T1000 Carbon Monocoque</h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed font-sans cyber-body">
                The entire passenger cell and roof structure are autoclaved in four separate carbon fiber weaves, yielding a torsional rigidity exceeding 45,000 Nm per degree with zero flex under 1.65G cornering loads.
              </p>
              <div className="mt-4 flex items-center justify-between text-xs font-mono text-neutral-200">
                <span>TUB MASS: <strong className="text-white">78.5 KG</strong></span>
                <span className="text-emerald-400 font-bold">FIA HOMOLOGATED</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl cyber-card cyber-corners border border-red-500/20 hover:border-red-500/60 transition-all">
              <span className="text-xs font-mono text-red-500 block mb-1 font-bold">[ ERGONOMICS // 02 ]</span>
              <h4 className="text-lg font-bold text-white font-display uppercase cyber-title">Fixed Seat & Movable Pedals</h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed font-sans cyber-body">
                Just like a Formula 1 car, the seats are integrated directly into the carbon chassis for the lowest possible center of gravity. The steering column and aluminum pedal box adjust to meet the driver.
              </p>
            </div>

            <div className="p-6 rounded-3xl cyber-card cyber-corners border border-red-500/20 hover:border-red-500/60 transition-all">
              <span className="text-xs font-mono text-red-500 block mb-1 font-bold">[ OPTICS // 03 ]</span>
              <h4 className="text-lg font-bold text-white font-display uppercase cyber-title">AR Heads-Up Windscreen</h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed font-sans cyber-body">
                Projects holographic braking cones, racing apex flags, and gearshift LED shift lights into the driver's forward field of view without taking eyes off the track.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
