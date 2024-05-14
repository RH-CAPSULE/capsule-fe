import { Navigate } from 'react-router-dom';
import { useAuth } from 'src/apis/queries/auth/user-info';

// components
import LoadingScreen from 'src/pages/splash';
//
import { PATH } from 'src/routes/path';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isLoading, isError: isNotFoundUser } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isNotFoundUser) {
    return <Navigate to={PATH.root} />;
  }

  return <> {children} </>;
}
