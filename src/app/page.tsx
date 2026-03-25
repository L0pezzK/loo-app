'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Search, Filter, Map as MapIcon, List as ListIcon } from 'lucide-react';
import { mockBathrooms, Bathroom } from '@/data/bathrooms';
import BathroomCard from '@/components/BathroomCard';

const InteractiveMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[var(--surface)] animate-pulse rounded-2xl flex items-center justify-center text-[var(--text-secondary)]">Loading Map...</div>
});

export default function Home() {
  const [selectedBathroom, setSelectedBathroom] = useState<Bathroom | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  const filteredBathrooms = mockBathrooms.filter(bathroom => 
    bathroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bathroom.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBathroomSelect = (bathroom: Bathroom) => {
    setSelectedBathroom(bathroom);
    // In a real app, we might scroll the list or zoom the map
  };

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      {/* Search Header */}
      <header className="p-6 border-b border-[var(--border)] bg-[var(--surface)]/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-7xl mx-auto w-full">
          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors" />
            <input 
              type="text" 
              placeholder="Search bathrooms in Paris..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl py-3 pl-12 pr-4 text-white placeholder-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 focus:border-[var(--accent)] transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-5 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-white hover:bg-[var(--surface-hover)] transition-all">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
            <div className="h-10 w-px bg-[var(--border)] hidden md:block"></div>
            <div className="flex bg-[var(--surface)] p-1 rounded-2xl border border-[var(--border)] w-full md:w-auto">
              <button 
                onClick={() => setViewMode('map')}
                className={`flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-xl transition-all ${viewMode === 'map' ? 'bg-[var(--accent)] text-[var(--surface)] font-bold shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'text-[var(--text-secondary)] hover:text-white'}`}
              >
                <MapIcon className="w-4 h-4" />
                <span>Map</span>
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`flex-1 md:flex-none flex items-center justify-center space-x-2 px-4 py-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-[var(--accent)] text-[var(--surface)] font-bold shadow-[0_0_15px_rgba(0,229,255,0.2)]' : 'text-[var(--text-secondary)] hover:text-white'}`}
              >
                <ListIcon className="w-4 h-4" />
                <span>List</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar List (Visible on larger screens in Map view) */}
        <div className={`w-full md:w-[400px] border-r border-[var(--border)] bg-[var(--surface)]/30 overflow-y-auto ${viewMode === 'list' ? 'block' : 'hidden lg:block'}`}>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-widest">
                Found {filteredBathrooms.length} results
              </h2>
            </div>
            {filteredBathrooms.map((bathroom) => (
              <div 
                key={bathroom.id} 
                onClick={() => handleBathroomSelect(bathroom)}
                className={`transition-all ${selectedBathroom?.id === bathroom.id ? 'ring-2 ring-[var(--accent)] rounded-2xl' : ''}`}
              >
                <BathroomCard bathroom={bathroom} />
              </div>
            ))}
          </div>
        </div>

        {/* Map View */}
        <div className={`flex-1 relative ${viewMode === 'map' ? 'block' : 'hidden md:block'}`}>
          <InteractiveMap 
            onBathroomSelect={handleBathroomSelect} 
            activeBathroomId={selectedBathroom?.id}
          />
          
          {/* Quick Stats Overlays */}
          <div className="absolute top-6 left-6 z-[400] hidden sm:flex items-center space-x-3 pointer-events-none">
            <div className="bg-[var(--surface)]/90 backdrop-blur-md border border-[var(--border)] p-3 rounded-2xl shadow-2xl">
              <p className="text-[var(--text-secondary)] text-xs font-bold uppercase mb-1 tracking-tighter">Availability</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-[var(--success)]"></div>
                <span className="text-white font-bold text-sm">85% near you</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
