import type { MediaAsset, RoyaltyTransaction } from '../types';

export const MOCK_ASSETS: MediaAsset[] = [
  {
    id: 'mm-001',
    title: 'Interstellar: The Endless Void',
    type: 'movie',
    year: 2024,
    duration: '2h 49m',
    rating: 'PG-13',
    matchScore: 99,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    description: 'When humanity teeters on the brink of extinction, an intrepid team of astronauts ventures through a wormhole near Saturn in search of a habitable world across spacetime.',
    thumbnail: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=600&auto=format&fit=crop&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    licensor: 'Syncopy Films & Paramount',
    drmProtected: true,
    drmScheme: 'Widevine Modular (L1)',
    technicalSpecs: {
      container: 'QuickTime ProRes 4444 XQ',
      videoCodec: 'Apple ProRes / HEVC Main10',
      audioCodec: 'Dolby TrueHD Atmos',
      colorSpace: 'DCI-P3 D65 (BT.2020 PQ 10-bit)',
      resolution: '3840x2160 (4K UHD)',
      masterBitrate: '220.4 Mbps',
      audioChannels: '7.1.4 Spatial Objects',
      fps: 23.976
    },
    renditions: [
      { resolution: '4K UHD (2160p)', bitrate: '16.5 Mbps', framerate: '24fps', chunkSize: '6.0s' },
      { resolution: 'Full HD (1080p)', bitrate: '5.2 Mbps', framerate: '24fps', chunkSize: '6.0s' },
      { resolution: 'HD (720p)', bitrate: '2.4 Mbps', framerate: '24fps', chunkSize: '6.0s' },
      { resolution: 'SD (480p)', bitrate: '850 Kbps', framerate: '24fps', chunkSize: '6.0s' }
    ],
    rights: {
      territories: ['India (IN)', 'United States (US)', 'United Kingdom (GB)', 'Germany (DE)'],
      licensedUntil: '2028-12-31',
      exclusivity: 'Exclusive',
      minimumAge: 13
    },
    royalties: {
      payoutModel: 'Pro-Rata Pool',
      ratePerMinute: 0.042,
      totalStreams: 142890,
      totalWatchHours: 358420,
      accruedEarnings: 15053.64
    }
  },
  {
    id: 'mm-002',
    title: 'Cyberpunk: Neon Genesis',
    type: 'series',
    year: 2025,
    duration: '10 Episodes',
    rating: 'TV-MA',
    matchScore: 96,
    genres: ['Anime', 'Cyberpunk', 'Action'],
    description: 'In an electric dystopia where neural augmentations rule the underground, a young street runner takes high-stakes corporate espionage jobs to buy his freedom.',
    thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    licensor: 'Studio Trigger / CDPR',
    drmProtected: true,
    drmScheme: 'ClearKey MPEG-CENC',
    technicalSpecs: {
      container: 'Matroska MKV (Mezzanine Master)',
      videoCodec: 'H.265 / HEVC 10-bit',
      audioCodec: 'FLAC 24-bit 48kHz',
      colorSpace: 'Rec.709 Standard',
      resolution: '1920x1080 (1080p)',
      masterBitrate: '65.8 Mbps',
      audioChannels: '5.1 Surround',
      fps: 29.97
    },
    renditions: [
      { resolution: 'Full HD (1080p)', bitrate: '4.8 Mbps', framerate: '30fps', chunkSize: '4.0s' },
      { resolution: 'HD (720p)', bitrate: '2.1 Mbps', framerate: '30fps', chunkSize: '4.0s' },
      { resolution: 'SD (480p)', bitrate: '720 Kbps', framerate: '30fps', chunkSize: '4.0s' }
    ],
    rights: {
      territories: ['Global (Worldwide Excluding CN)'],
      licensedUntil: '2027-06-30',
      exclusivity: 'Non-Exclusive',
      minimumAge: 18
    },
    royalties: {
      payoutModel: 'Fixed Rate per Stream',
      ratePerMinute: 0.035,
      totalStreams: 289410,
      totalWatchHours: 198200,
      accruedEarnings: 6937.00
    }
  },
  {
    id: 'mm-003',
    title: 'Dune: The Arrakis Chronicle',
    type: 'movie',
    year: 2024,
    duration: '2h 46m',
    rating: 'PG-13',
    matchScore: 94,
    genres: ['Sci-Fi', 'Epic', 'Drama'],
    description: 'Paul Atreides unites with Chani and the Fremen while seeking vengeance against the conspirators who destroyed his family in the perilous deserts of Arrakis.',
    thumbnail: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    licensor: 'Legendary Pictures / Warner Bros',
    drmProtected: true,
    drmScheme: 'Widevine Modular (L1)',
    technicalSpecs: {
      container: 'MXF OP1a Master',
      videoCodec: 'JPEG 2000 DCI 4K',
      audioCodec: 'PCM Uncompressed 24-bit 96kHz',
      colorSpace: 'ACEScc / HDR10+',
      resolution: '4096x2160 (DCI 4K)',
      masterBitrate: '250.0 Mbps',
      audioChannels: 'Dolby Atmos 9.1.6',
      fps: 24.0
    },
    renditions: [
      { resolution: '4K UHD (2160p)', bitrate: '18.0 Mbps', framerate: '24fps', chunkSize: '6.0s' },
      { resolution: 'Full HD (1080p)', bitrate: '5.5 Mbps', framerate: '24fps', chunkSize: '6.0s' },
      { resolution: 'HD (720p)', bitrate: '2.5 Mbps', framerate: '24fps', chunkSize: '6.0s' }
    ],
    rights: {
      territories: ['India (IN)', 'United States (US)', 'Canada (CA)', 'Japan (JP)'],
      licensedUntil: '2029-03-15',
      exclusivity: 'Exclusive',
      minimumAge: 13
    },
    royalties: {
      payoutModel: 'Pro-Rata Pool',
      ratePerMinute: 0.050,
      totalStreams: 98120,
      totalWatchHours: 270830,
      accruedEarnings: 13541.50
    }
  },
  {
    id: 'mm-004',
    title: 'The Silicon Frontier: AI Architecture',
    type: 'documentary',
    year: 2025,
    duration: '1h 35m',
    rating: 'G',
    matchScore: 92,
    genres: ['Technology', 'Documentary', 'Systems'],
    description: 'An insider look into deep CUDA kernel engineering, GPU hardware security, and the high-throughput distributed supercomputers powering modern frontier intelligence.',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    heroBanner: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    licensor: 'DeepMind / NVIDIA Engineering Press',
    drmProtected: false,
    drmScheme: 'ClearKey MPEG-CENC',
    technicalSpecs: {
      container: 'MP4 AVC High Profile',
      videoCodec: 'AV1 (AOMedia Video 1)',
      audioCodec: 'Opus 160kbps',
      colorSpace: 'BT.709 sRGB',
      resolution: '2560x1440 (1440p 2K)',
      masterBitrate: '45.0 Mbps',
      audioChannels: 'Stereo 2.0',
      fps: 60.0
    },
    renditions: [
      { resolution: '2K QHD (1440p)', bitrate: '8.0 Mbps', framerate: '60fps', chunkSize: '4.0s' },
      { resolution: 'Full HD (1080p)', bitrate: '4.0 Mbps', framerate: '60fps', chunkSize: '4.0s' },
      { resolution: 'HD (720p)', bitrate: '1.8 Mbps', framerate: '60fps', chunkSize: '4.0s' }
    ],
    rights: {
      territories: ['Worldwide (All Countries)'],
      licensedUntil: 'Permanent Creative Commons',
      exclusivity: 'Non-Exclusive',
      minimumAge: 0
    },
    royalties: {
      payoutModel: 'Fixed Rate per Stream',
      ratePerMinute: 0.020,
      totalStreams: 512000,
      totalWatchHours: 810400,
      accruedEarnings: 16208.00
    }
  }
];

