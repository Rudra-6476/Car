import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Compass, Crosshair, ChevronRight, Wind, Zap, Shield, Gauge } from 'lucide-react';
import { carAudio } from '../utils/audioEngine';

interface CyberHeroStageProps {
  onScrollToSection: (sectionId: string) => void;
}

export const CyberHeroStage: React.FC<CyberHeroStageProps> = ({ onScrollToSection }) => {
  const [currentDegree, setCurrentDegree] = useState<number>(30);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const startDegreeRef = useRef<number>(30);

  // Sync with background 360 updates
  useEffect(() => {
    const handleAngleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === 'number') {
        setCurrentDegree(customEvent.detail);
      }
    };

    window.addEventListener('apex-angle-update', handleAngleUpdate);
    return () => window.removeEventListener('apex-angle-update', handleAngleUpdate);
  }, []);

  const dispatchAngle = (deg: number) => {
    const normalized = ((Math.round(deg) % 360) + 360) % 360;
    setCurrentDegree(normalized);
    window.dispatchEvent(new CustomEvent('apex-set-angle', { detail: normalized }));
  };

  // Pointer drag to spin car directly
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    startDegreeRef.current = currentDegree;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartXRef.current;
    // Sensitive horizontal drag sensitivity (0.6 deg per pixel)
    const newDegree = startDegreeRef.current + deltaX * 0.6;
    dispatchAngle(newDegree);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture already released
    }
  };

  return (
    <div className="relative my-8 sm:my-14 select-none">

      {/* 360 Turntable Drag Stage Surface */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="w-full h-64 sm:h-80 md:h-96 rounded-3xl relative flex items-center justify-center cursor-grab active:cursor-grabbing group"
        title="Click and drag horizontally to spin the hypercar in 360°"
      >

        {/* Subtle Cyberpunk Turntable Floor Ring */}
        <div className="absolute inset-x-8 sm:inset-x-24 bottom-6 h-28 rounded-full border border-red-500/25 bg-gradient-to-t from-red-950/20 via-transparent to-transparent pointer-events-none [transform:rotateX(72deg)] shadow-[0_0_40px_rgba(255,0,60,0.15)]" />
        <div className="absolute inset-x-16 sm:inset-x-36 bottom-8 h-20 rounded-full border border-dashed border-red-500/20 pointer-events-none [transform:rotateX(72deg)]" />

        {/* Floating Holographic Tech Hotspots on the Hypercar */}
        <div className="absolute inset-0 pointer-events-none">

          {/* Hotspot 1: Front Splitter */}
          <button
            onClick={() => onScrollToSection('aerodynamics')}
            className="absolute left-[15%] sm:left-[22%] top-[60%] sm:top-[65%] pointer-events-auto group/spot flex items-center gap-2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-105"
            title="Inspect Active Venturi Aerodynamics"
          >
            <div className="w-5 h-5 rounded-full bg-red-600/80 border border-white flex items-center justify-center shadow-[0_0_12px_#ff003c] animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-red-500/50 text-[10px] font-mono font-bold text-neutral-200 group-hover/spot:border-red-400 group-hover/spot:text-white backdrop-blur-md shadow-lg transition-colors">
              <Wind className="w-3 h-3 text-red-500" />
              <span>820KG AERO</span>
            </div>
          </button>

          {/* Hotspot 2: Mid-Engine Cowl */}
          <button
            onClick={() => onScrollToSection('powertrain')}
            className="absolute left-[50%] top-[40%] sm:top-[38%] pointer-events-auto group/spot flex items-center gap-2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-105"
            title="Inspect 1,050 BHP Hybrid Reactor"
          >
            <div className="w-5 h-5 rounded-full bg-red-600/80 border border-white flex items-center justify-center shadow-[0_0_12px_#ff003c] animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-red-500/50 text-[10px] font-mono font-bold text-neutral-200 group-hover/spot:border-red-400 group-hover/spot:text-white backdrop-blur-md shadow-lg transition-colors">
              <Zap className="w-3 h-3 text-red-500" />
              <span>1,050 BHP V8 REACTOR</span>
            </div>
          </button>

          {/* Hotspot 3: Carbon Cell Monocoque */}
          <button
            onClick={() => onScrollToSection('cockpit')}
            className="absolute right-[18%] sm:right-[24%] top-[50%] sm:top-[48%] pointer-events-auto group/spot flex items-center gap-2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-105"
            title="Inspect T1000 Carbon Monocoque"
          >
            <div className="w-5 h-5 rounded-full bg-red-600/80 border border-white flex items-center justify-center shadow-[0_0_12px_#ff003c] animate-pulse">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-red-500/50 text-[10px] font-mono font-bold text-neutral-200 group-hover/spot:border-red-400 group-hover/spot:text-white backdrop-blur-md shadow-lg transition-colors">
              <Shield className="w-3 h-3 text-red-500" />
              <span>T1000 CARBON TUB</span>
            </div>
          </button>

        </div>

        {/* Drag Helper Chip (Center Floating) */}
        <div className={`transition-opacity duration-300 pointer-events-none ${isDragging ? 'opacity-20' : 'opacity-85 group-hover:opacity-100'}`}>
          <div className="px-4 py-1.5 rounded-full bg-black/75 border border-red-500/40 text-[11px] font-mono text-neutral-300 backdrop-blur-md shadow-xl flex items-center gap-2">
            <RotateCw className="w-3.5 h-3.5 text-red-500 animate-spin" />
            <span className="font-bold text-white uppercase tracking-wider">DRAG OR SWIPE TO SPIN 360°</span>
          </div>
        </div>

      </div>

      {/* Interactive Turntable Scrub & Milestone Console */}
      <div className="max-w-2xl mx-auto px-4 font-mono">
        <div className="p-3 sm:p-4 rounded-2xl bg-[#08070e]/85 border border-red-500/30 backdrop-blur-xl shadow-2xl flex flex-col gap-3">

          {/* Degree Slider Bar */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-neutral-400 font-bold tracking-wider uppercase shrink-0">
              ORBIT AZIMUTH:
            </span>
            <input
              type="range"
              min="0"
              max="359"
              value={currentDegree}
              onChange={(e) => dispatchAngle(Number(e.target.value))}
              className="w-full h-1.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
            />
            <span className="text-sm font-black text-red-500 tabular-nums shrink-0 w-12 text-right">
              {String(currentDegree).padStart(3, '0')}°
            </span>
          </div>

          {/* Quick-Jump Milestone Buttons */}
          <div className="grid grid-cols-4 gap-2 pt-1 border-t border-white/5">
            {[
              { deg: 0, label: '0° FRONT' },
              { deg: 90, label: '90° SIDE' },
              { deg: 180, label: '180° REAR' },
              { deg: 270, label: '270° FLANK' },
            ].map((angle) => (
              <button
                key={angle.deg}
                onClick={() => dispatchAngle(angle.deg)}
                className={`py-1.5 rounded-lg text-[10px] sm:text-[11px] font-bold uppercase transition-all cursor-pointer border ${
                  Math.abs(currentDegree - angle.deg) < 18
                    ? 'bg-red-600 text-white border-red-400 shadow-[0_0_12px_rgba(255,0,60,0.5)]'
                    : 'bg-black/50 text-neutral-400 hover:text-white border-white/10 hover:border-red-500/40'
                }`}
              >
                {angle.label}
              </button>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
};
