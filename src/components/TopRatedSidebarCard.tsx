'use client';

import { Droplets, Accessibility, ArrowUpRight } from 'lucide-react';

interface TopRatedSidebarCardProps {
  name: string;
  image: string;
  cleanPercent: number;
  label: string;
  isNearby?: boolean;
}

export default function TopRatedSidebarCard({
  name,
  image,
  cleanPercent,
  label,
  isNearby
}: TopRatedSidebarCardProps) {
  return (
    <div className="bg-[var(--surface)]/30 border border-white/5 rounded-[28px] p-4 group cursor-pointer hover:bg-[var(--surface)]/50 transition-all">
      <div className="relative h-32 w-full rounded-[20px] overflow-hidden mb-4">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute top-3 left-3 flex space-x-2">
          <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest backdrop-blur-md ${isNearby ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-[var(--accent)]/20 text-[var(--accent)] border border-[var(--accent)]/30'}`}>
            {isNearby ? 'NEARBY' : '#1 RANKED'}
          </span>
        </div>
      </div>
      <div>
        <h4 className="text-white font-black text-sm mb-3 group-hover:text-[var(--accent)] transition-colors leading-tight line-clamp-1">{name}</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center space-x-1.5 text-[var(--text-secondary)]">
            <Droplets className="w-3 h-3 text-[var(--accent)]" />
            <span className="text-[9px] font-black uppercase tracking-widest">{cleanPercent}% Clean</span>
          </div>
          <div className="flex items-center space-x-1.5 text-[var(--text-secondary)]">
            <Accessibility className="w-3 h-3 text-[var(--accent)]" />
            <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
