import { TopTab } from '@/components/TopTab';
import { memo } from 'react';

export const AppHeader = memo(function AppHeader() {
  return (
    <header>
      <TopTab />
    </header>
  );
});
