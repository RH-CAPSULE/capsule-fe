import { Suspense, lazy, ElementType } from 'react';
// components
// import { Splash as LoadingScreen } from '../pages/common/splash/Splash';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => (
  // eslint-disable-next-line react/jsx-no-useless-fragment
  <Suspense fallback={<>로딩중...</>}>
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
export const PasswordPage = Loadable(lazy(() => import('../pages/password')));

// export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
// export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
// export const Page404 = Loadable(lazy(() => import('../pages/Page404')));

// components
