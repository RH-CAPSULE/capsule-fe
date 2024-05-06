import { Helmet } from 'react-helmet-async';
// sections
import {
  LoginForm,
  LoginHeader,
  LoginAuthOption,
  LoginWithSocial,
} from 'src/sections/login';
// styles
import { Container } from 'src/components/container';
import styles from './styles.module.scss';

/**
 * Login과 회원가입 페이지는 레이아웃을 따로 사용.
 */

const LoginPage = () => {
  return (
    <div className={styles.layout}>
      <Helmet>
        <title> Sign in | Capsule</title>
      </Helmet>
      <Container>
        <LoginHeader />

        <LoginForm />

        <LoginAuthOption />

        <LoginWithSocial />
      </Container>
    </div>
  );
};
export default LoginPage;
