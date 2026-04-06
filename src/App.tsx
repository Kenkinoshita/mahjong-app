import Box from '@mui/material/Box';
import { AppLayout } from '@/templates/AppLayout';
import { AppRouter } from '@/templates/AppRouter';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppLayout>
        <Box component="main" sx={{ px: 2, py: 3 }}>
          <AppRouter />
        </Box>
      </AppLayout>
    </Box>
  );
}

export default App;
