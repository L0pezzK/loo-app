'use client';

import { Bathroom, mockBathrooms } from '@/data/bathrooms';
import { Bookmark, LayoutGrid, Download, SlidersHorizontal, Sparkles } from 'lucide-react';
import SavedCard from './SavedCard';
import RecommendedCard from './RecommendedCard';

interface SavedViewProps {
  savedIds: string[];
  onRemove: (id: string) => void;
  onSelect: (bathroom: Bathroom) => void;
}

export default function SavedView({ savedIds, onRemove, onSelect }: SavedViewProps) {
  const savedBathrooms = mockBathrooms.filter(b => savedIds.includes(b.id));
  const recommendedBathrooms = mockBathrooms.filter(b => !savedIds.includes(b.id)).slice(0, 2);

  return (
    <div className="flex-1 bg-[var(--background)] flex flex-col overflow-y-auto custom-scrollbar animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto w-full px-8 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 space-y-8 lg:space-y-0">
          <div>
            <h2 className="text-6xl font-black text-white tracking-tighter mb-4">Saved Bathrooms</h2>
            <p className="text-[var(--text-secondary)] text-lg font-medium max-w-xl leading-relaxed">
              Your curated list of premium relief stations. Ready when you need them most.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-8 py-4 bg-[var(--surface)] border border-white/10 rounded-2xl text-white font-bold hover:bg-[var(--surface-hover)] transition-all flex items-center space-x-3">
              <SlidersHorizontal className="w-5 h-5" />
              <span>Sort</span>
            </button>
            <button className="px-8 py-4 bg-[#b9e7ff] text-[#001d2d] rounded-2xl font-bold flex items-center space-x-3 shadow-2xl hover:scale-105 transition-all">
              <Download className="w-5 h-5" />
              <span>Export List</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Main Collection */}
          <div className="lg:col-span-8 space-y-10">
            <div className="flex items-center space-x-4 text-white/40 mb-8">
              <Bookmark className="w-5 h-5" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em]">Your Collection</h3>
              <div className="flex-1 h-[1px] bg-white/5"></div>
            </div>

            {savedBathrooms.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {savedBathrooms.map(b => (
                  <SavedCard 
                    key={b.id} 
                    bathroom={b} 
                    onRemove={onRemove} 
                    onSelect={onSelect}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white/5 border border-white/5 border-dashed rounded-[48px] p-24 text-center">
                 <div className="w-20 h-20 bg-white/5 rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-white/10">
                   <Bookmark className="w-10 h-10 text-white/20" />
                 </div>
                 <h4 className="text-2xl font-bold text-white mb-4">No Saved Relief Yet</h4>
                 <p className="text-[var(--text-secondary)] max-w-sm mx-auto">Start exploring the map to find and save the best restrooms in Paris.</p>
              </div>
            )}
          </div>

          {/* Recommendations Sidebar */}
          <div className="lg:col-span-4 space-y-10">
            <div className="flex items-center space-x-4 text-[var(--accent)] mb-8">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-xs font-black uppercase tracking-[0.2em]">Recommended for You</h3>
            </div>

            <div className="space-y-6">
              {recommendedBathrooms.map((b, i) => (
                <RecommendedCard 
                   key={b.id} 
                   bathroom={b} 
                   match={98 - i * 5} 
                   tag={i === 0 ? "Editor's Pick" : "Quiet Zone"} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
