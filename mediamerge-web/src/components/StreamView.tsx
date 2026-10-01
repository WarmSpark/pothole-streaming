import React, { useState } from 'react';
import type { MediaAsset } from '../types';
import { 
  Play, 
  Info, 
  ShieldCheck, 
  Sparkles, 
  Sliders, 
  Volume2, 
  VolumeX, 
  Film,
  Layers,
  Globe2
} from 'lucide-react';

interface StreamViewProps {
  assets: MediaAsset[];
  searchQuery: string;
  onPlayAsset: (asset: MediaAsset) => void;
  onInspectAsset: (asset: MediaAsset) => void;
}

export const StreamView: React.FC<StreamViewProps> = ({
  assets,
  searchQuery,
  onPlayAsset,
  onInspectAsset
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const featured = assets[0];

  const filteredAssets = assets.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.genres.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
    a.technicalSpecs.videoCodec.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.licensor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-16">
      
      {/* Hero Billboard Banner */}
      {!searchQuery && featured && (
        <div className="relative w-full h-[68vh] min-h-[460px] max-h-[640px] rounded-2xl overflow-hidden border border-gray-800/80 shadow-2xl">
          {/* Background image & gradient overlay */}
          <img 
            src={featured.heroBanner} 
            alt={featured.title} 
            className="w-full h-full object-cover object-center filter brightness-[0.75]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C111B] via-[#0C111B]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C111B] via-[#0C111B]/60 to-transparent w-full md:w-3/4" />

          {/* Banner Content */}
          <div className="absolute bottom-10 left-6 md:left-12 right-6 max-w-2xl space-y-4">
            
            {/* Metadata badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                {featured.matchScore}% Match
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white text-xs font-semibold backdrop-blur-md">
                {featured.rating}
              </span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white text-xs font-semibold backdrop-blur-md">
                {featured.duration}
              </span>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#1f80e0]/20 text-[#1f80e0] text-xs font-bold border border-[#1f80e0]/40">
                <ShieldCheck className="w-3.5 h-3.5" />
                {featured.drmScheme}
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                {featured.technicalSpecs.resolution}
              </span>
            </div>

            {/* Title & Description */}
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
              {featured.title}
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-3">
              {featured.description}
            </p>

            {/* Licensor and territory note */}
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-[#1f80e0]" />
                {featured.licensor}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                {featured.rights.territories[0]}
              </span>
            </div>

            {/* Action CTAs */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onPlayAsset(featured)}
                className="flex items-center gap-2 bg-[#1f80e0] hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-[#1f80e0]/30 hover:scale-105 active:scale-95"
              >
                <Play className="w-5 h-5 fill-white" />
                Stream with DRM
              </button>

              <button
                onClick={() => onInspectAsset(featured)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md px-5 py-3 rounded-xl font-bold text-sm transition-all border border-white/10"
              >
                <Info className="w-4 h-4" />
                Specs & Ladder
              </button>

              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-colors border border-white/10 ml-auto"
                title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Row 1: AI Personalized Recommendations */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#1f80e0]" />
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Recommended For You
            </h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#1f80e0]/15 text-[#1f80e0] font-semibold border border-[#1f80e0]/30">
              Vector Cosine: 0.984
            </span>
          </div>
          <span className="text-xs text-gray-500 hidden sm:inline">
            Trained on watch completion & preference vectors
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filteredAssets.map((asset) => (
            <div
              key={asset.id}
              className="group bg-[#192133] rounded-xl overflow-hidden border border-gray-800/80 shadow-lg card-hover flex flex-col cursor-pointer"
              onClick={() => onPlayAsset(asset)}
            >
              {/* Poster Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
                <img 
                  src={asset.thumbnail} 
                  alt={asset.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Match score badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[10px] font-black text-emerald-400 bg-black/70 backdrop-blur-md border border-emerald-500/30">
                  {asset.matchScore}% Match
                </div>

                {/* DRM Badge */}
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-black text-[#1f80e0] bg-black/70 backdrop-blur-md border border-[#1f80e0]/40 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {asset.drmProtected ? 'DRM' : 'CLEAR'}
                </div>

                {/* Hover Play Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#1f80e0] text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Card Meta */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-gray-400 mb-1">
                    <span>{asset.year} • {asset.duration}</span>
                    <span className="text-gray-300 font-semibold">{asset.rating}</span>
                  </div>
                  <h3 className="font-bold text-white text-sm line-clamp-1 group-hover:text-[#1f80e0] transition-colors">
                    {asset.title}
                  </h3>
                </div>

                <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-[11px] text-gray-400">
                  <span className="text-purple-400 font-mono truncate max-w-[120px]">
                    {asset.technicalSpecs.videoCodec.split('/')[0]}
                  </span>
                  <span className="text-gray-500 text-[10px]">
                    {asset.renditions.length} Bitrates
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Row 2: Studio Mezzanine Pipeline & High-Bitrate Catalog */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Master Mezzanine Vault (4K ProRes & HDR)
            </h2>
          </div>
          <span className="text-xs text-gray-500">
            Archival Master Files with Multi-Bitrate HLS Slices
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAssets.slice(0, 2).map((asset) => (
            <div 
              key={`mezz-${asset.id}`}
              className="bg-[#192133] rounded-xl p-5 border border-gray-800 flex flex-col sm:flex-row gap-5 hover:border-gray-700 transition-colors"
            >
              <img 
                src={asset.thumbnail} 
                alt={asset.title} 
                className="w-full sm:w-36 h-28 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-white text-base">{asset.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-[#1f80e0] font-mono font-bold">
                      {asset.technicalSpecs.masterBitrate}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    Master Container: {asset.technicalSpecs.container} • Audio: {asset.technicalSpecs.audioCodec}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => onPlayAsset(asset)}
                    className="text-xs font-bold text-[#1f80e0] hover:underline flex items-center gap-1"
                  >
                    Launch Stream
                  </button>
                  <span className="text-gray-700">•</span>
                  <button
                    onClick={() => onInspectAsset(asset)}
                    className="text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1"
                  >
                    <Sliders className="w-3 h-3" />
                    Inspect ABR Ladder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
