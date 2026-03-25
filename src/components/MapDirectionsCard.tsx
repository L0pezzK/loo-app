'use client';

import { Bathroom } from '@/data/bathrooms';
import { Compass, Navigation2, Share2, Bookmark, Map as MapIcon, ChevronRight } from 'lucide-react';

interface MapDirectionsCardProps {
  bathroom: Bathroom;
  onClose?: () => void;
}

export default function MapDirectionsCard({ bathroom, onClose }: MapDirectionsCardProps) {
  return (
    <div className="w-[380px] bg-[var(--surface)]/80 backdrop-blur-2xl border border-white/10 rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-bottom-8 duration-500 mt-4">
      <div className="p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/20 flex items-center justify-center border border-[var(--accent)]/30">
            <Compass className="w-6 h-6 text-[var(--accent)]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">Ready to go?</h3>
            <p className="text-[var(--text-secondary)] text-xs font-medium max-w-[200px]">
              Continuing your journey? Launch turn-by-turn navigation in your preferred app.
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-8">
          <a 
            href={`https://www.google.com/maps/dir/?api=1&destination=${bathroom.lat},${bathroom.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#8AB4F8]/10 border border-[#8AB4F8]/20 text-[#8AB4F8] font-bold py-4 px-6 rounded-2xl hover:bg-[#8AB4F8]/20 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center space-x-3">
              <MapIcon className="w-5 h-5" />
              <span>Open in Google Maps</span>
            </div>
            <Navigation2 className="w-4 h-4 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
          
          <a 
            href={`http://maps.apple.com/?daddr=${bathroom.lat},${bathroom.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-white/5 border border-white/10 text-white font-bold py-4 px-6 rounded-2xl hover:bg-white/10 transition-all flex items-center justify-between group"
          >
             <div className="flex items-center space-x-3">
              <Navigation2 className="w-5 h-5" />
              <span>Open in Apple Maps</span>
            </div>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="flex space-x-3">
          <button className="flex-1 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-white/10 transition-all">
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Route</span>
          </button>
          <button className="flex-1 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl flex items-center justify-center space-x-2 hover:bg-white/10 transition-all">
            <Bookmark className="w-3.5 h-3.5" />
            <span>Save Destination</span>
          </button>
        </div>
      </div>
    </div>
  );
}
