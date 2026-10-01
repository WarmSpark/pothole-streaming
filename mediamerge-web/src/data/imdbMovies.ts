import type { Movie } from '../api';

export interface MovieItem {
  imdbID: string;
  title: string;
  year: string;
  rating: string;
  matchScore: number;
  ageRating: string;
  duration: string;
  genres: string[];
  plot: string;
  director: string;
  cast: string;
  poster: string;
  backdrop: string;
  videoUrl: string;
  isSeries?: boolean;
  seasons?: string;
  licensor: string;
  drmProtected: boolean;
  drmScheme: string;
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
    chunkSize: string;
  }[];
  rights: {
    territories: string[];
    licensedUntil: string;
    exclusivity: string;
  };
  royalties: {
    ratePerMinute: number;
    totalWatchHours: number;
    accruedEarnings: number;
  };
}

export const IMDB_CATALOG: MovieItem[] = [
  {
    imdbID: "tt0816692",
    title: "Interstellar",
    year: "2014",
    rating: "8.7",
    matchScore: 99,
    ageRating: "13+",
    duration: "2h 49m",
    genres: ["Sci-Fi", "Adventure", "Drama", "Mind-Bending"],
    plot: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft along with a team of researchers through a wormhole near Saturn to find a new planet for humanity.",
    director: "Christopher Nolan",
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine",
    poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    licensor: "Syncopy Films & Paramount Pictures",
    drmProtected: true,
    drmScheme: "Widevine Modular L1 (Hardware Encrypted)",
    technicalSpecs: {
      container: "QuickTime ProRes 4444 XQ",
      videoCodec: "HEVC Main10 / Apple ProRes",
      audioCodec: "Dolby TrueHD Atmos",
      colorSpace: "DCI-P3 D65 (BT.2020 PQ 10-bit)",
      resolution: "3840x2160 (4K Ultra HD)",
      masterBitrate: "220.4 Mbps",
      audioChannels: "7.1.4 Spatial Objects",
      fps: 23.976
    },
    renditions: [
      { resolution: "4K UHD (2160p)", bitrate: "16.5 Mbps", chunkSize: "6.0s" },
      { resolution: "Full HD (1080p)", bitrate: "5.2 Mbps", chunkSize: "6.0s" },
      { resolution: "HD (720p)", bitrate: "2.4 Mbps", chunkSize: "6.0s" },
      { resolution: "SD (480p)", bitrate: "850 Kbps", chunkSize: "6.0s" }
    ],
    rights: {
      territories: ["India (IN)", "United States (US)", "United Kingdom (GB)", "Germany (DE)"],
      licensedUntil: "2028-12-31",
      exclusivity: "Exclusive SVOD"
    },
    royalties: {
      ratePerMinute: 0.045,
      totalWatchHours: 358420,
      accruedEarnings: 16128.90
    }
  },
  {
    imdbID: "tt15398776",
    title: "Oppenheimer",
    year: "2023",
    rating: "8.9",
    matchScore: 98,
    ageRating: "18+",
    duration: "3h 00m",
    genres: ["Biography", "Drama", "History", "Intense"],
    plot: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II at the secret Los Alamos Laboratory.",
    director: "Christopher Nolan",
    cast: "Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr.",
    poster: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    licensor: "Universal Pictures & Syncopy",
    drmProtected: true,
    drmScheme: "Widevine Modular L1 (Hardware Encrypted)",
    technicalSpecs: {
      container: "MXF OP1a Master",
      videoCodec: "JPEG 2000 DCI 4K 12-bit",
      audioCodec: "PCM Uncompressed 24-bit 96kHz",
      colorSpace: "ACEScc / HDR10+",
      resolution: "4096x2160 (DCI 4K)",
      masterBitrate: "250.0 Mbps",
      audioChannels: "Dolby Atmos 9.1.6",
      fps: 24.0
    },
    renditions: [
      { resolution: "4K UHD (2160p)", bitrate: "18.0 Mbps", chunkSize: "6.0s" },
      { resolution: "Full HD (1080p)", bitrate: "5.5 Mbps", chunkSize: "6.0s" },
      { resolution: "HD (720p)", bitrate: "2.5 Mbps", chunkSize: "6.0s" }
    ],
    rights: {
      territories: ["India (IN)", "United States (US)", "United Kingdom (GB)", "Japan (JP)"],
      licensedUntil: "2029-06-30",
      exclusivity: "Exclusive SVOD"
    },
    royalties: {
      ratePerMinute: 0.052,
      totalWatchHours: 412900,
      accruedEarnings: 21470.80
    }
  },
  {
    imdbID: "tt15239678",
    title: "Dune: Part Two",
    year: "2024",
    rating: "8.6",
    matchScore: 97,
    ageRating: "13+",
    duration: "2h 46m",
    genres: ["Sci-Fi", "Action", "Adventure", "Epic"],
    plot: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the universe.",
    director: "Denis Villeneuve",
    cast: "Timothée Chalamet, Zendaya, Rebecca Ferguson, Javier Bardem",
    poster: "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    licensor: "Legendary Entertainment & Warner Bros",
    drmProtected: true,
    drmScheme: "Widevine Modular L1 (Hardware Encrypted)",
    technicalSpecs: {
      container: "Arri RAW 4.5K Open Gate",
      videoCodec: "Apple ProRes 4444",
      audioCodec: "Dolby Atmos Spatial",
      colorSpace: "Arri LogC4 / Dolby Vision",
      resolution: "3840x2160 (4K UHD)",
      masterBitrate: "215.0 Mbps",
      audioChannels: "7.1.4 Surround",
      fps: 24.0
    },
    renditions: [
      { resolution: "4K UHD (2160p)", bitrate: "16.0 Mbps", chunkSize: "6.0s" },
      { resolution: "Full HD (1080p)", bitrate: "5.0 Mbps", chunkSize: "6.0s" },
      { resolution: "HD (720p)", bitrate: "2.2 Mbps", chunkSize: "6.0s" }
    ],
    rights: {
      territories: ["India (IN)", "United States (US)", "Canada (CA)", "Australia (AU)"],
      licensedUntil: "2029-03-15",
      exclusivity: "Exclusive SVOD"
    },
    royalties: {
      ratePerMinute: 0.048,
      totalWatchHours: 295100,
      accruedEarnings: 14164.80
    }
  },
  {
    imdbID: "tt1375666",
    title: "Inception",
    year: "2010",
    rating: "8.8",
    matchScore: 96,
    ageRating: "13+",
    duration: "2h 28m",
    genres: ["Action", "Sci-Fi", "Heist", "Mind-Bending"],
    plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project.",
    director: "Christopher Nolan",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy",
    poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
    backdrop: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    licensor: "Warner Bros Pictures",
    drmProtected: true,
    drmScheme: "ClearKey MPEG-CENC",
    technicalSpecs: {
      container: "QuickTime MOV Master",
      videoCodec: "H.264 / AVC High Profile",
      audioCodec: "DTS-HD Master Audio",
      colorSpace: "Rec.709",
      resolution: "1920x1080 (1080p)",
      masterBitrate: "55.0 Mbps",
      audioChannels: "5.1 Surround",
      fps: 23.976
    },
    renditions: [
      { resolution: "Full HD (1080p)", bitrate: "4.8 Mbps", chunkSize: "4.0s" },
      { resolution: "HD (720p)", bitrate: "2.1 Mbps", chunkSize: "4.0s" },
      { resolution: "SD (480p)", bitrate: "720 Kbps", chunkSize: "4.0s" }
    ],
    rights: {
      territories: ["Worldwide (All Countries)"],
      licensedUntil: "2027-12-31",
      exclusivity: "Non-Exclusive"
    },
    royalties: {
      ratePerMinute: 0.035,
      totalWatchHours: 640000,
      accruedEarnings: 22400.00
    }
  },
  {
    imdbID: "tt0468569",
    title: "The Dark Knight",
    year: "2008",
    rating: "9.0",
    matchScore: 99,
    ageRating: "16+",
    duration: "2h 32m",
    genres: ["Action", "Crime", "Drama", "Dark"],
    plot: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    director: "Christopher Nolan",
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine",
    poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    licensor: "DC Entertainment & Warner Bros",
    drmProtected: true,
    drmScheme: "Widevine Modular L1 (Hardware Encrypted)",
    technicalSpecs: {
      container: "IMAX 70mm Scan 4K",
      videoCodec: "HEVC Main10",
      audioCodec: "Dolby TrueHD 5.1",
      colorSpace: "DCI-P3 / HDR10",
      resolution: "3840x2160 (4K UHD)",
      masterBitrate: "180.0 Mbps",
      audioChannels: "5.1 Surround",
      fps: 24.0
    },
    renditions: [
      { resolution: "4K UHD (2160p)", bitrate: "15.0 Mbps", chunkSize: "6.0s" },
      { resolution: "Full HD (1080p)", bitrate: "5.0 Mbps", chunkSize: "6.0s" },
      { resolution: "HD (720p)", bitrate: "2.0 Mbps", chunkSize: "6.0s" }
    ],
    rights: {
      territories: ["India (IN)", "United States (US)", "United Kingdom (GB)", "Germany (DE)"],
      licensedUntil: "2030-01-01",
      exclusivity: "Exclusive SVOD"
    },
    royalties: {
      ratePerMinute: 0.050,
      totalWatchHours: 890000,
      accruedEarnings: 44500.00
    }
  },
  {
    imdbID: "tt4574334",
    title: "Stranger Things",
    year: "2016–2025",
    rating: "8.7",
    matchScore: 95,
    ageRating: "16+",
    duration: "4 Seasons",
    isSeries: true,
    seasons: "4 Seasons",
    genres: ["Sci-Fi", "Horror", "Drama", "80s Nostalgia"],
    plot: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl with telekinetic powers.",
    director: "The Duffer Brothers",
    cast: "Millie Bobby Brown, Finn Wolfhard, Winona Ryder, David Harbour",
    poster: "https://m.media-amazon.com/images/M/MV5BMjEzMDAxOTUyMV5BMl5BanBnXkFtZTgwNzAxMzYzOTE@._V1_QL75_UX380_CR0,0,380,562_.jpg",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    licensor: "Netflix Studios Original",
    drmProtected: true,
    drmScheme: "Widevine Modular L1 (Hardware Encrypted)",
    technicalSpecs: {
      container: "Redcode RAW 6K",
      videoCodec: "HEVC Dolby Vision Profile 5",
      audioCodec: "Dolby Atmos Spatial",
      colorSpace: "Dolby Vision HDR",
      resolution: "3840x2160 (4K UHD)",
      masterBitrate: "160.0 Mbps",
      audioChannels: "7.1.4 Atmos",
      fps: 23.976
    },
    renditions: [
      { resolution: "4K UHD (2160p)", bitrate: "16.0 Mbps", chunkSize: "6.0s" },
      { resolution: "Full HD (1080p)", bitrate: "5.2 Mbps", chunkSize: "6.0s" },
      { resolution: "HD (720p)", bitrate: "2.3 Mbps", chunkSize: "6.0s" }
    ],
    rights: {
      territories: ["Global (Worldwide Exclusive)"],
      licensedUntil: "Permanent Original",
      exclusivity: "Exclusive SVOD"
    },
    royalties: {
      ratePerMinute: 0.040,
      totalWatchHours: 1200000,
      accruedEarnings: 48000.00
    }
  },
  {
    imdbID: "tt0903747",
    title: "Breaking Bad",
    year: "2008–2013",
    rating: "9.5",
    matchScore: 99,
    ageRating: "18+",
    duration: "5 Seasons",
    isSeries: true,
    seasons: "5 Seasons",
    genres: ["Crime", "Drama", "Thriller", "Masterpiece"],
    plot: "A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student in order to secure his family's financial future.",
    director: "Vince Gilligan",
    cast: "Bryan Cranston, Aaron Paul, Anna Gunn, Bob Odenkirk",
    poster: "https://m.media-amazon.com/images/M/MV5BOWE4NTc3YmYtNmU2Mi00ZjhkLWE1MTItZmM1M2U1ODU3YjFlXkEyXkFqcGc@._V1_QL75_UY562_CR2,0,380,562_.jpg",
    backdrop: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    licensor: "Sony Pictures Television",
    drmProtected: true,
    drmScheme: "Widevine Modular L1 (Hardware Encrypted)",
    technicalSpecs: {
      container: "35mm Film 4K Remaster",
      videoCodec: "HEVC Main10",
      audioCodec: "DTS-HD 5.1",
      colorSpace: "Rec.709 4K Remaster",
      resolution: "3840x2160 (4K UHD)",
      masterBitrate: "120.0 Mbps",
      audioChannels: "5.1 Surround",
      fps: 23.976
    },
    renditions: [
      { resolution: "4K UHD (2160p)", bitrate: "14.0 Mbps", chunkSize: "6.0s" },
      { resolution: "Full HD (1080p)", bitrate: "4.8 Mbps", chunkSize: "6.0s" },
      { resolution: "HD (720p)", bitrate: "2.1 Mbps", chunkSize: "6.0s" }
    ],
    rights: {
      territories: ["India (IN)", "United States (US)", "United Kingdom (GB)"],
      licensedUntil: "2027-11-30",
      exclusivity: "Non-Exclusive"
    },
    royalties: {
      ratePerMinute: 0.042,
      totalWatchHours: 950000,
      accruedEarnings: 39900.00
    }
  },
  {
    imdbID: "tt11126994",
    title: "Arcane",
    year: "2021–2024",
    rating: "9.0",
    matchScore: 98,
    ageRating: "16+",
    duration: "2 Seasons",
    isSeries: true,
    seasons: "2 Seasons",
    genres: ["Animation", "Action", "Sci-Fi", "Steampunk"],
    plot: "Set in the utopian region of Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League of Legends champions and the power that tears them apart.",
    director: "Christian Linke, Alex Yee",
    cast: "Hailee Steinfeld, Ella Purnell, Kevin Alejandro, Katie Leung",
    poster: "https://m.media-amazon.com/images/M/MV5BYjA2NzhlMDItNWRmZC00MzRjLWE3ZjAtZjBlZDAwOWY2ODdjXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg",
    backdrop: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    licensor: "Riot Games & Fortiche Production",
    drmProtected: true,
    drmScheme: "Widevine Modular L1 (Hardware Encrypted)",
    technicalSpecs: {
      container: "Fortiche Digital Master",
      videoCodec: "HEVC 10-bit Dolby Vision",
      audioCodec: "Dolby Atmos 7.1.4",
      colorSpace: "DCI-P3 D65",
      resolution: "3840x2160 (4K UHD)",
      masterBitrate: "190.0 Mbps",
      audioChannels: "7.1.4 Spatial Atmos",
      fps: 24.0
    },
    renditions: [
      { resolution: "4K UHD (2160p)", bitrate: "16.0 Mbps", chunkSize: "6.0s" },
      { resolution: "Full HD (1080p)", bitrate: "5.5 Mbps", chunkSize: "6.0s" },
      { resolution: "HD (720p)", bitrate: "2.4 Mbps", chunkSize: "6.0s" }
    ],
    rights: {
      territories: ["Global (Worldwide Exclusive)"],
      licensedUntil: "2032-12-31",
      exclusivity: "Exclusive SVOD"
    },
    royalties: {
      ratePerMinute: 0.055,
      totalWatchHours: 720000,
      accruedEarnings: 39600.00
    }
  },
  {
    imdbID: "tt12590266",
    title: "Cyberpunk: Edgerunners",
    year: "2022",
    rating: "8.3",
    matchScore: 94,
    ageRating: "18+",
    duration: "10 Episodes",
    isSeries: true,
    seasons: "Limited Series",
    genres: ["Anime", "Action", "Cyberpunk", "Tragic"],
    plot: "A street kid trying to survive in a technology and body modification-obsessed city of the future. Having everything to lose, he chooses to stay alive by becoming an edgerunner.",
    director: "Hiroyuki Imaishi",
    cast: "Aoi Yuuki, Zach Aguilar, Kenichiro Ohashi, Stephanie Wong",
    poster: "https://m.media-amazon.com/images/M/MV5BM2JkMzM2ZmYtNWU4MS00MjZhLWFhZWUtYWFjYTJkN2RhZDliXkEyXkFqcGc@._V1_SX300.jpg",
    backdrop: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    licensor: "Studio Trigger & CD Projekt Red",
    drmProtected: true,
    drmScheme: "ClearKey MPEG-CENC",
    technicalSpecs: {
      container: "Matroska MKV Master",
      videoCodec: "H.265 / HEVC 10-bit",
      audioCodec: "FLAC 24-bit 48kHz",
      colorSpace: "Rec.709 High Gamut",
      resolution: "1920x1080 (1080p)",
      masterBitrate: "65.0 Mbps",
      audioChannels: "5.1 Surround",
      fps: 29.97
    },
    renditions: [
      { resolution: "Full HD (1080p)", bitrate: "4.8 Mbps", chunkSize: "4.0s" },
      { resolution: "HD (720p)", bitrate: "2.1 Mbps", chunkSize: "4.0s" }
    ],
    rights: {
      territories: ["Global (Worldwide Exclusive)"],
      licensedUntil: "2030-08-31",
      exclusivity: "Exclusive SVOD"
    },
    royalties: {
      ratePerMinute: 0.038,
      totalWatchHours: 380000,
      accruedEarnings: 14440.00
    }
  },
  {
    imdbID: "tt1856101",
    title: "Blade Runner 2049",
    year: "2017",
    rating: "8.0",
    matchScore: 95,
    ageRating: "16+",
    duration: "2h 44m",
    genres: ["Sci-Fi", "Mystery", "Cyberpunk", "Atmospheric"],
    plot: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    director: "Denis Villeneuve",
    cast: "Ryan Gosling, Harrison Ford, Ana de Armas, Sylvia Hoeks",
    poster: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_QL75_UX380_CR0,0,380,562_.jpg",
    backdrop: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1600&auto=format&fit=crop&q=80",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    licensor: "Alcon Entertainment & Sony Pictures",
    drmProtected: true,
    drmScheme: "Widevine Modular L1 (Hardware Encrypted)",
    technicalSpecs: {
      container: "Arri Alexa 3.4K Master",
      videoCodec: "HEVC HDR10 / Dolby Vision",
      audioCodec: "Dolby Atmos 7.1.4",
      colorSpace: "DCI-P3 Mastered",
      resolution: "3840x2160 (4K UHD)",
      masterBitrate: "175.0 Mbps",
      audioChannels: "7.1.4 Spatial Atmos",
      fps: 24.0
    },
    renditions: [
      { resolution: "4K UHD (2160p)", bitrate: "15.5 Mbps", chunkSize: "6.0s" },
      { resolution: "Full HD (1080p)", bitrate: "5.2 Mbps", chunkSize: "6.0s" },
      { resolution: "HD (720p)", bitrate: "2.3 Mbps", chunkSize: "6.0s" }
    ],
    rights: {
      territories: ["India (IN)", "United States (US)", "United Kingdom (GB)", "France (FR)"],
      licensedUntil: "2028-10-15",
      exclusivity: "Non-Exclusive"
    },
    royalties: {
      ratePerMinute: 0.044,
      totalWatchHours: 420000,
      accruedEarnings: 18480.00
    }
  }
];

export function getFallbackMovies(): Movie[] {
  return IMDB_CATALOG.map((m) => ({
    id: m.imdbID,
    title: m.title,
    description: m.plot,
    genres: m.genres,
    release_year: parseInt(m.year) || 2024,
    duration_minutes: parseInt(m.duration) || 120,
    rating: m.rating,
    imdb_score: parseFloat(m.rating) || 8.5,
    imdb_id: m.imdbID,
    director: m.director,
    cast: m.cast ? m.cast.split(',').map((c) => c.trim()) : [],
    tags: m.genres,
    stream_type: (m.isSeries ? 'trailer' : 'full') as 'full' | 'trailer',
    trailer_youtube_id: 'Way9Dexny3w',
    poster_url: m.poster,
    backdrop_url: m.backdrop,
    video_url: m.videoUrl,
  }));
}
