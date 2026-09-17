import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme/theme';
import { AuthProvider } from '@/providers/AuthProvider';
import type { ReactNode } from 'react';

/**
 * AppProviderは、アプリケーション全体で使用されるコンテキストプロバイダーをまとめて提供するためのコンポーネントです。
 * 現在はAuthProviderのみを提供していますが、将来的に他のコンテキストプロバイダーも追加することができます。
 */
export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
};
