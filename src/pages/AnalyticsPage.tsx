import { BarChart3, TrendingUp, Users, Heart, Share2, MessageCircle } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analisis Performa</h1>
        <p className="text-neutral-400">Pantau performa konten TikTok dan Instagram kamu.</p>
      </div>

      <div className="bg-blue-900/20 border border-blue-800/50 p-4 rounded-xl flex items-start gap-3">
        <TrendingUp className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-blue-400 text-sm">Fitur Terhubung</p>
          <p className="text-xs text-neutral-400 mt-1">
            Saat ini menampilkan data simulasi. Hubungkan akun TikTok dan Instagram di menu Profil untuk melihat analitik nyata.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">Total Views</span>
          </div>
          <p className="text-3xl font-bold">124.5K</p>
          <p className="text-xs text-green-400 mt-2">+12% dari minggu lalu</p>
        </div>
        
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <Heart className="w-5 h-5" />
            <span className="text-sm font-medium">Total Likes</span>
          </div>
          <p className="text-3xl font-bold">18.2K</p>
          <p className="text-xs text-green-400 mt-2">+5% dari minggu lalu</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <MessageCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Komentar</span>
          </div>
          <p className="text-3xl font-bold">1,432</p>
          <p className="text-xs text-neutral-500 mt-2">Sama dengan minggu lalu</p>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-neutral-400 mb-2">
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">Shares</span>
          </div>
          <p className="text-3xl font-bold">892</p>
          <p className="text-xs text-red-400 mt-2">-2% dari minggu lalu</p>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 h-80 flex flex-col items-center justify-center text-center">
        <BarChart3 className="w-12 h-12 text-neutral-700 mb-4" />
        <p className="font-medium text-neutral-400">Grafik pertumbuhan audiens akan muncul di sini</p>
        <p className="text-sm text-neutral-500 mt-2">Kumpulkan lebih banyak data dengan mempublikasikan video</p>
      </div>
    </div>
  );
}
