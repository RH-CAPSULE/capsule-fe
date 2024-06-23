import { Suspense, lazy, ElementType } from 'react';
import Blank from 'src/pages/blank-page';
import SplashPage from 'src/pages/splash';
// components
// import { Splash as LoadingScreen } from '../pages/common/splash/Splash';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <Suspense fallback={<Blank />}>
    <Component {...props} />
  </Suspense>
);

const SplashKeepLoadable = (Component: ElementType) => (props: any) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <Suspense fallback={<SplashPage />}>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

// APP
export const LoginPage = Loadable(lazy(() => import('../pages/login')));
export const SignUpPage = Loadable(lazy(() => import('../pages/sign-up')));
export const HomePage = SplashKeepLoadable(lazy(() => import('../pages/home')));
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
export const GuestHomePage = SplashKeepLoadable(
  lazy(() => import('../pages/guest'))
);
export const GuestWritePage = SplashKeepLoadable(
  lazy(() => import('../pages/guest/write'))
);

export const Page404 = Loadable(lazy(() => import('../pages/404')));
// export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
// export const Page403 = Loadable(lazy(() => import('../pages/Page403')));

// components
