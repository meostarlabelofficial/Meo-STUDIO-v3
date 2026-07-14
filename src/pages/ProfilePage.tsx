import { useStore } from '../store/useStore';
import { User, Link as LinkIcon, Instagram, Video } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const { user, userProfile } = useStore();
  const [tiktokConnected, setTiktokConnected] = useState(false);
  const [igConnected, setIgConnected] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Profil Pengguna</h1>
        <p className="text-neutral-400">Kelola akun dan integrasi sosial media kamu.</p>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex items-start gap-6">
        <div className="w-20 h-20 bg-neutral-800 rounded-full flex items-center justify-center shrink-0">
          <User className="w-8 h-8 text-neutral-400" />
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold">{userProfile?.name}</h2>
          <p className="text-neutral-400 mb-4">{userProfile?.email}</p>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neutral-950 border border-neutral-800 rounded text-sm font-medium">
            Plan saat ini: <span className="text-blue-400">{userProfile?.plan}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Integrasi Sosial Media</h2>
        <div className="space-y-4">
          
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-950 rounded flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold">TikTok</h3>
                <p className="text-sm text-neutral-400">Publikasi otomatis & analitik</p>
              </div>
            </div>
            <button 
              onClick={() => setTiktokConnected(!tiktokConnected)}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors border ${tiktokConnected ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white text-black hover:bg-gray-200 border-white'}`}
            >
              {tiktokConnected ? 'Putuskan' : 'Hubungkan TikTok'}
            </button>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 rounded flex items-center justify-center">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold">Instagram (Creator/Business)</h3>
                <p className="text-sm text-neutral-400">Publikasi otomatis & analitik Reels</p>
              </div>
            </div>
            <button 
              onClick={() => setIgConnected(!igConnected)}
              className={`px-4 py-2 rounded-md font-medium text-sm transition-colors border ${igConnected ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700'}`}
            >
              {igConnected ? 'Putuskan' : 'Hubungkan Instagram'}
            </button>
          </div>

        </div>
        <p className="text-xs text-neutral-500 mt-4">
          *Catatan: Fitur publikasi otomatis membutuhkan otorisasi OAuth dari masing-masing platform.
        </p>
      </div>
    </div>
  );
}
