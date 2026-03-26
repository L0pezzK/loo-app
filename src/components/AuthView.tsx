'use client';

import { useState } from 'react';
import { Mail, Lock, Globe, Apple, ChevronRight, Loader2, Info, User, MapPin, CheckCircle2 } from 'lucide-react';

interface AuthViewProps {
  onLogin: () => void;
}

export default function AuthView({ onLogin }: AuthViewProps) {
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
      onLogin();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-black font-sans">
      {/* Cinematic Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1502602898657-3e917247a183?auto=format&fit=crop&q=80&w=2000" 
          alt="Paris at night" 
          className="w-full h-full object-cover opacity-50 scale-110 animate-pulse duration-[10000ms]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80"></div>
      </div>

      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 p-8 flex justify-between items-center z-10">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] group-hover:rotate-12 transition-transform">
             <div className="w-5 h-2.5 border-t-2 border-b-2 border-white rounded-sm"></div>
          </div>
          <span className="text-2xl font-black text-white tracking-tighter">LOO</span>
        </div>
        <div className="flex items-center space-x-8">
           <button className="text-white/60 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">About</button>
           <button 
             onClick={() => setMode('signup')}
             className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
           >
             Sign Up
           </button>
        </div>
      </div>

      {/* Main Auth Card */}
      <div className="relative z-10 w-full max-w-md p-6 animate-in zoom-in-95 duration-700">
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[48px] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
          
          <div className="relative text-center mb-10 text-white">
            <h2 className="text-4xl font-black tracking-tighter mb-4">
              {mode === 'login' ? 'Welcome Back' : 'Join the Club'}
            </h2>
            <p className="text-white/40 text-sm font-medium">
              {mode === 'login' ? 'Please enter your credentials to continue exploring Paris.' : 'Find your way in Paris with ease.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'signup' && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[var(--accent)] transition-colors" />
                  <input 
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-5 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--accent)]/40 focus:bg-white/10 transition-all font-medium text-sm"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-4">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[var(--accent)] transition-colors" />
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-5 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--accent)]/40 focus:bg-white/10 transition-all font-medium text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Password</label>
                {mode === 'login' && <button type="button" className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest hover:underline">Forgot Password?</button>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-[var(--accent)] transition-colors" />
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-5 pl-14 pr-5 text-white placeholder:text-white/20 focus:outline-none focus:border-[var(--accent)]/40 focus:bg-white/10 transition-all font-medium text-sm"
                  required
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div className="flex items-start space-x-3 px-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-[var(--accent)] focus:ring-[var(--accent)]/20 shadow-[0_0_10px_rgba(0,229,255,0.1)]" required />
                <p className="text-[10px] text-white/40 font-medium leading-relaxed">
                  I agree to the <span className="text-white/60 hover:text-[var(--accent)] cursor-pointer transition-colors">Terms of Service</span> and <span className="text-white/60 hover:text-[var(--accent)] cursor-pointer transition-colors">Privacy Policy</span>.
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
                  <Loader2 className="w-5 h-5 animate-spin text-white" />
                </div>
              )}
            </button>
          </form>

          {mode === 'login' ? (
            <div className="mt-12 animate-in fade-in duration-500">
              <div className="relative flex items-center justify-center mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <span className="relative z-10 px-4 bg-transparent text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Or continue with</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center space-x-3 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all group">
                  <Globe className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">Google</span>
                </button>
                <button className="flex items-center justify-center space-x-3 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all group">
                  <Apple className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  <span className="text-xs font-bold text-white/80 group-hover:text-white transition-colors">Apple</span>
                </button>
              </div>
            </div>
          ) : (
             <div className="mt-12 flex justify-center space-x-4 animate-in fade-in duration-500">
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center space-x-3 group hover:border-[var(--accent)]/30 transition-all">
                   <div className="p-2 bg-[var(--accent)]/10 rounded-lg">
                      <MapPin className="w-4 h-4 text-[var(--accent)]" />
                   </div>
                   <div className="text-left">
                      <span className="block text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">500+ Spots</span>
                      <span className="block text-[8px] font-bold text-white/30 uppercase tracking-tighter">Locally Mapped</span>
                   </div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center space-x-3 group hover:border-[var(--accent)]/30 transition-all">
                   <div className="p-2 bg-[var(--success)]/10 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />
                   </div>
                   <div className="text-left">
                      <span className="block text-[10px] font-black text-white uppercase tracking-widest leading-none mb-1">Verified Clean</span>
                      <span className="block text-[8px] font-bold text-white/30 uppercase tracking-tighter">Community Rated</span>
                   </div>
                </div>
             </div>
          )}

          <p className="mt-12 text-center text-xs font-medium text-white/40">
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
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">© 2024 LOO — Accessible Paris Navigation</p>
      </div>
    </div>
  );
}
