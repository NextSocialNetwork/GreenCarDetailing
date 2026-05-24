import React, { useState, useEffect } from 'react';
import { Star, MessageSquarePlus, Check, Sparkles, Filter, Smile } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data';
import { Review } from '../types';

export default function Reviews() {
  const [reviewsList, setReviewsList] = useState<Review[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // New review form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [serviceType, setServiceType] = useState('Green Car Detailing Signature Setup');
  
  // Filter states
  const [ratingFilter, setRatingFilter] = useState<number | 'all'>('all');

  // Load reviews on mount
  useEffect(() => {
    const stored = localStorage.getItem('ngreen_ratings_reviews');
    if (stored) {
      try {
        setReviewsList(JSON.parse(stored));
      } catch (e) {
        setReviewsList(INITIAL_REVIEWS);
      }
    } else {
      setReviewsList(INITIAL_REVIEWS);
      localStorage.setItem('ngreen_ratings_reviews', JSON.stringify(INITIAL_REVIEWS));
    }
  }, []);

  // Calculate stats
  const averageRating = reviewsList.length > 0 
    ? (reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1)
    : '5.0';

  const reviewsFiltered = ratingFilter === 'all' 
    ? reviewsList 
    : reviewsList.filter(r => r.rating === ratingFilter);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      alert("Please fill out your name and review text.");
      return;
    }

    const newReview: Review = {
      id: 'rev-' + Date.now(),
      authorName: name,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      serviceType,
      verified: true,
      avatarUrl: undefined
    };

    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    localStorage.setItem('ngreen_ratings_reviews', JSON.stringify(updated));
    
    // Reset states
    setName('');
    setComment('');
    setRating(5);
    setShowAddForm(false);
  };

  return (
    <section id="reviews" className="py-24 bg-slate-950 text-white border-t border-slate-900">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        {/* Header Title block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold mb-3 tracking-wide uppercase border border-glow-green/30 font-mono">
            <Smile className="w-3.5 h-3.5" />
            Verified Client Testimonials
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-semibold tracking-tight">
            Our Client <span className="text-green-400 glow-text">Satisfaction Profile</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm md:text-base leading-relaxed">
            Forensic attention to detail, premium organic air scents, and immaculate results that guarantee your total custom satisfaction.
          </p>
        </div>

        {/* Dynamic Reviews dashboard widget */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          
          {/* Average metrics overview */}
          <div className="md:col-span-4 bg-slate-900 px-6 py-8 rounded-3xl border border-glow-green/30 shadow-3d-dark text-center flex flex-col justify-center items-center space-y-4">
            <p className="text-[10px] font-mono uppercase text-slate-405 tracking-wider font-bold">Overall Luster Score</p>
            <div>
              <span className="text-6xl font-display font-black text-green-400 leading-none">{averageRating}</span>
              <span className="text-slate-500 text-xs font-semibold"> / 5.0</span>
            </div>
            
            {/* Stars visual */}
            <div className="flex gap-1 justify-center">
              {Array.from({ length: 5 }).map((_, idx) => {
                const isFull = idx < Math.round(Number(averageRating));
                return <Star key={idx} className={`w-5 h-5 ${isFull ? 'fill-green-400 text-green-400' : 'text-slate-700'}`} />;
              })}
            </div>

            <p className="text-xs text-slate-400">
              Computed from <strong>{reviewsList.length}</strong> active verified client testimonials.
            </p>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 border border-green-500/30 text-green-400 hover:bg-green-500/10 rounded-xl text-xs font-semibold font-display transition-all inline-flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" /> Share Your Experience
            </button>
          </div>

          {/* Filtering and actual reviews scroll list */}
          <div className="md:col-span-8 flex flex-col justify-between space-y-6">
            
            {/* Filters panel */}
            <div className="flex items-center justify-between flex-wrap gap-4 bg-slate-850 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-350">
                <Filter className="w-3.5 h-3.5 text-green-400" /> Filter Ratings:
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {['all', 5, 4, 3].map((val) => (
                  <button
                    key={val}
                    onClick={() => setRatingFilter(val as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                      ratingFilter === val
                        ? 'bg-green-500 text-slate-950 border-green-400 font-display'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750'
                    }`}
                  >
                    {val === 'all' ? 'All Reviews' : `${val} Stars`}
                  </button>
                ))}
              </div>
            </div>

            {/* Write review form (toggled) */}
            {showAddForm && (
              <form onSubmit={handleAddReview} className="bg-slate-850 p-6 rounded-2xl border border-green-500/20 space-y-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-display font-semibold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-green-400" /> Submitting Detailing Feedback
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-xs text-slate-450 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Marcus Aurelius"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-green-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Rating Selection</label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-green-400"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ 5 Stars</option>
                      <option value={4}>⭐⭐⭐⭐ 4 Stars</option>
                      <option value={3}>⭐⭐⭐ 3 Stars</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Detailing Service package received</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-green-400"
                  >
                    <option value="Eco Essential Detail">Eco Essential Detail</option>
                    <option value="Green Car Detailing Signature Setup">Green Car Detailing Signature Setup</option>
                    <option value="Showroom Ceramic Reset">Showroom Ceramic Reset</option>
                    <option value="Engine Bay / Headlight Specialty Addons">Engine Bay / Headlight Specialty Addon</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase font-semibold">Written Review Comments</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell our eco-clean crew and potential clients how shiny your car frames returned..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-green-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-green-500 hover:bg-green-400 text-slate-950 font-semibold rounded-xl text-xs font-display flex items-center justify-center gap-1 cursor-pointer"
                >
                  Publish Verified Review
                </button>
              </form>
            )}

            {/* List scroll container */}
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
              {reviewsFiltered.length === 0 ? (
                <div className="text-center py-12 text-slate-500 border border-slate-800 border-dashed rounded-2xl">
                  No reviews match the selected filter query.
                </div>
              ) : (
                reviewsFiltered.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 bg-slate-900 rounded-2xl border border-slate-800/80 hover:border-green-400/35 transition-all duration-300 shadow-3d-dark hover:shadow-green-950/20 space-y-3"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center text-green-400 font-display font-bold text-sm shrink-0 overflow-hidden">
                          {rev.avatarUrl ? (
                            <img src={rev.avatarUrl} alt={rev.authorName} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                          ) : (
                            rev.authorName.charAt(0)
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs sm:text-sm font-semibold">{rev.authorName}</span>
                            {rev.verified && (
                              <span className="text-[9px] font-mono font-bold bg-green-500/15 text-green-400 border border-green-500/20 px-1 rounded flex items-center gap-0.5">
                                <Check className="w-2.5 h-2.5" /> Verified
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-500 block font-mono">{rev.date}</span>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            className={`w-3.5 h-3.5 ${
                              idx < rev.rating ? 'fill-green-400 text-green-400' : 'text-slate-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      "{rev.comment}"
                    </p>

                    <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between">
                      <span>Service: <strong className="text-slate-400 font-sans">{rev.serviceType}</strong></span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
