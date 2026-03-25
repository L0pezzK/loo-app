'use client';

import { Star, MessageCircle, Share2, ThumbsUp, CheckCircle2 } from 'lucide-react';

interface ReviewFeedCardProps {
  author: string;
  avatar: string;
  location: string;
  time: string;
  rating: number;
  text: string;
  likes: number;
  comments: number;
  isVerified?: boolean;
}

export default function ReviewFeedCard({
  author,
  avatar,
  location,
  time,
  rating,
  text,
  likes,
  comments,
  isVerified = true
}: ReviewFeedCardProps) {
  return (
    <div className="bg-[var(--surface)]/40 border border-white/5 rounded-[32px] p-8 hover:bg-[var(--surface)]/60 transition-all group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[var(--accent)]/20 shadow-lg">
            <img src={avatar} alt={author} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h4 className="text-white font-black text-base">{author}</h4>
              {isVerified && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" />}
            </div>
            <p className="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest">{time}</p>
          </div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-4 h-4 ${i < rating ? 'text-[var(--accent)] fill-current' : 'text-white/10'}`} 
            />
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h5 className="text-[var(--accent)] font-black text-sm mb-3 cursor-pointer hover:underline">{location}</h5>
        <p className="text-white/80 text-base leading-relaxed font-medium italic">
          "{text}"
        </p>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/5">
        <div className="flex items-center space-x-6">
          <button className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-white transition-colors group/btn">
            <ThumbsUp className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span className="text-xs font-black">{likes}</span>
          </button>
          <button className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-white transition-colors group/btn">
            <MessageCircle className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
            <span className="text-xs font-black">{comments}</span>
          </button>
        </div>
        <button className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
