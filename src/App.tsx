import React, { useState } from 'react';
import { ViewAngle, CarColorFinish, WheelFinish } from './types';
import { CyberNavbar } from './components/CyberNavbar';
import { CyberBackground360 } from './components/CyberBackground360';
import { CyberPowertrain } from './components/CyberPowertrain';
import { CyberAerodynamics } from './components/CyberAerodynamics';
import { CyberCockpit } from './components/CyberCockpit';
import { TechnicalSpecs } from './components/TechnicalSpecs';
import { FinishCustomizer } from './components/FinishCustomizer';
import { TestDriveModal } from './components/TestDriveModal';
import { Footer } from './components/Footer';
import { Flame, ArrowUpRight, Gauge, Shield, Wind, Sparkles } from 'lucide-react';
import { CyberHeroStage } from './components/CyberHeroStage';
import { carAudio } from './utils/audioEngine';

const COLOR_OPTIONS: CarColorFinish[] = [
  {
    id: 'cyber-scarlet',
    name: 'Cyber Scarlet Crimson',
    subtitle: 'High-Luminance Neon Racing Lacquer',
    hex: '#ff003c',
    secondaryHex: '#ff1744',
    metallicGloss: 0.98,
    matte: false,
    description: 'Electric crimson lacquer polished with micro-crystallized fluorescent flake that absorbs ambient light and burns neon red under nocturnal headlights.',
  },
  {
    id: 'rosso-corsa',
    name: 'Rosso Corsa Heritage',
    subtitle: 'Classic Italian Racing Bloodline',
    hex: '#dc2626',
    secondaryHex: '#ef4444',
    metallicGloss: 0.95,
    matte: false,
    description: 'The definitive vivid Italian scarlet coat, formulated with high-pigment crimson layers and hand-polished for over 60 hours in Modena.',
  },
  {
    id: 'ember-vulcano',
    name: 'Ember Vulcano Pearl',
    subtitle: 'Deep Magma & Multi-Layer Flake',
    hex: '#991b1b',
    secondaryHex: '#b91c1c',
    metallicGloss: 0.9,
    matte: false,
    description: 'Deep volcanic ruby infused with micronized copper dust and fiery crimson pearl that shimmers under direct track lighting.',
  },
  {
    id: 'velvet-matte',
    name: 'Velvet Matte Scarlet',
    subtitle: 'Radar-Absorbent Satin Finish',
    hex: '#b91c1c',
    secondaryHex: '#7f1d1d',
    metallicGloss: 0.2,
    matte: true,
    description: 'Zero-reflection satin scarlet engineered to highlight radical body creases and downforce ducts with zero glare.',
  },
  {
    id: 'forged-carbon-rosso',
    name: 'Forged Carbon Rosso',
    subtitle: 'Exposed Woven Fiber with Crimson Tint',
    hex: '#7f1d1d',
    secondaryHex: '#991b1b',
    metallicGloss: 0.85,
    matte: false,
    description: 'Structural chopped carbon fiber monocoque weave suspended beneath a deep crimson tinted translucent ceramic lacquer.',
  },
  {
    id: 'kuro-scarlet',
    name: 'Nocturnal Kuro & Scarlet Duo',
    subtitle: 'Obsidian Black with Neon Red Aero',
    hex: '#111015',
    secondaryHex: '#1d1b24',
    stripeColor: '#ff003c',
    metallicGloss: 0.95,
    matte: false,
    description: 'Stealth obsidian metallic with laser-sharp cyber scarlet canards, front splitter blades, and active rear wing accents.',
  },
];

const WHEEL_OPTIONS: WheelFinish[] = [
  {
    id: 'wheel-cyber-black',
    name: '21" Forged Cyber Monoblock Jet Black',
    rimColor: '#121118',
    caliperColor: '#eab308', // Giallo Modena Brembo Yellow
  },
  {
    id: 'wheel-titanium-aero',
    name: '21" Brushed Gunmetal Titanium with Turbofans',
    rimColor: '#4b4b55',
    caliperColor: '#ff003c', // Neon Scarlet
  },
  {
    id: 'wheel-corsa-bronze',
    name: '21" Corsa Racing Bronze',
    rimColor: '#78350f',
    caliperColor: '#ff003c',
  },
  {
    id: 'wheel-carbon-ring',
    name: '21" Forged Carbon Rim with Neon Red Ring',
    rimColor: '#0a0a0f',
    caliperColor: '#ff1744',
  },
];

