import { Link } from 'react-router-dom';
import { PATH } from 'src/routes/path';
import styles from './styles.module.scss';

const LoginAuthOption = () => {
  return (
    <section className={styles.section}>
      <div className={styles.authOptions}>
        <Link to={PATH.IDENTITY}>비밀번호 재설정</Link>
        <span aria-label="divider" />
        <Link to={PATH.SIGN_UP}>회원가입</Link>
      </div>
      <div className={styles.or}>또는</div>
    </section>
  );
};

export default LoginAuthOption;
