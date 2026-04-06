import styled from '@emotion/styled';
import { AppFooter } from '@/templates/AppFooter';
import { AppHeader } from '@/templates/AppHeader';
import { memo, type ReactNode } from 'react';

const LayoutMain = styled.main({
  minHeight: 'calc(100vh - 120px)',
  padding: '16px',
});

export const AppLayout = memo(function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AppHeader />
      <LayoutMain>{children}</LayoutMain>
      <AppFooter />
    </div>
  );
});
