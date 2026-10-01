import React, { useState, useEffect } from 'react';
import { api } from '../api';
import type { Movie } from '../api';
import {
  X,
  Play,
  Plus,
  ThumbsUp,
  Check,
  Sparkles,
  Film,
  Calendar,
  Clock,
  Award,
  Clapperboard
} from 'lucide-react';

interface NetflixDetailModalProps {
  movie: Movie | null;
  onClose: () => void;
  onPlay: (movie: Movie) => void;
  isInList?: boolean;
  onToggleList?: (movie: Movie) => void;
  currentUser?: { role?: string; id?: string; email?: string } | null;
}

export const NetflixDetailModal: React.FC<NetflixDetailModalProps> = ({
  movie,
  onClose,
  onPlay,
  isInList = false,
  onToggleList,
  currentUser = null,
}) => {
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);

  useEffect(() => {
    if (movie?.id) {
      setLoadingRecs(true);
      api.getRecommendations(movie.id)
        .then((data) => setRecommendations(data))
        .catch(() => setRecommendations([]))
        .finally(() => setLoadingRecs(false));
    }
  }, [movie?.id]);

  if (!movie) return null;

  const isTrailer = movie.stream_type === 'trailer';

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-4xl bg-[#181818] rounded-xl overflow-hidden shadow-2xl text-white my-auto border border-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Hero Banner */}
        <div className="relative h-[320px] sm:h-[400px] w-full overflow-hidden">
          <img
            src={movie.backdrop_url || movie.poster_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600'}
            alt={movie.title}
            className="w-full h-full object-cover filter brightness-[0.82]"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              if (movie.poster_url && e.currentTarget.src !== movie.poster_url) {
                e.currentTarget.src = movie.poster_url;
              }
            }}
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#181818]/60 via-transparent to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#181818]/80 hover:bg-[#181818] text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Details & CTA */}
          <div className="absolute bottom-8 left-6 sm:left-10 right-6 flex items-center justify-between z-20">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-[#E50914] font-black text-lg">P</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase ${
                    isTrailer ? 'bg-amber-500 text-black' : 'bg-[#E50914] text-white'
                  }`}
                >
                  {isTrailer ? 'OFFICIAL 4K TRAILER' : 'MASTER FULL STREAM'}
                </span>
                {movie.imdb_score && (
                  <span className="text-amber-400 font-bold text-xs bg-black/60 px-2 py-0.5 rounded">
                    ★ {movie.imdb_score} IMDb
                  </span>
                )}
              </div>

              <h2 className="text-3xl sm:text-5xl font-black drop-shadow-lg tracking-tight uppercase leading-none">
                {movie.title}
              </h2>

              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onPlay(movie);
                  }}
                  className={`flex items-center gap-2 px-7 py-2.5 rounded font-bold text-base transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer ${
                    !isTrailer && !currentUser
                      ? 'bg-[#E50914] hover:bg-[#f6121d] text-white'
                      : currentUser?.role === 'studio'
                      ? 'bg-amber-600/90 text-white'
                      : 'bg-white hover:bg-white/80 text-black'
                  }`}
                >
                  <Play className={`w-5 h-5 ${!isTrailer && !currentUser ? 'fill-white' : currentUser?.role === 'studio' ? 'fill-white' : 'fill-black'}`} />
                  {isTrailer
                    ? 'Watch Official Trailer'
                    : currentUser?.role === 'studio'
                    ? 'Publisher View (Restricted)'
                    : !currentUser
                    ? 'Sign In to Stream'
                    : 'Play Full Movie'}
                </button>

                <button
                  onClick={() => onToggleList && onToggleList(movie)}
                  className="w-10 h-10 rounded-full border border-gray-400 hover:border-white bg-[#2a2a2a]/60 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
                  title={isInList ? "In My List" : "Add to My List"}
                >
                  {isInList ? <Check className="w-5 h-5 text-emerald-400" /> : <Plus className="w-5 h-5" />}
                </button>

                <button
                  className="w-10 h-10 rounded-full border border-gray-400 hover:border-white bg-[#2a2a2a]/60 backdrop-blur-md flex items-center justify-center text-white transition-colors cursor-pointer"
                  title="Rate"
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 space-y-8">
          
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Left 2 Cols: Synopsis & Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-[#46d369] font-bold">98% Match</span>
                <span className="text-gray-400">{movie.release_year}</span>
                <span className="border border-gray-600 px-1.5 py-0.5 rounded text-xs text-gray-300">
                  {movie.rating || 'PG-13'}
                </span>
                <span className="text-gray-400">{movie.duration_minutes}m</span>
                <span className="border border-gray-700 px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-300">
                  4K ULTRA HD
                </span>
              </div>

              <p className="text-gray-200 text-sm sm:text-base leading-relaxed">
                {movie.description}
              </p>

              {movie.tags && movie.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-xs text-gray-400 font-semibold">Universe Tags:</span>
                  {movie.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs">
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Right Col: Cast, Director, Genres */}
            <div className="space-y-3 text-xs border-t md:border-t-0 md:border-l border-gray-800 pt-4 md:pt-0 md:pl-6">
              {movie.director && (
                <div>
                  <span className="text-gray-400">Director: </span>
                  <span className="text-white font-medium">{movie.director}</span>
                </div>
              )}

              {movie.cast && movie.cast.length > 0 && (
                <div>
                  <span className="text-gray-400">Cast: </span>
                  <span className="text-white font-medium">{movie.cast.join(', ')}</span>
                </div>
              )}

              <div>
                <span className="text-gray-400">Genres: </span>
                <span className="text-white font-medium">{movie.genres?.join(', ')}</span>
              </div>

              <div>
                <span className="text-gray-400">Audio / Sound: </span>
                <span className="text-white font-medium">Dolby Atmos, 5.1 Surround</span>
              </div>
            </div>

          </div>

          {/* "More Like This" Section (Powered by Content-Based Recommendation Engine) */}
          <div className="pt-6 border-t border-gray-800 space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E50914]" />
              <span>More Like This (Content-Based AI Recommendations)</span>
            </h3>

            {loadingRecs ? (
              <div className="py-12 text-center text-gray-500 text-sm">
                Calculating feature similarities...
              </div>
            ) : recommendations.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {recommendations.slice(0, 6).map((rec) => (
                  <div
                    key={rec.id}
                    className="bg-[#232323] rounded-md overflow-hidden flex flex-col justify-between group hover:bg-[#2c2c2c] transition-colors border border-transparent hover:border-gray-700"
                  >
                    <div className="relative aspect-[2/3]">
                      <img
                        src={rec.poster_url || rec.backdrop_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500'}
                        alt={rec.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
                        }}
                      />
                      <div className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/70 text-white">
                        {rec.duration_minutes}m
                      </div>
                      <div className="absolute top-2 left-2">
                        <span
                          className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                            rec.stream_type === 'full' ? 'bg-[#E50914] text-white' : 'bg-amber-500 text-black'
                          }`}
                        >
                          {rec.stream_type === 'full' ? 'Full Movie' : 'Trailer'}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#46d369] font-bold">96% Match</span>
                          <span className="text-gray-400">{rec.release_year}</span>
                        </div>
                        <p className="text-white font-bold text-sm truncate mt-1">{rec.title}</p>
                        <p className="text-gray-400 text-xs line-clamp-2 mt-1">{rec.description}</p>
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onPlay(rec);
                        }}
                        className="w-full py-1.5 bg-white/10 hover:bg-[#E50914] text-white font-bold rounded text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        {rec.stream_type === 'full' ? 'Stream Movie' : 'Watch Trailer'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No similar titles found.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
