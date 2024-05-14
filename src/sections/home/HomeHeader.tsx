import React from 'react';
import { useCachedUser } from 'src/apis/queries/auth/user-info';
import styles from './styles.module.scss';

const HomeHeader = () => {
  const { user } = useCachedUser();

  return (
    <section className={styles.section}>
      <h1>{user?.userName}님의 캡슐함</h1>
    </section>
  );
};

export default HomeHeader;
