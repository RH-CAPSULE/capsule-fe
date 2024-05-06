import React from 'react';
import styles from './styles.module.scss';

const Container = ({
  children,
  ...other
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <main className={styles.container} {...other}>
      {children}
    </main>
  );
};

export default Container;
