import { Coins, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function TokenPage() {
  const { userProfile } = useStore();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold mb-2">Token & Saldo</h1>
        <p className="text-neutral-400">Mecral adalah token yang digunakan untuk generate klip AI.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 flex flex-col items-center justify-center text-center">
          <Coins className="w-16 h-16 text-yellow-500 mb-4" />
          <h2 className="text-lg font-semibold text-neutral-400 mb-1">Saldo Mecral</h2>
          <p className="text-5xl font-extrabold text-white">
            {userProfile?.plan === 'Admin' ? '∞' : userProfile?.mecralBalance}
          </p>
          {userProfile?.plan !== 'Admin' && (
             <p className="text-sm text-green-400 mt-2">Direset harian sesuai plan {userProfile?.plan}</p>
          )}
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-center">
          <h3 className="font-bold mb-4">Informasi Penggunaan</h3>
          <ul className="space-y-4 text-sm text-neutral-300">
            <li className="flex justify-between border-b border-neutral-800 pb-2">
              <span>Biaya Generate AI</span>
              <span className="font-bold text-yellow-500">10 Mecral / Aksi</span>
            </li>
            <li className="flex justify-between border-b border-neutral-800 pb-2">
              <span>Penggunaan Hari Ini</span>
              <span className="font-bold text-white">{userProfile?.plan === 'Admin' ? '∞' : `${userProfile?.dailyUsageCount} / 5 batas harian`}</span>
            </li>
            <li className="flex justify-between">
              <span>Waktu Reset</span>
              <span className="font-bold text-neutral-400">Setiap Pukul 00:00 (WIB)</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-900/20 border border-blue-800/50 p-4 rounded-xl flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-blue-400 text-sm">Butuh lebih banyak Mecral?</p>
          <p className="text-xs text-neutral-400 mt-1">
            Jika kamu kehabisan Mecral, kunjungi halaman <a href="/dashboard/langganan" className="text-white underline">Langganan</a> untuk melakukan upgrade.
          </p>
        </div>
      </div>
    </div>
  );
}
