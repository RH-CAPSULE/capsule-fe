import React from 'react';

// styles
import { Container } from 'src/components/container';
import { Helmet } from 'react-helmet-async';
import styles from './styles.module.scss';
import {
  IdentityForm,
  IdentityHeader,
  IdentityReturn,
} from '../../sections/identity';

const IdentityPage = () => (
  // eslint-disable-next-line no-console
  <div className={styles.layout}>
    <Helmet>
      <title> identity verification | Capsule</title>
    </Helmet>
    <Container>
      <IdentityHeader />
      <IdentityForm />
      <IdentityReturn />
    </Container>
  </div>
);
export default IdentityPage;
