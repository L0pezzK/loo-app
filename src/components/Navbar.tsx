'use client';

import { Search, Bell } from 'lucide-react';

interface NavbarProps {
  currentView?: string;
  onViewChange?: (view: 'map' | 'list' | 'saved' | 'profile') => void;
}

export default function Navbar({ currentView = 'list', onViewChange }: NavbarProps) {
  const navItems = [
    { label: 'Map', id: 'map' as const },
    { label: 'List', id: 'list' as const },
    { label: 'Saved', id: 'saved' as const },
    { label: 'Profile', id: 'profile' as const },
  ];

  return (
    <nav className="h-16 border-b border-[var(--border)] bg-[var(--background)] flex items-center justify-between px-8 sticky top-0 z-[500]">
      <div className="flex items-center space-x-12">
        <button 
          onClick={() => onViewChange?.('list')}
          className="text-2xl font-black tracking-tighter text-[var(--accent)] flex items-center"
        >
          LOO
        </button>
        <div className="flex items-center space-x-8 h-16">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button 
                key={item.id} 
                onClick={() => onViewChange?.(item.id)}
                className={`text-sm font-bold transition-all h-full relative ${isActive ? 'text-white' : 'text-[var(--text-secondary)] hover:text-white'}`}
              >
                {item.label}
                {isActive && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--accent)] shadow-[0_0_10px_rgba(0,229,255,0.5)]"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors" />
          <input 
            type="text" 
            placeholder="Search Paris restrooms..." 
            className="w-64 bg-[var(--surface)] border border-[var(--border)] rounded-full py-2 pl-10 pr-4 text-xs text-white placeholder-[var(--text-secondary)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]/30 transition-all"
          />
        </div>
        <button className="text-[var(--text-secondary)] hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
          <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[var(--error)] rounded-full border-2 border-[var(--background)]"></div>
        </button>
      </div>
    </nav>
  );
}