export default function App() {
  const [activeColor, setActiveColor] = useState<CarColorFinish>(COLOR_OPTIONS[0]);
  const [activeWheel, setActiveWheel] = useState<WheelFinish>(WHEEL_OPTIONS[0]);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState<boolean>(false);
  const [isEngineRevving, setIsEngineRevving] = useState<boolean>(false);

  const handleQuickRev = () => {
    carAudio.init();
    carAudio.start();
    carAudio.setThrottle(true);
    setIsEngineRevving(true);
    setTimeout(() => {
      carAudio.setThrottle(false);
      setIsEngineRevving(false);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-[#050408] text-neutral-100 selection:bg-red-600 selection:text-white flex flex-col font-sans relative overflow-x-hidden">
      
      {/* 360° Scroll-Driven Background Video Layer */}
      <CyberBackground360 />

      {/* Cyberpunk Luxury Navbar */}
      <CyberNavbar
        onOpenReserve={() => setIsTestDriveOpen(true)}
        onQuickRev={handleQuickRev}
      />

      <main className="flex-1 relative z-10">
        
        {/* HERO SECTION: Open Cyber Showcase Revealing Background 360 Car */}
        <section id="overview" className="relative pt-28 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            
            {/* Elegant High-Contrast Cyber Console Plaque */}
            <div className="max-w-3xl mx-auto">
              <div className="p-6 sm:p-8 rounded-3xl cyber-card cyber-corners border border-red-500/30 shadow-2xl text-center">
                
                {/* Precision Telemetry Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/70 border border-red-500/40 text-[11px] font-mono font-bold text-red-500 uppercase tracking-widest mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>1,050 BHP HYBRID V8 · 0–60 2.05S · 248 MPH · 01/99</span>
                </div>

                {/* Razor-Sharp High-Contrast Headline */}
                <h1 className="text-4xl sm:text-6xl font-black font-display tracking-wider uppercase text-white leading-none mb-3">
                  THE APEX <span className="text-red-500">SCARLET GT</span>
                </h1>

                {/* Clean, Readable Description */}
                <p className="text-xs sm:text-sm text-neutral-200 font-sans leading-relaxed max-w-xl mx-auto mb-6">
                  Autoclaved T1000 carbon fiber tub with 800V hybrid drive. 1,050 horsepower tuned to dominate the road. Scroll down to rotate the hypercar in full 360-degree precision.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
                  <button
                    onClick={() => setIsTestDriveOpen(true)}
                    className="px-6 py-3 bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_25px_rgba(255,0,60,0.6)] flex items-center gap-2 cursor-pointer"
                  >
                    <span>RESERVE CHASSIS ALLOCATION</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleQuickRev}
                    className="px-6 py-3 bg-black/70 hover:bg-black/90 text-neutral-200 hover:text-white border border-white/20 hover:border-red-500 font-bold uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Flame className={`w-4 h-4 text-red-500 ${isEngineRevving ? 'animate-bounce text-yellow-400' : ''}`} />
                    <span>{isEngineRevving ? 'TWIN-TURBOS SPOOLING...' : 'IGNITE V8 REACTOR ROAR'}</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Interactive 360° Studio Showcase Stage & Turntable Controller */}
            <CyberHeroStage onScrollToSection={(id: string) => {
              const el = document.getElementById(id);
              el?.scrollIntoView({ behavior: 'smooth' });
            }} />

            {/* 3 Pillar Velocity & Aerodynamics Metrics Strip */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
              <div className="p-7 rounded-3xl cyber-card cyber-corners border border-red-500/20 hover:border-red-500/60 transition-all shadow-2xl group">
                <div className="flex items-center gap-2 text-xs text-red-500 uppercase mb-2 font-bold tracking-wider">
                  <Gauge className="w-4 h-4" />
                  <span>[ 01 // ACCELERATION BENCHMARK ]</span>
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white tabular-nums my-1 cyber-title">
                  2.05 <span className="text-sm font-normal text-red-400 font-display">SECONDS</span>
                </div>
                <p className="text-xs text-neutral-300 mt-3 font-sans leading-relaxed cyber-body">
                  0–60 MPH launch velocity achieved via twin axial-flux electric torque fill and dual-clutch launch control.
                </p>
              </div>

              <div className="p-7 rounded-3xl cyber-card cyber-corners border border-red-500/20 hover:border-red-500/60 transition-all shadow-2xl group">
                <div className="flex items-center gap-2 text-xs text-red-500 uppercase mb-2 font-bold tracking-wider">
                  <Wind className="w-4 h-4" />
                  <span>[ 02 // ACTIVE DOWNFORCE VECTOR ]</span>
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white tabular-nums my-1 cyber-title">
                  820 <span className="text-sm font-normal text-red-400 font-display">KG SUCTION</span>
                </div>
                <p className="text-xs text-neutral-300 mt-3 font-sans leading-relaxed cyber-body">
                  Active electro-hydraulic rear wing with Venturi underbody tunnels delivering 1.8x car mass in downforce at 180 MPH.
                </p>
              </div>

              <div className="p-7 rounded-3xl cyber-card cyber-corners border border-red-500/20 hover:border-red-500/60 transition-all shadow-2xl group">
                <div className="flex items-center gap-2 text-xs text-red-500 uppercase mb-2 font-bold tracking-wider">
                  <Shield className="w-4 h-4" />
                  <span>[ 03 // MONOCOQUE INTEGRITY ]</span>
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white tabular-nums my-1 cyber-title">
                  1,340 <span className="text-sm font-normal text-red-400 font-display">KG DRY MASS</span>
                </div>
                <p className="text-xs text-neutral-300 mt-3 font-sans leading-relaxed cyber-body">
                  Autoclaved T1000 carbon composite tub with 46,500 Nm/degree torsional rigidity and FIA homologated crash cell.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 02: 1,050 BHP HYBRID POWERTRAIN & INTERACTIVE REV TACHOMETER */}
        <CyberPowertrain />

        {/* SECTION 03: ACTIVE AERODYNAMICS & CFD WIND TUNNEL SIMULATOR */}
        <CyberAerodynamics />

        {/* SECTION 04: NEURAL COCKPIT & CHASSIS TELEMETRY */}
        <CyberCockpit />

        {/* SECTION 05: FACTORY TELEMETRY & FULL SPECIFICATIONS MATRIX */}
        <TechnicalSpecs />

        {/* SECTION 06: BESPOKE SCARLET ATELIER CONFIGURATOR */}
        <FinishCustomizer
          colorOptions={COLOR_OPTIONS}
          activeColor={activeColor}
          onSelectColor={setActiveColor}
          wheelOptions={WHEEL_OPTIONS}
          activeWheel={activeWheel}
          onSelectWheel={setActiveWheel}
        />

      </main>

      {/* Cyberpunk Footer */}
      <Footer />

      {/* Allocation Reservation Modal */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        selectedColorName={activeColor.name}
      />
    </div>
  );
}
