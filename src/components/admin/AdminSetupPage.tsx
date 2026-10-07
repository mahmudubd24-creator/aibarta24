import React, { useState } from 'react';
import {
  createFirstAdmin,
  isAdminSetupCompleted,
} from '../../services/authCrypto';
import {
  ShieldCheck,
  Lock,
  Mail,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Eye,
  EyeOff,
  Home,
  KeyRound,
} from 'lucide-react';

interface AdminSetupPageProps {
  onSuccess: () => void;
  onNavigateToLogin: () => void;
  onBackToHome: () => void;
}

export const AdminSetupPage: React.FC<AdminSetupPageProps> = ({
  onSuccess,
  onNavigateToLogin,
  onBackToHome,
}) => {
  // If env variable is provided (e.g. VITE_ADMIN_EMAIL in Netlify), prefill it
  const envAdminEmail = (import.meta as any).env?.VITE_ADMIN_EMAIL || '';

  const [email, setEmail] = useState(envAdminEmail || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isSetupDone = isAdminSetupCompleted();

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (isSetupDone) {
      setError('Admin setup has already been completed and permanently locked.');
      return;
    }

    if (!email || !email.includes('@')) {
      setError('Please provide a valid Admin Gmail or Email address.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long for security.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password and Confirm Password do not match.');
      return;
    }

    setLoading(true);
    try {
      const result = await createFirstAdmin(email, password);
      if (result.success) {
        onSuccess();
      } else {
        setError(result.message);
      }
    } catch (err: any) {
      setError(err?.message || 'Error occurred while creating admin credentials.');
    } finally {
      setLoading(false);
    }
  };

  // If already completed, display the locked state
  if (isSetupDone) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white">Setup Already Completed & Locked</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your first Admin account is already configured. For security reasons, the initial setup wizard has been permanently disabled.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={onNavigateToLogin}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Go to Admin Login</span>
            </button>
            <button
              onClick={onBackToHome}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs cursor-pointer"
            >
              Back to Public Website
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[300px] bg-cyan-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-500 text-white shadow-xl shadow-cyan-500/20 mb-2">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            First Admin Setup
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Provision Master Admin Credentials for Mahmudul Hasan
          </p>
        </div>

        {/* Setup Card */}
        <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-5">
          
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 font-semibold text-cyan-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>One-Time Security Initialization</span>
            </div>
            <p className="leading-relaxed">
              This setup can only be executed once. Once configured, your credentials will be salted & hashed using PBKDF2-SHA-256 and stored securely.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSetup} className="space-y-4 text-xs">
            <div>
              <label className="text-slate-300 block mb-1.5 font-medium">
                Admin Gmail / Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. mahmudubd24@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-white placeholder-slate-500 text-xs"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                You will use this email address to sign into `/admin/login`.
              </p>
            </div>

            <div>
              <label className="text-slate-300 block mb-1.5 font-medium">
                Master Admin Password * (minimum 8 characters)
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-9 pr-10 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-white placeholder-slate-500 text-xs font-mono"
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

            <div>
              <label className="text-slate-300 block mb-1.5 font-medium">
                Confirm Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type password"
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 focus:border-cyan-500 rounded-xl text-white placeholder-slate-500 text-xs font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-cyan-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {loading ? (
                <span>Generating Cryptographic Keys...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Save Credentials & Lock Setup</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={onNavigateToLogin}
              className="text-xs text-cyan-400 hover:underline cursor-pointer"
            >
              Already have an admin account? Sign in here
            </button>
          </div>
        </div>

        {/* Back to Public Site */}
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
