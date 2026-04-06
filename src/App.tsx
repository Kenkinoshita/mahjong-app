import Box from '@mui/material/Box';
import { AppLayout } from '@/templates/AppLayout';
import { AppRouter } from '@/AppRouter';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </Box>
  );
}

export default App;
