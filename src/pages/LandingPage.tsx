import { Link } from 'react-router-dom';
import { Mail, Send, Play } from 'lucide-react'; // Simulating TikTok, Telegram, WhatsApp

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      <header className="p-6 flex justify-between items-center border-b border-neutral-800">
        <div className="flex items-center gap-3">
          {/* Logo Placeholder */}
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-blue-600 rounded flex items-center justify-center text-xl font-bold italic shadow-lg shadow-red-600/20">
            M★
          </div>
          <span className="text-xl font-bold tracking-tight">Meo Studio</span>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-sm font-medium hover:text-red-400 transition-colors">
            Masuk
          </Link>
          <Link to="/register" className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition-colors">
            Daftar Gratis
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">
          Welcome to Meo Studio
        </h1>
        <p className="text-xl text-neutral-400 mb-10 max-w-2xl leading-relaxed">
          Platform AI editing video dan penemuan klip viral untuk kreator konten modern. Ubah 1 video menjadi puluhan konten menarik dalam hitungan menit.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/register" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-md font-bold text-lg transition-colors shadow-lg shadow-red-600/20">
            Mulai Sekarang
          </Link>
          <Link to="/login" className="px-8 py-4 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 rounded-md font-bold text-lg transition-colors text-white">
            Masuk sebagai User
          </Link>
        </div>
      </main>

      <footer className="p-10 border-t border-neutral-800 flex flex-col items-center gap-6">
        <p className="text-neutral-400 font-medium">Hubungi kami</p>
        <div className="flex gap-6 text-neutral-400">
          <a href="#" className="hover:text-white transition-colors flex flex-col items-center gap-2 text-sm"><Mail className="w-6 h-6" /> Email</a>
          <a href="#" className="hover:text-white transition-colors flex flex-col items-center gap-2 text-sm"><Play className="w-6 h-6" /> TikTok</a>
          <a href="#" className="hover:text-blue-400 transition-colors flex flex-col items-center gap-2 text-sm"><Send className="w-6 h-6" /> Telegram</a>
          <a href="https://wa.me/6283181577853" target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors flex flex-col items-center gap-2 text-sm">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            WhatsApp
          </a>
        </div>
      </footer>
    </div>
  );
}
