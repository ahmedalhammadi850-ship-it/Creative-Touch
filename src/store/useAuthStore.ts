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
  selectedTemplates?: string[];
}

interface AuthState {
  user: User | null;
  users: User[];
  setCurrentUser: (user: User) => void;
  addUser: (user: User) => void;
  getUserByEmail: (email: string) => User | undefined;
  logout: () => void;
  updateUserPlan: (userId: string, plan: User['plan'], status: User['planStatus'], expiresAt?: string) => void;
  cancelSubscription: (userId: string) => void;
  addActivatedTemplate: (userId: string, templateKey: string) => void;
  addActivatedTemplates: (userId: string, templateKeys: string[]) => void;
  addSelectedTemplate: (userId: string, templateKey: string) => void;
  refreshCurrentUser: () => void;
}

export function isPlanActive(user: User | null): boolean {
  if (!user || user.plan === 'free' || user.planStatus !== 'active') return false;
  if (user.plan === 'starter') return true;
  if (user.planExpiresAt) {
    return new Date(user.planExpiresAt) > new Date();
  }
  return true;
}

export function getTimeRemaining(user: User | null): { days: number; hours: number; expired: boolean } | null {
  if (!user || !user.planExpiresAt || user.plan === 'free' || user.plan === 'starter') return null;
  const now = new Date().getTime();
  const end = new Date(user.planExpiresAt).getTime();
  const diff = end - now;
  if (diff <= 0) return { days: 0, hours: 0, expired: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours, expired: false };
}

export function getSelectedTemplatesCount(user: User | null): number {
  if (!user) return 0;
  return (user.selectedTemplates || []).length;
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

      cancelSubscription: (userId) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === userId ? { ...u, plan: 'free', planStatus: null, planExpiresAt: undefined } : u
          ),
          user:
            state.user?.id === userId
              ? { ...state.user, plan: 'free', planStatus: null, planExpiresAt: undefined }
              : state.user,
        }));
      },

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

      // Activate multiple templates at once (used for adjacent template logic)
      addActivatedTemplates: (userId, templateKeys) => {
        set((state) => {
          const updateUser = (u: User): User => {
            if (u.id !== userId) return u;
            const current = u.activatedTemplates || [];
            const merged = [...new Set([...current, ...templateKeys])];
            return { ...u, activatedTemplates: merged };
          };
          return {
            users: state.users.map(updateUser),
            user: state.user?.id === userId ? updateUser(state.user) : state.user,
          };
        });
      },

      addSelectedTemplate: (userId, templateKey) => {
        set((state) => {
          const updateUser = (u: User): User => {
            if (u.id !== userId) return u;
            const current = u.selectedTemplates || [];
            if (current.includes(templateKey)) return u;
            return { ...u, selectedTemplates: [...current, templateKey] };
          };
          return {
            users: state.users.map(updateUser),
            user: state.user?.id === userId ? updateUser(state.user) : state.user,
          };
        });
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
