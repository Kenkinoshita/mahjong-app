import AttendancePage from '@/pages/AttendancePage/AttendancePage';
import MatchesPage from '@/pages/MatchesPage/MatchesPage';
import MembersPage from '@/pages/MembersPage/MembersPage';
import OverallResultsPage from '@/pages/OverallResultsPage/OverallResultsPage';
import ResultDetailsPage from '@/pages/ResultDetailsPage/ResultDetailsPage';
import { Routes, Route, Navigate } from 'react-router-dom';

const APP_ROUTES = [
  { path: '/', element: <Navigate to="/overall-results" replace /> },
  { path: '/overall-results', element: <OverallResultsPage /> },
  { path: '/result-details', element: <ResultDetailsPage /> },
  { path: '/members', element: <MembersPage /> },
  { path: '/matches', element: <MatchesPage /> },
  { path: '/attendance', element: <AttendancePage /> },
  { path: '*', element: <Navigate to="/overall-results" replace /> },
];

export function AppRouter() {
  return (
    <Routes>
      {APP_ROUTES.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
