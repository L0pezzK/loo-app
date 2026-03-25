'use client';

import { useState } from 'react';
import { X, Star, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { mockBathrooms } from '@/data/bathrooms';

interface AddReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (review: any) => void;
}

export default function AddReviewModal({ isOpen, onClose, onSubmit }: AddReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [location, setLocation] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen && !isSuccess) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !location || !reviewText) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newReview = {
        author: "You",
        avatar: "https://i.pravatar.cc/150?u=you",
        location: location,
        time: "Just now",
        rating: rating,
        text: reviewText,
        likes: 0,
        comments: 0,
        isVerified: true
      };
      
      onSubmit(newReview);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto-close after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    }, 1500);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setRating(0);
    setLocation('');
    setReviewText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 sm:p-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-500"
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-[var(--surface)] border border-white/10 rounded-[48px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in fade-in duration-500">
        
        {isSuccess ? (
          <div className="p-20 text-center flex flex-col items-center justify-center space-y-6">
            <div className="w-24 h-24 bg-[var(--accent)]/10 rounded-full flex items-center justify-center border-4 border-[var(--accent)]/30 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-[var(--accent)]" />
            </div>
            <h3 className="text-4xl font-black text-white tracking-tighter">Experience Shared!</h3>
            <p className="text-[var(--text-secondary)] text-lg max-w-xs mx-auto">Your report has been broadcasted to the LOO community. Merci!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            {/* Header */}
            <div className="p-8 pb-4 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center border border-[var(--accent)]/20">
                  <Star className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">Share Your Experience</h2>
                  <p className="text-[var(--text-secondary)] text-[10px] font-bold uppercase tracking-widest">Contribute to the Paris Relief Map</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={handleClose}
                className="p-3 hover:bg-white/5 rounded-full transition-all text-white/40 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 space-y-10 overflow-y-auto max-h-[70vh] custom-scrollbar">
              
              {/* Star Rating Section */}
              <div className="flex flex-col items-center space-y-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-white/40">Overall Rating</span>
                <div className="flex items-center space-x-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(s)}
                      className="p-2 transition-all transform hover:scale-125 focus:outline-none"
                    >
                      <Star 
                        className={`w-10 h-10 transition-colors duration-300 ${
                          s <= (hoverRating || rating) 
                            ? 'text-[var(--accent)] fill-[var(--accent)]' 
                            : 'text-white/10'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
                <span className="text-[var(--accent)] font-black uppercase tracking-widest text-xs h-4">
                  {['Very Poor', 'Poor', 'Average', 'Good', 'Excellent'][(hoverRating || rating) - 1] || ''}
                </span>
              </div>

              {/* Location Selection */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/40 block">Select Location</label>
                <div className="relative group">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)] group-focus-within:text-[var(--accent)] transition-colors" />
                  <select 
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[var(--background)] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-bold appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-all hover:border-white/20"
                  >
                    <option value="" disabled className="bg-[var(--surface)]">Search for a restroom...</option>
                    {mockBathrooms.map(b => (
                      <option key={b.id} value={b.name} className="bg-[var(--surface)]">{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Review Text */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-white/40 block">Your Experience</label>
                <textarea 
                  required
                  placeholder="How was the cleanliness? Any maintenance issues we should know about?"
                  rows={4}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-[var(--background)] border border-white/10 rounded-3xl p-6 text-white font-medium placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-all hover:border-white/20 resize-none"
                ></textarea>
              </div>

            </div>

            {/* Footer */}
            <div className="p-8 pt-4 border-t border-white/5 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-[var(--accent)] bg-[var(--accent)]/5 px-4 py-2 rounded-xl border border-[var(--accent)]/10">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Location Verified</span>
              </div>
              <button 
                type="submit"
                disabled={isSubmitting || rating === 0 || !location || !reviewText}
                className="px-10 py-5 bg-[var(--accent)] text-[var(--surface)] font-black rounded-2xl shadow-[0_20px_40px_rgba(0,229,255,0.3)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 disabled:shadow-none flex items-center space-x-3"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-[var(--surface)] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post Review</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
