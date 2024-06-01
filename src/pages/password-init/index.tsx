import React from 'react';

// styles
import { Container } from 'src/components/container';
import { Helmet } from 'react-helmet-async';
import styles from './styles.module.scss';
import { PasswordForm, PasswordHeader } from '../../sections/password';

const PasswordInitPage = () => (
  // eslint-disable-next-line no-console
  <div className={styles.layout}>
    <Helmet>
      <title> Password init | Capsule</title>
    </Helmet>
    <Container>
      <PasswordHeader />
      <PasswordForm />
    </Container>
  </div>
);
export default PasswordInitPage;
