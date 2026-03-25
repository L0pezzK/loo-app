import { Bathroom } from '@/data/bathrooms';
import { Star, Navigation, MapPin, Clock, Bookmark, Accessibility, Coins, Baby } from 'lucide-react';
import Link from 'next/link';

interface BathroomCardProps {
  bathroom: Bathroom;
  onSelect?: (bathroom: Bathroom) => void;
}

export default function BathroomCard({ bathroom, onSelect }: BathroomCardProps) {
  // Extract arrondissement from address (e.g., "75008 Paris" -> "8")
  const arrondissementMatch = bathroom.address.match(/750(\d{2})/);
  const arrondissement = arrondissementMatch ? `${parseInt(arrondissementMatch[1])}e Arrondissement` : 'Paris';

  return (
    <div 
      onClick={() => onSelect?.(bathroom)}
      className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl overflow-hidden hover:border-[var(--accent)] hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] transition-all group flex flex-col h-full cursor-pointer"
    >
      {/* Image Section */}
      <div className="h-48 w-full relative overflow-hidden">
        <img 
          src={bathroom.image} 
          alt={bathroom.name} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
        />
        
        {/* Status Tag */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md ${bathroom.isOpen ? 'bg-[var(--success)]/20 text-[var(--success)] border border-[var(--success)]/30' : 'bg-[var(--error)]/20 text-[var(--error)] border border-[var(--error)]/30'}`}>
          {bathroom.isOpen ? 'Open' : 'Closed'}
        </div>

        {/* Feature Icons Overlay */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {bathroom.features.includes('Wheelchair Accessible') && (
            <div className="w-6 h-6 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
              <Accessibility className="w-3.5 h-3.5 text-white" />
            </div>
          )}
          {bathroom.features.includes('Baby Changing') && (
            <div className="w-6 h-6 rounded-lg bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/10">
              <Baby className="w-3.5 h-3.5 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white group-hover:text-[var(--accent)] transition-colors line-clamp-1 leading-tight">{bathroom.name}</h3>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-bold text-white text-sm">{bathroom.rating}</span>
          </div>
        </div>

        <div className="flex items-center text-[var(--text-secondary)] text-xs font-semibold mb-6 space-x-3">
          <div className="flex items-center space-x-1">
            <Navigation className="w-3 h-3 rotate-45" />
            <span>{bathroom.distance}m away</span>
          </div>
          <span>•</span>
          <span>{arrondissement}</span>
        </div>

        <div className="flex items-center space-x-3 mt-auto">
          <button className="flex-1 bg-[var(--surface-hover)] hover:bg-[var(--accent)] hover:text-[var(--surface)] text-white text-xs font-bold py-3 rounded-xl transition-all border border-[var(--border)] hover:border-transparent">
            Directions
          </button>
          <button className="p-3 bg-[var(--surface-hover)] border border-[var(--border)] rounded-xl text-[var(--text-secondary)] hover:text-[var(--accent)] transition-all hover:bg-[var(--surface)]">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
