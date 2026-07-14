import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { useStore } from './store/useStore';
import { UserProfile } from './types';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './components/DashboardLayout';
import CreatePage from './pages/CreatePage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import SubscriptionPage from './pages/SubscriptionPage';
import TokenPage from './pages/TokenPage';
import EditorPage from './pages/EditorPage';
import HistoryPage from './pages/HistoryPage';
import ContactAdminPage from './pages/ContactAdminPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';

export default function App() {
  const { setUser, setUserProfile } = useStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const docSnap = await getDoc(userRef);
        
        if (docSnap.exists()) {
          setUserProfile(docSnap.data() as UserProfile);
        } else {
          // Fallback if registered via third party but no doc yet
          const newProfile: UserProfile = {
            uid: currentUser.uid,
            email: currentUser.email || '',
            name: currentUser.displayName || 'User',
            role: 'user',
            plan: 'Free',
            mecralBalance: 20,
            dailyUsageCount: 0,
            lastUsageReset: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          };
          await setDoc(userRef, newProfile);
          setUserProfile(newProfile);
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setUserProfile]);

  if (loading) {
    return <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard/buat" replace />} />
          <Route path="buat" element={<CreatePage />} />
          <Route path="analisis" element={<AnalyticsPage />} />
          <Route path="profil" element={<ProfilePage />} />
          <Route path="langganan" element={<SubscriptionPage />} />
          <Route path="token" element={<TokenPage />} />
          <Route path="edit" element={<EditorPage />} />
          <Route path="riwayat" element={<HistoryPage />} />
          <Route path="hubungi-admin" element={<ContactAdminPage />} />
        </Route>
        
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
