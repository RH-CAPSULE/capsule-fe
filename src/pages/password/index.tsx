import React from 'react';

// styles
import { Container } from 'src/components/container';
import { Helmet } from 'react-helmet-async';
import styles from './styles.module.scss';
import {
  PasswordForm,
  PasswordHeader,
  PasswordReturn,
} from '../../sections/password';

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
