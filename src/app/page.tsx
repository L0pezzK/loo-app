'use client';

import { useState } from 'react';
import { Search, Filter, Map as MapIcon, List as ListIcon, ChevronDown, MapPin, Bookmark, User } from 'lucide-react';
import { mockBathrooms, Bathroom } from '@/data/bathrooms';
import BathroomCard from '@/components/BathroomCard';
import InteractiveMap from '@/components/Map';
import FilterSidebar from '@/components/FilterSidebar';
import MapDetailCard from '@/components/MapDetailCard';
import MapDirectionsCard from '@/components/MapDirectionsCard';
import MapDashboard from '@/components/MapDashboard';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[var(--surface)] animate-pulse rounded-3xl" />
});

export default function Home() {
  const [viewMode, setViewMode] = useState<'map' | 'list' | 'saved' | 'profile'>('map');
  const [selectedBathroom, setSelectedBathroom] = useState<Bathroom | null>(null);
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

        <MapDashboard currentView={viewMode} onViewChange={setViewMode} />
      </main>

      {/* Overlays for Saved and Profile */}
      {viewMode === 'saved' && (
        <div className="fixed inset-0 bg-[var(--background)]/90 backdrop-blur-3xl z-[400] flex flex-col items-center justify-center p-12 text-center overflow-hidden">
          <MapDashboard currentView={viewMode} onViewChange={setViewMode} />
          <div className="w-20 h-20 bg-[var(--surface)] rounded-3xl flex items-center justify-center mb-8 border border-white/10">
            <Bookmark className="w-10 h-10 text-[var(--accent)]" />
          </div>
          <h2 className="text-4xl font-black text-white mb-4">Saved Locations</h2>
          <p className="text-[var(--text-secondary)] text-lg max-w-md">You haven't saved any restrooms yet. Start exploring the map to find your favorites!</p>
        </div>
      )}

      {viewMode === 'profile' && (
        <div className="fixed inset-0 bg-[var(--background)]/90 backdrop-blur-3xl z-[400] flex flex-col items-center justify-center p-12 text-center overflow-hidden">
          <MapDashboard currentView={viewMode} onViewChange={setViewMode} />
          <div className="w-24 h-24 bg-gradient-to-br from-[var(--accent)] to-blue-600 rounded-full flex items-center justify-center mb-8 shadow-2xl">
            <User className="w-12 h-12 text-[var(--surface)]" />
          </div>
          <h2 className="text-4xl font-black text-white mb-2">Guest User</h2>
          <p className="text-[var(--accent)] font-bold mb-8 uppercase tracking-widest text-sm">Premium Member</p>
          <button className="px-10 py-4 bg-[var(--surface)] border border-white/10 rounded-2xl text-white font-bold hover:bg-[var(--surface-hover)] transition-all">
            Edit Profile Settings
          </button>
        </div>
      )}

      {/* Fullscreen Map Overlay when in map mode */}
      {viewMode === 'map' && (
        <div className="fixed inset-0 z-[200] flex flex-col">
          <MapDashboard currentView={viewMode} onViewChange={setViewMode} />
          
          <DynamicMap 
            onBathroomSelect={setSelectedBathroom} 
            activeBathroomId={selectedBathroom?.id} 
          />

          {/* Right Cards Overlay */}
          {selectedBathroom && (
            <div className="absolute top-1/2 -translate-y-1/2 right-12 z-[1000] flex flex-col space-y-4">
              <MapDetailCard 
                bathroom={selectedBathroom} 
                onClose={() => setSelectedBathroom(null)} 
              />
              <MapDirectionsCard 
                bathroom={selectedBathroom} 
                onClose={() => setSelectedBathroom(null)} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
