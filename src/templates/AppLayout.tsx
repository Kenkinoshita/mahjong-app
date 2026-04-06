import { AppFooter } from '@/templates/AppFooter';
import { AppHeader } from '@/templates/AppHeader';
import { memo, type ReactNode } from 'react';

export const AppLayout = memo(function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AppHeader />
      <main>{children}</main>
      <AppFooter />
    </div>
  );
});
