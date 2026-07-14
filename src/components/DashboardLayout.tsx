import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { 
  Video, 
  BarChart2, 
  User, 
  CreditCard, 
  Scissors, 
  History, 
  MessageSquare,
  LogOut,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';
import ChatBubble from './ChatBubble';
import MecralIcon from './MecralIcon';

export default function DashboardLayout() {
  const { user, userProfile } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!user || !userProfile) {
    navigate('/login');
    return null;
  }

  const handleLogout = () => {
    signOut(auth);
    navigate('/');
  };

  const navItems = [
    { name: 'Buat Klip', path: '/dashboard/buat', icon: Sparkles },
    { name: 'Video Editor', path: '/dashboard/edit', icon: Scissors },
    { name: 'Proyek Saya', path: '/dashboard/riwayat', icon: History },
    { name: 'Analisis', path: '/dashboard/analisis', icon: BarChart2 },
    { name: 'Token Mecral', path: '/dashboard/token', icon: () => <MecralIcon className="w-5 h-5" /> },
    { name: 'Langganan', path: '/dashboard/langganan', icon: CreditCard },
    { name: 'Profil Akun', path: '/dashboard/profil', icon: User },
    { name: 'Pusat Bantuan', path: '/dashboard/hubungi-admin', icon: MessageSquare },
  ];

  const NavLinks = () => (
    <nav className="flex flex-col gap-1.5 mt-6">
      <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 mb-2 px-4">Menu Utama</div>
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all text-sm font-medium",
              isActive 
                ? "bg-gradient-to-r from-red-600/10 to-blue-600/10 text-red-500 shadow-sm border border-red-500/20" 
                : "text-neutral-400 hover:bg-neutral-800/50 hover:text-neutral-200 border border-transparent"
            )}
          >
            <Icon className={cn("w-5 h-5", isActive ? "text-red-500" : "")} />
            {item.name}
          </Link>
        )
      })}
      <div className="mt-8 px-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl transition-colors text-sm font-medium text-neutral-400 hover:bg-red-900/20 hover:text-red-400 border border-transparent hover:border-red-900/50"
        >
          <LogOut className="w-4 h-4" />
          Keluar
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex font-sans selection:bg-red-500/30">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-neutral-950 border-r border-neutral-900 p-5 shrink-0 z-10 shadow-2xl">
        <div className="flex items-center gap-3 px-2 mb-8 mt-2">
          <div className="w-9 h-9 bg-gradient-to-br from-red-600 to-blue-600 rounded-xl flex items-center justify-center font-bold italic shadow-lg shadow-red-600/20 text-white">M★</div>
          <span className="font-bold text-xl tracking-tight text-white">Meo Studio</span>
        </div>
        
        <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-4 rounded-2xl border border-neutral-800 shadow-inner mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10 pointer-events-none">
             <MecralIcon className="w-16 h-16" />
          </div>
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-neutral-400">Saldo Mecral</span>
              <span className="text-[10px] font-bold bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/30">{userProfile.plan}</span>
            </div>
            <div className="flex items-end gap-2">
              <MecralIcon className="w-7 h-7" />
              <span className="text-2xl font-black tracking-tight leading-none text-white">
                {userProfile.plan === 'Admin' ? '∞' : userProfile.mecralBalance}
              </span>
            </div>
            <div className="w-full bg-neutral-800 rounded-full h-1.5 mt-1 overflow-hidden">
               <div className="bg-gradient-to-r from-red-500 to-blue-500 h-full rounded-full" style={{ width: userProfile.plan === 'Admin' ? '100%' : `${(userProfile.dailyUsageCount / 5) * 100}%` }}></div>
            </div>
            <p className="text-[10px] text-neutral-500 font-medium">Proyek Hari Ini: {userProfile.plan === 'Admin' ? '∞' : `${userProfile.dailyUsageCount}/5`}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <NavLinks />
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-900 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-600 rounded-lg flex items-center justify-center font-bold italic shadow-lg shadow-red-600/20 text-white">M★</div>
          <span className="font-bold tracking-tight text-white">Meo Studio</span>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-neutral-400 hover:text-white transition-colors">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-neutral-950/95 backdrop-blur-sm z-40 overflow-y-auto p-4 flex flex-col">
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 p-4 rounded-2xl border border-neutral-800 shadow-lg mb-6 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-semibold text-neutral-400">Saldo Mecral ({userProfile.plan})</span>
              <div className="flex items-center gap-2">
                <MecralIcon className="w-6 h-6" />
                <span className="text-xl font-black text-white">
                  {userProfile.plan === 'Admin' ? '∞' : userProfile.mecralBalance}
                </span>
              </div>
            </div>
            <div className="text-right flex flex-col gap-1">
               <span className="text-xs font-semibold text-neutral-400">Proyek (Harian)</span>
               <span className="text-sm font-bold text-white">{userProfile.plan === 'Admin' ? '∞' : `${userProfile.dailyUsageCount}/5`}</span>
            </div>
          </div>
          <div className="flex-1">
            <NavLinks />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 md:pt-0 pt-16 h-screen overflow-y-auto bg-[#0a0a0a]">
        <div className="p-4 md:p-8 lg:p-10 max-w-6xl mx-auto w-full min-h-full">
          <Outlet />
        </div>
      </main>

      {/* Floating AI Chat Assistant */}
      <ChatBubble />
    </div>
  );
}
