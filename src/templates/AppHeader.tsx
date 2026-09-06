import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { TopTab } from '@/components/TopTab';
import { useAuth } from '@/hooks/auth/useAuth';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppHeader = memo(function AppHeader() {
  const { isLogoutProcessing, logout, status } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <header>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <TopTab />
        {status === 'authenticated' && (
          <Button onClick={handleLogout} disabled={isLogoutProcessing} sx={{ mr: 2 }}>
            {isLogoutProcessing ? 'ログアウト中...' : 'ログアウト'}
          </Button>
        )}
      </Stack>
    </header>
  );
});