export const MOCK_TRANSACTIONS: RoyaltyTransaction[] = [
  {
    id: 'TXN-90812',
    assetId: 'mm-001',
    assetTitle: 'Interstellar: The Endless Void',
    licensor: 'Syncopy Films & Paramount',
    userHash: 'usr_82e9f0...1a',
    watchSeconds: 5940,
    ratePerMinute: 0.042,
    accruedAmount: 4.15,
    timestamp: '2026-09-29 15:45:10',
    territory: 'India (IN)',
    status: 'Accrued'
  },
  {
    id: 'TXN-90813',
    assetId: 'mm-003',
    assetTitle: 'Dune: The Arrakis Chronicle',
    licensor: 'Legendary Pictures / Warner Bros',
    userHash: 'usr_f192aa...bb',
    watchSeconds: 7800,
    ratePerMinute: 0.050,
    accruedAmount: 6.50,
    timestamp: '2026-09-29 15:44:02',
    territory: 'United States (US)',
    status: 'Accrued'
  },
  {
    id: 'TXN-90814',
    assetId: 'mm-002',
    assetTitle: 'Cyberpunk: Neon Genesis',
    licensor: 'Studio Trigger / CDPR',
    userHash: 'usr_7419bc...5e',
    watchSeconds: 1500,
    ratePerMinute: 0.035,
    accruedAmount: 0.87,
    timestamp: '2026-09-29 15:42:30',
    territory: 'Japan (JP)',
    status: 'Disbursed'
  },
  {
    id: 'TXN-90815',
    assetId: 'mm-004',
    assetTitle: 'The Silicon Frontier: AI Architecture',
    licensor: 'DeepMind / NVIDIA Engineering Press',
    userHash: 'usr_3910aa...91',
    watchSeconds: 3600,
    ratePerMinute: 0.020,
    accruedAmount: 1.20,
    timestamp: '2026-09-29 15:40:11',
    territory: 'Germany (DE)',
    status: 'Disbursed'
  }
];
