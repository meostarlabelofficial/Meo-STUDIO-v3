import { FileVideo, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HistoryPage() {
  // Simulasi riwayat
  const history = [
    { id: '1', title: 'Podcast Episode 45.mp4', clips: 5, date: '12 Jul 2026', status: 'Selesai' },
    { id: '2', title: 'Vlog Bali Trip.mov', clips: 3, date: '10 Jul 2026', status: 'Selesai' },
    { id: '3', title: 'K-Pop Reaction.mp4', clips: 8, date: '08 Jul 2026', status: 'Selesai' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold mb-2">Proyek / Riwayat</h1>
        <p className="text-neutral-400">Lihat klip video yang telah kamu buat sebelumnya.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map(item => (
          <div key={item.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-700 transition-colors flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center shrink-0">
                <FileVideo className="w-5 h-5 text-red-500" />
              </div>
              <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded font-medium border border-green-800/50">
                {item.status}
              </span>
            </div>
            
            <h3 className="font-bold text-white truncate mb-1">{item.title}</h3>
            <p className="text-sm text-neutral-400 mb-4">{item.clips} klip dihasilkan</p>
            
            <div className="mt-auto pt-4 border-t border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <Calendar className="w-3.5 h-3.5" /> {item.date}
              </div>
              <Link to="/dashboard/edit" className="text-sm font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1">
                Buka di Editor <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
