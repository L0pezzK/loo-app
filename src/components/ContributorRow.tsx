'use client';

import { Trophy } from 'lucide-react';

interface ContributorRowProps {
  name: string;
  avatar: string;
  reviewCount: number;
  rank: number;
}

export default function ContributorRow({ name, avatar, reviewCount, rank }: ContributorRowProps) {
  return (
    <div className="flex items-center justify-between group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-all">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-[var(--accent)] flex items-center justify-center text-[10px] font-black text-white border border-white/10 shrink-0">
          {avatar}
        </div>
        <h5 className="text-[var(--foreground)] font-bold text-xs group-hover:text-white transition-colors">{name}</h5>
      </div>
      <div className="text-right">
        <span className="text-[var(--accent)] font-black text-[10px] uppercase tracking-widest">{reviewCount} reviews</span>
      </div>
    </div>
  );
}
