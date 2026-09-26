import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050507] border-t border-red-950/40 text-neutral-400 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

          {/* Brand Col */}
          <div className="md:col-span-2">
            <a
              href="#"
              className="text-xl font-bold tracking-tight text-white flex items-center gap-2 font-display mb-3"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 shadow-[0_0_8px_#ef4444]" />
              <span>APEX SCARLET GT</span>
            </a>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Bespoke automotive engineering atelier dedicated to the pursuit of uncompromised velocity, carbon fiber aerodynamics, and visceral hybrid performance.
            </p>
          </div>

          {/* Navigation Mirror */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-200 mb-3">
              Hypercar Architecture
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#overview" className="hover:text-red-400 transition-colors">
                  Exterior Perspectives
                </a>
              </li>
              <li>
                <a href="#aerodynamics" className="hover:text-red-400 transition-colors">
                  Computational Aero
                </a>
              </li>
              <li>
                <a href="#engine" className="hover:text-red-400 transition-colors">
                  V8 Powertrain Studio
                </a>
              </li>
              <li>
                <a href="#finishes" className="hover:text-red-400 transition-colors">
                  Crimson Atelier Finishes
                </a>
              </li>
              <li>
                <a href="#cinematic" className="hover:text-red-400 transition-colors">
                  Cinematic Stage
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Atelier */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-neutral-200 mb-3">
              Global Ateliers
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed mb-3">
              Modena Atelier: Via Emilia Est 114, Italy<br />
              Monaco Showroom: Port Hercule, MC 98000
            </p>
            <div className="text-xs text-red-500 font-mono">
              concierge@apex-scarlet.gt
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} APEX SCARLET AUTOMOTIVE S.p.A. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-neutral-300 cursor-pointer">FIA GT Homologation</span>
            <span className="hover:text-neutral-300 cursor-pointer">Track Telemetry</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
