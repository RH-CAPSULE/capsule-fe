import { Navigate, useRoutes } from 'react-router-dom';

import {
  // APP
  SignUpPage,
  HomePage,
} from './elements';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // App
    {
      // element: <MainLayout />,
      path: '',
      element: <HomePage />,
      children: [
        { path: 'home', element: <HomePage /> },
        { path: 'sign-up', element: <SignUpPage /> },
      ],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
