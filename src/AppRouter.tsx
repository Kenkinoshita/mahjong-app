import AttendancePage from '@/pages/AttendancePage/AttendancePage';
import { LoginPage } from '@/pages/LoginPage/LoginPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AppLayout } from '@/templates/AppLayout';
import MatchesPage from '@/pages/MatchesPage/MatchesPage';
import MembersPage from '@/pages/MembersPage/MembersPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';
import OverallResultsPage from '@/pages/OverallResultsPage/OverallResultsPage';
import ResultDetailsPage from '@/pages/ResultDetailsPage/ResultDetailsPage';
import { Routes, Route, Navigate } from 'react-router-dom';

const APP_ROUTES = [
  { path: '/', element: <Navigate to="/overall-results" replace />, isProtected: true },
  { path: '/overall-results', element: <OverallResultsPage />, isProtected: true },
  { path: '/result-details', element: <ResultDetailsPage />, isProtected: true },
  { path: '/members', element: <MembersPage />, isProtected: true },
  { path: '/matches', element: <MatchesPage />, isProtected: true },
  { path: '/attendance', element: <AttendancePage />, isProtected: true },
  { path: '/login', element: <LoginPage />, isProtected: false, showHeader: false },
  { path: '*', element: <NotFoundPage />, isProtected: false },
];

export function AppRouter() {
  return (
    <Routes>
      {APP_ROUTES.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <AppLayout showHeader={route.showHeader}>
              {route.isProtected ? <ProtectedRoute>{route.element}</ProtectedRoute> : route.element}
            </AppLayout>
          }
        />
      ))}
    </Routes>
  );
}
