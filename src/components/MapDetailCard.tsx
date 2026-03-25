'use client';

import { Bathroom } from '@/data/bathrooms';
import { Star, Navigation, Share2, Accessibility, Clock, Users, ShieldCheck } from 'lucide-react';

interface MapDetailCardProps {
  bathroom: Bathroom;
  onClose?: () => void;
}

export default function MapDetailCard({ bathroom, onClose }: MapDetailCardProps) {
  // Mocking some data that might not be in the bathroom object yet but shown in design
  const fee = bathroom.features.includes('Free') ? 'FREE' : '0.50€ FEE';
  const traffic = 'Low Traffic';
  const waitTime = 'No wait time';

  return (
    <div className="w-[380px] bg-[var(--surface)]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="h-64 w-full relative">
        <img src={bathroom.image} alt={bathroom.name} className="object-cover w-full h-full" />
        <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-1.5 text-sm text-white border border-white/10">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="font-bold">{bathroom.rating}</span>
        </div>
      </div>

      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-1.5 tracking-tight">{bathroom.name}</h3>
          <p className="text-[var(--text-secondary)] text-sm font-medium">{bathroom.address}</p>
        </div>

        <div className="flex space-x-3 mb-10">
          <div className="flex-1 bg-[var(--surface-hover)] border border-white/5 py-3 rounded-2xl flex flex-col items-center justify-center space-y-1">
             <Accessibility className="w-4 h-4 text-[var(--accent)]" />
             <span className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest px-2">Accessible</span>
          </div>
          <div className="flex-1 bg-[var(--surface-hover)] border border-white/5 py-3 rounded-2xl flex flex-col items-center justify-center space-y-1">
             <span className="text-lg font-bold text-white leading-none">€</span>
             <span className="text-[10px] font-black text-white uppercase tracking-widest">{fee}</span>
          </div>
        </div>

        <div className="space-y-6 mb-10">
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-xl ${bathroom.isOpen ? 'bg-[var(--success)]/10' : 'bg-[var(--error)]/10'}`}>
              <Clock className={`w-5 h-5 ${bathroom.isOpen ? 'text-[var(--success)]' : 'text-[var(--error)]'}`} />
            </div>
            <div>
              <p className={`text-sm font-bold ${bathroom.isOpen ? 'text-[var(--success)]' : 'text-[var(--error)]'}`}>
                {bathroom.isOpen ? 'Open Now' : 'Closed'}
              </p>
              <p className="text-[var(--text-secondary)] text-xs font-medium">Closes at 20:00</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-2 rounded-xl bg-orange-500/10">
              <Users className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">{traffic}</p>
              <p className="text-[var(--text-secondary)] text-xs font-medium">{waitTime}</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full bg-[var(--accent)] text-[var(--surface)] font-black py-4 rounded-2xl shadow-[0_10px_20px_rgba(0,229,255,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2">
            <Navigation className="w-4 h-4 fill-current rotate-45" />
            <span>Get Directions</span>
          </button>
          <button className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}
