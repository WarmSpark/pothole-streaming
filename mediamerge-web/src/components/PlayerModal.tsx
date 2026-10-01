import React, { useState, useEffect, useRef } from 'react';
import type { MediaAsset } from '../types';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Sliders, 
  Activity, 
  KeyRound, 
  Maximize2,
  Lock,
  Radio,
  CheckCircle2
} from 'lucide-react';

interface PlayerModalProps {
  asset: MediaAsset | null;
  onClose: () => void;
  onRecordRoyalty: (asset: MediaAsset, seconds: number) => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({
  asset,
  onClose,
  onRecordRoyalty
}) => {
  if (!asset) return null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedQuality, setSelectedQuality] = useState('Auto');
  const [showDrmHud, setShowDrmHud] = useState(true);
  const [heartbeatCount, setHeartbeatCount] = useState(0);
  const [sessionPayout, setSessionPayout] = useState(0);
  const [lastPingTime, setLastPingTime] = useState('Initializing...');

  // Track playback time and simulate 10-second Royalty Telemetry heartbeats
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration || 100);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);

  // 10-second Royalty Heartbeat loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setHeartbeatCount(prev => prev + 1);
      const earned = (10 / 60) * asset.royalties.ratePerMinute;
      setSessionPayout(prev => prev + earned);
      const now = new Date().toLocaleTimeString();
      setLastPingTime(now);
      onRecordRoyalty(asset, 10);
    }, 10000);

    return () => clearInterval(interval);
  }, [isPlaying, asset, onRecordRoyalty]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 md:p-6 animate-in fade-in duration-200">
      
      {/* Container */}
      <div className="relative w-full max-w-6xl bg-[#090b10] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800/80 bg-[#0C111B]/90">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-white font-bold text-base md:text-lg truncate max-w-md">
              {asset.title}
            </h2>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-[#1f80e0]/20 text-[#1f80e0] border border-[#1f80e0]/30">
              {asset.drmScheme}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDrmHud(!showDrmHud)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                showDrmHud ? 'bg-[#1f80e0] text-white' : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>DRM & Ledger HUD</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Canvas & Overlays */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[440px]">
          
          <video
            ref={videoRef}
            src={asset.videoUrl}
            autoPlay
            playsInline
            className="w-full h-full object-contain max-h-[60vh]"
            onClick={togglePlay}
          />

          {/* DRM & Live Telemetry HUD Overlay */}
          {showDrmHud && (
            <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur-md rounded-xl p-3.5 border border-gray-800 text-xs text-gray-300 max-w-sm space-y-2.5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-800 pb-2">
                <span className="font-bold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#1f80e0]" />
                  MPEG-CENC Decryption Status
                </span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  AUTHENTICATED
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div>
                  <span className="text-gray-500 block">KID (Key ID):</span>
                  <span className="font-mono text-gray-200">e4b9...82f1</span>
                </div>
                <div>
                  <span className="text-gray-500 block">Current Ladder:</span>
                  <span className="font-mono text-[#1f80e0] font-bold">{selectedQuality}</span>
                </div>
              </div>

              {/* Real-time watch heartbeat for royalties */}
              <div className="bg-[#10141f] rounded-lg p-2.5 border border-gray-800/80 space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1.5 text-gray-300 font-semibold">
                    <Radio className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                    Royalty Heartbeat (10s Ping)
                  </span>
                  <span className="text-amber-400 font-mono font-bold">
                    +${sessionPayout.toFixed(4)}
                  </span>
                </div>
                <div className="text-[10px] text-gray-500">
                  Last Ledger Sync: {lastPingTime} • {heartbeatCount} pings sent
                </div>
              </div>
            </div>
          )}

          {/* Quick Play/Pause Center Indicator when clicked */}
          <button 
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-transparent group focus:outline-none"
          >
            {!isPlaying && (
              <div className="w-16 h-16 rounded-full bg-[#1f80e0]/90 text-white flex items-center justify-center shadow-2xl scale-100 animate-in zoom-in-50 duration-150">
                <Play className="w-8 h-8 fill-white ml-1" />
              </div>
            )}
          </button>
        </div>

        {/* Video Controls Toolbar */}
        <div className="p-4 bg-[#0C111B] border-t border-gray-800 space-y-3">
          
          {/* Progress / Scrub Bar */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-400 w-12 text-right">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeek}
              className="flex-1 h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#1f80e0] focus:outline-none"
            />
            <span className="text-xs font-mono text-gray-500 w-12">
              {formatTime(duration)}
            </span>
          </div>

          {/* Button Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
              </button>

              <button
                onClick={toggleMute}
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              {/* Quality Ladder Switcher */}
              <div className="flex items-center gap-1.5 pl-2 border-l border-gray-800 text-xs">
                <Sliders className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-gray-400 text-[11px] hidden sm:inline">Rendition:</span>
                <select
                  value={selectedQuality}
                  onChange={(e) => setSelectedQuality(e.target.value)}
                  className="bg-[#192133] border border-gray-700 text-white rounded-md px-2 py-1 text-xs focus:outline-none focus:border-[#1f80e0]"
                >
                  <option value="Auto">Auto (Adaptive ABR)</option>
                  {asset.renditions.map((r, i) => (
                    <option key={i} value={r.resolution}>
                      {r.resolution} ({r.bitrate})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400 hidden md:inline">
                Licensor: <strong className="text-gray-200">{asset.licensor}</strong>
              </span>

              <button
                onClick={() => {
                  if (videoRef.current) {
                    if (videoRef.current.requestFullscreen) videoRef.current.requestFullscreen();
                  }
                }}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
