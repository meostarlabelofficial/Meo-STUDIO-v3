import { create } from 'zustand';
import { User } from 'firebase/auth';
import { UserProfile } from '../types';

interface AppState {
  user: User | null;
  userProfile: UserProfile | null;
  setUser: (user: User | null) => void;
  setUserProfile: (profile: UserProfile | null) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  userProfile: null,
  setUser: (user) => set({ user }),
  setUserProfile: (userProfile) => set({ userProfile }),
}));
