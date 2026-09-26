import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';
import { carAudio } from '../utils/audioEngine';

interface NavbarProps {
  onOpenTestDrive: () => void;
  onOpenRevStation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTestDrive, onOpenRevStation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleSound = () => {
    carAudio.init();
    const muted = carAudio.toggleMute();
    setIsMuted(muted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#070709]/90 backdrop-blur-md border-b border-red-950/60 py-3 shadow-lg shadow-black/60'
          : 'bg-transparent border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2 group font-display"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_10px_#ef4444] group-hover:scale-125 transition-transform" />
          <span>APEX SCARLET GT</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a href="#overview" className="hover:text-red-500 transition-colors">
            Overview
          </a>
          <a href="#aerodynamics" className="hover:text-red-500 transition-colors">
            Aerodynamics
          </a>
          <a href="#engine" className="hover:text-red-500 transition-colors">
            Engine Roar
          </a>
          <a href="#finishes" className="hover:text-red-500 transition-colors">
            Finishes
          </a>
          <a href="#cinematic" className="hover:text-red-500 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Cinematic Stage
          </a>
          <a href="#specs" className="hover:text-red-500 transition-colors">
            Specifications
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleSound}
            title={isMuted ? 'Unmute V8 Engine Sound' : 'Mute Engine Sound'}
            className="p-2 text-neutral-400 hover:text-red-400 transition-colors rounded-lg border border-neutral-800 hover:border-red-900/50 bg-neutral-900/60"
            aria-label="Toggle engine sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-red-500" />}
          </button>

          <button
            onClick={onOpenTestDrive}
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-500 active:bg-red-700 rounded transition-all duration-200 shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] whitespace-nowrap"
          >
            Inquire Allocation
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0e] border-b border-red-950/60 px-6 py-5 flex flex-col gap-4">
          <a
            href="#overview"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-red-500 font-medium py-1"
          >
            Overview
          </a>
          <a
            href="#aerodynamics"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-red-500 font-medium py-1"
          >
            Aerodynamics
          </a>
          <a
            href="#engine"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenRevStation();
            }}
            className="text-neutral-300 hover:text-red-500 font-medium py-1"
          >
            Engine Studio
          </a>
          <a
            href="#finishes"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-red-500 font-medium py-1"
          >
            Finishes
          </a>
          <a
            href="#cinematic"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-red-500 font-medium py-1"
          >
            Cinematic Stage
          </a>
          <a
            href="#specs"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-red-500 font-medium py-1"
          >
            Specifications
          </a>
        </div>
      )}
    </header>
  );
};
