import React, { useEffect, useState, useRef } from 'react';

interface NetflixIntroProps {
  onComplete: () => void;
}

export const NetflixIntro: React.FC<NetflixIntroProps> = ({ onComplete }) => {
  const [fadingOut, setFadingOut] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Synthesize the Iconic Netflix "TA-DUM" Sound via Web Audio API
  const playTaDumSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const now = ctx.currentTime;

      // 1. The Deep Heavy Cello Strike (Sub-Bass)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(80, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 1.2);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 1.2);

      subGain.gain.setValueAtTime(0.75, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      subOsc.connect(filter);
      filter.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(now);
      subOsc.stop(now + 1.9);

      // 2. The Mid Thump (Cello Body)
      const midOsc = ctx.createOscillator();
      const midGain = ctx.createGain();
      midOsc.type = 'triangle';
      midOsc.frequency.setValueAtTime(140, now);
      midOsc.frequency.exponentialRampToValueAtTime(80, now + 0.9);

      midGain.gain.setValueAtTime(0.55, now);
      midGain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      midOsc.connect(midGain);
      midGain.connect(ctx.destination);

      midOsc.start(now);
      midOsc.stop(now + 1.4);

      // 3. The Iconic Shimmering Metallic Chime (Swells at +0.32s)
      const chimeFrequencies = [523.25, 659.25, 783.99, 1046.5];
      chimeFrequencies.forEach((freq, idx) => {
        const chimeOsc = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(freq, now + 0.32);

        chimeGain.gain.setValueAtTime(0.0001, now);
        chimeGain.gain.setValueAtTime(0.2 / (idx + 1), now + 0.32);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(ctx.destination);

        chimeOsc.start(now + 0.32);
        chimeOsc.stop(now + 2.6);
      });
    } catch {
      // Audio autoplay policy fallback
    }
  };

  useEffect(() => {
    playTaDumSound();

    const fadeTimer = setTimeout(() => {
      setFadingOut(true);
    }, 2400);

    const endTimer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, [onComplete]);

  return (
    <div
      onClick={playTaDumSound}
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <style>{`
        @keyframes purePotholeZoom {
          0% {
            transform: scale(0.65);
            opacity: 0;
            filter: drop-shadow(0 0 10px rgba(229,9,20,0.3));
          }
          15% {
            transform: scale(1.0);
            opacity: 1;
            filter: drop-shadow(0 0 45px rgba(229,9,20,0.95)) brightness(1.15);
          }
          55% {
            transform: scale(1.15);
            opacity: 1;
            filter: drop-shadow(0 0 75px rgba(229,9,20,1)) brightness(1.35);
          }
          80% {
            transform: scale(2.4);
            opacity: 0.95;
            filter: drop-shadow(0 0 110px rgba(229,9,20,1)) brightness(1.7);
          }
          100% {
            transform: scale(5.0);
            opacity: 0;
            filter: blur(14px) brightness(2.2);
          }
        }

        @keyframes purePrismBeams {
          0% {
            transform: perspective(600px) translateZ(-200px) scale(0.5);
            opacity: 0;
          }
          35% {
            transform: perspective(600px) translateZ(0px) scale(0.9);
            opacity: 0.35;
          }
          65% {
            transform: perspective(600px) translateZ(250px) scale(1.9);
            opacity: 0.95;
          }
          100% {
            transform: perspective(600px) translateZ(600px) scale(4.0);
            opacity: 0;
          }
        }

        .netflix-pothole-wordmark {
          animation: purePotholeZoom 2.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          will-change: transform, opacity, filter;
        }

        .netflix-pure-beams {
          animation: purePrismBeams 2.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          will-change: transform, opacity;
        }
      `}</style>

      {/* Deep Vignette */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/60 to-black pointer-events-none" />

      {/* Center Intro Container */}
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Luminous Chromatic Prismatic Light Ribbons (Flying toward camera) */}
        <div className="absolute flex justify-center items-center gap-2 sm:gap-4 pointer-events-none netflix-pure-beams">
          <div className="h-[120vh] w-3.5 bg-gradient-to-t from-transparent via-[#E50914] to-transparent blur-[2px]" />
          <div className="h-[120vh] w-2.5 bg-gradient-to-t from-transparent via-[#ff3b45] to-transparent blur-[1px]" />
          <div className="h-[120vh] w-4 bg-gradient-to-t from-transparent via-[#ff0055] to-transparent blur-[3px]" />
          <div className="h-[120vh] w-6 bg-gradient-to-t from-transparent via-[#E50914] to-transparent blur-[4px] shadow-[0_0_50px_#E50914]" />
          <div className="h-[120vh] w-2.5 bg-gradient-to-t from-transparent via-[#00e1ff] to-transparent blur-[2px]" />
          <div className="h-[120vh] w-3.5 bg-gradient-to-t from-transparent via-[#a855f7] to-transparent blur-[2px]" />
          <div className="h-[120vh] w-5 bg-gradient-to-t from-transparent via-[#E50914] to-transparent blur-[3px]" />
          <div className="h-[120vh] w-2.5 bg-gradient-to-t from-transparent via-[#f59e0b] to-transparent blur-[2px]" />
          <div className="h-[120vh] w-4 bg-gradient-to-t from-transparent via-[#e11d48] to-transparent blur-[3px]" />
        </div>

        {/* The Clean Red "POTHOLE" Wordmark Coming Closer */}
        <div className="relative flex flex-col items-center select-none netflix-pothole-wordmark">
          <h1 className="text-[#E50914] text-6xl sm:text-8xl md:text-9xl font-black tracking-[-0.06em] uppercase filter drop-shadow-[0_0_40px_rgba(229,9,20,0.9)] font-sans">
            POTHOLE
          </h1>
        </div>
      </div>

      {/* Skip Intro Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        className="absolute bottom-8 right-8 z-30 px-4 py-1.5 rounded-full border border-white/20 bg-black/40 text-gray-300 text-xs font-medium hover:text-white hover:border-white/60 transition-all backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
      >
        Skip Intro ➔
      </button>
    </div>
  );
};
