import React from 'react';
import { IconArrowLeft, IconBell } from 'src/assets/icons';
import styles from './styles.module.scss';
import NavMenu from './NavMenu';

const BackHeader = () => {
  return (
    <header className={styles.backHeader}>
      <IconArrowLeft />
    </header>
  );
};

export default BackHeader;
