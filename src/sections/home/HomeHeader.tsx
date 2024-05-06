import React from 'react';
import { useAuthStore } from 'src/store';
import styles from './styles.module.scss';

const HomeHeader = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <section className={styles.section}>
      <h1>{user?.name}님의 캡슐함</h1>
    </section>
  );
};

export default HomeHeader;
