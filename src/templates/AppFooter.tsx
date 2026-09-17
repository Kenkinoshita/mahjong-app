import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { memo } from 'react';

export const AppFooter = memo(function AppFooter() {
  return (
    <Container component="footer" maxWidth={false} sx={{ maxWidth: 1160, py: 3, px: { xs: 1.5, sm: 2.5 } }}>
      <Typography variant="caption" color="text.secondary">
        &copy; 2026 IST麻雀部
      </Typography>
    </Container>
  );
});
