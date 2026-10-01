import React, { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown, Layers, X, LogIn, LogOut, Play, Sparkles } from 'lucide-react';
import type { User } from '../api';

interface NetflixNavbarProps {
  activeTab: 'home' | 'tv' | 'movies' | 'mylist' | 'studio';
  setActiveTab: (tab: 'home' | 'tv' | 'movies' | 'mylist' | 'studio') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentUser: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onPlayIntro: () => void;
}

export const NetflixNavbar: React.FC<NetflixNavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  currentUser,
  onOpenAuth,
  onLogout,
  onPlayIntro,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-colors duration-500 flex items-center justify-between px-4 sm:px-8 md:px-14 h-16 md:h-18 ${
        isScrolled
          ? 'bg-[#141414] shadow-md shadow-black/80'
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
      }`}
    >
      {/* Left: Pothole Logo & Nav Links */}
      <div className="flex items-center gap-6 md:gap-10">
        
        {/* The Iconic POTHOLE Wordmark */}
        <div
          onClick={() => setActiveTab('home')}
          className="cursor-pointer flex items-center gap-1.5 select-none group"
        >
          <span className="text-[#E50914] font-black text-2xl sm:text-3xl tracking-[-0.06em] drop-shadow-[0_2px_10px_rgba(229,9,20,0.4)] transition-transform group-hover:scale-105">
            POTHOLE
          </span>
          <span className="text-[10px] text-gray-400 font-mono tracking-widest pl-1 border-l border-gray-700 uppercase hidden lg:inline">
            STREAMING
          </span>
        </div>

        {/* Primary Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-normal text-[#e5e5e5]">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors hover:text-[#b3b3b3] ${
              activeTab === 'home' ? 'font-bold text-white' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setActiveTab('movies')}
            className={`transition-colors hover:text-[#b3b3b3] ${
              activeTab === 'movies' ? 'font-bold text-white' : ''
            }`}
          >
            Movies
          </button>
          <button
            onClick={() => setActiveTab('tv')}
            className={`transition-colors hover:text-[#b3b3b3] ${
              activeTab === 'tv' ? 'font-bold text-white' : ''
            }`}
          >
            Trailers
          </button>
          <button
            onClick={() => setActiveTab('mylist')}
            className={`transition-colors hover:text-[#b3b3b3] ${
              activeTab === 'mylist' ? 'font-bold text-white' : ''
            }`}
          >
            My List
          </button>

          {/* Studio DAM & Royalty Ledger Tab (Studio / Admin Only) */}
          {currentUser && (currentUser.role === 'studio' || currentUser.role === 'admin') && (
            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                activeTab === 'studio'
                  ? 'bg-[#E50914] text-white shadow-lg shadow-[#E50914]/40 font-bold'
                  : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20 border border-white/10'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Studio Portal & Royalties</span>
            </button>
          )}
        </nav>
      </div>

      {/* Right: Search, Intro Replay, Profile */}
      <div className="flex items-center gap-3 sm:gap-5 text-white text-sm">
        
        {/* Replay Intro Sound Button */}
        <button
          onClick={onPlayIntro}
          title="Play Netflix 'Ta-Dum' Intro Animation"
          className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-xs text-gray-300 hover:text-[#E50914] transition-all"
        >
          <Sparkles className="w-3 h-3 text-[#E50914]" />
          <span>Ta-dum Intro</span>
        </button>

        {/* Search Bar */}
        <div className="flex items-center">
          {isSearchOpen ? (
            <div className="flex items-center bg-black/90 border border-white/80 px-2.5 py-1 rounded transition-all w-44 sm:w-60 animate-in fade-in duration-200">
              <Search className="w-4 h-4 text-white mr-2 shrink-0 cursor-pointer" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Titles, directors, actors..."
                className="bg-transparent text-xs text-white placeholder-gray-400 focus:outline-none w-full"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-1 hover:text-gray-300 transition-colors"
              title="Search Catalog"
            >
              <Search className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Notifications Bell */}
        <div className="relative cursor-pointer hover:text-gray-300 transition-colors hidden sm:block">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E50914] rounded-full animate-pulse" />
        </div>

        {/* User Authentication Status */}
        {currentUser ? (
          <div className="relative">
            <div
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded bg-[#E50914] flex items-center justify-center font-bold text-white text-xs shadow-md border border-transparent group-hover:border-white transition-all">
                {currentUser.full_name
                  ? currentUser.full_name.charAt(0).toUpperCase()
                  : currentUser.email.charAt(0).toUpperCase()}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-white transition-transform group-hover:rotate-180" />
            </div>

            {/* Profile Dropdown Menu */}
            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#181818] border border-white/10 rounded shadow-2xl py-2 text-xs text-gray-300 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-4 py-2 border-b border-white/10">
                  <p className="text-white font-bold truncate">{currentUser.full_name || 'Pothole Member'}</p>
                  <p className="text-gray-400 text-[11px] truncate">{currentUser.email}</p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/30 uppercase">
                    {currentUser.role}
                  </span>
                </div>

                {currentUser.role === 'studio' || currentUser.role === 'admin' ? (
                  <button
                    onClick={() => {
                      setActiveTab('studio');
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-white/10 hover:text-white flex items-center gap-2"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#E50914]" />
                    <span>Studio DAM & Royalties</span>
                  </button>
                ) : null}

                <button
                  onClick={() => {
                    onLogout();
                    setIsProfileOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-white/10 text-red-400 hover:text-red-300 flex items-center gap-2 border-t border-white/10 mt-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign out of Pothole</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#E50914] hover:bg-[#f6121d] text-white text-xs font-bold transition-all shadow-md shadow-[#E50914]/30"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}

      </div>
    </header>
  );
};
