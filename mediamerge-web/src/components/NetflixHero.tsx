import React, { useState } from 'react';
import type { Movie } from '../api';
import { Play, Info, Volume2, VolumeX, Sparkles, Film, Plus, Check } from 'lucide-react';

interface NetflixHeroProps {
  movie: Movie | null;
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
  isInList?: boolean;
  onToggleList?: (movie: Movie) => void;
}

export const NetflixHero: React.FC<NetflixHeroProps> = ({
  movie,
  onPlay,
  onMoreInfo,
  isInList = false,
  onToggleList,
}) => {
  const [isMuted, setIsMuted] = useState(true);

  if (!movie) return null;

  return (
    <div className="relative w-full h-[85vh] min-h-[580px] max-h-[820px] select-none overflow-hidden">
      
      {/* Background Image / Video Backdrop */}
      <img
        src={movie.backdrop_url || movie.poster_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600'}
        alt={movie.title}
        className="w-full h-full object-cover object-top filter brightness-[0.82] transition-transform duration-1000 scale-100 hover:scale-105"
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.onerror = null;
          if (movie.poster_url && e.currentTarget.src !== movie.poster_url) {
            e.currentTarget.src = movie.poster_url;
          }
        }}
      />

      {/* Netflix Cinematic Gradients (Fade to black) */}
      <div className="absolute inset-0 netflix-hero-h-fade" />
      <div className="absolute inset-0 netflix-hero-v-fade" />

      {/* Hero Content Container */}
      <div className="absolute bottom-[20%] left-4 sm:left-8 md:left-14 max-w-xl md:max-w-2xl space-y-4 z-20">
        
        {/* Pothole Original Brand Tag */}
        <div className="flex items-center gap-2">
          <span className="text-[#E50914] font-black text-xl tracking-tighter drop-shadow-md">
            POTHOLE
          </span>
          <span className="text-[11px] font-black tracking-widest text-[#e5e5e5] uppercase px-2 py-0.5 rounded bg-white/10 backdrop-blur-sm border border-white/10">
            {movie.stream_type === 'full' ? '★ FULL STREAM' : '▶ TRAILER SPOTLIGHT'}
          </span>
          {movie.imdb_score && (
            <span className="text-[11px] font-bold text-amber-400 bg-black/50 px-2 py-0.5 rounded border border-amber-400/30 flex items-center gap-1">
              ★ {movie.imdb_score} IMDb
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tighter drop-shadow-2xl uppercase leading-none">
          {movie.title}
        </h1>

        {/* Short Synopsis */}
        <p className="text-[#e5e5e5] text-sm md:text-base leading-relaxed drop-shadow-md line-clamp-3 md:line-clamp-4 font-normal max-w-xl">
          {movie.description}
        </p>

        {/* Genres & Director Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-300 pt-1">
          {movie.director && (
            <span className="text-white font-medium">Directed by {movie.director}</span>
          )}
          {movie.genres?.map((g) => (
            <span key={g} className="px-2 py-0.5 rounded-full bg-white/10 text-gray-300 text-[11px]">
              {g}
            </span>
          ))}
        </div>

        {/* Netflix Iconic CTA Buttons */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => onPlay(movie)}
            className="flex items-center justify-center gap-2.5 bg-white hover:bg-white/80 text-black px-7 py-2.5 md:py-3 rounded font-bold text-sm md:text-base transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-black" />
            {movie.stream_type === 'trailer' ? 'Watch Trailer' : 'Play Movie'}
          </button>

          <button
            onClick={() => onMoreInfo(movie)}
            className="flex items-center justify-center gap-2.5 bg-[rgba(109,109,110,0.7)] hover:bg-[rgba(109,109,110,0.4)] text-white px-6 py-2.5 md:py-3 rounded font-bold text-sm md:text-base transition-all backdrop-blur-sm cursor-pointer"
          >
            <Info className="w-5 h-5" />
            More Info
          </button>

          {onToggleList && (
            <button
              onClick={() => onToggleList(movie)}
              className="flex items-center justify-center gap-2 bg-[rgba(109,109,110,0.7)] hover:bg-[rgba(109,109,110,0.4)] text-white px-5 py-2.5 md:py-3 rounded font-bold text-sm md:text-base transition-all backdrop-blur-sm cursor-pointer"
            >
              {isInList ? <Check className="w-5 h-5 text-[#46d369]" /> : <Plus className="w-5 h-5" />}
              <span>{isInList ? 'In List' : 'My List'}</span>
            </button>
          )}
        </div>

      </div>

      {/* Right Side: Sound Toggle & Maturity Rating Stripe */}
      <div className="absolute right-0 bottom-[20%] flex items-center gap-3.5 z-20">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="w-10 h-10 rounded-full border border-white/60 bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Maturity Rating Bar */}
        <div className="bg-[rgba(51,51,51,0.6)] border-l-4 border-white py-1 pl-3 pr-8 text-xs font-semibold text-white tracking-wider flex items-center gap-2 backdrop-blur-sm">
          <span>{movie.rating || 'PG-13'}</span>
          <span className="text-[10px] text-gray-300 font-normal">| 4K Ultra HD</span>
        </div>
      </div>

    </div>
  );
};
