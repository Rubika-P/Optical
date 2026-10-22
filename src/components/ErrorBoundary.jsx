import React from 'react';
import { AlertCircle, RefreshCw, Home as HomeIcon } from 'lucide-react';
import GrandOpticalsLogo from './GrandOpticalsLogo';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-xl space-y-5">
            <div className="flex justify-center">
              <GrandOpticalsLogo variant="compact" size="md" />
            </div>

            <div className="w-12 h-12 rounded-full bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center mx-auto border border-[#FEE2E2]">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0B4D8C]">Something went wrong</h2>
              <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                We encountered an unexpected visual rendering hiccup.
              </p>
              {this.state.error?.message && (
                <p className="mt-3 text-[11px] font-mono text-[#EF4444] bg-[#FEF2F2] p-2 rounded-lg border border-[#FEE2E2] overflow-x-auto text-left">
                  {this.state.error.message}
                </p>
              )}
            </div>

            <div className="flex gap-3 justify-center pt-2">
              <button
                onClick={this.handleReload}
                className="px-5 py-2.5 bg-[#0B4D8C] hover:bg-[#0284C7] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center space-x-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Page</span>
              </button>
              <a
                href="/"
                className="px-5 py-2.5 bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#0F172A] text-xs font-bold uppercase tracking-wider rounded-xl transition-all flex items-center space-x-1.5"
              >
                <HomeIcon className="w-3.5 h-3.5" />
                <span>Go to Home</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
