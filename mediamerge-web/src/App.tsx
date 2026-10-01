import React, { useState, useEffect } from 'react';
import { api } from './api';
import type { Movie, User } from './api';
import { NetflixNavbar } from './components/NetflixNavbar';
import { NetflixHero } from './components/NetflixHero';
import { NetflixRow } from './components/NetflixRow';
import { NetflixDetailModal } from './components/NetflixDetailModal';
import { NetflixPlayer } from './components/NetflixPlayer';
import { NetflixAuthModal } from './components/NetflixAuthModal';
import { NetflixStudioView } from './components/NetflixStudioView';
import { NetflixIntro } from './components/NetflixIntro';
import { getFallbackMovies } from './data/imdbMovies';
import { 
  Play, 
  Info, 
  Plus, 
  Check, 
  Trash2, 
  Film, 
  Tv, 
  Sparkles, 
  Clapperboard, 
  Clock, 
  Layers,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'tv' | 'movies' | 'mylist' | 'studio'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [selectedMovieForInfo, setSelectedMovieForInfo] = useState<Movie | null>(null);
  const [selectedMovieForPlay, setSelectedMovieForPlay] = useState<Movie | null>(null);
  const [omdbSearchResults, setOmdbSearchResults] = useState<any[]>([]);
  const [searchingOmdb, setSearchingOmdb] = useState(false);

  // Centralized playback gate:
  // 1. Publisher studio accounts cannot stream videos (restricted to dashboard analytics)
  // 2. Full master movies require viewer authentication (premium subscription)
  const handlePlayMovie = (movie: Movie) => {
    if (currentUser?.role === 'studio') {
      alert("⚠️ Publisher accounts are strictly restricted to asset catalog management and royalty analytics. Video streaming is disabled for publisher studio accounts.");
      return;
    }

    if (movie.stream_type === 'full' && !currentUser) {
      setIsAuthOpen(true);
      return;
    }

    setSelectedMovieForPlay(movie);
  };

  // My List (persisted per user in localStorage)
  const [myListIds, setMyListIds] = useState<string[]>([]);

  useEffect(() => {
    if (currentUser) {
      try {
        const saved = localStorage.getItem(`pothole_mylist_${currentUser.id}`);
        setMyListIds(saved ? JSON.parse(saved) : []);
      } catch {
        setMyListIds([]);
      }
    } else {
      setMyListIds([]);
    }
  }, [currentUser]);

  const toggleMyList = (movie: Movie) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    setMyListIds((prev) => {
      const exists = prev.includes(movie.id);
      const updated = exists ? prev.filter((id) => id !== movie.id) : [...prev, movie.id];
      localStorage.setItem(`pothole_mylist_${currentUser.id}`, JSON.stringify(updated));
      return updated;
    });
  };

  const isMovieInMyList = (movieId: string) => myListIds.includes(movieId);

  // Global OMDb Search Effect
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      setSearchingOmdb(true);
      const timer = setTimeout(() => {
        api.omdbSearch(searchQuery)
          .then((data) => {
            setOmdbSearchResults(data.results || []);
          })
          .catch(() => setOmdbSearchResults([]))
          .finally(() => setSearchingOmdb(false));
      }, 350);
      return () => clearTimeout(timer);
    } else {
      setOmdbSearchResults([]);
    }
  }, [searchQuery]);

  // 1. Load Session from LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('pothole_user');
    const token = localStorage.getItem('pothole_token');
    if (savedUser && token) {
      try {
        setCurrentUser(JSON.parse(savedUser));
        // Verify with backend
        api.getMe(token)
          .then((u) => setCurrentUser(u))
          .catch(() => {
            localStorage.removeItem('pothole_token');
            localStorage.removeItem('pothole_user');
            setCurrentUser(null);
          });
      } catch {
        // Ignored
      }
    }
  }, []);

  // 2. Fetch Catalog Movies from FastAPI Backend (with real Supabase data)
  useEffect(() => {
    api.getMovies()
      .then((data) => {
        if (data && data.length > 0) {
          setMovies(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn('Backend catalog offline or slow; using default Pothole catalog:', err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pothole_token');
    localStorage.removeItem('pothole_user');
    setCurrentUser(null);
    if (activeTab === 'studio') setActiveTab('home');
  };

  // Search Filtering
  const searchResults = movies.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.director?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.genres?.some((g) => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
    m.cast?.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
    m.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Categorized Rows for Netflix Layout
  const heroMovie = movies.find((m) => m.title === 'Interstellar') || movies[0] || null;
  const fullMovies = movies.filter((m) => m.stream_type === 'full');
  const heroFullMovie = movies.find((m) => m.title === 'Oppenheimer') || fullMovies[0] || heroMovie;
  const companionTrailers = movies.filter((m) => m.stream_type === 'trailer' || m.trailer_youtube_id);
  const heroTrailerMovie = movies.find((m) => m.title === 'Blade Runner 2049') || companionTrailers[0] || heroMovie;

  const sciFiMovies = movies.filter((m) => m.genres?.some((g) => g.toLowerCase().includes('sci-fi')));
  const actionMovies = movies.filter((m) => m.genres?.some((g) => g.toLowerCase().includes('action') || g.toLowerCase().includes('crime')));
  const dramaMovies = movies.filter((m) => m.genres?.some((g) => g.toLowerCase().includes('drama') || g.toLowerCase().includes('biography')));
  const animeMovies = movies.filter((m) => m.genres?.some((g) => g.toLowerCase().includes('animation')));

  // My List Movies
  const myListMovies = movies.filter((m) => myListIds.includes(m.id));

  return (
    <div className="min-h-screen bg-[#141414] text-white flex flex-col font-sans selection:bg-[#E50914] selection:text-white overflow-x-hidden">
      
      {/* Iconic Netflix "TA-DUM" Intro Animation */}
      {showIntro && <NetflixIntro onComplete={() => setShowIntro(false)} />}

      {/* Pothole Streaming Navbar */}
      <NetflixNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onPlayIntro={() => setShowIntro(true)}
      />

      {/* Auth Modal (Sign In / Register) */}
      <NetflixAuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'studio') {
            setActiveTab('studio');
          }
        }}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {/* VIEW 1: STUDIO DAM & ROYALTIES */}
        {activeTab === 'studio' ? (
          currentUser && (currentUser.role === 'studio' || currentUser.role === 'admin') ? (
            <NetflixStudioView
              movies={movies}
              onMovieAdded={(newMovie) => setMovies((prev) => [newMovie, ...prev])}
              currentUser={currentUser}
            />
          ) : (
            <div className="pt-32 px-4 max-w-md mx-auto text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center mx-auto text-[#E50914]">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white">Studio Partner Access Only</h2>
              <p className="text-xs text-gray-400">
                You must be logged in as an authorized Production Studio or Content Publisher to access asset management and royalty telemetry.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="px-6 py-2.5 rounded bg-[#E50914] hover:bg-[#f6121d] text-white text-xs font-bold transition-all shadow-lg shadow-[#E50914]/30 cursor-pointer"
                >
                  Sign In with Studio Account
                </button>
              </div>
            </div>
          )

        /* VIEW 2: SEARCH QUERY RESULTS (LOCAL VAULT + GLOBAL OMDB) */
        ) : searchQuery.length > 0 ? (
          <div className="pt-24 px-4 sm:px-8 md:px-14 pb-20 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-gray-400">
                Search results for: <span className="text-white">"{searchQuery}"</span>
              </h2>
              {searchingOmdb && (
                <p className="text-xs text-[#E50914] animate-pulse mt-1">
                  Querying global IMDb universe & local vault...
                </p>
              )}
            </div>

            {/* Local Catalog Matches */}
            {searchResults.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Film className="w-4 h-4 text-[#E50914]" />
                  <span>Hosted Master Releases</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  {searchResults.map((movie) => (
                    <div
                      key={movie.id}
                      onClick={() => setSelectedMovieForInfo(movie)}
                      className="relative aspect-[2/3] rounded overflow-hidden cursor-pointer group bg-[#1f1f1f] shadow-lg transition-transform duration-300 hover:scale-105"
                    >
                      <img
                        src={movie.poster_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500'}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                        <p className="text-white font-bold text-xs truncate">{movie.title}</p>
                        <span className="text-[#46d369] font-bold text-[10px]">
                          {movie.stream_type === 'full' ? '★ Full Movie' : '▶ Trailer'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Global OMDb Matches */}
            {omdbSearchResults.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-gray-800">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Global Cinema & IMDb Previews (Instant 4K Trailer)</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  {omdbSearchResults.map((item) => {
                    const validPoster = (item.poster && item.poster !== 'N/A') ? item.poster : 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
                    return (
                      <div
                        key={item.imdbID}
                        onClick={() => {
                          const tempMovie: Movie = {
                            id: item.imdbID,
                            title: item.title,
                            description: `Official IMDb feature film released in ${item.year}.`,
                            genres: ['Cinema', 'Popular'],
                            release_year: parseInt(item.year) || 2024,
                            duration_minutes: 120,
                            rating: 'PG-13',
                            poster_url: validPoster,
                            backdrop_url: validPoster,
                            stream_type: 'trailer',
                            trailer_youtube_id: 'Way9Dexny3w',
                            cast: [],
                            tags: ['IMDb', 'Hollywood']
                          };
                          setSelectedMovieForInfo(tempMovie);
                        }}
                        className="relative aspect-[2/3] rounded overflow-hidden cursor-pointer group bg-[#1f1f1f] shadow-lg transition-transform duration-300 hover:scale-105"
                      >
                        <img
                          src={validPoster}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                          <p className="text-white font-bold text-xs truncate">{item.title}</p>
                          <span className="text-amber-400 font-bold text-[10px]">
                            ★ IMDb {item.year}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {searchResults.length === 0 && omdbSearchResults.length === 0 && !searchingOmdb && (
              <div className="py-20 text-center text-gray-500 text-sm">
                Your search for "{searchQuery}" did not have any matches.
              </div>
            )}
          </div>

        /* VIEW 3: MOVIES TAB (FEATURE FILMS ONLY) */
        ) : activeTab === 'movies' ? (
          <div>
            {/* Billboard for Full Movies */}
            {heroFullMovie && (
              <NetflixHero
                movie={heroFullMovie}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
                isInList={isMovieInMyList(heroFullMovie.id)}
                onToggleList={toggleMyList}
              />
            )}

            <div className="-mt-16 md:-mt-32 relative z-30 space-y-2 md:space-y-4">
              <NetflixRow
                title="All Full-Length Feature Films"
                movies={fullMovies}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
              />

              <NetflixRow
                title="Sci-Fi & Mind-Bending Master Releases"
                movies={fullMovies.filter((m) => m.genres?.some((g) => g.toLowerCase().includes('sci-fi')))}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
              />

              <NetflixRow
                title="Action, Suspense & Crime Feature Films"
                movies={fullMovies.filter((m) => m.genres?.some((g) => g.toLowerCase().includes('action') || g.toLowerCase().includes('crime')))}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
              />

              <NetflixRow
                title="Drama & Award-Winning Masterpieces"
                movies={fullMovies.filter((m) => m.genres?.some((g) => g.toLowerCase().includes('drama') || g.toLowerCase().includes('biography')))}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
              />

              <NetflixRow
                title="Animation & Anime Feature Films"
                movies={fullMovies.filter((m) => m.genres?.some((g) => g.toLowerCase().includes('animation')))}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
              />
            </div>
          </div>

        /* VIEW 4: TRAILERS & TEASERS TAB */
        ) : activeTab === 'tv' ? (
          <div>
            {/* Billboard for Trailers */}
            {heroTrailerMovie && (
              <NetflixHero
                movie={heroTrailerMovie}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
                isInList={isMovieInMyList(heroTrailerMovie.id)}
                onToggleList={toggleMyList}
              />
            )}

            <div className="-mt-16 md:-mt-32 relative z-30 space-y-6 px-4 sm:px-8 md:px-14">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Clapperboard className="w-6 h-6 text-[#E50914]" />
                  Official 4K Trailer & Teaser Vault
                </h2>
                <p className="text-xs text-gray-400 mt-1">
                  Stream companion trailers and upcoming Hollywood releases with 1-click instantaneous playback
                </p>
              </div>

              {/* Responsive Trailer Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {companionTrailers.map((movie) => (
                  <div
                    key={movie.id}
                    className="relative aspect-[2/3] rounded overflow-hidden cursor-pointer group bg-[#1f1f1f] shadow-lg transition-transform duration-300 hover:scale-105"
                    onClick={() => handlePlayMovie(movie)}
                  >
                    <img
                      src={movie.poster_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500'}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
                      }}
                    />

                    {/* Play Badge Overlay */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent p-3 text-left">
                      <p className="text-white font-bold text-xs truncate">{movie.title}</p>
                      <div className="flex items-center justify-between text-[10px] text-gray-400 mt-0.5">
                        <span className="text-amber-400 font-semibold">▶ Trailer</span>
                        <span>{movie.duration_minutes || 2}m</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        /* VIEW 5: MY LIST (BOOKMARKS) */
        ) : activeTab === 'mylist' ? (
          <div className="pt-24 px-4 sm:px-8 md:px-14 pb-20 space-y-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                  My Watchlist
                  <span className="text-xs bg-[#E50914] text-white px-2 py-0.5 rounded-full font-mono">
                    {myListMovies.length}
                  </span>
                </h1>
                <p className="text-gray-400 text-xs mt-1">
                  Your bookmarked master movies and trailers saved to this device
                </p>
              </div>

              {myListMovies.length > 0 && (
                <button
                  onClick={() => {
                    setMyListIds([]);
                    localStorage.removeItem('pothole_mylist');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-xs transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear List</span>
                </button>
              )}
            </div>

            {myListMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {myListMovies.map((movie) => (
                  <div
                    key={movie.id}
                    className="relative aspect-[2/3] rounded overflow-hidden cursor-pointer group bg-[#1f1f1f] shadow-lg transition-transform duration-300 hover:scale-105"
                  >
                    <img
                      src={movie.poster_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500'}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
                      }}
                      onClick={() => setSelectedMovieForInfo(movie)}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-2.5">
                      <p className="text-white font-bold text-xs truncate">{movie.title}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePlayMovie(movie);
                          }}
                          className="flex-1 py-1 rounded bg-[#E50914] text-white text-[11px] font-bold flex items-center justify-center gap-1 hover:bg-[#f6121d]"
                        >
                          <Play className="w-3 h-3 fill-white" />
                          <span>Play</span>
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMyList(movie);
                          }}
                          title="Remove from My List"
                          className="w-7 h-7 rounded bg-white/20 hover:bg-red-600/80 text-white flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty Watchlist State */
              <div className="py-24 text-center space-y-4 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-gray-500">
                  <Film className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">Your List is Empty</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Never lose track of what you want to watch. Add movies and companion trailers to your personal watchlist by clicking the <strong>+ My List</strong> button.
                </p>
                <button
                  onClick={() => setActiveTab('home')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#E50914] hover:bg-[#f6121d] text-white text-xs font-bold transition-all shadow-lg shadow-[#E50914]/30 cursor-pointer"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        /* VIEW 6: DEFAULT NETFLIX HOME BROWSE */
        ) : (
          <div>
            {/* Giant Hero Billboard */}
            {heroMovie && (
              <NetflixHero
                movie={heroMovie}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
                isInList={isMovieInMyList(heroMovie.id)}
                onToggleList={toggleMyList}
              />
            )}

            {/* Overlapping Netflix Rows Container */}
            <div className="-mt-16 md:-mt-32 relative z-30 space-y-2 md:space-y-4">
              <NetflixRow
                title="Trending Master Releases (Full Movies)"
                movies={fullMovies}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
              />

              <NetflixRow
                title="Critically Acclaimed Sci-Fi & Mind-Bending"
                movies={sciFiMovies}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
              />

              <NetflixRow
                title="High-Adrenaline Action & Crime Thrillers"
                movies={actionMovies}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
              />

              <NetflixRow
                title="Psychological Drama & Modern Classics"
                movies={dramaMovies}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
              />

              <NetflixRow
                title="Anime & Animation Masterpieces"
                movies={animeMovies}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
              />

              <NetflixRow
                title="Upcoming & Companion Trailer Spotlight"
                movies={companionTrailers}
                onPlay={(m) => handlePlayMovie(m)}
                onMoreInfo={(m) => setSelectedMovieForInfo(m)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Netflix QuickView Details Modal */}
      {selectedMovieForInfo && (
        <NetflixDetailModal
          movie={selectedMovieForInfo}
          onClose={() => setSelectedMovieForInfo(null)}
          onPlay={(m) => handlePlayMovie(m)}
          isInList={isMovieInMyList(selectedMovieForInfo.id)}
          onToggleList={toggleMyList}
          currentUser={currentUser}
        />
      )}

      {/* Fullscreen Video / Trailer Player */}
      {selectedMovieForPlay && (
        <NetflixPlayer
          movie={selectedMovieForPlay}
          onClose={() => setSelectedMovieForPlay(null)}
          onPlayRecommended={(rec) => {
            handlePlayMovie(rec);
          }}
        />
      )}

      {/* Netflix Footer */}
      <footer className="mt-20 border-t border-gray-800/60 py-12 px-4 sm:px-8 md:px-14 text-gray-500 text-xs space-y-6">
        <div className="flex items-center gap-2">
          <span className="text-[#E50914] font-black text-lg">POTHOLE</span>
          <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400">
            Original Streaming Platform
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl">
          <span className="hover:underline cursor-pointer">Audio Description</span>
          <span className="hover:underline cursor-pointer">Help Center</span>
          <span className="hover:underline cursor-pointer">Gift Cards</span>
          <span className="hover:underline cursor-pointer">Media Center</span>
          <span className="hover:underline cursor-pointer">Investor Relations</span>
          <span className="hover:underline cursor-pointer">Jobs</span>
          <span className="hover:underline cursor-pointer">Terms of Use</span>
          <span className="hover:underline cursor-pointer">Privacy</span>
          <span className="hover:underline cursor-pointer">Legal Notices</span>
          <span className="hover:underline cursor-pointer">Corporate Information</span>
          <span className="hover:underline cursor-pointer">Contact Us</span>
          <span className="hover:underline cursor-pointer">Royalty Settlement Engine</span>
        </div>
        <p className="text-[11px] text-gray-600">
          © 2026 POTHOLE Streaming, Inc. Single-File Byte-Range Delivery & Real-Time Micro-Royalty Settlement.
        </p>
      </footer>

    </div>
  );
}

export default App;
