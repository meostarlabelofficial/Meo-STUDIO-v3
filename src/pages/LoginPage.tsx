import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../lib/firebase';
import { useStore } from '../store/useStore';

export default function LoginPage() {
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
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard/buat');
    } catch (err: any) {
      setError(err.message === 'Firebase: Error (auth/invalid-credential).' 
        ? 'Email atau password salah.' 
        : 'Gagal masuk. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard/buat');
    } catch (err) {
      setError('Gagal masuk dengan Google.');
    }
  };

  const handleFacebookLogin = async () => {
    try {
      await signInWithPopup(auth, facebookProvider);
      navigate('/dashboard/buat');
    } catch (err) {
      setError('Gagal masuk dengan Facebook.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center p-4 text-white">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-blue-600 rounded flex items-center justify-center font-bold italic">M★</div>
        <span className="font-bold">Meo Studio</span>
      </Link>
      
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Masuk ke Akun</h2>
        
        {error && <div className="p-3 bg-red-900/50 border border-red-500 text-red-200 text-sm rounded mb-4">{error}</div>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
              className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-red-500 transition-colors" />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full p-3 bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-red-500 transition-colors" />
          </div>
          <button disabled={loading} type="submit" className="w-full py-3 bg-red-600 hover:bg-red-700 font-bold rounded mt-2 disabled:opacity-50">
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <div className="my-6 flex items-center gap-4 before:h-px before:flex-1 before:bg-neutral-800 after:h-px after:flex-1 after:bg-neutral-800">
          <span className="text-xs text-neutral-500">ATAU</span>
        </div>

        <div className="flex flex-col gap-3">
          <button onClick={handleGoogleLogin} className="w-full py-3 bg-white text-black font-semibold rounded hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
            Login dengan Google
          </button>
          <button onClick={handleFacebookLogin} className="w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            Login dengan Facebook
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-neutral-400">
          Belum punya akun? <Link to="/register" className="text-blue-400 hover:underline">Daftar sekarang</Link>
        </p>
      </div>
    </div>
  );
}
