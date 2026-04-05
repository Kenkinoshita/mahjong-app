import Box from '@mui/material/Box';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TopTab } from '@/components/TopTab';
import AttendancePage from '@/pages/AttendancePage';
import MatchesPage from '@/pages/MatchesPage';
import MembersPage from '@/pages/MembersPage';
import OverallResultsPage from '@/pages/OverallResultsPage';
import ResultDetailsPage from '@/pages/ResultDetailsPage';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <TopTab />
      <Box component="main" sx={{ px: 2, py: 3 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/overall-results" replace />} />
          <Route path="/overall-results" element={<OverallResultsPage />} />
          <Route path="/result-details" element={<ResultDetailsPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/matches" element={<MatchesPage />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="*" element={<Navigate to="/overall-results" replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
