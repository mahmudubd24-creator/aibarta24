import React, { useState, useEffect } from 'react';
import {
  authenticateAdmin,
  isAdminSetupCompleted,
  isAccountLocked,
} from '../../services/authCrypto';
import {
  ShieldCheck,
  Lock,
  Mail,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Eye,
  EyeOff,
  Home,
  Clock,
} from 'lucide-react';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onNavigateToSetup: () => void;
  onBackToHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onSuccess,
  onNavigateToSetup,
  onBackToHome,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lockoutRemaining, setLockoutRemaining] = useState<number>(0);

  const isSetupDone = isAdminSetupCompleted();

  // Check lockout on mount and tick countdown
  useEffect(() => {
    const checkLock = () => {
      const lock = isAccountLocked();
      if (lock.locked) {
        setLockoutRemaining(lock.remainingSeconds);
      } else {
        setLockoutRemaining(0);
      }
    };

    checkLock();
    const interval = setInterval(checkLock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (lockoutRemaining > 0) {
      setError(`Login locked for security. Please wait ${lockoutRemaining} seconds.`);
      return;
    }

    if (!isSetupDone) {
      setError('No Admin account found. Please complete the initial Admin Setup.');
      return;
    }

    setLoading(true);
    try {
      const result = await authenticateAdmin(email, password);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.message);
        const lock = isAccountLocked();
        if (lock.locked) {
          setLockoutRemaining(lock.remainingSeconds);
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Subtle Cyber Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Top Header & Security Badge */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-xl shadow-blue-500/20 mb-2">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            AI Barta 24 Admin
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Private Management Portal · Restricted Access
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 space-y-5">
          
          {/* Lockout Warning Banner */}
          {lockoutRemaining > 0 && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-800/80 text-rose-200 text-xs flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-rose-400 shrink-0 animate-pulse" />
              <span>
                Account locked due to repeated attempts. Cooldown active:{' '}
                <strong className="font-mono text-white">{lockoutRemaining}s</strong>
              </span>
            </div>
          )}

          {/* Error Banner */}
          {error && lockoutRemaining === 0 && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* First-time setup banner if not completed */}
          {!isSetupDone && (
            <div className="p-4 rounded-xl bg-blue-950/70 border border-blue-800/80 text-cyan-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-white">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>First-Time Setup Required</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                No Admin account has been provisioned yet. Set up your official Admin Gmail and secure password now.
              </p>
              <button
                type="button"
                onClick={onNavigateToSetup}
                className="w-full py-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Launch First Admin Setup Wizard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 block mb-1.5 font-medium">
                Admin Gmail / Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  disabled={lockoutRemaining > 0 || loading}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aibarta24.com or your Gmail"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl text-white placeholder-slate-500 text-xs transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-300 block mb-1.5 font-medium">
                Admin Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  disabled={lockoutRemaining > 0 || loading}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 rounded-xl text-white placeholder-slate-500 text-xs transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 p-0.5 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || lockoutRemaining > 0}
              className="w-full py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-xs shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sign In to Admin Panel</span>
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 text-center leading-relaxed">
            Protected with PBKDF2 cryptographic hashing & brute-force rate limiting.
          </div>
        </div>

        {/* Back to Public Website link */}
        <div className="text-center">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to AI Barta 24 Public Website</span>
          </button>
        </div>
      </div>
    </div>
  );
};
