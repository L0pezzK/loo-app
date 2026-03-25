'use client';

import { useState } from 'react';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield, 
  Accessibility, 
  Monitor, 
  Mail, 
  Lock, 
  CheckCircle2, 
  ChevronRight, 
  Trash2, 
  Download,
  Moon,
  Globe,
  Map as MapIcon
} from 'lucide-react';
import EditProfileModal from './EditProfileModal';

import { translations, Language } from '@/data/translations';

interface ProfileViewProps {
  savedCount: number;
  reviewCount: number;
  profile: { name: string; bio: string; avatar: string };
  onUpdateProfile: (profile: any) => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  activeLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function ProfileView({ 
  savedCount, 
  reviewCount, 
  profile, 
  onUpdateProfile, 
  isDarkMode, 
  onToggleDarkMode,
  activeLanguage,
  onLanguageChange
}: ProfileViewProps) {
  const t = translations[activeLanguage];
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages: { id: Language; label: string; flag: string }[] = [
    { id: 'en', label: 'English (US)', flag: '🇺🇸' },
    { id: 'fr', label: 'Français (FR)', flag: '🇫🇷' },
    { id: 'es', label: 'Español (ES)', flag: '🇪🇸' },
  ];

  return (
    <div className="flex-1 bg-[var(--background)] flex overflow-hidden lg:h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {isEditModalOpen && (
        <EditProfileModal 
          isOpen={isEditModalOpen} 
          onClose={() => setIsEditModalOpen(false)} 
          onSave={(newProfile) => {
            onUpdateProfile(newProfile);
          }} 
          initialProfile={profile} 
        />
      )}
      {/* Sidebar */}
      <aside className="w-80 border-r border-white/5 bg-black/20 flex flex-col p-8 shrink-0">
        <div className="mb-12">
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">{t.profile.settings}</h2>
          <p className="text-[var(--text-secondary)] text-xs font-bold uppercase tracking-widest">{t.profile.manage_prefs}</p>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { label: 'General', icon: Settings, active: false },
            { label: 'Account', icon: User, active: true },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl transition-all ${item.active ? 'bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 shadow-[0_0_20px_rgba(0,229,255,0.1)]' : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-black text-sm uppercase tracking-widest">{item.label}</span>
              {item.active && <div className="ml-auto w-1.5 h-1.5 bg-[var(--accent)] rounded-full shadow-[0_0_10px_var(--accent)]"></div>}
            </button>
          ))}
        </nav>

        <button className="flex items-center space-x-4 px-6 py-5 rounded-2xl text-[var(--error)]/60 hover:text-[var(--error)] hover:bg-[var(--error)]/10 transition-all border border-transparent hover:border-[var(--error)]/20 mt-auto">
          <LogOut className="w-5 h-5" />
          <span className="font-black text-sm uppercase tracking-widest">Sign Out</span>
        </button>
      </aside>

      {/* Main Content Dashboard */}
      <main className="flex-1 overflow-y-auto custom-scrollbar p-12">
        <div className="max-w-4xl mx-auto space-y-10 pb-32">
          
          {/* Profile Header Widget */}
          <div className="bg-gradient-to-br from-[var(--surface)] to-transparent border border-white/5 rounded-[48px] p-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
            
            <div className="flex items-center space-x-8 relative z-10">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-[var(--accent)] p-1 overflow-hidden shadow-2xl skew-y-1">
                  <img src={profile.avatar} alt="Profile" className="w-full h-full object-cover rounded-full -skew-y-1" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[var(--accent)] text-[var(--surface)] text-[9px] font-black px-3 py-1 rounded-full border-4 border-[#0a0c10] uppercase tracking-widest shadow-lg">
                  GUIDE
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-4xl font-black text-white tracking-tighter leading-none">{profile.name}</h3>
                  <span className="bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center space-x-1">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Pro Member</span>
                  </span>
                </div>
                <p className="text-[var(--text-secondary)] font-medium max-w-sm text-sm leading-relaxed mb-6">
                  {profile.bio}
                </p>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => setIsEditModalOpen(true)}
                    className="bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[var(--accent)] hover:text-[var(--surface)] transition-all"
                  >
                    {t.profile.edit_profile}
                  </button>
                  <button className="bg-white/5 text-white/40 border border-white/10 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:text-white hover:bg-white/10 transition-all">
                    {t.profile.share_stats}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 relative z-10 w-full md:w-auto">
              <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex-1 md:w-32 text-center group/stat hover:border-[var(--accent)]/30 transition-all">
                <span className="block text-[var(--text-secondary)] text-[8px] font-black uppercase tracking-widest mb-1 group-hover/stat:text-[var(--accent)] transition-colors">Reviews</span>
                <span className="text-3xl font-black text-white tracking-tighter">{reviewCount}</span>
              </div>
              <div className="bg-black/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex-1 md:w-32 text-center group/stat hover:border-[var(--accent)]/30 transition-all">
                <span className="block text-[var(--text-secondary)] text-[8px] font-black uppercase tracking-widest mb-1 group-hover/stat:text-[var(--accent)] transition-colors">Saved</span>
                <span className="text-3xl font-black text-white tracking-tighter">{savedCount}</span>
              </div>
            </div>
          </div>

          {/* Grid Layout for Settings Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Account Information */}
            <div className="bg-[var(--surface)]/40 border border-white/5 rounded-[40px] p-8 space-y-8">
              <div className="flex items-center space-x-4 mb-2">
                <User className="w-5 h-5 text-[var(--accent)]" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">{t.profile.account_info}</h4>
              </div>
              <div className="space-y-6">
                <div className="flex flex-col space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Email Address</label>
                   <div className="flex items-center justify-between bg-black/20 border border-white/5 rounded-2xl p-4">
                     <span className="text-sm font-bold text-white/80">m.antoine@example.com</span>
                     <Mail className="w-4 h-4 text-white/20 hover:text-[var(--accent)] cursor-pointer transition-colors" />
                   </div>
                </div>
                <div className="flex flex-col space-y-2">
                   <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Password</label>
                   <div className="flex items-center justify-between bg-black/20 border border-white/5 rounded-2xl p-4">
                     <span className="text-sm font-bold text-white/80">••••••••••••</span>
                     <button className="text-[10px] font-black text-[var(--accent)] hover:underline uppercase tracking-widest">Change</button>
                   </div>
                </div>
                <div className="flex items-center space-x-3 text-[var(--success)] bg-[var(--success)]/5 px-4 py-3 rounded-2xl border border-[var(--success)]/10">
                   <CheckCircle2 className="w-4 h-4" />
                   <span className="text-[10px] font-black uppercase tracking-widest">Verified Phone: +33 6 •• •• •• 89</span>
                </div>
              </div>
            </div>

            {/* Accessibility Settings */}
            <div className="bg-[var(--surface)]/40 border border-white/5 rounded-[40px] p-8 space-y-8">
              <div className="flex items-center space-x-4 mb-2">
                <Accessibility className="w-5 h-5 text-[var(--accent)]" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">{t.profile.accessibility}</h4>
              </div>
              <p className="text-[var(--text-secondary)] text-sm font-medium leading-relaxed">
                Customize your search experience to highlight specific facility needs.
              </p>
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-white font-bold text-sm">Wheelchair access</h5>
                    <p className="text-[var(--text-secondary)] text-[10px] font-medium leading-relaxed">Default filter for all searches</p>
                  </div>
                  <div className="w-12 h-6 bg-[var(--accent)] rounded-full relative p-1 cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-[var(--surface)] rounded-full shadow-lg"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="text-white font-bold text-sm">Gender Neutral</h5>
                    <p className="text-[var(--text-secondary)] text-[10px] font-medium leading-relaxed">Prioritize inclusive spaces</p>
                  </div>
                  <div className="w-12 h-6 bg-white/10 rounded-full relative p-1 cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white/40 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* App Settings */}
            <div className="bg-[var(--surface)]/40 border border-white/5 rounded-[40px] p-8 space-y-8">
              <div className="flex items-center space-x-4 mb-2">
                <Monitor className="w-5 h-5 text-[var(--accent)]" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">{t.profile.app_settings}</h4>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between relative">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-4 h-4 text-white/40" />
                    <span className="text-sm font-bold text-white/80">{t.profile.language}</span>
                  </div>
                  <div className="relative">
                    <button 
                      onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                      className="flex items-center space-x-3 text-[var(--text-secondary)] hover:text-white cursor-pointer px-4 py-2 bg-white/5 rounded-xl border border-white/5 transition-all hover:border-[var(--accent)]/30 group"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none">
                        {languages.find(l => l.id === activeLanguage)?.label}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${isLangMenuOpen ? 'rotate-90' : ''}`} />
                    </button>

                    {isLangMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--surface)] border border-white/10 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in zoom-in-95 fade-in duration-200">
                        {languages.map((lang) => (
                          <button
                            key={lang.id}
                            onClick={() => {
                              onLanguageChange(lang.id);
                              setIsLangMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors ${activeLanguage === lang.id ? 'text-[var(--accent)] font-bold' : 'text-white/60'}`}
                          >
                            <span className="text-xs">{lang.label}</span>
                            <span className="text-sm">{lang.flag}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Moon className={`w-4 h-4 ${isDarkMode ? 'text-[var(--accent)]' : 'text-slate-400'}`} />
                    <span className="text-sm font-bold text-white/80">{t.profile.dark_mode}</span>
                  </div>
                  <button 
                    onClick={onToggleDarkMode}
                    className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors duration-300 ${isDarkMode ? 'bg-[var(--accent)]' : 'bg-slate-200'}`}
                  >
                    <div className={`w-4 h-4 bg-white rounded-full shadow-lg transition-transform duration-300 transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center space-x-3">
                    <MapIcon className="w-4 h-4 text-white/40" />
                    <span className="text-sm font-bold text-white/80">{t.profile.offline_maps}</span>
                  </div>
                  <span className="text-xs font-black text-[var(--accent)] uppercase tracking-widest">240MB</span>
                </div>
              </div>
            </div>

            {/* Privacy & Security */}
            <div className="bg-[var(--surface)]/40 border border-white/5 rounded-[40px] p-8 space-y-8">
              <div className="flex items-center space-x-4 mb-2">
                <Shield className="w-5 h-5 text-[var(--accent)]" />
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white">Privacy & Security</h4>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-black/20 p-4 rounded-2xl border border-white/5 group hover:border-[var(--accent)]/30 transition-all cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center text-white/40 group-hover:text-[var(--accent)]">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="text-white font-bold text-sm">Anonymous Reviews</h5>
                      <p className="text-[var(--text-secondary)] text-[10px] font-medium leading-relaxed">Hide your identity on public toilet reviews.</p>
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-[var(--accent)] flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-[var(--accent)] rounded-full"></div>
                  </div>
                </div>
                <div className="flex flex-col space-y-3">
                  <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/5 hover:bg-white/5 transition-all group">
                    <div className="flex items-center space-x-3 text-white/60 group-hover:text-white transition-colors">
                      <Download className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-widest">Export My Data</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-all transform group-hover:translate-x-1" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 rounded-2xl border border-[var(--error)]/20 hover:bg-[var(--error)]/5 transition-all group">
                    <div className="flex items-center space-x-3 text-[var(--error)]/40 group-hover:text-[var(--error)] transition-colors">
                      <Trash2 className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-widest">Delete Account</span>
                    </div>
                    <Trash2 className="w-4 h-4 text-[var(--error)]/20 group-hover:text-[var(--error)]/40 transition-all" />
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
