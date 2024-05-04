import { Navigate, useRoutes } from 'react-router-dom';

import {
  // APP
  SignUpPage,
  HomePage,
} from './elements';
import TestPage from '../_mock/TestPage';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // App
    {
      // element: <MainLayout />,
      path: '',
      children: [
        { path: '', element: <HomePage /> },
        { path: 'home', element: <HomePage /> },
        { path: 'sign-up', element: <SignUpPage /> },
        { path: 'api', element: <TestPage /> },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
