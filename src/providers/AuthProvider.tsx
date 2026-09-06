import { AuthContext, type AuthStatus } from '@/contexts/AuthContext';
import { fetchCurrentUser } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { type ReactNode, useState, useEffect } from 'react';
import { login as loginApi, logout as logoutApi } from '@/services/auth';

/**
 * AuthProviderは、アプリケーション全体で認証状態を管理するためのコンテキストプロバイダーです。
 * これにより、子コンポーネントは認証状態やユーザー情報にアクセスできるようになります。
 * 直接importせずに、AppProviderを経由して使用することを推奨します。
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

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

  useEffect(() => {
    let cancelled = false;

    const fetchUser = async () => {
      try {
        const { userId } = await fetchCurrentUser();
        setUserId(userId);
        setStatus('authenticated');
      } catch {
        setUserId(null);
        setStatus('unauthenticated');
      }
    };

    if (!cancelled) fetchUser();

    return () => {
      // 本コンポーネントがアンマウントされた場合に、fetchUserの結果を無視するためのフラグを設定します。
      cancelled = true;
    };
  }, []);

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password });
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  return (
    <AuthContext.Provider
      value={{
        userId: userId,
        status: status,
        isLoginProcessing: loginMutation.isPending,
        isLogoutProcessing: logoutMutation.isPending,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
