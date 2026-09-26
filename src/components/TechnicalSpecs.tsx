import React, { useState } from 'react';
import { Cpu, Shield, Zap, Gauge, Wrench, Layers, Crosshair, Terminal } from 'lucide-react';

interface SpecCategory {
  id: string;
  name: string;
  specs: { label: string; value: string; detail?: string }[];
}

const SPEC_DATA: SpecCategory[] = [
  {
    id: 'powertrain',
    name: '[ 01 // PROPULSION MATRIX ]',
    specs: [
      { label: 'Combustion Engine', value: '4.0L Twin-Turbocharged Flat-Plane V8', detail: '8,500 RPM Power Peak · 180° Billet Crank' },
      { label: 'ICE Power Output', value: '800 BHP @ 8,500 RPM', detail: 'High-boost twin variable geometry turbochargers' },
      { label: 'Electric Propulsion', value: '250 BHP Dual Axial-Flux Motors', detail: 'Integrated front e-axle with torque vectoring' },
      { label: 'Combined System Output', value: '1,050 BHP (772 kW)', detail: 'Instant electric torque fill' },
      { label: 'Peak Torque', value: '1,020 Nm (752 lb-ft)', detail: '@ 2,800–6,800 RPM flat plateau' },
      { label: 'Transmission', value: '8-Speed F1 Dual-Clutch Transaxle', detail: 'Paddle shifts executed in 40 milliseconds' },
      { label: 'Hybrid Energy Storage', value: '800V High-Discharge Cylindrical Matrix', detail: '150 kW regenerative braking intake' },
    ],
  },
  {
    id: 'performance',
    name: '[ 02 // VELOCITY BENCHMARKS ]',
    specs: [
      { label: 'Acceleration 0–60 MPH', value: '2.05 seconds', detail: 'GPS verified on Pirelli Trofeo R' },
      { label: 'Acceleration 0–124 MPH (0-200 km/h)', value: '5.8 seconds', detail: 'Unbroken twin-clutch thrust' },
      { label: 'Terminal Velocity (V-Max)', value: '248 MPH (400 KM/H)', detail: 'Active low-drag DRS mode' },
      { label: 'Quarter Mile (1/4 mi)', value: '9.15 seconds @ 159.2 MPH', detail: 'Launch control active' },
      { label: 'Max Lateral Acceleration', value: '1.95 G', detail: 'Downforce augmented cornering vector' },
      { label: 'Threshold Braking (62–0 MPH)', value: '28.2 meters (92.5 ft)', detail: 'CCM-R discs + active airbrake' },
      { label: 'Nürburgring Nordschleife Lap', value: '6:38.20 min', detail: 'Production car circuit benchmark' },
    ],
  },
  {
    id: 'chassis',
    name: '[ 03 // CHASSIS & AERODYNAMICS ]',
    specs: [
      { label: 'Chassis Architecture', value: 'T1000G Carbon Fiber Monocoque', detail: 'Autoclaved with integrated roll safety cell' },
      { label: 'Torsional Rigidity', value: '46,500 Nm / Degree', detail: 'Zero chassis deflection under load' },
      { label: 'Curb Mass (Dry Weight)', value: '1,340 kg (2,954 lbs)', detail: '42:58 optimal rear-mid engine balance' },
      { label: 'Peak Downforce', value: '820 kg @ 180 MPH', detail: 'Dual Venturi ground suction + active wing' },
      { label: 'Braking Hardware', value: 'Brembo CCM-R 398mm Rotors', detail: '6-piston front / 4-piston rear forged calipers' },
      { label: 'Suspension Geometry', value: 'Inboard Pushrod Double Wishbones', detail: 'Magnetorheological continuously adaptive dampers' },
      { label: 'Production Allocation', value: 'Strictly 99 Chassis Worldwide', detail: 'Individually numbered bespoke builds' },
    ],
  },
];

export const TechnicalSpecs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('powertrain');

  return (
    <section id="specs" className="py-24 relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full cyber-hud-chip text-xs font-mono font-bold text-red-500 uppercase tracking-widest mb-4 border border-red-500/30">
            <Terminal className="w-3.5 h-3.5" />
            <span>[ SECTION // 05 · SPECIFICATIONS MATRIX ]</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white font-display tracking-tight uppercase cyber-title">
            Factory Telemetry Blueprint
          </h2>
          <p className="mt-4 text-neutral-200 text-sm sm:text-base leading-relaxed cyber-body">
            Every millimeter and gram engineered to dominate physics. Full factory homologation metrics.
          </p>
        </div>

        {/* Tab Selectors */}
        <div className="flex items-center justify-center gap-2 mb-10 overflow-x-auto pb-2 font-mono">
          {SPEC_DATA.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-2xl border transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-red-500 bg-red-600 text-white shadow-[0_0_20px_rgba(255,0,60,0.6)]'
                    : 'border-white/10 cyber-hud-chip text-neutral-400 hover:text-white hover:border-red-500/40'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Cyberpunk Telemetry Table */}
        <div className="max-w-4xl mx-auto cyber-card cyber-corners rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-red-500/30 hover:border-red-500/60">
          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none scanlines opacity-15" />

          <div className="divide-y divide-red-950/60 font-mono relative z-10">
            {SPEC_DATA.find((c) => c.id === activeTab)?.specs.map((spec, idx) => (
              <div
                key={idx}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-red-950/20 px-3 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="text-xs sm:text-sm font-semibold text-neutral-300">
                    {spec.label}
                  </span>
                </div>

                <div className="sm:text-right">
                  <div className="text-sm sm:text-base font-black text-white text-red-100">
                    {spec.value}
                  </div>
                  {spec.detail && (
                    <div className="text-[11px] text-red-400/80 font-normal">
                      {spec.detail}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
