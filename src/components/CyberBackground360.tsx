import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RotateCw, Compass, Play, Pause, Crosshair, ChevronUp, ChevronDown, Maximize2, Minimize2 } from 'lucide-react';

export const CyberBackground360: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const targetTimeRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const [currentDegree, setCurrentDegree] = useState<number>(0);
  const [isAutoOrbit, setIsAutoOrbit] = useState<boolean>(false);
  const [isHudCollapsed, setIsHudCollapsed] = useState<boolean>(false);
  const isAutoOrbitRef = useRef<boolean>(false);
  const isManualOverrideRef = useRef<boolean>(false);
  const manualOverrideTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync ref with state for use inside animation frame loop
  useEffect(() => {
    isAutoOrbitRef.current = isAutoOrbit;
  }, [isAutoOrbit]);

  // Check initial screen width for mobile collapse default
  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      setIsHudCollapsed(true);
    }
  }, []);

  // Listen for global custom angle events (from Hero drag or section clicks)
  useEffect(() => {
    const handleSetAngleEvent = (e: Event) => {
      const customEvent = e as CustomEvent<number>;
      if (typeof customEvent.detail === 'number') {
        const deg = ((customEvent.detail % 360) + 360) % 360;
        setIsAutoOrbit(false);
        isAutoOrbitRef.current = false;
        isManualOverrideRef.current = true;

        if (manualOverrideTimerRef.current) clearTimeout(manualOverrideTimerRef.current);
        manualOverrideTimerRef.current = setTimeout(() => {
          isManualOverrideRef.current = false;
        }, 1800);

        if (videoRef.current && videoRef.current.duration) {
          const duration = videoRef.current.duration;
          targetTimeRef.current = (deg / 360) * duration;
          setCurrentDegree(deg);
        }
      }
    };

    window.addEventListener('apex-set-angle', handleSetAngleEvent);
    return () => window.removeEventListener('apex-set-angle', handleSetAngleEvent);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const handleScroll = () => {
      // If user is actively scrolling, allow smooth cinematic section orchestration
      if (isManualOverrideRef.current || isAutoOrbitRef.current) return;

      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const duration = video.duration || 10.005;

      if (docHeight <= 0) return;

      const progress = Math.min(1, Math.max(0, scrollY / docHeight));

      // Cinematic Section Angle Mapping:
      // Hero (0-15%): 0° to 45° (Front to 3/4)
      // Powertrain (15-40%): 45° to 90° (Flank Engine Profile)
      // Aero CFD (40-65%): 90° to 180° (Rear Wing & Diffuser)
      // Cockpit (65-85%): 180° to 270° (Cabin Monocoque)
      // Specs & Atelier (85-100%): 270° to 360° (Full wrap)
      let mappedAngle = 0;
      if (progress < 0.18) {
        mappedAngle = (progress / 0.18) * 45;
      } else if (progress < 0.42) {
        mappedAngle = 45 + ((progress - 0.18) / (0.42 - 0.18)) * 45; // 45 to 90
      } else if (progress < 0.68) {
        mappedAngle = 90 + ((progress - 0.42) / (0.68 - 0.42)) * 90; // 90 to 180
      } else if (progress < 0.88) {
        mappedAngle = 180 + ((progress - 0.68) / (0.88 - 0.68)) * 90; // 180 to 270
      } else {
        mappedAngle = 270 + ((progress - 0.88) / (1 - 0.88)) * 90; // 270 to 360
      }

      const deg = Math.round(mappedAngle) % 360;
      targetTimeRef.current = (deg / 360) * duration;
      setCurrentDegree(deg);

      // Dispatch global angle update for hero scrubber
      window.dispatchEvent(new CustomEvent('apex-angle-update', { detail: deg }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // High-performance RAF lerp loop with velvet-smooth deceleration
    const renderLoop = () => {
      if (videoRef.current && videoRef.current.duration) {
        const duration = videoRef.current.duration;

        if (isAutoOrbitRef.current) {
          // Continuous 360 degree turntable orbit (1 full rotation every 16 seconds)
          targetTimeRef.current = (targetTimeRef.current + 0.016 * (duration / 16)) % duration;
          currentTimeRef.current = targetTimeRef.current;
          videoRef.current.currentTime = currentTimeRef.current;

          const deg = Math.round((currentTimeRef.current / duration) * 360) % 360;
          setCurrentDegree(deg);
          window.dispatchEvent(new CustomEvent('apex-angle-update', { detail: deg }));
        } else {
          const diff = targetTimeRef.current - currentTimeRef.current;
          // Silk lerp factor (0.11 provides weighted luxury inertia without lag)
          if (Math.abs(diff) > 0.001) {
            currentTimeRef.current += diff * 0.11;
            videoRef.current.currentTime = currentTimeRef.current;
          }
        }
      }
      animFrameRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (manualOverrideTimerRef.current) clearTimeout(manualOverrideTimerRef.current);
    };
  }, []);

  // Jump to specific angle preset
  const jumpToAngle = useCallback((deg: number) => {
    setIsAutoOrbit(false);
    isAutoOrbitRef.current = false;
    isManualOverrideRef.current = true;

    if (manualOverrideTimerRef.current) clearTimeout(manualOverrideTimerRef.current);
    manualOverrideTimerRef.current = setTimeout(() => {
      isManualOverrideRef.current = false;
    }, 2200);

    if (videoRef.current && videoRef.current.duration) {
      const duration = videoRef.current.duration;
      targetTimeRef.current = (deg / 360) * duration;
      setCurrentDegree(deg);
      window.dispatchEvent(new CustomEvent('apex-angle-update', { detail: deg }));
    }
  }, []);

  // Calculate sector name based on degree
  const getSectorName = (deg: number): string => {
    if (deg >= 335 || deg < 25) return 'FRONT AERO FACIA';
    if (deg >= 25 && deg < 70) return 'STARBOARD 3/4 CANARD';
    if (deg >= 70 && deg < 115) return 'MID-ENGINE PROFILE';
    if (deg >= 115 && deg < 160) return 'AERO INTAKE & QUARTER';
    if (deg >= 160 && deg < 205) return 'REAR ACTIVE WING & DIFFUSER';
    if (deg >= 205 && deg < 250) return 'PORT 3/4 AERO BLADE';
    if (deg >= 250 && deg < 295) return 'DRIVER COCKPIT FLANK';
    return 'PORT FRONT 3/4 NOSE';
  };

  return (
    <>
      {/* Fixed Full-Screen Background 360 Video Layer */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#050408] select-none">

        {/* The 360-Degree Red Sports Car Video (Adaptive object-contain on mobile portrait to avoid cropping, object-cover on desktop) */}
        <video
          ref={videoRef}
          src="/car-scrub.mp4"
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain md:object-cover object-center pointer-events-none select-none transition-all duration-700"
          style={{
            filter: 'contrast(1.06) saturate(1.12)',
          }}
        />

        {/* Top Dark Obsidian Scrim (Blends seamlessly with navbar across all screens) */}
        <div className="absolute inset-x-0 top-0 h-44 sm:h-56 bg-gradient-to-b from-[#050408] via-[#050408]/80 to-transparent pointer-events-none" />

        {/* Bottom Ambient Vignette Floor (Softens edges and grounds the hypercar) */}
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-44 bg-gradient-to-t from-[#050408] via-[#050408]/75 to-transparent pointer-events-none" />

        {/* Bottom-Right Deep Obsidian Shield (100% physically blocks watermark on every screen size & resolution) */}
        <div className="absolute bottom-0 right-0 w-full max-w-[300px] sm:max-w-[480px] h-[220px] sm:h-[340px] bg-gradient-to-tl from-[#050408] via-[#050408]/95 to-transparent pointer-events-none" />
      </div>

      {/* Cyberpunk Tactical Radar & Telemetry HUD Station (Positioned Directly Over Watermark Area) */}
      <aside
        aria-label="360 Rotation Radar Telemetry Deck"
        className={`fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 transition-all duration-300 pointer-events-auto ${
          isHudCollapsed
            ? 'w-auto'
            : 'w-[calc(100vw-24px)] max-w-[340px] sm:max-w-[400px]'
        }`}
      >
        {isHudCollapsed ? (
          /* Minimized Compact Mode (Ideal for mobile or unobtrusive viewing while still covering the watermark) */
          <div className="bg-[#07050d] border border-red-500/70 shadow-[0_0_25px_rgba(255,0,60,0.4)] rounded-full px-3.5 py-2 flex items-center gap-3 font-mono text-xs text-neutral-200 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ff003c]" />
            <div className="flex items-center gap-1.5 font-bold tracking-wider">
              <span className="text-red-500">RADAR</span>
              <span className="text-white tabular-nums">{String(currentDegree).padStart(3, '0')}°</span>
            </div>
            <button
              onClick={() => setIsHudCollapsed(false)}
              className="p-1 rounded-md bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[10px] uppercase font-bold"
              title="Expand Full Radar Scope"
            >
              <span>EXPAND</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          /* Full Expanded Cyberpunk Radar Deck */
          <div className="bg-[#07050d] border border-red-500/70 shadow-[0_0_35px_rgba(255,0,60,0.35)] rounded-2xl cyber-corners overflow-hidden text-neutral-200 font-mono transition-all">

            {/* Top Status Ribbon */}
            <div className="flex items-center justify-between px-3 sm:px-3.5 py-1.5 bg-red-950/50 border-b border-red-500/40 text-[10px] tracking-wider uppercase">
              <div className="flex items-center gap-2 text-red-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ff003c]" />
                <span className="truncate">RADAR // ORBITAL ARRAY</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <span className="text-red-500 font-bold hidden xs:inline">[LOCKED]</span>
                <button
                  onClick={() => setIsHudCollapsed(true)}
                  className="p-0.5 rounded hover:bg-red-900/60 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                  title="Minimize HUD to Pill"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Radar Scope & Numerical Readouts */}
            <div className="p-3 sm:p-4 grid grid-cols-12 gap-3 items-center cyber-scanlines relative">

              {/* Rotating Radar Scope (5 Cols) */}
              <div className="col-span-5 flex flex-col items-center justify-center relative">
                <div className="w-20 h-20 sm:w-26 sm:h-26 rounded-full border border-red-500/50 bg-[#090812] relative overflow-hidden flex items-center justify-center shadow-[inset_0_0_15px_rgba(255,0,60,0.2)]">

                  {/* Concentric Radar Rings */}
                  <div className="absolute inset-1.5 sm:inset-2 rounded-full border border-red-500/25" />
                  <div className="absolute inset-4 sm:inset-5 rounded-full border border-red-500/20" />
                  <div className="absolute inset-7 sm:inset-8 rounded-full border border-dashed border-red-500/30" />

                  {/* Crosshair Lines */}
                  <div className="absolute inset-x-0 top-1/2 h-[1px] bg-red-500/30 -translate-y-1/2" />
                  <div className="absolute inset-y-0 left-1/2 w-[1px] bg-red-500/30 -translate-x-1/2" />

                  {/* Sweeping Radar Cone */}
                  <div
                    className="absolute inset-0 rounded-full animate-radar-sweep pointer-events-none"
                    style={{
                      background: 'conic-gradient(from 0deg, rgba(255, 0, 60, 0.45) 0deg, rgba(255, 0, 60, 0.05) 60deg, transparent 90deg)',
                    }}
                  />

                  {/* Dynamic Azimuth Vector Arm */}
                  <div
                    className="absolute inset-0 flex items-center justify-center transition-transform duration-75 pointer-events-none"
                    style={{
                      transform: `rotate(${currentDegree}deg)`,
                    }}
                  >
                    <div className="w-[1.5px] h-full flex flex-col justify-between items-center py-1">
                      <div className="w-2 h-2 rounded-full bg-red-500 border border-white shadow-[0_0_10px_#ff003c]" />
                      <div className="w-1 h-1 rounded-full bg-red-700/50" />
                    </div>
                  </div>

                  {/* Center Dot */}
                  <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-black border border-red-500 flex items-center justify-center shadow-[0_0_6px_#ff003c]">
                    <div className="w-1 h-1 rounded-full bg-red-400" />
                  </div>

                  {/* Cardinal Markers */}
                  <span className="absolute top-0.5 text-[7px] font-bold text-red-400/80">0°</span>
                  <span className="absolute right-1 text-[7px] font-bold text-red-400/80">90°</span>
                  <span className="absolute bottom-0.5 text-[7px] font-bold text-red-400/80">180°</span>
                  <span className="absolute left-1 text-[7px] font-bold text-red-400/80">270°</span>
                </div>

                <div className="text-[8px] sm:text-[9px] text-neutral-400 font-mono tracking-wider mt-1 flex items-center gap-1">
                  <Crosshair className="w-2.5 h-2.5 text-red-500" />
                  <span>AZIMUTH SCOPE</span>
                </div>
              </div>

              {/* Numerical Telemetry (7 Cols) */}
              <div className="col-span-7 flex flex-col justify-between space-y-1.5 text-left pl-1">
                <div>
                  <div className="flex items-center justify-between text-[9px] text-neutral-400 uppercase tracking-widest">
                    <span>ROTATION</span>
                    <span className="text-red-500 font-bold">360° SENSOR</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight flex items-baseline gap-1 tabular-nums mt-0.5">
                    <span className="text-red-500">{String(currentDegree).padStart(3, '0')}</span>
                    <span className="text-xs text-neutral-400 font-normal">DEG</span>
                  </div>
                </div>

                <div className="p-1 rounded bg-black/60 border border-red-950 flex flex-col">
                  <span className="text-[8px] text-neutral-500 uppercase tracking-wider">ACTIVE SECTOR</span>
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-wider truncate">
                    {getSectorName(currentDegree)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1 text-[8px] sm:text-[9px] text-neutral-400">
                  <div className="p-1 rounded bg-black/40 border border-white/5">
                    <span className="block text-neutral-500">FRAME</span>
                    <span className="font-bold text-white tabular-nums">
                      {Math.round((currentDegree / 360) * 240)}/240
                    </span>
                  </div>
                  <div className="p-1 rounded bg-black/40 border border-white/5">
                    <span className="block text-neutral-500">FPS</span>
                    <span className="font-bold text-emerald-400">60 LERP</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Quick Angle Presets & Auto Orbit */}
            <div className="px-2.5 sm:px-3 pb-2.5 pt-1 border-t border-red-950/80 bg-[#050409]">
              <div className="flex items-center justify-between gap-1 pt-1.5">

                <div className="grid grid-cols-4 gap-1 flex-1">
                  <button
                    onClick={() => jumpToAngle(0)}
                    className={`py-1 rounded text-[9px] font-bold uppercase transition-all cursor-pointer border ${
                      Math.abs(currentDegree - 0) < 15 || Math.abs(currentDegree - 360) < 15
                        ? 'bg-red-600 text-white border-red-400 shadow-[0_0_10px_rgba(255,0,60,0.5)]'
                        : 'bg-black/60 text-neutral-400 hover:text-white border-white/10 hover:border-red-500/50'
                    }`}
                  >
                    0° FRONT
                  </button>

                  <button
                    onClick={() => jumpToAngle(90)}
                    className={`py-1 rounded text-[9px] font-bold uppercase transition-all cursor-pointer border ${
                      Math.abs(currentDegree - 90) < 15
                        ? 'bg-red-600 text-white border-red-400 shadow-[0_0_10px_rgba(255,0,60,0.5)]'
                        : 'bg-black/60 text-neutral-400 hover:text-white border-white/10 hover:border-red-500/50'
                    }`}
                  >
                    90° SIDE
                  </button>

                  <button
                    onClick={() => jumpToAngle(180)}
                    className={`py-1 rounded text-[9px] font-bold uppercase transition-all cursor-pointer border ${
                      Math.abs(currentDegree - 180) < 15
                        ? 'bg-red-600 text-white border-red-400 shadow-[0_0_10px_rgba(255,0,60,0.5)]'
                        : 'bg-black/60 text-neutral-400 hover:text-white border-white/10 hover:border-red-500/50'
                    }`}
                  >
                    180° REAR
                  </button>

                  <button
                    onClick={() => jumpToAngle(270)}
                    className={`py-1 rounded text-[9px] font-bold uppercase transition-all cursor-pointer border ${
                      Math.abs(currentDegree - 270) < 15
                        ? 'bg-red-600 text-white border-red-400 shadow-[0_0_10px_rgba(255,0,60,0.5)]'
                        : 'bg-black/60 text-neutral-400 hover:text-white border-white/10 hover:border-red-500/50'
                    }`}
                  >
                    270° FLANK
                  </button>
                </div>

                <button
                  onClick={() => setIsAutoOrbit(!isAutoOrbit)}
                  title={isAutoOrbit ? 'Pause Auto Orbit' : 'Start Continuous 360° Orbit'}
                  className={`px-2 py-1 rounded text-[9px] font-bold uppercase transition-all cursor-pointer border flex items-center gap-1 ${
                    isAutoOrbit
                      ? 'bg-red-600 text-white border-red-400 shadow-[0_0_12px_rgba(255,0,60,0.8)]'
                      : 'bg-red-950/40 text-red-400 hover:bg-red-900/60 border-red-600/40'
                  }`}
                >
                  <RotateCw className={`w-2.5 h-2.5 ${isAutoOrbit ? 'animate-spin text-white' : 'text-red-500'}`} />
                  <span>{isAutoOrbit ? 'SPINNING' : 'AUTO'}</span>
                </button>

              </div>
            </div>

          </div>
        )}
      </aside>
    </>
  );
};
