import { Capsule } from 'src/components/capsule';
import styles from './styles.module.scss';

const SignUpHeader = () => {
  return (
    <section className={styles.section}>
      <h1>적어줘 타임캡슐!</h1>
      <Capsule className={styles.capsule} />
    </section>
  );
};

export default SignUpHeader;
