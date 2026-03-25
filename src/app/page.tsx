'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Map as MapIcon, LayoutGrid, ChevronDown, MapPin, Bookmark, User, Star } from 'lucide-react';
import { mockBathrooms, Bathroom } from '@/data/bathrooms';
import BathroomCard from '@/components/BathroomCard';
import InteractiveMap from '@/components/Map';
import FilterSidebar from '@/components/FilterSidebar';
import MapDetailCard from '@/components/MapDetailCard';
import MapDirectionsCard from '@/components/MapDirectionsCard';
import MapDashboard from '@/components/MapDashboard';
import Navbar from '@/components/Navbar';
import BathroomDetailView from '@/components/BathroomDetailView';
import SavedView from '@/components/SavedView';
import CommunityReviewsView from '@/components/CommunityReviewsView';
import ProfileView from '@/components/ProfileView';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[var(--surface)] animate-pulse rounded-3xl" />
});

export default function Home() {
  const [viewMode, setViewMode] = useState<'map' | 'list' | 'saved' | 'profile' | 'detail' | 'reviews'>('map');
  const [selectedBathroom, setSelectedBathroom] = useState<Bathroom | null>(null);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load saved IDs from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('loo-saved-ids');
    if (saved) {
      setSavedIds(JSON.parse(saved));
    }
  }, []);

  // Sync saved IDs to local storage
  useEffect(() => {
    localStorage.setItem('loo-saved-ids', JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = (id: string) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleBathroomSelect = (bathroom: Bathroom) => {
    setSelectedBathroom(bathroom);
    setViewMode('detail');
  };

  const filteredBathrooms = mockBathrooms.filter(bathroom => 
    bathroom.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bathroom.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col flex-1 h-full bg-[var(--background)] overflow-hidden">
      <Navbar currentView={viewMode} onViewChange={setViewMode} />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left sidebar for Filters */}
        <FilterSidebar />

        {/* List View - Main Content Area */}
        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar relative">
          <div className="max-w-6xl mx-auto pb-24">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h1 className="text-4xl font-black text-white mb-2">Available Restrooms</h1>
                <p className="text-[var(--text-secondary)] font-medium">{filteredBathrooms.length} premium locations found near you in Paris</p>
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
                <BathroomCard 
                  key={bathroom.id} 
                  bathroom={bathroom} 
                  onSelect={handleBathroomSelect}
                  isSaved={savedIds.includes(bathroom.id)}
                  onToggleSave={toggleSave}
                />
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

        {/* Map View Overlay */}
        {viewMode === 'map' && (
          <div className="absolute inset-0 z-[100] flex flex-col bg-[var(--background)]">
             <div className="flex-1 relative">
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
            <MapDashboard currentView={viewMode} onViewChange={setViewMode} />
          </div>
        )}

        {/* Detail View Overlay */}
        {viewMode === 'detail' && selectedBathroom && (
          <div className="absolute inset-0 z-[300] bg-[var(--background)] flex flex-col">
            <BathroomDetailView 
              bathroom={selectedBathroom} 
              onBack={() => setViewMode('list')} 
            />
             <MapDashboard currentView={viewMode} onViewChange={setViewMode} />
          </div>
        )}

        {/* Saved Locations Overlay */}
        {viewMode === 'saved' && (
          <div className="absolute inset-0 z-[200] bg-[var(--background)] flex flex-col">
            <SavedView 
              savedIds={savedIds} 
              onRemove={toggleSave} 
              onSelect={handleBathroomSelect} 
            />
            <MapDashboard currentView={viewMode} onViewChange={setViewMode} />
          </div>
        )}

        {/* Community Reviews Overlay */}
        {viewMode === 'reviews' && (
          <div className="absolute inset-0 z-[200] bg-[var(--background)] flex flex-col">
            <CommunityReviewsView />
            <MapDashboard currentView={viewMode} onViewChange={setViewMode} />
          </div>
        )}

        {/* Profile Overlay */}
        {viewMode === 'profile' && (
          <div className="absolute inset-0 z-[200] bg-[var(--background)] flex flex-col">
            <ProfileView savedCount={savedIds.length} reviewCount={142} />
            <MapDashboard currentView={viewMode} onViewChange={setViewMode} />
          </div>
        )}
      </div>
    </div>
  );
}
