import React from 'react';

// styles
import { Container } from 'src/components/container';
import { Helmet } from 'react-helmet-async';
import styles from './styles.module.scss';
import { IdentityForm, IdentityHeader } from '../../sections/identity';
import { BackHeader } from '../../layouts/header';

const IdentityPage = () => (
  // eslint-disable-next-line no-console
  <div className={styles.layout}>
    <Helmet>
      <title> identity verification | Capsule</title>
    </Helmet>
    <BackHeader />
    <Container>
      <IdentityHeader />
      <IdentityForm />
    </Container>
  </div>
);
export default IdentityPage;
