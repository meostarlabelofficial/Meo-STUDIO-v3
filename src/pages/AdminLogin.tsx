import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { UserProfile } from '../types';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const userRef = doc(db, 'users', cred.user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const profile = docSnap.data() as UserProfile;
        if (profile.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          setError('Akses ditolak. Anda bukan Admin.');
          auth.signOut();
        }
      }
    } catch (err: any) {
      setError('Email atau password salah.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center p-4 text-white">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Masuk sebagai Admin</h2>
        
        {error && <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 text-sm rounded mb-4">{error}</div>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Email Admin</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-blue-500 transition-colors" />
          </div>
          <button disabled={loading} type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 font-bold rounded mt-2 disabled:opacity-50 transition-colors">
            {loading ? 'Memproses...' : 'Login Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
