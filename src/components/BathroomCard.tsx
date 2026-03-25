import { Bathroom } from '@/data/bathrooms';
import { Star, Navigation, MapPin, Clock } from 'lucide-react';
import FeatureTag from './FeatureTag';
import Link from 'next/link';
import Image from 'next/image';

interface BathroomCardProps {
  bathroom: Bathroom;
}

export default function BathroomCard({ bathroom }: BathroomCardProps) {
  return (
    <Link href={`/bathroom/${bathroom.id}`}>
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--accent)] hover:shadow-[0_0_20px_rgba(0,229,255,0.1)] transition-all cursor-pointer group flex flex-col h-full">
        {bathroom.image && (
          <div className="h-48 w-full relative">
            <img src={bathroom.image} alt={bathroom.name} className="object-cover w-full h-full" />
            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center space-x-1 text-sm text-white">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-semibold">{bathroom.rating}</span>
            </div>
            {!bathroom.isOpen && (
              <div className="absolute top-3 left-3 bg-[var(--error)]/90 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-white uppercase tracking-wider">
                Closed
              </div>
            )}
          </div>
        )}
        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors line-clamp-1">{bathroom.name}</h3>
          
          <div className="flex items-center text-[var(--text-secondary)] text-sm mb-4 space-x-4">
            {bathroom.distance && (
              <div className="flex items-center space-x-1">
                <Navigation className="w-4 h-4" />
                <span>{bathroom.distance}m</span>
              </div>
            )}
            {bathroom.walkingTime && (
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{bathroom.walkingTime} min</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-4 flex-1 content-start">
            {bathroom.features.map((feature, idx) => (
              <FeatureTag key={idx} feature={feature} />
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-[var(--border)] flex justify-between items-center text-sm">
            <div className="flex items-center space-x-1 text-[var(--text-secondary)]">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1">{bathroom.address}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
