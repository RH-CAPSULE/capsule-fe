import { Navigate } from 'react-router-dom';
// components
import { PATH } from 'src/routes/path';
import LoadingScreen from 'src/pages/splash';
//
import { useAuth } from 'src/apis/queries/auth/user-info';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isLoading, isError: isNotFoundUser } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isNotFoundUser) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return <> {children} </>;
}
