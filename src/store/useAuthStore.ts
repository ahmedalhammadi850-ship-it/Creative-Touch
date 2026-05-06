import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  plan: 'free' | 'starter' | 'weekly' | 'monthly';
  planStatus: 'active' | 'pending' | 'rejected' | null;
  createdAt: string;
}

interface ResetToken {
  email: string;
  token: string;
  expiresAt: number;
}

interface AuthState {
  user: User | null;
  users: User[];
  resetTokens: ResetToken[];
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  forgotPassword: (email: string) => { success: boolean; token?: string; error?: string };
  resetPassword: (token: string, newPassword: string) => { success: boolean; error?: string };
  updateUserPlan: (userId: string, plan: User['plan'], status: User['planStatus']) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      resetTokens: [],

      register: (name, email, password) => {
        const { users } = get();
        if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
          return { success: false, error: 'البريد الإلكتروني مستخدم مسبقاً' };
        }
        if (password.length < 6) {
          return { success: false, error: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' };
        }
        const newUser: User = {
          id: Date.now().toString(),
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password,
          plan: 'free',
          planStatus: null,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ users: [...state.users, newUser], user: newUser }));
        return { success: true };
      },

      login: (email, password) => {
        const { users } = get();
        const found = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
        );
        if (!found) return { success: false, error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' };
        set({ user: found });
        return { success: true };
      },

      logout: () => set({ user: null }),

      forgotPassword: (email) => {
        const { users } = get();
        const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
        if (!found) return { success: false, error: 'البريد الإلكتروني غير مسجل' };
        const token = Math.floor(100000 + Math.random() * 900000).toString();
        const resetToken: ResetToken = {
          email: found.email,
          token,
          expiresAt: Date.now() + 15 * 60 * 1000,
        };
        set((state) => ({
          resetTokens: [...state.resetTokens.filter((t) => t.email !== found.email), resetToken],
        }));
        return { success: true, token };
      },

      resetPassword: (token, newPassword) => {
        const { resetTokens, users } = get();
        const found = resetTokens.find((t) => t.token === token && t.expiresAt > Date.now());
        if (!found) return { success: false, error: 'الرمز غير صحيح أو منتهي الصلاحية' };
        if (newPassword.length < 6) return { success: false, error: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' };
        const updatedUsers = users.map((u) =>
          u.email === found.email ? { ...u, password: newPassword } : u
        );
        set((state) => ({
          users: updatedUsers,
          user: state.user?.email === found.email ? { ...state.user, password: newPassword } : state.user,
          resetTokens: state.resetTokens.filter((t) => t.token !== token),
        }));
        return { success: true };
      },

      updateUserPlan: (userId, plan, status) => {
        set((state) => ({
          users: state.users.map((u) =>
            u.id === userId ? { ...u, plan, planStatus: status } : u
          ),
          user: state.user?.id === userId ? { ...state.user, plan, planStatus: status } : state.user,
        }));
      },
    }),
    { name: 'auth-storage' }
  )
);
