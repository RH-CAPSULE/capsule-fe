import React from 'react';
import { useNavigate } from 'react-router-dom';

import { IconArrowLeft, IconBell } from 'src/assets/icons';
import styles from './styles.module.scss';
import NavMenu from './NavMenu';

const BackHeader = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <header className={styles.backHeader}>
      <IconArrowLeft onClick={goBack} />
    </header>
  );
};

export default BackHeader;
