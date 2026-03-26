'use client';

import { Accessibility, Coins, Baby, Search, Settings, HelpCircle } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    accessible: boolean;
    free: boolean;
    babyChanging: boolean;
  };
  onToggle: (key: 'accessible' | 'free' | 'babyChanging') => void;
}

export default function FilterSidebar({ filters, onToggle }: FilterSidebarProps) {
  const filterItems = [
    { id: 'accessible' as const, label: 'Accessible', icon: Accessibility, active: filters.accessible },
    { id: 'free' as const, label: 'Free', icon: Coins, active: filters.free },
    { id: 'babyChanging' as const, label: 'Baby Changing', icon: Baby, active: filters.babyChanging },
  ];

  return (
    <aside className="w-80 h-[calc(100vh-64px)] border-r border-[var(--border)] bg-[var(--background)] p-8 flex flex-col shrink-0">
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-2">Filters</h2>
        <p className="text-xs text-[var(--text-secondary)] font-medium">Paris City Guide</p>
      </div>

      <div className="space-y-4 mb-10">
        {filterItems.map((filter) => (
          <button 
            key={filter.id}
            onClick={() => onToggle(filter.id)}
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

      <div className="mt-auto space-y-2">
        <button className="w-full py-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-white text-sm font-bold hover:bg-[var(--surface-hover)] transition-all flex items-center space-x-3 px-6">
          <Settings className="w-4 h-4 text-[var(--text-secondary)]" />
          <span>Settings</span>
        </button>
        <button className="w-full py-4 bg-[var(--surface)] border border-[var(--border)] rounded-2xl text-white text-sm font-bold hover:bg-[var(--surface-hover)] transition-all flex items-center space-x-3 px-6">
          <HelpCircle className="w-4 h-4 text-[var(--text-secondary)]" />
          <span>Help</span>
        </button>
      </div>
    </aside>
  );
}
