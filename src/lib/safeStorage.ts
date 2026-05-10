import { createJSONStorage } from 'zustand/middleware';

const noopStorage = {
  getItem: (_name: string): string | null => null,
  setItem: (_name: string, _value: string): void => {},
  removeItem: (_name: string): void => {},
};

const safeLocalStorage = {
  getItem: (name: string): string | null => {
    try { return localStorage.getItem(name); } catch { return null; }
  },
  setItem: (name: string, value: string): void => {
    try { localStorage.setItem(name, value); } catch { /* ignore quota/unavailable */ }
  },
  removeItem: (name: string): void => {
    try { localStorage.removeItem(name); } catch { /* ignore */ }
  },
};

function isLocalStorageAvailable(): boolean {
  try {
    const key = '__ls_test__';
    localStorage.setItem(key, '1');
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

export const persistStorage = createJSONStorage(() =>
  isLocalStorageAvailable() ? safeLocalStorage : noopStorage
);
