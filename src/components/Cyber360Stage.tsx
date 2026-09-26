import React, { useState, useEffect, useRef } from 'react';
import { 
  RotateCw, 
  Compass, 
  Zap, 
  Wind, 
  Disc, 
  Cpu, 
  Crosshair, 
  Gauge, 
  Flame, 
  Maximize2, 
  Volume2, 
  ChevronRight,
  Shield,
  Layers,
  Sparkles
} from 'lucide-react';

interface Hotspot {
  id: string;
  title: string;
  code: string;
  category: string;
  angleTarget: number; // angle in degrees where this hotspot is most prominent
  x: number; // percentage
  y: number; // percentage
  stat: string;
  detail: string;
}

const CYBER_HOTSPOTS: Hotspot[] = [
  {
    id: 'aero-splitter',
    title: 'Active DRS Ground Splitter',
    code: 'SYS // 01-AERO',
    category: 'Aerodynamics',
    angleTarget: 0,
    x: 50,
    y: 72,
    stat: '820 KG DOWNFORCE',
    detail: 'Electro-actuated carbon composite splitter channels high-velocity airflow under ventral venturi tunnels, generating vacuum suction without parasitic drag.'
  },
  {
    id: 'powertrain-reactor',
    title: 'Twin-Turbo V8 + KERS Hybrid Reactor',
    code: 'SYS // 02-PWR',
    category: 'Powertrain',
    angleTarget: 180,
    x: 48,
    y: 42,
    stat: '1,050 BHP / 9,200 RPM',
    detail: 'Twin-turbocharged 4.0L flat-plane V8 paired with dual axial-flux electric motors. Instant torque fill eliminates turbo lag with 0–60 in 2.05 seconds.'
  },
  {
    id: 'carbon-brakes',
    title: 'Brembo CCM-R 398mm Carbon Ceramics',
    code: 'SYS // 03-BRK',
    category: 'Chassis & Braking',
    angleTarget: 90,
    x: 28,
    y: 65,
    stat: '100–0 MPH IN 2.1S',
    detail: 'Formulated with chopped carbon fiber matrix and ceramic resin. Paired with 6-piston monobloc calipers in signature Giallo Modena yellow.'
  },
  {
    id: 'cockpit-neural',
    title: 'Biometric Cyber Cockpit Tub',
    code: 'SYS // 04-CKPT',
    category: 'Interior Interface',
    angleTarget: 270,
    x: 52,
    y: 35,
    stat: 'F1 YOKE + HUD HUD-X7',
    detail: 'Pre-preg carbon fiber survival cell bonded directly to the powertrain. Features F1-style rectangular yoke with integrated OLED telemetry display.'
  },
];

interface Cyber360StageProps {
  onIgniteEngine?: () => void;
  isEngineRevving?: boolean;
}

