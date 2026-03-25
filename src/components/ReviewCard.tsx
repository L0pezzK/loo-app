import { Review } from '@/data/bathrooms';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-[var(--surface-hover)] p-5 rounded-2xl border border-[var(--border)]">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-3">
          {review.avatar ? (
            <img src={review.avatar} alt={review.author} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[var(--accent)] text-[var(--surface)] flex items-center justify-center font-bold text-lg">
              {review.author.charAt(0)}
            </div>
          )}
          <div>
            <h4 className="font-bold text-white">{review.author}</h4>
            <span className="text-xs text-[var(--text-secondary)]">{review.date}</span>
          </div>
        </div>
        <div className="flex items-center px-2 py-1 bg-[var(--surface)] rounded-lg text-sm">
          <span className="font-bold text-white mr-1">{review.rating}</span>
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        </div>
      </div>
      <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
        "{review.text}"
      </p>
    </div>
  );
}
