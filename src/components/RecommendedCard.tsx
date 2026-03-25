'use client';

import { Bathroom } from '@/data/bathrooms';
import { ChevronRight, Sparkles } from 'lucide-react';

interface RecommendedCardProps {
  bathroom: Bathroom;
  match: number;
  tag: string;
}

export default function RecommendedCard({ bathroom, match, tag }: RecommendedCardProps) {
  return (
    <div className="relative group cursor-pointer overflow-hidden rounded-[32px] border border-white/10 h-[220px]">
      <img 
        src={bathroom.image} 
        alt={bathroom.name} 
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
      
      <div className="absolute top-4 left-4 flex flex-col space-y-2">
        <span className="bg-[var(--accent)] px-3 py-1 rounded-full text-[9px] font-black text-[var(--surface)] uppercase tracking-widest self-start">{tag}</span>
      </div>

      <div className="absolute bottom-5 left-5 right-5">
        <h4 className="text-white font-black text-xl tracking-tighter mb-1 line-clamp-1">{bathroom.name}</h4>
        <p className="text-white/60 text-[10px] font-medium line-clamp-2 mb-4 leading-relaxed">{bathroom.address}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <Sparkles className="w-3 h-3 text-[var(--accent)]" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">{match}% Match</span>
          </div>
          <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10 group-hover:bg-[var(--accent)] group-hover:text-[var(--surface)] transition-all">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
