import React, { useState, useEffect, useRef } from 'react';
import { Zap, Flame, Gauge, Cpu, Activity, Volume2, Shield, ArrowRight } from 'lucide-react';
import { carAudio } from '../utils/audioEngine';

export const CyberPowertrain: React.FC = () => {
  const [rpm, setRpm] = useState<number>(1000);
  const [isThrottling, setIsThrottling] = useState<boolean>(false);
  const [selectedDriveMode, setSelectedDriveMode] = useState<'STRADA' | 'SPORT' | 'CORSA' | 'QUALI'>('CORSA');
  const [boostPsi, setBoostPsi] = useState<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // Dynamic rev throttle loop
  useEffect(() => {
    const updateRpm = () => {
      setRpm((prev) => {
        const target = isThrottling
          ? (selectedDriveMode === 'QUALI' ? 9200 : selectedDriveMode === 'CORSA' ? 8800 : 7500)
          : 1000;
        const diff = target - prev;
        const step = isThrottling ? diff * 0.18 : diff * 0.08;
        const next = Math.max(1000, Math.min(9200, Math.round(prev + step)));

        // Boost calculation based on RPM
        const calculatedBoost = isThrottling ? Number(((next / 9200) * 28.5).toFixed(1)) : 0;
        setBoostPsi(calculatedBoost);

        return next;
      });

      animFrameRef.current = requestAnimationFrame(updateRpm);
    };

    animFrameRef.current = requestAnimationFrame(updateRpm);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isThrottling, selectedDriveMode]);

  const handleStartRev = () => {
    carAudio.init();
    carAudio.start();
    carAudio.setThrottle(true);
    setIsThrottling(true);
  };

  const handleStopRev = () => {
    carAudio.setThrottle(false);
    setIsThrottling(false);
  };

  const isRedline = rpm >= 8500;
  const rpmFraction = (rpm - 1000) / (9200 - 1000);

  return (
    <section id="powertrain" className="py-24 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cyber-hud-chip text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-4 border border-red-500/30">
              <Zap className="w-3.5 h-3.5" />
              <span>[ SECTION // 02 · HYBRID PROPULSION MATRIX ]</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight text-balance uppercase cyber-title">
              1,050 BHP Hybrid Reactor
            </h2>
            <p className="mt-4 text-neutral-200 text-sm sm:text-base max-w-2xl leading-relaxed cyber-body">
              Twin-turbocharged 4.0L flat-plane V8 fused with high-density axial-flux electric drive. Instantaneous 1,020 Nm electric torque fill with unrestricted 9,200 RPM top-end fury.
            </p>
          </div>

          {/* Drive Mode Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 cyber-hud-chip rounded-2xl border border-white/15 font-mono text-xs">
            {(['STRADA', 'SPORT', 'CORSA', 'QUALI'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSelectedDriveMode(mode)}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedDriveMode === mode
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(255,0,60,0.6)]'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Powertrain Grid: Interactive Rev Tachometer & Technical Blueprint Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Interactive Tachometer & V8 Dyno Simulator (7 Cols) */}
          <div className="lg:col-span-7 cyber-card cyber-corners rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between border border-red-500/30">
            {/* Tech Corner Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 font-mono text-xs">
              <span className="text-neutral-400 flex items-center gap-2">
                <Gauge className="w-4 h-4 text-red-500" />
                <span>REAL-TIME TELEMETRY GAUGE</span>
              </span>
              <span className={`px-2 py-0.5 rounded font-bold ${
                isRedline ? 'bg-red-600 text-white animate-pulse' : 'bg-red-950/60 text-red-400'
              }`}>
                {isRedline ? 'REDLINE OVERBOOST' : `MAP: ${selectedDriveMode}`}
              </span>
            </div>

            {/* Center Dynamic Tachometer Ring */}
            <div className="my-8 flex flex-col items-center justify-center relative">
              {/* Flame spit visualizer when redlining */}
              {isRedline && (
                <div className="absolute -top-6 inset-x-0 flex justify-center items-center gap-16 pointer-events-none">
                  <Flame className="w-12 h-12 text-yellow-400 animate-bounce filter drop-shadow-[0_0_20px_#ff003c]" />
                  <Flame className="w-12 h-12 text-red-500 animate-bounce filter drop-shadow-[0_0_20px_#ff003c]" />
                </div>
              )}

              {/* Digital Readout */}
              <div className="text-center">
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                  FLAT-PLANE V8 SPEED
                </span>
                <div className="text-6xl sm:text-7xl font-black font-mono tracking-tight text-white tabular-nums flex items-baseline justify-center gap-2">
                  {rpm}
                  <span className="text-2xl font-bold text-red-500 font-display">RPM</span>
                </div>
                <div className="mt-2 text-xs font-mono text-neutral-400">
                  BOOST: <span className="text-red-400 font-bold">{boostPsi} PSI</span> ·
                  KW: <span className="text-white font-bold">{Math.round((rpm / 9200) * 772)} kW</span>
                </div>
              </div>

              {/* RPM Progress Bar Strip */}
              <div className="w-full max-w-md mt-8">
                <div className="flex justify-between text-[11px] font-mono text-neutral-500 mb-2">
                  <span>1,000 (IDLE)</span>
                  <span>5,000 (TURBO SPOOL)</span>
                  <span className="text-red-500 font-bold">9,200 (CUTOFF)</span>
                </div>
                <div className="h-3 w-full bg-black/80 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-75 ${
                      isRedline
                        ? 'bg-gradient-to-r from-red-600 via-orange-500 to-yellow-300 shadow-[0_0_20px_#ff003c]'
                        : 'bg-gradient-to-r from-red-900 via-red-600 to-red-500'
                    }`}
                    style={{ width: `${rpmFraction * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Interactive Throttle Button */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs font-mono text-neutral-400 text-center sm:text-left">
                <span>PRESS & HOLD THROTTLE TO ACCELERATE / SPOOL TWIN TURBOS</span>
              </div>

              <button
                onMouseDown={handleStartRev}
                onMouseUp={handleStopRev}
                onMouseLeave={handleStopRev}
                onTouchStart={handleStartRev}
                onTouchEnd={handleStopRev}
                className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-mono text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 select-none ${
                  isThrottling
                    ? 'bg-red-600 text-white shadow-[0_0_35px_rgba(255,0,60,0.8)] scale-95'
                    : 'bg-red-950/80 hover:bg-red-900 text-white border border-red-500/60 shadow-[0_0_20px_rgba(255,0,60,0.3)]'
                }`}
              >
                <Flame className={`w-5 h-5 ${isThrottling ? 'text-yellow-300 animate-spin' : 'text-red-500'}`} />
                <span>{isThrottling ? 'HOLDING FULL THROTTLE...' : 'HOLD THROTTLE ACCELERATOR'}</span>
              </button>
            </div>
          </div>

          {/* Right: Powertrain Engineering Breakdown Bento (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">

            {/* Card 1: V8 ICE Specifications */}
            <div className="p-6 rounded-3xl cyber-card cyber-corners border border-red-500/20 hover:border-red-500/60 transition-all">
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 mb-2 font-bold">
                <Cpu className="w-4 h-4" />
                <span>INTERNAL COMBUSTION UNIT</span>
              </div>
              <h4 className="text-xl font-bold text-white font-display uppercase cyber-title">
                4.0L Twin-Turbo Flat-Plane V8
              </h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed font-sans cyber-body">
                Cast in aluminum alloy with dry-sump lubrication, 180-degree crankshaft architecture for rapid rev response, and lightweight titanium connecting rods.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-neutral-400 block text-[10px]">PEAK POWER</span>
                  <span className="text-white font-bold text-sm">800 BHP @ 9,000 RPM</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-neutral-400 block text-[10px]">TURBO BOOST</span>
                  <span className="text-white font-bold text-sm">28.5 PSI (TWIN VGT)</span>
                </div>
              </div>
            </div>

            {/* Card 2: 800V KERS Electric Drive */}
            <div className="p-6 rounded-3xl cyber-card cyber-corners border border-red-500/20 hover:border-red-500/60 transition-all">
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 mb-2 font-bold">
                <Zap className="w-4 h-4" />
                <span>800V KERS E-DRIVE MATRIX</span>
              </div>
              <h4 className="text-xl font-bold text-white font-display uppercase cyber-title">
                Dual Axial-Flux Motors
              </h4>
              <p className="mt-2 text-xs text-neutral-300 leading-relaxed font-sans cyber-body">
                F1-derived electric motors integrated on the front axle provide active all-wheel torque vectoring and fill gearshift power interruptions instantly.
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-neutral-400 block text-[10px]">ELECTRIC OUTPUT</span>
                  <span className="text-red-400 font-bold text-sm">250 BHP (185 kW)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/60 border border-white/10">
                  <span className="text-neutral-400 block text-[10px]">REGEN CAPACITY</span>
                  <span className="text-red-400 font-bold text-sm">150 kW UNDER BRAKING</span>
                </div>
              </div>
            </div>

            {/* Card 3: 8-Speed F1 Dual-Clutch */}
            <div className="p-6 rounded-3xl cyber-card cyber-corners border border-red-500/20 hover:border-red-500/60 transition-all">
              <div className="flex items-center gap-2 text-xs font-mono text-red-400 mb-2 font-bold">
                <Activity className="w-4 h-4" />
                <span>TRANSMISSION ARCHITECTURE</span>
              </div>
              <h4 className="text-xl font-bold text-white font-display uppercase cyber-title">
                8-Speed Dual-Clutch Gearbox
              </h4>
              <div className="mt-3 flex items-center justify-between text-xs font-mono text-neutral-200">
                <span>SHIFT TIME: <strong className="text-white">40 MILLISECONDS</strong></span>
                <span className="text-emerald-400 font-bold">ZERO TORQUE LOSS</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
