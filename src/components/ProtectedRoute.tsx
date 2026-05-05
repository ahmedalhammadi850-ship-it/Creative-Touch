import { useAuth } from '../hooks/useAuth';
import { Redirect } from 'wouter';
import { ReactNode } from 'react';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  
  if (user === null && localStorage.getItem('auth_user') === null) {
    return <Redirect to="/login" />;
  }
  
  return <>{children}</>;
}
