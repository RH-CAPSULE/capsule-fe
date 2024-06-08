import { Navigate, useRoutes } from 'react-router-dom';

import {
  // APP
  SignUpPage,
  HomePage,
  LoginPage,
  HistoryPage,
  CapsuleListPage,
  CapsuleDetailPage,
} from './elements';
import TestPage from '../_mock/TestPage';
import BackgroundLayout from '../layouts/background/BackgroundLayout';
import AuthGuard from '../auth/AuthGuard';
import { PATH } from './path';
import WritePage from '../pages/write';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // auth
    {
      path: 'auth',
      children: [
        { path: 'sign-in', element: <LoginPage /> },
        { path: 'sign-up', element: <SignUpPage /> },
      ],
    },
    // App
    {
      // element: <BackgroundLayout />,
      path: '',
      element: (
        <AuthGuard>
          <BackgroundLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH.HOME} replace />, index: true },
        { path: 'api', element: <TestPage /> },
        { path: 'home', element: <HomePage /> },
        { path: 'home/capsule/write', element: <WritePage /> },
        { path: 'history', element: <HistoryPage /> },
        { path: 'capsules/:id', element: <CapsuleListPage /> },
        { path: 'capsules/detail/:id', element: <CapsuleDetailPage /> },
      ],
    },
    // { path: '*', element: <Navigate to="/404" replace /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
