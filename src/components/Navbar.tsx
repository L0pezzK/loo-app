'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Map', href: '/map' },
    { label: 'List', href: '/' }, // List is the main view in the design
    { label: 'Saved', href: '/saved' },
    { label: 'Profile', href: '/profile' },
  ];

  return (
    <nav className="h-16 border-b border-[var(--border)] bg-[var(--background)] flex items-center justify-between px-8 sticky top-0 z-50">
      <div className="flex items-center space-x-12">
        <Link href="/" className="text-2xl font-black tracking-tighter text-[var(--accent)] flex items-center">
          LOO
        </Link>
        <div className="flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.label === 'List' && pathname === '/');
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`text-sm font-bold transition-all ${isActive ? 'text-white border-b-2 border-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-white'}`}
                style={{ paddingBottom: isActive ? '20px' : '0', marginBottom: isActive ? '-20px' : '0' }}
              >
                {item.label}
              </Link>
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
