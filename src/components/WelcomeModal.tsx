'use client';

import { useEffect, useState } from 'react';
import { X, Sparkles, MapPin, Navigation } from 'lucide-react';

interface WelcomeModalProps {
  name: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function WelcomeModal({ name, isOpen, onClose }: WelcomeModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl animate-in fade-in duration-500">
      <div 
        className="relative w-full max-w-lg bg-gradient-to-br from-[var(--surface)] to-transparent border border-white/10 rounded-[48px] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden group animate-in zoom-in-95 slide-in-from-bottom-8 duration-700"
      >
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] rounded-full -mr-32 -mt-32 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full -ml-32 -mb-32 animate-pulse transition-delay-1000"></div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-3 rounded-full bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative z-10 text-center">
          <div className="w-24 h-24 bg-gradient-to-tr from-[var(--accent)] to-blue-600 rounded-[32px] flex items-center justify-center mx-auto mb-10 shadow-[0_20px_40px_rgba(0,229,255,0.3)] rotate-3 group-hover:rotate-6 transition-transform duration-500">
            <Sparkles className="w-10 h-10 text-[var(--surface)]" />
          </div>

          <h2 className="text-5xl font-black text-white tracking-tighter mb-6 leading-tight">
            Welcome back,<br />
            <span className="text-[var(--accent)] drop-shadow-[0_0_15px_rgba(0,229,255,0.3)]">{name}</span>
          </h2>

          <p className="text-[var(--text-secondary)] text-lg font-medium leading-relaxed mb-12 max-w-sm mx-auto">
            Ready to explore Paris? We've mapped the best facilities to ensure your journey is as smooth as possible.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-12 text-left">
            <div className="bg-white/5 border border-white/5 rounded-3xl p-5">
              <div className="flex items-center space-x-3 mb-2">
                <MapPin className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Real-time</span>
              </div>
              <p className="text-xs font-bold text-white leading-tight">Accurate live locations across Paris</p>
            </div>
            <div className="bg-white/5 border border-white/5 rounded-3xl p-5">
              <div className="flex items-center space-x-3 mb-2">
                <Navigation className="w-4 h-4 text-[var(--accent)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Route Ready</span>
              </div>
              <p className="text-xs font-bold text-white leading-tight">Instant directions to any facility</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full py-6 bg-[var(--accent)] text-[var(--surface)] font-black rounded-[32px] shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:shadow-[0_25px_50px_rgba(0,229,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-[0.2em]"
          >
            Start Exploring
          </button>
        </div>
      </div>
    </div>
  );
}
