import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Play, 
  Film, 
  Clock, 
  Receipt, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UploadMovieModal } from './UploadMovieModal';
import { api, type Movie } from '../api';

interface NetflixStudioViewProps {
  movies: Movie[];
  onMovieAdded?: (newMovie: Movie) => void;
  currentUser?: {
    id: string;
    email: string;
    full_name?: string;
    role: string;
  } | null;
}

export const NetflixStudioView: React.FC<NetflixStudioViewProps> = ({
  movies,
  onMovieAdded,
  currentUser
}) => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [studioSummary, setStudioSummary] = useState<any>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Fetch live studio telemetry & revenue summary from Django backend
  useEffect(() => {
    const token = localStorage.getItem('pothole_token');
    if (token) {
      setLoadingSummary(true);
      api.getStudioSummary(token)
        .then((data) => {
          setStudioSummary(data);
        })
        .catch((err) => {
          console.warn('Could not load studio summary:', err);
        })
        .finally(() => setLoadingSummary(false));
    }
  }, [currentUser]);

  // Filter movies hosted strictly by this studio if user is a studio partner
  const hostedMovies = currentUser && currentUser.role === 'studio'
    ? movies.filter((m) => m.studio_id === currentUser.id)
    : movies.filter((m) => m.stream_type === 'full');

  // Compute live revenue metrics from backend Supabase telemetry
  const totalWatchHours = studioSummary?.total_hours_streamed ?? 0.0;
  const totalRevenue = studioSummary?.total_earnings_usd ?? 0.0;

  return (
    <div className="pt-24 px-4 sm:px-8 md:px-14 pb-20 max-w-7xl mx-auto space-y-8 select-none text-white">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[#E50914] font-black text-2xl tracking-tighter">POTHOLE</span>
            <span className="text-xs bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/40 px-2.5 py-0.5 rounded-full font-mono font-bold uppercase">
              Publisher Portal
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight uppercase mt-1">
            {currentUser?.full_name || 'Studio Production Dashboard'}
          </h1>
          <p className="text-gray-400 text-xs md:text-sm mt-0.5">
            Connected to Supabase PostgreSQL • Real-Time 10s Micro-Royalty Settlement Ledger
          </p>
        </div>

        {/* Ingest Action Button */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-[#E50914] hover:bg-[#f6121d] text-white text-xs font-bold transition-all shadow-lg shadow-[#E50914]/40 cursor-pointer hover:scale-105 active:scale-95 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Ingest Master Movie</span>
        </button>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Card 1: Total Revenue Generated */}
        <div className="bg-[#181818] p-6 rounded-xl border border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Total Revenue Generated</span>
            <Receipt className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs text-gray-400 font-sans font-normal">USD</span>
          </div>
          <p className="text-[11px] text-gray-500">
            Micro-settled every 10 seconds of verified viewer watch time
          </p>
        </div>

        {/* Card 2: Total Logged Watch Time */}
        <div className="bg-[#181818] p-6 rounded-xl border border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Total Logged Watch Time</span>
            <Clock className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {totalWatchHours.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} <span className="text-xs text-gray-400 font-sans font-normal">Hours</span>
          </div>
          <p className="text-[11px] text-gray-500">
            Calculated via high-frequency telemetry heartbeats
          </p>
        </div>

        {/* Card 3: Hosted Releases */}
        <div className="bg-[#181818] p-6 rounded-xl border border-gray-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Hosted Master Releases</span>
            <Film className="w-4 h-4 text-[#E50914]" />
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {hostedMovies.length} <span className="text-xs text-gray-400 font-sans font-normal">Titles</span>
          </div>
          <p className="text-[11px] text-gray-500">
            Single Master Format • Direct HTTP 206 Streaming
          </p>
        </div>

      </div>

      {/* Hosted Movies & Revenue Breakdown Table */}
      <div className="bg-[#181818] rounded-xl border border-gray-800 overflow-hidden space-y-4 p-6">
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white uppercase tracking-tight">
              Hosted Catalog & Revenue Breakdown
            </h2>
            <p className="text-xs text-gray-400">
              Live watch-time telemetry and revenue performance for your titles
            </p>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-semibold flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live Supabase Telemetry
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#121212] text-gray-400 border-b border-gray-800 uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Poster & Movie Title</th>
                <th className="py-3 px-4">Stream Profile</th>
                <th className="py-3 px-4">Watch Time Logged</th>
                <th className="py-3 px-4">Royalty Rate</th>
                <th className="py-3 px-4">Total Revenue Generated</th>
                <th className="py-3 px-4 text-right">Asset Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-mono text-[11px]">
              {hostedMovies.map((movie, idx) => {
                // Find matching stats from backend summary if available
                const stat = studioSummary?.movies?.find((m: any) => m.movie_id === movie.id);
                const movieHours = stat?.total_hours_watched ?? 0.0;
                const movieRevenue = stat?.total_earnings ?? 0.0;

                return (
                  <tr key={movie.id} className="hover:bg-white/5 transition-colors">
                    {/* Poster + Title */}
                    <td className="py-3 px-4 font-sans font-bold text-white">
                      <div className="flex items-center gap-3">
                        <img
                          src={movie.poster_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500'}
                          alt={movie.title}
                          className="w-10 h-14 object-cover rounded shadow"
                        />
                        <div>
                          <p className="text-sm font-bold text-white truncate max-w-xs">{movie.title}</p>
                          <p className="text-[11px] text-gray-400 font-normal">
                            {movie.release_year} • {movie.director || 'Studio Production'} • {movie.duration_minutes}m
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Stream Profile (Single Format) */}
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Single Master MP4</span>
                        </span>
                        <div className="text-[10px] text-gray-400 font-normal truncate max-w-[200px]">
                          HTTP 206 Byte-Range Delivery
                        </div>
                      </div>
                    </td>

                    {/* Watch Time Logged */}
                    <td className="py-3 px-4 text-white font-semibold">
                      <div>{movieHours.toFixed(1)} hrs</div>
                      <div className="text-[10px] text-gray-400 font-normal">
                        {Math.floor(movieHours * 360).toLocaleString()} pings
                      </div>
                    </td>

                    {/* Royalty Rate */}
                    <td className="py-3 px-4 text-amber-400 font-semibold">
                      $0.150 / hr
                    </td>

                    {/* Revenue Generated */}
                    <td className="py-3 px-4">
                      <div className="text-sm font-bold text-emerald-400">
                        ${movieRevenue.toFixed(2)} USD
                      </div>
                      <div className="text-[10px] text-gray-400 font-normal">
                        $0.000417 per 10s
                      </div>
                    </td>

                    {/* Asset Status */}
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Live in Catalog</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Master Movie Modal */}
      <UploadMovieModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={(newMovie) => {
          if (onMovieAdded) onMovieAdded(newMovie);
          setIsUploadModalOpen(false);
        }}
      />

    </div>
  );
};
