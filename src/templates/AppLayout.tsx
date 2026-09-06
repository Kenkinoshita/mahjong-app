import styled from '@emotion/styled';
import { AppFooter } from '@/templates/AppFooter';
import { AppHeader } from '@/templates/AppHeader';
import { memo, type ReactNode } from 'react';

const LayoutMain = styled.main({
  minHeight: 'calc(100vh - 120px)',
  padding: '16px',
});

type AppLayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
};

export const AppLayout = memo(function AppLayout({ children, showHeader = true }: AppLayoutProps) {
  return (
    <div>
      {showHeader && <AppHeader />}
      <LayoutMain>{children}</LayoutMain>
      <AppFooter />
    </div>
  );
});
