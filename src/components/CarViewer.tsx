import React, { useState } from 'react';
import { ViewAngle, CarColorFinish, WheelFinish } from '../types';
import { Eye, Zap, Flame, Wind, Compass, ShieldAlert } from 'lucide-react';

interface CarViewerProps {
  currentAngle: ViewAngle;
  onAngleChange: (angle: ViewAngle) => void;
  activeColor: CarColorFinish;
  activeWheel: WheelFinish;
  isEngineRevving?: boolean;
}

export const CarViewer: React.FC<CarViewerProps> = ({
  currentAngle,
  onAngleChange,
  activeColor,
  activeWheel,
  isEngineRevving = false,
}) => {
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [activeAeroWing, setActiveAeroWing] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  // Derive gradient fills and metallic accents based on selected color finish
  const primaryRed = activeColor.hex;
  const secondaryRed = activeColor.secondaryHex;
  const isMatte = activeColor.matte;
  const rimColor = activeWheel.rimColor;
  const caliperColor = activeWheel.caliperColor;

  return (
    <div className="relative w-full aspect-[16/9] max-h-[680px] bg-gradient-to-b from-[#0c0c10] via-[#09090d] to-[#060608] rounded-2xl border border-red-950/40 overflow-hidden flex flex-col justify-between p-4 sm:p-6 shadow-[0_20px_60px_-15px_rgba(220,38,38,0.2)]">
      {/* Background ambient lighting and racing grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-red-600/10 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-red-950/20 to-transparent" />
        {/* Subtle perspective floor grid */}
        <div
          className="absolute bottom-0 inset-x-0 h-40 opacity-25"
          style={{
            backgroundImage: `radial-gradient(ellipse at bottom, rgba(239,68,68,0.3) 0%, transparent 70%), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 40px 40px, 40px 40px',
            transform: 'perspective(500px) rotateX(60deg)',
            transformOrigin: 'bottom center'
          }}
        />
      </div>

      {/* Top Bar inside Stage: View Mode Pills & Technical Status */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3">
        {/* Interactive angle selectors */}
        <div className="flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-md rounded-lg border border-red-900/30">
          <button
            onClick={() => onAngleChange('front34')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all whitespace-nowrap ${
              currentAngle === 'front34'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Front 3/4
          </button>
          <button
            onClick={() => onAngleChange('profile')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all whitespace-nowrap ${
              currentAngle === 'profile'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Profile
          </button>
          <button
            onClick={() => onAngleChange('rear')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all whitespace-nowrap ${
              currentAngle === 'rear'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Rear Diffuser
          </button>
          <button
            onClick={() => onAngleChange('cockpit')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all whitespace-nowrap ${
              currentAngle === 'cockpit'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Cockpit
          </button>
          <button
            onClick={() => onAngleChange('windtunnel')}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all whitespace-nowrap flex items-center gap-1 ${
              currentAngle === 'windtunnel'
                ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                : 'text-neutral-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Wind className="w-3 h-3" />
            Aero Tunnel
          </button>
        </div>

        {/* Feature toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setHeadlightsOn(!headlightsOn)}
            className={`px-2.5 py-1 text-xs rounded border transition-colors flex items-center gap-1.5 ${
              headlightsOn
                ? 'border-red-500/80 bg-red-950/40 text-red-200'
                : 'border-neutral-800 bg-black/40 text-neutral-400'
            }`}
          >
            <Zap className={`w-3 h-3 ${headlightsOn ? 'text-red-400' : 'text-neutral-500'}`} />
            <span>Matrix Laser</span>
          </button>

          <button
            onClick={() => setActiveAeroWing(!activeAeroWing)}
            className={`px-2.5 py-1 text-xs rounded border transition-colors flex items-center gap-1.5 ${
              activeAeroWing
                ? 'border-red-500/80 bg-red-950/40 text-red-200'
                : 'border-neutral-800 bg-black/40 text-neutral-400'
            }`}
          >
            <Compass className={`w-3 h-3 ${activeAeroWing ? 'text-red-400' : 'text-neutral-500'}`} />
            <span>Active Wing</span>
          </button>
        </div>
      </div>

      {/* Center Canvas: Interactive SVG Hypercar Render */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-2 select-none">
        {/* Render based on current angle */}
        {currentAngle === 'profile' && (
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            <svg
              viewBox="0 0 1000 420"
              className="w-full h-full max-h-[380px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bodyGradProfile" x1="0%" y1="0%" x2="100%" y2="50%">
                  <stop offset="0%" stopColor={secondaryRed} />
                  <stop offset="45%" stopColor={primaryRed} />
                  <stop offset="70%" stopColor={secondaryRed} />
                  <stop offset="100%" stopColor="#2b0507" />
                </linearGradient>

                <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e1e24" />
                  <stop offset="50%" stopColor="#0d0d10" />
                  <stop offset="100%" stopColor="#050506" />
                </linearGradient>

                <linearGradient id="carbonSkirt" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#141418" />
                  <stop offset="50%" stopColor="#22222a" />
                  <stop offset="100%" stopColor="#141418" />
                </linearGradient>

                <linearGradient id="glassGloss" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="35%" stopColor="rgba(220,38,38,0.15)" />
                  <stop offset="100%" stopColor="rgba(10,10,14,0.95)" />
                </linearGradient>

                <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Floor Shadow */}
              <ellipse cx="500" cy="355" rx="420" ry="25" fill="black" opacity="0.8" />
              <ellipse cx="500" cy="355" rx="350" ry="14" fill="#500709" opacity="0.35" />

              {/* Headlight Beam Projector on ground */}
              {headlightsOn && (
                <polygon
                  points="870,290 1000,260 1000,345 870,305"
                  fill="url(#glassGloss)"
                  opacity="0.3"
                  filter="url(#laserGlow)"
                />
              )}

              {/* Main Body Monocoque Sculpt */}
              <path
                d="M 110,290
                   C 105,270 120,250 145,245
                   C 190,235 240,240 280,242
                   C 330,195 410,165 520,165
                   C 630,165 720,205 780,250
                   C 830,260 880,275 895,295
                   C 898,300 885,310 860,312
                   L 840,312
                   C 830,265 730,265 710,312
                   L 390,312
                   C 370,265 270,265 250,312
                   L 125,312
                   Z"
                fill="url(#bodyGradProfile)"
                stroke="#ff4d4d"
                strokeWidth={isMatte ? "0.5" : "1.2"}
                strokeOpacity={isMatte ? "0.3" : "0.7"}
              />

              {/* Green House / Cabin Cockpit Canopy */}
              <path
                d="M 360,235
                   C 420,175 480,172 550,172
                   C 620,172 680,195 720,235
                   Z"
                fill="url(#roofGrad)"
              />

              {/* Windshield & Side Glass */}
              <path
                d="M 400,232
                   C 445,182 490,178 540,178
                   C 600,178 650,198 685,232
                   Z"
                fill="url(#glassGloss)"
                stroke="#dc2626"
                strokeWidth="0.8"
                strokeOpacity="0.4"
              />

              {/* Aerodynamic Side Air Intake Scoop (Feeds twin-turbos) */}
              <path
                d="M 370,240
                   C 340,248 310,265 305,285
                   C 320,285 345,280 370,268
                   Z"
                fill="#0a0a0c"
                stroke="#ef4444"
                strokeWidth="1.2"
                strokeOpacity="0.7"
              />

              {/* Active Rear Wing */}
              {activeAeroWing ? (
                <g>
                  {/* Wing Pylons */}
                  <line x1="140" y1="242" x2="135" y2="215" stroke="#1c1c22" strokeWidth="4" />
                  <line x1="180" y1="238" x2="175" y2="215" stroke="#1c1c22" strokeWidth="4" />
                  {/* Carbon Airfoil blade tilted for downforce */}
                  <polygon
                    points="110,212 210,210 205,217 115,221"
                    fill="#15151a"
                    stroke="#dc2626"
                    strokeWidth="1"
                  />
                  {/* Endplate */}
                  <polygon
                    points="105,205 125,203 120,225 102,225"
                    fill="#b91c1c"
                  />
                </g>
              ) : (
                /* Retracted low-drag flush wing */
                <path
                  d="M 125,245 L 200,240 L 198,244 L 125,248 Z"
                  fill="#15151a"
                  stroke="#ef4444"
                  strokeWidth="0.8"
                />
              )}

              {/* Front Carbon Splitter and Rear Diffuser Underskirts */}
              <rect x="110" y="308" width="780" height="7" fill="url(#carbonSkirt)" rx="2" />
              <polygon points="100,314 125,308 125,315" fill="#dc2626" />
              <polygon points="865,308 895,314 865,315" fill="#15151a" />

              {/* Front Matrix Laser Light */}
              <polygon
                points="845,280 885,288 875,294 840,287"
                fill={headlightsOn ? '#ff3b3b' : '#3d0d0f'}
                filter={headlightsOn ? 'url(#laserGlow)' : undefined}
              />

              {/* Rear Crimson LED Light Blade */}
              <polygon
                points="115,255 145,250 145,255 118,260"
                fill="#ff1122"
                filter="url(#laserGlow)"
              />

              {/* REAR WHEEL ASSEMBLY */}
              <g transform="translate(310, 310)">
                {/* Tire Rubber */}
                <circle cx="0" cy="0" r="54" fill="#0d0d10" stroke="#1e1e24" strokeWidth="4" />
                {/* Carbon Ceramic Brake Disc */}
                <circle cx="0" cy="0" r="41" fill="#303038" stroke="#484852" strokeWidth="1" />
                {/* Perforated drill pattern on rotor */}
                <circle cx="0" cy="0" r="33" fill="none" stroke="#25252d" strokeWidth="6" strokeDasharray="3 4" />
                {/* Red Monobloc Caliper */}
                <path
                  d="M -15,-38 A 38 38 0 0 1 28,-28 L 22,-18 A 28 28 0 0 0 -10,-28 Z"
                  fill={caliperColor}
                  stroke="#ff6666"
                  strokeWidth="0.8"
                />
                {/* Forged Multi-spoke Rim */}
                <circle cx="0" cy="0" r="30" fill="none" stroke={rimColor} strokeWidth="3" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
                  <line
                    key={ang}
                    x1="0"
                    y1="0"
                    x2={Math.cos((ang * Math.PI) / 180) * 30}
                    y2={Math.sin((ang * Math.PI) / 180) * 30}
                    stroke={rimColor}
                    strokeWidth="2.5"
                  />
                ))}
                {/* Center Hub Nut */}
                <circle cx="0" cy="0" r="7" fill="#dc2626" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
              </g>

              {/* FRONT WHEEL ASSEMBLY */}
              <g transform="translate(770, 310)">
                {/* Tire Rubber */}
                <circle cx="0" cy="0" r="54" fill="#0d0d10" stroke="#1e1e24" strokeWidth="4" />
                {/* Carbon Ceramic Rotor */}
                <circle cx="0" cy="0" r="41" fill="#303038" stroke="#484852" strokeWidth="1" />
                <circle cx="0" cy="0" r="33" fill="none" stroke="#25252d" strokeWidth="6" strokeDasharray="3 4" />
                {/* Front Caliper */}
                <path
                  d="M -15,-38 A 38 38 0 0 1 28,-28 L 22,-18 A 28 28 0 0 0 -10,-28 Z"
                  fill={caliperColor}
                  stroke="#ff6666"
                  strokeWidth="0.8"
                />
                {/* Forged Multi-spoke Rim */}
                <circle cx="0" cy="0" r="30" fill="none" stroke={rimColor} strokeWidth="3" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => (
                  <line
                    key={ang}
                    x1="0"
                    y1="0"
                    x2={Math.cos((ang * Math.PI) / 180) * 30}
                    y2={Math.sin((ang * Math.PI) / 180) * 30}
                    stroke={rimColor}
                    strokeWidth="2.5"
                  />
                ))}
                <circle cx="0" cy="0" r="7" fill="#dc2626" />
                <circle cx="0" cy="0" r="3" fill="#ffffff" />
              </g>

              {/* Optional Racing Aero Stripe */}
              {activeColor.stripeColor && (
                <path
                  d="M 140,248 C 300,242 550,172 740,240 L 740,246 C 550,178 300,248 140,254 Z"
                  fill={activeColor.stripeColor}
                  opacity="0.9"
                />
              )}
            </svg>
          </div>
        )}

        {currentAngle === 'front34' && (
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            <svg
              viewBox="0 0 1000 450"
              className="w-full h-full max-h-[400px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="frontNoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={primaryRed} />
                  <stop offset="60%" stopColor={secondaryRed} />
                  <stop offset="100%" stopColor="#250507" />
                </linearGradient>

                <linearGradient id="windshieldFront" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="60%" stopColor="rgba(15,15,20,0.9)" />
                  <stop offset="100%" stopColor="#050508" />
                </linearGradient>

                <filter id="laserBeamFront">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ground Shadow */}
              <ellipse cx="500" cy="380" rx="420" ry="24" fill="black" opacity="0.85" />
              <ellipse cx="500" cy="380" rx="320" ry="12" fill="#58080a" opacity="0.4" />

              {/* Headlight beams shooting forward */}
              {headlightsOn && (
                <>
                  <polygon
                    points="320,290 180,440 280,440 350,295"
                    fill="rgba(239,68,68,0.25)"
                    filter="url(#laserBeamFront)"
                  />
                  <polygon
                    points="680,290 650,295 720,440 820,440"
                    fill="rgba(239,68,68,0.25)"
                    filter="url(#laserBeamFront)"
                  />
                </>
              )}

              {/* Rear Wing visible in perspective */}
              {activeAeroWing && (
                <polygon
                  points="260,180 740,180 730,195 270,195"
                  fill="#15151c"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                />
              )}

              {/* Cockpit Roof & Windshield Arch */}
              <path
                d="M 330,225
                   C 380,140 620,140 670,225
                   L 710,265
                   C 600,260 400,260 290,265
                   Z"
                fill="url(#windshieldFront)"
                stroke="#ef4444"
                strokeWidth="1"
                strokeOpacity="0.4"
              />

              {/* Wide Front Fenders & Low Sculpted Nose */}
              <path
                d="M 180,335
                   C 170,280 230,260 290,265
                   C 360,265 420,285 500,285
                   C 580,285 640,265 710,265
                   C 770,260 830,280 820,335
                   C 810,355 770,365 730,365
                   C 660,365 600,345 500,345
                   C 400,345 340,365 270,365
                   C 230,365 190,355 180,335
                   Z"
                fill="url(#frontNoseGrad)"
                stroke="#ff4d4d"
                strokeWidth="1.5"
                strokeOpacity="0.8"
              />

              {/* Hood Heat Extraction Nostrils (Venturi Tunnel Openings) */}
              <polygon
                points="420,270 480,270 470,280 430,280"
                fill="#0a0a0e"
                stroke="#dc2626"
                strokeWidth="1"
              />
              <polygon
                points="520,270 580,270 570,280 530,280"
                fill="#0a0a0e"
                stroke="#dc2626"
                strokeWidth="1"
              />

              {/* Piercing Matrix LED Headlights */}
              <polygon
                points="270,285 350,292 345,302 265,295"
                fill={headlightsOn ? '#ff3344' : '#30080a'}
                filter={headlightsOn ? 'url(#laserBeamFront)' : undefined}
                stroke="#ff8888"
                strokeWidth="0.8"
              />
              <polygon
                points="730,285 650,292 655,302 735,295"
                fill={headlightsOn ? '#ff3344' : '#30080a'}
                filter={headlightsOn ? 'url(#laserBeamFront)' : undefined}
                stroke="#ff8888"
                strokeWidth="0.8"
              />

              {/* Lower Carbon Splitter with Active Aero Canards */}
              <path
                d="M 220,365 L 780,365 L 760,378 L 240,378 Z"
                fill="#121217"
                stroke="#ef4444"
                strokeWidth="1"
              />
              {/* Canards on sides */}
              <polygon points="180,335 220,365 205,370 170,340" fill="#dc2626" />
              <polygon points="820,335 780,365 795,370 830,340" fill="#dc2626" />

              {/* Massive Center Radiator Grille */}
              <polygon
                points="330,325 670,325 650,360 350,360"
                fill="#08080a"
                stroke="#b91c1c"
                strokeWidth="1.2"
              />

              {/* Front Apex Emblem Badge */}
              <polygon points="500,275 510,290 490,290" fill="#ef4444" stroke="#ffffff" strokeWidth="0.6" />

              {/* Front Tires visible in stance */}
              <rect x="195" y="320" width="35" height="52" fill="#0d0d10" rx="6" />
              <rect x="770" y="320" width="35" height="52" fill="#0d0d10" rx="6" />
            </svg>
          </div>
        )}

        {currentAngle === 'rear' && (
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            <svg
              viewBox="0 0 1000 450"
              className="w-full h-full max-h-[400px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <filter id="exhaustFlame">
                  <feGaussianBlur stdDeviation="7" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Ground Shadow */}
              <ellipse cx="500" cy="385" rx="420" ry="24" fill="black" opacity="0.85" />
              <ellipse cx="500" cy="385" rx="300" ry="12" fill="#680b0e" opacity="0.4" />

              {/* Massive Active Rear Airfoil Wing */}
              {activeAeroWing && (
                <g>
                  {/* Swan Neck Pylons */}
                  <path d="M 410,240 C 400,160 415,140 430,135" stroke="#1d1d25" strokeWidth="8" fill="none" />
                  <path d="M 590,240 C 600,160 585,140 570,135" stroke="#1d1d25" strokeWidth="8" fill="none" />
                  {/* Main Carbon Airfoil */}
                  <polygon
                    points="200,130 800,130 790,148 210,148"
                    fill="#15151c"
                    stroke="#ef4444"
                    strokeWidth="1.8"
                  />
                  {/* Endplates */}
                  <polygon points="190,115 215,115 210,160 185,160" fill="#dc2626" />
                  <polygon points="810,115 785,115 790,160 815,160" fill="#dc2626" />
                </g>
              )}

              {/* Muscular Rear Hips and Tail */}
              <path
                d="M 210,325
                   C 195,275 255,230 330,230
                   C 420,230 450,225 500,225
                   C 550,225 580,230 670,230
                   C 745,230 805,275 790,325
                   L 770,355
                   C 660,355 340,355 230,355
                   Z"
                fill={primaryRed}
                stroke="#ff4d4d"
                strokeWidth="1.5"
                strokeOpacity="0.8"
              />

              {/* Continuous Horizon Tail Light Bar (Iconic Crimson Blade) */}
              <path
                d="M 240,265 C 380,250 620,250 760,265 L 755,272 C 620,257 380,257 245,272 Z"
                fill="#ff1133"
                filter="url(#exhaustFlame)"
              />

              {/* Quad Titanium Center Exhaust Ports */}
              <g transform="translate(440, 295)">
                {/* Exhaust Tips */}
                <ellipse cx="20" cy="18" rx="14" ry="14" fill="#0d0d12" stroke="#2563eb" strokeWidth="2.5" />
                <ellipse cx="50" cy="18" rx="14" ry="14" fill="#0d0d12" stroke="#9333ea" strokeWidth="2.5" />
                <ellipse cx="80" cy="18" rx="14" ry="14" fill="#0d0d12" stroke="#9333ea" strokeWidth="2.5" />
                <ellipse cx="110" cy="18" rx="14" ry="14" fill="#0d0d12" stroke="#2563eb" strokeWidth="2.5" />

                {/* Flame / Rev Backfire Animation when Revving */}
                {isEngineRevving && (
                  <g filter="url(#exhaustFlame)">
                    <polygon points="12,18 20,45 28,18" fill="#38bdf8" />
                    <polygon points="42,18 50,55 58,18" fill="#f97316" />
                    <polygon points="72,18 80,55 88,18" fill="#f97316" />
                    <polygon points="102,18 110,45 118,18" fill="#38bdf8" />
                  </g>
                )}
              </g>

              {/* Carbon Rear Diffuser Strakes (Massive Downforce Extractor) */}
              <path
                d="M 250,350 L 750,350 L 730,380 L 270,380 Z"
                fill="#0f0f14"
                stroke="#dc2626"
                strokeWidth="1.2"
              />
              {/* Diffuser vertical fins */}
              <rect x="340" y="348" width="6" height="34" fill="#262630" />
              <rect x="420" y="348" width="6" height="34" fill="#262630" />
              <rect x="580" y="348" width="6" height="34" fill="#262630" />
              <rect x="660" y="348" width="6" height="34" fill="#262630" />
              {/* Center F1-style rain light */}
              <rect x="488" y="358" width="24" height="12" fill="#ef4444" rx="2" filter="url(#exhaustFlame)" />

              {/* Rear Wide Steamroller Tires (335/30 ZR21) */}
              <rect x="180" y="310" width="55" height="65" fill="#0d0d10" rx="4" />
              <rect x="765" y="310" width="55" height="65" fill="#0d0d10" rx="4" />
            </svg>
          </div>
        )}

        {currentAngle === 'cockpit' && (
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            <svg
              viewBox="0 0 1000 450"
              className="w-full h-full max-h-[400px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="carbonDash" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#111116" />
                  <stop offset="50%" stopColor="#1a1a24" />
                  <stop offset="100%" stopColor="#111116" />
                </linearGradient>
                <filter id="cockpitGlow">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Windshield View: Night Circuit with Red Track Kerbs */}
              <polygon points="120,40 880,40 820,240 180,240" fill="#050508" />
              <line x1="500" y1="40" x2="350" y2="240" stroke="#ef4444" strokeWidth="2" strokeDasharray="10 15" />
              <line x1="500" y1="40" x2="650" y2="240" stroke="#ef4444" strokeWidth="2" strokeDasharray="10 15" />

              {/* Sculpted Carbon Alcantara Dashboard */}
              <path
                d="M 100,240
                   C 300,210 700,210 900,240
                   L 950,450
                   L 50,450
                   Z"
                fill="url(#carbonDash)"
                stroke="#b91c1c"
                strokeWidth="1.5"
              />

              {/* Crimson Contrast Stitching Along Dashboard */}
              <path
                d="M 120,245 C 320,215 680,215 880,245"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="4 6"
                fill="none"
              />

              {/* Digital Instrument Cluster Screen (HUD) */}
              <g transform="translate(360, 180)">
                <rect x="0" y="0" width="280" height="120" rx="8" fill="#05050a" stroke="#dc2626" strokeWidth="2" />
                {/* Digital RPM Arc */}
                <path
                  d="M 30,95 A 100 100 0 0 1 250,95"
                  fill="none"
                  stroke="#331012"
                  strokeWidth="8"
                />
                <path
                  d="M 30,95 A 100 100 0 0 1 180,35"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="8"
                  filter="url(#cockpitGlow)"
                />
                <text x="140" y="70" textAnchor="middle" fill="#ffffff" fontFamily="sans-serif" fontSize="28" fontWeight="bold">
                  248
                </text>
                <text x="140" y="85" textAnchor="middle" fill="#ef4444" fontFamily="sans-serif" fontSize="11" fontWeight="600" letterSpacing="2">
                  MPH · GEAR 7
                </text>
                <text x="50" y="105" fill="#71717a" fontSize="10" fontFamily="monospace">
                  8,450 RPM
                </text>
                <text x="210" y="105" fill="#ef4444" fontSize="10" fontFamily="monospace">
                  1.84 G
                </text>
              </g>

              {/* Alcantara Racing Bucket Seat Bolsters (Left & Right) */}
              <path d="M 50,280 C 70,360 110,430 180,450 L 50,450 Z" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />
              <path d="M 950,280 C 930,360 890,430 820,450 L 950,450 Z" fill="#7f1d1d" stroke="#ef4444" strokeWidth="1" />

              {/* Ergonomic F1-style Steering Wheel with Carbon & Shift LEDs */}
              <g transform="translate(500, 360)">
                {/* Steering Wheel Rim */}
                <rect x="-160" y="-80" width="320" height="150" rx="55" fill="none" stroke="#22222c" strokeWidth="28" />
                <rect x="-160" y="-80" width="320" height="150" rx="55" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="8 8" />

                {/* Shift Light Strip at top of steering wheel */}
                <g transform="translate(0, -70)">
                  {[-40, -20, 0, 20, 40].map((x, i) => (
                    <circle
                      key={x}
                      cx={x}
                      cy="0"
                      r="4.5"
                      fill={i < 3 ? '#22c55e' : '#ef4444'}
                      filter="url(#cockpitGlow)"
                    />
                  ))}
                </g>

                {/* Center Hub & Screws */}
                <rect x="-70" y="-30" width="140" height="75" rx="14" fill="#13131a" stroke="#444455" strokeWidth="2" />
                <polygon points="0,-12 12,10 -12,10" fill="#dc2626" />

                {/* Rotary Dials for Driving Modes (CORSA, RACE, WET) */}
                <circle cx="-40" cy="12" r="10" fill="#b91c1c" stroke="#ff8888" strokeWidth="1" />
                <circle cx="40" cy="12" r="10" fill="#0d0d12" stroke="#dc2626" strokeWidth="1" />
                <text x="0" y="28" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold" letterSpacing="1">
                  CORSA MODE
                </text>

                {/* Carbon Paddle Shifters behind wheel */}
                <path d="M -160,-60 L -180,-20 L -155,10" stroke="#7f1d1d" strokeWidth="8" strokeLinecap="round" fill="none" />
                <path d="M 160,-60 L 180,-20 L 155,10" stroke="#ef4444" strokeWidth="8" strokeLinecap="round" fill="none" />
              </g>
            </svg>
          </div>
        )}

        {currentAngle === 'windtunnel' && (
          <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
            <svg
              viewBox="0 0 1000 420"
              className="w-full h-full max-h-[380px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="streamline" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="30%" stopColor="#ef4444" />
                  <stop offset="70%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* Car Wireframe Silhouette */}
              <path
                d="M 110,290
                   C 105,270 120,250 145,245
                   C 190,235 240,240 280,242
                   C 330,195 410,165 520,165
                   C 630,165 720,205 780,250
                   C 830,260 880,275 895,295
                   L 840,312
                   L 390,312
                   L 125,312 Z"
                fill="#160809"
                stroke="#ef4444"
                strokeWidth="2"
                strokeDasharray="6 4"
              />

              {/* Dynamic Streamlines / Airflow Vectors */}
              <g className="animate-pulse">
                {/* Over the hood and roof */}
                <path
                  d="M 980,280 C 890,270 780,210 520,150 C 350,150 200,200 40,210"
                  fill="none"
                  stroke="url(#streamline)"
                  strokeWidth="3"
                />
                <path
                  d="M 980,260 C 880,245 760,190 520,135 C 330,135 180,180 40,195"
                  fill="none"
                  stroke="url(#streamline)"
                  strokeWidth="2"
                />
                <path
                  d="M 980,300 C 880,290 780,270 520,270 C 350,270 200,285 40,285"
                  fill="none"
                  stroke="url(#streamline)"
                  strokeWidth="2.5"
                />
                {/* Underfloor Ground Effect Venturi Flow */}
                <path
                  d="M 950,335 C 800,335 500,335 200,345 C 100,350 40,355 10,360"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                />
              </g>

              {/* Downforce arrows pointing directly down onto axles */}
              <g transform="translate(310, 110)">
                <line x1="0" y1="0" x2="0" y2="70" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrow)" />
                <polygon points="-7,60 7,60 0,75" fill="#ef4444" />
                <text x="0" y="-10" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  REAR DOWNFORCE 510 KG
                </text>
              </g>

              <g transform="translate(770, 160)">
                <line x1="0" y1="0" x2="0" y2="70" stroke="#ef4444" strokeWidth="3" />
                <polygon points="-7,60 7,60 0,75" fill="#ef4444" />
                <text x="0" y="-10" textAnchor="middle" fill="#ef4444" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  FRONT DOWNFORCE 310 KG
                </text>
              </g>

              <text x="500" y="390" textAnchor="middle" fill="#f87171" fontSize="13" letterSpacing="3" fontFamily="monospace">
                DRAG COEFFICIENT: Cd 0.31 · TOTAL DOWNFORCE: 820 KG @ 180 MPH
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* Bottom Bar inside Stage: Telemetry & Active Color Preview */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-red-950/40 text-xs">
        <div className="flex items-center gap-4 text-neutral-400 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-white font-semibold">FINISH:</span>
            <span className="text-red-400">{activeColor.name}</span>
          </div>
          <span className="hidden sm:inline text-neutral-700">|</span>
          <div className="hidden sm:flex items-center gap-1.5">
            <span className="text-neutral-500">WHEELS:</span>
            <span className="text-neutral-300">{activeWheel.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-neutral-400 hidden md:inline">
            Aero Config: <strong className="text-white">Active Vectoring</strong>
          </span>
          <div className="px-2.5 py-1 bg-red-950/60 border border-red-800/50 rounded text-red-300 font-mono font-medium">
            1,050 BHP HYBRID V8
          </div>
        </div>
      </div>
    </div>
  );
};
