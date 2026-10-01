import React, { useState } from 'react';
import { X, UploadCloud, Film, Sparkles, CheckCircle2, Search } from 'lucide-react';
import { api, type Movie } from '../api';

interface UploadMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newMovie: Movie) => void;
}

export const UploadMovieModal: React.FC<UploadMovieModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState('Sci-Fi, Action');
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState('');
  const [releaseYear, setReleaseYear] = useState('2024');
  const [duration, setDuration] = useState('120');
  const [rating, setRating] = useState('PG-13');
  const [imdbScore, setImdbScore] = useState('8.5');
  const [streamType, setStreamType] = useState<'full' | 'trailer'>('full');
  const [trailerId, setTrailerId] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [backdropUrl, setBackdropUrl] = useState('');
  const [royaltyRate, setRoyaltyRate] = useState('0.15');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // OMDb Auto-fill states
  const [omdbQuery, setOmdbQuery] = useState('');
  const [omdbResults, setOmdbResults] = useState<any[]>([]);
  const [omdbSearching, setOmdbSearching] = useState(false);

  if (!isOpen) return null;

  const handleOmdbSearch = async () => {
    if (!omdbQuery.trim()) return;
    setOmdbSearching(true);
    try {
      const res = await api.omdbSearch(omdbQuery);
      setOmdbResults(res.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setOmdbSearching(false);
    }
  };

  const handleSelectOmdb = async (imdbId: string) => {
    setOmdbSearching(true);
    try {
      const detail = await api.omdbSearch('', imdbId);
      if (detail && detail.Title) {
        setTitle(detail.Title);
        setDescription(detail.Plot || '');
        setGenres(detail.Genre || 'Action, Drama');
        setDirector(detail.Director || '');
        setCast(detail.Actors || '');
        setReleaseYear(detail.Year ? detail.Year.substring(0, 4) : '2024');
        setDuration(detail.Runtime ? String(parseInt(detail.Runtime) || 120) : '120');
        setRating(detail.Rated || 'PG-13');
        setImdbScore(detail.imdbRating || '8.0');
        if (detail.Poster && detail.Poster !== 'N/A') {
          setPosterUrl(detail.Poster);
          setBackdropUrl(detail.Poster);
        }
        setOmdbResults([]);
        setOmdbQuery('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setOmdbSearching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const token = localStorage.getItem('pothole_token');
    if (!token) {
      setError('You must be logged in as a Studio Partner to ingest movies.');
      setLoading(false);
      return;
    }

    try {
      const payload = {
        title,
        description,
        genres: genres.split(',').map((g) => g.trim()),
        release_year: parseInt(releaseYear) || 2024,
        duration_minutes: parseInt(duration) || 120,
        rating,
        imdb_score: parseFloat(imdbScore) || 8.0,
        director: director || undefined,
        cast: cast ? cast.split(',').map((c) => c.trim()) : [],
        tags: [streamType, ...genres.split(',').map((g) => g.trim())],
        stream_type: streamType,
        trailer_youtube_id: trailerId || undefined,
        poster_url: posterUrl || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&auto=format&fit=crop&q=60',
        backdrop_url: backdropUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
        video_url: videoUrl || undefined,
      };

      const createdMovie = await api.createMovie(payload, token);
      onSuccess(createdMovie);
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Upload failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#181818] border border-white/10 rounded-xl p-6 sm:p-8 text-white shadow-2xl my-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <UploadCloud className="w-6 h-6 text-[#E50914]" />
          <div>
            <h2 className="text-xl font-bold uppercase tracking-tight">Studio Master Ingest</h2>
            <p className="text-xs text-gray-400">Ingest original movies with direct Fileditch stream links</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded bg-[#E50914]/20 border border-[#E50914] text-white text-xs">
            {error}
          </div>
        )}

        {/* OMDb Fast Auto-Fill Station */}
        <div className="bg-[#222222] p-3 rounded-lg border border-white/10 mb-5 space-y-2">
          <label className="text-gray-300 font-semibold text-xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#E50914]" />
            <span>Auto-Fill Details from IMDb (Instant Metadata & Posters)</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={omdbQuery}
              onChange={(e) => setOmdbQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleOmdbSearch();
                }
              }}
              placeholder="Type movie title (e.g. Gladiator II, Tenet)..."
              className="flex-1 px-3 py-1.5 bg-[#2c2c2c] rounded border border-gray-700 text-white text-xs focus:border-white focus:outline-none"
            />
            <button
              type="button"
              onClick={handleOmdbSearch}
              disabled={omdbSearching}
              className="px-4 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {omdbSearching ? 'Searching...' : 'Search IMDb'}
            </button>
          </div>

          {omdbResults.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 max-h-48 overflow-y-auto">
              {omdbResults.map((item) => (
                <div
                  key={item.imdbID}
                  onClick={() => handleSelectOmdb(item.imdbID)}
                  className="flex items-center gap-2 p-1.5 rounded bg-black/60 hover:bg-[#E50914]/20 border border-white/10 hover:border-[#E50914] cursor-pointer text-[11px] transition-all"
                >
                  <img src={item.poster} alt={item.title} className="w-8 h-11 object-cover rounded shrink-0" />
                  <div className="truncate">
                    <p className="font-bold text-white truncate">{item.title}</p>
                    <p className="text-gray-400 text-[10px]">{item.year}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Movie Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Dune: Part Three"
                className="w-full px-3 py-2 bg-[#262626] rounded border border-gray-700 text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Stream Profile *</label>
              <select
                value={streamType}
                onChange={(e) => setStreamType(e.target.value as 'full' | 'trailer')}
                className="w-full px-3 py-2 bg-[#262626] rounded border border-gray-700 text-white focus:border-white focus:outline-none"
              >
                <option value="full">Single Master MP4 (With 10s Telemetry)</option>
                <option value="trailer">Official 4K Trailer (Promotional)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Synopsis / Plot *</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed plot synopsis..."
              className="w-full px-3 py-2 bg-[#262626] rounded border border-gray-700 text-white focus:border-white focus:outline-none resize-none"
            />
          </div>

          {/* Video Stream URL (Fileditch Direct Link) */}
          {streamType === 'full' ? (
            <div>
              <label className="block text-gray-300 font-semibold mb-1">
                Fileditch Master Stream URL (Direct .mp4 link) *
              </label>
              <input
                type="text"
                required
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://fileditchfiles.st/charlie38/.../movie.mp4"
                className="w-full px-3 py-2 bg-[#262626] rounded border border-gray-700 text-white focus:border-white focus:outline-none font-mono text-[11px]"
              />
              <p className="text-[10px] text-gray-500 mt-1">
                Streamed via Django RFC 7233 byte-range proxy. Direct URL will be shielded from viewers.
              </p>
            </div>
          ) : (
            <div>
              <label className="block text-gray-300 font-semibold mb-1">YouTube Trailer Video ID *</label>
              <input
                type="text"
                required
                value={trailerId}
                onChange={(e) => setTrailerId(e.target.value)}
                placeholder="e.g. Way9Dexny3w"
                className="w-full px-3 py-2 bg-[#262626] rounded border border-gray-700 text-white focus:border-white focus:outline-none"
              />
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Genres</label>
              <input
                type="text"
                value={genres}
                onChange={(e) => setGenres(e.target.value)}
                placeholder="Sci-Fi, Action, Drama"
                className="w-full px-3 py-2 bg-[#262626] rounded border border-gray-700 text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Release Year</label>
              <input
                type="number"
                value={releaseYear}
                onChange={(e) => setReleaseYear(e.target.value)}
                className="w-full px-3 py-2 bg-[#262626] rounded border border-gray-700 text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Duration (Mins)</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 bg-[#262626] rounded border border-gray-700 text-white focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">Director</label>
              <input
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                placeholder="e.g. Christopher Nolan"
                className="w-full px-3 py-2 bg-[#262626] rounded border border-gray-700 text-white focus:border-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">Cast Members</label>
              <input
                type="text"
                value={cast}
                onChange={(e) => setCast(e.target.value)}
                placeholder="Actor 1, Actor 2"
                className="w-full px-3 py-2 bg-[#262626] rounded border border-gray-700 text-white focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-1">Poster Artwork URL</label>
            <input
              type="text"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              placeholder="https://m.media-amazon.com/images/..."
              className="w-full px-3 py-2 bg-[#262626] rounded border border-gray-700 text-white focus:border-white focus:outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-white/10 hover:bg-white/20 text-gray-300 font-semibold text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 rounded bg-[#E50914] hover:bg-[#f6121d] text-white font-bold text-xs transition-all shadow-md shadow-[#E50914]/30 cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Ingesting Asset...' : 'Publish to Catalog'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
