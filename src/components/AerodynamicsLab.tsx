import React, { useState } from 'react';
import { Wind, Shield, Activity, Compass, ArrowRight } from 'lucide-react';

export const AerodynamicsLab: React.FC = () => {
  const [speedMph, setSpeedMph] = useState<number>(185);

  // Aerodynamics calculations
  // Downforce scales roughly with square of velocity: F = 0.5 * rho * v^2 * Cl * A
  const speedRatio = speedMph / 250;
  const downforceKg = Math.round(820 * Math.pow(speedMph / 180, 1.85));
  const dragCoeff = speedMph > 200 ? 0.36 : speedMph > 120 ? 0.33 : 0.31;
  const wingPitchDeg = speedMph > 220 ? 28 : speedMph > 140 ? 18 : speedMph > 60 ? 10 : 0;
  const maxLateralG = Number((1.2 + speedRatio * 0.75).toFixed(2));
  const brakingDistanceM = Math.round(28.5 * Math.pow(speedMph / 100, 1.6));

  return (
    <section id="aerodynamics" className="py-20 relative bg-[#09080d]/75 backdrop-blur-md border-t border-b border-red-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-2">
              <Wind className="w-3.5 h-3.5" />
              <span>Computational Fluid Dynamics</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display text-balance">
              Active Aerodynamic Downforce Lab
            </h2>
            <p className="mt-2 text-neutral-400 text-sm sm:text-base max-w-xl">
              Adjust vehicle velocity to simulate real-time active aero surfaces, wing pitch variation, and downforce generation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-red-950/50 border border-red-800/40 rounded-xl font-mono text-xs text-red-300">
              CARBON GROUND EFFECT VENTURI
            </div>
          </div>
        </div>

        {/* Speed Slider & Telemetry Bento */}
        <div className="bg-black/50 border border-red-900/30 rounded-3xl p-6 sm:p-8 backdrop-blur-sm">
          
          {/* Main Speed Slider */}
          <div className="mb-10">
            <div className="flex justify-between items-end mb-4">
              <div>
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                  SIMULATED VELOCITY
                </span>
                <div className="text-4xl sm:text-5xl font-black font-mono text-white tracking-tight flex items-baseline gap-2 tabular-nums">
                  {speedMph} <span className="text-xl font-semibold text-red-500 font-display">MPH</span>
                  <span className="text-sm text-neutral-500 font-mono font-normal">
                    ({Math.round(speedMph * 1.60934)} KM/H)
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-mono text-neutral-400 uppercase">ACTIVE WING ANGLE</span>
                <div className="text-2xl font-bold font-mono text-red-400 tabular-nums">
                  +{wingPitchDeg}° PITCH
                </div>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="250"
              value={speedMph}
              onChange={(e) => setSpeedMph(Number(e.target.value))}
              className="w-full h-3 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            />

            <div className="flex justify-between text-xs font-mono text-neutral-500 mt-2">
              <span>0 MPH (STANDSTILL)</span>
              <span>120 MPH (TRACK APEX)</span>
              <span>180 MPH (DOWNFORCE SWEETSPOT)</span>
              <span className="text-red-500 font-bold">250 MPH (V-MAX)</span>
            </div>
          </div>

          {/* Real-time Telemetry Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Downforce */}
            <div className="p-5 bg-neutral-900/60 border border-white/5 rounded-2xl relative overflow-hidden group hover:border-red-900/50 transition-colors">
              <div className="text-xs font-mono text-neutral-400 mb-1">TOTAL DOWNFORCE</div>
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                {downforceKg} <span className="text-xs font-normal text-red-400 font-sans">KG</span>
              </div>
              <div className="text-xs text-neutral-400 mt-2">
                F/R Bias: <strong className="text-white">38% Front · 62% Rear</strong>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all duration-150"
                  style={{ width: `${Math.min(100, (downforceKg / 1400) * 100)}%` }}
                />
              </div>
            </div>

            {/* Card 2: Drag Coefficient */}
            <div className="p-5 bg-neutral-900/60 border border-white/5 rounded-2xl relative overflow-hidden group hover:border-red-900/50 transition-colors">
              <div className="text-xs font-mono text-neutral-400 mb-1">AERODYNAMIC DRAG</div>
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                {dragCoeff} <span className="text-xs font-normal text-red-400 font-sans">Cd</span>
              </div>
              <div className="text-xs text-neutral-400 mt-2">
                Active Venturi: <strong className="text-white">Sealed Flow</strong>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-150"
                  style={{ width: `${Math.min(100, (dragCoeff / 0.45) * 100)}%` }}
                />
              </div>
            </div>

            {/* Card 3: Lateral G Capability */}
            <div className="p-5 bg-neutral-900/60 border border-white/5 rounded-2xl relative overflow-hidden group hover:border-red-900/50 transition-colors">
              <div className="text-xs font-mono text-neutral-400 mb-1">LATERAL CORNERING</div>
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                {maxLateralG} <span className="text-xs font-normal text-red-400 font-sans">G</span>
              </div>
              <div className="text-xs text-neutral-400 mt-2">
                Pirelli Trofeo R: <strong className="text-white">High Grip</strong>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-red-600 transition-all duration-150"
                  style={{ width: `${Math.min(100, (maxLateralG / 2.0) * 100)}%` }}
                />
              </div>
            </div>

            {/* Card 4: 100-0 Braking */}
            <div className="p-5 bg-neutral-900/60 border border-white/5 rounded-2xl relative overflow-hidden group hover:border-red-900/50 transition-colors">
              <div className="text-xs font-mono text-neutral-400 mb-1">BRAKING DISTANCE</div>
              <div className="text-3xl font-extrabold text-white font-mono tabular-nums">
                {brakingDistanceM} <span className="text-xs font-normal text-red-400 font-sans">M</span>
              </div>
              <div className="text-xs text-neutral-400 mt-2">
                Airbrake Deployment: <strong className="text-white">Active +38°</strong>
              </div>
              <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-red-500 transition-all duration-150"
                  style={{ width: `${Math.min(100, (brakingDistanceM / 200) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
