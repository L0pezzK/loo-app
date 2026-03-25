'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Map, List, Bookmark, User, Settings, LogOut } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Explore', href: '/map', icon: Map, active: pathname === '/map' || pathname === '/' },
    { label: 'List View', href: '/list', icon: List, active: pathname === '/list' },
    { label: 'Saved', href: '/saved', icon: Bookmark, active: pathname === '/saved' },
    { label: 'Account', href: '/account', icon: User, active: pathname === '/account' },
    { label: 'Settings', href: '/settings', icon: Settings, active: pathname === '/settings' },
  ];

  return (
    <aside className="w-64 h-screen bg-[var(--surface)] text-[var(--foreground)] flex flex-col hidden md:flex border-r border-[var(--border)] shrink-0">
      <div className="p-6">
        <h1 className="text-2xl font-bold flex items-center space-x-2 text-[var(--accent)]">
          <Map className="w-8 h-8" />
          <span>LOO Paris</span>
        </h1>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
              item.active 
                ? 'bg-[var(--accent)] text-[var(--surface)] font-semibold shadow-[0_0_15px_rgba(0,229,255,0.3)]' 
                : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-white'
            }`}
          >
            <item.icon className={`w-5 h-5 ${item.active ? 'text-inherit' : ''}`} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[var(--border)]">
        <button className="flex w-full items-center space-x-3 px-4 py-3 text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-white transition-all rounded-xl">
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
