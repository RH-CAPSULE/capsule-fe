import { Suspense, lazy, ElementType } from 'react';
// components
// import { Splash as LoadingScreen } from '../pages/common/splash/Splash';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => (
  <Suspense fallback={<></>}>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

// APP
export const LoginPage = Loadable(lazy(() => import('../pages/login')));
export const SignUpPage = Loadable(lazy(() => import('../pages/sign-up')));

// export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
// export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
// export const Page404 = Loadable(lazy(() => import('../pages/Page404')));

// components
