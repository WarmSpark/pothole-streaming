import React, { useState, useEffect, useRef } from 'react';
import { api } from '../api';
import type { Movie } from '../api';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Radio,
  CheckCircle2,
  Film,
  Sparkles,
  Info
} from 'lucide-react';

interface NetflixPlayerProps {
  movie: Movie | null;
  onClose: () => void;
  onPlayRecommended?: (movie: Movie) => void;
}

export const NetflixPlayer: React.FC<NetflixPlayerProps> = ({
  movie,
  onClose,
  onPlayRecommended,
}) => {
  if (!movie) return null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [sessionPayout, setSessionPayout] = useState(0);
  const [pingsSent, setPingsSent] = useState(0);
  const [lastPingTime, setLastPingTime] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);

  const controlsTimeoutRef = useRef<number | null>(null);

  // Fetch real content-based recommendations from Python backend for this movie
  useEffect(() => {
    if (movie.id) {
      api.getRecommendations(movie.id)
        .then((recs) => setRecommendations(recs))
        .catch(() => {});
    }
  }, [movie.id]);

  // Track HTML5 video duration
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

  // 10s Real-Time Royalty Telemetry Heartbeat (Only for full master movies)
  useEffect(() => {
    if (!isPlaying || movie.stream_type === 'trailer') return;

    const token = localStorage.getItem('pothole_token');

    const interval = setInterval(async () => {
      try {
        const res = await api.sendHeartbeat(movie.id, 10, '1080p', 'IN', token);
        setPingsSent((prev) => prev + 1);
        setSessionPayout((prev) => prev + res.accrued_amount);
        setLastPingTime(new Date().toLocaleTimeString());
      } catch {
        // Fallback silently if offline
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isPlaying, movie.id, movie.stream_type]);

  // Auto-hide controls
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 4000);
  };

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

  const skipTime = (delta: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + delta));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const isTrailer = movie.stream_type === 'trailer' || !movie.video_url;

  return (
    <div
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-[100] bg-black flex flex-col justify-between select-none overflow-hidden"
    >
      {/* Top Header Bar */}
      <div
        className={`absolute top-0 left-0 right-0 z-30 p-6 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
            title="Back to Browse"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <span>{movie.title}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded tracking-wider uppercase ${
                  isTrailer ? 'bg-amber-500 text-black' : 'bg-[#E50914] text-white'
                }`}
              >
                {isTrailer ? 'OFFICIAL TRAILER (4K)' : 'FULL STREAM (1080p)'}
              </span>
            </h1>
            <p className="text-gray-400 text-xs">
              {movie.release_year} • {movie.director ? `Directed by ${movie.director} • ` : ''}
              {movie.duration_minutes}m • {movie.rating || 'PG-13'}
            </p>
          </div>
        </div>
      </div>

      {/* Center Video Viewport */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center bg-black">
        {isTrailer ? (
          /* Official YouTube Trailer IFrame */
          <div className="w-full h-full">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${movie.trailer_youtube_id || 'EXeTwQWrcwY'}?autoplay=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&enablejsapi=1`}
              title={movie.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        ) : (
          /* HTML5 Video Element for Master Stream */
          <video
            ref={videoRef}
            src={movie.video_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
            className="w-full h-full object-contain cursor-pointer"
            autoPlay
            playsInline
            muted={isMuted}
            onClick={togglePlay}
          />
        )}
      </div>

      {/* Bottom Controls Bar (For Master Videos) */}
      {!isTrailer && (
        <div
          className={`absolute bottom-0 left-0 right-0 z-30 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-300 space-y-3 ${
            showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Progress Bar Scrubber */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-gray-400">{formatTime(currentTime)}</span>
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                if (videoRef.current) videoRef.current.currentTime = pos * duration;
              }}
              className="relative flex-1 h-1.5 bg-gray-700/80 rounded-full cursor-pointer group/bar"
            >
              <div
                className="h-full bg-[#E50914] rounded-full relative"
                style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity shadow-md" />
              </div>
            </div>
            <span className="text-xs font-mono text-gray-400">{formatTime(duration)}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 fill-white" />}
              </button>

              <button
                onClick={() => skipTime(-10)}
                className="hover:text-gray-300 text-white transition-colors cursor-pointer"
                title="Rewind 10s"
              >
                <RotateCcw className="w-5 h-5" />
              </button>

              <button
                onClick={() => skipTime(10)}
                className="hover:text-gray-300 text-white transition-colors cursor-pointer"
                title="Forward 10s"
              >
                <RotateCw className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-gray-300 text-white transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold px-2 py-0.5 rounded border border-gray-600 text-gray-300 uppercase">
                4K Ultra HD • Dolby Atmos
              </span>
              <button
                onClick={() => {
                  if (document.fullscreenElement) {
                    document.exitFullscreen().catch(() => {});
                  } else {
                    document.documentElement.requestFullscreen().catch(() => {});
                  }
                }}
                className="hover:text-gray-300 text-white transition-colors cursor-pointer"
                title="Fullscreen"
              >
                <Maximize2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Recommendation Overlay (When paused or near end) */}
      {!isPlaying && recommendations.length > 0 && (
        <div className="absolute inset-0 z-20 bg-black/75 backdrop-blur-sm flex flex-col justify-center items-center p-6 animate-in fade-in duration-300">
          <div className="max-w-4xl w-full text-center space-y-4">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-[#E50914]" />
              <span>More Like This (Content-Based AI Recommendations)</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-2">
              {recommendations.slice(0, 6).map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => {
                    if (onPlayRecommended) onPlayRecommended(rec);
                  }}
                  className="relative aspect-[2/3] rounded overflow-hidden cursor-pointer group bg-[#1f1f1f] shadow-lg transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={rec.poster_url || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500'}
                    alt={rec.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-transparent flex flex-col justify-end p-2 text-left">
                    <p className="text-white font-bold text-xs truncate">{rec.title}</p>
                    <span className="text-amber-400 font-semibold text-[10px]">
                      {rec.stream_type === 'full' ? '★ Full Movie' : '▶ Trailer'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={togglePlay}
              className="mt-4 px-6 py-2 bg-white text-black font-bold text-sm rounded hover:bg-white/80 transition-all cursor-pointer"
            >
              Resume Playback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
