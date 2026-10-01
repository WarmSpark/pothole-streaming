import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-md space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#E50914]/20 border border-[#E50914] flex items-center justify-center mx-auto text-[#E50914]">
              <AlertCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[#E50914] font-black text-2xl tracking-tight">POTHOLE</span>
              <h1 className="text-xl font-bold mt-2 text-white">Something interrupted playback</h1>
              <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                {this.state.error?.message || 'A client-side runtime exception occurred.'}
              </p>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem('pothole_user');
                localStorage.removeItem('pothole_token');
                window.location.reload();
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-[#E50914] hover:bg-[#f6121d] text-white text-xs font-bold transition-all shadow-lg shadow-[#E50914]/40 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restart Pothole Streaming</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
