import Box from '@mui/material/Box';
import { AppRouter } from '@/AppRouter';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppRouter />
    </Box>
  );
}

export default App;
