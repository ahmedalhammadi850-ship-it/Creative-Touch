import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'starter' | 'weekly' | 'monthly';
  planStatus: 'active' | 'pending' | 'rejected' | null;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  users: User[];
  setCurrentUser: (user: User) => void;
  addUser: (user: User) => void;
  getUserByEmail: (email: string) => User | undefined;
  logout: () => void;
  updateUserPlan: (userId: string, plan: User['plan'], status: User['planStatus']) => void;
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

      updateUserPlan: (userId, plan, status) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === userId ? { ...u, plan, planStatus: status } : u
          ),
          user:
            state.user?.id === userId
              ? { ...state.user, plan, planStatus: status }
              : state.user,
        }));
      },
    }),
    { name: 'auth-storage' }
  )
);
