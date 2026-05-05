import { useState, useEffect } from 'react';

interface AuthUser {
  email: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('auth_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const login = (email: string) => {
    const u = { email };
    localStorage.setItem('auth_user', JSON.stringify(u));
    setUser(u);
  };

  const logout = () => {
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  return { user, login, logout };
}
