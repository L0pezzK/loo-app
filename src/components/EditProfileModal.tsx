'use client';

import { useState, useRef, useEffect } from 'react';
import { X, User, Type, Save, CheckCircle2, Image as ImageIcon, Camera, Upload, RotateCcw } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profile: any) => void;
  initialProfile: { name: string; bio: string; avatar: string };
}

export default function EditProfileModal({ isOpen, onClose, onSave, initialProfile }: EditProfileModalProps) {
  const [profile, setProfile] = useState(initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sync state when initialProfile changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setProfile(initialProfile);
      setIsSuccess(false);
    }
  }, [isOpen, initialProfile]);

  const avatars = [
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=400",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
  ];

  if (!isOpen && !isSuccess) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      setIsCameraOpen(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      setProfile({ ...profile, avatar: dataUrl });
      closeCamera();
    }
  };

  const closeCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
    setIsCameraOpen(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate save
    setTimeout(() => {
      onSave(profile);
      setIsSaving(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 1500);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-500"
        onClick={onClose}
      ></div>

      <div className="relative w-full max-w-xl bg-[var(--surface)] border border-white/10 rounded-[48px] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in fade-in duration-500">
        
        {isSuccess ? (
          <div className="p-20 text-center flex flex-col items-center justify-center space-y-6">
            <div className="w-24 h-24 bg-[var(--accent)]/10 rounded-full flex items-center justify-center border-4 border-[var(--accent)]/30 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-[var(--accent)]" />
            </div>
            <h3 className="text-3xl font-black text-white tracking-tighter">Profile Updated!</h3>
            <p className="text-[var(--text-secondary)] text-sm max-w-[200px] mx-auto">Your identity has been reset on the relief map.</p>
          </div>
        ) : (
          <form onSubmit={handleSave} className="flex flex-col h-full">
            {/* Header */}
            <div className="p-8 pb-4 flex justify-between items-center border-b border-white/5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[var(--accent)]/10 rounded-2xl flex items-center justify-center border border-[var(--accent)]/20">
                  <User className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <h2 className="text-2xl font-black text-white tracking-tight">Edit Identity</h2>
              </div>
              <button 
                type="button"
                onClick={onClose}
                className="p-3 hover:bg-white/5 rounded-full transition-all text-white/40 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              
              {/* Profile Image Section */}
              <div className="flex flex-col items-center space-y-6">
                <div className="relative group">
                  <div className="w-40 h-40 rounded-3xl border-4 border-white/5 p-1 overflow-hidden shadow-2xl transition-all group-hover:border-[var(--accent)]/30">
                    <img src={profile.avatar} className="w-full h-full object-cover rounded-2xl" alt="Live Preview" />
                  </div>
                  {isCameraOpen ? (
                     <div className="absolute inset-0 rounded-3xl overflow-hidden bg-black z-20 border-4 border-[var(--accent)]">
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                        <div className="absolute bottom-2 inset-x-2 flex justify-between">
                          <button type="button" onClick={closeCamera} className="p-2 bg-black/60 rounded-xl text-white hover:bg-black transition-all">
                            <X className="w-4 h-4" />
                          </button>
                          <button type="button" onClick={capturePhoto} className="px-4 py-2 bg-[var(--accent)] text-[var(--surface)] text-[10px] font-black uppercase rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all">
                            Shoot
                          </button>
                        </div>
                     </div>
                  ) : (
                    <div className="absolute -bottom-2 -right-2 flex flex-col space-y-2">
                       <input 
                         type="file" 
                         ref={fileInputRef} 
                         onChange={handleFileChange} 
                         className="hidden" 
                         accept="image/*" 
                       />
                       <button 
                         type="button"
                         onClick={() => fileInputRef.current?.click()}
                         className="w-10 h-10 bg-white shadow-xl rounded-xl flex items-center justify-center text-[var(--surface)] hover:scale-110 active:scale-90 transition-all"
                       >
                         <Upload className="w-5 h-5" />
                       </button>
                       <button 
                         type="button"
                         onClick={startCamera}
                         className="w-10 h-10 bg-[var(--accent)] shadow-xl rounded-xl flex items-center justify-center text-[var(--surface)] hover:scale-110 active:scale-90 transition-all"
                       >
                         <Camera className="w-5 h-5" />
                       </button>
                    </div>
                  )}
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </div>

              {/* Avatar Presets */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block">Or use a preset</label>
                  <button type="button" onClick={() => setProfile({...profile, avatar: initialProfile.avatar})} className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-white transition-colors">
                    <RotateCcw className="w-3 h-3" />
                    <span className="text-[8px] font-black uppercase tracking-widest leading-none">Reset</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-4">
                  {avatars.map((url) => (
                    <button
                      key={url}
                      type="button"
                      onClick={() => setProfile({ ...profile, avatar: url })}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden border-4 transition-all hover:scale-110 active:scale-90 ${profile.avatar === url ? 'border-[var(--accent)] shadow-[0_0_20px_rgba(0,229,255,0.2)]' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={url} className="w-full h-full object-cover" alt="Avatar preset" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block">Name</label>
                <div className="relative group">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-[var(--accent)] transition-colors" />
                  <input
                    required
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-[var(--background)] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white font-bold focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-all"
                  />
                </div>
              </div>

              {/* Bio Input */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 block">Bio</label>
                <textarea
                  required
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-[var(--background)] border border-white/5 rounded-3xl p-6 text-white font-medium resize-none focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/30 transition-all"
                ></textarea>
              </div>

            </div>

            {/* Footer */}
            <div className="p-8 pt-4 border-t border-white/5 flex justify-end">
              <button 
                type="submit"
                disabled={isSaving}
                className="px-10 py-5 bg-[var(--accent)] text-[var(--surface)] font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 flex items-center space-x-3"
              >
                {isSaving ? (
                  <div className="w-5 h-5 border-2 border-[var(--surface)] border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Identity</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
