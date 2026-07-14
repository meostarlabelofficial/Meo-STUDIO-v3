export type PlanTier = 'Free' | 'M-Pro' | 'M-Premium' | 'M-Vip' | 'Admin';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  plan: PlanTier;
  mecralBalance: number; // or Infinity for Admin
  dailyUsageCount: number;
  lastUsageReset: string; // ISO string Date
  createdAt: string;
}

export interface ProjectHistory {
  id: string;
  userId: string;
  title: string;
  clipsGenerated: number;
  cost: number;
  createdAt: string;
}
