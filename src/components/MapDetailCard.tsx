'use client';

import { Bathroom } from '@/data/bathrooms';
import { Star, Accessibility, Footprints, Info } from 'lucide-react';

interface MapDetailCardProps {
  bathroom: Bathroom;
  onClose?: () => void;
}

export default function MapDetailCard({ bathroom, onClose }: MapDetailCardProps) {
  return (
    <div className="w-[380px] bg-[var(--surface)]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="h-44 w-full relative">
        <img 
          src={bathroom.image} 
          alt={bathroom.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)]/80 to-transparent"></div>
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md ${bathroom.isOpen ? 'bg-[var(--success)]/20 text-[var(--success)] border border-[var(--success)]/30' : 'bg-[var(--error)]/20 text-[var(--error)] border border-[var(--error)]/30'}`}>
          {bathroom.isOpen ? 'Open' : 'Closed'}
        </div>
      </div>
      <div className="p-8 pt-2">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-3xl font-black text-white tracking-tighter leading-none">{bathroom.name}</h3>
          <div className="bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-[var(--accent)]/20">
            {bathroom.walkingTime} min
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-2 text-[var(--text-secondary)] text-sm font-bold">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span>{bathroom.rating}</span>
            <span className="opacity-50">(242 reviews)</span>
          </div>

          <div className="flex items-center space-x-3 text-white/70 text-sm font-medium">
            <div className="p-1.5 bg-white/5 rounded-lg">
              <Footprints className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <span>{(bathroom.distance || 0) / 1000} km walking distance</span>
          </div>

          <div className="flex items-center space-x-3 text-white/70 text-sm font-medium">
            <div className="p-1.5 bg-white/5 rounded-lg">
              <Accessibility className="w-4 h-4 text-[var(--accent)]" />
            </div>
            <span>Fully accessible facility</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-[#6366f1]/20 text-[#818cf8] px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-[#818cf8]/30 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            Target
          </div>
        </div>
      </div>
    </div>
  );
}
