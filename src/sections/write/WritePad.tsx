import React from 'react';

// styles
import styles from './styles.module.scss';

// components
import { Button } from '../../components/button';
import { Letter } from '../../components/letter';

const WritePad = () => {
  return (
    <section className={styles.section}>
      <div className={styles.type}>
        <div className={styles.item}>1</div>
        <div className={styles.item}>2</div>
        <div className={styles.item}>3</div>
      </div>
      <Button theme="GRAY" size="large" full>
        타임캡슐 만들기
      </Button>
    </section>
  );
};

export default WritePad;