export const Cyber360Stage: React.FC<Cyber360StageProps> = ({ 
  onIgniteEngine,
  isEngineRevving = false 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAngle, setCurrentAngle] = useState<number>(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(CYBER_HOTSPOTS[0]);
  const [isAutoRotate, setIsAutoRotate] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [dragStartAngle, setDragStartAngle] = useState<number>(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState<boolean>(false);
  const [hudScanline, setHudScanline] = useState<boolean>(true);

  const targetAngleRef = useRef<number>(0);
  const currentAngleRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const isSeekingRef = useRef<boolean>(false);

  const VIDEO_DURATION = 10.0; // 10s video = 360° turn

  // 1. Scroll-driven angle synchronization
  useEffect(() => {
    const handleScroll = () => {
      if (isAutoRotate || isDragging) return;

      const scrollY = window.scrollY;
      const docHeight = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
      );
      const scrollFraction = Math.min(Math.max(scrollY / docHeight, 0), 1);
      
      // 2 full 360° rotations across total page scroll
      const calculatedAngle = (scrollFraction * 720) % 360;
      targetAngleRef.current = calculatedAngle;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAutoRotate, isDragging]);

  // 2. Ultra-smooth 60fps lerp loop to seek video frame to targetAngle
  useEffect(() => {
    let lastRenderedAngle = -1;

    const tick = () => {
      const video = videoRef.current;

      if (isAutoRotate) {
        if (video) {
          if (video.paused) video.play().catch(() => {});
          const deg = Math.round((video.currentTime / VIDEO_DURATION) * 360) % 360;
          setCurrentAngle(deg);
          currentAngleRef.current = deg;
          targetAngleRef.current = deg;
        }
      } else {
        if (video && !video.paused) {
          video.pause();
        }

        // Lerp angle smoothly
        let diff = targetAngleRef.current - currentAngleRef.current;
        // Wrap around shortest distance for 360°
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;

        if (Math.abs(diff) > 0.3) {
          currentAngleRef.current = (currentAngleRef.current + diff * 0.16 + 360) % 360;
        } else {
          currentAngleRef.current = targetAngleRef.current;
        }

        const deg = Math.round(currentAngleRef.current);
        if (deg !== lastRenderedAngle) {
          lastRenderedAngle = deg;
          setCurrentAngle(deg);

          // Update video currentTime based on deg
          if (video && isVideoLoaded && !isSeekingRef.current && video.duration) {
            const targetTime = (deg / 360) * VIDEO_DURATION;
            const timeDiff = Math.abs(video.currentTime - targetTime);
            if (timeDiff > 0.03) {
              isSeekingRef.current = true;
              const v = video as HTMLVideoElement & { fastSeek?: (t: number) => void };
              if (typeof v.fastSeek === 'function') {
                v.fastSeek(targetTime);
              } else {
                video.currentTime = targetTime;
              }
            }
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoRotate, isVideoLoaded]);

  // Mouse / Touch Drag-to-Rotate handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setIsAutoRotate(false);
    setDragStartX(e.clientX);
    setDragStartAngle(currentAngleRef.current);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    // 300px drag = 360° turn
    const newAngle = (dragStartAngle + (deltaX / 300) * 360 + 3600) % 360;
    targetAngleRef.current = newAngle;
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Preset angle selector jump
  const setPresetAngle = (deg: number) => {
    setIsAutoRotate(false);
    targetAngleRef.current = deg;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {/* Cyberpunk Outer Tech Brackets */}
      <div className="flex items-center justify-between mb-3 px-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-red-500">
          <Crosshair className="w-4 h-4 animate-spin text-red-500" style={{ animationDuration: '10s' }} />
          <span className="font-bold tracking-widest uppercase">
            [ STAGE // 360° HOLOGRAPHIC SCANNER ]
          </span>
          <span className="text-neutral-600">|</span>
          <span className="text-neutral-400 hidden sm:inline">
            ROTATION MATRIX ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline text-neutral-500">DRIVE VECTOR:</span>
          <span className="px-2.5 py-1 rounded bg-red-950/80 border border-red-500/50 text-red-400 font-bold tabular-nums">
            {String(currentAngle).padStart(3, '0')}°
          </span>
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
        </div>
      </div>

      {/* Main Holographic Cyberpunk Viewport */}
      <div 
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className="relative w-full aspect-[16/9] max-h-[720px] bg-[#07060a] rounded-3xl border border-red-600/40 overflow-hidden shadow-[0_0_50px_rgba(255,0,60,0.25)] select-none cursor-ew-resize group"
      >
        {/* Background Atmospheric Crimson Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-red-600/15 blur-[160px] pointer-events-none rounded-full" />
          <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#07060a] via-transparent to-transparent pointer-events-none z-10" />
        </div>

        {/* Cyberpunk Perspective Floor Grid */}
        <div 
          className="absolute bottom-0 inset-x-0 h-64 pointer-events-none opacity-40 z-10"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255, 0, 60, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 0, 60, 0.3) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'perspective(600px) rotateX(65deg)',
            transformOrigin: 'bottom center'
          }}
        />

        {/* Circular Holographic Turntable Reticle */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] max-w-[850px] h-36 rounded-full border border-red-600/30 shadow-[0_0_30px_rgba(255,0,60,0.3)] pointer-events-none z-10 flex items-center justify-center">
          <div className="w-[96%] h-[88%] rounded-full border border-dashed border-red-500/20" />
        </div>

        {/* 360° Video Player Element */}
        <video
          ref={videoRef}
          src="/car-scrub.mp4"
          preload="auto"
          muted
          playsInline
          onLoadedData={() => {
            setIsVideoLoaded(true);
            if (videoRef.current) videoRef.current.currentTime = 0;
          }}
          onSeeked={() => {
            isSeekingRef.current = false;
          }}
          className="w-full h-full object-cover transition-transform duration-300 scale-[1.08] translate-y-[-1%] brightness-95 contrast-120"
        />

        {/* Gemini Watermark Concealment Mask (Bottom Right Corner) */}
        <div
          className="absolute bottom-0 right-0 w-52 h-36 pointer-events-none z-20"
          style={{
            background:
              'radial-gradient(ellipse at bottom right, #07060a 45%, rgba(7,6,10,0.95) 75%, transparent 100%)',
          }}
        />
        <div className="absolute bottom-0 right-0 w-40 h-28 backdrop-blur-xl pointer-events-none z-20 opacity-95" />

        {/* CRT Scanline Overlay Effect */}
        {hudScanline && (
          <div className="absolute inset-0 pointer-events-none scanlines opacity-25 z-10" />
        )}

        {/* Laser Sweep Beam Animation across stage */}
        <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_#ff003c] pointer-events-none z-20 animate-pulse opacity-60 top-1/3" />

        {/* HUD Overlay: Top Controls & Angle Telemetry */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-auto">
          {/* Angle Indicator Compass Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/80 backdrop-blur-xl border border-red-600/40 text-xs font-mono shadow-lg">
            <Compass className="w-3.5 h-3.5 text-red-500 animate-spin" style={{ animationDuration: '15s' }} />
            <span className="text-white font-bold tracking-wider">TURNTABLE</span>
            <span className="text-red-500">|</span>
            <span className="text-red-400 font-bold tabular-nums">
              {String(currentAngle).padStart(3, '0')}°
            </span>
            <span className="text-neutral-500 text-[10px] hidden sm:inline">
              (SCROLL / DRAG TO SPIN)
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider border transition-all flex items-center gap-1.5 shadow-lg ${
                isAutoRotate
                  ? 'bg-red-600 text-white border-red-500 shadow-[0_0_20px_rgba(255,0,60,0.6)]'
                  : 'bg-black/80 text-neutral-300 border-white/10 hover:border-red-500 hover:text-white'
              }`}
              title="Toggle automatic 360° spin"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} />
              <span>{isAutoRotate ? 'AUTO-SPIN: ON' : 'AUTO-SPIN'}</span>
            </button>

            {onIgniteEngine && (
              <button
                onClick={onIgniteEngine}
                className="px-3.5 py-1.5 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/60 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(255,0,60,0.5)]"
                title="Ignite V8 twin-turbo engine roar"
              >
                <Flame className={`w-3.5 h-3.5 text-red-500 ${isEngineRevving ? 'animate-bounce' : ''}`} />
                <span className="hidden sm:inline">REV V8</span>
              </button>
            )}
          </div>
        </div>

        {/* Interactive Floating Hotspots */}
        {CYBER_HOTSPOTS.map((spot) => {
          const isActive = activeHotspot?.id === spot.id;
          return (
            <button
              key={spot.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(spot);
                setPresetAngle(spot.angleTarget);
              }}
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto transition-all duration-300 flex items-center gap-2 group/pin ${
                isActive ? 'scale-110' : 'scale-90 opacity-80 hover:opacity-100 hover:scale-100'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className={`w-7 h-7 rounded-full border border-red-500/80 absolute transition-all ${
                  isActive ? 'animate-ping opacity-75' : 'opacity-40'
                }`} />
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                  isActive
                    ? 'bg-red-600 border-white text-white shadow-[0_0_15px_#ff003c]'
                    : 'bg-black/90 border-red-500/80 text-red-400 group-hover/pin:bg-red-950'
                }`}>
                  <span className="text-[10px] font-bold font-mono">+</span>
                </div>
              </div>

              {/* Tag Label */}
              <div className={`hidden md:flex flex-col text-left px-2.5 py-1 rounded-lg backdrop-blur-md border text-[11px] font-mono transition-all ${
                isActive
                  ? 'bg-red-950/90 border-red-500 text-white shadow-[0_0_15px_rgba(255,0,60,0.5)]'
                  : 'bg-black/70 border-white/10 text-neutral-400 group-hover/pin:text-white'
              }`}>
                <span className="text-[9px] text-red-400 font-bold">{spot.code}</span>
                <span className="font-semibold whitespace-nowrap">{spot.title}</span>
              </div>
            </button>
          );
        })}

        {/* Bottom Hotspot Telemetry Card Overlay */}
        {activeHotspot && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-30 pointer-events-auto p-4 rounded-2xl bg-black/90 backdrop-blur-2xl border border-red-600/60 shadow-[0_0_30px_rgba(255,0,60,0.3)] text-xs font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-red-950/60 mb-2">
              <div className="flex items-center gap-2">
                <span className="px-1.5 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold">
                  {activeHotspot.code}
                </span>
                <span className="text-white font-bold uppercase tracking-wider">
                  {activeHotspot.title}
                </span>
              </div>
              <span className="text-red-400 font-bold tabular-nums">
                {activeHotspot.stat}
              </span>
            </div>
            <p className="text-neutral-300 leading-relaxed text-[11px] font-sans">
              {activeHotspot.detail}
            </p>
          </div>
        )}

        {/* Bottom Quick Preset Angle Jump Tabs */}
        <div className="absolute bottom-4 right-4 z-30 hidden lg:flex items-center gap-1.5 p-1 bg-black/80 backdrop-blur-xl rounded-xl border border-red-950/80 pointer-events-auto text-xs font-mono">
          {[
            { label: '0° FRONT', deg: 0 },
            { label: '90° PROFILE', deg: 90 },
            { label: '180° REAR', deg: 180 },
            { label: '270° INTAKE', deg: 270 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => setPresetAngle(preset.deg)}
              className={`px-2.5 py-1 rounded-lg transition-all text-[11px] font-bold ${
                Math.abs(currentAngle - preset.deg) < 15
                  ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(255,0,60,0.6)]'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cyber Instructions Strip below stage */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-neutral-400 px-2">
        <div className="flex items-center gap-2">
          <span className="text-red-500 font-bold">▶ CONTROL:</span>
          <span>Scroll down page to rotate continuously</span>
          <span className="text-neutral-600">·</span>
          <span>Or drag horizontally on vehicle</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-red-500 font-bold">TELEMETRY:</span>
          <span className="text-white font-semibold">100% HARDWARE DECODED</span>
          <span className="text-neutral-600">·</span>
          <span className="text-emerald-400">FPS: 60 LOCKED</span>
        </div>
      </div>
    </div>
  );
};
