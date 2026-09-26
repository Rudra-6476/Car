import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Calendar, MapPin, Mail, User } from 'lucide-react';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedColorName: string;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  selectedColorName,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Monaco Circuit & Atelier');
  const [date, setDate] = useState('2026-10-15');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allocationId, setAllocationId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;

    const randomNum = Math.floor(100 + Math.random() * 900);
    setAllocationId(`SCARLET-ALLOC-#${randomNum}`);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0e0d15] border border-red-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-red-500 uppercase tracking-widest mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Strictly Limited Allocation</span>
            </div>
            <h3 className="text-2xl font-bold text-white font-display">
              Reserve VIP Track Experience
            </h3>
            <p className="text-xs text-neutral-400 mt-1 mb-6">
              Selected Configuration: <strong className="text-red-400">{selectedColorName}</strong>. A dedicated factory concierge will coordinate private track logistics.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-1.5">
                  Full Legal Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    placeholder="Lord Alexander Sterling"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-red-500 text-white text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-1.5">
                  Private Contact Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="email"
                    required
                    placeholder="alexander@sterling-motors.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-red-500 text-white text-sm focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-1.5">
                    Test Location / Circuit
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-red-500 text-white text-xs focus:outline-none transition-colors appearance-none"
                    >
                      <option>Monaco Circuit & Atelier</option>
                      <option>Nürburgring Nordschleife (DE)</option>
                      <option>Silverstone GP Circuit (UK)</option>
                      <option>Laguna Seca Raceway (USA)</option>
                      <option>Fiorano Private Track (IT)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase mb-1.5">
                    Target Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-red-500 text-white text-xs focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase mb-1.5">
                  Private Garage Collection / Requirements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Existing hypercars in garage, helmet sizing, telemetry telemetry preferences..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black border border-neutral-800 focus:border-red-500 text-white text-xs focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all"
                >
                  Confirm Allocation Inscription
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <CheckCircle className="w-14 h-14 text-red-500 mx-auto mb-4 animate-bounce" />
            <h3 className="text-2xl font-bold text-white font-display">
              Allocation Inscribed
            </h3>
            <p className="text-sm text-neutral-300 mt-2 max-w-sm mx-auto">
              Welcome, <strong className="text-white">{fullName}</strong>. Your provisional hypercar build slot is reserved.
            </p>

            <div className="my-6 p-4 rounded-2xl bg-black/60 border border-red-900/60 inline-block">
              <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
                CONFIDENTIAL ALLOCATION NUMBER
              </span>
              <span className="text-xl font-bold font-mono text-red-400 tracking-wider">
                {allocationId}
              </span>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm mx-auto mb-6">
              Our factory atelier will send telemetry documentation and private circuit passes to <strong className="text-neutral-200">{email}</strong> within 12 hours.
            </p>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-wider border border-white/10 transition-colors"
            >
              Return to Hypercar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
