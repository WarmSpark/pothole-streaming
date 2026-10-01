import React, { useRef } from 'react';
import type { Movie } from '../api';
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, ChevronDown, Film } from 'lucide-react';

interface NetflixRowProps {
  title: string;
  movies: Movie[];
  onPlay: (movie: Movie) => void;
  onMoreInfo: (movie: Movie) => void;
}

export const NetflixRow: React.FC<NetflixRowProps> = ({
  title,
  movies,
  onPlay,
  onMoreInfo,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const validMovies = (movies || []).filter(Boolean);
  if (validMovies.length === 0) return null;

  return (
    <div className="space-y-2 mb-8 md:mb-12 relative group/row px-4 sm:px-8 md:px-14">
      
      {/* Row Title */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#e5e5e5] hover:text-white transition-colors cursor-pointer flex items-center gap-2">
        <span>{title}</span>
        <span className="text-xs text-[#E50914] font-semibold opacity-0 group-hover/row:opacity-100 transition-opacity hidden sm:inline">
          Explore All &gt;
        </span>
      </h2>

      {/* Row Wrapper with Side Chevrons */}
      <div className="relative">
        
        {/* Left Scroll Chevron */}
        <button
          onClick={() => scroll('left')}
          className="absolute -left-4 sm:-left-8 md:-left-12 top-0 bottom-0 z-30 w-10 sm:w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 rounded-r cursor-pointer"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={rowRef}
          className="flex items-center gap-2.5 sm:gap-3.5 overflow-x-auto no-scrollbar scroll-smooth py-4"
        >
          {validMovies.map((movie) => (
            <div
              key={movie.id}
              className="relative flex-none w-[145px] sm:w-[175px] md:w-[205px] aspect-[2/3] rounded-md overflow-hidden cursor-pointer group/card bg-[#181818] shadow-md transition-all duration-300 hover:scale-115 hover:z-40 hover:shadow-2xl hover:shadow-black"
              onClick={() => onMoreInfo(movie)}
            >
              {/* Card Image: Official Theatrical IMDb Poster */}
              <img
                src={movie.poster_url || movie.backdrop_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500'}
                alt={movie.title || 'Movie'}
                className="w-full h-full object-cover rounded-md filter brightness-95 group-hover/card:brightness-105 transition-all"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
                }}
              />

              {/* Stream Badge in Top Corner */}
              <div className="absolute top-2 left-2 flex items-center gap-1">
                <span className="text-[#E50914] font-black text-xs drop-shadow-md">P</span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase ${
                    movie.stream_type === 'full'
                      ? 'bg-[#E50914] text-white shadow-sm'
                      : 'bg-amber-500/90 text-black'
                  }`}
                >
                  {movie.stream_type === 'full' ? 'FULL MOVIE' : 'TRAILER'}
                </span>
              </div>

              {/* Title & Metadata Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-3">
                <p className="text-white font-bold text-xs sm:text-sm truncate drop-shadow">
                  {movie.title}
                </p>

                {/* Mini Hover Details */}
                <div className="hidden group-hover/card:flex items-center justify-between pt-1 text-[10px]">
                  <div className="flex items-center gap-1.5">
                    {movie.imdb_score && (
                      <span className="text-amber-400 font-bold">★ {movie.imdb_score}</span>
                    )}
                    <span className="text-gray-300 border border-gray-600 px-1 rounded text-[9px]">
                      {movie.rating || 'PG-13'}
                    </span>
                    <span className="text-gray-400">{movie.duration_minutes}m</span>
                  </div>
                  <span className="text-gray-300 font-mono text-[9px] uppercase">4K Ultra HD</span>
                </div>

                {/* Genre Snippet */}
                <div className="hidden group-hover/card:flex items-center gap-1 pt-1 text-[9px] text-gray-400 truncate">
                  {movie.genres?.slice(0, 3).join(' • ')}
                </div>

                {/* Mini Buttons on Hover */}
                <div className="hidden group-hover/card:flex items-center gap-1.5 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onPlay(movie);
                    }}
                    className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center hover:bg-white/80 transition-transform hover:scale-110 cursor-pointer"
                    title={movie.stream_type === 'trailer' ? 'Watch Trailer' : 'Play Movie'}
                  >
                    <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                  </button>

                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-full bg-[#2a2a2a] text-white border border-gray-500/60 flex items-center justify-center hover:border-white transition-colors cursor-pointer"
                    title="Add to My List"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="w-7 h-7 rounded-full bg-[#2a2a2a] text-white border border-gray-500/60 flex items-center justify-center hover:border-white transition-colors cursor-pointer"
                    title="I like this"
                  >
                    <ThumbsUp className="w-3 h-3" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMoreInfo(movie);
                    }}
                    className="w-7 h-7 rounded-full bg-[#2a2a2a] text-white border border-gray-500/60 flex items-center justify-center hover:border-white ml-auto transition-colors cursor-pointer"
                    title="More Info"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Right Scroll Chevron */}
        <button
          onClick={() => scroll('right')}
          className="absolute -right-4 sm:-right-8 md:-right-12 top-0 bottom-0 z-30 w-10 sm:w-12 bg-black/60 hover:bg-black/80 text-white flex items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity duration-300 rounded-l cursor-pointer"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

      </div>
    </div>
  );
};
