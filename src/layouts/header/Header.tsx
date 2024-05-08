import React from 'react';
import { IconBell } from 'src/assets/icons';
import styles from './styles.module.scss';
import NavMenu from './NavMenu';

const Header = () => {
  return (
    <header className={styles.header}>
      <IconBell />
      <NavMenu />
    </header>
  );
};

export default Header;
