import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// components
import { PATH } from 'src/routes/path';
import LoadingScreen from 'src/pages/splash';
//
import Login from 'src/pages/login';
import { useAuthStore } from 'src/store/auth';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isLoggedIn, isInitialized } = useAuthStore();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    // return <Navigate to={requestedLocation} />;
    return <Navigate to={PATH.root} />;
  }

  return <> {children} </>;
}
