import { Helmet } from 'react-helmet-async';
// sections
import { Container } from 'src/components/container';
import styles from './styles.module.scss';

const Page404 = () => {
  return (
    <div className={styles.layout}>
      <Helmet>
        <title> 404 Not Found | Capsule</title>
      </Helmet>
      <Container>
        <h1>존재하지 않는 페이지입니다.</h1>
      </Container>
    </div>
  );
};
export default Page404;
