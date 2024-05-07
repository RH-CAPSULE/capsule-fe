import React from 'react';
import {
  LoginHeader,
} from 'src/sections/login';
import {
  SignupForm,
  SignupLoginReturn
} from 'src/sections/signup';

// styles
import { Container } from 'src/components/container';
import styles from './styles.module.scss';

const SignUpPage = () => (
  // eslint-disable-next-line no-console
  <div className={styles.layout}>
    <Container>
    <LoginHeader />
    <SignupForm />
    <SignupLoginReturn />
    </Container>
  </div>
);
export default SignUpPage;
