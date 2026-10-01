import React from 'react';
import type { MediaAsset } from '../types';
import { X, Layers, Cpu, ShieldCheck, HardDrive, Sliders } from 'lucide-react';

interface SpecsModalProps {
  asset: MediaAsset | null;
  onClose: () => void;
  onPlay: (asset: MediaAsset) => void;
}

export const SpecsModal: React.FC<SpecsModalProps> = ({ asset, onClose, onPlay }) => {
  if (!asset) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-[#192133] border border-gray-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl space-y-5 p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-800 pb-4">
          <div className="flex items-center gap-3">
            <img src={asset.thumbnail} alt={asset.title} className="w-12 h-12 object-cover rounded-lg" />
            <div>
              <h2 className="text-white font-bold text-lg">{asset.title}</h2>
              <span className="text-xs text-gray-400">{asset.licensor} • {asset.year}</span>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-gray-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mezzanine Master Specifications */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-[#1f80e0] uppercase tracking-wider flex items-center gap-1.5">
            <HardDrive className="w-4 h-4" />
            Master Mezzanine Specifications
          </h3>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-[#0C111B] p-3.5 rounded-xl border border-gray-800">
            <div>
              <span className="text-gray-500 block text-[10px]">Container:</span>
              <span className="text-gray-200">{asset.technicalSpecs.container}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">Codec & Bit Depth:</span>
              <span className="text-purple-400">{asset.technicalSpecs.videoCodec}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">Color Grading:</span>
              <span className="text-emerald-400">{asset.technicalSpecs.colorSpace}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">Master Bitrate:</span>
              <span className="text-[#1f80e0] font-bold">{asset.technicalSpecs.masterBitrate}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">Audio Channels:</span>
              <span className="text-gray-300">{asset.technicalSpecs.audioChannels}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-[10px]">Frame Rate:</span>
              <span className="text-gray-300">{asset.technicalSpecs.fps} fps</span>
            </div>
          </div>
        </div>

        {/* FFmpeg Transcoded Ladders */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sliders className="w-4 h-4" />
            Adaptive Bitrate (ABR) Chunk Slices
          </h3>
          <div className="space-y-1.5 font-mono text-xs">
            {asset.renditions.map((r, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-[#0C111B] border border-gray-800">
                <span className="font-bold text-white">{r.resolution}</span>
                <span className="text-[#1f80e0]">{r.bitrate}</span>
                <span className="text-gray-400">{r.chunkSize} HLS Slices</span>
                <span className="text-emerald-400 text-[10px]">Encrypted</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onPlay(asset);
            }}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-[#1f80e0] hover:bg-blue-600 text-white shadow-lg shadow-[#1f80e0]/30"
          >
            Launch Stream Player
          </button>
        </div>

      </div>
    </div>
  );
};
