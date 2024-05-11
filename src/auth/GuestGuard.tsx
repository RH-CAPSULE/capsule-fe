import { Navigate } from 'react-router-dom';

// components
import LoadingScreen from 'src/pages/splash';
//
import { PATH } from 'src/routes/path';
import { useAuthStore } from 'src/store/auth';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isLoggedIn, isInitialized } = useAuthStore();

  if (isLoggedIn) {
    return <Navigate to={PATH.root} />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
