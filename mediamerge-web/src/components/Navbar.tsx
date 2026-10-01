import React from 'react';
import type { ActiveTab } from '../types';
import { 
  PlaySquare, 
  FolderArchive, 
  Scale, 
  Receipt, 
  ShieldCheck, 
  Search, 
  Sparkles,
  Tv
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#090b10]/95 backdrop-blur-md border-b border-gray-800/60 px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand / Logo (Pothole Styling) */}
        <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-start">
          <div 
            onClick={() => setActiveTab('stream')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#1f80e0] to-[#E50914] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Tv className="w-5 h-5 text-white" />
            </div>
            <div className="font-black text-2xl tracking-tighter">
              <span className="text-[#1f80e0]">Media</span>
              <span className="text-[#E50914]">Merge</span>
            </div>
          </div>

          {/* Quick Plan Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1f80e0]/15 border border-[#1f80e0]/30 text-xs font-semibold text-[#1f80e0]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Widevine L1</span>
            <span>4K HDR</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto w-full md:w-auto py-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('stream')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'stream'
                ? 'bg-[#1f80e0] text-white shadow-md shadow-[#1f80e0]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <PlaySquare className="w-4 h-4" />
            Stream
          </button>

          <button
            onClick={() => setActiveTab('dam')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'dam'
                ? 'bg-[#1f80e0] text-white shadow-md shadow-[#1f80e0]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FolderArchive className="w-4 h-4" />
            DAM Studio
          </button>

          <button
            onClick={() => setActiveTab('rights')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'rights'
                ? 'bg-[#1f80e0] text-white shadow-md shadow-[#1f80e0]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Scale className="w-4 h-4" />
            Rights Matrix
          </button>

          <button
            onClick={() => setActiveTab('royalties')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'royalties'
                ? 'bg-[#1f80e0] text-white shadow-md shadow-[#1f80e0]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Receipt className="w-4 h-4" />
            Royalty Ledger
          </button>

          <button
            onClick={() => setActiveTab('subscriptions')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === 'subscriptions'
                ? 'bg-[#E50914] text-white shadow-md shadow-[#E50914]/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            Plans
          </button>
        </nav>

        {/* Search Bar & User Status */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search catalog, codecs, rights..."
              className="w-full bg-[#192133]/80 border border-gray-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#1f80e0] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-gray-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center font-bold text-xs text-white shadow-md">
              DS
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
