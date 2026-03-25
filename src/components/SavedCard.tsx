'use client';

import { Bathroom } from '@/data/bathrooms';
import { Star, Trash2 } from 'lucide-react';

interface SavedCardProps {
  bathroom: Bathroom;
  onRemove: (id: string) => void;
  onSelect: (bathroom: Bathroom) => void;
}

export default function SavedCard({ bathroom, onRemove, onSelect }: SavedCardProps) {
  return (
    <div 
      onClick={() => onSelect(bathroom)}
      className="bg-[var(--surface)]/40 border border-white/5 rounded-[32px] p-6 hover:bg-[var(--surface)] transition-all group cursor-pointer"
    >
      <div className="flex space-x-6 items-center">
        <div className="w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shrink-0">
          <img src={bathroom.image} alt={bathroom.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-black text-lg mb-1 group-hover:text-[var(--accent)] transition-colors leading-tight">{bathroom.name}</h4>
          <p className="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest mb-3">{bathroom.address}</p>
          <div className="flex items-center space-x-2 text-[var(--accent)] text-[10px] font-black uppercase tracking-widest">
            <Star className="w-3 h-3 fill-current" />
            <span>{bathroom.rating} • 5-Star Experience</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
        <div className="flex space-x-2">
          {bathroom.features.slice(0, 2).map((f, i) => (
            <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-black text-white/40 uppercase tracking-widest border border-white/5">{f}</span>
          ))}
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRemove(bathroom.id);
          }}
          className="flex items-center space-x-2 text-[var(--error)]/60 hover:text-[var(--error)] text-[10px] font-black uppercase tracking-widest transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
}
