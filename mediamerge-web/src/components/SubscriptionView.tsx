import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Tv, 
  Smartphone, 
  Laptop, 
  Check, 
  X, 
  AlertCircle,
  Activity,
  Layers
} from 'lucide-react';

export const SubscriptionView: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<'standard' | 'premium'>('premium');
  const [activeSessions, setActiveSessions] = useState([
    { id: 'dev-1', device: 'Living Room LG OLED 4K (Apple TV)', ip: '49.36.182.10', time: 'Streaming for 38 mins', res: '4K UHD HDR' },
    { id: 'dev-2', device: 'Divyansh Laptop (Chrome on Linux)', ip: '49.36.182.10', time: 'Streaming for 14 mins', res: '1080p FHD' }
  ]);

  const killSession = (id: string) => {
    setActiveSessions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#E50914]" />
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Subscriptions & Entitlements
            </h1>
          </div>
          <p className="text-gray-400 text-xs md:text-sm mt-1">
            Subscription Tier Paywalls, Hardware DRM Licensing & Redis-Backed Concurrent Stream Limiter
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#E50914]/15 border border-[#E50914]/30 text-xs font-semibold text-[#E50914]">
          <ShieldCheck className="w-4 h-4" />
          <span>Active Plan: Premium 4K UHD</span>
        </div>
      </div>

      {/* Pricing Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tier 1: Basic */}
        <div className="bg-[#192133] rounded-2xl p-6 border border-gray-800 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ad-Supported</div>
            <h3 className="text-2xl font-bold text-white">Basic</h3>
            <div className="text-3xl font-black text-white font-mono">
              $6.99<span className="text-xs font-normal text-gray-400">/mo</span>
            </div>
            <p className="text-xs text-gray-400">For casual viewers on mobile screens.</p>

            <ul className="space-y-2.5 text-xs text-gray-300 pt-4 border-t border-gray-800">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Max 720p HD resolution</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1 concurrent device stream</span>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <X className="w-4 h-4 text-gray-600 shrink-0" />
                <span>No Widevine L1 4K decryption</span>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <X className="w-4 h-4 text-gray-600 shrink-0" />
                <span>Stereo 2.0 audio only</span>
              </li>
            </ul>
          </div>

          <button 
            onClick={() => setSelectedPlan('standard')}
            className="w-full py-2.5 rounded-xl border border-gray-700 hover:border-gray-500 text-white font-bold text-xs transition-colors"
          >
            Switch to Basic
          </button>
        </div>

        {/* Tier 2: Standard */}
        <div className={`bg-[#192133] rounded-2xl p-6 border flex flex-col justify-between space-y-6 transition-all ${
          selectedPlan === 'standard' ? 'border-[#1f80e0] glow-blue' : 'border-gray-800'
        }`}>
          <div className="space-y-3">
            <div className="text-xs font-bold text-[#1f80e0] uppercase tracking-wider">Full HD Standard</div>
            <h3 className="text-2xl font-bold text-white">Standard</h3>
            <div className="text-3xl font-black text-white font-mono">
              $12.99<span className="text-xs font-normal text-gray-400">/mo</span>
            </div>
            <p className="text-xs text-gray-400">Crystal clear 1080p streaming for couples.</p>

            <ul className="space-y-2.5 text-xs text-gray-300 pt-4 border-t border-gray-800">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1080p Full HD resolution</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>2 concurrent device streams</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>5.1 Surround Sound</span>
              </li>
              <li className="flex items-center gap-2 text-gray-500">
                <X className="w-4 h-4 text-gray-600 shrink-0" />
                <span>No 4K HDR or Dolby Atmos</span>
              </li>
            </ul>
          </div>

          <button 
            onClick={() => setSelectedPlan('standard')}
            className="w-full py-2.5 rounded-xl bg-[#1f80e0] hover:bg-blue-600 text-white font-bold text-xs transition-colors"
          >
            {selectedPlan === 'standard' ? 'Current Plan' : 'Select Standard'}
          </button>
        </div>

        {/* Tier 3: Premium 4K (Highlighted) */}
        <div className={`bg-[#192133] rounded-2xl p-6 border flex flex-col justify-between space-y-6 transition-all relative ${
          selectedPlan === 'premium' ? 'border-[#E50914] glow-red' : 'border-gray-800'
        }`}>
          <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-[#E50914] text-white text-[10px] font-black uppercase tracking-wider">
            Most Popular
          </div>

          <div className="space-y-3">
            <div className="text-xs font-bold text-[#E50914] uppercase tracking-wider">Cinematic Studio</div>
            <h3 className="text-2xl font-bold text-white">Premium 4K DRM</h3>
            <div className="text-3xl font-black text-white font-mono">
              $19.99<span className="text-xs font-normal text-gray-400">/mo</span>
            </div>
            <p className="text-xs text-gray-400">Full master mezzanine bitrates and studio audio.</p>

            <ul className="space-y-2.5 text-xs text-gray-300 pt-4 border-t border-gray-800">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-white">4K UHD + Dolby Vision (HDR10+)</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>4 concurrent device streams</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-purple-300 font-semibold">Widevine L1 Hardware Key Exchange</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dolby Atmos Spatial Audio (7.1.4)</span>
              </li>
            </ul>
          </div>

          <button 
            onClick={() => setSelectedPlan('premium')}
            className="w-full py-2.5 rounded-xl bg-[#E50914] hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-lg shadow-[#E50914]/30"
          >
            {selectedPlan === 'premium' ? 'Current Active Tier' : 'Upgrade to Premium'}
          </button>
        </div>

      </div>

      {/* Concurrent Streams Monitor (Anti-Password Sharing) */}
      <div className="bg-[#192133] rounded-2xl p-6 border border-gray-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
          <div>
            <span className="text-[10px] text-[#1f80e0] font-mono font-bold uppercase tracking-wider">
              Redis Heartbeat Guard
            </span>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#1f80e0]" />
              Active Concurrent Device Heartbeats
            </h3>
          </div>
          <span className="text-xs text-emerald-400 font-mono font-bold">
            {activeSessions.length} / 4 Screens Active (Within Limits)
          </span>
        </div>

        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div 
              key={session.id}
              className="bg-[#0C111B] p-4 rounded-xl border border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center text-[#1f80e0]">
                  <Tv className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{session.device}</h4>
                  <div className="text-[11px] text-gray-500 font-mono">
                    IP: {session.ip} • Rendition: <span className="text-purple-400">{session.res}</span> • {session.time}
                  </div>
                </div>
              </div>

              <button
                onClick={() => killSession(session.id)}
                className="self-start sm:self-auto text-xs px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-semibold transition-colors"
              >
                Revoke Stream Token
              </button>
            </div>
          ))}

          {activeSessions.length === 0 && (
            <div className="text-center py-6 text-xs text-gray-500">
              No devices currently streaming on this account.
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
