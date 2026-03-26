'use client';

import { useState } from 'react';
import { Mail, Lock, Globe, Apple, ChevronRight, Loader2, Info, User, MapPin, CheckCircle2, Sun, Moon } from 'lucide-react';

interface AuthViewProps {
  onLogin: (name: string) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function AuthView({ onLogin, isDarkMode, onToggleDarkMode }: AuthViewProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth delay for premium feel
    setTimeout(() => {
      setIsLoading(false);
      onLogin(fullName || email.split('@')[0]);
    }, 1500);
  };

  return (
    <div className={`fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden font-sans transition-colors duration-700 ${isDarkMode ? 'bg-black' : 'bg-slate-50'}`}>
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=2000" 
          alt="Paris at night" 
          className={`w-full h-full object-cover scale-110 animate-pulse duration-[10000ms] transition-opacity duration-700 ${isDarkMode ? 'opacity-50' : 'opacity-20'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-br transition-colors duration-700 ${isDarkMode ? 'from-black/80 via-black/40 to-black/80' : 'from-white/80 via-white/40 to-white/80'}`}></div>
      </div>

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-10 text-white">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] group-hover:rotate-12 transition-transform">
             <div className="w-5 h-2.5 border-t-2 border-b-2 border-white rounded-sm"></div>
          </div>
          <span className={`text-2xl font-black tracking-tighter transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>LOO</span>
        </div>
        <div className="flex items-center space-x-6">
           <button 
             onClick={onToggleDarkMode}
             className={`p-3 rounded-xl border transition-all duration-300 ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200 shadow-sm'}`}
           >
             {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
           </button>
           <button className={`text-xs font-bold uppercase tracking-widest transition-colors ${isDarkMode ? 'text-white/60 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>About</button>
           <button 
             onClick={() => setMode('signup')}
             className={`px-6 py-2.5 border rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800 shadow-lg'}`}
           >
             Sign Up
           </button>
        </div>
      </div>

      {/* Main Auth Card */}
      <div className="relative z-10 w-full max-w-md p-6 animate-in zoom-in-95 duration-700">
        <div className={`backdrop-blur-3xl border rounded-[48px] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-700 ${isDarkMode ? 'bg-white/[0.03] border-white/10' : 'bg-white/80 border-white shadow-[0_40px_80px_rgba(0,0,0,0.1)]'}`}>
          <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full -mr-32 -mt-32 transition-colors duration-700 ${isDarkMode ? 'bg-[var(--accent)]/10' : 'bg-[var(--accent)]/20'}`}></div>
          
          <div className="relative text-center mb-10">
            <h2 className={`text-4xl font-black tracking-tighter mb-4 transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {mode === 'login' ? 'Welcome Back' : 'Join the Club'}
            </h2>
            <p className={`text-sm font-medium transition-colors duration-700 ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
              {mode === 'login' ? 'Please enter your credentials to continue exploring Paris.' : 'Find your way in Paris with ease.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className={`text-[10px] font-black uppercase tracking-widest ml-4 transition-colors duration-700 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Full Name</label>
              <div className="relative group text-white">
                <User className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-700 ${isDarkMode ? 'text-white/20 group-focus-within:text-[var(--accent)]' : 'text-slate-300 group-focus-within:text-[var(--accent)]'}`} />
                <input 
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  className={`w-full border rounded-2xl py-5 pl-14 pr-5 transition-all duration-700 font-medium text-sm focus:outline-none focus:border-[var(--accent)]/40 focus:ring-4 focus:ring-[var(--accent)]/10 ${isDarkMode ? 'bg-white/5 border-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-100 border-slate-100 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-white shadow-inner focus:shadow-sm'}`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-widest ml-4 transition-colors duration-700 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Email Address</label>
              <div className="relative group text-white">
                <Mail className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-700 ${isDarkMode ? 'text-white/20 group-focus-within:text-[var(--accent)]' : 'text-slate-300 group-focus-within:text-[var(--accent)]'}`} />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full border rounded-2xl py-5 pl-14 pr-5 transition-all duration-700 font-medium text-sm focus:outline-none focus:border-[var(--accent)]/40 focus:ring-4 focus:ring-[var(--accent)]/10 ${isDarkMode ? 'bg-white/5 border-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-100 border-slate-100 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-white shadow-inner focus:shadow-sm'}`}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className={`text-[10px] font-black uppercase tracking-widest transition-colors duration-700 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>Password</label>
                {mode === 'login' && <button type="button" className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest hover:underline transition-colors duration-700">Forgot Password?</button>}
              </div>
              <div className="relative group text-white">
                <Lock className={`absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-700 ${isDarkMode ? 'text-white/20 group-focus-within:text-[var(--accent)]' : 'text-slate-300 group-focus-within:text-[var(--accent)]'}`} />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full border rounded-2xl py-5 pl-14 pr-5 transition-all duration-700 font-medium text-sm focus:outline-none focus:border-[var(--accent)]/40 focus:ring-4 focus:ring-[var(--accent)]/10 ${isDarkMode ? 'bg-white/5 border-white/5 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-100 border-slate-100 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-white shadow-inner focus:shadow-sm'}`}
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="flex items-start space-x-3 px-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <input type="checkbox" className={`mt-1 w-4 h-4 rounded transition-all duration-700 focus:ring-[var(--accent)]/20 shadow-[0_0_10px_rgba(0,229,255,0.1)] ${isDarkMode ? 'border-white/10 bg-white/5 text-[var(--accent)]' : 'border-slate-200 bg-slate-50 text-[var(--accent)]'}`} required />
                <p className={`text-[10px] font-medium leading-relaxed transition-colors duration-700 ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>
                  I agree to the <span className={`transition-colors ${isDarkMode ? 'text-white/60 hover:text-[var(--accent)] cursor-pointer' : 'text-slate-600 hover:text-[var(--accent)] cursor-pointer'}`}>Terms of Service</span> and <span className={`transition-colors ${isDarkMode ? 'text-white/60 hover:text-[var(--accent)] cursor-pointer' : 'text-slate-600 hover:text-[var(--accent)] cursor-pointer'}`}>Privacy Policy</span>.
                </p>
              </div>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-gradient-to-r from-[var(--accent)] to-blue-600 text-[var(--surface)] font-black rounded-2xl shadow-[0_20px_40px_rgba(0,229,255,0.2)] hover:shadow-[0_25px_50px_rgba(0,229,255,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all text-sm uppercase tracking-[0.2em] relative overflow-hidden group"
            >
              <span className={`flex items-center justify-center transition-all duration-300 ${isLoading ? 'opacity-0 scale-90' : 'opacity-100'}`}>
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </span>
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className={`w-5 h-5 animate-spin transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-white'}`} />
                </div>
              )}
            </button>
          </form>

          {mode === 'login' ? (
            <div className="mt-12 animate-in fade-in duration-500">
              <div className="relative flex items-center justify-center mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t transition-colors duration-700 ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}></div>
                </div>
                <span className={`relative z-10 px-4 bg-transparent text-[9px] font-black uppercase tracking-[0.3em] transition-colors duration-700 ${isDarkMode ? 'text-white/20' : 'text-slate-400'}`}>Or continue with</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className={`flex items-center justify-center space-x-3 py-4 border rounded-2xl transition-all duration-700 group ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10' : 'bg-white border-slate-200 hover:border-slate-400 shadow-sm'}`}>
                  <Globe className={`w-4 h-4 transition-colors duration-700 ${isDarkMode ? 'text-white/40 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'}`} />
                  <span className={`text-xs font-bold transition-colors duration-700 ${isDarkMode ? 'text-white/80 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>Google</span>
                </button>
                <button className={`flex items-center justify-center space-x-3 py-4 border rounded-2xl transition-all duration-700 group ${isDarkMode ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10' : 'bg-white border-slate-200 hover:border-slate-400 shadow-sm'}`}>
                  <Apple className={`w-4 h-4 transition-colors duration-700 ${isDarkMode ? 'text-white/40 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-900'}`} />
                  <span className={`text-xs font-bold transition-colors duration-700 ${isDarkMode ? 'text-white/80 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>Apple</span>
                </button>
              </div>
            </div>
          ) : (
             <div className="mt-12 flex justify-center space-x-4 animate-in fade-in duration-500">
                <div className={`border rounded-2xl p-4 flex items-center space-x-3 transition-all duration-700 ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-[var(--accent)]/30' : 'bg-white border-slate-100 hover:border-[var(--accent)]/30 shadow-sm'}`}>
                   <div className="p-2 bg-[var(--accent)]/10 rounded-lg">
                      <MapPin className="w-4 h-4 text-[var(--accent)]" />
                   </div>
                   <div className="text-left">
                      <span className={`block text-[10px] font-black uppercase tracking-widest leading-none mb-1 transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>500+ Spots</span>
                      <span className={`block text-[8px] font-bold uppercase tracking-tighter transition-colors duration-700 ${isDarkMode ? 'text-white/30' : 'text-slate-400'}`}>Locally Mapped</span>
                   </div>
                </div>
                <div className={`border rounded-2xl p-4 flex items-center space-x-3 transition-all duration-700 ${isDarkMode ? 'bg-white/5 border-white/5 hover:border-[var(--accent)]/30' : 'bg-white border-slate-100 hover:border-[var(--accent)]/30 shadow-sm'}`}>
                   <div className="p-2 bg-[var(--success)]/10 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                   </div>
                   <div className="text-left">
                      <span className={`block text-[10px] font-black uppercase tracking-widest leading-none mb-1 transition-colors duration-700 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Verified Clean</span>
                      <span className={`block text-[8px] font-bold uppercase tracking-tighter transition-colors duration-700 ${isDarkMode ? 'text-white/30' : 'text-slate-400'}`}>Community Rated</span>
                   </div>
                </div>
             </div>
          )}

          <p className={`mt-12 text-center text-xs font-medium transition-colors duration-700 ${isDarkMode ? 'text-white/40' : 'text-slate-500'}`}>
            {mode === 'login' ? (
              <>Don't have an account? <button onClick={() => setMode('signup')} className="text-[var(--accent)] font-black hover:underline uppercase tracking-widest ml-1 text-[10px]">Sign up for free</button></>
            ) : (
              <>Already a member? <button onClick={() => setMode('login')} className="text-[var(--accent)] font-black hover:underline uppercase tracking-widest ml-1 text-[10px]">Sign In</button></>
            )}
          </p>
        </div>
      </div>

      {/* Aesthetic Footer */}
      <div className="absolute bottom-12 left-0 right-0 text-center animate-in slide-in-from-bottom-8 duration-1000 delay-300">
        <p className={`text-[10px] font-black uppercase tracking-[0.4em] transition-colors duration-700 ${isDarkMode ? 'text-white/20' : 'text-slate-400/60'}`}>© 2024 LOO — Accessible Paris Navigation</p>
      </div>
    </div>
  );
}
