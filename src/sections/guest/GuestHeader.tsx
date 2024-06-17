import React from 'react';
import { useGuestCapsuleBox } from 'src/apis/queries/guest';
import styles from './styles.module.scss';

const GuestHeader = () => {
  const { data } = useGuestCapsuleBox();

  return (
    <section className={styles.section}>
      <h1>{data?.userName}님의 캡슐함</h1>
    </section>
  );
};

export default GuestHeader;
