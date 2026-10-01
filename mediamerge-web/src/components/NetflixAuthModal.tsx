import React, { useState } from 'react';
import { X, Eye, EyeOff, Film, ShieldCheck } from 'lucide-react';
import { api } from '../api';
import type { User } from '../api';

interface NetflixAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User, token: string) => void;
}

export const NetflixAuthModal: React.FC<NetflixAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'viewer' | 'studio'>('viewer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isSignUp) {
        const res = await api.register(email, password, fullName || email.split('@')[0], role);
        localStorage.setItem('pothole_token', res.access_token);
        localStorage.setItem('pothole_user', JSON.stringify(res.user));
        onLoginSuccess(res.user, res.access_token);
      } else {
        const res = await api.login(email, password);
        localStorage.setItem('pothole_token', res.access_token);
        localStorage.setItem('pothole_user', JSON.stringify(res.user));
        onLoginSuccess(res.user, res.access_token);
      }
      onClose();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Authentication failed. Please check credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  // One-click demo login helpers
  const handleQuickLogin = (demoRole: 'scifi' | 'action' | 'viewer') => {
    if (demoRole === 'scifi') {
      setEmail('scifi_studios@pothole.tv');
      setPassword('StudioPass123!');
      setIsSignUp(false);
    } else if (demoRole === 'action') {
      setEmail('action_studios@pothole.tv');
      setPassword('StudioPass123!');
      setIsSignUp(false);
    } else {
      setEmail('viewer_demo@pothole.tv');
      setPassword('ViewerPass123!');
      setIsSignUp(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Background Poster Collage Vignette */}
      <div 
        onClick={onClose}
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/60 via-black/90 to-black"
      />

      <div className="relative z-10 w-full max-w-md bg-black/85 border border-white/10 p-8 sm:p-12 rounded-lg shadow-2xl text-white">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="mb-6">
          <span className="text-[#E50914] text-3xl font-black tracking-tighter drop-shadow-md">
            POTHOLE
          </span>
          <h2 className="text-2xl font-bold mt-2">
            {isSignUp ? 'Create your account' : 'Sign In'}
          </h2>
          <p className="text-gray-400 text-xs mt-1">
            Unlimited movies, companion trailers, and high-frequency royalty streaming.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-5 p-3 rounded bg-[#E50914]/20 border border-[#E50914] text-white text-xs font-medium">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isSignUp && (
            <>
              <div>
                <label className="block text-xs text-gray-300 font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Christopher Nolan / A24 Films"
                  className="w-full px-4 py-3 bg-[#333333] text-white rounded border border-transparent focus:border-white focus:outline-none text-sm placeholder-gray-500"
                />
              </div>

              {/* Role Picker (Viewer vs Studio) */}
              <div>
                <label className="block text-xs text-gray-300 font-medium mb-1">Account Role</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole('viewer')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded text-xs font-semibold border transition-all ${
                      role === 'viewer'
                        ? 'bg-[#E50914] text-white border-[#E50914]'
                        : 'bg-[#222] text-gray-400 border-white/10 hover:text-white'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>Viewer</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole('studio')}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded text-xs font-semibold border transition-all ${
                      role === 'studio'
                        ? 'bg-[#E50914] text-white border-[#E50914]'
                        : 'bg-[#222] text-gray-400 border-white/10 hover:text-white'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Studio Partner</span>
                  </button>
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs text-gray-300 font-medium mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 bg-[#333333] text-white rounded border border-transparent focus:border-white focus:outline-none text-sm placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-300 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#333333] text-white rounded border border-transparent focus:border-white focus:outline-none text-sm placeholder-gray-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#E50914] hover:bg-[#f6121d] text-white font-bold rounded text-sm transition-all shadow-lg shadow-[#E50914]/30 disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : isSignUp ? 'Create Pothole Account' : 'Sign In'}
          </button>
        </form>

        {/* Demo Fast-Fill Buttons */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-[11px] text-gray-400 uppercase tracking-wider font-semibold mb-2">
            Quick Demo Autofill:
          </p>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('scifi')}
              className="py-1.5 px-1 bg-white/10 hover:bg-white/20 rounded text-[11px] font-medium text-gray-300 hover:text-white transition-all border border-white/10 truncate cursor-pointer text-center"
              title="Apex Sci-Fi Productions"
            >
              Sci-Fi Studio
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('action')}
              className="py-1.5 px-1 bg-white/10 hover:bg-white/20 rounded text-[11px] font-medium text-gray-300 hover:text-white transition-all border border-white/10 truncate cursor-pointer text-center"
              title="Titan Action Studios"
            >
              Action Studio
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('viewer')}
              className="py-1.5 px-1 bg-white/10 hover:bg-white/20 rounded text-[11px] font-medium text-gray-300 hover:text-white transition-all border border-white/10 truncate cursor-pointer text-center"
            >
              Demo Viewer
            </button>
          </div>
        </div>

        {/* Toggle Mode */}
        <div className="mt-6 text-center text-xs text-gray-400">
          {isSignUp ? (
            <p>
              Already on Pothole?{' '}
              <button
                onClick={() => {
                  setIsSignUp(false);
                  setError(null);
                }}
                className="text-white hover:underline font-bold"
              >
                Sign in now.
              </button>
            </p>
          ) : (
            <p>
              New to Pothole?{' '}
              <button
                onClick={() => {
                  setIsSignUp(true);
                  setError(null);
                }}
                className="text-white hover:underline font-bold"
              >
                Sign up now.
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
