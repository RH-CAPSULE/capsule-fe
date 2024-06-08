import { Capsule } from 'src/components/capsule';
import styles from './styles.module.scss';

const PasswordHeader = () => {
  return (
    <section className={styles.section}>
      <h1>비밀번호 재설정</h1>
      <Capsule className={styles.capsule} />
    </section>
  );
};

export default PasswordHeader;
