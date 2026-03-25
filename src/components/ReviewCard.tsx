'use client';

import { Review } from '@/data/bathrooms';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <img 
            src={review.avatar || `https://i.pravatar.cc/150?u=${review.author}`} 
            alt={review.author} 
            className="w-10 h-10 rounded-full object-cover border border-white/10"
          />
          <div>
            <h4 className="text-white font-bold text-sm tracking-tight">{review.author}</h4>
            <p className="text-[var(--text-secondary)] text-[10px] font-medium">{review.date}</p>
          </div>
        </div>
        <div className="flex items-center space-x-0.5">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${i < review.rating ? 'text-white fill-current' : 'text-white/20'}`} 
            />
          ))}
        </div>
      </div>
      <p className="text-white/80 text-xs leading-relaxed font-medium">
        {review.text}
      </p>
    </div>
  );
}
