import { AuthContext, type AuthStatus } from '@/contexts/AuthContext';
import { fetchCurrentUser } from '@/services/auth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { type ReactNode, useEffect, useState } from 'react';
import { login as loginApi, logout as logoutApi, register as registerApi } from '@/services/auth';

const CURRENT_USER_QUERY_KEY = ['current-user'];
const AUTH_CHECK_INTERVAL_MS = 5 * 60 * 1000;

/**
 * AuthProviderは、アプリケーション全体で認証状態を管理するためのコンテキストプロバイダーです。
 * これにより、子コンポーネントは認証状態やユーザー情報にアクセスできるようになります。
 * 直接importせずに、AppProviderを経由して使用することを推奨します。
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  const { data, isError } = useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: fetchCurrentUser,
    retry: false,
    refetchInterval: AUTH_CHECK_INTERVAL_MS,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUserId(data.userId);
      setStatus('authenticated');
    } else if (isError) {
      setUserId(null);
      setStatus('unauthenticated');
    }
  }, [data, isError]);

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => loginApi({ email, password }),
    onSuccess: ({ userId }) => {
      setUserId(userId);
      setStatus('authenticated');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      setUserId(null);
      setStatus('unauthenticated');
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ name, email, password }: { name: string; email: string; password: string }) =>
      registerApi({ name, email, password }),
    onSuccess: ({ userId }) => {
      setUserId(userId);
      setStatus('authenticated');
    },
  });

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const register = async (name: string, email: string, password: string) => {
    await registerMutation.mutateAsync({ name, email, password });
  };

  return (
    <AuthContext.Provider
      value={{
        userId: userId,
        status: status,
        isLoginProcessing: loginMutation.isPending,
        isLogoutProcessing: logoutMutation.isPending,
        isRegisterProcessing: registerMutation.isPending,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
