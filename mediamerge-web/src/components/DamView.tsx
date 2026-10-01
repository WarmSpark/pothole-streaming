import React, { useState } from 'react';
import type { MediaAsset } from '../types';
import { 
  UploadCloud, 
  FolderArchive, 
  FileVideo, 
  Cpu, 
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  HardDrive,
  Sliders,
  FileCode,
  Sparkles
} from 'lucide-react';

interface DamViewProps {
  assets: MediaAsset[];
  onSelectAsset: (asset: MediaAsset) => void;
}

export const DamView: React.FC<DamViewProps> = ({ assets, onSelectAsset }) => {
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset>(assets[0]);
  const [uploadProgress, setUploadProgress] = useState(100);
  const [isUploading, setIsUploading] = useState(false);
  const [activeStage, setActiveStage] = useState<'idle' | 'chunking' | 'transcoding' | 'drm' | 'ready'>('ready');

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    setActiveStage('chunking');

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setActiveStage('ready');
          return 100;
        }
        if (prev === 30) setActiveStage('transcoding');
        if (prev === 70) setActiveStage('drm');
        return prev + 10;
      });
    }, 400);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Title & Stats Ribbon */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <FolderArchive className="w-6 h-6 text-[#1f80e0]" />
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Digital Asset Management (DAM)
            </h1>
          </div>
          <p className="text-gray-400 text-xs md:text-sm mt-1">
            Enterprise Ingestion, Mezzanine Cold Storage, FFmpeg ABR Ladders & DRM Packaging
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-[#192133] border border-gray-800 text-xs">
            <span className="text-gray-500 block text-[10px]">Mezzanine Vault Tier</span>
            <span className="font-bold text-emerald-400 font-mono">AWS S3 Glacier / MinIO</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-[#192133] border border-gray-800 text-xs">
            <span className="text-gray-500 block text-[10px]">Active Transcode Slots</span>
            <span className="font-bold text-[#1f80e0] font-mono">4 Workers (Celery)</span>
          </div>
        </div>
      </div>

      {/* Grid: Upload Station & Transcode Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Ingestion Drag & Drop Station */}
        <div className="lg:col-span-1 bg-[#192133] rounded-2xl p-6 border border-gray-800 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <UploadCloud className="w-5 h-5 text-[#1f80e0]" />
              Mezzanine Master Ingestion
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              Direct-to-storage presigned upload (ProRes 422, DNxHR, Raw 4K MP4). Bypasses web server memory.
            </p>
          </div>

          <div 
            onClick={!isUploading ? simulateUpload : undefined}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              isUploading 
                ? 'border-[#1f80e0] bg-[#1f80e0]/5' 
                : 'border-gray-700 hover:border-[#1f80e0] hover:bg-white/5'
            }`}
          >
            <FileVideo className="w-12 h-12 text-[#1f80e0] mx-auto mb-3" />
            <p className="text-sm font-bold text-white">
              {isUploading ? 'Uploading Chunked Mezzanine...' : 'Drop Raw Camera Master Here'}
            </p>
            <p className="text-[11px] text-gray-500 mt-1">
              Supports ProRes, MXF, MKV up to 100 GB
            </p>

            {/* Simulated progress */}
            {isUploading && (
              <div className="mt-4 space-y-2">
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-[#1f80e0] h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                  <span>Chunk: {Math.floor(uploadProgress / 10)}/10</span>
                  <span>{uploadProgress}% (48.4 MB/s)</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-[#0C111B] rounded-xl p-3 border border-gray-800 text-[11px] text-gray-400 space-y-1">
            <div className="flex items-center justify-between text-gray-300 font-semibold">
              <span>Automatic Post-Upload Jobs:</span>
              <span className="text-emerald-400 font-mono">Auto-Trigger</span>
            </div>
            <div>• Technical probe via <code className="text-[#1f80e0]">ffprobe</code></div>
            <div>• Closed captions via <code className="text-purple-400">OpenAI Whisper</code></div>
            <div>• Vector semantic tags via <code className="text-amber-400">CLIP AI</code></div>
          </div>
        </div>

        {/* Right: Technical Metadata Inspector & ABR Rendition Ladder */}
        <div className="lg:col-span-2 bg-[#192133] rounded-2xl p-6 border border-gray-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
            <div>
              <span className="text-[10px] text-[#1f80e0] font-mono font-bold uppercase tracking-wider">
                Active Asset Inspector
              </span>
              <h3 className="text-lg font-bold text-white">{selectedAsset.title}</h3>
            </div>
            <select
              value={selectedAsset.id}
              onChange={(e) => {
                const found = assets.find(a => a.id === e.target.value);
                if (found) setSelectedAsset(found);
              }}
              className="bg-[#0C111B] border border-gray-700 text-white rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-[#1f80e0]"
            >
              {assets.map(a => (
                <option key={a.id} value={a.id}>{a.title}</option>
              ))}
            </select>
          </div>

          {/* Technical Specs Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-[#0C111B] p-3 rounded-xl border border-gray-800">
              <span className="text-gray-500 block text-[10px]">Container Profile</span>
              <span className="font-mono font-bold text-white truncate block">
                {selectedAsset.technicalSpecs.container}
              </span>
            </div>
            <div className="bg-[#0C111B] p-3 rounded-xl border border-gray-800">
              <span className="text-gray-500 block text-[10px]">Video Codec</span>
              <span className="font-mono font-bold text-purple-400 truncate block">
                {selectedAsset.technicalSpecs.videoCodec}
              </span>
            </div>
            <div className="bg-[#0C111B] p-3 rounded-xl border border-gray-800">
              <span className="text-gray-500 block text-[10px]">Color Grading</span>
              <span className="font-mono font-bold text-emerald-400 truncate block">
                {selectedAsset.technicalSpecs.colorSpace}
              </span>
            </div>
            <div className="bg-[#0C111B] p-3 rounded-xl border border-gray-800">
              <span className="text-gray-500 block text-[10px]">Master Bitrate</span>
              <span className="font-mono font-bold text-[#1f80e0] truncate block">
                {selectedAsset.technicalSpecs.masterBitrate}
              </span>
            </div>
          </div>

          {/* ABR Rendition Ladder Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-[#1f80e0]" />
                Generated ABR Delivery Ladder (HLS & MPEG-DASH)
              </span>
              <span className="text-gray-500 font-mono text-[11px]">
                {selectedAsset.renditions.length} Sliced Profiles Ready
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-800 bg-[#0C111B]">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-[#141824] text-gray-400 font-semibold border-b border-gray-800">
                  <tr>
                    <th className="py-2.5 px-4">Rendition Profile</th>
                    <th className="py-2.5 px-4">Target Bitrate</th>
                    <th className="py-2.5 px-4">Chunk Size</th>
                    <th className="py-2.5 px-4">DRM Encryption</th>
                    <th className="py-2.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60 font-mono text-[11px]">
                  {selectedAsset.renditions.map((r, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="py-2.5 px-4 font-bold text-white">{r.resolution}</td>
                      <td className="py-2.5 px-4 text-[#1f80e0]">{r.bitrate}</td>
                      <td className="py-2.5 px-4 text-gray-400">{r.chunkSize} TS Slices</td>
                      <td className="py-2.5 px-4 text-purple-400">Common Enc (CENC)</td>
                      <td className="py-2.5 px-4 text-emerald-400 font-bold">
                        ● Packaged (S3 Hot)
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* Assembly Line Process Visualizer */}
      <div className="bg-[#192133] rounded-2xl p-6 border border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Cpu className="w-5 h-5 text-[#1f80e0]" />
          Media Pipeline Architecture (From Upload to Screen)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-[#0C111B] p-4 rounded-xl border border-gray-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-[#1f80e0] flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h4 className="font-bold text-white text-sm">Mezzanine Vault</h4>
            <p className="text-[11px] text-gray-400">
              Raw 30 GB ProRes file stored in Cold S3 Glacier. Preserves pristine master for future re-encodes.
            </p>
          </div>

          <div className="bg-[#0C111B] p-4 rounded-xl border border-gray-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h4 className="font-bold text-white text-sm">FFmpeg Transcoder</h4>
            <p className="text-[11px] text-gray-400">
              Downscales master into 1080p, 720p, 480p and cuts them into 6-second slices.
            </p>
          </div>

          <div className="bg-[#0C111B] p-4 rounded-xl border border-gray-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h4 className="font-bold text-white text-sm">Shaka Packager (DRM)</h4>
            <p className="text-[11px] text-gray-400">
              Encrypts slices with AES-128 keys and creates the master <code className="text-gray-300">.m3u8</code> manifest playlist.
            </p>
          </div>

          <div className="bg-[#0C111B] p-4 rounded-xl border border-gray-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <h4 className="font-bold text-white text-sm">Edge CDN Playback</h4>
            <p className="text-[11px] text-gray-400">
              Zero server transcoding during playback. Users stream static pre-sliced files instantly.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
