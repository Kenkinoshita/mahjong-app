import { AuthProvider } from '@/providers/AuthProvider';
import type { ReactNode } from 'react';

/**
 * AppProviderは、アプリケーション全体で使用されるコンテキストプロバイダーをまとめて提供するためのコンポーネントです。
 * 現在はAuthProviderのみを提供していますが、将来的に他のコンテキストプロバイダーも追加することができます。
 */
export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <AuthProvider>{children}</AuthProvider>;
};
