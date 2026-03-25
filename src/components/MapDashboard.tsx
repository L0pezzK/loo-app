import { useState, useEffect } from 'react';
import { Map as MapIcon, LayoutGrid, Bookmark, MessageSquare, User, ChevronDown, ChevronUp } from 'lucide-react';

interface MapDashboardProps {
  currentView: 'map' | 'list' | 'saved' | 'profile' | 'detail' | 'reviews';
  onViewChange: (view: 'map' | 'list' | 'saved' | 'profile' | 'detail' | 'reviews') => void;
}

export default function MapDashboard({ currentView, onViewChange }: MapDashboardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Load collapse state
  useEffect(() => {
    const saved = localStorage.getItem('loo-dashboard-collapsed');
    if (saved) setIsCollapsed(JSON.parse(saved));
  }, []);

  // Save collapse state
  useEffect(() => {
    localStorage.setItem('loo-dashboard-collapsed', JSON.stringify(isCollapsed));
  }, [isCollapsed]);

  const items = [
    { id: 'map', label: 'Map', icon: MapIcon },
    { id: 'list', label: 'List', icon: LayoutGrid },
    { id: 'saved', label: 'Saved', icon: Bookmark },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  if (isCollapsed) {
    return (
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[500] animate-in fade-in slide-in-from-bottom-2 duration-300">
        <button 
          onClick={() => setIsCollapsed(false)}
          className="bg-[var(--surface)] border border-white/10 p-4 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95 transition-all text-[var(--accent)] group"
        >
          <div className="relative">
            <ChevronUp className="w-6 h-6 group-hover:animate-bounce" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--accent)] rounded-full shadow-[0_0_10px_var(--accent)]"></div>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[500] px-4 w-full max-w-lg animate-in slide-in-from-bottom-4 duration-500">
      <div className="relative">
        {/* Toggle Button */}
        <button 
          onClick={() => setIsCollapsed(true)}
          className="absolute -top-12 right-0 p-2 bg-[var(--surface)] border border-white/10 rounded-full text-white/40 hover:text-white transition-all shadow-xl hover:bg-[var(--surface-hover)]"
        >
          <ChevronDown className="w-4 h-4" />
        </button>

        <div className="bg-[var(--surface)]/80 backdrop-blur-2xl p-2 rounded-[28px] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between">
          {items.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as any)}
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-2xl transition-all duration-300 group relative
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
    </div>
  );
}
