import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'starter' | 'weekly' | 'monthly';
  planStatus: 'active' | 'pending' | 'rejected' | null;
  planExpiresAt?: string;
  createdAt: string;
  activatedTemplates?: string[];
}

interface AuthState {
  user: User | null;
  users: User[];
  setCurrentUser: (user: User) => void;
  addUser: (user: User) => void;
  getUserByEmail: (email: string) => User | undefined;
  logout: () => void;
  updateUserPlan: (userId: string, plan: User['plan'], status: User['planStatus'], expiresAt?: string) => void;
  addActivatedTemplate: (userId: string, templateKey: string) => void;
  refreshCurrentUser: () => void;
}

export function isPlanActive(user: User | null): boolean {
  if (!user || user.plan === 'free' || user.planStatus !== 'active') return false;
  if (user.planExpiresAt) {
    return new Date(user.planExpiresAt) > new Date();
  }
  return true;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],

      setCurrentUser: (user) => {
        set({ user });
      },

      addUser: (user) => {
        const { users } = get();
        const exists = users.find(u => u.email.toLowerCase() === user.email.toLowerCase());
        if (!exists) {
          set((state) => ({ users: [...state.users, user] }));
        }
      },

      getUserByEmail: (email) => {
        return get().users.find(u => u.email.toLowerCase() === email.toLowerCase());
      },

      logout: () => set({ user: null }),

      updateUserPlan: (userId, plan, status, expiresAt) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === userId ? { ...u, plan, planStatus: status, planExpiresAt: expiresAt } : u
          ),
          user:
            state.user?.id === userId
              ? { ...state.user, plan, planStatus: status, planExpiresAt: expiresAt }
              : state.user,
        }));
      },

      addActivatedTemplate: (userId, templateKey) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === userId
              ? { ...u, activatedTemplates: [...new Set([...(u.activatedTemplates || []), templateKey])] }
              : u
          ),
          user:
            state.user?.id === userId
              ? { ...state.user, activatedTemplates: [...new Set([...(state.user.activatedTemplates || []), templateKey])] }
              : state.user,
        }));
      },

      refreshCurrentUser: () => {
        const { user, users } = get();
        if (!user) return;
        const fresh = users.find(u => u.id === user.id);
        if (fresh) set({ user: { ...fresh } });
      },
    }),
    { name: 'auth-storage' }
  )
);
