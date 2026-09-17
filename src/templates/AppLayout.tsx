import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { AppFooter } from '@/templates/AppFooter';
import { AppHeader } from '@/templates/AppHeader';
import { TopTab } from '@/components/TopTab';
import { memo, type ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
  showHeader?: boolean;
};

export const AppLayout = memo(function AppLayout({ children, showHeader = true }: AppLayoutProps) {
  return (
    <Box sx={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {showHeader && <AppHeader />}
      <Container
        component="main"
        maxWidth={false}
        sx={{ maxWidth: 1160, flex: 1, py: { xs: 2.25, sm: 3 }, px: { xs: 1.5, sm: 2.5 } }}
      >
        {showHeader && <TopTab />}
        {children}
      </Container>
      <AppFooter />
    </Box>
  );
});
