import React from 'react';
import { Capsule } from 'src/components/capsule';
import styles from './styles.module.scss';

const SplashPage = () => (
  // eslint-disable-next-line no-console
  <div className={styles.layout}>
    <main>
      <h1>적어줘! 타임캡슐</h1>
      <Capsule className={styles.capsule} />
      <div />
    </main>
  </div>
);

export default SplashPage;
