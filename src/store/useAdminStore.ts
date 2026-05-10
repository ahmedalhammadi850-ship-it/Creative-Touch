import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { persistStorage } from '../lib/safeStorage';

const ADMIN_USERNAME = 'احمد';
const ADMIN_PASSWORD = '123456789';

interface AdminState {
  isLoggedIn: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      login: (username, password) => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          set({ isLoggedIn: true });
          return true;
        }
        return false;
      },
      logout: () => set({ isLoggedIn: false }),
    }),
    { name: 'admin-auth', storage: persistStorage }
  )
);
