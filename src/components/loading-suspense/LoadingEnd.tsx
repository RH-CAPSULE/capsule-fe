import { Capsule } from '../capsule';
import styles from './styles.module.scss';

const LoadingEnd = () => {
  return (
    <div className={styles.layout}>
      <main>
        <h1>적어줘! 타임캡슐</h1>
        <Capsule className={styles.capsule} />
        <div />
      </main>
    </div>
  );
};

export default LoadingEnd;
