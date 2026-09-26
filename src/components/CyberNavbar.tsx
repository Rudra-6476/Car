import React, { useState, useEffect } from 'react';
import { Flame, ArrowUpRight, Volume2, VolumeX, Menu, X, Shield, Activity } from 'lucide-react';
import { carAudio } from '../utils/audioEngine';

interface CyberNavbarProps {
  onOpenReserve: () => void;
  onQuickRev: () => void;
}

export const CyberNavbar: React.FC<CyberNavbarProps> = ({
  onOpenReserve,
  onQuickRev,
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    carAudio.init();
    carAudio.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 bg-[#050408]/95 backdrop-blur-2xl border-b border-red-600/30 shadow-[0_10px_35px_rgba(0,0,0,0.9)] ${
        isScrolled ? 'py-3' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Cyberpunk Badge */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-left group flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center shadow-[0_0_15px_#ff003c] border border-red-400 group-hover:scale-105 transition-transform">
                <span className="text-white font-black font-display text-base">A</span>
              </div>
              <div>
                <span className="text-lg sm:text-2xl font-black font-display tracking-tight text-white flex items-center gap-1.5 uppercase group-hover:text-red-400 transition-colors">
                  APEX <span className="text-red-500 font-normal">SCARLET GT</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 tracking-widest hidden xs:block sm:block -mt-1">
                  1,050 BHP HYBRID HYPERCAR
                </span>
              </div>
            </button>

            {/* Status Pill */}
            <div className="hidden xl:flex items-center gap-1.5 ml-4 px-2.5 py-1 rounded bg-red-950/60 border border-red-500/30 text-[10px] font-mono text-red-400">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>SYS: ARMED</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-wider">
            <button
              onClick={() => scrollTo('overview')}
              className="text-neutral-400 hover:text-red-400 transition-colors"
            >
              [ 01 // 360° HYPERCAR ]
            </button>
            <button
              onClick={() => scrollTo('powertrain')}
              className="text-neutral-400 hover:text-red-400 transition-colors"
            >
              [ 02 // POWERTRAIN ]
            </button>
            <button
              onClick={() => scrollTo('aerodynamics')}
              className="text-neutral-400 hover:text-red-400 transition-colors"
            >
              [ 03 // AERO CFD ]
            </button>
            <button
              onClick={() => scrollTo('cockpit')}
              className="text-neutral-400 hover:text-red-400 transition-colors"
            >
              [ 04 // COCKPIT ]
            </button>
            <button
              onClick={() => scrollTo('specs')}
              className="text-neutral-400 hover:text-red-400 transition-colors"
            >
              [ 05 // SPECS ]
            </button>
            <button
              onClick={() => scrollTo('finishes')}
              className="text-neutral-400 hover:text-red-400 transition-colors"
            >
              [ 06 // ATELIER ]
            </button>
          </nav>

          {/* Right Action Toolbar */}
          <div className="flex items-center gap-3">
            {/* Quick Engine Rev Button */}
            <button
              onClick={onQuickRev}
              title="Ignite V8 Sound"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-600/40 text-xs font-mono text-white transition-all shadow-[0_0_15px_rgba(255,0,60,0.3)]"
            >
              <Flame className="w-3.5 h-3.5 text-red-500" />
              <span>IGNITE V8</span>
            </button>

            {/* Audio Mute/Unmute */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="p-2 rounded-xl bg-black/50 border border-white/10 hover:border-red-500 text-neutral-400 hover:text-white transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-400" />}
            </button>

            {/* Reserve Allocation CTA */}
            <button
              onClick={onOpenReserve}
              className="px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(255,0,60,0.6)] hover:shadow-[0_0_30px_rgba(255,0,60,0.9)] flex items-center gap-1.5"
            >
              <span className="hidden sm:inline">RESERVE CHASSIS</span>
              <span className="sm:hidden">RESERVE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-black/60 border border-white/10 text-neutral-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 p-5 rounded-2xl bg-[#0b0912]/95 border border-red-600/50 backdrop-blur-2xl flex flex-col gap-3 font-mono text-sm">
            <button
              onClick={() => scrollTo('overview')}
              className="text-left py-2 px-3 rounded-lg hover:bg-red-950/60 text-white"
            >
              01 // 360° HYPERCAR
            </button>
            <button
              onClick={() => scrollTo('powertrain')}
              className="text-left py-2 px-3 rounded-lg hover:bg-red-950/60 text-white"
            >
              02 // 1,050 BHP HYBRID POWERTRAIN
            </button>
            <button
              onClick={() => scrollTo('aerodynamics')}
              className="text-left py-2 px-3 rounded-lg hover:bg-red-950/60 text-white"
            >
              03 // ACTIVE DOWNFORCE & CFD LAB
            </button>
            <button
              onClick={() => scrollTo('cockpit')}
              className="text-left py-2 px-3 rounded-lg hover:bg-red-950/60 text-white"
            >
              04 // NEURAL COCKPIT & CHASSIS
            </button>
            <button
              onClick={() => scrollTo('specs')}
              className="text-left py-2 px-3 rounded-lg hover:bg-red-950/60 text-white"
            >
              05 // FACTORY SPECIFICATIONS MATRIX
            </button>
            <button
              onClick={() => scrollTo('finishes')}
              className="text-left py-2 px-3 rounded-lg hover:bg-red-950/60 text-white"
            >
              06 // ATELIER BESPOKE CONFIGURATOR
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
