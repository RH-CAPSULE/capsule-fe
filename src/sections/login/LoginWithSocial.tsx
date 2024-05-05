import React from 'react';
import { IconGoogle } from 'src/assets/icons';
import { Button } from 'src/components/button';
import styles from './styles.module.scss';

const LoginWithSocial = () => {
  return (
    <section className={styles.section}>
      <Button className={styles.socialLoginButton}>
        <IconGoogle />
        Sign in with Google
      </Button>
    </section>
  );
};

export default LoginWithSocial;
