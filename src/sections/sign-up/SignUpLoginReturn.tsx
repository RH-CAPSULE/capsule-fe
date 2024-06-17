import { Link } from 'react-router-dom';
import { PATH } from 'src/routes/path';
import styles from './styles.module.scss';

const SignUpLoginReturn = () => {
  return (
    <section className={styles.section}>
      <div className={styles.authOptions}>
        <Link to={PATH.LOGIN}>로그인으로 돌아가기</Link>
      </div>
    </section>
  );
};

export default SignUpLoginReturn;
