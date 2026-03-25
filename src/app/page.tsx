'use client';

import { useState } from 'react';
import { Search, Filter, Map as MapIcon, List as ListIcon, ChevronDown, MapPin } from 'lucide-react';
import { mockBathrooms, Bathroom } from '@/data/bathrooms';
import BathroomCard from '@/components/BathroomCard';
import InteractiveMap from '@/components/Map';
import FilterSidebar from '@/components/FilterSidebar';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[var(--surface)] animate-pulse rounded-3xl" />
});

export default function Home() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBathrooms = mockBathrooms.filter(bathroom => 
    bathroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bathroom.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-1 h-full bg-[var(--background)] overflow-hidden">
      {/* Left sidebar for Filters */}
      <FilterSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
        <div className="max-w-6xl mx-auto pb-24">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-black text-white mb-2">Available Restrooms</h1>
              <p className="text-[var(--text-secondary)] font-medium">5 premium locations found near you in Paris</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-5 py-2.5 bg-[var(--surface)] text-[var(--foreground)] text-xs font-bold rounded-xl border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-all">
                Sort by Distance
              </button>
              <button className="px-5 py-2.5 bg-[var(--surface)] text-[var(--foreground)] text-xs font-bold rounded-xl border border-[var(--border)] hover:bg-[var(--surface-hover)] transition-all">
                Sort by Rating
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {filteredBathrooms.map((bathroom) => (
              <BathroomCard key={bathroom.id} bathroom={bathroom} />
            ))}

            {/* Map Recommendation Card */}
            <div className="bg-[var(--surface)]/20 border border-[var(--border)] border-dashed rounded-3xl flex flex-col items-center justify-center p-12 text-center min-h-[400px]">
              <div className="w-16 h-16 rounded-3xl bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center mb-6">
                <MapIcon className="w-8 h-8 text-[var(--accent)]" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Prefer the Map View?</h3>
              <p className="text-[var(--text-secondary)] text-sm mb-8 leading-relaxed max-w-sm">
                Explore the full city of Paris interactively and find hidden restrooms near your destination.
              </p>
              <button 
                onClick={() => setViewMode('map')}
                className="px-8 py-4 bg-[var(--accent)] text-[var(--surface)] font-black rounded-2xl shadow-[0_0_25px_rgba(0,229,255,0.2)] hover:scale-105 active:scale-95 transition-all"
              >
                Switch to Map
              </button>
            </div>
          </div>
        </div>

        {/* Floating Toggle Selector */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100]">
          <div className="flex items-center bg-[var(--surface)]/80 backdrop-blur-2xl p-2 rounded-2xl border border-white/10 shadow-2xl">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-black' : 'text-[var(--text-secondary)] hover:text-white'}`}
            >
              <ListIcon className="w-4 h-4" />
              <span className="text-xs">List View</span>
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl transition-all ${viewMode === 'map' ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-black' : 'text-[var(--text-secondary)] hover:text-white'}`}
            >
              <MapIcon className="w-4 h-4" />
              <span className="text-xs">Map View</span>
            </button>
          </div>
        </div>
      </main>

      {/* Fullscreen Map Overlay when in map mode */}
      {viewMode === 'map' && (
        <div className="fixed inset-0 z-[200] flex flex-col">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 z-[300]">
             <div className="flex items-center bg-[var(--surface)]/80 backdrop-blur-2xl p-2 rounded-2xl border border-white/10 shadow-2xl">
              <button 
                onClick={() => setViewMode('list')}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl transition-all text-[var(--text-secondary)] hover:text-white"
              >
                <ListIcon className="w-4 h-4" />
                <span className="text-xs">List View</span>
              </button>
              <button 
                onClick={() => setViewMode('map')}
                className="flex items-center space-x-2 px-6 py-2.5 rounded-xl transition-all bg-[var(--accent)]/10 text-[var(--accent)] font-black"
              >
                <MapIcon className="w-4 h-4" />
                <span className="text-xs">Map View</span>
              </button>
            </div>
          </div>
          <DynamicMap />
        </div>
      )}
    </div>
  );
}
