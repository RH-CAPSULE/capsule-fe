import { Navigate, useRoutes } from 'react-router-dom';

import {
  // APP
  SignUpPage,
  HomePage,
  LoginPage,
  HistoryPage,
  WritePage,
  PasswordPage,
  CapsuleListPage,
  CapsuleDetailPage,
} from './elements';
import TestPage from '../_mock/TestPage';
import BackgroundLayout from '../layouts/background/BackgroundLayout';
import AuthGuard from '../auth/AuthGuard';
import { PATH } from './path';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // auth
    {
      path: 'auth',
      children: [
        { path: 'sign-in', element: <LoginPage /> },
        { path: 'sign-up', element: <SignUpPage /> },
        { path: 'password', element: <PasswordPage /> },
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
    // { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
