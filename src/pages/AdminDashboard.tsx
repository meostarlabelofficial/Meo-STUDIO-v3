import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useStore } from '../store/useStore';
import { UserProfile, PlanTier } from '../types';
import { Shield, Search, Edit2, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { userProfile, setUser, setUserProfile } = useStore();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Wait for the auth state to resolve
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate('/admin/login');
        return;
      }
      
      if (userProfile) {
        if (userProfile.role !== 'admin') {
          navigate('/dashboard/buat');
          return;
        }

        try {
          const querySnapshot = await getDocs(collection(db, "users"));
          const usersList: UserProfile[] = [];
          querySnapshot.forEach((doc) => {
            usersList.push(doc.data() as UserProfile);
          });
          setUsers(usersList);
        } catch (error) {
          console.error("Error fetching users: ", error);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => unsubscribe();
  }, [userProfile, navigate]);

  const handleUpdatePlan = async (uid: string, newPlan: PlanTier) => {
    try {
      const userRef = doc(db, 'users', uid);
      
      let newBalance = 20;
      if (newPlan === 'M-Pro') newBalance = 80;
      if (newPlan === 'M-Premium') newBalance = 140;
      if (newPlan === 'M-Vip') newBalance = 240;
      
      await updateDoc(userRef, {
        plan: newPlan,
        mecralBalance: newBalance
      });
      
      setUsers(users.map(u => u.uid === uid ? { ...u, plan: newPlan, mecralBalance: newBalance } : u));
      alert(`Berhasil mengupdate plan menjadi ${newPlan}`);
    } catch (error) {
      console.error("Error updating plan: ", error);
      alert('Gagal mengupdate plan');
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setUser(null);
    setUserProfile(null);
    navigate('/admin/login');
  };

  const filteredUsers = users.filter(u => 
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center font-sans">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-neutral-400 font-medium tracking-wide">Memuat Panel Admin...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 p-8 font-sans selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center pb-6 border-b border-neutral-900">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
               <Shield className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Admin Panel</h1>
              <p className="text-sm text-neutral-500">Meo Studio Management</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-red-900/20 text-neutral-400 hover:text-red-400 rounded-xl transition-colors border border-neutral-800 hover:border-red-900/50 text-sm font-medium">
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>

        <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-neutral-900 flex justify-between items-center bg-gradient-to-br from-neutral-900 to-neutral-950">
            <h2 className="font-semibold text-lg">Manajemen Pengguna</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Cari email atau nama..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 bg-[#0a0a0a] border border-neutral-800 rounded-xl text-sm focus:outline-none focus:border-blue-500 w-72 transition-colors placeholder:text-neutral-600"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-900 text-neutral-500 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="px-6 py-4">Pengguna</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4">Plan Saat Ini</th>
                  <th className="px-6 py-4">Sisa Mecral</th>
                  <th className="px-6 py-4">Proyek Hari Ini</th>
                  <th className="px-6 py-4">Aksi Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900">
                {filteredUsers.map(u => (
                  <tr key={u.uid} className="hover:bg-neutral-900/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-bold text-white">{u.name}</p>
                      <p className="text-neutral-500 text-xs mt-0.5">{u.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider", u.role === 'admin' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-neutral-800 text-neutral-400')}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">{u.plan}</td>
                    <td className="px-6 py-4 font-mono text-neutral-300">{u.role === 'admin' ? '∞' : u.mecralBalance}</td>
                    <td className="px-6 py-4 font-mono text-neutral-300">{u.role === 'admin' ? '∞' : `${u.dailyUsageCount}/5`}</td>
                    <td className="px-6 py-4">
                      {u.role !== 'admin' && (
                        <select 
                          className="bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-1.5 text-sm font-medium focus:outline-none focus:border-blue-500 transition-colors"
                          value={u.plan}
                          onChange={(e) => handleUpdatePlan(u.uid, e.target.value as PlanTier)}
                        >
                          <option value="Free">Free</option>
                          <option value="M-Pro">M-Pro</option>
                          <option value="M-Premium">M-Premium</option>
                          <option value="M-Vip">M-Vip</option>
                        </select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
