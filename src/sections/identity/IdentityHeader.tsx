import { Capsule } from 'src/components/capsule';
import styles from './styles.module.scss';

const IdentityHeader = () => {
  return (
    <section className={styles.section}>
      <h1>본인인증</h1>
      <Capsule className={styles.capsule} />
    </section>
  );
};

export default IdentityHeader;
