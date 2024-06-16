import styles from './styles.module.scss';

/**
 * Suspense fallback을 위한 빈 페이지
 */
const Blank = () => {
  return <div className={styles.layout} />;
};

export default Blank;
