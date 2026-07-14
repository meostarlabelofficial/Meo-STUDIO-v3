import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';
import { useStore } from '../store/useStore';
import { UserProfile } from '../types';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setUser, setUserProfile } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const createInitialProfile = async (uid: string, email: string, displayName: string) => {
    const newProfile: UserProfile = {
      uid,
      email,
      name: displayName,
      role: 'user',
      plan: 'Free',
      mecralBalance: 20,
      dailyUsageCount: 0,
      lastUsageReset: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', uid), newProfile);
    return newProfile;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      const profile = await createInitialProfile(userCredential.user.uid, email, name);
      setUser(userCredential.user);
      setUserProfile(profile);
      navigate('/dashboard/buat');
    } catch (err: any) {
      setError('Gagal mendaftar. Email mungkin sudah terdaftar atau password kurang dari 6 karakter.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      setUser(cred.user);
      const userRef = doc(db, 'users', cred.user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUserProfile(docSnap.data() as UserProfile);
      } else {
        const profile = await createInitialProfile(cred.user.uid, cred.user.email || '', cred.user.displayName || 'User');
        setUserProfile(profile);
      }
      navigate('/dashboard/buat');
    } catch (err: any) {
      setError('Gagal mendaftar dengan Google. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center p-4 text-white">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-600 rounded flex items-center justify-center font-bold italic">M★</div>
        <span className="font-bold">Meo Studio</span>
      </Link>
      
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Daftar Akun Baru</h2>
        
        {error && <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 text-sm rounded-lg mb-4">{error}</div>}
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Nama</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)}
              className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Buat Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full p-3 bg-neutral-950 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-red-500 transition-colors" />
          </div>
          <button disabled={loading} type="submit" className="w-full py-3 bg-red-600 hover:bg-red-700 font-bold rounded-lg mt-2 disabled:opacity-50 shadow-lg shadow-red-600/20 transition-colors">
            {loading ? 'Memproses...' : 'Daftar'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4 before:h-px before:flex-1 before:bg-neutral-800 after:h-px after:flex-1 after:bg-neutral-800">
          <span className="text-xs text-neutral-500">ATAU</span>
        </div>

        <div className="flex flex-col gap-3">
          <button disabled={loading} onClick={handleGoogleLogin} className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Daftar dengan Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Sudah punya akun? <Link to="/login" className="text-blue-400 hover:underline">Masuk</Link>
        </p>
      </div>
    </div>
  );
}
