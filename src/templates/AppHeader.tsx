import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAuth } from '@/hooks/auth/useAuth';
import { useThrowError } from '@/hooks/useThrowError';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppHeader = memo(function AppHeader() {
  const { isLogoutProcessing, logout, status } = useAuth();
  const navigate = useNavigate();
  const { throwError } = useThrowError();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed', error);
      throwError(error);
    }
  };

  return (
    <Box component="header" sx={{ bgcolor: 'primary.dark', color: 'common.white' }}>
      <Container maxWidth={false} sx={{ maxWidth: 1160, py: { xs: 2.5, sm: 3.25 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
          <Box>
            <Typography sx={{ color: '#b9d4c6', fontSize: 12, letterSpacing: '.1em' }}>MAHJONG CLUB</Typography>
            <Typography component="p" sx={{ fontSize: { xs: 22, sm: 25 }, fontWeight: 700, mt: 0.5 }}>
              IST麻雀部
            </Typography>
          </Box>
          {status === 'authenticated' && (
            <Button
              onClick={handleLogout}
              disabled={isLogoutProcessing}
              variant="outlined"
              sx={{
                bgcolor: 'common.white',
                color: 'primary.dark',
                borderColor: '#d1e9d8',
                flexShrink: 0,
                '&:hover': { bgcolor: '#e9f5ec', borderColor: 'common.white' },
              }}
            >
              {isLogoutProcessing ? 'ログアウト中...' : 'ログアウト'}
            </Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
});
