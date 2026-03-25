'use client';

import { Map as MapIcon, LayoutGrid, Bookmark, User } from 'lucide-react';

interface MapDashboardProps {
  currentView: 'map' | 'list' | 'saved' | 'profile';
  onViewChange: (view: 'map' | 'list' | 'saved' | 'profile') => void;
}

export default function MapDashboard({ currentView, onViewChange }: MapDashboardProps) {
  const items = [
    { id: 'map', label: 'Map View', icon: MapIcon },
    { id: 'list', label: 'List View', icon: LayoutGrid },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[1000] px-4 w-full max-w-lg">
      <div className="bg-[var(--surface)]/80 backdrop-blur-2xl p-2 rounded-[28px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between">
        {items.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as any)}
              className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-2xl transition-all duration-300 group
                ${isActive 
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)] font-black' 
                  : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
                }`}
            >
              <item.icon className={`w-5 h-5 mb-1 ${isActive ? 'text-[var(--accent)]' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 bg-[var(--accent)] rounded-full shadow-[0_0_10px_var(--accent)]"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
