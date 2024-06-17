import { Navigate, useRoutes } from 'react-router-dom';

import {
  // APP
  SignUpPage,
  HomePage,
  LoginPage,
  HistoryPage,
  WritePage,
  IdentityPage,
  PasswordInitPage,
  CapsuleListPage,
  CapsuleDetailPage,
  OAuthLoadingPage,
  GuestHomePage,
  GuestWritePage,
  Page404,
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
      element: <BackgroundLayout />,
      children: [
        { path: 'sign-in', element: <LoginPage /> },
        { path: 'sign-up', element: <SignUpPage /> },
        { path: 'identity', element: <IdentityPage /> },
        { path: 'password-init', element: <PasswordInitPage /> },
      ],
    },
    // App
    {
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
    // Guest
    {
      path: 'guest',
      element: <BackgroundLayout />,
      children: [
        { element: <Navigate to={PATH.GUEST_HOME} replace />, index: true },
        { path: ':capsuleBoxId', element: <GuestHomePage /> },
        { path: 'write', element: <GuestWritePage /> },
      ],
    },
    // oauth loading
    {
      path: 'oauth-loading',
      element: <OAuthLoadingPage />,
    },
    // error
    {
      path: '404',
      element: <Page404 />,
    },
    { path: '*', element: <Navigate to="/404" replace /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
