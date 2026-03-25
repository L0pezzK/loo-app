'use client';

import { Bathroom } from '@/data/bathrooms';
import { 
  ArrowLeft, Star, MapPin, Navigation2, CheckCircle2, Clock, 
  CreditCard, Accessibility, Baby, Scan, Leaf, HelpCircle, Thermometer,
  ChevronRight
} from 'lucide-react';
import ReviewCard from './ReviewCard';

interface BathroomDetailViewProps {
  bathroom: Bathroom;
  onBack: () => void;
}

export default function BathroomDetailView({ bathroom, onBack }: BathroomDetailViewProps) {
  const getFeatureIcon = (iconSlug: string) => {
    switch (iconSlug) {
      case 'door': return <Accessibility className="w-4 h-4" />;
      case 'baby': return <Baby className="w-4 h-4" />;
      case 'scan': return <Scan className="w-4 h-4" />;
      case 'eco': return <Leaf className="w-4 h-4" />;
      case 'gender': return <HelpCircle className="w-4 h-4" />;
      case 'seat': return <Thermometer className="w-4 h-4" />;
      default: return <CheckCircle2 className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-[var(--background)] animate-in fade-in duration-500 overflow-y-auto custom-scrollbar">
      {/* Top Header / Breadcrumbs */}
      <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button 
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2 text-[var(--text-secondary)] text-xs font-bold tracking-widest uppercase">
            <span>Paris</span>
            <ChevronRight className="w-3 h-3" />
            <span>8th Arrondissement</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Place de la Concorde</span>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 lg:p-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Images */}
          <div className="lg:col-span-5 space-y-6">
            <div className="aspect-square rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
              <img src={bathroom.image} alt={bathroom.name} className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              {bathroom.gallery?.map((img, i) => (
                <div key={i} className="aspect-square rounded-[32px] overflow-hidden border border-white/10 hover:scale-[1.02] transition-transform cursor-pointer">
                  <img src={img} alt={`${bathroom.name} detail ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="aspect-square rounded-[32px] bg-[var(--surface)] border border-white/10 flex flex-col items-center justify-center space-y-2 group cursor-pointer hover:bg-[var(--surface-hover)] transition-all">
                 <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <MapPin className="w-5 h-5 text-[var(--accent)]" />
                 </div>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">Live Map</span>
              </div>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-7">
            <div className="bg-[var(--surface)]/30 border border-white/5 rounded-[48px] p-10 lg:p-12 shadow-2xl backdrop-blur-3xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-[var(--accent)]/20">Premium Facility</span>
                    <div className="flex items-center space-x-1.5 text-white/80 text-xs font-bold">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{bathroom.rating} ({bathroom.reviewsCount} reviews)</span>
                    </div>
                  </div>
                  <h2 className="text-5xl font-black text-white tracking-tighter leading-none mb-4">{bathroom.name}</h2>
                  <div className="flex items-center space-x-2 text-[var(--text-secondary)] font-medium">
                    <MapPin className="w-4 h-4 text-[var(--accent)]" />
                    <span>{bathroom.address}</span>
                  </div>
                </div>
                <button className="bg-[#b9e7ff] text-[#001d2d] px-8 py-5 rounded-3xl font-black shadow-[0_15px_30px_rgba(185,231,255,0.2)] hover:scale-105 active:scale-95 transition-all flex items-center space-x-3">
                  <Navigation2 className="w-5 h-5 fill-current rotate-45" />
                  <span>Get Directions</span>
                </button>
              </div>

              {/* Status Info Row */}
              <div className="grid grid-cols-3 gap-4 mb-12">
                <div className="bg-white/5 border border-white/5 p-4 rounded-3xl flex items-center space-x-4">
                  <div className="p-2.5 bg-green-500/10 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">Status</p>
                    <p className="text-sm font-bold text-white">Operational</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-3xl flex items-center space-x-4">
                  <div className="p-2.5 bg-blue-500/10 rounded-xl">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">Opening Hours</p>
                    <p className="text-sm font-bold text-white">{bathroom.openingHours}</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-3xl flex items-center space-x-4">
                  <div className="p-2.5 bg-purple-500/10 rounded-xl">
                    <CreditCard className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-0.5">Fee</p>
                    <p className="text-sm font-bold text-white">€0.50 (Free for LOO+)</p>
                  </div>
                </div>
              </div>

              {/* Detailed Features Grid */}
              <div className="grid grid-cols-3 gap-6 mb-12">
                {bathroom.detailedFeatures?.map((f, i) => (
                  <div key={i} className="bg-white/5 border border-white/5 px-6 py-5 rounded-[24px] flex items-center space-x-4">
                    <div className="text-[var(--text-secondary)]">
                      {getFeatureIcon(f.icon)}
                    </div>
                    <span className="text-xs font-bold text-white/70">{f.label}</span>
                  </div>
                ))}
              </div>

              {/* Ratings & Reviews */}
              <div className="space-y-8">
                <div className="flex items-end justify-between">
                  <h3 className="text-2xl font-black text-white tracking-tight">Ratings & Reviews</h3>
                  <button className="text-[var(--accent)] text-sm font-bold hover:underline decoration-2 underline-offset-4">Write a Review</button>
                </div>
                <div className="space-y-4">
                  {bathroom.reviews.map((r) => (
                    <ReviewCard key={r.id} review={r} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
