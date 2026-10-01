export interface MediaAsset {
  id: string;
  title: string;
  type: 'movie' | 'series' | 'documentary';
  year: number;
  duration: string;
  rating: string;
  matchScore: number;
  genres: string[];
  description: string;
  thumbnail: string;
  heroBanner: string;
  videoUrl: string;
  licensor: string;
  drmProtected: boolean;
  drmScheme: 'Widevine Modular (L1)' | 'Apple FairPlay' | 'ClearKey MPEG-CENC';
  technicalSpecs: {
    container: string;
    videoCodec: string;
    audioCodec: string;
    colorSpace: string;
    resolution: string;
    masterBitrate: string;
    audioChannels: string;
    fps: number;
  };
  renditions: {
    resolution: string;
    bitrate: string;
    framerate: string;
    chunkSize: string;
  }[];
  rights: {
    territories: string[];
    licensedUntil: string;
    exclusivity: 'Exclusive' | 'Non-Exclusive';
    minimumAge: number;
  };
  royalties: {
    payoutModel: 'Pro-Rata Pool' | 'Fixed Rate per Stream';
    ratePerMinute: number;
    totalStreams: number;
    totalWatchHours: number;
    accruedEarnings: number;
  };
}

export interface RoyaltyTransaction {
  id: string;
  assetId: string;
  assetTitle: string;
  licensor: string;
  userHash: string;
  watchSeconds: number;
  ratePerMinute: number;
  accruedAmount: number;
  timestamp: string;
  territory: string;
  status: 'Accrued' | 'Disbursed' | 'Audit Pending';
}

export type ActiveTab = 'stream' | 'dam' | 'rights' | 'royalties' | 'subscriptions';
