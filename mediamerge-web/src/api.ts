// Pothole Streaming API Client (Supports Render production and local development)
const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:8000/api').replace(/\/+$/, '');

export interface Movie {
  id: string;
  title: string;
  description: string;
  genres: string[];
  release_year: number;
  duration_minutes: number;
  rating: string;
  imdb_score?: number;
  imdb_id?: string;
  director?: string;
  cast: string[];
  tags: string[];
  stream_type: 'full' | 'trailer';
  trailer_youtube_id?: string;
  poster_url: string;
  backdrop_url: string;
  video_url?: string;
  direct_video_url?: string;
  studio_id?: string;
  created_at?: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: 'viewer' | 'studio' | 'admin';
  subscription_tier: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface HeartbeatResponse {
  status: string;
  accrued_amount: number;
  total_movie_earnings: number;
  timestamp: string;
}

export interface MovieRoyaltyStat {
  movie_id: string;
  title: string;
  stream_type: string;
  total_seconds_watched: number;
  total_hours_watched: number;
  total_earnings: number;
}

export interface StudioSummary {
  total_earnings_usd: number;
  total_hours_streamed: number;
  total_heartbeats_logged: number;
  country_distribution: Record<string, number>;
  movies: MovieRoyaltyStat[];
}

export const api = {
  // 1. Movies & Catalog
  async getMovies(genre?: string, streamType?: string): Promise<Movie[]> {
    const params = new URLSearchParams();
    if (genre) params.append('genre', genre);
    if (streamType) params.append('stream_type', streamType);
    const res = await fetch(`${API_BASE}/movies?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch catalog movies');
    return res.json();
  },

  async getMovieDetail(id: string): Promise<Movie> {
    const res = await fetch(`${API_BASE}/movies/${id}`);
    if (!res.ok) throw new Error('Failed to fetch movie detail');
    return res.json();
  },

  async getRecommendations(movieId: string): Promise<Movie[]> {
    const res = await fetch(`${API_BASE}/movies/${movieId}/recommendations?limit=6`);
    if (!res.ok) throw new Error('Failed to fetch recommendations');
    return res.json();
  },

  async omdbSearch(query: string, imdbId?: string): Promise<any> {
    const params = new URLSearchParams();
    if (query) params.append('q', query);
    if (imdbId) params.append('i', imdbId);
    const res = await fetch(`${API_BASE}/movies/search/omdb?${params.toString()}`);
    if (!res.ok) throw new Error('OMDb search failed');
    return res.json();
  },

  async createMovie(payload: Record<string, any>, token: string): Promise<Movie> {
    const res = await fetch(`${API_BASE}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Failed to ingest movie asset');
    }
    return res.json();
  },

  // 2. Royalty Telemetry Heartbeat
  async sendHeartbeat(
    movieId: string,
    secondsWatched: number = 10,
    resolution: string = '1080p',
    country: string = 'IN',
    token?: string | null
  ): Promise<HeartbeatResponse> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}/royalties/heartbeat`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        movie_id: movieId,
        seconds_watched: secondsWatched,
        playback_resolution: resolution,
        user_country: country,
      }),
    });
    if (!res.ok) throw new Error('Heartbeat telemetry failed');
    return res.json();
  },

  // 3. Studio Royalty Accounting Dashboard
  async getStudioSummary(token: string): Promise<StudioSummary> {
    const res = await fetch(`${API_BASE}/royalties/studio`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Failed to load studio summary');
    return res.json();
  },

  // 4. Authentication & RBAC
  async login(email: string, password: string): Promise<TokenResponse> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Login failed. Please check your credentials.');
    }
    return res.json();
  },

  async register(
    email: string,
    password: string,
    fullName: string,
    role: string = 'viewer'
  ): Promise<TokenResponse> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, full_name: fullName, role }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || 'Registration failed. Email may already exist.');
    }
    return res.json();
  },

  async getMe(token: string): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error('Session expired');
    return res.json();
  },
};
