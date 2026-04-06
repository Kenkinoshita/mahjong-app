import AttendancePage from '@/pages/AttendancePage/AttendancePage';
import MatchesPage from '@/pages/MatchesPage/MatchesPage';
import MembersPage from '@/pages/MembersPage/MembersPage';
import OverallResultsPage from '@/pages/OverallResultsPage/OverallResultsPage';
import ResultDetailsPage from '@/pages/ResultDetailsPage/ResultDetailsPage';
import { Routes, Route, Navigate } from 'react-router-dom';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/overall-results" replace />} />
      <Route path="/overall-results" element={<OverallResultsPage />} />
      <Route path="/result-details" element={<ResultDetailsPage />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/matches" element={<MatchesPage />} />
      <Route path="/attendance" element={<AttendancePage />} />
      <Route path="*" element={<Navigate to="/overall-results" replace />} />
    </Routes>
  );
}
