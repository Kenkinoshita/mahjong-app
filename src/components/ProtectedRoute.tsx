import { Loading } from '@/components/Loading';
import { useAuth } from '@/hooks/auth/useAuth';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { status } = useAuth();

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
