import { Navigate, useRoutes } from 'react-router-dom';

import {
  // APP
  SignUpPage,
} from './elements';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // App
    {
      // element: <MainLayout />,
      path: '',
      children: [{ path: 'sign-up', element: <SignUpPage /> }],
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}
