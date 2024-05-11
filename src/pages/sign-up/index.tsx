import React from 'react';
import { SignupForm, SignupLoginReturn } from 'src/sections/signup';

// styles
import { Container } from 'src/components/container';
import { Helmet } from 'react-helmet-async';
import styles from './styles.module.scss';
import SignupHeader from '../../sections/signup/SignupHeader';

const SignUpPage = () => (
  // eslint-disable-next-line no-console
  <div className={styles.layout}>
    <Helmet>
      <title> Sign up | Capsule</title>
    </Helmet>
    <Container>
      <SignupHeader />
      <SignupForm />
      <SignupLoginReturn />
    </Container>
  </div>
);
export default SignUpPage;
