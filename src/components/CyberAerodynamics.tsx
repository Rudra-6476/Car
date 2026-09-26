import React, { useState } from 'react';
import { Wind, Shield, Compass, Activity, ArrowRight, Gauge, Layers } from 'lucide-react';

export const CyberAerodynamics: React.FC = () => {
  const [speedMph, setSpeedMph] = useState<number>(185);

  // Aerodynamics calculations
  const speedRatio = speedMph / 250;
  const downforceKg = Math.round(820 * Math.pow(speedMph / 180, 1.85));
  const dragCoeff = speedMph > 200 ? 0.36 : speedMph > 120 ? 0.33 : 0.31;
  const wingPitchDeg = speedMph > 220 ? 28 : speedMph > 140 ? 18 : speedMph > 60 ? 10 : 0;
  const maxLateralG = Number((1.2 + speedRatio * 0.75).toFixed(2));
  const brakingDistanceM = Math.round(28.5 * Math.pow(speedMph / 100, 1.6));

  return (
    <section id="aerodynamics" className="py-24 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full cyber-hud-chip text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-4 border border-red-500/30">
              <Wind className="w-3.5 h-3.5" />
              <span>[ SECTION // 03 · COMPUTATIONAL FLUID DYNAMICS ]</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight text-balance uppercase cyber-title">
              Active Downforce & CFD Lab
            </h2>
            <p className="mt-4 text-neutral-200 text-sm sm:text-base max-w-2xl leading-relaxed cyber-body">
              Airflow sculpted around forged carbon surfaces. Real-time dynamic DRS wing pitch adjustment, active underbody venturi channels, and vortex generator management.
            </p>
          </div>

          <div className="px-5 py-2.5 cyber-hud-chip rounded-2xl font-mono text-xs text-red-400 font-bold border border-red-500/40">
            CARBON GROUND EFFECT VENTURI TUNNELS
          </div>
        </div>

        {/* Speed Slider & Telemetry Bento */}
        <div className="cyber-card cyber-corners rounded-3xl p-6 sm:p-8 shadow-2xl mb-8 border border-red-500/30">
          
          {/* Main Velocity Slider */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1">
                  CFD SIMULATION VELOCITY
                </span>
                <div className="text-5xl sm:text-6xl font-black font-mono text-white tracking-tight flex items-baseline gap-2 tabular-nums">
                  {speedMph} <span className="text-2xl font-semibold text-red-500 font-display">MPH</span>
                  <span className="text-sm text-neutral-500 font-mono font-normal">
                    ({Math.round(speedMph * 1.60934)} KM/H)
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-neutral-400 block mb-1 uppercase">AERO MODE</span>
                <span className="px-3 py-1 rounded-lg bg-red-950/80 border border-red-500/50 text-red-400 font-mono font-bold text-xs">
                  {speedMph > 200 ? 'HIGH-DOWNFORCE VECTOR' : speedMph > 100 ? 'GROUND SUCTION ACTIVE' : 'LOW DRAG CRUISING'}
                </span>
              </div>
            </div>

            {/* Slider track */}
            <input
              type="range"
              min="0"
              max="248"
              value={speedMph}
              onChange={(e) => setSpeedMph(Number(e.target.value))}
              className="w-full h-2.5 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
            />
            <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-2">
              <span>0 MPH (STATIC SHOWROOM)</span>
              <span>120 MPH (ACTIVE DOWNFORCE THRESHOLD)</span>
              <span className="text-red-500 font-bold">248 MPH (V-MAX TERMINAL VELOCITY)</span>
            </div>
          </div>

          {/* 4 Interactive Telemetry Pillars */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-black/60 border border-red-950/60 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">TOTAL DOWNFORCE</span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white tabular-nums">
                {downforceKg} <span className="text-sm text-red-500 font-display">KG</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 mt-2">
                Equivalent to 1.8x car mass at speed
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-black/60 border border-red-950/60 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">ACTIVE WING ANGLE</span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white tabular-nums">
                {wingPitchDeg}° <span className="text-sm text-red-500 font-display">PITCH</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 mt-2">
                Electro-hydraulic dual actuators
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-black/60 border border-red-950/60 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">LATERAL CORNERING</span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white tabular-nums">
                {maxLateralG} <span className="text-sm text-red-500 font-display">G</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 mt-2">
                Active aero vectoring stability
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-black/60 border border-red-950/60 flex flex-col justify-between">
              <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">DRAG COEFFICIENT</span>
              <div className="text-3xl sm:text-4xl font-black font-mono text-white tabular-nums">
                0.{Math.round(dragCoeff * 100)} <span className="text-sm text-red-500 font-display">Cd</span>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 mt-2">
                Optimized in 300 km/h wind tunnel
              </span>
            </div>

          </div>
        </div>

        {/* 3 Active Aero Subsystem Deep Dives */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 rounded-3xl cyber-card cyber-corners border border-red-500/20 hover:border-red-500/60 transition-all">
            <span className="text-xs font-mono text-red-500 block mb-2 font-bold">[ AERO // 01 · VENTURI ]</span>
            <h4 className="text-lg font-bold text-white font-display uppercase cyber-title">Active Underbody Venturi</h4>
            <p className="mt-2 text-xs text-neutral-300 leading-relaxed font-sans cyber-body">
              Twin full-length carbon venturi tunnels create a low-pressure Bernoulli vacuum under the chassis, pulling the car toward the track without increasing profile drag.
            </p>
          </div>

          <div className="p-7 rounded-3xl cyber-card cyber-corners border border-red-500/20 hover:border-red-500/60 transition-all">
            <span className="text-xs font-mono text-red-500 block mb-2 font-bold">[ AERO // 02 · AIRBRAKE ]</span>
            <h4 className="text-lg font-bold text-white font-display uppercase cyber-title">DRS Wing Airbrake</h4>
            <p className="mt-2 text-xs text-neutral-300 leading-relaxed font-sans cyber-body">
              During high-speed threshold braking, the rear wing pitches to 32 degrees in under 80 milliseconds, acting as a massive aerodynamic airbrake that stabilizes the rear axle.
            </p>
          </div>

          <div className="p-7 rounded-3xl cyber-card cyber-corners border border-red-500/20 hover:border-red-500/60 transition-all">
            <span className="text-xs font-mono text-red-500 block mb-2 font-bold">[ AERO // 03 · INLET ]</span>
            <h4 className="text-lg font-bold text-white font-display uppercase cyber-title">Front Flap Management</h4>
            <p className="mt-2 text-xs text-neutral-300 leading-relaxed font-sans cyber-body">
              Motorized carbon flaps in the front radiator nostrils open and close dynamically, balancing aerodynamic downforce with cooling airflow to the hybrid battery radiators.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
