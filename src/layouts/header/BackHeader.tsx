import { useNavigate } from 'react-router-dom';

import { IconArrowLeft } from 'src/assets/icons';
import styles from './styles.module.scss';

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
