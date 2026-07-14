import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { 
  Video, 
  BarChart2, 
  User, 
  CreditCard, 
  Coins, 
  Scissors, 
  History, 
  MessageSquare,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

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
    { name: 'Buat', path: '/dashboard/buat', icon: Video },
    { name: 'Edit', path: '/dashboard/edit', icon: Scissors },
    { name: 'Proyek / Riwayat', path: '/dashboard/riwayat', icon: History },
    { name: 'Analisis', path: '/dashboard/analisis', icon: BarChart2 },
    { name: 'Profil', path: '/dashboard/profil', icon: User },
    { name: 'Langganan', path: '/dashboard/langganan', icon: CreditCard },
    { name: 'Token', path: '/dashboard/token', icon: Coins },
    { name: 'Hubungi Admin', path: '/dashboard/hubungi-admin', icon: MessageSquare },
  ];

  const NavLinks = () => (
    <nav className="flex flex-col gap-2 mt-6">
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          onClick={() => setMobileMenuOpen(false)}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium",
            location.pathname === item.path 
              ? "bg-red-600/10 text-red-500" 
              : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
          )}
        >
          <item.icon className="w-5 h-5" />
          {item.name}
        </Link>
      ))}
      <button 
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm font-medium text-neutral-400 hover:bg-neutral-800 hover:text-white mt-auto"
      >
        <LogOut className="w-5 h-5" />
        Keluar
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-neutral-900 border-r border-neutral-800 p-4 shrink-0">
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-600 rounded flex items-center justify-center font-bold italic shadow-lg shadow-red-600/20">M★</div>
          <span className="font-bold text-lg">Meo Studio</span>
        </div>
        
        <div className="px-4 py-3 bg-neutral-950 rounded-lg border border-neutral-800 flex flex-col gap-1 mb-2">
          <p className="text-xs text-neutral-500 font-medium">Plan Anda</p>
          <p className="text-sm font-bold text-blue-400">{userProfile.plan}</p>
        </div>

        <div className="px-4 py-3 bg-neutral-950 rounded-lg border border-neutral-800 flex flex-col gap-1 mb-2">
          <p className="text-xs text-neutral-500 font-medium">Sisa Mecral</p>
          <p className="text-sm font-bold text-yellow-500 flex items-center gap-1">
            <Coins className="w-4 h-4" /> 
            {userProfile.plan === 'Admin' ? '∞' : userProfile.mecralBalance}
          </p>
        </div>

        <div className="px-4 py-3 bg-neutral-950 rounded-lg border border-neutral-800 flex flex-col gap-1">
          <p className="text-xs text-neutral-500 font-medium">Proyek Hari Ini</p>
          <p className="text-sm font-bold text-white">
            {userProfile.plan === 'Admin' ? '∞' : `${userProfile.dailyUsageCount}/5`}
          </p>
        </div>

        <NavLinks />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-neutral-900 border-b border-neutral-800 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-600 rounded flex items-center justify-center font-bold italic shadow-lg shadow-red-600/20">M★</div>
        </div>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-neutral-400 hover:text-white">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-neutral-900 z-40 overflow-y-auto p-4">
          <div className="grid grid-cols-2 gap-2 mb-6">
             <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 flex flex-col gap-1">
              <p className="text-xs text-neutral-500 font-medium">Sisa Mecral</p>
              <p className="text-sm font-bold text-yellow-500 flex items-center gap-1">
                <Coins className="w-4 h-4" /> 
                {userProfile.plan === 'Admin' ? '∞' : userProfile.mecralBalance}
              </p>
            </div>
            <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 flex flex-col gap-1">
              <p className="text-xs text-neutral-500 font-medium">Proyek Hari Ini</p>
              <p className="text-sm font-bold text-white">
                {userProfile.plan === 'Admin' ? '∞' : `${userProfile.dailyUsageCount}/5`}
              </p>
            </div>
          </div>
          <NavLinks />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 md:pt-0 pt-16 h-screen overflow-y-auto">
        <div className="p-4 md:p-8 max-w-5xl mx-auto w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
