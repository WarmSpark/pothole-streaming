import React, { useState } from 'react';
import type { MediaAsset } from '../types';
import { 
  Scale, 
  Globe2, 
  Calendar, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  MapPin, 
  FileText,
  Lock
} from 'lucide-react';

interface RightsViewProps {
  assets: MediaAsset[];
}

export const RightsView: React.FC<RightsViewProps> = ({ assets }) => {
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset>(assets[0]);
  const [simulatedCountry, setSimulatedCountry] = useState('India (IN)');

  // Evaluate if simulated country is licensed
  const isLicensedInCountry = 
    selectedAsset.rights.territories.includes('Global (Worldwide Excluding CN)') ||
    selectedAsset.rights.territories.includes('Worldwide (All Countries)') ||
    selectedAsset.rights.territories.some(t => t.includes(simulatedCountry.split(' ')[0]));

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-[#1f80e0]" />
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Rights & Territory Geofencing
            </h1>
          </div>
          <p className="text-gray-400 text-xs md:text-sm mt-1">
            Contractual Licensing Windows, Exclusivity Models & Regional Geo-IP Access Enforcement
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>PostgreSQL Rights Guard Active</span>
        </div>
      </div>

      {/* Interactive Geo-IP Simulator Box */}
      <div className="bg-[#192133] rounded-2xl p-6 border border-gray-800 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800 pb-4">
          <div>
            <span className="text-[10px] text-[#1f80e0] font-mono font-bold uppercase tracking-wider">
              Enforcement Testing Sandbox
            </span>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-rose-500" />
              Geo-IP Manifest Access Simulator
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            Simulates what happens when a viewer in another country requests the streaming manifest
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs text-gray-400 block mb-1.5">Select Content Title:</label>
            <select
              value={selectedAsset.id}
              onChange={(e) => {
                const found = assets.find(a => a.id === e.target.value);
                if (found) setSelectedAsset(found);
              }}
              className="w-full bg-[#0C111B] border border-gray-700 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#1f80e0]"
            >
              {assets.map(a => (
                <option key={a.id} value={a.id}>{a.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-400 block mb-1.5">Simulate User Location (Geo-IP):</label>
            <select
              value={simulatedCountry}
              onChange={(e) => setSimulatedCountry(e.target.value)}
              className="w-full bg-[#0C111B] border border-gray-700 text-white rounded-lg p-2.5 text-xs focus:outline-none focus:border-[#1f80e0]"
            >
              <option value="India (IN)">India (IN)</option>
              <option value="United States (US)">United States (US)</option>
              <option value="United Kingdom (GB)">United Kingdom (GB)</option>
              <option value="Germany (DE)">Germany (DE)</option>
              <option value="Japan (JP)">Japan (JP)</option>
              <option value="Brazil (BR)">Brazil (BR)</option>
              <option value="Australia (AU)">Australia (AU)</option>
            </select>
          </div>

          {/* Outcome Box */}
          <div className="flex flex-col justify-end">
            <div className={`p-2.5 rounded-xl border flex items-center gap-3 text-xs ${
              isLicensedInCountry 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
            }`}>
              {isLicensedInCountry ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <div className="font-bold">STATUS 200 OK — ACCESS GRANTED</div>
                    <div className="text-[10px] text-emerald-400/80">User IP is inside contracted licensing boundary.</div>
                  </div>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    <div className="font-bold">STATUS 451 — GEO-BLOCKED</div>
                    <div className="text-[10px] text-rose-400/80">Unavailable in this territory. DRM token denied.</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contracts & Rights Matrix Table */}
      <div className="bg-[#192133] rounded-2xl p-6 border border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#1f80e0]" />
            Active Licensing Contracts Ledger
          </h3>
          <span className="text-xs text-gray-500 font-mono">
            {assets.length} Active Production Deals
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0C111B]">
          <table className="w-full text-left text-xs text-gray-300">
            <thead className="bg-[#141824] text-gray-400 font-semibold border-b border-gray-800">
              <tr>
                <th className="py-3 px-4">Title & Licensor</th>
                <th className="py-3 px-4">Territorial Coverage</th>
                <th className="py-3 px-4">Window Expiration</th>
                <th className="py-3 px-4">Exclusivity</th>
                <th className="py-3 px-4">Min. Age</th>
                <th className="py-3 px-4">Legal Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 font-mono text-[11px]">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white font-sans text-xs">{asset.title}</div>
                    <div className="text-gray-500 text-[10px]">{asset.licensor}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {asset.rights.territories.map((t, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-gray-800 text-gray-300 text-[10px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-3 px-4 text-amber-400 flex items-center gap-1.5 mt-2">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    {asset.rights.licensedUntil}
                  </td>

                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      asset.rights.exclusivity === 'Exclusive' 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    }`}>
                      {asset.rights.exclusivity}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-gray-300">
                    {asset.rights.minimumAge === 0 ? 'All Ages' : `${asset.rights.minimumAge}+`}
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Legally Compliant
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
