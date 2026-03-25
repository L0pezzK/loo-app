'use client';

import { Accessibility, Coins, Baby, Search } from 'lucide-react';

export default function FilterSidebar() {
  const filters = [
    { label: 'Accessible', icon: Accessibility, active: true },
    { label: 'Free', icon: Coins, active: false },
    { label: 'Baby Changing', icon: Baby, active: false },
  ];

  return (
    <aside className="w-80 h-[calc(100vh-64px)] border-r border-[var(--border)] bg-[var(--background)] p-8 flex flex-col shrink-0">
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-2">Filters</h2>
        <p className="text-xs text-[var(--text-secondary)] font-medium">Paris Amenities</p>
      </div>

      <div className="space-y-4 mb-10">
        {filters.map((filter) => (
          <button 
            key={filter.label}
            className={`w-full flex items-center justify-between px-5 py-3 rounded-2xl transition-all border ${filter.active ? 'bg-[var(--accent)]/10 border-[var(--accent)] text-white font-bold' : 'bg-[var(--surface)]/30 border-transparent text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-white'}`}
          >
            <div className="flex items-center space-x-3">
              <filter.icon className={`w-4 h-4 ${filter.active ? 'text-[var(--accent)]' : ''}`} />
              <span className="text-sm">{filter.label}</span>
            </div>
            {filter.active && (
              <div className="w-4 h-4 rounded-full bg-[var(--accent)] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[var(--background)]"></div>
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mb-10 flex-1">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-wider">Radius</h3>
        </div>
        <div className="px-1">
          <div className="h-1 bg-[var(--surface)] rounded-full relative mb-4">
            <div className="absolute left-0 top-0 h-full w-2/3 bg-[var(--accent)] rounded-full"></div>
            <div className="absolute left-2/3 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-lg border-2 border-[var(--accent)] cursor-pointer"></div>
          </div>
          <div className="flex justify-between text-[10px] text-[var(--text-secondary)] font-bold">
            <span>500m</span>
            <span>5km</span>
          </div>
        </div>
      </div>

      <button className="w-full py-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-white text-sm font-bold hover:bg-[var(--surface-hover)] transition-all mt-auto">
        Apply Filters
      </button>
    </aside>
  );
}
