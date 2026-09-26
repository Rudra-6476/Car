import React, { useState, useEffect, useRef } from 'react';
import { carAudio } from '../utils/audioEngine';
import { Volume2, VolumeX, Flame, Gauge, Zap } from 'lucide-react';

interface EngineRevStationProps {
  onRevStateChange?: (isRevving: boolean) => void;
}

export const EngineRevStation: React.FC<EngineRevStationProps> = ({ onRevStateChange }) => {
  const [rpm, setRpm] = useState(1050);
  const [isPressing, setIsPressing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentGear, setCurrentGear] = useState('N');
  const [boostBar, setBoostBar] = useState(0.2);
  const animRef = useRef<number | null>(null);

  // Keyboard shortcut: Spacebar to rev!
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !e.repeat && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault();
        startRev();
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        stopRev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const startRev = () => {
    setIsPressing(true);
    carAudio.setThrottle(true);
    onRevStateChange?.(true);
  };

  const stopRev = () => {
    setIsPressing(false);
    carAudio.setThrottle(false);
    onRevStateChange?.(false);
  };

  const handleToggleMute = () => {
    const muted = carAudio.toggleMute();
    setIsMuted(muted);
  };

  // Sync state loop from audio engine RPM
  useEffect(() => {
    const tick = () => {
      const liveRpm = carAudio.getRpm();
      setRpm(liveRpm);

      // Boost calculation
      const targetBoost = liveRpm > 4000 ? ((liveRpm - 4000) / 5000) * 2.2 + 0.2 : 0.2;
      setBoostBar(Number(targetBoost.toFixed(2)));

      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Compute angle for tachometer needle (from -135deg at 0 RPM to +135deg at 10,000 RPM)
  const needleAngle = -135 + (rpm / 10000) * 270;
  const isRedline = rpm >= 8500;

  return (
    <section id="engine" className="py-20 relative overflow-hidden bg-[#07070a]/75 backdrop-blur-md">
      {/* Background ambient red glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[300px] bg-red-600/10 blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-red-500 tracking-widest uppercase mb-2">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Powertrain Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-display text-balance">
            4.0L Twin-Turbo Flat-Plane V8 Hybrid
          </h2>
          <p className="mt-3 text-neutral-400 text-sm sm:text-base">
            Press and hold the throttle pedal to unleash 1,050 horsepower. Hear the active exhaust valves open as the engine screams toward its 9,500 RPM redline.
          </p>
        </div>

        {/* Cockpit Instrument Cluster Box */}
        <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#121118] via-[#0d0c12] to-[#07070a] border border-red-900/40 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(220,38,38,0.15)] relative">

          {/* Top telemetry bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/5 mb-8">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${isRedline ? 'bg-red-500 animate-ping' : 'bg-red-600'}`} />
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-300">
                DRIVE MODE: <strong className="text-red-500">CORSA RACE</strong>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMute}
                className="px-3 py-1.5 rounded-lg border border-red-900/40 bg-black/40 text-xs font-mono text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-neutral-500" /> : <Volume2 className="w-4 h-4 text-red-400" />}
                <span>{isMuted ? 'UNMUTE AUDIO' : 'AUDIO ACTIVE'}</span>
              </button>
            </div>
          </div>

          {/* Central Gauges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center">

            {/* Left Gauge: Boost & Oil Temp */}
            <div className="flex flex-col items-center justify-center p-4 bg-black/40 rounded-2xl border border-white/5">
              <Gauge className="w-6 h-6 text-red-500 mb-2" />
              <span className="text-xs font-mono text-neutral-400 tracking-wider">TWIN-TURBO BOOST</span>
              <div className="text-3xl font-extrabold text-white font-mono mt-1 tabular-nums">
                {boostBar} <span className="text-sm font-normal text-red-400">BAR</span>
              </div>
              <div className="w-full bg-neutral-800 h-2 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-75"
                  style={{ width: `${Math.min(100, (boostBar / 2.4) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between w-full mt-2 text-[10px] font-mono text-neutral-500">
                <span>VACUUM</span>
                <span>MAX 2.4 BAR</span>
              </div>
            </div>

            {/* Center Gauge: Master 10,000 RPM Tachometer Dial */}
            <div className="relative flex flex-col items-center justify-center">
              <svg viewBox="0 0 260 260" className="w-56 h-56 sm:w-64 sm:h-64 drop-shadow-[0_0_20px_rgba(220,38,38,0.25)]">
                {/* Background Ring */}
                <circle
                  cx="130"
                  cy="130"
                  r="105"
                  fill="#0a0a0f"
                  stroke="#1c1c24"
                  strokeWidth="8"
                />

                {/* Sub-arc Track */}
                <path
                  d="M 55,205 A 105 105 0 1 1 205,205"
                  fill="none"
                  stroke="#261012"
                  strokeWidth="10"
                  strokeLinecap="round"
                />

                {/* Redline Arc (8,500 to 10,000 RPM) */}
                <path
                  d="M 185,80 A 105 105 0 0 1 205,205"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity="0.9"
                />

                {/* Tick Marks */}
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                  const angleDeg = -135 + (num / 10) * 270;
                  const angleRad = (angleDeg * Math.PI) / 180;
                  const x1 = 130 + Math.cos(angleRad) * 92;
                  const y1 = 130 + Math.sin(angleRad) * 92;
                  const x2 = 130 + Math.cos(angleRad) * 102;
                  const y2 = 130 + Math.sin(angleRad) * 102;
                  const textX = 130 + Math.cos(angleRad) * 78;
                  const textY = 130 + Math.sin(angleRad) * 78 + 4;
                  return (
                    <g key={num}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={num >= 8 ? '#ef4444' : '#6b7280'}
                        strokeWidth={num % 2 === 0 ? '2.5' : '1.5'}
                      />
                      <text
                        x={textX}
                        y={textY}
                        textAnchor="middle"
                        fill={num >= 8 ? '#ef4444' : '#d1d5db'}
                        fontSize="11"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {num}
                      </text>
                    </g>
                  );
                })}

                {/* Needle */}
                <g transform={`rotate(${needleAngle}, 130, 130)`}>
                  <line
                    x1="130"
                    y1="130"
                    x2="130"
                    y2="34"
                    stroke="#ff2233"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="drop-shadow(0 0 4px #ff0000)"
                  />
                  <circle cx="130" cy="130" r="12" fill="#181820" stroke="#ff2233" strokeWidth="2.5" />
                  <circle cx="130" cy="130" r="4" fill="#ffffff" />
                </g>
              </svg>

              {/* Digital RPM & Status Display in Center */}
              <div className="text-center mt-2">
                <div className={`text-4xl font-black font-mono tracking-tight tabular-nums ${isRedline ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                  {Math.round(rpm)}
                </div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  RPM · FLAT-PLANE CRANK
                </div>
              </div>
            </div>

            {/* Right Gauge: Gear & Telemetry */}
            <div className="flex flex-col items-center justify-center p-4 bg-black/40 rounded-2xl border border-white/5">
              <div className="w-12 h-12 rounded-xl bg-red-950/60 border border-red-700/60 flex items-center justify-center mb-2">
                <span className="text-2xl font-black text-red-400 font-mono">1</span>
              </div>
              <span className="text-xs font-mono text-neutral-400 tracking-wider">DUAL-CLUTCH GEAR</span>
              <div className="text-xs text-neutral-300 font-mono mt-3 space-y-1 w-full text-center">
                <div className="flex justify-between text-[11px] border-b border-white/5 pb-1">
                  <span className="text-neutral-500">EXHAUST TEMP</span>
                  <span className="text-red-400">780 °C</span>
                </div>
                <div className="flex justify-between text-[11px] border-b border-white/5 pb-1">
                  <span className="text-neutral-500">VALVE TIMING</span>
                  <span className="text-white">AGGRESSIVE</span>
                </div>
                <div className="flex justify-between text-[11px] pt-1">
                  <span className="text-neutral-500">HYBRID E-MOTOR</span>
                  <span className="text-emerald-400">+210 BHP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Throttle Pedal Action Area */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onMouseDown={startRev}
              onMouseUp={stopRev}
              onMouseLeave={stopRev}
              onTouchStart={startRev}
              onTouchEnd={stopRev}
              className={`group relative px-8 py-5 rounded-2xl font-display font-extrabold uppercase tracking-wider text-base sm:text-lg transition-all duration-150 select-none flex items-center gap-3 ${
                isPressing
                  ? 'scale-95 bg-red-700 text-white shadow-[0_0_40px_rgba(239,68,68,0.8)] border border-red-400'
                  : 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_25px_rgba(220,38,38,0.5)] border border-red-500/50'
              }`}
            >
              <Flame className={`w-6 h-6 transition-transform ${isPressing ? 'scale-125 text-amber-300 animate-bounce' : 'text-white'}`} />
              <span>{isPressing ? 'THROTTLE WIDE OPEN!' : 'PRESS & HOLD THROTTLE'}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-black/40 text-neutral-200">
                [SPACEBAR]
              </span>
            </button>
          </div>

          <p className="text-center text-xs text-neutral-500 font-mono mt-4">
            Click & hold with mouse, tap on touchscreens, or press and hold Spacebar.
          </p>
        </div>
      </div>
    </section>
  );
};
