import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useStore } from '../store/useStore';
import { UserProfile, PlanTier } from '../types';
import { Shield, Search, Edit2, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { userProfile, setUser, setUserProfile } = useStore();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    if (!userProfile) return;
    if (userProfile.role !== 'admin') {
      navigate('/dashboard/buat');
      return;
    }

    const fetchUsers = async () => {
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
    };
    fetchUsers();
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

  if (loading) return <div className="min-h-screen bg-neutral-950 text-white p-8">Loading data...</div>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold">Admin Panel - Meo Studio</h1>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-md transition-colors">
            <LogOut className="w-4 h-4" /> Keluar
          </button>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/50">
            <h2 className="font-semibold text-lg">Manajemen Pengguna</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Cari email atau nama..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-700 rounded-md text-sm focus:outline-none focus:border-blue-500 w-64"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-950 text-neutral-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Pengguna</th>
                  <th className="px-6 py-4 font-medium">Role</th>
                  <th className="px-6 py-4 font-medium">Plan Saat Ini</th>
                  <th className="px-6 py-4 font-medium">Sisa Mecral</th>
                  <th className="px-6 py-4 font-medium">Proyek Hari Ini</th>
                  <th className="px-6 py-4 font-medium">Aksi Plan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800">
                {filteredUsers.map(u => (
                  <tr key={u.uid} className="hover:bg-neutral-800/50">
                    <td className="px-6 py-4">
                      <p className="font-medium text-white">{u.name}</p>
                      <p className="text-neutral-500 text-xs">{u.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={u.role === 'admin' ? 'text-blue-400 font-medium' : 'text-neutral-400'}>{u.role}</span>
                    </td>
                    <td className="px-6 py-4 font-medium">{u.plan}</td>
                    <td className="px-6 py-4">{u.role === 'admin' ? '∞' : u.mecralBalance}</td>
                    <td className="px-6 py-4">{u.role === 'admin' ? '∞' : `${u.dailyUsageCount}/5`}</td>
                    <td className="px-6 py-4">
                      {u.role !== 'admin' && (
                        <select 
                          className="bg-neutral-950 border border-neutral-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
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
