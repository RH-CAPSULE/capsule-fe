import { Suspense, lazy, ElementType } from 'react';
import Blank from 'src/pages/blank-page';
// components
// import { Splash as LoadingScreen } from '../pages/common/splash/Splash';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <Suspense fallback={<Blank />}>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

// APP
export const LoginPage = Loadable(lazy(() => import('../pages/login')));
export const SignUpPage = Loadable(lazy(() => import('../pages/sign-up')));
export const HomePage = Loadable(lazy(() => import('../pages/home')));
export const HistoryPage = Loadable(lazy(() => import('../pages/history')));
export const WritePage = Loadable(lazy(() => import('../pages/write')));
export const IdentityPage = Loadable(lazy(() => import('../pages/identity')));
export const PasswordInitPage = Loadable(
  lazy(() => import('../pages/password-init'))
);
export const CapsuleListPage = Loadable(
  lazy(() => import('../pages/capsules'))
);
export const CapsuleDetailPage = Loadable(
  lazy(() => import('../pages/capsules/detail'))
);
export const OAuthLoadingPage = Loadable(
  lazy(() => import('../pages/oauth-loading'))
);

// guest
export const GuestHomePage = Loadable(lazy(() => import('../pages/guest')));
export const GuestWritePage = Loadable(
  lazy(() => import('../pages/guest/write'))
);

// export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
// export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
// export const Page404 = Loadable(lazy(() => import('../pages/Page404')));

// components
