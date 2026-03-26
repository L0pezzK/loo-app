'use client';

import { useState, useEffect } from 'react';
import { Star, MessageSquare, TrendingUp, Users, Award, ChevronRight, SlidersHorizontal } from 'lucide-react';
import ReviewFeedCard from './ReviewFeedCard';
import TopRatedSidebarCard from './TopRatedSidebarCard';
import ContributorRow from './ContributorRow';
import AddReviewModal from './AddReviewModal';

export default function CommunityReviewsView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]);

  const defaultReviews = [
    {
      author: "Amélie Durand",
      avatar: "https://i.pravatar.cc/150?u=amelie",
      location: "Palais de Justice",
      image: "/images/bathrooms/louvre.png",
      time: "2 hours ago",
      rating: 5,
      text: "Cleanest one near the Louvre! The self-cleaning mechanism actually works here and there was no queue at 11 AM. A life saver during museum hop!",
      likes: 42,
      comments: 4,
      isVerified: true
    },
    {
      author: "Julien Lefebvre",
      avatar: "https://i.pravatar.cc/150?u=julien",
      location: "Place des Vosges - North",
      image: "/images/bathrooms/tuileries.png",
      time: "5 hours ago",
      rating: 4,
      text: "Pretty decent for a public one. Accessibility ramp is wide enough for double strollers. Water pressure was a bit low though.",
      likes: 18,
      comments: 2,
      isVerified: true
    },
    {
      author: "Marc Bernard",
      avatar: "https://i.pravatar.cc/150?u=marc",
      location: "Châtelet Metro Hub",
      image: "/images/bathrooms/st_lazare.png",
      time: "Yesterday",
      rating: 2,
      text: "Avoid this one if possible. Maintenance seems to have been skipped today. Better off walking to the nearby department store.",
      likes: 89,
      comments: 31,
      isVerified: false
    }
  ];

  // Initialize reviews from local storage + defaults
  useEffect(() => {
    const saved = localStorage.getItem('loo-user-reviews');
    if (saved) {
      const parsed = JSON.parse(saved);
      setReviews([...parsed, ...defaultReviews]);
    } else {
      setReviews(defaultReviews);
    }
  }, []);

  const handleAddReview = (newReview: any) => {
    const saved = localStorage.getItem('loo-user-reviews');
    const userReviews = saved ? JSON.parse(saved) : [];
    const updatedUserReviews = [newReview, ...userReviews];
    
    localStorage.setItem('loo-user-reviews', JSON.stringify(updatedUserReviews));
    setReviews([newReview, ...reviews]);
  };

  return (
    <div className="flex-1 bg-[var(--background)] flex flex-col overflow-y-auto custom-scrollbar animate-in fade-in zoom-in duration-500">
      
      <AddReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleAddReview} 
      />

      <div className="max-w-7xl mx-auto w-full px-8 lg:px-12 py-12">
        
        {/* Community Highlights Dashboard */}
        <div className="relative rounded-[48px] overflow-hidden p-12 mb-16 border border-white/5 bg-gradient-to-br from-[var(--surface)]/80 to-transparent">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[var(--accent)]/5 to-transparent blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            <div>
              <h2 className="text-6xl font-black text-white tracking-tighter mb-4">Community Highlights</h2>
              <p className="text-[var(--text-secondary)] text-xl font-medium max-w-xl leading-relaxed">
                Real-time reports from fellow Parisians. Join the quest for the perfect public rest stop.
              </p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-12 py-5 bg-[var(--accent)]/10 text-[var(--accent)] rounded-2xl font-black shadow-2xl hover:bg-[var(--accent)] hover:text-[var(--surface)] transition-all flex items-center space-x-3 border border-[var(--accent)]/20"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Share Your Experience</span>
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 relative z-10">
            <div className="bg-black/20 backdrop-blur-xl p-8 rounded-[32px] border border-white/5">
              <div className="flex items-center space-x-4 mb-2">
                <Users className="w-5 h-5 text-[var(--accent)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Reviews</span>
              </div>
              <p className="text-4xl font-black text-white tracking-tighter">12,482</p>
            </div>
            <div className="bg-black/20 backdrop-blur-xl p-8 rounded-[32px] border border-white/5">
              <div className="flex items-center space-x-4 mb-2">
                <Star className="w-5 h-5 text-[var(--accent)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Avg Paris Rating</span>
              </div>
              <p className="text-4xl font-black text-white tracking-tighter">4.2 <span className="text-lg opacity-40">★</span></p>
            </div>
            {/* Additional stats if needed to fill space */}
            <div className="hidden md:block bg-black/20 backdrop-blur-xl p-8 rounded-[32px] border border-white/5">
              <div className="flex items-center space-x-4 mb-2">
                <TrendingUp className="w-5 h-5 text-[var(--accent)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Verified Local Reports</span>
              </div>
              <p className="text-4xl font-black text-white tracking-tighter">8,103</p>
            </div>
            <div className="hidden md:block bg-black/20 backdrop-blur-xl p-8 rounded-[32px] border border-white/5">
              <div className="flex items-center space-x-4 mb-2">
                <Award className="w-5 h-5 text-[var(--accent)]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Top Contributor Badge</span>
              </div>
              <p className="text-4xl font-black text-white tracking-tighter">Gold</p>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-bold text-white/40">Sort by:</span>
                <div className="flex items-center p-1 bg-[var(--surface)] border border-white/5 rounded-2xl">
                  {['Newest', 'Highest Rated', 'Near Me'].map((f) => (
                    <button key={f} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${f === 'Newest' ? 'bg-[var(--accent)] text-[var(--surface)] shadow-lg' : 'text-[var(--text-secondary)] hover:text-white'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Showing 24 reviews</span>
            </div>

            <div className="space-y-8">
              {reviews.map((r, i) => (
                <ReviewFeedCard key={i} {...r} />
              ))}
            </div>

            <button className="w-full py-6 rounded-[32px] border border-white/5 bg-[var(--surface)]/20 text-white font-black uppercase tracking-[0.3em] text-[10px] hover:bg-[var(--surface)]/40 transition-all flex items-center justify-center space-x-4">
              <span>Load More Memories</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-12">
            
            {/* Top Rated This Week */}
            <div className="bg-[var(--surface)]/40 border border-white/5 rounded-[40px] p-8">
              <div className="flex items-center space-x-3 mb-8">
                <TrendingUp className="w-5 h-5 text-[var(--accent)]" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Top Rated This Week</h3>
              </div>
              <div className="space-y-6">
                <TopRatedSidebarCard 
                  name="Jardin du Luxembourg - East"
                  image="/images/bathrooms/tuileries.png"
                  cleanPercent={98}
                  label="Full Access"
                />
                <TopRatedSidebarCard 
                  name="Quai d'Orsay - Floating Loo"
                  image="/images/bathrooms/concorde.png"
                  cleanPercent={92}
                  label="Partial Access"
                  isNearby={true}
                />
              </div>
              <button className="w-full mt-8 py-4 px-6 rounded-2xl border border-white/5 text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] hover:text-white hover:bg-white/5 transition-all text-center">
                View All Rankings →
              </button>
            </div>

            {/* Top Contributors */}
            <div className="bg-[var(--surface)]/40 border border-white/5 rounded-[40px] p-8">
              <div className="flex items-center space-x-3 mb-8">
                <Award className="w-5 h-5 text-[var(--accent)]" />
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Top Contributors</h3>
              </div>
              <div className="space-y-4">
                <ContributorRow name="Antoine M." avatar="AM" reviewCount={142} rank={1} />
                <ContributorRow name="Sophie C." avatar="SC" reviewCount={98} rank={2} />
                <ContributorRow name="Marc B." avatar="MB" reviewCount={85} rank={3} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
