import { Navigate, useRoutes } from 'react-router-dom';

import {
  // APP
  SignUpPage,
  HomePage,
  LoginPage,
} from './elements';
import TestPage from '../_mock/TestPage';
import MainLayout from '../layouts/main/MainLayout';
import AuthGuard from '../auth/AuthGuard';
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
      // element: <MainLayout />,
      path: '',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        // { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'api', element: <TestPage /> },
        { path: 'home', element: <HomePage /> },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
