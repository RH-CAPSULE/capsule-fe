import React from 'react';
import { SignUpForm, SignUpLoginReturn } from 'src/sections/sign-up';

// styles
import { Container } from 'src/components/container';
import { Helmet } from 'react-helmet-async';
import styles from './styles.module.scss';
import SignUpHeader from '../../sections/sign-up/SignUpHeader';

const PasswordPage = () => (
  // eslint-disable-next-line no-console
  <div className={styles.layout}>
    <Helmet>
      <title> Sign up | Capsule</title>
    </Helmet>
    <Container>
      <PasswordHeader />
      <PasswordForm />
      <PasswordReturn />
    </Container>
  </div>
);
export default PasswordPage;
