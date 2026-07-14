import React, { useState, useRef } from 'react';
import { Upload, Film, Scissors, Loader2, Sparkles, Youtube } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../lib/firebase';

const CATEGORIES = [
  "Edukasi", "Vlog & Lifestyle", "Podcast", "Musik / K-Pop", "Komedi", "Gaming", "Berita", "Lainnya"
];

const DURATIONS = [
  "15s-30s", "30s-60s", "60s-90s"
];

const RESOLUTIONS = [
  { label: '480p', reqPlan: 'Free' },
  { label: '720p', reqPlan: 'Free' },
  { label: '1080p', reqPlan: 'M-Pro' },
  { label: '4K', reqPlan: 'M-Premium' },
];

export default function CreatePage() {
  const { userProfile, setUserProfile } = useStore();
  
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [clipCount, setClipCount] = useState(1);
  const [duration, setDuration] = useState(DURATIONS[0]);
  const [resolution, setResolution] = useState(RESOLUTIONS[1].label);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canUseHighRes = (resLabel: string) => {
    if (userProfile?.plan === 'Admin') return true;
    if (resLabel === '480p' || resLabel === '720p') return true;
    if (resLabel === '1080p') return ['M-Pro', 'M-Premium', 'M-Vip'].includes(userProfile?.plan || '');
    if (resLabel === '4K') return ['M-Premium', 'M-Vip'].includes(userProfile?.plan || '');
    return false;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith('video/')) {
        setFile(selectedFile);
        setErrorMsg('');
      } else {
        setErrorMsg('Tolong unggah file video yang valid (MP4, MOV, dsb).');
        setFile(null);
      }
    }
  };

  const handleGenerate = async () => {
    if (!file) {
      setErrorMsg('Harap unggah video terlebih dahulu.');
      return;
    }
    if (userProfile?.plan !== 'Admin') {
      if ((userProfile?.dailyUsageCount || 0) >= 5) {
        setErrorMsg('Batas harian 5 proyek telah tercapai. Silakan coba lagi besok.');
        return;
      }
      if ((userProfile?.mecralBalance || 0) < 10) {
        setErrorMsg('Mecral tidak cukup. Butuh 10 Mecral untuk melakukan generate.');
        return;
      }
    }

    setIsProcessing(true);
    setErrorMsg('');
    setProcessStatus('Menganalisis video (pre-check)...');

    // Simulate AI pipeline
    setTimeout(() => {
      setProcessStatus('Menganalisis audio dan transkrip...');
    }, 2000);

    setTimeout(() => {
      setProcessStatus('Mencari momen terbaik (hook)...');
    }, 4500);

    setTimeout(() => {
      setProcessStatus('Memotong klip...');
    }, 7000);

    setTimeout(async () => {
      setIsProcessing(false);
      setProcessStatus('');
      
      // Update usage in DB and Store
      if (userProfile && userProfile.plan !== 'Admin') {
        const userRef = doc(db, 'users', userProfile.uid);
        await updateDoc(userRef, {
          dailyUsageCount: increment(1),
          mecralBalance: increment(-10)
        });
        
        setUserProfile({
          ...userProfile,
          dailyUsageCount: userProfile.dailyUsageCount + 1,
          mecralBalance: userProfile.mecralBalance - 10
        });
      }
      
      alert(`Berhasil membuat ${clipCount} klip! Klip telah disimpan di Proyek/Riwayat.`);
    }, 9000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Buat Klip AI</h1>
          <p className="text-neutral-400">Unggah video kamu, biarkan AI Meo Studio memotong momen terbaik secara otomatis.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Upload */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Upload className="text-red-500" /> 1. Unggah Video</h2>
            
            <div 
              onClick={() => !isProcessing && fileInputRef.current?.click()}
              className={cn(
                "border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors",
                file ? "border-red-500 bg-red-500/5" : "border-neutral-700 hover:border-neutral-500 hover:bg-neutral-800/50",
                isProcessing && "opacity-50 cursor-not-allowed"
              )}
            >
              <input 
                type="file" 
                accept="video/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
                disabled={isProcessing}
              />
              <Film className={cn("w-12 h-12 mb-4", file ? "text-red-500" : "text-neutral-500")} />
              {file ? (
                <div>
                  <p className="font-semibold text-white">{file.name}</p>
                  <p className="text-sm text-neutral-400 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  <button className="mt-4 text-xs bg-neutral-800 px-3 py-1 rounded text-neutral-300 hover:text-white">Ganti File</button>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-white">Klik atau seret video ke sini</p>
                  <p className="text-sm text-neutral-400 mt-1">Mendukung MP4, MOV, WebM (Maks 2GB)</p>
                </div>
              )}
            </div>
            
            {errorMsg && <p className="mt-4 text-red-400 text-sm">{errorMsg}</p>}
          </div>

          {/* YouTube Discover Tool - Separate Card */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-2 flex items-center gap-2"><Youtube className="text-red-500" /> Asisten Penemuan (YouTube)</h2>
            <p className="text-sm text-neutral-400 mb-4">Punya link YouTube tapi bingung cari ide? Tempel link di sini untuk melihat saran hook. (Kamu tetap harus mengunggah file videomu sendiri di atas).</p>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="https://youtube.com/watch?v=..." 
                className="flex-1 bg-neutral-950 border border-neutral-700 rounded-md p-3 text-sm focus:outline-none focus:border-red-500" 
                id="yt-input"
              />
              <button 
                className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-md font-medium text-sm transition-colors border border-neutral-700"
                onClick={async () => {
                  const val = (document.getElementById('yt-input') as HTMLInputElement).value;
                  if(!val) return;
                  try {
                    const btn = document.getElementById('yt-btn');
                    if (btn) btn.innerText = "Memproses...";
                    const res = await fetch('/api/analyze-hook', {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({ youtubeUrl: val })
                    });
                    const data = await res.json();
                    alert(data.result || data.error);
                  } finally {
                    const btn = document.getElementById('yt-btn');
                    if (btn) btn.innerText = "Analisis Link";
                  }
                }}
                id="yt-btn"
              >
                Analisis Link
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="space-y-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
            
            <div>
              <h3 className="text-sm font-semibold text-neutral-300 mb-3">2. Kategori Konten</h3>
              <select 
                disabled={isProcessing}
                value={category} 
                onChange={e => setCategory(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-md p-3 text-sm focus:outline-none focus:border-red-500"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-300 mb-3">3. Jumlah Klip</h3>
              <div className="grid grid-cols-5 gap-2">
                {Array.from({length: 10}).map((_, i) => (
                  <button
                    key={i+1}
                    disabled={isProcessing}
                    onClick={() => setClipCount(i+1)}
                    className={cn(
                      "py-2 text-sm rounded-md font-medium transition-colors border",
                      clipCount === i+1 ? "bg-red-600 border-red-500 text-white" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600"
                    )}
                  >
                    {i+1}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-300 mb-3">4. Durasi Target</h3>
              <select 
                disabled={isProcessing}
                value={duration} 
                onChange={e => setDuration(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-md p-3 text-sm focus:outline-none focus:border-red-500"
              >
                {DURATIONS.map(dur => <option key={dur} value={dur}>{dur}</option>)}
              </select>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-300 mb-3">5. Resolusi Output</h3>
              <div className="grid grid-cols-2 gap-2">
                {RESOLUTIONS.map(res => {
                  const allowed = canUseHighRes(res.label);
                  return (
                    <button
                      key={res.label}
                      disabled={isProcessing || !allowed}
                      onClick={() => setResolution(res.label)}
                      className={cn(
                        "py-2 px-3 text-sm rounded-md font-medium flex items-center justify-between border transition-colors",
                        resolution === res.label ? "bg-blue-600/20 border-blue-500 text-blue-400" : "bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-600",
                        !allowed && "opacity-50 cursor-not-allowed bg-neutral-900 border-neutral-900"
                      )}
                    >
                      <span>{res.label}</span>
                      {!allowed && <span className="text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded text-neutral-500">{res.reqPlan}</span>}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-neutral-300 mb-3">6. Rentang Waktu (Trim)</h3>
              <div className="bg-neutral-950 border border-neutral-800 rounded-md p-4">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="0" 
                  disabled={isProcessing}
                  className="w-full accent-red-500" 
                />
                <div className="flex justify-between mt-2 text-xs text-neutral-500">
                  <span>Mulai: 00:00</span>
                  <span>Selesai: Full Video</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-neutral-300">Biaya:</span>
                <span className="font-bold text-yellow-500">10 Mecral</span>
              </div>
              <p className="text-xs text-neutral-500 mb-4">Aksi ini akan memotong saldo Mecral kamu.</p>
              
              <button
                onClick={handleGenerate}
                disabled={isProcessing}
                className="w-full py-4 bg-red-600 hover:bg-red-700 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Generate {clipCount} Klip
                  </>
                )}
              </button>
            </div>

          </div>

          {isProcessing && (
            <div className="bg-blue-900/20 border border-blue-800/50 p-4 rounded-xl flex items-start gap-3">
              <Loader2 className="w-5 h-5 animate-spin text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-blue-400 text-sm">{processStatus}</p>
                <p className="text-xs text-neutral-400 mt-1">Harap jangan menutup halaman ini.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
