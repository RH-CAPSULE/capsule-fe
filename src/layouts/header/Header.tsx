import React from 'react';
import { IconBell, IconMenu } from 'src/assets/icons';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <IconBell />
      <IconMenu />
    </header>
  );
};

export default Header;
